/*
 * @Description: 产品栏目API
 * @Author: Mogy
 * @Date: 2021-06-22 16:33:30
 * @LastEditors: Mogy
 * @LastEditTime: 2021-06-29 10:56:27
 */
// 产品栏目api
import { get, post } from '@/utils/request'
// 分页查询产品分类相关信息
export function pageQuery(data) {
  return get('/productCategory/pageQuery', data)
}
export function saveOrUpdate(data) {
  return post('/productCategory/saveOrUpdate', data)
}
export function deleteById(data) {
  return get('/productCategory/deleteById', data)
}
