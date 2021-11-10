import { html, Input, Select, Space, useState, useCallback } from '../modules.js'
import { searchCity, searchDistrict, searchProvince } from '../apis/geo.js'
import { debounce } from '../utils/schedules.js'

export default function AddressInput(props) {
    const value = props.value || []
    const onChange = props.onChange || (() => undefined)

    const [option0, setOption0] = useState([])
    const [option1, setOption1] = useState([])
    const [option2, setOption2] = useState([])

    function handleChange0(ev) {
        onChange([ev, undefined, undefined, value[3]])
    }

    function handleChange1(ev) {
        onChange([value[0], ev, undefined, value[3]])

    }

    function handleChange2(ev) {
        onChange([value[0], value[1], ev, value[3]])
    }

    function handleChange3(ev) {
        const val = ev.target.value
        onChange([value[0], value[1], value[2], val])
    }

    const handleSearch0 = useCallback(debounce(async (ev) => {
        const data = await searchProvince(ev || '')
        setOption0(data)
    }, 500))

    const handleSearch1 = useCallback(debounce(async (ev) => {
        const data = await searchCity(ev || '', value[0])
        setOption1(data)
    }, 500))

    const handleSearch2 = useCallback(debounce(async (ev) => {
        const data = await searchDistrict(ev || '', value[1])
        setOption2(data)
    }, 500))

    return html`
        <${Space}>
            <${Select} showSearch
                       value=${value[0]}
                       onFocus=${() => handleSearch0()}
                       onSearch=${handleSearch0}
                       onChange=${handleChange0}
                       defaultActiveFirstOption=${false}
                       showArrow=${false}
                       filterOption=${false}
                       style=${{ width: '120px', }}
                       notFoundContent=${null}
                       placeholder="请输入省">
                ${option0.map(it => {
                    return html`
                        <${Option} key=${it.code} value=${it.code}>${it.name}</Option>
                    `
                })}
            </Select>
            <${Select}
                    showSearch
                    value=${value[1]}
                    onFocus=${() => handleSearch1()}
                    onSearch=${handleSearch1}
                    onChange=${handleChange1}
                    defaultActiveFirstOption=${false}
                    showArrow=${false}
                    filterOption=${false}
                    style=${{ width: '120px', }}
                    notFoundContent=${null}
                    placeholder="请输入市">
                ${option1.map(it => {
                    return html`
                        <${Option} key=${it.code} value=${it.code}>${it.name}</Option>
                    `
                })}
            </Select>
            <${Select} showSearch
                       value=${value[2]}
                       onFocus=${() => handleSearch2()}
                       onSearch=${handleSearch2}
                       onChange=${handleChange2}
                       defaultActiveFirstOption=${false}
                       showArrow=${false}
                       filterOption=${false}
                       style=${{ width: '120px', }}
                       notFoundContent=${null}
                       placeholder="请输入区/县">
                ${option2.map(it => {
                    return html`
                        <${Option} key=${it.code} value=${it.code}>${it.name}</Option>
                    `
                })}
            </Select>
            <${Input} onChange=${handleChange3} value=${value[3]} style=${{ width: '360px' }}
                      placeholder="详细地址需超过5个字, 详细到门牌号"/>
        </Space>
    `
}

AddressInput.validator = async (rule, value) => {
    if (value) {
        if (!value[0]) {
            throw new Error('请选择省')
        }
        if (!value[1]) {
            throw new Error('请选择市')
        }
        if (!value[2]) {
            throw new Error('请选择区县')
        }
        if (!value[3] || String(value[3]).length < 5) {
            throw new Error('请输入详细地址，详细地址需超过5个字, 详细到门牌号')
        }
    }
}