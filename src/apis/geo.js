import { message } from '../modules.js'
import { csrfToken } from './csrfToken.js'

const API = '/home/xiaowei'

let list

async function search(s) {
    if (list) {
        return list
    }
    const params = new URLSearchParams()
    params.append('action', 'searchAddCode')
    params.append('s', '')
    try {
        const response = await fetch(API, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'X-CSRF-TOKEN': csrfToken,
            },
            body: params,
        })
        const result = await response.json()
        list = (result.data || [])
        return list
    } catch (err) {
        message.error(err.message)
    }
}

let provinceList

export async function searchProvince(s) {
    if (provinceList) {
        return provinceList.filter(it => it.name.includes(s))
    }
    const data = await search(s) || []
    provinceList = data.filter(it => it.code.endsWith('0000')).map(it => {
        return {
            ...it,
            name: it.name.split(',').pop(),
        }
    })
    return provinceList.filter(it => it.name.includes(s))
}

export async function searchCity(s, p = '') {
    const data = await search(s) || []
    let cityList = data.filter(it => {
        return it.code.startsWith(p.substring(0, 2)) && it.code.endsWith('00')
    }).map(it => {
        return {
            ...it,
            name: it.name.split(',').pop(),
        }
    }).filter(it => it.name.includes(s))
    if (cityList.length > 1) {
        cityList = cityList.filter(it => !it.code.endsWith('0000'))
    }
    return cityList
}

export async function searchDistrict(s, p = '') {
    const data = await search(s) || []
    return data.filter(it => {
        if (String(p).endsWith('0000')) {
            return it.code.startsWith(p.substring(0, 2)) && !it.code.endsWith('00')
        } else {
            return it.code.startsWith(p.substring(0, 4)) && !it.code.endsWith('00')
        }
    }).map(it => {
        return {
            ...it,
            name: it.name.split(',').pop(),
        }
    }).filter(it => it.name.includes(s))
}