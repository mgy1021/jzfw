/*
 * @Description:
 * @Author: ljy
 * @Date: 2021-06-27 11:33:54
 * @LastEditors: wfz
 * @LastEditTime: 2021-06-28 19:26:43
 */
import request, { get } from '@/utils/request'

export function findAll(data) {
  return request({
    url: '/category/findAll',
    method: 'get',
    data
  })
}
// export function saveOrUpdate(data) {
//     return post('/category/saveOrUpdate', data)
// }
export function deleteById(data) {
  return get('/category/deleteById', data)
}

export function saveOrUpdate(data) {
  return request({
    url: '/category/saveOrUpdate',
    method: 'post',
    params: data
  })
}

// export function deleteById(data) {
//     return request({
//         url: '/category/deleteById',
//         method: 'get',
//         data
//     })
// }
