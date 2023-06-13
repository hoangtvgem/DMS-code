import request from '@/utils/request'

export function getListPosition(params) {
  return request({
    url: '/api/get/positionList',
    method: 'get',
    params
  })
}

export function createPosition(data) {
  return request({
    url: '/api/position/create',
    method: 'post',
    data
  })
}

export function getDetailPosition(params) {
  return request({
    url: '/api/position/getDetail',
    method: 'get',
    params
  })
}

export function editPosition(data) {
  return request({
    url: '/api/position/edit',
    method: 'put',
    data
  })
}

export function deletePosition(data) {
  return request({
    url: '/api/position/delete',
    method: 'delete',
    data
  })
}

