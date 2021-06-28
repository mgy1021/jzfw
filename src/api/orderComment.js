/*
 * @Author: lucky
 * @Date: 2021-06-24 15:58:53
 * @LastEditors: [you name]
 * @LastEditTime: 2021-06-25 20:10:27
 * @Description: // 订单评论管理api
 */
import { get, post } from '@/utils/request'

export function checkNoPass(data) {
  return post('/orderComment/checkNoPass', data)
}

export function checkPass(data) {
  return post('/orderComment/checkPass', data)
}

export function deleteById(data) {
  return get('/orderComment/deleteById', data)
}

export function pageQuery(data) {
  return get('/orderComment/pageQuery', data)
}

export function submit(data) {
  return post('/orderComment/submit', data)
}

