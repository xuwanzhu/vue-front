<template>
  <div class="bg-fa of">
    <section class="container">
      <section class="i-question">
        <div class="fl col-7">
          <section class="mr30 pt10">
            <section class="c-infor-tabTitle c-tab-title">
              <a href="javascript: void(0)" title="全部问答" onclick="submitForm(0,'type')" class="current">全部问答</a>

            </section>
            <div class="js-wrap">

              <section class="fl">
                <ol class="js-tap clearfix">
                  <li :class="{'current bg-orange':timeSort!=''}">
                    <a @click="searchByTime()" href="javascript:void(0)" title="最新">最新</a>
                  </li>

                  <li :class="{'current bg-orange':hotSort!=''}">
                    <a @click="searchByHot()" href="javascript:void(0)" title="热门">热门</a>
                  </li>

                  <li :class="{'current bg-orange':waitSort!=''}">
                    <a @click="searchByWait()" href="javascript:void(0)" title="等待回答">等待回答</a>
                  </li>
                </ol>
              </section>

            </div>
            <!-- /问题列表 开始 -->
            <div class="q-list">
              <section class="q-all-list">
                <ul>
                  <li v-for="question in questionList.items" :key="question.id">

                    <aside class="q-head-pic">
                      <img :src="question.avatar" alt="">
                      <p class="hLh30 txtOf">
                        <span class="c-999">{{question.nickname}}</span>
                      </p>
                    </aside>
                    <section class="q-txt-box">
                      <a class="replyBrowseNum" :href="'/question/'+question.id" title="">

                        <div class="browseNum">
                          <span class="r-b-num">{{question.moreAnswer}}</span>
                          <p class="hLh30">
                            <span class="c-999 f-fA">回答数</span>
                          </p>
                        </div>

                      </a>

                      <h3 class="hLh30 txtOf">
                        <em class="icon16 q-tw">&nbsp;</em>
                        <a :href="'/question/'+question.id" title="" class="fsize16 c-333 vam">{{question.title}}</a>
                      </h3>

                      <h3 class="hLh30 txtOf mt5">
                        <em class="icon16 q-hd">&nbsp;</em>
                        <span class="fsize12 c-999 vam"> <tt
                            class="c-green f-fM mr5">[问题描述]</tt>{{question.description}}</span>
                        <!-- 采纳最佳显示最佳答案内容 -->
                      </h3>

                      <div class="mt15">
                        <span class="c-ccc fl vam">{{question.gmtCreate}}</span>
                        <div class="clear" />
                      </div>
                    </section>
                  </li>
                </ul>
              </section>

              <!-- 公共分页 开始 -->
              <div class="paging">
                <!-- undisable这个class是否存在，取决于数据属性hasPrevious  current为后端返回的-->
                <a :class="{undisable: !questionList.hasPrevious}" href="#" title="首页"
                  @click.prevent="gotoPage(1)">首页</a>

                <a :class="{undisable: !questionList.hasPrevious}" href="#" title="前一页"
                  @click.prevent="gotoPage(questionList.current-1)">&lt;</a>

                <a v-for="page in questionList.pages" :key="page"
                  :class="{current: questionList.current == page, undisable: questionList.current == page}"
                  :title="'第'+page+'页'" href="#" @click.prevent="gotoPage(page)">{{ page }}</a>

                <a :class="{undisable: !questionList.hasNext}" href="#" title="后一页"
                  @click.prevent="gotoPage(questionList.current+1)">&gt;</a>

                <a :class="{undisable: !questionList.hasNext}" href="#" title="尾页"
                  @click.prevent="gotoPage(questionList.pages)">尾页</a>
                <div class="clear" />
              </div>
              <!-- 公共分页 结束 -->
            </div>
            <!-- /问题列表 结束 -->
          </section>
        </div>
        <aside class="fl col-3">
          <div class="mt30 pl10">
            <section class="pt10">
              <a href="javascript:void(0)" @click="OpenDialogQuestion()" title="我要提问" class="comm-btn c-btn-5">我要提问</a>
            </section>

            <!-- /标签云 -->
            <section class="mt30">
              <section class="c-infor-tabTitle c-tab-title">
                <a title="我的问答">我的</a>
              </section>
              <div>
                <ul id="hotQuestions">

                  <li>

                    <h4 class="hLh30 txtOf">

                      <a href="javascript: void(0)" title="问答管理" @click="questionManage()"
                        class="fsize14 c-333 ml5">问答管理
                      </a>
                    </h4>
                  </li>

                </ul>
              </div>
            </section>
            <!-- /热门问答排行 -->
          </div>
        </aside>
        <div class="clear" />
      </section>
    </section>
    <!-- /提问题 结束 -->

    <!-- 提问弹窗-->
    <!-- 添加和修改问答表单 -->
    <el-dialog :visible.sync="DialogQuestion" title="提问">

      <el-form :model="question" label-width="100px">
        <el-form-item label="标题">
          <el-input v-model="question.title" />
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="question.description" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="DialogQuestion = false">取 消</el-button>
        <el-button type="primary" @click="Save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import questionApi from '@/api/question'
import cookie from "js-cookie"

export default {

  data () {
    return {
      page: 1, //当前页
      limit: 6, //每页显示数

      questionList: {},  //问答列表


      searchObj: {}, //查询条件对象


      hotSort: "", //热门条件
      timeSort: "", //最新条件
      waitSort: "", //等待回答条件

      DialogQuestion: false, //提问弹窗，true表示打开，false关闭
      question: { //弹窗对象
        title: '',
        description: ''
      }
    }
  },

  created () {
    //获取问答列表
    this.initQuestionList()  //初始化，显示文章, 用created()会报错


    //数据回显

  },

  methods: {

    //1、查询问答列表(第一页)
    initQuestionList () {
      questionApi.getPageList(this.page, this.limit, this.searchObj).then(response => {
        debugger
        this.questionList = response.data.data
      })
    },

    //判断是添加还是修改问答
    Save () {
      //1、添加(发表)文章

      if (this.question.title.length == 0 || this.question.description.length == 0) {
        this.$message({
          type: 'error',
          message: '请完整填写信息!'
        })
      }
      else if (cookie.get('guli_token')) { //判断是否登录
        console.log("=======================" + cookie.get('guli_token'))
        questionApi.addQuestion(this.question)//将表单对象courseInfo传到后台
          .then(response => {
            //提示成功
            this.$message({
              type: 'success',
              message: '发表成功！'
            })

            this.DialogQuestion = false //关闭弹窗
            this.initQuestionList() //回显数据
          })
      } else if (!cookie.get('guli_token')) {
        this.$message({
          type: 'error',
          message: '请先登录'
        })
      }
    },

    //问答管理
    //4、文章管理
    questionManage () {
      if (!cookie.get('guli_token')) {
        this.$message({
          type: 'error',
          message: '请先登录'
        })
      } else {
        //路由跳转
        this.$router.push({ path: '/question/admin' })
      }
    },


    //5、热门查询
    searchByHot () {
      //显示选中样式
      this.hotSort = "1";
      this.timeSort = "";
      this.waitSort = "";

      this.searchObj.hotSort = this.hotSort;
      this.searchObj.timeSort = this.timeSort;
      this.searchObj.waitSort = this.waitSort;
      this.gotoPage(this.page)
    },


    //6、最新查询
    searchByTime () {
      this.hotSort = "";
      this.timeSort = "1";
      this.waitSort = "";

      this.searchObj.hotSort = this.hotSort;
      this.searchObj.timeSort = this.timeSort;
      this.searchObj.waitSort = this.waitSort;
      this.gotoPage(this.page)
    },


    //7、等待回答查询
    searchByWait () {
      this.hotSort = "";
      this.timeSort = "";
      this.waitSort = "1";

      this.searchObj.hotSort = this.hotSort;
      this.searchObj.timeSort = this.timeSort;
      this.searchObj.waitSort = this.waitSort;
      this.gotoPage(this.page)
    },

    //8、分页查询
    gotoPage (page) {
      questionApi.getPageList(page, this.limit, this.searchObj).then(response => {
        this.questionList = response.data.data
      })
    },

    //打开弹窗
    OpenDialogQuestion () {
      this.DialogQuestion = true
      this.question.title = '' //清空弹窗数据
      this.question.description = ''
    }

  }
}
</script>

<style scoped>
.c-btn-5 {
  background: #1d88e0;
  width: auto;
  display: block;
}
</style>