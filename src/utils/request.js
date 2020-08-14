import axios from 'axios';
import store from '../store';
import { DataDecryption } from '../utils/utils';
import router from '../router';

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
            config.headers.token = store.state.task.token;
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
        } else if (response.status == 401) {
            store.dispatch('system/saveUser', null);
            router.push('/login');
        } else {
            Promise.reject();
        }
    },
    error => {
        if (error.response.status == 401) {
            router.push('/login');
        }
        return Promise.reject();
    }
);

export default service;
