import { message } from '../modules.js'
import { csrfToken } from './csrfToken.js'

const API = '/home/xiaowei'

function normalizeName(it) {
    const split = it.name.split(',')
    const name = split[split.length - 1] || it.name
    return {
        ...it,
        name,
    }
}

async function search(s) {
    const params = new URLSearchParams()
    params.append('action', 'searchZipCode')
    params.append('s', s)
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
        return (result.data || []).map(normalizeName)
    } catch (err) {
        message.error(err.message)
    }
}

export async function searchProvince(s) {
    const data = await search(s) || []
    return data.filter(it => it.code.endsWith('0000'))
}

export async function searchCity(s, p) {
    console.log('searchCity', s, p)
    const data = await search(s) || []
    return data.filter(it => it.code.startsWith(p.substring(0, 2)) && it.code.endsWith('00'))

}

export async function searchDistrict(s, p) {
    console.log('searchDistrict', s, p)
    const data = await search(s) || []
    return data.filter(it => it.code.startsWith(p.substring(0, 2)) && !it.code.endsWith('00'))
}