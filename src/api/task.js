import request from '../utils/request';

//添加任务
export const addTask = data => {
    return request({
        url: '/collection/task/addTask',
        method: 'POST',
        data: data
    });
};
//获取任务列表
export const getTaskList = query => {
    return request({
        url: '/collection/task/getTaskList',
        method: 'get',
        params: query
    });
};
//删除任务
export const removeTask = query => {
    return request({
        url: '/collection/task/removeTask',
        method: 'delete',
        params: query
    });
};
