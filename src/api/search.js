/**
 * 搜索相关接口模块，部分接口地址或已更改可能引起错误
 */
import request from '@/utils/request'

/**
 * 用户登录
 */
export function getSuggestions (q) {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 * 获取搜索结果
 */
export function getSearch (params) {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
