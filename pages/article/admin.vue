<template>
  <div id="aCoursesList" class="bg-fa of">
    <section class="container">
      <section class="i-article">
        <div class="fl col-7">
          <section class="mr30">
            <header class="comm-title all-article-title">
              <h2 class="fl tac">
                <span class="c-333">我的文章</span>
              </h2>
              <section class="c-tab-title">
                <a href="javascript: void(0)">&nbsp;</a>
              </section>
            </header>
            <!-- /无数据提示 开始-->
            <section class="no-data-wrap" v-if="articleList.total==0">
              <em class="icon30 no-data-ico">&nbsp;</em>
              <span class="c-666 fsize14 ml10 vam">您还没有发表过文章哦，赶快去发表吧!</span>
            </section>

            <!-- /无数据提示 结束-->
            <article class="i-article-list">
              <!-- /文章列表 开始-->
              <ul>
                <li v-for="article in articleList.items" :key="article.id">

                  <aside class="i-article-pic">
                    <img :src="article.picture" :alt="article.picture" width="200px" height="100px">
                  </aside>

                  <h3 class="hLh30 txtOf">
                    <a :href="'/article/'+article.id" :title="article.title" class="i-art-title">{{article.title}}</a>
                  </h3>

                  <section>
                    <div id="box">
                      <p class="c-999 f-fA" v-html="article.description">{{article.description}}</p>
                    </div>

                  </section>

                  <section class="hLh30 txtOf mt5 pr10 a-list-extrainfo">
                    <span class="fr">

                      <nuxt-link :to="{path:'/article/info',query:{id:article.id}}">编辑
                      </nuxt-link>
                      &nbsp;

                      <a style='color:#f32a2a' href="javascript: void(0)" @click="deleteArticle(article.id)">删除</a>
                    </span>
                    <div class="fl">
                      <!--TODO <span>
                          <a class="noter-dy vam" title="评论" href="/article">
                            <em class="icon18">&nbsp;</em>
                            (<span>1</span>)
                          </a>
                            <tt title="赞一下" class="noter-zan vam ml10 f-fM" onclick="addPraise('23',3)">
                          <em class="icon18">&nbsp;</em>(<span class="addPraise23_3 praiseCount">1</span>)
                        </tt>
                           </span>-->

                      <section class="hLh30 txtOf mt5 pr10 a-list-extrainfo">
                        <span class="fr">
                          <tt class="c-999 f-fM">{{article.gmtCreate}}</tt>
                        </span>
                      </section>

                    </div>
                  </section>

                </li>

              </ul>
              <!-- /文章列表 结束-->
            </article>

            <!-- 公共分页 开始 -->
            <div>
              <div class="paging">
                <!-- undisable这个class是否存在，取决于数据属性hasPrevious  current为后端返回的-->
                <a :class="{undisable: !articleList.hasPrevious}" href="#" title="首页"
                  @click.prevent="gotoPage(1)">首页</a>

                <a :class="{undisable: !articleList.hasPrevious}" href="#" title="前一页"
                  @click.prevent="gotoPage(articleList.current-1)">&lt;</a>

                <a v-for="page in articleList.pages" :key="page"
                  :class="{current: articleList.current == page, undisable: articleList.current == page}"
                  :title="'第'+page+'页'" href="#" @click.prevent="gotoPage(page)">{{ page }}</a>

                <a :class="{undisable: !articleList.hasNext}" href="#" title="后一页"
                  @click.prevent="gotoPage(articleList.current+1)">&gt;</a>

                <a :class="{undisable: !articleList.hasNext}" href="#" title="尾页"
                  @click.prevent="gotoPage(articleList.pages)">尾页</a>
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
              <a href="/article">

                <el-button round class="el-icon-back">返回首页</el-button>
              </a>

            </header>

          </div>
        </aside>
        <div class="clear" />
      </section>
    </section>
    <!-- /文章列表 结束 -->
  </div>
</template>

<script>
import articleApi from '@/api/article'

export default {
  data () {
    return {

      articleList: {},  //文章列表数据

      page: 1,
      limit: 4,
      total: '' //总文章数
    }
  },

  mounted () {
    this.initGetArticleList() //初始化，显示文章, 用created()会报错
  },

  methods: {
    //1、查询后台文章list数据
    initGetArticleList () {
      articleApi.getUserPageList(this.page, this.limit)
        .then(response => {
          debugger
          this.articleList = response.data.data
        })
    },
    //2、删除文章
    deleteArticle (articleId) {
      //消息提示
      this.$confirm('是否删除该文章?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        articleApi.deleteArticle(articleId) //执行teacher.js中的删除方法
          .then(response => {//删除成功，则提示
            this.$message({
              type: 'success',
              message: '删除成功!'
            });

            //删除之后，回显数据
            this.initGetArticleList()
          })//可以没有catch，因为request.js中也会返回错误信息

      })
    },


    //3、分页跳转
    gotoPage (page) {
      this.page = page
      articleApi.getUserPageList(page, this.limit).then(response => {
        this.articleList = response.data.data
      })
    },




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

<style scoped>
.el-button--text {
  color: #f56c6c;
  background: 0 0;
  padding-left: 0;
  padding-right: 0;
}
</style>
