import { fromMarkdown } from 'mdast-util-from-markdown';
import { t } from './10-base.js';

const clean = text => (text || '').trim().replace(/\s+/g, ' ');
const nodeText = node => node.value ?? node.alt ?? (node.children || []).map(nodeText).join('');

function entry(position, level, value, element = null, images = 0) {
    const fullText = clean(value) || (images ? t('outlineImages').replace('{n}', String(images)) : '');
    const limit = level === 0 ? 100 : position === 'summary' ? 80 : Infinity;
    return { position, level, text: fullText.length > limit ? fullText.slice(0, limit) + '…' : fullText,
        isTruncated: fullText.length > limit, element };
}

function mountedEntries(adapter, message, role) {
    if (role === 'user') {
        const { element, text, imageCount } = adapter.getUserOutlineContent(message);
        return [entry('query', 0, text, element, imageCount)].filter(item => item.text);
    }
    const content = adapter.getMessageContent(message);
    const headings = Array.from(content.querySelectorAll('h1, h2, h3, h4, h5, h6, [role="heading"]'))
        .filter(node => !node.closest('pre, [hidden], [aria-hidden="true"], .sr-only') && clean(node.textContent));
    if (headings.length) return headings.map((node, i) => {
        const level = Number(node.tagName.match(/^H([1-6])$/)?.[1] || node.getAttribute('aria-level')) || 2;
        return entry(i, Math.max(1, Math.min(6, level)), node.innerText || node.textContent, node);
    });
    const first = content.querySelector('p, li') || content;
    return [entry('summary', 1, adapter.getMessageBodyText(first), first)].filter(item => item.text);
}

function savedEntries(message) {
    const parts = Array.isArray(message.content?.parts) ? message.content.parts : [];
    const text = parts.filter(part => typeof part === 'string').join('\n');
    if (message.author.role === 'user') {
        const attachments = message.metadata?.attachments;
        const images = parts.filter(part => part?.content_type === 'image_asset_pointer').length ||
            (Array.isArray(attachments) ? attachments.filter(file => file?.mime_type?.startsWith('image/')).length : 0);
        return [entry('query', 0, text, null, images)].filter(item => item.text);
    }
    if (!text.trim()) return [];
    const headings = [];
    let first = '';
    const visit = node => {
        if (node.type === 'heading') headings.push(entry(headings.length, node.depth, nodeText(node)));
        else if (!first && node.type === 'paragraph') first = nodeText(node);
        node.children?.forEach(visit);
    };
    visit(fromMarkdown(text));
    return headings.length ? headings : [entry('summary', 1, first || text)];
}

// A conversation branch owns outline membership. Mounted messages supply the current
// rendered labels and jump targets. Retain only labels and coordinates after unmount.
export class OutlineIndex {
    constructor(adapter, main, path) {
        this.adapter = adapter;
        this.main = main;
        this.path = path;
        this.seen = new Map();
        this.branch = [];
        this.byId = new Map();
        this.aliases = new Map();
        this.ranks = new Map();
        this.controller = new AbortController();
    }

    setConversation(data, leaf = data?.current_node) {
        const mapping = data?.mapping;
        if (!leaf && mapping) {
            const leaves = Object.keys(mapping).filter(key => !mapping[key]?.children?.length);
            if (leaves.length === 1) leaf = leaves[0];
        }
        if (!mapping?.[leaf]) return;
        const chain = [];
        const visited = new Set();
        for (let key = leaf; key; key = mapping[key]?.parent) {
            if (visited.has(key) || !mapping[key]) return;
            visited.add(key);
            const message = mapping[key].message;
            if (!['user', 'assistant'].includes(message?.author?.role) ||
                !['text', 'multimodal_text'].includes(message.content?.content_type) ||
                message.metadata?.is_visually_hidden_from_conversation || (message.recipient && message.recipient !== 'all') ||
                message.channel === 'analysis') continue;
            const items = savedEntries(message);
            if (items.length) chain.push({ id: message.id || key, role: message.author.role, items });
        }
        this.data = data;
        this.branchKeys = visited;
        this.branch = chain.reverse();
        this.byId = new Map(this.branch.map((row, i) => [row.id, i]));
        for (const id of this.seen.keys()) {
            if (mapping[id] && !visited.has(id)) this.seen.delete(id);
        }
        this.aliases.clear();
    }

    readMounted(container, withContent = true) {
        const origin = container === document.scrollingElement ? 0 : container.getBoundingClientRect().top + container.clientTop;
        return this.adapter.getChatMessages().flatMap(message => {
            const role = this.adapter.getMessageRole(message);
            if (role !== 'user' && role !== 'assistant') return [];
            const id = this.adapter.getMessageIdentity(message);
            const slot = this.adapter.getMessageSlot(message);
            const turn = message.closest('[data-turn-key]')?.getAttribute('data-turn-key');
            return [{ id, slot, role, turn, number: this.adapter.getMessageTurnNumber(message), message,
                top: container.scrollTop + message.getBoundingClientRect().top - origin,
                items: withContent ? mountedEntries(this.adapter, message, role) : null }];
        });
    }

    bind(rows) {
        // Modern user bubbles can expose only a turn key. Their paired answer has a
        // real message ID, even when several prompts have identical text or images.
        const paired = new Map();
        for (const row of rows) {
            if (row.role === 'assistant' && row.turn && this.byId.has(row.id)) {
                let i = this.byId.get(row.id) - 1;
                while (i >= 0 && this.branch[i].role !== 'user') i--;
                if (i >= 0) paired.set(row.turn, this.branch[i].id);
            }
        }
        for (const row of rows) {
            if (this.byId.has(row.id)) continue;
            if (row.id === row.slot || row.id.startsWith('anonymous-')) {
                const key = row.role === 'user' && paired.get(row.turn);
                if (key) this.aliases.set(row.id, key);
                if (!this.aliases.has(row.id) && row.items?.[0]) {
                    const matches = this.branch.filter(saved => saved.role === row.role && saved.items[0].text === row.items[0].text);
                    if (matches.length === 1) this.aliases.set(row.id, matches[0].id);
                }
                row.id = this.aliases.get(row.id) || row.id;
            }
        }
    }

    update(showQuestions) {
        const container = this.adapter.getScrollContainer();
        if (!container) return [];
        const rows = this.readMounted(container);
        // A regeneration / edit can switch branches without changing the route.
        const alternative = rows.findLast(row => this.data?.mapping?.[row.id]?.message && !this.branchKeys.has(row.id));
        if (alternative) {
            let leaf = alternative.id;
            const walked = new Set([leaf]);
            while (this.data.mapping[leaf]?.children?.length === 1) {
                const child = this.data.mapping[leaf].children[0];
                if (walked.has(child)) break;
                walked.add(child);
                leaf = child;
            }
            this.seen.clear();
            this.setConversation(this.data, leaf);
        }
        // A window may have unmounted while the request was in flight. Bind those
        // snapshots too, before merging, so provisional IDs cannot duplicate a turn.
        if (this.data && this.boundBranch !== this.branch) {
            const snapshots = Array.from(this.seen.values());
            this.bind(snapshots);
            this.seen = new Map(snapshots.map(row => [row.id, row]));
            this.boundBranch = this.branch;
        }
        this.bind(rows);
        const previousSlots = new Map(Array.from(this.seen.values(), row => [row.slot, row.id]));
        for (const row of rows) {
            const previous = row.slot && previousSlots.get(row.slot);
            if (!previous || previous === row.id || this.aliases.get(previous) === row.id ||
                (this.byId.has(previous) && this.byId.has(row.id))) continue;
            // The host reused a turn slot for an edited question or a new answer.
            // Its old descendants belong to the old branch, even if the API lags.
            const start = this.ranks.get(previous);
            for (const [id, rank] of this.ranks) if (rank >= start) this.seen.delete(id);
            if (this.byId.has(previous)) {
                this.branch = this.branch.slice(0, this.byId.get(previous));
                this.byId = new Map(this.branch.map((record, i) => [record.id, i]));
            }
        }
        const live = new Map();
        for (const { id, slot, role, items, top, number, turn } of rows) {
            if (!items.length) continue;
            live.set(id, items);
            this.seen.set(id, { id, slot, role, top, number, turn, items: items.map(item => ({ ...item, element: null })) });
        }
        // Drop provisional DOM identities once a server identity is available.
        for (const alias of this.aliases.keys()) this.seen.delete(alias);
        const matched = this.branch.some(row => this.seen.has(row.id));
        const history = matched || !this.seen.size ? this.branch : [];
        const byPosition = (a, b) => (a.number != null && b.number != null ? a.number - b.number : 0) || a.top - b.top;
        const local = Array.from(this.seen.values()).sort(byPosition);
        const ordered = [];
        // Place unsaved/streaming messages relative to the nearest known successor.
        const before = new Map();
        let successor = null;
        for (let i = local.length - 1; i >= 0; i--) {
            const row = local[i];
            if (matched && this.byId.has(row.id)) successor = row.id;
            else {
                if (!before.has(successor)) before.set(successor, []);
                before.get(successor).push(row);
            }
        }
        for (const row of history) {
            if (before.has(row.id)) ordered.push(...before.get(row.id).reverse());
            ordered.push(this.seen.get(row.id) || row);
        }
        if (before.has(null)) ordered.push(...before.get(null).reverse());
        this.ranks = new Map(ordered.map((row, i) => [row.id, i]));
        const outline = [];
        for (const row of ordered) {
            if (!showQuestions && row.role === 'user') continue;
            const counts = new Map();
            for (const item of live.get(row.id) || row.items) {
                const occurrence = counts.get(item.text) || 0;
                counts.set(item.text, occurrence + 1);
                outline.push({ ...item, occurrence, id: `${this.path}:${row.id}:${item.position}`,
                    messageId: row.id, isUserQuery: row.role === 'user', index: outline.length });
            }
        }
        return outline;
    }

    // Re-read identities for each navigation sample. Virtual lists may reuse an
    // attached element for a completely different message between two frames.
    resolve(item, container, bounds) {
        if (location.pathname !== this.path || this.adapter.getChatContainer() !== this.main) return null;
        const rank = this.ranks.get(item.messageId);
        if (rank == null) return null;
        const rows = this.readMounted(container, false);
        this.bind(rows);
        const target = rows.find(row => row.id === item.messageId);
        if (target) {
            const items = mountedEntries(this.adapter, target.message, target.role);
            const exact = typeof item.position === 'number' ?
                items.filter(candidate => candidate.text === item.text)[item.occurrence] : items[0];
            if (exact?.element?.getClientRects().length) return { element: exact.element };
            if (target.message.getClientRects().length) return { estimate: target.top };
        }
        // Bracket the target using mounted messages and the virtual scroll extent.
        // Each newly mounted window narrows the interval, including uneven turn heights.
        if (bounds.height !== container.scrollHeight) {
            bounds.height = container.scrollHeight;
            bounds.low = { rank: 0, top: 0 };
            bounds.high = { rank: Math.max(1, this.ranks.size), top: container.scrollHeight };
        }
        for (const row of rows) {
            const other = this.ranks.get(row.id);
            if (other == null) continue;
            if (other < rank && other >= bounds.low.rank) {
                bounds.low = { rank: other, top: row.top + row.message.getBoundingClientRect().height };
            }
            if (other > rank && other <= bounds.high.rank) bounds.high = { rank: other, top: row.top };
        }
        const { low, high } = bounds;
        const fraction = (rank - low.rank) / Math.max(1, high.rank - low.rank);
        const remembered = this.seen.get(item.messageId)?.top;
        const estimate = !bounds.triedRemembered && remembered != null ? remembered : low.top + fraction * (high.top - low.top);
        bounds.triedRemembered = true;
        return { estimate };
    }
}
