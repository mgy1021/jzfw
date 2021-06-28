/*
 * @Author: lucky
 * @Date: 2021-06-24 15:58:53
 * @LastEditors: [you name]
 * @LastEditTime: 2021-06-25 16:55:56
 * @Description: // 资讯评论管理api
 */

import { get, post } from '@/utils/request'

export function batchDelete(data) {
  return post('/comment/batchDelete', {
    ids: data
  })
}
export function check(data) {
  return get('/comment/check', data)
}
export function deleteById(data) {
  return get('/comment/deleteById', data)
}
export function pageQuery(data) {
  return get('/comment/pageQuery', data)
}
export function saveOrUpdate(data) {
  return post('/comment/saveOrUpdate', data)
}

