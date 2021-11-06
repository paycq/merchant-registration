import { render, createElement, injectGlobal, html, ConfigProvider, locales } from './modules.js'
import App from './App.js'

injectGlobal`
  .color-gray-600 {
    color: #5a5a5a;
  }

  .text-center {
    text-align: center;
  }

  .inline-block {
    display: inline-block;
  }
`

function AppWrapper() {
    return html`
        <${ConfigProvider} locale=${locales['zh_CN']}>
            <${App}/>
        </ConfigProvider>
    `
}

render(createElement(AppWrapper), document.getElementById('app'))
