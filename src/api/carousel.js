/*
 * @Description:
 * @Author: wfz
 * @Date: 2021-06-25 08:48:39
 * @LastEditors: wfz
 * @LastEditTime: 2021-06-25 22:20:39
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
