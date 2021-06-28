/*
 * @Author: your name
 * @Date: 2021-06-24 18:58:12
 * @LastEditTime: 2021-06-27 11:30:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \项目模块\src\api\proCategory.js
 */
/*
 * @Author: your name
 * @Date: 2021-06-24 18:58:12
 * @LastEditTime: 2021-06-26 21:26:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \项目模块\src\api\proCategory.js
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
