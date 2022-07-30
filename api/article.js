import request from '@/utils/request'

export default {
  //1、获取多条件分页列表
  getPageList (current, limit, articleQuery) {
    return request({
      url: `/article/articleService/pageArticleList/${current}/${limit}`,
      method: 'post',
      data: articleQuery
    })
  },

  //2、新增文章
  addArticle (article) {
    return request({
      url: `/article/articleService/addArticle`,
      method: 'post',
      data: article
    })
  },

  //3、根据文章id查询数据
  getArticleInfo (articleId) {
    return request({
      url: `/article/articleService/getArticleInfo/${articleId}`,
      method: 'get'
    })
  },


  //4、修改文章
  updateArticle (article) {
    return request({
      url: `/article/articleService/updateArticleInfo`,
      method: 'post',
      data: article
    })
  },

  //5、根据ID删除文章
  deleteArticle (articleId) {
    return request({
      url: `/article/articleService/deleteArticleById/${articleId}`,
      method: 'delete'
    })
  },

  //6、获取指定用户的文章分页列表
  getUserPageList (current, limit) {
    return request({
      url: `/article/articleService/pageUserArticleList/${current}/${limit}`,
      method: 'get',
    })
  },

}