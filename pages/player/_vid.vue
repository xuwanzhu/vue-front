<template>
  <!--条件查询表单-->
  <!--查询表单-->
  <div id="fromm">

    <div>
      <div>
        <el-form :inline="true" class="demo-form-inline">
          <!-- 所属分类：级联下拉列表 -->
          <!-- 一级分类 -->

          <el-form-item label="课程章节">
            <el-select v-model="searchObj.subjectParentId" placeholder="请选择" @change="subjectLevelOneChanged">
              <el-option v-for="subject in subjectNestedList" :key="subject.id" :label="subject.title"
                :value="subject.id" />
            </el-select>

            <!-- 二级分类 -->
            <el-select v-model="searchObj.subjectId" placeholder="请选择" @change="playVideo">
              <el-option v-for="subject in subSubjectList" :key="subject.id" :label="subject.title"
                :value="subject.id" />
            </el-select>
          </el-form-item>

          <el-button @click="goCourseDetails()" round>返回详情页</el-button>
        </el-form>
      </div>

      <!-- 阿里云视频播放器样式 -->
      <link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.8.1/skins/default/aliplayer-min.css">
      <!-- 阿里云视频播放器脚本 -->
      <script charset="utf-8" type="text/javascript" src="https://g.alicdn.com/de/prismplayer/2.8.1/aliplayer-min.js" />
      <!-- 定义播放器dom -->
      <div id="J_prismPlayer" class="prism-player" />
    </div>

  </div>
</template>

<script> 
import vod from '@/api/vod'

export default {

  layout: 'video', //应用video布局

  //1、获取vid和playAuth
  asyncData ({ params, error }) {
    return vod.getPlayAuth(params.vid).then(response => {
      // console.log(response.data.data)
      return {
        vid: params.vid,
        playAuth: response.data.data.playAuth
      }
    })
  },


  data () {
    return {
      searchObj: { //封装查询对象
        subjectParentId: '',
        subjectId: '',
        title: ''
      },

      subjectNestedList: {}, // 一级分类 章 列表 chapter
      subSubjectList: {} // 二级分类 小节 列表  video
    }
  },

  created () {

    //1获取id
    this.vid = this.$route.params.vid

    //2初始化分类列表，调用获取章节和小节列表的方法,或者做数据回显
    this.initSearchObj()

    //3创建播放器，初始化播放器，即采用mounted()
  },


  methods: {

    //一、初始化播放器, 相当于上面的异步调用


    //二、初始化分类对象，或者回显数据
    initSearchObj () {
      this.searchObj.subjectParentId = this.$route.query.chapterId //注意 取参方式
      this.searchObj.subjectId = this.$route.query.videoId

      this.videoID = this.$route.query.videoId
      vod.getChapterVoListByVideoId(this.videoID)
        .then(result => {
          this.subjectNestedList = result.data.data.chapterVoList

          for (var index = 0; index < this.subjectNestedList.length; index++) {

            if (this.searchObj.subjectParentId == this.subjectNestedList[index].id) {
              this.subSubjectList = this.subjectNestedList[index].children //二级分类列表

            }
          }
        })
    },

    //3、选择-小节类别
    subjectLevelOneChanged (value) {
      for (let i = 0; i < this.subjectNestedList.length; i++) {
        if (this.subjectNestedList[i].id === value) { //value=subject.id ，subjectNestedList为一级分类列表
          this.subSubjectList = this.subjectNestedList[i].children  //二级分类列表
          this.searchObj.subjectId = ''  //subjectId为二级分类id
        }
      }
    },

    //4、小节视频播放
    playVideo () {
      vod.getVideoByVideoId(this.searchObj.subjectId)
        .then(response => {
          //1获取视频资源vid、章节id、视频id
          let VID = response.data.data.videoSourceId
          let chapterId = response.data.data.chapterId
          let videoId = response.data.data.videoId
          //这个跳转路径是 router中path中的地址
          this.$router.push({ path: '/player/' + VID, query: { chapterId: chapterId, videoId: videoId } }) //做返回上一步的数据回显，courseId必须有值

        })
    },

    //5、返回上一页
    goCourseDetails () {
      vod.getCourseIdByVideoId(this.videoID)
        .then(response => {
          let cid = response.data.data.courseId
          this.$router.push({ path: '/course/' + cid }) //做返回上一步,数据回显
        })
    }

  },


  /**
   * mounted():页面渲染完成时：此时js脚本已加载，Aliplayer已定义，可以使用
   * created():如果在created生命周期函数中使用，Aliplayer is not defined错误
   */
  mounted () {
    new Aliplayer({
      id: 'J_prismPlayer',
      vid: this.vid, // 视频id
      playauth: this.playAuth, // 播放凭证
      encryptType: '1', // 如果播放加密视频，则需设置encryptType=1，非加密视频无需设置此项

      width: '1000px', //播放器的大小
      height: '500px',

      // 以下可选设置
      //cover: 'http://guli.shop/photo/banner/1525939573202.jpg', // 封面
      qualitySort: 'asc', // 清晰度排序
      mediaType: 'video', // 返回音频还是视频
      autoplay: false, // 自动播放
      isLive: false, // 直播
      rePlay: false, // 循环播放
      preload: true,
      controlBarVisibility: 'hover', // 控制条的显示方式：鼠标悬停
      useH5Prism: true, // 播放器类型：html5
    }, function (player) {
      console.log('播放器创建成功')
    })
  }
}
</script>

<style scoped>
#fromm {
  width: 1000px;
  height: 700px;
  margin: 0 auto;
  display: flex;
}
#fromm div {
  flex: 1;
}
</style>



