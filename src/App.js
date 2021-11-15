import { css, cx, html, moment, useReducer } from './modules.js'
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
    step: 2,
    // form data
    accountInfo: {
        ownership: undefined,                     // 所属授理商
        registrationMobile: undefined,           // 注册手机
        loginAccount: undefined,             // 登陆账号
    },
    basicInfo: {
        merchantType: '2',                                // 商户类型
        email: undefined,                                // 联系邮箱
        merchantAbbreviation: undefined,                                 // 商户简称
        businessLicense: undefined,                                         // 营业执照
        companyName: undefined,                                          // 公司名称
        businessLicenseNo: undefined,                            // 营业执照号
        businessLicenseAddress: undefined,                        // 营业执照注册地址
        businessLicensePeriod: undefined,                   // 营业执照有效期
        legalPersonIdPhoto: undefined,                                      // 法人身份证照片
        idPeriod: undefined,                                     // 身份证有效期
        industryCategory: undefined,                                          // 行业类目
        businessAddress: undefined,                           // 经营地址
        addressLocation: [],                                    // 经纬度
        holdingIdPhoto: undefined,                               // 手持身份证照片
    },
    billingInfo: {
        settlementType: {                                                   // 结算类型
            accountType: '1',                                  // 对私账户
            settler: '1',                                        // 法人结算
        },
        bankCardPhoto: undefined,                                           // 银行卡照片
        bankCardNumber: undefined,                                          // 银行卡号
        bank: undefined,                                                    // 所属银行
        //
        settlerName: undefined,
        settlerIdCardNumber: undefined,
        settlerIdPhoto: undefined,
        branchBankNumber: undefined,
        branchBankInfo: 'select',
        branchBankArea: [],
        // rate
        wechatPayRate: '2.5',                                               // 微信费率
        alipayRate: '2.5',                                                  // 支付宝费率
        unionPayRate: '2.5',                                                // 银联费率
        cardRate: '4.20',                                                   // 借记卡费率
        cappedFee: '18',                                                    // 封顶手续费
        creditCardRate: '5.20',                                             // 贷记卡费率

    },
    storeInfo: {
        storeName: undefined,               // 门店名称
        storePhone: undefined,             // 门店电话
        // photos
        storeFrontPhoto: undefined,            // 门店门头照
        payBoardPhoto: undefined,              // 收银台照片
        storeEnvironmentPhoto: undefined,      // 店内环境照
        licensePhoto: undefined,               // 经营许可证
        otherPhoto: undefined,                 // 其他照片
    },
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
                basicInfo: {
                    ...state.basicInfo,
                    ...payload,
                },
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
        case 'setAddressLocation':
            return {
                ...state,
                basicInfo: {
                    ...state.basicInfo,
                    addressLocation: payload,
                }
            }
        case 'setMerchantType3':
            if (payload === true) {
                return {
                    ...state,
                    billingInfo: {
                        ...state.billingInfo,
                        settlementType: {
                            ...state.billingInfo.settlementType,
                            accountType: '2',
                        },
                    }
                }
            } else {
                return {
                    ...state,
                    billingInfo: {
                        ...state.billingInfo,
                        settlementType: {
                            ...state.billingInfo.settlementType,
                            accountType: '1',
                        },
                    }
                }
            }
        default:
            return state
    }
}

const _App = css`
  background-color: #f4f4f4;
`

export default function MerchantRegistration(props) {

    const [state, dispatch] = useReducer(reducer, initialState)

    const InputForm = getFormByStep(state.step)

    return html`
        <div class=${cx(_App, 'application-container')}>
            <div class="container">
                <${StepContent} state=${state}></StepContent>
                <${InputForm} state=${state} dispatch=${dispatch}></InputForm>
            </div>
        </div>
    `
}