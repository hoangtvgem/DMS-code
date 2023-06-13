import request from '@/utils/request'

export function getListDocumentType(params) {
  return request({
    url: '/api/get/documentTypeList',
    method: 'get',
    params
  })
}

export function createDocumentType(data) {
  return request({
    url: '/api/documentType/create',
    method: 'post',
    data
  })
}

export function getDetailDocumentType(params) {
  return request({
    url: '/api/documentType/getDetail',
    method: 'get',
    params
  })
}

export function editDocumentType(data) {
  return request({
    url: '/api/documentType/edit',
    method: 'put',
    data
  })
}

export function deleteDocumentType(data) {
  return request({
    url: '/api/documentType/delete',
    method: 'delete',
    data
  })
}

