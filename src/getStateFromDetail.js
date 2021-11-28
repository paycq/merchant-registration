import { moment } from './modules.js'
import industryCategoryList from './data/industry_category_list.js'

function getCategory(categoryId) {
    // noinspection EqualityComparisonWithCoercionJS
    return [industryCategoryList.find(it =>
        it.children.find(it2 =>
            it2.value == categoryId)).value,
        categoryId]
}

export default function getStateFromDetail(detail, state) {
    if (!detail || !detail.detail) {
        return state
    }
    const data = detail.detail
    if (!data || !data.base_info) {
        return state
    }
    return {
        ...state,
        fidOptionsList: [
            {
                value: detail.service.fid,
                label: detail.service.name
            }
        ],
        id: detail.id,
        // accountInfo
        accountInfo: {
            ...state.accountInfo,
            ownership: detail.fid,                     // 所属授理商
            registrationMobile: data.base_info.contact_phone,           // 注册手机
            loginAccount: data.merchant_code,             // 登陆账号
        },
        // basicInfo
        basicInfo: {
            ...state.basicInfo,
            merchantType: data.base_info.merchant_type,                                // 商户类型
            email: data.base_info.email,                                // 联系邮箱
            merchantAbbreviation: data.base_info.merchant_short_name,                                 // 商户简称
            businessLicense: { urlValue: detail.license_photo },                                         // 营业执照
            companyName: data.license_info.license_name,                                          // 公司名称
            businessLicenseNo: data.license_info.license_id,                            // 营业执照号
            businessLicenseAddress: data.license_info.license_address,                        // 营业执照注册地址
            businessLicensePeriod: {
                period: [
                    moment(data.license_info.license_time_start),
                    data.license_info.license_time_end === '长期' ? undefined : moment(data.base_info.legal_id_card_end),
                ],
                longTerm: data.license_info.license_time_end === '长期'
            },                   // 营业执照有效期
            legalPersonIdPhoto: {
                A: { urlValue: detail.legal_id_card_front_photo },
                B: { urlValue: detail.legal_id_card_back_photo },
            },                                      // 法人身份证照片
            idPeriod: {
                period: [
                    moment(data.legal_person.legal_id_card_start),
                    data.legal_person.legal_id_card_end === '长期' ? undefined : moment(data.legal_person.legal_id_card_end),
                ],
                longTerm: !data.legal_person.legal_id_card_end
            },                    // 身份证有效期
            industryCategory: getCategory(data.base_info.unity_category_id),                                          // 行业类目
            businessAddress: [
                data.address_info.province_code,
                data.address_info.city_code,
                data.address_info.area_code,
                data.address_info.street_address,
            ],                           // 经营地址
            addressLocation: [
                data.address_info.longitude,
                data.address_info.latitude,
            ],                                    // 经纬度
            holdingIdPhoto: { urlValue: detail.hand_hold_id_card_photo },
            idCardNumber: data.legal_person.legal_num,
            name: data.legal_person.legal_name,
        },
        // billingInfo
        billingInfo: {
            ...state.billingInfo,
            settlementType: {                                                   // 结算类型
                accountType: data.account_info.account_type,                                  // 对私账户
                settler: data.account_info.legal_flag,                                        // 法人结算
            },
            bankCardPhoto: { urlValue: detail.bank_card_photo },                                           // 银行卡照片
            bankCardNumber: data.account_info.bank_card_no,                                          // 银行卡号
            bank: undefined,                                                    // 所属银行
            //
            settlerName: data.account_info.real_name,
            settlerIdCardNumber: data.account_info.id_card_no,
            settlerIdPhoto: {
                A: { urlValue: detail.id_card_front_photo },
                B: { urlValue: detail.id_card_back_photo },
            },
            branchBankNumber: data.account_info.unionpay_code,
            branchBankInfo: 'input',
            branchBankArea: [],
            // rate
            wechatPayRate: '2.5',                                               // 微信费率
            alipayRate: '2.5',                                                  // 支付宝费率
            unionPayRate: '2.5',                                                // 银联费率
            cardRate: '4.20',                                                   // 借记卡费率
            cappedFee: '18',                                                    // 封顶手续费
            creditCardRate: '5.20',
        },
        // accountInfo
        storeInfo: {
            ...state.storeInfo,
            storeName: data.shop_info.store_name,               // 门店名称
            storePhone: data.shop_info.store_phone,             // 门店电话
            // photos
            storeFrontPhoto: { urlValue: detail.store_front_photo },            // 门店门头照
            payBoardPhoto: { urlValue: detail.store_cash_photo },              // 收银台照片
            storeEnvironmentPhoto: { urlValue: detail.store_env_photo },      // 店内环境照
            // licensePhoto: undefined,               // 经营许可证
            // otherPhoto: undefined,                 // 其他照片
        },
    }
}