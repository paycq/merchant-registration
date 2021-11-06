import { css, html, Steps } from './modules.js'

const { Step } = Steps

const _StepContent = css`
  background-color: #fff;
  padding: 40px;
  border-radius: 2px;
`

export default function StepContent(props) {

    return html`
        <div class=${_StepContent}>
            <${Steps} current=${props.state.step}>
                <${Step} title="账户信息"/>
                <${Step} title="基本信息"/>
                <${Step} title="结算信息和费率"/>
                <${Step} title="门店信息"/>
                <${Step} title="提交审核"/>
            </Steps>
        </div>
    `
}