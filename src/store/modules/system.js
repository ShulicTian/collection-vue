export default {
    namespaced: true,
    state: {
        token: localStorage.getItem('authToken') || '',
        user: JSON.parse(localStorage.getItem('user_data')) || null,
        dataHandleFlag: false
    },
    mutations: {
        setUser(state, data) {
            const userDate = data;
            state.user = data;
            if (data) {
                state.token = data.token;
                localStorage.setItem('authToken', data.token);
            }
            localStorage.setItem('user_data', JSON.stringify(userDate));
        },
        setDataHandleFlag(state, data) {
            state.dataHandleFlag = data;
        },
        cleanCache(state) {
            state.token = null
            state.user = null
            localStorage.removeItem("token")
            localStorage.removeItem("userId")
            localStorage.removeItem("memberId")
        }
    },
    actions: {
        // 保存用户信息
        saveUser(state, data) {
            state.commit('setUser', data);
        }
    },
    getters: {
        token(state) {
            return state.token;
        },
        getUser(state) {
            return state.user;
        },
        getDataHandleFlag(state) {
            return state.dataHandleFlag;
        }
    }
};
