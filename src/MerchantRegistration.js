import { css, html, useReducer } from './modules.js'
import StepContent from './StepContent.js'
import AccountInfoForm from './AccountInfoForm.js'
import BasicInfoForm from './BasicInfoForm.js'
import BillingInfoForm from './BillingInfoForm.js'
import StoreInfoForm from './StoreInfoForm.js'
import SubmitForReview from './SubmitForReview.js'

function getFormByStep(step) {
    switch (step) {
        case 0:
            return AccountInfoForm
        case 1:
            return BasicInfoForm
        case 2:
            return BillingInfoForm
        case 3:
            return StoreInfoForm
        case 4:
            return SubmitForReview
    }
}


const initialState = {
    step: 1,
    // form data
    accountInfo: {},
    basicInfo: {
        merchantType: 'individualMerchants',    // 商户类型
        merchantAbbreviation: undefined,        // 商户简称
        businessLicense: undefined,             // 营业执照
    },
    billingInfo: {},
    storeInfo: {},

}

function reducer(state, action) {
    const payload = action.payload || {}
    switch (action.type) {
        case 'nextStep':
            return {
                ...state,
                step: state.step + 1,
            }
        case 'previousStep':
            return {
                ...state,
                step: state.step - 1,
            }
        case 'updateAccountInfo':
            return {
                ...state,
                accountInfo: payload,
            }
        case 'updateBasicInfo':
            return {
                ...state,
                basicInfo: payload,
            }
        case 'updateBillingInfo':
            return {
                ...state,
                billingInfo: payload,
            }
        case 'updateStoreInfo':
            return {
                ...state,
                storeInfo: payload,
            }
        default:
            return state
    }
}

const _App = css`
  padding: 20px;
  background-color: #f4f4f4;
`

export default function MerchantRegistration(props) {

    const [state, dispatch] = useReducer(reducer, initialState)

    const InputForm = getFormByStep(state.step)

    return html`
        <div class=${_App}>
            <div class="container">
                <${StepContent} state=${state}></StepContent>
                <${InputForm} state=${state} dispatch=${dispatch}></InputForm>
            </div>
        </div>
    `
}