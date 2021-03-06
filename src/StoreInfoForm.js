import {
    css,
    html,
    Button,
    Form,
    Input, useState,
} from './modules.js'
import PhotoSample from './components/PhotoSample.js'
import PictureInput from './components/PictureInput.js'
import { submit } from './apis/submit.js'

const { Item: FormItem } = Form
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

  & .ant-form-item-control-input-content > button.ant-btn {
    min-width: 80px;
    height: 40px;
    margin-left: 8px;
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

    const { state, dispatch } = props
    const [submitting, setSubmitting] = useState(false)

    async function handleFinish(ev) {
        setSubmitting(true)
        dispatch({ type: 'updateStoreInfo', payload: ev, })
        try {
            await submit({
                ...state,
                storeInfo: ev,
            })
            dispatch({ type: 'nextStep' })
        } finally {
            setSubmitting(false)
        }
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

    return html`
        <${Form} name="account"
                 onFinish=${handleFinish}
                 onFinishFailed=${handleFinishFailed}
                 initialValues=${state.storeInfo}
                 ...${commonLayout}
                 autoComplete="off">
            <div class=${_BillingInfoForm}>
                <div class="title color-gray-600">????????????</div>
                <div class="form">
                    <${FormItem} label="????????????"
                                 name="storeName"
                                 rules=${[{ required: true, message: '?????????????????????', }]}>
                        <${Input} placeholder="?????????????????????"/>
                    </FormItem>
                    <${FormItem} label="????????????"
                                 name="storePhone"
                                 rules=${[{ required: true, message: '?????????????????????', }]}>
                        <${Input} placeholder="?????????????????????"/>
                    </FormItem>
                    <${FormItem} label="???????????????" required>
                        <div class="photo-tip">??????????????????????????????????????????????????????2M</div>
                        <${FormItem} noStyle name="storeFrontPhoto"
                                     rules=${[{ required: true, message: '?????????????????????', }]}>
                            <${PictureInput} class="inline-block vertical-top"/>
                        </FormItem>
                        <div class="inline-block vertical-top">
                            <${PhotoSample} textTip="????????????????????????"
                                            imageUrl=${new URL('./images/store_door_example.png', import.meta.url)}/>
                        </div>
                    </FormItem>
                    <${FormItem} label="???????????????" required>
                        <div class="photo-tip">????????????????????????????????????????????????????????????????????????2M</div>
                        <${FormItem} noStyle name="payBoardPhoto"
                                     rules=${[{ required: true, message: '????????????????????????', }]}>
                            <${PictureInput} class="inline-block vertical-top"/>
                        </FormItem>
                        <div class="inline-block vertical-top">
                            <${PhotoSample} textTip="????????????????????????"
                                            imageUrl=${new URL('./images/pay_board_example.png', import.meta.url)}/>
                        </div>
                    </FormItem>
                    <${FormItem} label="???????????????" required>
                        <div class="photo-tip">??????????????????????????????????????????????????????????????????????????????????????????2M</div>
                        <${FormItem} noStyle name="storeEnvironmentPhoto"
                                     rules=${[{ required: true, message: '????????????????????????', }]}>
                            <${PictureInput} class="inline-block vertical-top"/>
                        </FormItem>
                        <div class="inline-block vertical-top">
                            <${PhotoSample} textTip="???????????????????????????"
                                            imageUrl=${new URL('./images/store_environment_example.png', import.meta.url)}/>
                        </div>
                    </FormItem>
                </div>
            </div>
            <div class=${_BillingInfoForm} style=${{ marginTop: '8px' }}>
                <div class="title color-gray-600">????????????????????????</div>
                <div class="form">
                    <${FormItem} label="???????????????">
                        <${FormItem} noStyle name="licensePhoto">
                            <${PictureInput} class="inline-block vertical-top"/>
                        </FormItem>
                        <div class="inline-block vertical-top">
                            <${PhotoSample} textTip="????????????????????????"
                                            imageUrl=${new URL('./images/license_example.png', import.meta.url)}/>
                        </div>
                    </FormItem>
                    <${FormItem} label="????????????">
                        <div class="photo-tip">?????????????????????????????????</div>
                        <${FormItem} noStyle name="otherPhoto">
                            <${PictureInput} class="inline-block vertical-top"/>
                        </FormItem>
                    </FormItem>

                    <!-- button -->
                    <${FormItem} wrapperCol=${{ offset: 10, span: 16 }}>
                        <${Button} onClick=${handleClickBack} htmlType="button">
                            ??????
                        </Button>
                        <${Button} onClick=${handleClickPreviousStep} htmlType="button">
                            ?????????
                        </Button>
                        <${Button} loading=${submitting} type=${'primary'} htmlType="submit">
                            ????????????
                        </Button>
                    </FormItem>
                </div>
            </div>
        </Form>

    `
}