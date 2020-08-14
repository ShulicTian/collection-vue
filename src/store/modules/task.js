import { addTask, getTaskList, removeTask } from '../../api/task';

export default {
    namespaced: true,
    state: {
        taskList: [],
        token: localStorage.getItem('token') || '',
        task: null,
        userId: localStorage.getItem('userId') || '',
        memberId: localStorage.getItem('memberId') || ''
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
                if (data.taskType == '0') {
                    return !(task.depId == data.depId && data.doctorId == task.doctorId && data.workDate == task.workDate && data.timeUnit == task.timeUnit);
                } else if (data.taskType == '1') {
                    return !(task.depId == data.depId && data.doctorId == task.doctorId && data.workDate == task.workDate);
                } else if (data.taskType == '2') {
                    return !(task.depId == data.depId && data.doctorId == task.doctorId);
                }
                return true;
            });
        },
        setToken(state, data) {
            state.token = data;
            localStorage.setItem('token', data);
        },
        setTask(state, data) {
            state.task = data;
        },
        setLoginInfo(state, data) {
            state.memberId = data.memberId;
            state.userId = data.userId;
            localStorage.setItem('memberId', data.memberId);
            localStorage.setItem('userId', data.userId);
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
        token(state) {
            return state.token;
        },
        getTask(state) {
            return state.task;
        },
        getUserId(state) {
            return state.userId;
        },
        getMemberId(state) {
            return state.memberId;
        }
    }
};
