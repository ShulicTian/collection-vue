import request from '../utils/request';
import { getHospitalInfoByCondition,getlowerCommunityInfoByOrgId,getDepByOrgId,getDoctorListByDepId,getScheduleDateurl,getScheduleDateTimesNew,getScheduleNO,createBusinessInfo_selft,getVerificationimageCode,getVerificationCode,dgRegisterToRealNameToLogin } from '../utils/api';

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

export const getVerificationImageCode = data => {
    return request({
        url: getVerificationimageCode,
        method: 'post',
        data: data
    });
};

export const getVerCode = data => {
    return request({
        url: getVerificationCode,
        method: 'post',
        data: data,
        dataHandleFlag: true
    });
};

export const login = data => {
    return request({
        url: dgRegisterToRealNameToLogin,
        method: 'post',
        data: data,
        dataHandleFlag: true
    });
};
