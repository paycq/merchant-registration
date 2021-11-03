import { render, createElement, injectGlobal, html, ConfigProvider, locales } from './modules.js'
import App from './App.js'

injectGlobal`
`

function AppWrapper() {
    return html`
        <${ConfigProvider} locale=${locales['zh_CN']}>
            <${App}/>
        </ConfigProvider>
    `
}

render(createElement(AppWrapper), document.getElementById('app'))
