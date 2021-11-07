import { message } from '../modules.js'
import { csrfToken } from './csrfToken.js'

const API = '/home/xiaowei'

export async function uploadImage(file) {
    const formData = new FormData()
    formData.append('action', 'uploadMedia')
    // formData.append('url', '/home/xiaowei')
    // formData.append('fid', '')
    // formData.append('id', 'store_env')
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