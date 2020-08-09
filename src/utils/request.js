import axios from 'axios';
import store from '../store';
import { DataDecryption } from '../utils/utils';
import router from 'vue-router';

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    timeout: 10000
});

service.interceptors.request.use(
    config => {
        config.headers.authToken = store.state.system.token;
        if (config.dataHandleFlag) {
            config.headers.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTY4NzA5NDEzMDQsInBheWxvYWQiOiJ7XCJvcGVuSWRcIjpcIm9rMDNXd0txZ1lyU0ZWZTAwQnBxdHBJeVZjUlVcIixcInVzZXJJZFwiOjEwNzU4ODcyNTc3NzA5NjUyNDksXCJsb2dpblR5cGVcIjpcIldlQ2hhdFwiLFwibG9naW5EYXRlXCI6MTU5NjI2NjE0MTMwM30ifQ.Xaw_3g_dLlDXWeXO8XHKtPZCrqGelB6IBV6sJrWrNY8';
            store.commit('system/setDataHandleFlag', config.dataHandleFlag);
        } else {
            store.commit('system/setDataHandleFlag', false);
        }
        return config;
    },
    error => {
        console.log('[request]'+error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            if (store.state.system.dataHandleFlag) {
                return DataDecryption(response.data);
            }
            return response.data;
        } else if (response.status === 401) {
            store.dispatch('system/saveUser', null);
            router.push('/login');
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
