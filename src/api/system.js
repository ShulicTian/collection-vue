import request from '../utils/request';

//登录
export const login = data => {
    return request({
        url: '/collection/sys/login?sys_cookie=true',
        method: 'post',
        data: data
    });
};

//登出
export const logout = query => {
    return request({
        url: '/collection/sys/logout',
        method: 'get',
        params: query
    });
};

//注册
export const register = data => {
    return request({
        url: '/collection/sys/saveUser',
        method: 'post',
        data: data
    });
};
