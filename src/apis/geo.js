const API = '/home/xiaowei'

async function search(s) {
    const params = new URLSearchParams()
    params.append('action', 'searchZipCode')
    params.append('s', s)
    await fetch(API, {
        method: 'POST',
        body: params,
    })
}

export async function searchProvince(s) {
    const result = await search(s)
    console.log(result)
}

export async function searchCity(s) {

}

export async function searchDistrict(s) {

}