import {
    css,
    html,
    moment,
    Button,
    Form,
    Input,
    Select,
    Space,
    Typography,
    Modal,
    DatePicker,
    Cascader, useState,
} from './modules.js'
import industryCategoryList from './data/industry_category_list.js'
import PictureInput from './components/PictureInput.js'
import PeriodInput from './components/PeriodInput.js'
import AddressInput from './components/AddressInput.js'
import { uploadIdCard, uploadLicense } from './apis/upload.js'

const { Option } = Select
const { Item: FormItem } = Form
const { Link } = Typography
const { RangePicker } = DatePicker

function showMerchantAbbreviation() {
    const imageUrl = new URL('./images/merchant_abbreviation_sample.png', import.meta.url)
    Modal.info({
        title: '示例',
        icon: null,
        content: html`<img style=${{ width: '100%', }} src=${imageUrl} alt=""/>`,
        okButtonProps: { style: { height: '40px', } },
        okText: '我知道了',
    })
}


const _BasicInfoForm = css`
  background-color: #fff;
  margin-top: 20px;
  border-radius: 2px;
  padding: 0 24px 24px;

  & > .title {
    font-size: 16px;
    line-height: 60px;
    height: 60px;
    border-bottom: 1px solid #dedede;
  }

  & > .form {
    padding: 20px 0;
  }

  & .ant-form-item-control-input-content > button.ant-btn {
    min-width: 80px;
    height: 40px;
    margin-left: 8px;
  }
`

export default function BasicInfoForm(props) {

    const { state, dispatch } = props

    const [form] = Form.useForm()

    const [merchantType, setMerchantType] = useState(state.basicInfo.merchantType)

    function handleLocationChange(location) {
        dispatch({
            type: 'setAddressLocation',
            payload: location,
        })
    }

    function handleSelectMerchantType(ev) {
        const selectedMerchantType = form.getFieldValue('merchantType')
        if (selectedMerchantType === merchantType) {
            return
        }
        setMerchantType(selectedMerchantType)
    }

    function handleFinish(ev) {
        dispatch({ type: 'updateBasicInfo', payload: ev, })
        dispatch({ type: 'nextStep' })
    }

    function handleFinishFailed(ev) {
        console.log('handleFinishFailed', JSON.stringify(ev, null, 2))
    }

    function handleShowMerchantAbbreviation(ev) {
        ev.preventDefault()
        showMerchantAbbreviation()
    }

    async function handleInputIdCardA(file) {
        const result = await uploadIdCard(file, 'front') || {}
        const data = result.data || {}
        if (data.idcard) {
            form.setFieldsValue({ idCardNumber: data.idcard })
        }
        if (data.name) {
            form.setFieldsValue({ name: data.name })
        }
    }

    async function handleInputBusinessLicense(file) {
        const result = await uploadLicense(file) || {}
        const data = result.data || {}
        if (data.name) {
            form.setFieldsValue({ companyName: data.name })

        }
        if (data.number) {
            form.setFieldsValue({ businessLicenseNo: data.number })

        }
        if (data.address) {
            form.setFieldsValue({ businessLicenseAddress: data.address })
        }
    }


    async function handleInputIdCardB(file) {
        const result = await uploadIdCard(file, 'back') || {}
        const data = result.data || {}
        if (data.qianfa && data.shixiao) {
            form.setFieldsValue({
                idPeriod: {
                    period: [moment(data.qianfa), moment(data.shixiao)],
                    longTerm: false,
                }
            })
        }
    }

    function handleClickPreviousStep(ev) {
        dispatch({ type: 'previousStep', })
    }

    function handleClickBack(ev) {
        window.location = '/home/xiaowei/list'
    }

    return html`
        <div class=${_BasicInfoForm}>
            <div class="title color-gray-600">商户基本信息</div>
            <div class="form">
                <${Form} name="account"
                         onFinish=${handleFinish}
                         onFinishFailed=${handleFinishFailed}
                         form=${form}
                         initialValues=${state.basicInfo}
                         labelCol=${{ span: 4 }}
                         wrapperCol=${{ span: 10 }}
                         autoComplete="off">
                    <${FormItem} label="商户类型"
                                 name="merchantType"
                                 rules=${[{ required: true, message: '请选择商户类型', }]}>
                        <${Select} onChange=${handleSelectMerchantType} placeholder="请选择商户类型">
                            <${Option} value="2">个体商户</Option>
                            <${Option} value="3">企业商户</Option>
                            <${Option} value="1">小微商户</Option>
                        </Select>
                    </FormItem>
                    <${FormItem} label="商户简称" required>
                        <${Space}>
                            <${FormItem} name="merchantAbbreviation"
                                         noStyle
                                         rules=${[{ required: true, message: '请输入商户简称', }]}>
                                <${Input} placeholder="支付完成页展示，2-20个字"/>
                            </FormItem>
                            <${Link} onClick=${handleShowMerchantAbbreviation}>
                            示例
                            </Link>
                        </Space>
                    </FormItem>


                    ${['2', '3'].includes(merchantType) && html`
                        <${FormItem} label="营业执照"
                                     name="businessLicense"
                                     rules=${[{ required: true, message: '请上传营业执照', }]}>
                            <${PictureInput} onFileInput=${handleInputBusinessLicense}/>
                        </FormItem>
                    `}

                    <${FormItem} label="公司名称"
                                 name="companyName"
                                 extra=${html`
                                     <span>
                                         公司名称应与营业执照名称一致。
                                         <br/>
                                         若营业执照没有商家名称或者名称为“*”或者“***”，则公司名称应填 “个体户XXX”（XXX为营业执照上经营者姓名）。
                                         <br/>
                                         小微商户，公司名称应填写：商户_XXX（XXX为法人姓名)。
                                     </span>
                                 `}
                                 rules=${[{ required: true, message: '请输入公司名称', }]}>
                        <${Input} placeholder="请输入公司名称"/>
                    </FormItem>

                    ${['2', '3'].includes(merchantType) && html`
                        <${FormItem} label="营业执照号"
                                     name="businessLicenseNo"
                                     rules=${[{ required: true, message: '请输入营业执照号', }]}>
                            <${Input} placeholder="请输入营业执照号"/>
                        </FormItem>
                        <${FormItem} label="营业执照注册地址"
                                     name="businessLicenseAddress"
                                     rules=${[{ required: true, message: '请输入营业执照注册地址', }]}>
                            <${Input} placeholder="请输入营业执照注册地址"/>
                        </FormItem>
                        <${FormItem} label="营业执照有效期" name="businessLicensePeriod"
                                     rules=${[
                                         { required: true, message: '请输入营业执照有效期', },
                                         { validator: PeriodInput.validator, },
                                     ]}
                                     required>
                            <${PeriodInput}/>
                        </FormItem>
                    `}

                    ${'1' === merchantType && html`
                        <${FormItem} label="手持身份证照片"
                                     name="holdingIdPhoto"
                                     rules=${[{ required: true, message: '请上传手持身份证照片', }]}>
                            <${PictureInput}/>
                        </FormItem>
                    `}

                    <${FormItem} label="法人身份证照片" required>
                        <div class="inline-block">
                            <${FormItem} name=${['legalPersonIdPhoto', 'A']}
                                         noStyle
                                         rules=${[{ required: true, message: '请上传身份证人像面' }]}>
                                <${PictureInput} onFileInput=${handleInputIdCardA}/>
                            </FormItem>
                            <div class="text-center color-gray-600">身份证人像面</div>
                        </div>
                        <div class="inline-block">
                            <${FormItem} name=${['legalPersonIdPhoto', 'B']}
                                         noStyle
                                         rules=${[{ required: true, message: '请上传身份证国徽面' }]}>
                                <${PictureInput} onFileInput=${handleInputIdCardB}/>
                            </FormItem>
                            <div class="text-center color-gray-600">身份证国徽面</div>
                        </div>
                    </FormItem>

                    <${FormItem} label="姓名"
                                 name="name"
                                 rules=${[{ required: true, message: '请输入姓名', }]}>
                        <${Input} placeholder="请输入姓名"/>
                    </FormItem>

                    <${FormItem} label="身份证号"
                                 name="idCardNumber"
                                 rules=${[
                                     { required: true, message: '请输入身份证号', },
                                     { pattern: /^\d{15}(\d\d\d)?$/, message: '请输入15/18为身份证件号', },
                                 ]}>
                        <${Input} placeholder="请输入身份证号"/>
                    </FormItem>

                    <${FormItem} label="身份证有效期"
                                 name="idPeriod"
                                 rules=${[
                                     { required: true, message: '请输入身份证有效期', },
                                     { validator: PeriodInput.validator, },
                                 ]}
                                 required>
                        <${PeriodInput}/>
                    </FormItem>
                    <${FormItem} label="行业类目"
                                 labelCol=${{ span: 4 }} wrapperCol=${{ span: 16 }}
                                 name="industryCategory"
                                 rules=${[{ required: true, message: '请输入行业类目', }]}>
                        <${Cascader} options=${industryCategoryList} placeholder="请输入行业类目"/>
                    </FormItem>
                    <${FormItem} label="经营地址"
                                 wrapperCol=${{ span: 16 }}
                                 name="businessAddress"
                                 rules=${[
                                     { required: true, message: '请输入经营地址', },
                                     { validator: AddressInput.validator },
                                 ]}>
                        <${AddressInput} onLocationChange=${handleLocationChange}/>
                    </FormItem>
                    <!-- button -->
                    <${FormItem} wrapperCol=${{ offset: 10, span: 16 }}>
                        <${Button} onClick=${handleClickBack} htmlType="button">
                            返回
                        </Button>
                        <${Button} onClick=${handleClickPreviousStep} htmlType="button">
                            上一步
                        </Button>
                        <${Button} type=${'primary'} htmlType="submit">
                            下一步
                        </Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    `
}