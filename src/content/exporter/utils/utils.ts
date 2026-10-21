export function nonNullable<T>(x: T): x is NonNullable<T> {
    return x != null
}

export function dateStr(date: Date = new Date()) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

export function timestamp() {
    return new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '')
}

export function getColorScheme(): 'light' | 'dark' {
    return document.documentElement.style.getPropertyValue('color-scheme') as 'light' | 'dark'
}

export function unixTimestampToISOString(timestamp: number | string | undefined) {
    if (timestamp == null || timestamp === '') return '';
    const value = typeof timestamp === 'number' ? (timestamp < 1e12 ? timestamp * 1000 : timestamp) : Date.parse(timestamp);
    return Number.isFinite(value) ? new Date(value).toISOString() : '';
}

export function jsonlStringify(list: any[]): string {
    // This _has_ to be stringified without adding any indentation
    return list.map((msg: any) => JSON.stringify(msg)).join('\n')
}
