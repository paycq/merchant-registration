import {
    css,
    html,
    Button,
    Form,
    Input,
    Select,
    Space,
    Typography,
    DatePicker,
    Col,
    Row,
    Divider,
    Tooltip,
    InfoCircleOutlined, useState,
} from './modules.js'
import PictureInput from './components/PictureInput.js'
import PeriodInput from './components/PeriodInput.js'
import bankList from './data/bank_list.js'

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

    & > .ant-form-item:first-child {
      color: #1890ff;

      & label {
        color: #1890ff;
      }
    }
  }

  & .ant-form-item-control-input-content > button.ant-btn {
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

  & .photo-tip {
    font-size: 14px;
    color: #1890ff;
    box-sizing: border-box;
    height: 32px;
    line-height: 32px;
    margin-bottom: 4px;
  }
`

export default function BillingInfoForm(props) {

    const { state, dispatch } = props
    const [form] = Form.useForm()

    const [settler, setSettler] = useState(state.billingInfo.settlementType.settler)

    function handleSelectLegalPersonSettlement(ev) {
        const selectedSettler = form.getFieldValue('settlementType').settler
        if (selectedSettler === settler) {
            return
        }
        setSettler(selectedSettler)
    }

    function handleFinish(ev) {
        dispatch({ type: 'updateBillingInfo', payload: ev, })
        dispatch({ type: 'nextStep' })
    }

    function handleFinishFailed(ev) {
        console.log('handleFinishFailed', JSON.stringify(ev, null, 2))
    }

    function handleClickPreviousStep(ev) {
        dispatch({ type: 'previousStep', })
    }

    function handleClickBack(ev) {
        window.location = '/home/xiaowei/list'
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
                 form=${form}
                 onFinish=${handleFinish}
                 onFinishFailed=${handleFinishFailed}
                 initialValues=${state.billingInfo}
                 ...${commonLayout}
                 autoComplete="off">
            <div class=${_BillingInfoForm}>
                <div class="title color-gray-600">商户结算信息</div>
                <div class="form">
                    <${FormItem} label="注">请保持银行卡信息(证件号码、开户名、卡号)的正确性</FormItem>
                    <${FormItem} label="结算类型"
                                 required>
                        <${Space}>
                            <${FormItem} name=${['settlementType', 'accountType']}
                                         noStyle
                                         rules=${[{ required: true, message: '请选择结算类型' }]}>
                                <${Select} style=${{ width: '168px', }}>
                                    <${Option} value="1">对私账户</Option>
                                    <${Option} value="2">对公账户</Option>
                                </Select>
                            </FormItem>
                            <${FormItem} name=${['settlementType', 'settler']}
                                         noStyle
                                         rules=${[{ required: true, message: '请选择结算类型' }]}>
                                <${Select} onChange=${handleSelectLegalPersonSettlement} style=${{ width: '168px', }}>
                                    <${Option} value="1">法人结算</Option>
                                    <${Option} value="0">非法人结算</Option>
                                </Select>
                            </FormItem>
                        </Space>
                    </FormItem>
                    ${settler === '0' && html`
                        <${FormItem} label="非法人授权书" required>
                            <div class="photo-tip">
                                <a target="_blank"
                                   href="https://test-fshows-public.oss-cn-hangzhou.aliyuncs.com/merchant_open/not_legal_prove.pdf">
                                    非法人授权书下载
                                </a>
                            </div>
                            <${FormItem} noStyle name="notLegalPersonSettlerAuthorizationFile "
                                         rules=${[{ required: true, message: '请上传非法人授权书' }]}>
                                <${PictureInput} class="inline-block vertical-top"/>
                            </FormItem>
                        </FormItem>
                        <${FormItem} label="结算人身份证照片" required>
                            <div class="inline-block">
                                <${FormItem} name=${['settlerIdPhoto', 'A']}
                                             noStyle
                                             rules=${[{ required: true, message: '请上传身份证人像面' }]}>
                                    <${PictureInput}/>
                                </FormItem>
                                <div class="text-center color-gray-600">身份证人像面</div>
                            </div>
                            <div class="inline-block">
                                <${FormItem} name=${['settlerIdPhoto', 'B']}
                                             noStyle
                                             rules=${[{ required: true, message: '请上传身份证国徽面' }]}>
                                    <${PictureInput}/>
                                </FormItem>
                                <div class="text-center color-gray-600">身份证国徽面</div>
                            </div>
                        </FormItem>
                        <${FormItem} label="结算人姓名"
                                     name="settlerName"
                                     rules=${[{ required: true, message: '请输入结算人姓名', }]}>
                            <${Input} placeholder="请输入结算人姓名"/>
                        </FormItem>
                        <${FormItem} label="身份证号"
                                     name="settlerIdCardNumber"
                                     rules=${[{ required: true, message: '请输入身份证号', }]}>
                            <${Input} placeholder="请输入身份证号"/>
                        </FormItem>
                        <${FormItem} label="身份证有效期"
                                     name="settlerIdPeriod"
                                     rules=${[
                                         { required: true, message: '请输入身份证有效期', },
                                         { validator: PeriodInput.validator, },
                                     ]}
                                     required>
                            <${PeriodInput}/>
                        </FormItem>
                    `}
                    <${FormItem} label="银行卡照片"
                                 name="bankCardPhoto"
                                 rules=${[{ required: true, message: '请上传银行卡照片', }]}>
                        <${PictureInput}/>
                    </FormItem>
                    <${FormItem} label="银行卡号"
                                 name="bankCardNumber"
                                 rules=${[
                                     { required: true, message: '请输入银行卡号', },
                                     { pattern: /^[0-9]{12,19}$/, message: '请输入正确银行卡号', },
                                 ]}>
                        <${Input} placeholder="请输入银行卡号"/>
                    </FormItem>
                    <${FormItem} label="所属银行"
                                 name="bank"
                                 rules=${[{ required: true, message: '请选择所属银行', }]}>
                        <${Select} showSearch
                                   optionFilterProp="children"
                                   filterOption=${(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                   placeholder="请选择所属银行">
                            ${bankList.map(it => {
                                return html`
                                    <${Option} value=${it.bankNo}>${it.bankName}</Option>
                                `
                            })}
                        </Select>
                    </FormItem>
                </div>
            </div>
            <div class=${_BillingInfoForm} style=${{ marginTop: '8px' }}>
                <div class="title color-gray-600">商户费率</div>
                <div class="form">
                    <${Row} gutter=${16}>
                        <${Col} className="gutter-row" span=${8}>
                        <${FormItem} label="微信费率"
                                     ...${rateLayout}
                                     extra="请设置2.50 ~ 100.00的值">
                            <${FormItem} name="wechatPayRate"
                                         noStyle
                                         rules=${[{ required: true }]}>
                                <${Input} style=${{ width: '50%', }}/>
                            </FormItem>
                            <span class="unit-tip">(单位:千分之一)</span>
                        </FormItem>
                        </Col>
                        <${Col} className="gutter-row" span=${8}>
                        <${FormItem} label="支付宝费率"
                                     ...${rateLayout}
                                     extra="请设置2.50 ~ 100.00的值"
                                     rules=${[{ required: true }]}>
                            <${FormItem} name="alipayRate"
                                         noStyle
                                         rules=${[{ required: true }]}>
                                <${Input} style=${{ width: '50%', }}/>
                            </FormItem>
                            <span class="unit-tip">(单位:千分之一)</span>
                        </FormItem>
                        </Col>
                        <${Col} className="gutter-row" span=${8}>
                        <${FormItem} label="银联费率"
                                     ...${rateLayout}
                                     extra="请设置2.50 ~ 100.00的值"
                                     rules=${[{ required: true }]}>
                            <${FormItem} name="unionPayRate"
                                         noStyle
                                         rules=${[{ required: true }]}>
                                <${Input} style=${{ width: '50%', }}/>
                            </FormItem>
                            <span class="unit-tip">(单位:千分之一)</span>
                        </FormItem>
                        </Col>
                    </Row>
                    <${Divider} orientation="left" plain>
                        <strong>银行卡费率（D1结算）</strong>
                    </Divider>
                    <${Row} gutter=${16}>
                        <${Col} className="gutter-row" span=${8}>
                        <${FormItem} label="借记卡费率"
                                     ...${rateLayout}
                                     extra="请设置4.20 ~ 50.00的值"
                                     rules=${[{ required: true }]}>
                            <${FormItem} name="cardRate"
                                         noStyle
                                         rules=${[{ required: true }]}>
                                <${Input} style=${{ width: '50%', }}/>
                            </FormItem>
                            <span class="unit-tip">(单位:千分之一)</span>
                        </FormItem>
                        </Col>
                        <${Col} className="gutter-row" span=${8}>
                        <${FormItem} name="cappedFee"
                                     label="封顶手续费"
                                     ...${rateLayout}
                                     extra="请设置18 ~ 500的值"
                                     rules=${[{ required: true }]}>
                            <${FormItem} name="cappedFee"
                                         noStyle
                                         rules=${[{ required: true }]}>
                                <${Input} style=${{ width: '50%', }}/>
                            </FormItem>
                            <span class="unit-tip">元</span>
                            <${Tooltip} title="若封顶设置为18元代理商则可能无返佣，建议封顶金额设置大于18元">
                                <${InfoCircleOutlined}/>
                            </Tooltip>
                        </FormItem>
                        </Col>
                        <${Col} className="gutter-row" span=${8}>
                        <${FormItem} name="creditCardRate"
                                     label="贷记卡费率"
                                     ...${rateLayout}
                                     extra="请设置5.20 ~ 50.00的值"
                                     rules=${[{ required: true }]}>
                            <${FormItem} name="creditCardRate"
                                         noStyle
                                         rules=${[{ required: true }]}>
                                <${Input} style=${{ width: '50%', }}/>
                            </FormItem>
                            <span class="unit-tip">(单位:千分之一)</span>
                        </FormItem>
                        </Col>
                    </Row>
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
                </div>
            </div>
        </Form>

    `
}