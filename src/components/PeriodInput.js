import { Checkbox, DatePicker, html, Space } from '../modules.js'

const { RangePicker } = DatePicker

export default function PeriodInput(props) {

    const value = props.value || { period: [], longTerm: false }
    const onChange = props.onChange || (() => undefined)

    function handlePeriodChange(ev) {
        const period = ev || []
        if (period[1]) {
            onChange({
                longTerm: false,
                period,
            })
        } else {
            onChange({
                ...value,
                period,
            })
        }
    }

    function handleLongTermChange(ev) {
        const longTerm = ev.target.checked
        if (longTerm) {
            onChange({
                period: [value.period[0], null],
                longTerm,
            })
        } else {
            onChange({
                ...value,
                longTerm,
            })
        }
    }

    return html`
        <${Space}>
            <${RangePicker} value=${value.period} onChange=${handlePeriodChange}
                            allowEmpty=${[false, true]}></RangePicker>
            <${Checkbox} checked=${value.longTerm} onChange=${handleLongTermChange}>长期</Checkbox>
        </Space>
    `
}
