import { html, Input, Select, Space, useState, useCallback, useEffect, useRef, css, AMap } from '../modules.js'
import { searchCity, searchDistrict, searchProvince } from '../apis/geo.js'
import { debounce } from '../utils/schedules.js'
import { getAddressGeo } from '../apis/amap.js'

const _MapContainer = css`
  margin-top: 10px;
  height: 200px;
  width: 380px;

  & .amap-logo {
    display: none;
  }

  & .amap-copyright {
    opacity: 0;
  }
`

export default function AddressInput(props) {
    const value = props.value || []
    const onChange = props.onChange || (() => undefined)
    const onLocationChange = props.onLocationChange || (() => undefined)

    const mapContainerRef = useRef()
    const aMapRef = useRef()

    const [option0, setOption0] = useState([])
    const [option1, setOption1] = useState([])
    const [option2, setOption2] = useState([])

    const debounceRef = useRef()

    useEffect(() => {
        aMapRef.current = new AMap.Map(mapContainerRef.current)
    }, [])

    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current)
        }
        debounceRef.current = setTimeout(async () => {
            debounceRef.current = undefined
            const name0 = option0.find(it => it.code === value[0])?.name
            const name1 = option1.find(it => it.code === value[1])?.name
            const name2 = option2.find(it => it.code === value[2])?.name
            const name3 = value[3]
            const address = [name0, name1, name2, name3].filter(it => !!it).join('')
            const result = await getAddressGeo(address)
            if (!result.length) {
                return
            }
            const location = result[0].location
            const lngLat = location.split(',').map(it => Number(it))
            const position = new AMap.LngLat(...lngLat)
            const marker = new AMap.Marker({ position, title: address, })
            aMapRef.current.clearMap()
            aMapRef.current.add(marker)
            aMapRef.current.setZoomAndCenter(13, position)
            onLocationChange(lngLat)
        }, 1000)
    }, [value[0], value[1], value[2], value[3]])

    function handleChange0(ev) {
        onChange([ev, undefined, undefined, value[3],])
    }

    function handleChange1(ev) {
        onChange([value[0], ev, undefined, value[3],])

    }

    function handleChange2(ev) {
        onChange([value[0], value[1], ev, value[3],])
    }

    function handleChange3(ev) {
        const val = ev.target.value
        onChange([value[0], value[1], value[2], val,])
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

    useEffect(() => {
        if (value[0]) {
            handleSearch0()
        }
        if (value[1]) {
            handleSearch1()
        }
        if (value[2]) {
            handleSearch2()
        }
    }, [])

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
                       placeholder="????????????">
                ${option0.map(it => {
                    return html`
                        <${Option} key=${it.code} value=${it.code}>${it.name}</Option>
                    `
                })}
            </Select>
            <${Select} showSearch
                       value=${value[1]}
                       onFocus=${() => handleSearch1()}
                       onSearch=${handleSearch1}
                       onChange=${handleChange1}
                       defaultActiveFirstOption=${false}
                       showArrow=${false}
                       filterOption=${false}
                       style=${{ width: '120px', }}
                       notFoundContent=${null}
                       placeholder="????????????">
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
                       placeholder="????????????/???">
                ${option2.map(it => {
                    return html`
                        <${Option} key=${it.code} value=${it.code}>${it.name}</Option>
                    `
                })}
            </Select>
            <${Input} onChange=${handleChange3} value=${value[3]} style=${{ width: '360px' }}
                      placeholder="?????????????????????5??????, ??????????????????"/>
        </Space>
        <div class=${_MapContainer} ref=${mapContainerRef}/>
    `
}

AddressInput.validator = async (rule, value) => {
    if (value) {
        if (!value[0]) {
            throw new Error('????????????')
        }
        if (!value[1]) {
            throw new Error('????????????')
        }
        if (!value[2]) {
            throw new Error('???????????????')
        }
        if (!value[3] || String(value[3]).length < 5) {
            throw new Error('?????????????????????????????????????????????5??????, ??????????????????')
        }
    }
}