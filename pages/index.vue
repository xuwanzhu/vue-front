<template>
  <div>
    <!--幻灯片开始-->
    <div class="block">
      <el-carousel height="450px">
        <el-carousel-item v-for="banner in bannerList" :key="banner.id">

          <a :href="banner.linkUrl">
            <img width="100%" height="500px" :src="banner.imageUrl" :alt="banner.title" />
          </a>

        </el-carousel-item>
      </el-carousel>
    </div>
    <!--幻灯片-->

    <div id="aCoursesList">
      <!-- 网校课程 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">热门课程</span>
            </h2>
          </header>

          <div>
            <article class="comm-course-list">
              <ul class="of" id="bna">
                <li v-for="(course, index) in courseList" v-bind:key="index">
                  <div class="cc-l-wrap">
                    <section class="course-img">
                      <!-- ~/assets/photo/course/01.jpg -->
                      <div id="picture">
                        <img :src="course.cover" width="270" height="150" class="img-responsive" :alt="course.title">

                      </div>

                      <div class="cc-mask">
                        <a :href="'/course/'+course.id" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
                      </div>

                    </section>

                    <h3 class="hLh30 txtOf mt10">
                      <a href="#" :title="course.title" class="course-title fsize18 c-333">{{course.title}}</a>
                    </h3>

                    <section class="mt10 hLh20 of">
                      <span class="fr jgTag bg-green" v-if="Number(course.price) ===0">
                        <i class="c-fff fsize12 f-fA">免费</i>
                      </span>

                      <span class="fr jgTag bg-green" v-else>
                        <i class="c-fff fsize12 f-fA"> ￥{{course.price}}</i>
                      </span>

                      <span class="fl jgAttr c-ccc f-fA">
                        <i class="c-999 f-fA">{{course.buyCount}}人购买</i>
                        |
                        <i class="c-999 f-fA">共{{course.lessonNum}}课时</i>
                      </span>
                    </section>

                  </div>
                </li>

              </ul>
              <div class="clear"></div>
            </article>
            <section class="tac pt20">
              <a href="/course" title="全部课程" class="comm-btn c-btn-2">全部课程</a>
            </section>
          </div>

        </section>
      </div>
      <!-- /网校课程 结束 -->

      <!-- 网校名师 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">名师大咖</span>
            </h2>
          </header>
          <div>
            <article class="i-teacher-list">
              <ul class="of">
                <li v-for="(teacher,index) in teacherList" v-bind:key="index">
                  <section class="i-teach-wrap">

                    <div class="i-teach-pic">
                      <a :href='"/teacher/"+teacher.id' :title="teacher.name">
                        <img :alt="teacher.name" :src="teacher.avatar">
                      </a>
                    </div>

                    <div class="mt10 hLh30 txtOf tac">
                      <a :href='"/teacher/"+teacher.id' :title="teacher.name" class="fsize18 c-666">{{teacher.name}}</a>
                    </div>

                    <div class="hLh30 txtOf tac">
                      <span class="fsize14 c-999">{{teacher.intro}}</span>
                    </div>

                    <div class="mt15 i-q-txt">
                      <p class="c-999 f-fA">{{teacher.career}}</p>
                    </div>

                  </section>
                </li>

              </ul>
              <div class="clear"></div>
            </article>
            <section class="tac pt20">
              <a href="/teacher" title="全部讲师" class="comm-btn c-btn-2">全部讲师</a>
            </section>
          </div>
        </section>
      </div>
      <!-- /网校名师 结束 -->
    </div>
  </div>
</template>
<script>
import index from '@/api/index'
import banner from "@/api/banner"

export default {
  data () {
    return {
      swiperOption: {
        //配置分页
        pagination: {
          el: '.swiper-pagination'//分页的dom节点
        },
        //配置导航
        navigation: {
          nextEl: '.swiper-button-next',//下一页dom节点
          prevEl: '.swiper-button-prev'//前一页dom节点
        }
      },
      //banner数组
      bannerList: [],
      //名师大咖
      teacherList: {},
      //热门课程
      courseList: {}

    }
  },
  created () {
    this.initDataBanner()
    this.initDataObj()
  },
  methods: {
    //1、查询banner数据
    initDataBanner () {
      banner.getListBanner().then(response => {
        this.bannerList = response.data.data.bannerList
      })
    },

    //2、获取热门课程、名师大咖信息
    initDataObj () {
      index.getIndex().then(response => {
        this.teacherList = response.data.data.teacherList
        this.courseList = response.data.data.courseList
      })
    }


  }
}
</script>


<style scoped>
#picture {
  width: 300px;
  height: 150px;
  display: flex;
}
#picture div {
  flex: 1;
}
</style>

<style >
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #d3dce6;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

