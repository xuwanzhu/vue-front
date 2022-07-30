<template>
  <div id="aCoursesList" class="bg-fa of">
    <section class="container">
      <section class="i-article">
        <div class="fl col-7">
          <section class="mr30">
            <header class="comm-title all-article-title">
              <h2 class="fl tac">
                <span class="c-333">我的问答</span>
              </h2>
              <section class="c-tab-title">
                <a href="javascript: void(0)">&nbsp;</a>
              </section>
            </header>
            <!-- /无数据提示 开始-->
            <section class="no-data-wrap" v-if="questionList.total==0">
              <em class="icon30 no-data-ico">&nbsp;</em>
              <span class="c-666 fsize14 ml10 vam">您还没有提问过问答哦，赶快去提问吧!</span>
            </section>

            <!-- /无数据提示 结束-->
            <article class="">
              <!-- /文章列表 开始-->
              <ul>
                <li v-for="(question,index) in questionList.items" :key="question.id">

                  <h3 class="hLh30 txtOf">
                    <a :href="'/question/'+question.id" class="i-art-title">{{index+1}}、{{question.title}}</a>
                  </h3>

                  <section>
                    <div id="box">
                      <p class="c-999 f-fA">问题描述：{{question.description}}</p>
                    </div>

                  </section>

                  <section class="hLh30 txtOf mt5 pr10 a-list-extrainfo">
                    <span class="fr">
                      <a style='color:#000000' href="javascript:void(0)" @click="OpenDialogQuestion(question.id)">编辑</a>
                      &nbsp;

                      <a style='color:#f32a2a' href="javascript: void(0)" @click="deleteQuestion(question.id)">删除</a>
                    </span>

                    <div class="fl">
                      <section class="hLh30 txtOf mt5 pr10 a-list-extrainfo">
                        <span class="fr">
                          <tt class="c-999 f-fM">{{question.gmtCreate}}</tt>
                        </span>
                      </section>
                    </div>

                  </section>
                  <br />
                </li>

              </ul>
              <!-- /文章列表 结束-->
            </article>

            <!-- 公共分页 开始 -->
            <div>
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
            </div>
            <!-- 公共分页 结束 -->

          </section>
        </div>

        <!-- TODO搜索 -->
        <aside class="fl col-3 articleRecommend">
          <div>
            <header class="comm-title all-article-title">

              <!--TODO  <el-button type="primary" icon="el-icon-search">搜索</el-button> -->
              <a href="/question">

                <el-button round class="el-icon-back">返回首页</el-button>
              </a>

            </header>

          </div>
        </aside>
        <div class="clear" />
      </section>
    </section>
    <!-- /文章列表 结束 -->

    <!--弹窗-->
    <!-- 修改问答表单 -->
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

      question: { //弹窗对象
        title: '',
        description: ''
      },

      questionList: {},  //文章列表数据

      page: 1,
      limit: 4,
      total: '', //总文章数

      DialogQuestion: false //编辑的弹窗，false表示关闭
    }
  },

  mounted () {
    this.initQuestionList() //初始化，显示文章, 用created()会报错
  },

  methods: {
    //1、查询后台文章list数据
    initQuestionList () {
      questionApi.getUserPageList(this.page, this.limit, this.searchObj).then(response => {
        debugger
        this.questionList = response.data.data
      })
    },
    //2、删除文章
    deleteQuestion (questionId) {
      //消息提示
      this.$confirm('是否删除该文章?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        questionApi.deleteQuestion(questionId) //执行teacher.js中的删除方法
          .then(response => {//删除成功，则提示
            this.$message({
              type: 'success',
              message: '删除成功!'
            });

            //删除之后，回显数据
            this.initQuestionList()
          })//可以没有catch，因为request.js中也会返回错误信息

      })
    },


    //3、分页跳转
    gotoPage (page) {
      this.page = page
      questionApi.getUserPageList(page, this.limit)
        .then(response => {
          this.questionList = response.data.data
        })
    },

    //4、打开编辑弹窗
    OpenDialogQuestion (questionID) {
      this.DialogQuestion = true
      questionApi.getQuestionInfo(questionID)
        .then(response => {

          this.question = response.data.data.questionInfo
        })
    },

    //修改问答
    Save () {
      if (this.question.title.length == 0 || this.question.description.length == 0) {
        this.$message({
          type: 'error',
          message: '请完整填写信息!'
        })
      }
      else if (cookie.get('guli_token')) { //判断是否登录
        //console.log("=======================" + cookie.get('guli_token'))
        questionApi.updateQuestion(this.question)//将表单对象courseInfo传到后台
          .then(response => {
            //提示成功
            this.$message({
              type: 'success',
              message: '修改成功！'
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
    }

  }
}
</script>

<style scoped>
#picture {
  width: 50px;
  height: 50px;
  display: flex;
}
#picture div {
  flex: 1;
}
</style>

<style scoped>
#box p {
  /* 设置宽高可以解决显示两个省略号的问题*/
  width: 500px;
  height: 20px;

  /* 1，强制一行显示 */
  white-space: wrap;

  /* 2.隐藏溢出的部分 */
  overflow: hidden;

  /* 3.隐藏的部分省略号显示 */
  text-overflow: ellipsis;

  display: -webkit-box;

  -webkit-box-orient: vertical;

  -webkit-line-clamp: 1; /*行数*/
}
</style>



