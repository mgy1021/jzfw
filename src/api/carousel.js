/*
 * @Description:
 * @Author: wfz
 * @Date: 2021-06-29 10:38:54
 * @LastEditors: wfz
 * @LastEditTime: 2021-06-29 11:09:55
 */
// 轮播图配置api
import { get, post } from '@/utils/request'

export function findAll() {
  return get('/carousel/findAll')
}

export function saveOrUpdate(data) {
  return post('/carousel/saveOrUpdate', data)
}

export function query(data) {
  return get('/carousel/query', data)
}

export function deleteById(data) {
  return get('/carousel/deleteById', data)
}
