/*
 * @Description: 
 * @Author: Mogy
 * @Date: 2021-06-24 19:23:45
 * @LastEditors: Mogy
 * @LastEditTime: 2021-06-25 16:33:15
 */
// 账户管理api
import {get,post} from '@/utils/request'

// 员工账单查询
export function pageQueryEmployeeAccount(data){
    return get('/account/pageQueryEmployeeAccount',data)
}

// 顾客账单查询
export function pageQueryCustomerAccount(data){
    return get('/account/pageQueryCustomerAccount',data)
}

// 系统账单查询
export function pageQuerySystemAccount(data){
    return get('/account/pageQuerySystemAccount',data)
}

