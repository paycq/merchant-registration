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

  .vertical-top {
    vertical-align: top;
  }
`

const fidOptionsList = Array.from(document.querySelector('#fid')?.children || []).map(it => ({
    value: Number(it.value),
    label: it.text
}))

function getId() {
    const id = location.pathname.split('/').pop()
    if (id !== '0' && id) {
        return id
    }
}

const appProps = {
    fidOptionsList,
    id: getId(),
}



function AppWrapper() {
    return html`
        <${ConfigProvider} locale=${locales['zh_CN']}>
            <${App} ...${appProps}/>
        </ConfigProvider>
    `
}

render(createElement(AppWrapper), document.getElementById('app'))
