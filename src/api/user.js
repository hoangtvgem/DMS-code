import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/auth/signin',
    method: 'post',
    data
  })
}

export function getListUser(params) {
  return request({
    url: '/api/get/userList',
    method: 'get',
    params
  })
}

export function createUser(data) {
  return request({
    url: '/api/user/create',
    method: 'post',
    data
  })
}

export function editUser(data) {
  return request({
    url: '/api/user/edit',
    method: 'put',
    data
  })
}

export function getDetailUser(params) {
  return request({
    url: '/api/user/getDetail',
    method: 'get',
    params
  })
}

export function deleteUser(data) {
  return request({
    url: '/api/user/delete',
    method: 'delete',
    data
  })
}

export function logout() {
  return request({
    url: '/api/auth/signout',
    method: 'post'
  })
}

export function enterPin(data) {
  return request({
    url: '/api/auth/verify-2fa',
    method: 'post',
    data
  })
}
