import { csrfToken } from './csrfToken.js'
import { message } from '../modules.js'

const API = '/home/xiaowei'

/**
 * Branch Bank Area
 */
export async function getBankInfo(cityCode, bankName) {
    const formData = new FormData()
    formData.append('action', 'getBankInfo')
    formData.append('city_code', cityCode)
    formData.append('bank_name', bankName)
    try {
        const response = await fetch(API, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'X-CSRF-TOKEN': csrfToken,
            },
            body: formData
        })
        return await response.json()
    } catch (err) {
        message.error(err.message)
    }
}