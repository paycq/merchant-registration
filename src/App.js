import { css, html, Steps, useState } from './modules.js'
import AccountInfoForm from './AccountInfoForm.js'
import BasicInfoForm from './BasicInfoForm.js'
import BillingInfoForm from './BillingInfoForm.js'

const { Step } = Steps

function getFormByStep(step) {
    switch (step) {
        case 0:
            return AccountInfoForm
        case 1:
            return BasicInfoForm
        case 2:
            return  BillingInfoForm
    }
}

const _App = css`
  padding: 20px;
  background-color: #f4f4f4;

  & > .container {

    & > .step-content {
      background-color: #fff;
      padding: 40px;
      border-radius: 2px;
    }
  }
`

export default function App(props) {

    const [step, setStep] = useState(2)

    const InputForm = getFormByStep(step)

    return html`
        <div class=${_App}>
            <div class="container">
                <div class="step-content">
                    <${Steps} current=${step}>
                        <${Step} title="账户信息"/>
                        <${Step} title="基本信息"/>
                        <${Step} title="结算信息和费率"/>
                        <${Step} title="门店信息"/>
                        <${Step} title="提交审核"/>
                    </Steps>
                </div>
                <${InputForm}/>
            </div>
        </div>
    `
}