import {css, html, Button, Form, Input, Select} from './modules.js'

const {Item: FormItem} = Form

const _AccountInformationForm = css`
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

export default function AccountInfoForm(props) {
    const {state, dispatch} = props
    const [form] = Form.useForm()

    function handleFinish(ev) {
        dispatch({type: 'updateAccountInfo', payload: ev,})
        dispatch({type: 'nextStep'})
    }

    function handleFinishFailed(ev) {
        console.log('handleFinishFailed', JSON.stringify(ev, null, 2))
    }

    function handleClickBack(ev) {
        window.location = '/home/xiaowei/list'
    }

    function handleLoginAccountFocus() {
        const registrationMobile = form.getFieldValue('registrationMobile')
        const loginAccount = form.getFieldValue('loginAccount')
        if (registrationMobile && loginAccount === undefined) {
            form.setFieldsValue({loginAccount: registrationMobile})
        }
    }

    return html`
        <div class=${_AccountInformationForm}>
            <div class="title color-gray-600">商户账号信息</div>
            <div class="form">
                <${Form} name="account"
                         onFinish=${handleFinish}
                         onFinishFailed=${handleFinishFailed}
                         initialValues=${state.accountInfo}
                         form=${form}
                         labelCol=${{span: 4}}
                         wrapperCol=${{span: 10}}
                         autoComplete="off">
                    <${FormItem} label="所属授理商"
                                 name="ownership"
                                 rules=${[{required: true, message: '请选择所属授理商',}]}>
                        <${Select} placeholder="请选择">
                            ${state.fidOptionsList.map(it => {
                                return html`
                                    <Option value=${it.value}>${it.label}</Option>
                                `
                            })}
                        </Select>
                    </FormItem>
                    <${FormItem} label="注册手机"
                                 name="registrationMobile"
                                 rules=${[
                                     {required: true, message: '请输入注册手机',},
                                     {pattern: /^1[0-9]{10}$/, message: '请输入11位正确手机号',},
                                 ]}>
                        <${Input} placeholder="11位正确手机号，用于登录账号密码找回"/>
                    </FormItem>
                    <${FormItem} label="登陆账号"
                                 name="loginAccount"
                                 extra="注：商户初始密码为注册手机号后6位"
                                 rules=${[{required: true, message: '请输入登陆账号',}]}>
                        <${Input} onFocus=${handleLoginAccountFocus} placeholder="建议使用手机号，支持2-50位数字/字母/中文" allowClear/>
                    </FormItem>
                    <!-- button -->
                    <${FormItem} wrapperCol=${{offset: 10, span: 16}}>
                        <${Button} onClick=${handleClickBack} htmlType="button">
                            返回
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