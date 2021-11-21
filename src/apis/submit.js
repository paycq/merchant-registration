import { csrfToken } from './csrfToken.js'
import { message } from '../modules.js'

const API = '/home/xiaowei'

function getParamsFromState(state) {
    const params = new URLSearchParams()
    params.append('action', 'applyV3')
    params.append('id', '')
    params.append('fid', state.accountInfo.ownership)
    params.append('base_info[merchant_type]', state.basicInfo.merchantType)
    params.append('base_info[license_photo]', state.basicInfo.businessLicense.urlValue || '')
    params.append('base_info[license_id]', state.basicInfo.businessLicenseNo || '')
    params.append('base_info[license_address]', state.basicInfo.businessLicenseAddress || '')
    params.append('base_info[license_time_start]', state.basicInfo.businessLicensePeriod?.period[0].format('YYYY-MM-DD') || '')
    params.append('base_info[license_time_end]', state.basicInfo.businessLicensePeriod?.longTerm === true ? '长期' : state.basicInfo?.businessLicensePeriod.period[1].format('YYYY-MM-DD'))
    params.append('merchant_code', state.accountInfo.loginAccount)
    params.append('base_info[merchant_short_name]', state.basicInfo.merchantAbbreviation)
    params.append('base_info[contact_phone]', state.accountInfo.registrationMobile)
    params.append('base_info[service_phone]', state.accountInfo.registrationMobile)
    params.append('base_info[email]', state.basicInfo.email)
    params.append('base_info[unity_category_id]', state.basicInfo.industryCategory[1])
    params.append('shop_info[store_name]', state.storeInfo.storeName)
    params.append('shop_info[store_phone]', state.storeInfo.storePhone)
    params.append('address_info[province_code]', state.basicInfo.businessAddress[0])
    params.append('address_info[city_code]', state.basicInfo.businessAddress[1])
    params.append('address_info[area_code]', state.basicInfo.businessAddress[2])
    params.append('address_info[street_address]', state.basicInfo.businessAddress[3])
    params.append('address_info[longitude]', state.basicInfo.addressLocation[0])
    params.append('address_info[latitude]', state.basicInfo.addressLocation[1])
    params.append('shop_info[store_front_photo]', state.storeInfo.storeFrontPhoto?.urlValue || '')
    params.append('shop_info[store_cash_photo]', state.storeInfo.payBoardPhoto?.urlValue || '')
    params.append('shop_info[store_env_photo]', state.storeInfo.storeEnvironmentPhoto?.urlValue || '')
    params.append('legal_person[legal_name]', state.basicInfo.name)
    params.append('legal_person[legal_num]', state.basicInfo.idCardNumber)
    params.append('legal_person[legal_id_card_start]', state.basicInfo.idPeriod?.period[0].format('YYYY-MM-DD') || '')
    params.append('legal_person[legal_id_card_end]', state.basicInfo.idPeriod?.longTerm === true ? '长期' : state.basicInfo?.idPeriod.period[1].format('YYYY-MM-DD'))
    params.append('legal_person[legal_id_card_front_photo]', state.basicInfo.legalPersonIdPhoto.A?.urlValue || '')
    params.append('legal_person[legal_id_card_back_photo]', state.basicInfo.legalPersonIdPhoto.B?.urlValue || '')
    params.append('legal_person[hand_hold_id_card_photo]', state.basicInfo.holdingIdPhoto?.urlValue || '')
    params.append('account_info[account_type]', state.billingInfo.settlementType?.accountType)
    params.append('account_info[legal_flag]', state.billingInfo.settlementType?.settler)
    params.append('account_info[unionpay_code]', state.billingInfo.branchBankNumber || state.billingInfo.bankCardNumber)
    params.append('account_info[real_name]', state.billingInfo.settlerName || state.basicInfo.name)
    params.append('account_info[id_card_no]', state.billingInfo.settlerIdCardNumber || state.basicInfo.idCardNumber)
    params.append('account_info[bank_card_no]', state.billingInfo.bankCardNumber)
    params.append('account_info[id_card_front_photo]', state.billingInfo.settlerIdPhoto?.A?.urlValue || state.basicInfo.legalPersonIdPhoto.A?.urlValue || '')
    params.append('account_info[id_card_back_photo]', state.billingInfo.settlerIdPhoto?.B?.urlValue || state.basicInfo.legalPersonIdPhoto.B?.urlValue || '')
    params.append('account_info[bank_card_photo]', state.billingInfo.bankCardPhoto?.urlValue || '')
    return params
}

export async function submit(state) {
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
        throw err
    }
}