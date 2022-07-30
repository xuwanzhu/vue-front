/*
  问答评论
*/

import request from '@/utils/request'

export default {

  //1、获取评论分页列表
  getPageList (page, limit, questionId) {
    return request({
      url: `/question/questioncomment/getCommentList/${page}/${limit}`,
      method: 'get',
      params: { questionId }
    })
  },

  //2、添加评论
  addQuestionComment (comment) {
    return request({
      url: `/question/questioncomment/addQuestionComment`,
      method: 'post',
      data: comment
    })
  }

}