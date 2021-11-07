const csrfTokenRef = document.querySelector('meta[name="csrf-token"]') || {}
export const csrfToken = csrfTokenRef.content