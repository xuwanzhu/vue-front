import request from '@/utils/request'

export default {
  //根据手机号码发送注册的 验证码
  getMobileCode (phone) {
    return request({
      url: `/edumsm/msm/send/${phone}`,
      method: 'get'
    })
  },

  //注册
  submitRegister (formItem) {
    return request({
      url: `/educenter/member/register`,
      method: 'post',
      data: formItem
    })
  }

}