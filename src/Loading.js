import { css, html } from './modules.js'

const _Loading = css`
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`

export default function Loading() {
    return html`

        <div class=${_Loading}>Loading...</div>
    `
}