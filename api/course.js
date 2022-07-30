import request from '@/utils/request'

export default {
  //1、获取前台课程列表
  getPageList (page, limit, courseQuery) {
    return request({
      url: `/eduservice/coursefront/getPageCourseList/${page}/${limit}`,
      method: 'post',
      data: courseQuery
    })
  },

  //2、获取课程分类,// 获取课程二级分类
  getNestedTreeList2 () {
    return request({
      url: `/eduservice/subject/getAllSubject`,
      method: 'get'
    })
  },

  //3、获取前台单科课程的详情信息
  getCourseDetails (courseId) {
    return request({
      url: `/eduservice/coursefront/getCourseFrontInfo/${courseId}`,
      method: 'get'
    })
  },


  //4、根据课程分类id查询课程分类的序号
  getSubjectIndex (subjectId) {
    return request({
      url: `/eduservice/coursefront/getIndexBySubjectId/${subjectId}`,
      method: 'get'
    })
  },

  //5、统计观看人数
  voidWatchPeopleNums (courseId) {
    return request({
      url: `/eduservice/coursefront/watchPeopleNums/${courseId}`,
      method: 'post'
    })
  }

}