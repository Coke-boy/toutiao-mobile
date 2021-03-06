/**
 * 频道相关接口，部分接口地址或已更改可能引起错误
 */
import request from '@/utils/request'

/**
 * 获取所有频道列表
 */
export function getAllChannels () {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}

export const addChannel = channel => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}

export const deleteChannel = channelId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelId}`
  })
}
