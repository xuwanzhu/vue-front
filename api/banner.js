import request from '@/utils/request'

export default {
  //获取前端banner信息
  getListBanner () {
    return request({
      url: '/educms/banner/getAllBanner',
      method: 'get'
    })
  }
}