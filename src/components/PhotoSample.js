import { css, html } from '../modules.js'

const _PhotoSample = css`
  width: 164px;
  height: 102px;
  position: relative;
  border-radius: 2px;
  overflow: hidden;

  & > img {
    object-fit: contain;
  }

  & > span {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 12px;
    color: #fff;
    text-align: center;
    background-color: rgba(0, 0, 0, .6);
    height: 26px;
    line-height: 26px;
  }
`

export default function PhotoSample(props = { imageUrl: '', textTip: '' }) {
    return html`
        <div class=${_PhotoSample}>
            <img src=${props.imageUrl} alt=""/>
            <span>${props.textTip}</span>
        </div>
    `
}