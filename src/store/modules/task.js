import { addTask, getTaskList, removeTask } from '../../api/task';

export default {
    namespaced: true,
    state: {
        taskList: [],
        token: localStorage.getItem('token') || ''
    },
    mutations: {
        setTaskList(state, data) {
            state.taskList = data;
        },
        pushTask(state, data) {
            state.taskList.push(data);
        },
        deleteTask(state, data) {
            state.taskList = state.taskList.filter(task => {
                let flag = task.hospitalId != data.hospitalId && task.comminityId != data.comminityId && task.depId != data.depId;
                if (data.taskType == '0') {
                    return data.doctorId != task.doctorId && flag && data.workDate == task.workDate && data.timeUnit == task.timeUnit;
                } else if (data.taskType == '1') {
                    return data.doctorId != task.doctorId && flag && data.workDate == task.workDate;
                } else if (data.taskType == '2') {
                    return data.doctorId != task.doctorId && flag;
                }
                return true;
            });
        },
        setToken(state, data) {
            state.token = data;
            localStorage.setItem('token', data);
        }
    },
    actions: {
        // 添加任务
        addTask(state, data) {
            addTask(data).then(res => {

            });
            state.commit('pushTask', data);
        },
        // 删除任务
        removeTask(state, data) {
            removeTask({ id: data.id }).then(res => {

            });
            state.commit('deleteTask', data);
        },
        // 获取任务列表
        requestTaskList(state, data) {
            getTaskList({ userId: data }).then(res => {
                state.commit('setTaskList', res.result);
            });
        }
    },
    getters: {
        taskList(state) {
            return state.taskList;
        },
        token(state){
            return state.token
        }
    }
};
