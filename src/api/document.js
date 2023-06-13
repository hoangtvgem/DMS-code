import request from '@/utils/request'

export function getDashboardDocument() {
  return request({
    url: '/api/get/documentDashboard',
    method: 'get',
  })
}

export function getListDocument(params) {
  return request({
    url: '/api/get/documentList',
    method: 'get',
    params
  })
}

export function createDocument(data) {
  return request({
    url: '/api/document/create',
    method: 'post',
    data
  })
}

export function getDetailDocument(params) {
  return request({
    url: '/api/document/getDetail',
    method: 'get',
    params
  })
}

export function editDocument(data) {
  return request({
    url: '/api/document/edit',
    method: 'put',
    data
  })
}

export function deleteDocument(data) {
  return request({
    url: '/api/document/delete',
    method: 'delete',
    data
  })
}

