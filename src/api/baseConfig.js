/*
 * @Author: lucky
 * @Date: 2021-06-24 15:58:53
 * @LastEditors: [you name]
 * @LastEditTime: 2021-06-26 09:56:27
 * @Description:
 */
// 系统基础配置api

import { get, post } from '@/utils/request'

export function deleteById(data) {
  return get('/baseConfig/deleteById', data)
}
export function findAll(data) {
  return get('/baseConfig/findAll', data)
}
export function findByKey(data) {
  return get('/baseConfig/findByKey', data)
}
export function saveOrUpdate(data) {
  return post('/baseConfig/saveOrUpdate', data)
}

