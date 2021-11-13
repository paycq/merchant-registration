export function normalizeDate(s = '') {
    if (!s) {
        return
    }
    return s.replace(/([年月日无])/g, '')
}