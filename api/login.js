import request from '@/utils/request'

export default {
  //登录
  submitLogin (userInfo) {
    return request({
      url: `/educenter/member/login`,
      method: 'post',
      data: userInfo
    })
  },


  //根据token获取用户信息
  getLoginInfo () {
    return request({
      url: `/educenter/member/getLoginUserInfo`,
      method: 'get'
    })
  },

  //修改用户信息
  updateUser (userInfo) {
    return request({
      url: `/educenter/member/update`,
      method: 'post',
      data: userInfo
    })
  },

}