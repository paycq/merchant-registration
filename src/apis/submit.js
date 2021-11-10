import { csrfToken } from './csrfToken.js'
import { message } from '../modules.js'

const API = '/home/xiaowei'

function getParamsFromState(state) {
    const params = new URLSearchParams()
    params.append('action', '')
    params.append('id', '')
    params.append('fid', '')
    params.append('base_info[merchant_type]', '')
    params.append('merchant_code', '')
    params.append('base_info[merchant_short_name]', '')
    params.append('base_info[contact_phone]', '')
    params.append('base_info[service_phone]', '')
    params.append('base_info[email]', '')
    params.append('shop_info[store_name]', '')
    params.append('shop_info[store_phone]', '')
    params.append('address_info[province_code]', '')
    params.append('address_info[city_code]', '')
    params.append('address_info[area_code]', '')
    params.append('address_info[street_address]', '')
    params.append('address_info[longitude]', '')
    params.append('address_info[latitude]', '')
    params.append('shop_info[store_front_photo]', '')
    params.append('shop_info[store_cash_photo]', '')
    params.append('shop_info[store_env_photo]', '')
    params.append('legal_person[legal_name]', '')
    params.append('legal_person[legal_num]', '')
    params.append('legal_person[legal_id_card_start]', '')
    params.append('legal_person[legal_id_card_end]', '')
    params.append('legal_person[legal_id_card_front_photo]', '')
    params.append('legal_person[legal_id_card_back_photo]', '')
    params.append('legal_person[hand_hold_id_card_photo]', '')
    params.append('account_info[account_type]', '')
    params.append('account_info[legal_flag]', '')
    params.append('account_info[unionpay_code]', '')
    params.append('account_info[real_name]', '')
    params.append('account_info[id_card_no]', '')
    params.append('account_info[bank_card_no]', '')
    params.append('account_info[id_card_front_photo]', '')
    params.append('account_info[id_card_back_photo]', '')
    params.append('account_info[bank_card_photo]', '')
    return params
}


export async function submit(state) {
    JSON.stringify(state, null, 2)
    try {
        const response = await fetch(API, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'X-CSRF-TOKEN': csrfToken,
            },
            body: getParamsFromState(state),
        })
        return await response.json()
    } catch (err) {
        message.error(err.message)
    }
}