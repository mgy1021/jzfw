/*
 * @Description: 
 * @Author: Mogy
 * @Date: 2021-06-24 19:23:45
 * @LastEditors: Mogy
 * @LastEditTime: 2021-06-26 15:54:56
 */
// 订单管理api

import { get, post } from "@/utils/request";

// 查询订单
export function pageQuery(data) {
    return get('/order/pageQuery', data)
}

// 派单
export function sendOrder(data) {
    return get('/order/sendOrder', data)
}

// 取消派单
export function cancelSendOrder(data) {
    return get('/order/cancelSendOrder', data)
}

// 通过id查询订单详情
export function findById(data) {
    return get('/order/findById', data)
}
