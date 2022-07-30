<template>
  <div id="aCoursesList" class="bg-fa of">

    <!-- /课程详情 开始 -->
    <section class="container">
      <!-- 课程所属分类 开始 -->
      <section class="path-wrap txtOf hLh30">
        <a href="/" title class="c-333 fsize14">首页</a>
        \
        <a href="/course" title class="c-333 fsize14">课程列表</a>
        \
        <!--<a href="/course" title class="c-333 fsize14">{{ course.subjectLevelOne }}</a>-->

        <nuxt-link :to="{path:'/course/',query:{subjectLevelOneId:course.subjectLevelOneId}}">

          <a title class="c-333 fsize14">{{ course.subjectLevelOne }}</a>

        </nuxt-link>

        \
        <span class="c-333 fsize14">{{ course.subjectLevelTwo }}</span>
      </section>
      <!-- 课程所属分类 结束 -->

      <!-- 课程基本信息 开始 -->
      <div>
        <article class="c-v-pic-wrap" style="height: 357px;width:760px">
          <section id="videoPlay" class="p-h-video-box">
            <img :src="course.cover" width=100% height=100% :alt="course.title" class="dis c-v-pic">
          </section>
        </article>
        <aside class="c-attr-wrap">
          <section class="ml20 mr15">
            <h2 class="hLh30 txtOf mt15">
              <span class="c-fff fsize24">{{ course.title }}</span>
            </h2>
            <section class="c-attr-jg">
              <span class="c-fff">价格：</span>
              <b class="c-yellow" style="font-size:24px;">￥{{ course.price}}</b>
            </section>
            <section class="c-attr-mt c-attr-undis">
              <span class="c-fff fsize14">主讲： {{ course.teacherName}}&nbsp;&nbsp;&nbsp;</span>
            </section>
            <!-- TODO     <section class="c-attr-mt of">
              <span class="ml10 vam">
                <em class="icon18 scIcon" />
                <a class="c-fff vam" title="收藏" href="#">收藏</a>
              </span>
            </section>
            -->
            <section class="c-attr-mt of">
              <span class="c-fff fsize14">课时数：{{ course.lessonNum }}
              </span>
            </section>

            <section class="c-attr-mt">
              <router-link target="_blank"
                :to="{path:'/player/'+this.watchObj.watchVid,query:{chapterId:this.watchObj.watchChapterId,videoId:this.watchObj.watchVideoId}}">
                <a v-if="isbuyCourse || Number(course.price)===0" title="立即观看" @click="watchVideo()"
                  class="comm-btn c-btn-3">立即观看</a>

                <a v-else @click="createOrder()" href="#" title="立即购买" class="comm-btn c-btn-3">立即购买</a>
              </router-link>

            </section>

          </section>
        </aside>
        <!-- TODO    <aside class="thr-attr-box">
          <ol class="thr-attr-ol ">
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">购买数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{ course.buyCount }}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">课时数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{ course.lessonNum }}</h6>
              </aside>
            </li>
              <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">浏览数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{ course.viewCount }}</h6>
              </aside>
            </li>
          
          </ol>
        </aside>
        -->
        <div class="clear" />
      </div>
      <!-- 课程基本信息 结束 -->

      <!-- /课程封面介绍 -->
      <div class="mt20 c-infor-box">
        <article class="fl col-7">
          <section class="mr30">
            <div class="i-box">
              <div>
                <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
                  <a name="c-i" class="current" title="课程详情">课程详情</a>
                </section>
              </div>
              <article class="ml10 mr10 pt20">

                <!-- 课程详情介绍 开始 -->
                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span>课程介绍</span>
                  </h6>
                  <div class="course-txt-body-wrap">
                    <section class="course-txt-body">
                      <!-- v-html将内容中的html翻译过来 -->
                      <p v-html="course.description">{{ course.description }}</p>
                    </section>
                  </div>
                </div>
                <!-- 课程详情介绍 结束 -->

                <!-- /课程大纲 开始-->
                <div class="mt50">
                  <h6 class="c-g-content c-infor-title">
                    <span>课程大纲</span>
                  </h6>
                  <section class="mt20">
                    <div class="lh-menu-wrap">
                      <menu id="lh-menu" class="lh-menu mt10 mr10">
                        <ul>
                          <!-- 课程章节目录 -->
                          <li v-for="chapter in chapterList" :key="chapter.id" class="lh-menu-stair">
                            <a :title="chapter.title" href="javascript: void(0)" class="current-1">
                              <em class="lh-menu-i-1 icon18 mr10" />{{ chapter.title}}
                            </a>
                            <ol class="lh-menu-ol" style="display: block;">

                              <li v-for="video in chapter.children" :key="video.id" class="lh-menu-second ml30">

                                <!--  <a :href="'/player/'+video.videoSourceId" target="_blank">
                                  <span v-if="video.isFree === 1" class="fr">
                                    <i class="free-icon vam mr10">免费试听</i>
                                  </span>
                                  <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>{{ video.title }}
                                </a>  -->

                                <nuxt-link target="_blank"
                                  :to="{path:'/player/'+video.videoSourceId,query:{chapterId:chapter.id,videoId:video.id}}">

                                  <span v-if="isbuyCourse || course.price ===0" class="fr">
                                    <i class="free-icon vam mr10">观看</i>
                                  </span>

                                  <span v-if="(isbuyCourse==false) && (course.price >0) && (video.isFree===1)"
                                    class="fr">
                                    <i class="free-icon vam mr10">免费试听</i>
                                  </span>

                                  <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>{{ video.title }}
                                </nuxt-link>

                              </li>

                            </ol>
                          </li>
                        </ul>

                      </menu>
                    </div>
                  </section>
                </div>
                <!-- /课程大纲 结束-->

              </article>
            </div>
          </section>
        </article>
        <aside class="fl col-3">
          <div class="i-box">
            <!--主讲讲师 开始-->
            <div>
              <section class="c-infor-tabTitle c-tab-title">
                <a title href="javascript:void(0)">主讲讲师</a>
              </section>
              <section class="stud-act-list">
                <ul style="height: auto;">
                  <li>
                    <div class="u-face">
                      <a :href="'/teacher/'+course.teacherId" target="_blank">
                        <img :src="course.avatar" width="50" height="50" alt>
                      </a>
                    </div>
                    <section class="hLh30 txtOf">
                      <a :href="'/teacher/'+course.teacherId" class="c-333 fsize16 fl"
                        target="_blank">{{ course.teacherName }}</a>
                    </section>
                    <section class="hLh20 txtOf">
                      <span class="c-999">{{ course.intro }}</span>
                    </section>
                  </li>
                </ul>
              </section>
            </div>
            <!--主讲讲师 结束-->
          </div>
        </aside>
        <div class="clear"></div>
      </div>

      <!--课程评论 开始-->
      <div class="mt50 commentHtml">
        <div>
          <h6 class="c-c-content c-infor-title" id="i-art-comment">
            <span class="commentTitle">课程评论</span>
          </h6>
          <section class="lh-bj-list pr mt20 replyhtml">
            <ul>
              <li class="unBr">
                <aside class="noter-pic">
                  <img width="50" height="50" class="picImg" src="~/assets/img/avatar-boy.gif">
                </aside>
                <div class="of">
                  <section class="n-reply-wrap">
                    <fieldset>
                      <textarea name="" v-model="comment.content" placeholder="输入您要评论的文字"
                        id="commentContent"></textarea>
                    </fieldset>

                    <p class="of mt5 tar pl10 pr10">
                      <span class="fl "><tt class="c-red commentContentmeg" style="display: none;"></tt></span>
                      <input type="button" @click="addComment()" value="回复" style="width:150px;height:30px"
                        class="lh-reply-btn">
                    </p>

                  </section>
                </div>
              </li>
            </ul>
          </section>

          <section class="">
            <section class="question-list lh-bj-list pr">
              <ul class="pr10">
                <li v-for="(comment,index) in data.items" v-bind:key="index">
                  <aside class="noter-pic">
                    <img width="50" height="50" class="picImg" :src="comment.avatar">
                  </aside>
                  <div class="of">
                    <span class="fl">
                      <font class="fsize12 c-blue">
                        {{comment.nickname}}</font>
                      <font class="fsize12 c-999 ml5">评论：</font>
                    </span>
                  </div>
                  <div class="noter-txt mt5">
                    <p>{{comment.content}}</p>
                  </div>
                  <div class="of mt5">
                    <span class="fr">
                      <font class="fsize12 c-999 ml5">{{comment.gmtCreate}}</font>
                    </span>
                  </div>
                </li>
              </ul>
            </section>
          </section>

          <!-- 公共分页 开始 -->
          <div class="paging">
            <!-- undisable这个class是否存在(可用)，取决于数据属性hasPrevious -->
            <a :class="{undisable: !data.hasPrevious}" href="#" title="首页" @click.prevent="gotoPage(1)">首页</a>

            <a :class="{undisable: !data.hasPrevious}" href="#" title="前一页"
              @click.prevent="gotoPage(data.current-1)">&lt;</a>

            <a v-for="page in data.pages" :key="page"
              :class="{current: data.current == page, undisable: data.current ==page}" :title="'第'+page+'页'" href="#"
              @click.prevent="gotoPage(page)">{{ page }}</a>

            <a :class="{undisable: !data.hasNext}" href="#" title="后一页"
              @click.prevent="gotoPage(data.current+1)">&gt;</a>

            <a :class="{undisable: !data.hasNext}" href="#" title="尾页" @click.prevent="gotoPage(data.pages)">尾页</a>
            <div class="clear" />
          </div>
          <!-- 公共分页 结束 -->

        </div>
      </div>
      <!--课程评论 结束-->
    </section>
    <!-- /课程详情 结束 -->
  </div>

</template>


<script>
import courseApi from "@/api/course"
import commentApi from "@/api/commonedu"
import orderApi from "@/api/order"
import cookie from "js-cookie"

export default {
  /*异步调用
  //params.id意识是获取地址中id
  asyncData ({ params, error }) {
    return course.getCourseDetails(params.id).then(response => {
      //console.log("*****" + response.data.data.course.title);
      return {
        //课程相关信息
        course: response.data.data.course,
        //课程章节
        chapterList: response.data.data.chapterVoList,
      }
    })
  },*/

  data () {
    return {

      course: {    //课程详情信息封装对象
        courseId: ''
      },

      chapterList: [], //章节列表

      data: {},  //获取 评论列表

      page: 1,
      limit: 4,
      total: 10,

      comment: {   //评论封装对象
        content: '',
        courseId: '',
        teacherId: ''
      },

      isbuyCourse: false,  //用来判断是否购买过该课程/免费课程

      watchObj: {    //立即观看封装对象
        watchChapterId: '',
        watchVideoId: '',
        watchVid: ''
      },
    }
  },


  created () {
    this.course.courseId = this.$route.params.id
    this.initCourseInfo()
    this.initComment()
  },

  methods: {
    //1、获取课程详情
    initCourseInfo () {
      courseApi.getCourseDetails(this.course.courseId)
        .then(response => {
          this.course = response.data.data.course
          this.course.courseId = response.data.data.course.id
          this.chapterList = response.data.data.chapterVoList
          this.isbuyCourse = response.data.data.isbuyCourse
        })
    },

    //2、初始化评论
    initComment () {
      commentApi.getPageList(this.page, this.limit, this.course.courseId).then(response => {
        this.data = response.data.data
      })
    },

    //3、添加评论
    addComment () {
      //给评论对象赋值
      this.comment.courseId = this.course.courseId
      this.comment.teacherId = this.course.teacherId
      commentApi.addCourseComment(this.comment).then(response => {
        if (response.data.success) {
          this.$message({
            message: "评论成功",
            type: "success",
          });

          this.comment.content = ''
          this.initComment()
        }
      })
    },

    //4、评论分页列表
    gotoPage (page) {
      commentApi.getPageList(page, this.limit, this.course.courseId).then(response => {
        this.data = response.data.data  //获取 评论分页列表
      })
    },


    //5、根据课程id，调用接口方法生成订单
    createOrder () {
      //1创建订单，必须要判断是否已登录
      if (!cookie.get('guli_token')) {
        this.$message({
          type: 'error',
          message: '请先登录'
        })
        return false
      }

      //2根据课程id 创建订单
      orderApi.createOrder(this.course.courseId)
        .then(response => {
          //订单创建成功，返回订单号跳转到订单页面
          console.log("==跳转到订单页面===")
          this.$router.push({ path: '/order/' + response.data.data.orderId })
        })
    },


    //6、点击立即观看，跳转到播放页面
    watchVideo () {
      //默认打开第一章，第一节，第一个视频
      this.watchObj.watchChapterId = this.chapterList[0].id;
      this.watchObj.watchVideoId = this.chapterList[0].children[0].id;
      this.watchObj.watchVid = this.chapterList[0].children[0].videoSourceId
    },

    /* TODO 
    7、记录课程浏览人数
    watchPeopleNums () {
      courseApi.voidWatchPeopleNums(this.course.courseId)
        .then(response => {
          //啥也不做。。
          console.log("浏览数+1")
        })
    },*/








  }
};
</script>
