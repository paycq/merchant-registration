import { html, Input, Select, Space } from '../modules.js'

export default function AddressInput(props) {
    const value = props.value || []
    const onChange = props.onChange || (() => undefined)

    function handleChange0(ev) {
        onChange([ev, value[1], value[2], value[3]])
    }

    function handleChange1(ev) {
        onChange([value[0], ev, value[2], value[3]])

    }

    function handleChange2(ev) {
        onChange([value[0], value[1], ev, value[3]])
    }

    function handleChange3(ev) {
        const val = ev.target.value
        onChange([value[0], value[1], value[2], val])
    }

    return html`
        <${Space}>
            <${Select} onChange=${handleChange0} value=${value[0]}
                       style=${{ width: '120px', }} placeholder="请选择省">
                <${Option} value="shanghai">上海市</Option>
                <${Option} value="zhejiang">浙江省</Option>
            </Select>
            <${Select} onChange=${handleChange1} value=${value[1]} style=${{ width: '120px', }}
                       placeholder="请选择市">
                <${Option} value="shanghai">上海市</Option>
            </Select>
            <${Select} onChange=${handleChange2} value=${value[2]} style=${{ width: '120px', }}
                       placeholder="请选择区/县">
                <${Option} value="shanghai">上海市</Option>
            </Select>
            <${Input} onChange=${handleChange3} value=${value[3]} style=${{ width: '360px' }}
                      placeholder="详细地址需超过5个字, 详细到门牌号"/>
        </Space>
    `
}