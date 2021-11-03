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
    DatePicker, Checkbox,
} from './modules.js'

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
    opacity: .8;
    border-bottom: 1px solid #dedede;
  }

  & > .form {
    padding: 20px 0;
  }

  & .ant-btn {
    min-width: 80px;
    height: 40px;
    margin-left: 8px;
  }

  & .ant-upload {
    width: 128px;
    height: 128px;
  }
`

export default function BasicInfoForm(props) {

    function handleFinish(ev) {
        console.log('handleFinish', ev)
    }

    function handleFinishFailed(ev) {
        console.log('handleFinishFailed', ev)
    }

    function handleShowMerchantAbbreviation(ev) {
        ev.preventDefault()
        showMerchantAbbreviation()
    }

    return html`
        <div class=${_BasicInfoForm}>
            <div class="title">商户基本信息</div>
            <div class="form">
                <${Form} name="account"
                         onFinish=${handleFinish}
                         onFinishFailed=${handleFinishFailed}
                         labelCol=${{ span: 4 }}
                         wrapperCol=${{ span: 10 }}
                         autoComplete="off">
                    <${FormItem} label="商户类型"
                                 name="merchantType"
                                 rules=${[{ required: true, message: '请选择商户类型', }]}>
                        <${Select} defaultValue="1">
                            <Option value="1">个体商户</Option>
                            <Option value="2">企业商户</Option>
                            <Option value="2">小微商户</Option>
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
                                 rules=${[{ required: true, message: '请输入登陆账号', }]}>
                        <${Upload} listType="picture-card">
                            <div>
                                <${PlusOutlined}/>
                                <div style=${{ marginTop: 8 }}>Upload</div>
                            </div>
                        </Upload>
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
                    <${FormItem} label="营业执照有效期">
                        <${Space}>
                            <${FormItem} label="营业执照有效期"
                                         noStyle
                                         name="businessLicensePeriod">
                                <${RangePicker} allowEmpty=${[false, true]}/>
                            </FormItem>
                            <${Checkbox}>长期</Checkbox>
                        </Space>
                    </FormItem>
                    <${FormItem} wrapperCol=${{ offset: 10, span: 16 }}>
                        <${Button} htmlType="button">
                            返回
                        </Button>
                        <${Button} htmlType="button">
                            上一步
                        </Button>
                        <${Button} type="primary" htmlType="submit">
                            下一步
                        </Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    `
}