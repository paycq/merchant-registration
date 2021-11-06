import { render, createElement, injectGlobal, html, ConfigProvider, locales } from './modules.js'
import MerchantRegistration from './MerchantRegistration.js'

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

  .vertical-top {
    vertical-align: top;
  }
`

function App() {
    return html`
        <${ConfigProvider} locale=${locales['zh_CN']}>
            <${MerchantRegistration}/>
        </ConfigProvider>
    `
}

render(createElement(App), document.getElementById('app'))
