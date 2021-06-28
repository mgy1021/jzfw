/*
 * @Author: lucky
 * @Date: 2021-06-24 15:58:53
 * @LastEditors: [you name]
 * @LastEditTime: 2021-06-25 14:04:15
 * @Description: // 实名认证申请api
 */

import { get, post } from '@/utils/request'

export function checkNoPass(data) {
  return get('/certification/checkNoPass', data)
}

export function checkPass(data) {
  return get('/certification/checkPass', data)
}
export function pageQueryCertificationApply(data) {
  return get('/certification/pageQueryCertificationApply', data)
}

export function revokeCertificationApply(data) {
  return get('/certification/revokeCertificationApply', data)
}

export function submitCertificationApply(data) {
  return post('/certification/submitCertificationApply', data)
}

