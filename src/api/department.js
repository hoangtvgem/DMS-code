import request from '@/utils/request'

export function getListDepartment(params) {
  return request({
    url: '/api/get/departmentList',
    method: 'get',
    params
  })
}

export function createDepartment(data) {
  return request({
    url: '/api/department/create',
    method: 'post',
    data
  })
}

export function getDetailDepartment(params) {
  return request({
    url: '/api/department/getDetail',
    method: 'get',
    params
  })
}

export function editDepartment(data) {
  return request({
    url: '/api/department/edit',
    method: 'put',
    data
  })
}

export function deleteDepartment(data) {
  return request({
    url: '/api/department/delete',
    method: 'delete',
    data
  })
}

