<template>
  <div class="bg-fa of">
    <section class="container">
      <section class="i-question">
        <div class="fl col-7">
          <section class="mr30 pt10">
            <section class="path-wrap txtOf hLh30">
              <a href="/" title="首页" class="c-333 fsize14">首页</a>
              \
              <a href="/question" title="" class="c-333 fsize14">全部问答</a>
              \ <span class="c-333 fsize14">{{question.title}}</span>
            </section>
            <!-- /问题详情 开始 -->
            <div>
              <section class="q-infor-box">
                <div class="pr">
                  <aside class="q-head-pic">
                    <img :src="question.avatar" alt="头像">
                    <p class="hLh30 txtOf" />
                  </aside>
                  <section class="q-txt-box">

                    <h3 class="hLh30 txtOf">
                      <em class="icon16 q-tw">&nbsp;</em>
                      <span class="c-blue fsize14"> {{question.nickname}}</span>
                      <span class="c-999 fsize14">提问</span>
                    </h3>
                  </section>
                  <section class="ml50 pl10">
                    <div class="mt20">
                      <h3 class="hLh30 txtOf">
                        <span class="fsize18 c-333 vam">{{question.title}}</span>
                      </h3>
                    </div>
                    <div class="i-q-txt mt15">

                      <span class="c-999 f-fA">{{question.description}}</span>

                    </div>

                    <div class="mt20 pr10">
                      <span class="c-ccc fl vam">{{question.gmtCreate}}</span>
                      <div class="clear" />
                    </div>

                  </section>
                </div>

                <span id="questionsCommentSpan">

                  <!-- /回答列表 开始 -->
                  <div class="q-i-noter-box">
                    <section class="q-i-reply">
                      <h6 class="c-c-content c-infor-title">
                        <span>问答列表</span>
                      </h6>
                    </section>

                    <section class="lh-bj-list pr mt20 replyhtml">
                      <ul>
                        <li class="unBr">
                          <aside class="noter-pic">
                            <img width="50" height="50" class="picImg" src="~/assets/photo/customer/avatar-boy.gif">
                          </aside>
                          <div class="of">
                            <section class="n-reply-wrap">
                              <fieldset>
                                <textarea id="commentContent" name="" v-model="comment.content"
                                  placeholder="输入您要评论的文字" />
                              </fieldset>
                              <p class="of mt5 tar pl10 pr10">
                                <span class="fl "><tt class="c-red commentContentmeg" style="display: none;" /></span>
                                <input type="button" @click="addComment()" value="发表" style="width:150px;height:30px"
                                  class="lh-reply-btn">
                              </p>
                            </section>
                          </div>
                        </li>
                      </ul>
                    </section>

                    <section class="question-list lh-bj-list pr">
                      <ul class="pr10">
                        <li v-for="(comment,index) in commentData.items" v-bind:key="index">
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

                            <!-- TODO        <span class="fl">
                                          <a class="noter-dy vam" title="回复" href="javascript: void(0)"
                                onclick="queryCommentReply('3')">
                                <em class="icon18">&nbsp;
                                </em>(<span class="replyCount3">0</span>)
                              </a>

                                       <tt title="赞一下" class="noter-zan vam ml10" onclick="addPraise('3',4)">
                                <em class="icon18">&nbsp;</em>(<span class="addPraise3_4 praiseCount">1</span>)
                              </tt> 
                            </span>-->
                          </div>

                          <div class="n-reply">
                            <section class="n-reply-wrap">
                              <fieldset>
                                <textarea name="" class="commentReplyMsgContent3" />
                              </fieldset>
                              <p class="of mt5 tar pl10 pr10">
                                <span class="fl"><tt class="c-red commentReplyMsg3" /></span>
                                <a onclick="addCommentReply('3')" class="lh-reply-btn" title="回复"
                                  href="javascript: void(0)">回复</a>
                              </p>
                            </section>
                            <div class="mt10 pl10 pr10 pb10 commentReply3" />
                          </div>
                          <!-- /回复盒子 -->

                        </li>

                      </ul>
                    </section>
                    <!-- /无数据提示 开始
                    <section class="no-data-wrap">
                      <em class="icon30 no-data-ico">&nbsp;</em> <span
                        class="c-666 fsize14 ml10 vam">还没有人回答，提问者喊你去回答...</span>
                    </section>-->
                    <!-- /无数据提示 结束-->
                    <!-- 公共分页 开始 -->
                    <div>
                      <div class="paging">
                        <!-- undisable这个class是否存在，取决于数据属性hasPrevious  current为后端返回的-->
                        <a :class="{undisable: !commentData.hasPrevious}" href="#" title="首页"
                          @click.prevent="gotoPage(1)">首页</a>

                        <a :class="{undisable: !commentData.hasPrevious}" href="#" title="前一页"
                          @click.prevent="gotoPage(commentData.current-1)">&lt;</a>

                        <a v-for="page in commentData.pages" :key="page"
                          :class="{current: commentData.current == page, undisable: commentData.current == page}"
                          :title="'第'+page+'页'" href="#" @click.prevent="gotoPage(page)">{{ page }}</a>

                        <a :class="{undisable: !commentData.hasNext}" href="#" title="后一页"
                          @click.prevent="gotoPage(commentData.current+1)">&gt;</a>

                        <a :class="{undisable: !commentData.hasNext}" href="#" title="尾页"
                          @click.prevent="gotoPage(commentData.pages)">尾页</a>
                        <div class="clear" />
                      </div>
                    </div>
                    <!-- 公共分页 结束 -->
                  </div>
                </span>
              </section>
            </div>
            <!-- /问题列表 结束 -->
          </section>
        </div>
        <!-- TODO搜索 -->
        <aside class="fl col-3 articleRecommend">
          <div>
            <header class="comm-title all-article-title">
              <a href="/question">
                <el-button round class="el-icon-back">返回</el-button>
              </a>
            </header>
          </div>
        </aside>

        <div class="clear" />
      </section>
    </section>
    <!-- /提问题 结束 -->
  </div>
</template>




<script>
import questionApi from '@/api/question'
import commentApi from '@/api/questionComment'

export default {

  data () {
    return {
      page: 1, //当前页
      limit: 6, //每页显示数

      question: {},  //问答封装对象
      questionId: '',//问答id

      comment: {   //评论封装对象,后台接收属性名要和这个属性名一样
        content: '',
        questionId: ''  //文章id
      },

      commentData: {},  //获取 评论列表
    }
  },

  created () {
    //数据回显
    if (this.$route.params.id) {
      //获取id
      this.questionId = this.$route.params.id
      this.getQuestionInfo(this.questionId)
    }

    this.initComment() //初始化评论列表
  },

  methods: {

    //1、根据id查询问答信息
    getQuestionInfo () {
      questionApi.getQuestionInfo(this.questionId).then(response => {
        this.question = response.data.data.questionInfo
      })
    },

    //2、初始化评论列表
    initComment () {
      let questionID = this.$route.params.id
      commentApi.getPageList(this.page, this.limit, questionID)
        .then(response => {
          this.commentData = response.data.data
        })
    },

    //2、添加评论
    addComment () {
      //给评论对象赋值
      this.comment.questionId = this.$route.params.id
      commentApi.addQuestionComment(this.comment)
        .then(response => {
          if (response.data.success) {
            this.$message({
              message: "评论成功",
              type: "success"
            });

            this.comment.content = '' //将回复框清空
            this.initComment()  //重新初始化评论列表

          }
        })
    },


    //8、分页查询
    gotoPage (page) {
      this.page = page
      questionApi.getPageList(page, this.limit, this.searchObj).then(response => {
        this.question = response.data.data
      })
    }

  }
}
</script>
