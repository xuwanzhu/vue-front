<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 讲师介绍 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">讲师介绍</span>
        </h2>
      </header>
      <div class="t-infor-wrap">
        <!-- 讲师基本信息 -->
        <section class="fl t-infor-box c-desc-content">
          <div class="mt20 ml20">

            <section class="t-infor-pic">
              <img :src="teacher.avatar" :alt="teacher.name">

            </section>

            <h3 class="hLh30">
              <span class="fsize24 c-333">&nbsp;&nbsp;{{ teacher.name }}&nbsp;</span>
              <span class="fsize18 c-333">{{ teacher.level===1?'高级讲师':'首席讲师' }}</span>
            </h3>

            <section class="mt10">
              <span width="400px" height="300px" class="ttt">简介：{{ teacher.intro }}</span>
            </section>

            <!--  <section class="t-infor-txt">
              <p class="mt20">资历：{{ teacher.career }}</p>
            </section>
            -->
            <div class="clear" />
          </div>
        </section>
        <div class="clear"></div>
      </div>

      <section class="mt30">
        <div>
          <header class="comm-title all-teacher-title c-course-content">
            <h2 class="fl tac">
              <span class="c-333">主讲课程</span>
            </h2>
            <section class="c-tab-title">
              <a href="javascript: void(0)">&nbsp;</a>
            </section>
          </header>

          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="courseList.length==0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关课程，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->

          <!--课程-->
          <article class="comm-course-list">
            <ul class="of">
              <li v-for="course in courseList" :key="course.id">
                <div class="cc-l-wrap">

                  <section class="course-img">
                    <div id="picture">
                      <img :src="course.cover" width="270" height="150" class="img-responsive">
                    </div>
                    <div class="cc-mask">
                      <a :href="'/course/'+course.id" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
                    </div>
                  </section>

                  <h3 class="hLh30 txtOf mt10">
                    <a :href="'/course/'+course.id" :title="course.title" target="_blank"
                      class="course-title fsize18 c-333">{{ course.title }}</a>
                  </h3>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </article>

        </div>
      </section>
    </section>
    <!-- /讲师介绍 结束 -->
  </div>
</template>
<script>
import teacher from "@/api/teacher"

export default {

  //1、异步调用，只请求一次
  //获取地址参数方法： params.id
  asyncData ({ params, error }) {
    return teacher.getTeacherInfo(params.id).then(response => {
      return {
        teacher: response.data.data.teacher,
        courseList: response.data.data.courseList
      }
    })
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

<style scoped>
.ttt {
  width: 64%;
  background: #f2f2f2;
  display: inline-block;
  padding: 10px 15px;
  overflow: hidden;
  font-size: 14px;
  color: #888;
}
</style>