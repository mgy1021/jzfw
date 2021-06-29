/*
 * @Description:
 * @Author: wfz
<<<<<<< HEAD
 * @Date: 2021-06-29 10:38:54
 * @LastEditors: wfz
 * @LastEditTime: 2021-06-29 11:28:11
=======
 * @Date: 2021-06-25 08:48:39
 * @LastEditors: Mogy
 * @LastEditTime: 2021-06-29 11:11:41
>>>>>>> dacac2417ba1aff9d1fc3d9cd4dcbc09fbf6ff3e
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
