import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/two-auth-qrcode',
    component: () => import('@/views/qrcode/index'),
    hidden: true
  },

  {
    path: '/two-auth-pin',
    component: () => import('@/views/pin/index'),
    hidden: true
  },

  {
    path: '/',
    role: '*',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Trang chủ',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Trang chủ', icon: 'dashboard' }
    }]
  },
  {
    path: '/document',
    role: '*',
    component: Layout,
    redirect: '/document/list',
    name: 'Tài liệu',
    meta: { title: 'Tài liệu', icon: 'table' },
    children: [
      {
        path: 'list',
        role: '*',
        name: 'Danh sách tài liệu',
        component: () => import('@/views/document/list'),
        meta: { title: 'Danh sách tài liệu', icon: 'table' }
      },
      {
        path: 'list-created',
        role: '*',
        name: 'Danh sách tạo mới',
        component: () => import('@/views/document/listCreated'),
        meta: { title: 'Danh sách tạo mới', icon: 'table' }
      },
      {
        path: 'list-pending',
        role: '*',
        name: 'Danh sách chờ duyệt',
        component: () => import('@/views/document/listWaitingPending'),
        meta: { title: 'Danh sách chờ duyệt', icon: 'table' }
      },     
      {
        path: 'list-waiting-approve',
        role: '*',
        name: 'Danh sách duyệt',
        component: () => import('@/views/document/listWaitingApprove'),
        meta: { title: 'Danh sách duyệt', icon: 'table' }
      },  
      {
        path: 'list-reject',
        role: '*',
        name: 'Danh sách bị từ chối',
        component: () => import('@/views/document/listReject'),
        meta: { title: 'Danh sách bị từ chối', icon: 'table' }
      }, 
      {
        path: 'list-publish',
        role: '*',
        name: 'Danh sách chờ ban hành',
        component: () => import('@/views/document/listApproved'),
        meta: { title: 'Danh sách chờ ban hành', icon: 'table' }
      },    
      {
        path: 'create',
        role: '*',
        name: 'Tạo mới',
        component: () => import('@/views/document/create'),
        meta: { title: 'Tạo mới', icon: 'form' }
      },
      {
        path: ':id/:mode',
        role: '*',
        name: 'Chi tiết/ Sửa',
        hidden: true,
        component: () => import('@/views/document/create'),
        meta: { title: 'Chi tiết/ Sửa', icon: 'form' }
      },
    ]
  },
  {
    path: '/user',
    component: Layout,
    role: 'ROLE_ADMIN',
    redirect: '/user/list',
    name: 'User',
    meta: { title: 'User', icon: 'el-icon-user' },
    children: [
      {
        path: 'list',
        role: 'ROLE_ADMIN',
        name: 'Danh sách user',
        component: () => import('@/views/user/list'),
        meta: { title: 'Danh sách', icon: 'table' }
      },
      {
        path: 'create',
        role: 'ROLE_ADMIN',
        name: 'Tạo mới',
        component: () => import('@/views/user/create'),
        meta: { title: 'Tạo mới', icon: 'form' }
      },
      {
        path: ':id',
        role: 'ROLE_ADMIN',
        name: 'Tạo mới',
        hidden: true,
        component: () => import('@/views/user/create'),
        meta: { title: 'Tạo mới', icon: 'form' }
      }
    ]
  },
  {
    path: '/position',
    role: 'ROLE_ADMIN',
    component: Layout,
    redirect: '/position/list',
    name: 'Chức vụ',
    meta: { title: 'Chức vụ', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        role: 'ROLE_ADMIN',
        name: 'Danh sách Chức vụ',
        component: () => import('@/views/position/list'),
        meta: { title: 'Danh sách', icon: 'table' }
      },
      {
        path: 'create',
        role: 'ROLE_ADMIN',
        name: 'Tạo mới',
        component: () => import('@/views/position/create'),
        meta: { title: 'Tạo mới', icon: 'form' }
      },
      {
        path: ':id',
        role: 'ROLE_ADMIN',
        name: 'Tạo mới',
        hidden: true,
        component: () => import('@/views/position/create'),
        meta: { title: 'Tạo mới', icon: 'form' }
      }
    ]
  },
  {
    path: '/department',
    role: 'ROLE_ADMIN',
    component: Layout,
    redirect: '/department/list',
    name: 'Phòng ban',
    meta: { title: 'Phòng ban', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        role: 'ROLE_ADMIN',
        name: 'Danh sách phòng ban',
        component: () => import('@/views/department/list'),
        meta: { title: 'Danh sách', icon: 'table' }
      },
      {
        path: 'create',
        role: 'ROLE_ADMIN',
        name: 'Tạo mới',
        component: () => import('@/views/department/create'),
        meta: { title: 'Tạo mới', icon: 'form' }
      },
      {
        path: ':id',
        role: 'ROLE_ADMIN',
        name: 'Tạo mới',
        hidden: true,
        component: () => import('@/views/department/create'),
        meta: { title: 'Tạo mới', icon: 'form' }
      }
    ]
  },
  {
    path: '/documentType',
    role: 'ROLE_ADMIN',
    component: Layout,
    redirect: '/documentType/list',
    name: 'Loại tài liệu',
    meta: { title: 'Loại tài liệu', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        role: 'ROLE_ADMIN',
        name: 'Danh sách loại tài liệu',
        component: () => import('@/views/documentType/list'),
        meta: { title: 'Danh sách', icon: 'table' }
      },
      {
        path: 'create',
        role: 'ROLE_ADMIN',
        name: 'Tạo mới',
        component: () => import('@/views/documentType/create'),
        meta: { title: 'Tạo mới', icon: 'form' }
      },
      {
        path: ':id',
        role: 'ROLE_ADMIN',
        name: 'Tạo mới',
        hidden: true,
        component: () => import('@/views/documentType/create'),
        meta: { title: 'Tạo mới', icon: 'form' }
      }
    ]
  },
  {
    path: '/setting',
    role: 'ROLE_ADMIN',
    component: Layout,
    redirect: '/setting',
    children: [{
      path: 'setting',
      name: 'Cấu hình',
      component: () => import('@/views/setting/index'),
      meta: { title: 'Cấu hình', icon: 'el-icon-s-tools' }
    }]
  },
  {
    path: '/form',
    hidden: true,
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    hidden: true,
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
