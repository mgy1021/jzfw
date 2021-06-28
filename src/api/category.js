/*
 * @Description: 
 * @Author: ljy
 * @Date: 2021-06-27 11:33:54
 * @LastEditors: ljy
 * @LastEditTime: 2021-06-27 17:15:55
 */
import request, { post, get } from '@/utils/request'
import qs from 'qs'

export function findAll(data) {
    return request({
        url: '/category/findAll',
        method: 'get',
        data
    })
}
// export function saveOrUpdate(data) {
//     return post('/category/saveOrUpdate', data)
// }
export function deleteById(data) {
    return get('/category/deleteById', data)
}

export function saveOrUpdate(data) {
    return request({
        url: '/category/saveOrUpdate',
        method: 'post',
        params: data
    })
}

// export function deleteById(data) {
//     return request({
//         url: '/category/deleteById',
//         method: 'get',
//         data
//     })
// }