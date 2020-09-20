import request from '../utils/request';
import {
    getHospitalInfoByCondition,
    getlowerCommunityInfoByOrgId,
    getDepByOrgId,
    getDoctorListByDepId,
    getScheduleDateurl,
    getScheduleDateTimesNew,
    getScheduleNO,
    createBusinessInfo_selft,
    getVerificationimageCode,
    getVerificationCode,
    dgRegisterToRealNameToLogin,
    setSchedulerInfo,
    createBusinessInfoNotPayment
} from '../utils/api';

export const getHospitalList = query => {
    return request({
        url: getHospitalInfoByCondition,
        method: 'get',
        params: query,
        dataHandleFlag: true
    });
};

export const getLowerCommunityList = query => {
    return request({
        url: getlowerCommunityInfoByOrgId,
        method: 'get',
        params: query,
        dataHandleFlag: true
    });
};

export const getDepList = query => {
    return request({
        url: getDepByOrgId,
        method: 'get',
        params: query,
        dataHandleFlag: true
    });
};

export const getDoctorList = query => {
    return request({
        url: getDoctorListByDepId,
        method: 'get',
        params: query,
        dataHandleFlag: true
    });
};

export const getScheduleDate = query => {
    return request({
        url: getScheduleDateurl,
        method: 'get',
        params: query,
        dataHandleFlag: true
    });
};

export const getScheduleDateTimes = query => {
    return request({
        url: getScheduleDateTimesNew,
        method: 'get',
        params: query,
        dataHandleFlag: true
    });
};

export const goSubmitSchedule = query => {
    return request({
        url: getScheduleNO,
        method: 'get',
        params: query,
        dataHandleFlag: true
    });
};

export const submitInfo = query => {
    return request({
        url: createBusinessInfo_selft,
        method: 'get',
        params: query,
        dataHandleFlag: true
    });
};

export const setScheduler = query => {
    return request({
        url: setSchedulerInfo,
        method: 'get',
        params: query,
        dataHandleFlag: true
    });
};

export const finalRequest = query => {
    return request({
        url: createBusinessInfoNotPayment,
        method: 'get',
        params: query,
        dataHandleFlag: true
    });
};

export const getVerificationImageCode = query => {
    return request({
        url: getVerificationimageCode,
        method: 'get',
        params: query,
        dataHandleFlag: true
    });
};

export const getVerCode = query => {
    return request({
        url: getVerificationCode,
        method: 'get',
        params: query,
        dataHandleFlag: true
    });
};

export const login = query => {
    return request({
        url: dgRegisterToRealNameToLogin,
        method: 'get',
        params: query,
        dataHandleFlag: true
    });
};

export const loginPage = query => {
    return request({
        url: '/hoffice/memberapp/login.html?orgId=&wxopenid=&vercode=1&source=&t=1596254650234',
        method: 'get',
        params: query
    });
};

//===============河桥API================
export const hqIndex = query => {
    return request({
        url: '/hqApi/medregister/api/department/list/normal',
        method: 'get',
        params: query
    });
};
export const getDocList = query => {
    return request({
        url: '/hqApi/medregister/api/doctor/department/list',
        method: 'get',
        params: query
    });
};
export const docDetail = query => {
    return request({
        url: '/hqApi/dprs/doctor/detail',
        method: 'get',
        params: query
    });
};
export const docSchedul = query => {
    return request({
        url: '/hqApi/medregister/api/scheduling/schedule/doctor',
        method: 'get',
        params: query
    });
};
// {"client":"resident_wap","device":"web","from":"login","account":"18814470102","password":"PcGzNIpRxpKk8PpLREOeXw==","code":"","countryCode":"+86","processId":null,"accessCode":null,"mode":"password","extraParams":{}}
export const hqLogin = data => {
    return request({
        url: '/hqApi/usercenter/api/user/webloginpro',
        method: 'post',
        data: data
    });
};
