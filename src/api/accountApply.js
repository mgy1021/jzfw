/*
 * @Author: lucky
 * @Date: 2021-06-24 15:58:53
 * @LastEditors: [you name]
 * @LastEditTime: 2021-06-25 10:56:35
 * @Description: 审核大厅-账户变动审核api
 */
//

import { get, post } from '@/utils/request'

// 分页查询账户变动申请
export function pageQueryAccountApply(data) {
  return get('/accountApply/pageQueryAccountApply', data)
}
// 提交账户变动申请
export function submitAccountApply(data) {
  return post('/accountApply/submitAccountApply', data)
}
// 撤销账户变动申请
export function revokeAccountApply(data) {
  return get('/accountApply/revokeAccountApply', data)
}
// 审核通过
export function checkPass(data) {
  return get('/accountApply/checkPass', data)
}
// 审核不通过
export function checkNoPass(data) {
  return get('/accountApply/checkNoPass', data)
}
