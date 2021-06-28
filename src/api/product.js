/*
 * @Author: your name
 * @Date: 2021-06-24 18:58:12
 * @LastEditTime: 2021-06-25 19:58:53
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \项目模块\src\api\product.js
 */
// 产品管理api
/*
 * @Description: 产品管理API
 * @Author: Mogy
 * @Date: 2021-06-22 14:52:11
 * @LastEditors: ljy
 * @LastEditTime: 2021-06-28 16:30:37
 */
import { get, post } from '@/utils/request'

// 下架
export function offline(data) {
  return get('/product/offline', data)
}

// 上架
export function online(data) {
  return get('/product/online', data)
}

// 分页查询产品相关信息
export function pageQuery(data) {
  return get('/product/pageQuery', data)
}

// 保存或更新产品信息
export function saveOrUpdate(data) {
  return post('/product/saveOrUpdate', data)
}

// 产品下架
export function productOffline(data) {
  return get('/product/offline', data)
}

// 产品上架
export function productOnline(data) {
  return get('/product/online', data)
}
