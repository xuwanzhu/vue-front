import request from '@/utils/request'

export default {
  //1、获取视频播放凭证
  getPlayAuth (videoId) {
    return request({
      url: `/eduvod/video/getVideoPlayAuth/${videoId}`,
      method: 'get'
    })
  },

  //2、根据视频地址id 获取章节信息
  getChapterVoListByVideoId (videoId) {
    return request({
      url: `/eduservice/coursefront/getChapterVoListByVideoId/${videoId}`,
      method: 'get'
    })
  },

  //2、根据小节id获取 视频资源id
  getVideoByVideoId (videoId) {
    return request({
      url: `/eduservice/coursefront/getVideoSourceIdByVideoId/${videoId}`,
      method: 'get'
    })
  },

  //2、根据小节id获取课程id
  getCourseIdByVideoId (videoId) {
    return request({
      url: `/eduservice/coursefront/getCourseIdByVideoId/${videoId}`,
      method: 'get'
    })
  }
}