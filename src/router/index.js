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
                    component: () => import(/* webpackChunkName: "dashboard" */ 'components/page/outer/index.vue'),
                    meta: { title: '系统首页', permission: true }
                },
                {
                    // 权限页面
                    path: '/taskList',
                    component: () => import(/* webpackChunkName: "permission" */ 'components/page/task/TaskList.vue'),
                    meta: { title: '任务列表', permission: true }
                },
                {
                    // 权限页面
                    path: '/dataHandle',
                    component: () => import(/* webpackChunkName: "permission" */ 'components/page/data/dataHandle.vue'),
                    meta: { title: '数据解码', permission: true }
                },
                {
                    // 权限页面
                    path: '/config',
                    component: () => import(/* webpackChunkName: "permission" */ 'components/page/task/config.vue'),
                    meta: { title: '基础配置', permission: true }
                },
                {
                    // 接口测试
                    path: '/interfaceTest',
                    component: () => import(/* webpackChunkName: "permission" */ 'components/page/interface/InterfaceTest.vue'),
                    meta: { title: '接口测试', permission: true }
                },
                {
                    // 接口测试
                    path: '/hqIndex',
                    component: () => import(/* webpackChunkName: "permission" */ 'components/page/outer/hqIndex.vue'),
                    meta: { title: '接口测试', permission: true }
                },
                {
                    // 接口测试
                    path: '/taskIndex',
                    component: () => import(/* webpackChunkName: "permission" */ 'components/page/task/TaskIndex'),
                    meta: { title: '任务首页', permission: true }
                },
                {
                    // 接口测试
                    path: '/taskScheduleList',
                    component: () => import(/* webpackChunkName: "permission" */ 'components/page/task/TaskScheduleList'),
                    meta: { title: '任务分配', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ 'components/page/sys/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ 'components/page/sys/403.vue'),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ 'components/page/sys/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/register',
            component: () => import(/* webpackChunkName: "login" */ 'components/page/sys/Register.vue'),
            meta: { title: '注册' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
