import { message } from '../modules.js'

export async function getDetail(id) {
    try {
        const response = await fetch(`/home/xiaowei/apply/${id}`)
        return await response.json()
    } catch (err) {
        message.error(err.message)
    }
}