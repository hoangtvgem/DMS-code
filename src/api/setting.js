import request from '@/utils/request'

export function getDetailSetting(params) {
  return request({
    url: '/api/setting/getDetail',
    method: 'get',
    params
  })
}

export function editSetting(data) {
  return request({
    url: '/api/setting/edit',
    method: 'put',
    data
  })
}


