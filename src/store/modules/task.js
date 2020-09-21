import {addTask, getTaskList, removeTask, saveSchedule, getScheduleList, removeSchedule} from '../../api/task';

export default {
    namespaced: true,
    state: {
        scheduleList: [],
        scheduleSwitchList: [],
        taskList: [],
        timeTaskList: null
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
        setTimeTaskList(state, data) {
            state.timeTaskList = data;
        },
        setScheduleList(state, data) {
            state.scheduleList = data;
        },
        pushScheduleSwitchList(state, data) {
            state.scheduleSwitchList.push(data);
        },
        setScheduleSwitchList(state, data) {
            state.scheduleSwitchList = data
        },
        removeSchedule(state, data) {
            state.scheduleList = state.scheduleList.filter(sche => sche.id != data.id);
        }
    },
    actions: {
        // 添加任务
        addTask(state, data) {
            addTask(data).then(res => {
                state.commit('pushTask', data);
            });
        },
        // 删除任务
        removeTask(state, data) {
            removeTask({id: data.id}).then(res => {
                state.commit('deleteTask', data);
            });
        },
        // 获取任务列表
        async requestTaskList(state, data) {
            let res = await getTaskList({userId: data});
            state.commit('setTaskList', res.result);
            return res.result;
        },
        // 保存任务分配
        saveSchedule(state, data) {
            saveSchedule({
                id: data.id,
                name: data.name,
                idCard: data.idCard,
                mobile: data.mobile,
                memberId: data.memberId,
                token: data.token
            }).then(ret => {
            });
        },
        // 保存任务分配
        async getScheduleList(state, data) {
            let res = await getScheduleList({});
            state.commit('setScheduleList', res.result);
            return res.result;
        },
        // 删除任务分配
        removeSchedule(state, data) {
            removeSchedule(data).then(res => {
                state.commit('removeSchedule', data);
            });
        }
    },
    getters: {
        getTaskList(state) {
            return state.taskList;
        },
        getTimeTaskList(state) {
            return state.timeTaskList;
        },
        getScheduleList(state) {
            return state.scheduleList;
        },
        getScheduleSwitchList(state) {
            return state.scheduleSwitchList;
        }
    }
};
