/*
  课程评论
*/

import request from '@/utils/request'

export default {

  //1、获取评论分页列表
  getPageList (page, limit, courseId) {
    return request({
      url: `/eduservice/comment/getCommentList/${page}/${limit}`,
      method: 'get',
      params: { courseId }
      /*
      
      在使用axios时，注意到配置选项中包含params和data两者，以为他们是相同的，实则不然。 
      
      因为params是添加到url的请求字符串中的，用于get请求。 
      
      而data是添加到请求体（body）中的， 用于post请求。
      */
    })
  },

  //2、添加评论
  addCourseComment (comment) {
    return request({
      url: `/eduservice/comment/addCourseComment`,
      method: 'post',
      data: comment
    })
  }

}