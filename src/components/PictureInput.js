import { css, cx, html, Modal, PlusOutlined, Upload, useState } from '../modules.js'

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })
}

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
        async beforeUpload(ev) {
            const file = ev
            file.thumbUrl = await getBase64(file)
            onChange(file)
            return false
        },
        onRemove(ev) {
            onChange()
        },
        async onPreview(ev) {
            const file = ev
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj || file)
            }
            setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
            setPreviewImage(file.url || file.preview)
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