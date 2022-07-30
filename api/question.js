import request from '@/utils/request'

export default {
  //1、获取多条件分页列表
  getPageList (current, limit, questionQuery) {
    return request({
      url: `/question/service/pageQuestionList/${current}/${limit}`,
      method: 'post',
      data: questionQuery
    })
  },

  //2、新增问答
  addQuestion (question) {
    return request({
      url: `/question/service/addQuestion`,
      method: 'post',
      data: question
    })
  },

  //3、根据问题id查询数据
  getQuestionInfo (questionId) {
    return request({
      url: `/question/service/getQuestionInfo/${questionId}`,
      method: 'get'
    })
  },

  //4、修改问答
  updateQuestion (question) {
    return request({
      url: `/question/service/updateQuestionInfo`,
      method: 'post',
      data: question
    })
  },

  //5、根据ID删除问答
  deleteQuestion (questionId) {
    return request({
      url: `/question/service/deleteQuestionById/${questionId}`,
      method: 'delete'
    })
  },

  //6、获取指定用户的问答分页列表
  getUserPageList (current, limit) {
    return request({
      url: `/question/service/pageUserQuestionList/${current}/${limit}`,
      method: 'get',
    })
  },

}