/*
<<<<<<< HEAD
 * @Description:产品栏目api
 * @Author: wfz
 * @Date: 2021-06-22 16:33:31
 * @LastEditors: wfz
 * @LastEditTime: 2021-06-25 09:03:10
 */
=======
 * @Description: 产品栏目API
 * @Author: Mogy
 * @Date: 2021-06-22 16:33:30
 * @LastEditors: ljy
 * @LastEditTime: 2021-06-28 18:31:46
 */
// 产品栏目api
>>>>>>> 3f530b4d36d1027dc12e5ed9fcc326c49255b058
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
