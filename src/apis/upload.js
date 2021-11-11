import { message } from '../modules.js'
import { csrfToken } from './csrfToken.js'

const API = '/home/xiaowei'

/**
 * 上传图片
 * @param {File} file
 * @returns {Promise<any>}
 */
export async function uploadImage(file) {
    const formData = new FormData()
    formData.append('action', 'uploadMedia')
    formData.append('url', '/home/xiaowei')
    formData.append('image', file)
    try {
        const response = await fetch(API, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'X-CSRF-TOKEN': csrfToken,
            },
            body: formData,
        })
        return await response.json()
    } catch (err) {
        message.error(err.message)
    }
}

/**
 * 身份证正反面识别
 * @param {File} file
 * @param {'front' | 'back'} idCardSide 正反面
 * @returns {Promise<any>}
 */
export async function uploadIdCard(file, idCardSide) {
    const formData = new FormData()
    formData.append('action', 'uploadCard')
    formData.append('url', '/home/xiaowei')
    formData.append('idCardSide', idCardSide)
    formData.append('file', file)
    try {
        const response = await fetch(API, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'X-CSRF-TOKEN': csrfToken,
            },
            body: formData,
        })
        return await response.json()
    } catch (err) {
        message.error(err.message)
    }
}

/**
 * 营业执照识别
 *
 * @param {File} file
 * @returns {Promise<any>}
 */
export async function uploadLicense(file) {
    const formData = new FormData()
    formData.append('action', 'uploadLicense')
    formData.append('url', '/home/xiaowei')
    formData.append('file', file)
    try {
        const response = await fetch(API, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'X-CSRF-TOKEN': csrfToken,
            },
            body: formData,
        })
        return await response.json()
    } catch (err) {
        message.error(err.message)
    }
}