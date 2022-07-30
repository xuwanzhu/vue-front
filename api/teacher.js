import request from '@/utils/request'

export default {
  //1、获取前台讲师列表
  getTeacherFrontList (page, limit) {
    return request({
      url: `/eduservice/teacherfront/getTeacherFrontList/${page}/${limit}`,
      method: 'get',
    })
  },

  //2、获取前台讲师详情
  getTeacherInfo (teacherid) {
    return request({
      url: `/eduservice/teacherfront/getTeacherDetails/${teacherid}`,
      method: 'get',
    })
  }

}