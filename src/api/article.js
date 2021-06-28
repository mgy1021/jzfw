/*
 * @Description: 
 * @Author: ljy
 * @Date: 2021-06-24 16:23:07
 * @LastEditors: ljy
 * @LastEditTime: 2021-06-28 18:31:28
 */
// 资讯管理API

import request, { post, get } from '@/utils/request'


export function pageQuery(data) {
    return get('/article/pageQuery', data)
}

export function findAllTwo(data) {
    return get('/article/findAll', data)
}

export function saveOrUpdate(data) {
    return post('/article/saveOrUpdate', data)
}
export function changeStatus(data) {
    return post('/article/changeStatus', data)
}
export function deleteById(data) {
    return get('/article/deleteById', data)
}
