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
    DatePicker,
    Checkbox,
    Cascader,
    Col,
    Row,
    Divider,
    Tooltip,
    InfoCircleOutlined,
} from './modules.js'

const { Option } = Select
const { Item: FormItem } = Form
const { Link } = Typography
const { RangePicker } = DatePicker

const _BillingInfoForm = css`
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

  & .ant-btn {
    min-width: 80px;
    height: 40px;
    margin-left: 8px;
  }

  & .ant-upload {
    width: 164px;
    height: 102px;
  }

  & .unit-tip {
    margin: 0 4px;
    font-size: 12px;
  }
`

export default function BillingInfoForm(props) {
    function handleFinish(ev) {
        console.log('handleFinish', ev)
    }

    function handleFinishFailed(ev) {
        console.log('handleFinishFailed', ev)
    }

    const commonLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 10 },
    }

    const rateLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }

    return html`
        <${Form} name="account"
                 onFinish=${handleFinish}
                 onFinishFailed=${handleFinishFailed}
                 ...${commonLayout}
                 autoComplete="off">
            <div class=${_BillingInfoForm}>
                <div class="title color-gray-600">商户结算信息</div>
                <div class="form">
                    <${FormItem} label="结算类型"
                                 name="businessAddress"
                                 rules=${[{ required: true, message: '请输入经营地址', }]}>
                        <${Select} style=${{ width: '168px', marginRight: '8px', }} defaultValue="privateAccount">
                            <${Option} value="privateAccount">对私账户</Option>
                        </Select>
                        <${Select} style=${{ width: '168px', marginRight: '8px', }} placeholder="请选择市"
                                   defaultValue="legalPersonSettlement">
                            <${Option} value="legalPersonSettlement">法人结算</Option>
                        </Select>
                    </FormItem>
                    <${FormItem} label="银行卡照片"
                                 name="bankCardPhoto"
                                 rules=${[{ required: true, message: '请输入登陆账号', }]}>
                        <${Upload} listType="picture-card">
                            <div>
                                <${PlusOutlined}/>
                                <div style=${{ marginTop: 8 }}>上传</div>
                            </div>
                        </Upload>
                    </FormItem>
                    <${FormItem} label="银行卡号"
                                 name="bankCardNumber"
                                 rules=${[{ required: true, message: '请输入银行卡号', }]}>
                        <${Input} placeholder="请输入银行卡号"/>
                    </FormItem>
                    <${FormItem} label="所属银行"
                                 name="bank"
                                 rules=${[{ required: true, message: '请选择所属银行', }]}>
                        <${Select} placeholder="请选择所属银行">
                            <${Option} value="a">银行A</Option>
                        </Select>
                    </FormItem>
                </div>
            </div>
            <div class=${_BillingInfoForm} style=${{ marginTop: '8px' }}>
                <div class="title color-gray-600">商户费率</div>
                <div class="form">
                    <${Row} gutter=${16}>
                        <${Col} className="gutter-row" span=${8}>
                        <${FormItem} name="cardRate"
                                     label="微信费率"
                                     ...${rateLayout}
                                     extra="请设置2.50 ~ 100.00的值"
                                     rules=${[{ required: true }]}>
                            <${Input} defaultValue="3.8" style=${{ width: '50%', }}/>
                            <span class="unit-tip">(单位:千分之一)</span>
                        </FormItem>
                        </Col>
                        <${Col} className="gutter-row" span=${8}>
                        <${FormItem} name="cardRate"
                                     label="支付宝费率"
                                     ...${rateLayout}
                                     extra="请设置2.50 ~ 100.00的值"
                                     rules=${[{ required: true }]}>
                            <${Input} defaultValue="3.8" style=${{ width: '50%', }}/>
                            <span class="unit-tip">(单位:千分之一)</span>
                        </FormItem>
                        </Col>
                        <${Col} className="gutter-row" span=${8}>
                        <${FormItem} name="cardRate"
                                     label="银联费率"
                                     ...${rateLayout}
                                     extra="请设置2.50 ~ 100.00的值"
                                     rules=${[{ required: true }]}>
                            <${Input} defaultValue="3.8" style=${{ width: '50%', }}/>
                            <span class="unit-tip">(单位:千分之一)</span>
                        </FormItem>
                        </Col>
                    </Row>
                    <${Divider} orientation="left" plain>
                        <strong>银行卡费率（D1结算）</strong>
                    </Divider>
                    <${Row} gutter=${16}>
                        <${Col} className="gutter-row" span=${8}>
                        <${FormItem} name="cardRate"
                                     label="借记卡费率"
                                     ...${rateLayout}
                                     extra="请设置4.20 ~ 50.00的值"
                                     rules=${[{ required: true }]}>
                            <${Input} defaultValue="4.20" style=${{ width: '50%', }}/>
                            <span class="unit-tip">(单位:千分之一)</span>
                        </FormItem>
                        </Col>
                        <${Col} className="gutter-row" span=${8}>
                        <${FormItem} name="cardRate"
                                     label="封顶手续费"
                                     ...${rateLayout}
                                     extra="请设置18 ~ 500的值"
                                     rules=${[{ required: true }]}>
                            <${Input} defaultValue="18" style=${{ width: '50%', }}/>
                            <span class="unit-tip">元</span>
                            <${Tooltip} title="若封顶设置为18元代理商则可能无返佣，建议封顶金额设置大于18元">
                                <${InfoCircleOutlined}/>
                            </Tooltip>
                        </FormItem>
                        </Col>
                        <${Col} className="gutter-row" span=${8}>
                        <${FormItem} name="cardRate"
                                     label="贷记卡费率"
                                     ...${rateLayout}
                                     extra="请设置5.20 ~ 50.00的值"
                                     rules=${[{ required: true }]}>
                            <${Input} defaultValue="5.20" style=${{ width: '50%', }}/>
                            <span class="unit-tip">(单位:千分之一)</span>
                        </FormItem>
                        </Col>
                    </Row>
                    <!-- button -->
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
                </div>
            </div>
        </Form>

    `
}