const SOURCE_ATTRIBUTES = ['data-latex', 'data-math', 'data-formula'];
const SOURCE_SELECTOR = SOURCE_ATTRIBUTES.map(name => `[${name}]`).join(', ');
export const FORMULA_SELECTOR = `.katex, .katex-display, [data-d-component="math"], math, mjx-container, .MathJax, ${SOURCE_SELECTOR}`;
const CONTENT_BOUNDARY = 'body, html, main, article, p, li, td, th, [data-message-author-role], [data-markdown-text-style], [data-content-search-unit-key]';

export function resolveFormulaRoot(target) {
    const element = target?.nodeType === 1 ? target : target?.parentElement;
    if (!element?.closest || element.closest('pre, code, textarea, [contenteditable="true"]')) return null;
    // KaTeX HTML and MathML are siblings. Never stop at .mathnormal or .katex-html.
    const katex = element.closest('.katex');
    if (katex) return katex;
    const boundary = element.closest(FORMULA_SELECTOR);
    if (!boundary) return null;
    const formulas = boundary.querySelectorAll('.katex');
    if (formulas.length > 1) return null;
    return formulas[0] || boundary;
}

function unwrapSource(value) {
    let latex = String(value || '').trim();
    let display;
    for (const [open, close, block] of [['$$', '$$', true], ['\\[', '\\]', true], ['\\(', '\\)', false], ['$', '$', false]]) {
        if (latex.length > open.length + close.length && latex.startsWith(open) && latex.endsWith(close)) {
            // A final escaped dollar belongs to the expression, not a delimiter.
            const ending = latex.slice(0, -close.length).match(/\\+$/)?.[0].length || 0;
            if (close === '$' && ending % 2) continue;
            latex = latex.slice(open.length, -close.length).trim();
            display = block;
            break;
        }
    }
    return { latex: latex || null, display };
}

function explicitSource(element) {
    for (const attribute of SOURCE_ATTRIBUTES) {
        const value = element.getAttribute(attribute);
        if (value?.trim()) return value;
    }
    return null;
}

export function readFormulaSource(target) {
    const root = resolveFormulaRoot(target);
    if (!root) return null;
    const annotations = Array.from(root.querySelectorAll('annotation[encoding="application/x-tex" i], annotation[encoding="text/x-tex" i]'))
        .map(annotation => annotation.textContent).filter(value => value?.trim());
    // Multiple independent annotations are ambiguous; never copy a neighbouring formula.
    let raw = annotations.length === 1 ? annotations[0] : null;
    if (!raw) raw = explicitSource(root);
    if (!raw && annotations.length <= 1) {
        const sources = Array.from(root.querySelectorAll(SOURCE_SELECTOR)).map(explicitSource).filter(Boolean);
        if (sources.length === 1) raw = sources[0];
    }
    // Some renderers attach TeX to a wrapper outside .katex. Stay inside this
    // formula's semantic boundary, never climb into a paragraph or whole reply.
    for (let scope = root.parentElement; !raw && scope && !scope.matches(CONTENT_BOUNDARY); scope = scope.parentElement) {
        if (scope.querySelectorAll('.katex').length > 1) break;
        raw = explicitSource(scope);
    }
    const source = unwrapSource(raw);
    const math = root.matches('math') ? root : root.querySelector('math');
    const display = Boolean(root.closest('.katex-display, [data-d-component="math"][data-d-block]') ||
        math?.getAttribute('display') === 'block' || source.display === true);
    // Deliberately no aria-label / innerText / textContent fallback: those contain
    // spoken maths or visual fragments, not the fraction/subscript source tree.
    return { root, latex: source.latex, display };
}

export function formatFormula(formula) {
    if (!formula?.latex) return null;
    return formula.display ? `$$\n${formula.latex}\n$$` : `$${formula.latex}$`;
}
