import type { ApiConversationWithId, ConversationNode, ConversationNodeMessage, ModelSlug, ThinkingContent } from './types';
export interface ConversationResult {
    id: string
    title: string
    modelSlug: string
    model: string
    createTime: number
    updateTime: number
    conversationNodes: ConversationNode[]
    projectName?: string
    projectId?: string
}

export function shouldSkipMessageInExport(message?: ConversationNodeMessage): boolean {
    if (!message || !message.content || !message.author) return true

    // ChatGPT is talking to tool
    if (message.recipient != null && message.recipient !== 'all') return true

    // Skip "thinking" content (hidden reasoning steps from thinking models)
    if (message.content.content_type === 'thoughts') return true
    if (message.content.content_type === 'reasoning_recap') return true

    // Skip messages marked as visually hidden (e.g., internal system prompts)
    if (message.metadata?.is_visually_hidden_from_conversation) return true

    // Skip tool's intermediate message.
    if (message.author.role === 'tool') {
        if (message.author.name === 'file_search') return true

        const hasExecutionImages = message.content.content_type === 'execution_output'
            && !!message.metadata?.aggregate_result?.messages?.some(msg => msg.message_type === 'image')

        const hasMultimodalImage = message.content.content_type === 'multimodal_text'
            && message.content.parts.some((part) => {
                return typeof part !== 'string'
                    && part.content_type === 'image_asset_pointer'
            })

        if (!hasExecutionImages && !hasMultimodalImage) {
            return true
        }
    }

    return false
}

const ModelMapping: { [key in ModelSlug]: string } & { [key: string]: string } = {
    'text-davinci-002-render-sha': 'GPT-3.5',
    'text-davinci-002-render-paid': 'GPT-3.5',
    'text-davinci-002-browse': 'GPT-3.5',
    'gpt-4-browsing': 'GPT-4 (Browser)',
    'gpt-4o': 'GPT-4o',
    'gpt-5-t-mini': 'GPT-5',
    'gpt-5-1-instant': 'GPT-5.1',
    'gpt-5-1-thinking': 'GPT-5.1',
    'gpt-5-2': 'GPT-5.2',

    // fuzzy matching
    'gpt-4': 'GPT-4',
    'gpt-5': 'GPT-5',
    'text-davinci-002': 'GPT-3.5',
}

export interface ProcessConversationOptions {
    enableThinking?: boolean
}

export function processConversation(conversation: ApiConversationWithId, options?: ProcessConversationOptions): ConversationResult {
    if (!conversation || typeof conversation.id !== 'string' || !conversation.mapping || Array.isArray(conversation.mapping) || typeof conversation.mapping !== 'object') throw new Error('Invalid conversation data');
    if (Object.values(conversation.mapping).some(node => !node || typeof node !== 'object')) throw new Error('Invalid conversation node');
    conversation = { ...conversation, mapping: structuredClone(conversation.mapping) }
    const title = typeof conversation.title === 'string' && conversation.title ? conversation.title : 'ChatGPT Conversation'
    const createTime = conversation.create_time
    const updateTime = conversation.update_time
    const { model, modelSlug } = extractModel(conversation.mapping)

    const startNodeId = conversation.current_node
        || Object.values(conversation.mapping).find(node => !node.children || node.children.length === 0)?.id
    if (!startNodeId) throw new Error('Failed to find start node.')

    const conversationNodes = extractConversationResult(conversation.mapping, startNodeId)
    const mergedConversationNodes = mergeContinuationNodes(conversationNodes)

    if (options?.enableThinking) {
        attachThinkingToNodes(conversation.mapping, mergedConversationNodes, startNodeId)
    }

    return {
        id: conversation.id,
        title,
        model,
        modelSlug,
        createTime,
        updateTime,
        conversationNodes: mergedConversationNodes,
    }
}

function extractModel(conversationMapping: Record<string, ConversationNode>) {
    let model = ''
    const modelSlug = Object.values(conversationMapping).find(node => node.message?.metadata?.model_slug)?.message?.metadata?.model_slug || ''
    if (modelSlug) {
        if (ModelMapping[modelSlug]) {
            model = ModelMapping[modelSlug]
        }
        else {
            Object.keys(ModelMapping).forEach((key) => {
                if (modelSlug.startsWith(key)) {
                    model = key
                }
            })
        }
    }

    return {
        model,
        modelSlug,
    }
}

function extractConversationResult(conversationMapping: Record<string, ConversationNode>, startNodeId: string): ConversationNode[] {
    const result: ConversationNode[] = []
    let currentNodeId: string | undefined = startNodeId

    const visited = new Set<string>()
    while (currentNodeId) {
        if (visited.has(currentNodeId)) throw new Error('Conversation contains a cyclic parent chain')
        visited.add(currentNodeId)
        const node: ConversationNode = conversationMapping[currentNodeId]
        if (!node) {
            break // Node not found
        }

        if (node.parent === undefined) {
            break // Stop at root message.
        }

        if (
            // Skip system messages
            node.message?.author.role !== 'system'
            // Skip model memory context
            && node.message?.content.content_type !== 'model_editable_context'
            // Skip user custom instructions
            && node.message?.content.content_type !== 'user_editable_context'
            // Skip hidden/tool-only messages that should not appear in exported output
            && !shouldSkipMessageInExport(node.message)
        ) {
            result.push(node)
        }

        currentNodeId = node.parent
    }

    return result.reverse()
}

/**
 * Merge continuation nodes generated by official continuation
 * to improve the readability of the conversation. (#146)
 */
function mergeContinuationNodes(nodes: ConversationNode[]): ConversationNode[] {
    const result: ConversationNode[] = []
    for (const node of nodes) {
        const prevNode = result[result.length - 1]
        if (
            prevNode?.message?.author.role === 'assistant' && node.message?.author.role === 'assistant'
         && prevNode.message.recipient === 'all' && node.message.recipient === 'all'
         && prevNode.message.content.content_type === 'text' && node.message.content.content_type === 'text'
         && prevNode.message.content.parts?.length > 0 && node.message.content.parts?.length > 0
        ) {
            const separator = prevNode.message.channel !== node.message.channel ? '\n\n' : ''
            prevNode.message.content.parts[prevNode.message.content.parts.length - 1] += separator + node.message.content.parts[0]
            prevNode.message.content.parts.push(...node.message.content.parts.slice(1))

            if (node.message.metadata) {
                const prevMeta = (prevNode.message.metadata ??= {} as any)
                if (node.message.metadata.citations?.length) {
                    prevMeta.citations = [
                        ...(prevMeta.citations || []),
                        ...node.message.metadata.citations,
                    ]
                }
                if (node.message.metadata.content_references?.length) {
                    prevMeta.content_references = [
                        ...(prevMeta.content_references || []),
                        ...node.message.metadata.content_references,
                    ]
                }
            }
        }
        else {
            result.push(node)
        }
    }
    return result
}

/**
 * Walk the raw conversation mapping and attach thinking/reasoning content
 * to the corresponding assistant response nodes.
 */
function hasThinkingContent(thinking: ThinkingContent): boolean {
    return thinking.thoughts.length > 0
        || (thinking.activities != null && thinking.activities.length > 0)
}

function attachThinkingToNodes(
    mapping: Record<string, ConversationNode>,
    resultNodes: ConversationNode[],
    startNodeId: string,
): void {
    const resultById = new Map(resultNodes.map(n => [n.id, n]));
    const resultNodeIds = new Set(resultById.keys())

    let currentNodeId: string | undefined = startNodeId
    let targetNodeId: string | null = null
    let thinking: ThinkingContent = { thoughts: [] }

    while (currentNodeId) {
        const node: ConversationNode = mapping[currentNodeId]
        if (!node || node.parent === undefined) break

        const message = node.message
        if (message?.content) {
            const ct = message.content.content_type

            if (resultNodeIds.has(node.id) && message.author.role !== 'user') {
                if (hasThinkingContent(thinking)) {
                    const saveToId = targetNodeId ?? node.id
                    const target = resultById.get(saveToId)
                    if (target) target.thinking = thinking
                }
                targetNodeId = node.id
                thinking = { thoughts: [] }
            }
            else if (ct === 'reasoning_recap') {
                const duration = message.metadata?.finished_duration_sec
                if (typeof duration === 'number') {
                    thinking.durationSeconds = duration
                }
                else {
                    const match = message.content.content.match(/(\d+)/)
                    if (match) thinking.durationSeconds = Number.parseInt(match[1])
                }
            }
            else if (ct === 'thoughts') {
                for (const thought of message.content.thoughts) {
                    if (thought.content || thought.summary) {
                        thinking.thoughts.unshift({
                            summary: thought.summary,
                            content: thought.content,
                        })
                    }
                }
            }
            else if (message.metadata?.reasoning_title) {
                if (!thinking.activities) thinking.activities = []
                const title = message.metadata.reasoning_title
                if (!thinking.activities.includes(title)) {
                    thinking.activities.unshift(title)
                }
            }
            else if (message.author.role === 'user' && !message.metadata?.is_visually_hidden_from_conversation) {
                if (targetNodeId && hasThinkingContent(thinking)) {
                    const target = resultById.get(targetNodeId)
                    if (target) target.thinking = thinking
                }
                targetNodeId = null
                thinking = { thoughts: [] }
            }
        }

        currentNodeId = node.parent
    }

    if (targetNodeId && hasThinkingContent(thinking)) {
        const target = resultById.get(targetNodeId)
        if (target) target.thinking = thinking
    }
}
