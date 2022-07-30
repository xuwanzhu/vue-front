import request from '@/utils/request'

export default {
  //获取热门课程和名师大咖信息
  getIndex () {
    return request({
      url: '/eduservice/indexfront/index',
      method: 'get'
    })
  }
}