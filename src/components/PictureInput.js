import { css, cx, html, message, Modal, PlusOutlined, Upload, useState } from '../modules.js'
import { uploadImage } from '../apis/upload.js'

const _PictureInput = css`

  & .ant-upload-list-picture-card-container {
    width: 164px;
    height: 102px;

    & img {
      object-fit: cover;
    }
  }

  & .ant-upload {
    width: 164px;
    height: 102px;
  }

  &.uploaded .ant-upload {
    display: none;
  }
`

export default function PictureInput(props) {

    const value = props.value || undefined
    const onChange = props.onChange || (() => undefined)

    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewTitle, setPreviewTitle] = useState('')
    const [previewImage, setPreviewImage] = useState('')

    const uploadProps = {
        accept: '.png,.jpg,.jpeg',
        maxCount: 1,
        listType: 'picture-card',
        defaultFileList: [value].filter(it => !!it),
        async customRequest(options) {
            const { file, onSuccess, onError } = options
            try {
                const result = await uploadImage(file)
                if (!result || result.status) {
                    onError(new Error(result.message))
                    return
                }
                message.info(result.message)
                const url = `/uploads/xw/${result.url}.png`
                onSuccess(url)
                onChange({
                    name: file.name,
                    thumbUrl: url,
                    url,
                    urlValue: result.url,
                    originalFile: file,
                })
                if (typeof props.onFileInput === 'function') {
                    await props.onFileInput(file)
                }
            } catch (err) {
                onError(err)
            }
        },
        onRemove(ev) {
            onChange()
        },
        async onPreview(ev) {
            const file = value
            setPreviewTitle(file.name)
            setPreviewImage(file.url)
            setPreviewVisible(true)
        },
    }

    function handleCancelPreview() {
        setPreviewVisible(false)
    }

    return html`
        <div class=${cx(_PictureInput, value ? 'uploaded' : '', props.class)}>
            <${Upload} ...${uploadProps}>
                <${PlusOutlined}/>
            </Upload>
            <${Modal} visible=${previewVisible}
                      title=${previewTitle}
                      footer=${null}
                      onCancel=${handleCancelPreview}>
                <img alt="" style=${{ width: '100%' }} src=${previewImage}/>
            </Modal>
        </div>
    `
}