@extends('home.layout.layout')
@section('title', '我的商户申请')
@section('head')
<style>
    .selectList div:hover {
        background: green;
        color: white;
    }
</style>
@endsection
@section('content')
<div class="page-header">
    <h1 class="page-title">
        我的商户申请{{ config('applyment.merchant_code')?'-【商户号:'.config('applyment.merchant_code').'】':'' }}</h1>
    <div class="page-header-actions">
        <p>带 <font color="red">*</font> 标示的为必填项</p>
    </div>
</div>
<div class="page-content" id="vue">
    <form id="form-apply">
        <input type="hidden" name="action" value="applyV3">
        <div class="row">
            <div class="col-md-6">
                <div class="panel">
                    <div class="panel-heading">
                        <h3 class="panel-title">主体资料</h3>
                    </div>
                    <div class="panel-body container-fluid">
                        <input type="hidden" name="id" value="{{ config('applyment.id') }}">
                        @if(!config('applyment.id'))
                        <div class="form-group form-material">
                            <label class="form-control-label">选择我的服务商</label>
                            <select name="fid" class="form-control" @change="selectService">
                                <option value="">请选择</option>
                                @if($serviceList=\App\Models\FbService::where('status',1)->orderBy('sort','asc')->get())
                                @foreach( $serviceList as $row)
                                <option value="{{ $row->fid }}">{{ $row->name }}</option>
                                @endforeach
                                @endif
                            </select>
                        </div>
                        @endif
                        <div class="form-group form-material">
                            <label class="form-control-label">商户类型 <font color="red">*</font></label>
                            <select class="form-control" v-model="subject_type" name="base_info[merchant_type]"
                                    :disabled="noApply">
                                <option value="1">小微商户</option>
                                <option value="2">个体工商户</option>
                                <option value="3">企业</option>
                            </select>
                        </div>
                        <template v-if="subject_type!=='11'">
                            <div class="form-group form-material">
                                <label class="form-control-label">商户账号 <font color="red">*</font></label>
                                <input type="text" class="form-control"
                                       name="merchant_code"
                                       placeholder=""
                                       value="{{ config('applyment.merchant_code') }}"
                                       :disabled="noApply">
                            </div>
                            <div class="form-group form-material">
                                <label class="form-control-label">商户简称 <font color="red">*</font></label>
                                <input type="text" class="form-control"
                                       name="base_info[merchant_short_name]"
                                       placeholder="在支付完成页向买家展示"
                                       value="{{ config('applyment.detail.base_info.merchant_short_name') }}"
                                       :disabled="noApply">
                            </div>
                            <div class="form-group form-material">
                                <label class="form-control-label">商户手机号 <font color="red">*</font></label>
                                <input type="text" class="form-control"
                                       name="base_info[contact_phone]"
                                       placeholder=""
                                       value="{{ config('applyment.detail.base_info.contact_phone') }}"
                                       :disabled="noApply">
                            </div>
                            <div class="form-group form-material">
                                <label class="form-control-label">客服电话 </label>
                                <input type="text" class="form-control"
                                       name="base_info[service_phone]"
                                       placeholder="在交易记录中向买家展示，请确保电话畅通以便平台回拨确认。"
                                       value="{{ config('applyment.detail.base_info.service_phone') }}"
                                       :disabled="noApply">
                            </div>
                            <div class="form-group form-material">
                                <label class="form-control-label">商户电子邮箱 </label>
                                <input type="text" class="form-control"
                                       name="base_info[email]"
                                       placeholder=""
                                       value="{{ config('applyment.detail.base_info.email') }}"
                                       :disabled="noApply">
                            </div>

                            <div class="form-group form-material">
                                <label class="form-control-label">所属行业 <font color="red">*</font></label>
                                <select name="base_info[unity_category_id]" v-model="unity_category_id"
                                        class="form-control"
                                        v-if="subject_type==='3'">
                                    @foreach( \App\Klsf\WxpayISV::$trade['all'] as $k=>$v)
                                    <option value="{{ $v[0] }}">{{ $k }}</option>
                                    @endforeach
                                </select>
                                <select name="base_info[unity_category_id]" v-model="unity_category_id"
                                        class="form-control"
                                        v-else-if="subject_type==='2'">
                                    @foreach( \App\Klsf\WxpayISV::$trade['all'] as $k=>$v)
                                    <option value="{{ $v[0] }}">{{ $k }}</option>
                                    @endforeach
                                </select>
                                <select name="base_info[unity_category_id]" v-model="unity_category_id"
                                        class="form-control"
                                        v-else>
                                    @foreach( \App\Klsf\WxpayISV::$trade['all'] as $k=>$v)
                                    <option value="{{ $v[0] }}">{{ $k }}</option>
                                    @endforeach
                                </select>
                            </div>
                            <template v-if="subject_type!=='1'">
                                <div class="form-group form-material">
                                    <label class="form-control-label">营业执照注册号 <font color="red">*</font></label>
                                    <input type="text" class="form-control"
                                           name="license_info[license_id]"
                                           placeholder="请填写营业执照上的营业执照注册号"
                                           value="{{ config('applyment.detail.license_info.license_id') }}"
                                           :disabled="noApply">
                                    <input type="hidden"
                                           name="fid"
                                           value="{{ config('applyment.fid') }}"
                                           :disabled="noApply">
                                </div>
                                <div class="form-group form-material">
                                    <label class="form-control-label">营业执照名称 <font color="red">*</font></label>
                                    <input type="text" class="form-control"
                                           name="license_info[license_name]"
                                           placeholder="请填写营业执照上的商户名称"
                                           value="{{ config('applyment.detail.license_info.license_name') }}"
                                           :disabled="noApply">
                                </div>
                                <div class="form-group form-material">
                                    <label class="form-control-label">营业执照注册地址 <font color="red">*</font></label>
                                    <input type="text" class="form-control"
                                           name="license_info[license_address]"
                                           placeholder="请填写营业执照上的商户名称"
                                           value="{{ config('applyment.detail.license_info.license_address') }}"
                                           :disabled="noApply">
                                </div>
                                <div class="form-group form-material">
                                    <label class="form-control-label">营业执照注册号开始日期 <font color="red">*</font></label>
                                    <input type="text" class="form-control"
                                           name="license_info[license_time_start]"
                                           placeholder="营业执照注册号开始日期"
                                           value="{{ config('applyment.detail.license_info.license_time_start') }}"
                                           :disabled="noApply">
                                    <pre style="margin-top: 10px">示例值：2020-01-01</pre>
                                </div>
                                <div class="form-group form-material">
                                    <label class="form-control-label">营业执照注册结束日期 <font color="red">*</font></label>
                                    <input type="text" class="form-control"
                                           name="license_info[license_time_end]"
                                           placeholder="输入身份证有效期结束时间"
                                           value="{{ config('applyment.detail.license_info.license_time_end') }}"
                                           :disabled="noApply">
                                    <pre style="margin-top: 10px">格式：2015-09-22，永久有效:长期</pre>
                                </div>
                                <div class="form-group form-material">
                                    <label class="form-control-label">营业执照扫描件 <font color="red">*</font></label>
                                    <div class="input-group">
                                        <div class="form-control-wrap">
                                            <input type="text"
                                                   name="license_info[license_photo]"
                                                   class="form-control" id="license_copy" v-model="license_copy"
                                                   readonly>
                                        </div>
                                        <span class="input-group-append" v-if="!noApply">
                                        <button class="btn btn-info waves-effect waves-classic"
                                                @click="uploadImage('license_copy')"
                                                type="button">上传</button>
                                    </span>
                                    </div>
                                    <div style="margin: 10px" v-if="license_copy"><img
                                            :src="'/uploads/xw/'+license_copy+'.png'"
                                            style="max-height: 150px;max-width: 350px"></div>
                                </div>
                            </template>
                        </template>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="panel">
                    <div class="panel-heading">
                        <h3 class="panel-title">经营资料</h3>
                    </div>
                    <div class="panel-body container-fluid">


                        <template v-if="subject_type!=='11'">


                            <div class="form-group form-material">
                                <label class="form-control-label">门店名称 <font color="red">*</font></label>
                                <input type="text" class="form-control"
                                       name="shop_info[store_name]"
                                       placeholder="门店名称"
                                       value="{{ config('applyment.detail.shop_info.store_name') }}"
                                       :disabled="noApply">
                            </div>
                            <div class="form-group form-material">
                                <label class="form-control-label">门店电话 <font color="red">*</font></label>
                                <input type="text" class="form-control"
                                       name="shop_info[store_phone]"
                                       placeholder="门店电话"
                                       value="{{ config('applyment.detail.shop_info.store_phone') }}"
                                       :disabled="noApply">
                            </div>
                            <div class="form-group form-material">
                                <label class="form-control-label">商户所在省 <font color="red">*</font></label>
                                <div class="input-group">
                                        <span class="input-group-prepend">
                                            <div class="btn-group">
                                                <button type="button" v-if="!noApply"
                                                        class="btn btn-info dropdown-toggle waves-effect waves-classic"
                                                        data-toggle="dropdown" aria-expanded="true">查询</button>
                                                <div class="dropdown-menu" style="padding: 10px;min-width: 300px">
                                                    <input type="text" class="form-control" placeholder="输入省名" v-model="microShopZipCode">
                                                    <div class="selectList" id="select-micro_address_code"
                                                         style="overflow-y: scroll;max-height: 300px"></div>
                                                </div>
                                            </div>
                                        </span>
                                    <div class="form-control-wrap">
                                        <input type="text" class="form-control" id="micro_address_code"
                                               value="{{ \App\Helper::getZipCodeName(config('applyment.detail.address_info.province_code')) }}"
                                               disabled>
                                        <input type="hidden"
                                               name="address_info[province_code]"
                                               id="micro_address_code_hidden"
                                               value="{{ config('applyment.detail.address_info.province_code') }}">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group form-material">
                                <label class="form-control-label">商户所在市 <font color="red">*</font></label>
                                <div class="input-group">
                                        <span class="input-group-prepend">
                                            <div class="btn-group">
                                                <button type="button" v-if="!noApply"
                                                        class="btn btn-info dropdown-toggle waves-effect waves-classic"
                                                        data-toggle="dropdown" aria-expanded="true">查询</button>
                                                <div class="dropdown-menu" style="padding: 10px;min-width: 300px">
                                                    <input type="text" class="form-control" placeholder="输入城市名" v-model="microCityZipCode">
                                                    <div class="selectList" id="select-micro_city_code"
                                                         style="overflow-y: scroll;max-height: 300px"></div>
                                                </div>
                                            </div>
                                        </span>
                                    <div class="form-control-wrap">
                                        <input type="text" class="form-control" id="micro_city_code"
                                               value="{{ \App\Helper::getZipCodeName(config('applyment.detail.address_info.city_code')) }}"
                                               disabled>
                                        <input type="hidden"
                                               name="address_info[city_code]"
                                               id="micro_city_code_hidden"
                                               value="{{ config('applyment.detail.address_info.city_code') }}">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group form-material">
                                <label class="form-control-label">商户所在区 <font color="red">*</font></label>
                                <div class="input-group">
                                        <span class="input-group-prepend">
                                            <div class="btn-group">
                                                <button type="button" v-if="!noApply"
                                                        class="btn btn-info dropdown-toggle waves-effect waves-classic"
                                                        data-toggle="dropdown" aria-expanded="true">查询</button>
                                                <div class="dropdown-menu" style="padding: 10px;min-width: 300px">
                                                    <input type="text" class="form-control" placeholder="输入区名" v-model="microQuZipCode">
                                                    <div class="selectList" id="select-micro_qu_code"
                                                         style="overflow-y: scroll;max-height: 300px"></div>
                                                </div>
                                            </div>
                                        </span>
                                    <div class="form-control-wrap">
                                        <input type="text" class="form-control" id="micro_qu_code"
                                               value="{{ \App\Helper::getZipCodeName(config('applyment.detail.address_info.area_code')) }}"
                                               disabled>
                                        <input type="hidden"
                                               name="address_info[area_code]"
                                               id="micro_qu_code_hidden"
                                               value="{{ config('applyment.detail.address_info.area_code') }}">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group form-material">
                                <label class="form-control-label">商户详细地址 <font color="red">*</font></label>
                                <input type="text" class="form-control"
                                       name="address_info[street_address]"
                                       placeholder="请填写详细的门店地址"
                                       value="{{ config('applyment.detail.address_info.street_address') }}"
                                       :disabled="noApply">
                            </div>
                            <div class="form-group form-material">
                                <label class="form-control-label">门店地址经度 <font color="red">*<a target="_blank" href="https://jingweidu.bmcx.com/">点击查看经纬度</a></font></label>
                                <input type="text" class="form-control"
                                       name="address_info[longitude]"
                                       placeholder="精确到小数点后6位"
                                       value="{{ config('applyment.detail.address_info.longitude') }}"
                                       :disabled="noApply">
                            </div>
                            <div class="form-group form-material">
                                <label class="form-control-label">门店地址纬度 <font color="red">*<a target="_blank" href="https://jingweidu.bmcx.com/">点击查看经纬度</a></font></label>
                                <input type="text" class="form-control"
                                       name="address_info[latitude]"
                                       placeholder="精确到小数点后6位"
                                       value="{{ config('applyment.detail.address_info.latitude') }}"
                                       :disabled="noApply">
                            </div>
                            <div class="form-group form-material">
                                <label class="form-control-label">门头照  <font color="red">*</font></label>
                                <div class="input-group">
                                    <div class="form-control-wrap">
                                        <input type="text"
                                               name="shop_info[store_front_photo]"
                                               class="form-control" id="micro_entrance_pic"
                                               v-model="micro_entrance_pic"
                                               readonly>
                                    </div>
                                    <span class="input-group-append" v-if="!noApply">
                                        <button class="btn btn-info waves-effect waves-classic"
                                                @click="uploadImage('micro_entrance_pic')"
                                                type="button">上传</button>
                                    </span>
                                </div>
                                <div style="margin: 10px" v-if="micro_entrance_pic"><img
                                        :src="'/uploads/xw/'+micro_entrance_pic+'.png'"
                                        style="max-height: 150px;max-width: 350px"></div>
                            </div>
                            <div class="form-group form-material">
                                <label class="form-control-label">收银台照片   <font color="red">*</font></label>
                                <div class="input-group">
                                    <div class="form-control-wrap">
                                        <input type="text"
                                               name="shop_info[store_cash_photo]"
                                               class="form-control" id="micro_cash_pic"
                                               v-model="micro_cash_pic"
                                               readonly>
                                    </div>
                                    <span class="input-group-append" v-if="!noApply">
                                        <button class="btn btn-info waves-effect waves-classic"
                                                @click="uploadImage('micro_cash_pic')"
                                                type="button">上传</button>
                                    </span>
                                </div>
                                <div style="margin: 10px" v-if="micro_cash_pic"><img
                                        :src="'/uploads/xw/'+micro_cash_pic+'.png'"
                                        style="max-height: 150px;max-width: 350px"></div>
                            </div>
                            <div class="form-group form-material">
                                <label class="form-control-label">经营场所内设照片 <font color="red">*</font></label>
                                <div class="input-group">
                                    <div class="form-control-wrap">
                                        <input type="text"
                                               name="shop_info[store_env_photo]"
                                               class="form-control" id="store_env"
                                               v-model="store_env"
                                               readonly>
                                    </div>
                                    <span class="input-group-append" v-if="!noApply">
                                        <button class="btn btn-info waves-effect waves-classic"
                                                @click="uploadImage('store_env')"
                                                type="button">上传</button>
                                    </span>
                                </div>
                                <div style="margin: 10px" v-if="store_env"><img
                                        :src="'/uploads/xw/'+store_env+'.png'"
                                        style="max-height: 150px;max-width: 350px"></div>
                            </div>
                        </template>

                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="panel">
                    <div class="panel-heading">
                        <h3 class="panel-title">法人信息</h3>
                    </div>
                    <div class="panel-body container-fluid">
                        <div class="form-group form-material">
                            <label class="form-control-label">身份证姓名 <font color="red">*</font></label>
                            <input type="text" class="form-control"
                                   name="legal_person[legal_name]"
                                   placeholder="输入身份证姓名"
                                   value="{{ config('applyment.detail.legal_person.legal_name') }}"
                                   :disabled="noApply">
                        </div>
                        <div class="form-group form-material">
                            <label class="form-control-label">身份证号码 <font color="red">*</font></label>
                            <input type="text" class="form-control"
                                   name="legal_person[legal_num]"
                                   placeholder="输入身份证号码"
                                   value="{{ config('applyment.detail.legal_person.legal_num') }}"
                                   :disabled="noApply">
                        </div>
                        <div class="form-group form-material">
                            <label class="form-control-label">身份证有效期开始时间 <font color="red">*</font></label>
                            <input type="text" class="form-control"
                                   name="legal_person[legal_id_card_start]"
                                   placeholder="输入身份证有效期开始时间"
                                   value="{{ config('applyment.detail.legal_person.legal_id_card_start') }}"
                                   :disabled="noApply">
                            <pre style="margin-top: 10px">示例值：2020-01-01</pre>
                        </div>
                        <div class="form-group form-material">
                            <label class="form-control-label">身份证有效期结束时间 <font color="red">*</font></label>
                            <input type="text" class="form-control"
                                   name="legal_person[legal_id_card_end]"
                                   placeholder="输入身份证有效期结束时间"
                                   value="{{ config('applyment.detail.legal_person.legal_id_card_end') }}"
                                   :disabled="noApply">
                            <pre style="margin-top: 10px">示例值：2030-01-01 长期填：长期</pre>
                        </div>
                        <div class="form-group form-material">
                            <label class="form-control-label">身份证人像面照片 <font color="red">*</font></label>
                            <div class="input-group">
                                <div class="form-control-wrap">
                                    <input type="text"
                                           name="legal_person[legal_id_card_front_photo]"
                                           class="form-control" id="id_card_copy"
                                           v-model="id_card_copy"
                                           readonly>
                                </div>
                                <span class="input-group-append" v-if="!noApply">
                                        <button class="btn btn-info waves-effect waves-classic"
                                                @click="uploadImage('id_card_copy')"
                                                type="button">上传</button>
                                    </span>
                            </div>
                            <div style="margin: 10px" v-if="id_card_copy"><img
                                    :src="'/uploads/xw/'+id_card_copy+'.png'"
                                    style="max-height: 150px;max-width: 350px"></div>
                        </div>
                        <div class="form-group form-material">
                            <label class="form-control-label">身份证国徽面照片 <font color="red">*</font></label>
                            <div class="input-group">
                                <div class="form-control-wrap">
                                    <input type="text"
                                           name="legal_person[legal_id_card_back_photo]"
                                           class="form-control" id="id_card_national"
                                           v-model="id_card_national"
                                           readonly>
                                </div>
                                <span class="input-group-append" v-if="!noApply">
                                        <button class="btn btn-info waves-effect waves-classic"
                                                @click="uploadImage('id_card_national')"
                                                type="button">上传</button>
                                    </span>
                            </div>
                            <div style="margin: 10px" v-if="id_card_national"><img
                                    :src="'/uploads/xw/'+id_card_national+'.png'"
                                    style="max-height: 150px;max-width: 350px"></div>
                        </div>
                        <template v-if="subject_type==='1'">
                            <div class="form-group form-material">
                                <label class="form-control-label">手持身份证照 <font color="red">*小微必须上传</font></label>
                                <div class="input-group">
                                    <div class="form-control-wrap">
                                        <input type="text"
                                               name="legal_person[hand_hold_id_card_photo]"
                                               class="form-control" id="id_card_hold"
                                               v-model="id_card_hold"
                                               readonly>
                                    </div>
                                    <span class="input-group-append" v-if="!noApply">
                                        <button class="btn btn-info waves-effect waves-classic"
                                                @click="uploadImage('id_card_hold')"
                                                type="button">上传</button>
                                    </span>
                                </div>
                                <div style="margin: 10px" v-if="id_card_hold"><img
                                        :src="'/uploads/xw/'+id_card_hold+'.png'"
                                        style="max-height: 150px;max-width: 350px"></div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="panel">
                    <div class="panel-heading">
                        <h3 class="panel-title">结算银行卡信息</h3>
                    </div>
                    <div class="panel-body container-fluid">
                        <div class="form-group form-material">
                            <label class="form-control-label">账户类型 <font color="red">*</font></label>
                            <select v-model="bank_account_type" class="form-control"
                                    name="account_info[account_type]"
                                    :disabled="noApply">
                                <option value="1">个人账户</option>
                                <option value="2">公司账户</option>
                            </select>
                        </div>
                        <div class="form-group form-material">
                            <label class="form-control-label">结算标志 <font color="red">*账户类型公司，则结算标志必须为：法人结算   商户类型是小微，必须为：法人结算</font></label>
                            <select  class="form-control" v-model="bank_legal_flag"
                                     name="account_info[legal_flag]"
                            >
                                <option value="0">非法人结算 </option>
                                <option value="1">法人结算</option>
                            </select>
                        </div>
                        <div class="form-group form-material">
                            <label class="form-control-label">开户支行联行号 <font color="red">*</font></label>
                            <input type="text" class="form-control" name="account_info[unionpay_code]"
                                   placeholder="输入支行联行号"
                                   value="{{ config('applyment.detail.account_info.unionpay_code') }}"
                                   :disabled="noApply">
                        </div>
                        <div class="form-group form-material">
                            <label class="form-control-label">开户名称 <font
                                    color="red">*</font></label>
                            <input type="text" class="form-control" name="account_info[real_name]"
                                   :placeholder="bank_account_type==='0'?'输入营业执照商户名称':'输入法人身份证姓名'"
                                   value="{{ config('applyment.detail.account_info.real_name') }}"
                                   :disabled="noApply">
                        </div>
                        <div class="form-group form-material">
                            <label class="form-control-label">结算人身份证号 <font color="red">*个人账户必传，公司账户可不传，法人结算与法人身份证号一致</font></label>
                            <input type="text" class="form-control" name="account_info[id_card_no]"
                                   placeholder="输入银行账号"
                                   value="{{ config('applyment.detail.account_info.id_card_no') }}"
                                   :disabled="noApply">
                        </div>
                        <div class="form-group form-material">
                            <label class="form-control-label">银行卡号 <font color="red">*</font></label>
                            <input type="text" class="form-control" name="account_info[bank_card_no]"
                                   placeholder="输入银行账号"
                                   value="{{ config('applyment.detail.account_info.bank_card_no') }}"
                                   :disabled="noApply">
                        </div>
                        <div class="form-group form-material">
                            <label class="form-control-label">结算人身份证人像面照片 <font color="red">*非法人结算必填，法人结算时直接取法人身份证照片</font></label>
                            <div class="input-group">
                                <div class="form-control-wrap">
                                    <input type="text"
                                           name="account_info[id_card_front_photo]"
                                           class="form-control" id="account_id_card_front"
                                           v-model="account_id_card_front"
                                           readonly>
                                </div>
                                <span class="input-group-append" v-if="!noApply">
                                        <button class="btn btn-info waves-effect waves-classic"
                                                @click="uploadImage('account_id_card_front')"
                                                type="button">上传</button>
                                    </span>
                            </div>
                            <div style="margin: 10px" v-if="account_id_card_front"><img
                                    :src="'/uploads/xw/'+account_id_card_front+'.png'"
                                    style="max-height: 150px;max-width: 350px"></div>
                        </div>
                        <div class="form-group form-material">
                            <label class="form-control-label">结算人身份证人像面照片 <font color="red">*非法人结算必填，法人结算可不填
                                    法人结算时直接取法人身份证照片</font></label>
                            <div class="input-group">
                                <div class="form-control-wrap">
                                    <input type="text"
                                           name="account_info[id_card_back_photo]"
                                           class="form-control" id="account_id_card_back"
                                           v-model="account_id_card_back"
                                           readonly>
                                </div>
                                <span class="input-group-append" v-if="!noApply">
                                        <button class="btn btn-info waves-effect waves-classic"
                                                @click="uploadImage('account_id_card_back')"
                                                type="button">上传</button>
                                    </span>
                            </div>
                            <div style="margin: 10px" v-if="account_id_card_back"><img
                                    :src="'/uploads/xw/'+account_id_card_back+'.png'"
                                    style="max-height: 150px;max-width: 350px"></div>
                        </div>
                        <div class="form-group form-material">
                            <label class="form-control-label">银行卡正面 <font color="red">*如是对公账户，开户许可证</font></label>
                            <div class="input-group">
                                <div class="form-control-wrap">
                                    <input type="text"
                                           name="account_info[bank_card_photo]"
                                           class="form-control" id="acount_card_photo"
                                           v-model="acount_card_photo"
                                           readonly>
                                </div>
                                <span class="input-group-append" v-if="!noApply">
                                        <button class="btn btn-info waves-effect waves-classic"
                                                @click="uploadImage('acount_card_photo')"
                                                type="button">上传</button>
                                    </span>
                            </div>
                            <div style="margin: 10px" v-if="acount_card_photo"><img
                                    :src="'/uploads/xw/'+acount_card_photo+'.png'"
                                    style="max-height: 150px;max-width: 350px"></div>
                        </div>


                    </div>
                    <div class="panel-footer text-right" v-if="!noApply">
                        <button type="button" class="btn btn-info" @click="apply">确认申请</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>
@endsection

@section('foot')
<form id="form-upload-image" enctype="multipart/form-data" style="display: none">
    <input type="hidden" name="action" value="uploadMedia">
    <input type="hidden" name="url" value="/home/xiaowei">
    <input type="hidden" name="fid" id="fid" value="{{ config('applyment.fid') }}">
    <input type="hidden" name="id">
    <input type="file" name="image">
</form>
<script>
    new Vue({
        el: '#vue',
        data: {
            noApply: '1' === '{{ (!config('applyment.id') || config('applyment.shstatus')==2 || config('applyment.applyment_state')==='REJECTED')?0:1 }}',
            subject_type: "{{ config('applyment.detail.base_info.merchant_type','1') }}",
            micro_biz_type: "{{ config('applyment.detail.micro.micro_biz_type','MICRO_TYPE_STORE') }}",
            sales_scenes_type: "{{ config('applyment.detail.business_info.sales_info.sales_scenes_type.0','SALES_SCENES_STORE') }}",
            unity_category_id: "{{ config('applyment.detail.base_info.unity_category_id','餐饮') }}",
            license_copy: "{{ config('applyment.license_photo') }}",
            store_entrance_pic: "{{ config('applyment.biz_store_info.store_entrance_pic.0') }}",
            indoor_pic: "{{ config('applyment.detail.business_info.sales_info.biz_store_info.indoor_pic.0') }}",
            micro_entrance_pic: "{{ config('applyment.store_front_photo') }}",
            micro_cash_pic: "{{ config('applyment.store_cash_photo') }}",
            store_env: "{{ config('applyment.store_env_photo') }}",
            micro_mobile_pics: "{{ config('applyment.detail.micro.micro_mobile_info.micro_mobile_pics.0') }}",
            web_authorisation: "{{ config('applyment.detail.business_info.sales_info.web_info.web_authorisation') }}",
            id_card_copy: "{{ config('applyment.legal_id_card_front_photo') }}",
            id_card_national: "{{ config('applyment.legal_id_card_back_photo') }}",
            id_card_hold: "{{ config('applyment.hand_hold_id_card_photo') }}",
            account_id_card_front: "{{ config('applyment.id_card_front_photo') }}",
            account_id_card_back: "{{ config('applyment.id_card_back_photo') }}",
            acount_card_photo: "{{ config('applyment.bank_card_photo') }}",
            bank_legal_flag: "{{ config('applyment.legal_flag','1') }}",
            bank_account_type: "{{ config('applyment.account_type','1') }}",
            account_bank: "{{ config('applyment.detail.bank_account_info.account_bank','工商银行') }}",

            qualifications: {!! json_encode(config('applyment.detail.settlement_info.qualifications', [])) !!},
    mp_pics: {!! json_encode(config('applyment.detail.business_info.sales_info.mp_info.mp_pics', [])) !!},
    mini_program_pics: {!! json_encode(config('applyment.detail.business_info.sales_info.mini_program_info.mini_program_pics', [])) !!},
    app_pics: {!! json_encode(config('applyment.detail.business_info.sales_info.app_info.app_pics', [])) !!},
    wework_pics: {!! json_encode(config('applyment.detail.business_info.sales_info.wework_info.wework_pics', [])) !!},

    microShopZipCode: '',
        microCityZipCode: '',
        microQuZipCode:'',
        bizShopZipCode: '',
        mobileShopZipCode: '',
        bankCode: '',
        bankZipCode: ''
    },
    watch: {
        microQuZipCode: _.debounce(
            function (val) {
                var listId = 'select-micro_qu_code';
                var inputId = 'micro_qu_code';
                if (val < 2) {
                    return false;
                }
                this.$post("/home/xiaowei", {action: 'searchZipCode', s: val}, {}, false)
                    .then(function (data) {
                        if (data.status === 0) {
                            var str = '';
                            data.data.forEach(function (t) {
                                str += '<div onclick="$(\'#' + inputId + '\').val(\'' + t.name + '\');$(\'#' + inputId + '_hidden\').val(\'' + t.code + '\');">' + t.name + '</div>';
                            });
                            $("#" + listId).html(str);
                        } else {
                            vm.$message(data.message, 'error');
                        }
                    });
            },1000
        ),
            microCityZipCode: _.debounce(
            function (val) {
                var listId = 'select-micro_city_code';
                var inputId = 'micro_city_code';
                if (val < 2) {
                    return false;
                }
                this.$post("/home/xiaowei", {action: 'searchZipCode', s: val}, {}, false)
                    .then(function (data) {
                        if (data.status === 0) {
                            var str = '';
                            data.data.forEach(function (t) {
                                str += '<div onclick="$(\'#' + inputId + '\').val(\'' + t.name + '\');$(\'#' + inputId + '_hidden\').val(\'' + t.code + '\');">' + t.name + '</div>';
                            });
                            $("#" + listId).html(str);
                        } else {
                            vm.$message(data.message, 'error');
                        }
                    });
            },1000
        ),
            microShopZipCode: _.debounce(
            function (val) {
                var listId = 'select-micro_address_code';
                var inputId = 'micro_address_code';
                if (val < 2) {
                    return false;
                }
                this.$post("/home/xiaowei", {action: 'searchZipCode', s: val}, {}, false)
                    .then(function (data) {
                        if (data.status === 0) {
                            var str = '';
                            data.data.forEach(function (t) {
                                str += '<div onclick="$(\'#' + inputId + '\').val(\'' + t.name + '\');$(\'#' + inputId + '_hidden\').val(\'' + t.code + '\');">' + t.name + '</div>';
                            });
                            $("#" + listId).html(str);
                        } else {
                            vm.$message(data.message, 'error');
                        }
                    });
            },1000
        ),
            bizShopZipCode: _.debounce(
            function (val) {
                var listId = 'select-biz_address_code';
                var inputId = 'biz_address_code';
                if (val < 2) {
                    return false;
                }
                this.$post("/home/xiaowei", {action: 'searchZipCode', s: val}, {}, false)
                    .then(function (data) {
                        if (data.status === 0) {
                            var str = '';
                            data.data.forEach(function (t) {
                                str += '<div onclick="$(\'#' + inputId + '\').val(\'' + t.name + '\');$(\'#' + inputId + '_hidden\').val(\'' + t.code + '\');">' + t.name + '</div>';
                            });
                            $("#" + listId).html(str);
                        } else {
                            vm.$message(data.message, 'error');
                        }
                    });
            },1000
        ),
            mobileShopZipCode: _.debounce(
            function (val) {
                var listId = 'select-micro_mobile_city';
                var inputId = 'micro_mobile_city';
                if (val < 2) {
                    return false;
                }
                this.$post("/home/xiaowei", {action: 'searchZipCode', s: val}, {}, false)
                    .then(function (data) {
                        if (data.status === 0) {
                            var str = '';
                            data.data.forEach(function (t) {
                                str += '<div onclick="$(\'#' + inputId + '\').val(\'' + t.name + '\');$(\'#' + inputId + '_hidden\').val(\'' + t.code + '\');">' + t.name + '</div>';
                            });
                            $("#" + listId).html(str);
                        } else {
                            vm.$message(data.message, 'error');
                        }
                    });
            },1000
        ),
            bankCode: _.debounce(
            function (val) {
                var listId = 'bankCodeList';
                var inputId = 'bank_name';
                if (val < 2) {
                    return false;
                }
                this.$post("/home/xiaowei", {action: 'searchBankCode', s: val}, {}, false)
                    .then(function (data) {
                        if (data.status === 0) {
                            var str = '';
                            data.data.forEach(function (t) {
                                str += '<div onclick="$(\'#' + inputId + '\').val(\'' + t.name + '\');$(\'#' + inputId + '_hidden\').val(\'' + t.name + '\');">' + t.name + '</div>';
                            });
                            $("#" + listId).html(str);
                        } else {
                            vm.$message(data.message, 'error');
                        }
                    });
            },1000
        ),
            bankZipCode: _.debounce(
            function (val) {
                var listId = 'select-bank_address_code';
                var inputId = 'bank_address_code';
                if (val < 2) {
                    return false;
                }
                this.$post("/home/xiaowei", {action: 'searchZipCode', s: val}, {}, false)
                    .then(function (data) {
                        if (data.status === 0) {
                            var str = '';
                            data.data.forEach(function (t) {
                                str += '<div onclick="$(\'#' + inputId + '\').val(\'' + t.name + '\');$(\'#' + inputId + '_hidden\').val(\'' + t.code + '\');">' + t.name + '</div>';
                            });
                            $("#" + listId).html(str);
                        } else {
                            vm.$message(data.message, 'error');
                        }
                    });
            },1000
        )
    },
    methods: {
        apply: function () {
            var vm = this;
            this.$post("/home/xiaowei", $("#form-apply").serialize())
                .then(function (data) {
                    if (data.status === 0) {
                        alertify.alert('提交成功', "您的申请信息已成功提交，平台将会在2个工作日内完成审核！", function () {
                            window.location.href = "/home/xiaowei/list";
                        });
                    } else {
                        vm.$message(data.message, 'error');
                    }
                });
        },
        selectApply: function (e) {
            var id = parseInt(e.target.value);
            window.location.href = "/home/xiaowei/apply/0?shid=" + id;
        },
        selectService: function (e) {
            var id = parseInt(e.target.value);
            $("#fid").val(id);
        }
    },
    mounted: function () {
    }
    });
</script>
@endsection
