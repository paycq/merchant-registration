import { Button, css, html } from './modules.js'

const _SubmitForReview = css`
  background-color: #fff;
  margin-top: 20px;
  border-radius: 2px;
  padding: 0 24px 24px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > span {
    font-size: 20px;
  }

  & > button {
    margin-top: 16px;
    min-width: 80px;
    height: 40px;
  }
`

export default function SubmitForReview(props) {

    function handleConfirm(ev) {
        console.log('handleConfirm')
    }

    return html`
        <div class=${_SubmitForReview}>
            <span>提交成功，等待审核</span>
            <${Button} type=${'primary'} htmlType="submit" onClick=${handleConfirm}>我知道了</Button>
        </div>
    `
}