export async function copyToClipboard(text: string) {
    try {
        // for modern browsers
        await navigator.clipboard.writeText(text)
    }
    catch {
        const textarea = document.createElement('textarea')
        textarea.value = text
        document.body.appendChild(textarea)
        textarea.select()
        try { if (!document.execCommand('copy')) throw new Error('Clipboard permission denied') }
        finally { textarea.remove() }
    }
}
