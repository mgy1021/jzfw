/*
 * @Author: lucky
 * @Date: 2021-06-24 15:58:53
 * @LastEditors: [you name]
 * @LastEditTime: 2021-06-26 09:20:28
 * @Description:
 */
// 日志管理api

import { get, post } from '@/utils/request'

export function pageQuery(data) {
  return get('/baseLog/pageQuery', data)
}

export function save(data) {
  return post('/baseLog/save', data)
}
