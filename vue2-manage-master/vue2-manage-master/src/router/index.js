import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const addClue = r => require.ensure([], () => r(require('@/page/addClue')), 'addClue');
const extend = r => require.ensure([], () => r(require('@/page/extend')), 'extend');
const consultant = r => require.ensure([], () => r(require('@/page/consultant')), 'consultant');
const technician = r => require.ensure([], () => r(require('@/page/technician')), 'technician');
const componenter = r => require.ensure([], () => r(require('@/page/componenter')), 'componenter');
const treasurer = r => require.ensure([], () => r(require('@/page/treasurer')), 'treasurer');
const manager = r => require.ensure([], () => r(require('@/page/manager')), 'manager');

const todoList = r => require.ensure([], () => r(require('@/page/todoList')), 'todoList');
const doingList = r => require.ensure([], () => r(require('@/page/doingList')), 'doingList');

const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: [],
		},{
			path: '/addClue',
			component: addClue,
			meta: ['添加数据', '添加商铺'],
		},{
            path: '/consultant',
            component: consultant,
            meta: ['添加数据', '添加商铺'],
        },{
            path: '/technician',
            component: technician,
            meta: ['添加数据', '添加商铺'],
        },{
            path: '/componenter',
            component: componenter,
            meta: ['添加数据', '添加商铺'],
        },{
            path: '/treasurer',
            component: treasurer,
            meta: ['添加数据', '添加商铺'],
        },{
            path: '/manager',
            component: manager,
            meta: ['添加数据', '添加商铺'],
        },{
            path: '/extend',
            component: extend,
            meta: ['添加数据', '添加商铺'],
        },{
			path: '/todoList',
			component: todoList,
			meta: ['数据管理', '用户列表'],
		},{
            path: '/doingList',
            component: doingList,
            meta: ['数据管理', '办理中'],
        }]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
