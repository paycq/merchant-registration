import { message } from '../modules.js'

export const AMAP_KEY = 'eea4288915d460c036f130b5f6544f94'

export async function getAddressGeo(address = '') {
    const params = new URLSearchParams()
    params.append('key', AMAP_KEY)
    params.append('address', address)
    const response = await fetch('http://restapi.amap.com/v3/geocode/geo?' + params.toString())
    const result = await response.json()
    if (result.status === 0) {
        message.error(result.info)
        return []
    } else {
        return result.geocodes || []
    }
}