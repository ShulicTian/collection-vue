import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '首页' },
            children: [
                {
                    path: '/index',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/index.vue'),
                    meta: { title: '系统首页', permission: true }
                },
                {
                    // 权限页面
                    path: '/taskList',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/TaskList.vue'),
                    meta: { title: '任务列表', permission: true }
                },
                {
                    // 权限页面
                    path: '/dataHandle',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/dataHandle.vue'),
                    meta: { title: '数据解码', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/register',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Register.vue'),
            meta: { title: '注册' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
