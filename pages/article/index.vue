<template>
  <div id="aCoursesList" class="bg-fa of">
    <section class="container">
      <section class="i-article">
        <div class="fl col-7">
          <section class="mr30">
            <header class="comm-title all-article-title">
              <h2 class="fl tac">
                <span class="c-333">文章</span>
              </h2>
              <section class="c-tab-title">
                <a href="javascript: void(0)">&nbsp;</a>
              </section>
            </header>
            <!-- /无数据提示 开始-->
            <section class="no-data-wrap" v-if="articleList.total==0">
              <em class="icon30 no-data-ico">&nbsp;</em>
              <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
            </section>
            <!-- /无数据提示 结束-->

            <article class="i-article-list">
              <!-- /文章列表 开始-->
              <ul>

                <li v-for="article in articleList.items" :key="article.id">

                  <aside class="i-article-pic">
                    <img :src="article.picture" :alt="article.title" width="200px" height="100px">
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
                      <tt class="c-999 f-fM"
                        style="margin-top:0px;margin-bottom:29px;padding:0px;line-height:28px;font-family:宋体, Arial, sans-serif;font-size:15.9996px;white-space:normal;text-indent:2em;background-color:#FFFFFF;">{{article.gmtCreate}}</tt>
                    </span>
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

        <!-- 好文推荐 -->
        <aside class="fl col-3 articleRecommend">
          <div>

            <header class="comm-title all-article-title">

              <h2 class="fl tac">
                <span class="c-333">我的</span>
              </h2>

              <section class="c-tab-title">
                <a href="javascript: void(0)">&nbsp;</a>
              </section>
            </header>

            <section class="i-article-list r-art-wrap">
              <ul>

                <li class="lt2">
                  <h3 class="hLh30 txtOf">
                    <a href="javascript: void(0)" title="发表文章" @click="publishArticle()">发表文章</a>
                  </h3>
                </li>

                <li>
                  <h3 class="hLh30 txtOf">
                    <a href="javascript: void(0)" title="文章管理" @click="articleManage()">文章管理</a>
                  </h3>
                </li>

              </ul>
            </section>
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
import cookie from "js-cookie"

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
      articleApi.getPageList(this.page, this.limit)
        .then(response => {
          this.articleList = response.data.data
        })
    },


    //2、分页跳转
    gotoPage (page) {
      this.page = page
      articleApi.getPageList(page, this.limit).then(response => {
        this.articleList = response.data.data
      })
    },

    //3、发表文章
    publishArticle () {
      if (!cookie.get('guli_token')) {
        this.$message({
          type: 'error',
          message: '请先登录'
        })
      } else {
        //路由跳转
        this.$router.push({ path: '/article/info' })
      }
    },

    //4、文章管理
    articleManage () {
      if (!cookie.get('guli_token')) {
        this.$message({
          type: 'error',
          message: '请先登录'
        })
      } else {
        //路由跳转
        this.$router.push({ path: '/article/admin' })
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
  width: 620px;
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
