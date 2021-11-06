export const { css, cx, injectGlobal } = window['emotion']

export const { createElement, useState, useReducer } = window['React']
export const { render } = window['ReactDOM']

const htm = window['htm']
export const html = htm.bind(createElement);

export const {
    PlusOutlined,
    InfoCircleOutlined,
} = window['icons']

export const {
    locales,
    ConfigProvider,
    Button,
    Modal,
    Steps,
    Form,
    Input,
    Select,
    Space,
    Typography,
    Upload,
    DatePicker,
    Checkbox,
    Cascader,
    Row,
    Col,
    Divider,
    Tooltip,
} = window['antd']

