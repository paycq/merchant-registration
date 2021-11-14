export const { css, cx, injectGlobal } = window['emotion']
export const moment = window['moment']
export const { createElement, useState, useReducer, useCallback, useEffect, useRef } = window['React']
export const { render } = window['ReactDOM']
export const AMap = window['AMap']

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
    message,
    Radio,
} = window['antd']

