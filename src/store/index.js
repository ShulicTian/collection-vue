import Vue from 'vue';
import Vuex from 'vuex';
import system from './modules/system';
import task from './modules/task';

Vue.use(Vuex);

const modules = { system ,task};

export default new Vuex.Store({
    plugins: [],
    state: {
        direction: 'slide-fade' // 页面切换方向
    },
    getters: {
        userData(state, getters) {
            return state.system.user;
            // return getters['user/user']
        }
        // vuex 全局getters引入局部
        // token () {te
        //   return this.$store.getters['interview/token']
        // }
    },
    mutations: {
        // 更新页面切换方向
        updateDirection(state, direction) {
            state.direction = direction;
        }
    },
    actions: {},
    modules
});
