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
import PhotoSample from './components/PhotoSample.js'

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

  & .photo-tip {
    font-size: 14px;
    color: #b3b3b3;
    box-sizing: border-box;
    height: 32px;
    line-height: 32px;
    margin-bottom: 4px;
  }
`

export default function StoreInfoForm(props) {
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
                <div class="title color-gray-600">门店信息</div>
                <div class="form">
                    <${FormItem} label="门店名称"
                                 name="storeName"
                                 rules=${[{ required: true, message: '请输入门店名称', }]}>
                        <${Input} placeholder="请输入门店名称"/>
                    </FormItem>
                    <${FormItem} label="门店电话"
                                 name="storePhone"
                                 rules=${[{ required: true, message: '请输入门店电话', }]}>
                        <${Input} placeholder="请输入门店电话"/>
                    </FormItem>
                    <${FormItem} label="门店门头照"
                                 name="storeFrontPhoto"
                                 rules=${[{ required: true, message: '请输入门店门头照', }]}>
                        <div class="photo-tip">门店门头招牌信息可见，图片大小不超过2M</div>
                        <div class="inline-block vertical-top">
                            <${Upload} listType="picture-card">
                                <div>
                                    <${PlusOutlined}/>
                                    <div style=${{ marginTop: 8 }}>上传</div>
                                </div>
                            </Upload>
                        </div>
                        <div class="inline-block vertical-top">
                            <${PhotoSample} textTip="门店门头照（例）"
                                            imageUrl=${new URL('./images/store_door_example.png', import.meta.url)}/>
                        </div>
                    </FormItem>
                    <${FormItem} label="收银台照片"
                                 name="payBoardPhoto"
                                 rules=${[{ required: true, message: '请输入收银台照片', }]}>
                        <div class="photo-tip">收银台需展示商家收银柜台和收款机，图片大小不超过2M</div>
                        <div class="inline-block vertical-top">
                            <${Upload} listType="picture-card">
                                <div>
                                    <${PlusOutlined}/>
                                    <div style=${{ marginTop: 8 }}>上传</div>
                                </div>
                            </Upload>
                        </div>
                        <div class="inline-block vertical-top">
                            <${PhotoSample} textTip="收银台照片（例）"
                                            imageUrl=${new URL('./images/pay_board_example.png', import.meta.url)}/>
                        </div>
                    </FormItem>
                    <${FormItem} label="店内环境照"
                                 name="storeEnvironmentPhoto"
                                 rules=${[{ required: true, message: '请输入店内环境照', }]}>
                        <div class="photo-tip">店内照片需清晰可见，包括但不限于桌子、餐具等，图片大小不超过2M</div>
                        <div class="inline-block vertical-top">
                            <${Upload} listType="picture-card">
                                <div>
                                    <${PlusOutlined}/>
                                    <div style=${{ marginTop: 8 }}>上传</div>
                                </div>
                            </Upload>
                        </div>
                        <div class="inline-block vertical-top">
                            <${PhotoSample} textTip="店内环境照片（例）"
                                            imageUrl=${new URL('./images/store_environment_example.png', import.meta.url)}/>
                        </div>
                    </FormItem>
                </div>
            </div>
            <div class=${_BillingInfoForm} style=${{ marginTop: '8px' }}>
                <div class="title color-gray-600">其他信息（选填）</div>
                <div class="form">
                    <${FormItem} label="经营许可证"
                                 name="licensePhoto">
                        <div class="inline-block vertical-top">
                            <${Upload} listType="picture-card">
                                <div>
                                    <${PlusOutlined}/>
                                    <div style=${{ marginTop: 8 }}>上传</div>
                                </div>
                            </Upload>
                        </div>
                        <div class="inline-block vertical-top">
                            <${PhotoSample} textTip="经营许可证（例）"
                                            imageUrl=${new URL('./images/license_example.png', import.meta.url)}/>
                        </div>
                    </FormItem>
                    <${FormItem} label="其他照片"
                                 name="otherPhoto">
                        <div class="photo-tip">用于上传要求的其他资料</div>
                        <div class="inline-block vertical-top">
                            <${Upload} listType="picture-card">
                                <div>
                                    <${PlusOutlined}/>
                                    <div style=${{ marginTop: 8 }}>上传</div>
                                </div>
                            </Upload>
                        </div>
                    </FormItem>

                    <!-- button -->
                    <${FormItem} wrapperCol=${{ offset: 10, span: 16 }}>
                        <${Button} htmlType="button">
                            返回
                        </Button>
                        <${Button} htmlType="button">
                            上一步
                        </Button>
                        <${Button} type="primary" htmlType="submit">
                            提交审核
                        </Button>
                    </FormItem>
                </div>
            </div>
        </Form>

    `
}