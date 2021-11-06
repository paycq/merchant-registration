import {
    css,
    html,
    Button,
    Form,
    Input,
    Select,
    Space,
    Typography,
    Modal,
    Upload,
    PlusOutlined,
    DatePicker, Checkbox, Cascader,
} from './modules.js'
import { industryCategoryOptions } from './industry_category.js'
import PictureInput from './components/PictureInput.js'

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

    function handleFinish(ev) {
        console.log('handleFinish', JSON.stringify(ev, null, 2))
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

    function handleClickPreviousStep(ev) {
        dispatch({ type: 'previousStep', })
    }

    return html`
        <div class=${_BasicInfoForm}>
            <div class="title color-gray-600">商户基本信息</div>
            <div class="form">
                <${Form} name="account"
                         onFinish=${handleFinish}
                         onFinishFailed=${handleFinishFailed}
                         initialValues=${state.basicInfo}
                         labelCol=${{ span: 4 }}
                         wrapperCol=${{ span: 10 }}
                         autoComplete="off">
                    <${FormItem} label="商户类型"
                                 name="merchantType"
                                 rules=${[{ required: true, message: '请选择商户类型', }]}>
                        <${Select}>
                            <${Option} value="individualMerchants">个体商户</Option>
                            <${Option} value="enterpriseMerchant">企业商户</Option>
                            <${Option} value="smallMerchants ">小微商户</Option>
                        </Select>
                    </FormItem>
                    <${FormItem} label="商户简称">
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
                    <${FormItem} label="营业执照"
                                 name="businessLicense"
                                 rules=${[{ required: true, message: '请上传营业执照', }]}>
                        <${PictureInput}/>
                    </FormItem>
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
                    <${FormItem} label="营业执照有效期" required>
                        <${Space}>
                            <${FormItem} label="营业执照有效期"
                                         noStyle
                                         rules=${[{ required: true, message: '请输入营业执照有效期', }]}
                                         name="businessLicensePeriod">
                                <${RangePicker} allowEmpty=${[false, true]}/>
                            </FormItem>
                            <${Checkbox}>长期</Checkbox>
                        </Space>
                    </FormItem>
                    <${FormItem} label="法人身份证照片"
                                 name="legalPersonIdPhoto"
                                 required>
                        <div class="inline-block">
                            <${FormItem} name=${['legalPersonIdPhoto', 'A']}
                                         noStyle
                                         rules=${[{ required: true, message: '请上传身份证人像面' }]}>
                                <${PictureInput}/>
                            </FormItem>
                            <div class="text-center color-gray-600">身份证人像面</div>
                        </div>
                        <div class="inline-block">
                            <${FormItem} name=${['legalPersonIdPhoto', 'B']}
                                         noStyle
                                         rules=${[{ required: true, message: '请上传身份证国徽面' }]}>
                                <${PictureInput}/>
                            </FormItem>
                            <div class="text-center color-gray-600">身份证国徽面</div>
                        </div>
                    </FormItem>
                    <${FormItem} label="身份证有效期" required>
                        <${Space}>
                            <${FormItem} label="身份证有效期"
                                         noStyle
                                         rules=${[{ required: true, message: '请输入身份证有效期', }]}
                                         name="idPeriod">
                                <${RangePicker} allowEmpty=${[false, true]}/>
                            </FormItem>
                            <${Checkbox}>长期</Checkbox>
                        </Space>
                    </FormItem>
                    <${FormItem} label="行业类目"
                                 labelCol=${{ span: 4 }} wrapperCol=${{ span: 16 }}
                                 name="industryCategory"
                                 rules=${[{ required: true, message: '请输入行业类目', }]}>
                        <${Cascader} options=${industryCategoryOptions} placeholder="请输入行业类目"/>
                    </FormItem>
                    <${FormItem} label="经营地址"
                                 wrapperCol=${{ span: 16 }}
                                 name="businessAddress"
                                 rules=${[{ required: true, message: '请输入经营地址', }]}>
                        <${Select} style=${{ width: '120px', marginRight: '8px', }} placeholder="请选择省">
                            <${Option} value="shanghai">上海市</Option>
                        </Select>
                        <${Select} style=${{ width: '120px', marginRight: '8px', }} placeholder="请选择市">
                            <${Option} value="shanghai">上海市</Option>
                        </Select>
                        <${Select} style=${{ width: '120px', marginRight: '8px', }} placeholder="请选择区/县">
                            <${Option} value="shanghai">上海市</Option>
                        </Select>
                        <${Input} style=${{ width: '360px' }} placeholder="详细地址需超过5个字, 详细到门牌号"/>
                    </FormItem>
                    <!-- button -->
                    <${FormItem} wrapperCol=${{ offset: 10, span: 16 }}>
                        <${Button} htmlType="button">
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