<template>
  <div class="bg-fa of">

    <section class="container">
      <section class="i-article">

        <div class="fl col-7">
          <section class="mr30">

            <section class="path-wrap txtOf hLh30">
              <a href="/" title="首页" class="c-333 fsize14">首页</a>
              \
              <a href="/article" title="" class="c-333 fsize14">文章列表</a>
              \ <span class="c-333 fsize14">{{article.title}}</span>
            </section>

            <article class="article-infor-box pr20">
              <h3 class="hLh30 txtOf">
                <span class="i-art-title">{{article.title}}</span>
              </h3>
              <section class="hLh30 txtOf mt5 pb20 mreadnum">

                <div class="fl pt3">
                  <tt class="c-999 f-fM">
                    {{article.gmtCreate}}
                  </tt>
                </div>
              </section>

              <div id="art-infor-body">
                <!-- <p>{{article.description}}</p>  -->

                <!-- 获取解析后端数据库中的html代码   富文本编辑器-->
                <p v-html="article.description">{{article.description}}</p>
                <!--   article.description数据为：  <h2>不要对我说再见&nbsp;&nbsp;一句再见&nbsp;就结束这一切</h2><h2>能否不要说再见&nbsp;你的再见&nbsp;说-->

                <!--      <p
                  style="margin-top:0px;margin-bottom:29px;padding:0px;line-height:28px;font-family:宋体, Arial, sans-serif;font-size:15.9996px;white-space:normal;text-indent:2em;background-color:#FFFFFF;">
                  2、每道题涉及解题的同义替换
                </p>-->

                <img :src="article.picture" :alt="article.picture" width="300px" height="150px">

                <section class="hLh30 txtOf mt5 pr10 a-list-extrainfo">
                  <span class="fr">
                    <tt class="c-999 f-fM">作者：{{article.nickname}}</tt>
                  </span>
                </section>
              </div>

            </article>

            <!-- 文章评论 开始 -->
            <div class="mt30 pr20 mb50 commentHtml">
              <div>
                <h6 id="i-art-comment" class="c-c-content c-infor-title">
                  <span class="commentTitle">发表你的看法</span>
                </h6>

                <section class="lh-bj-list pr mt20 replyhtml">
                  <ul>
                    <li class="unBr">
                      <aside class="noter-pic">
                        <img width="50" height="50" class="picImg" src="~/assets/photo/customer/avatar-boy.gif">
                      </aside>
                      <div class="of">
                        <section class="n-reply-wrap">
                          <fieldset>
                            <textarea id="commentContent" name="" v-model="comment.content" placeholder="输入您要评论的文字" />
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

                <section class="">
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
                        </div>
                      </li>

                    </ul>
                  </section>
                </section>

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
            </div>
          </section>
        </div>
        <!-- TODO搜索和返回 -->
        <aside class="fl col-3 articleRecommend">
          <div>
            <header class="comm-title all-article-title">

              <!--TODO  <el-button type="primary" icon="el-icon-search">搜索</el-button> -->
              <a href="/article">

                <el-button round class="el-icon-back">返回</el-button>
              </a>

            </header>

          </div>
        </aside>

      </section>
    </section>
    <!-- /文章列表 结束 -->
  </div>

</template>


<script>
import articleApi from '@/api/article'
import commentApi from '@/api/articleComment'

export default {

  data () {
    return {

      article: { //文章封装对象
        articleId: ''
      },

      page: 1,
      limit: 5,
      total: 10,


      comment: {   //评论封装对象,后台接收属性名要和这个属性名一样
        content: '',
        articleId: ''  //文章id
      },

      commentData: {},  //获取 评论列表

    }
  },

  created () {
    this.article.articleId = this.$route.params.id
    this.initGetArticle(this.article.articleId) //初始化，显示文章

    this.initComment()
  },

  methods: {
    //1、查询后台文章数据
    initGetArticle (articleId) {
      articleApi.getArticleInfo(articleId)
        .then(response => {
          this.article = response.data.data.articleInfo
        })
    },

    //2、初始化评论列表
    initComment () {
      let articleID = this.$route.params.id
      commentApi.getPageList(this.page, this.limit, articleID)
        .then(response => {
          this.commentData = response.data.data
        })
    },

    //2、添加评论
    addComment () {
      //给评论对象赋值
      this.comment.articleId = this.$route.params.id
      commentApi.addArticleComment(this.comment)
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


    //3、分页跳转
    gotoPage (page) {
      this.page = page
      let articleID = this.$route.params.id
      commentApi.getPageList(page, this.limit, articleID).then(response => {
        this.commentData = response.data.data
      })
    }

  }
}
</script>



