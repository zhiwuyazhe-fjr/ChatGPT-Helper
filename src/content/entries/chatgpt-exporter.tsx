import { mount } from '../exporter/main'
import { acceptExportHost } from '../exporter/legacy-host'
import type { ExportHost } from '../exporter/host'

export { mount }
export { EXPORT_PROTOCOL as protocol, BUILD_ID as buildId } from '../shared/build'

export function mountLegacy(target: Element, host: ExportHost) {
    return mount(target, acceptExportHost(host))
}
