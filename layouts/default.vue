<template>
  <div class="in-wrap">
    <!-- 公共头引入 -->
    <header id="header">
      <section class="container">
        <h1 id="logo">
          <a href="/" title="在线教育网站">
            <img src="~/assets/img/logo.png" width="100%" alt="在线教育网站">
          </a>
        </h1>
        <div class="h-r-nsl">
          <ul class="nav">
            <nuxt-link to="/" tag="li" active-class="current" exact>
              <a>首页</a>
            </nuxt-link>
            <nuxt-link to="/course" tag="li" active-class="current">
              <a>课程</a>
            </nuxt-link>
            <nuxt-link to="/teacher" tag="li" active-class="current">
              <a>名师</a>
            </nuxt-link>
            <nuxt-link to="/article" tag="li" active-class="current">
              <a>文章</a>
            </nuxt-link>
            <nuxt-link to="/question" tag="li" active-class="current">
              <a>问答</a>
            </nuxt-link>
          </ul>

          <!-- / nav -->
          <ul class="h-r-login">
            <!-- 如果id不存在，则为没有登录 -->
            <li v-if="!loginInfo.id" id="no-login">
              <a href="/login" title="登录">
                <em class="icon18 login-icon">&nbsp;</em>
                <span class="vam ml5">登录</span>
              </a>
              |
              <a href="/register" title="注册">
                <span class="vam ml5">注册</span>
              </a>
            </li>

            <li v-if="loginInfo.id" id="is-login-one" class="mr10">
              <a id="headerMsgCountId" @click="dialogOrderVisible = true" title="订单">
                <em class="el-icon-shopping-cart-2" style="font-size: 35px"></em>
              </a>
            </li>

            <!--打开编辑个人信息弹窗-->
            <li v-if="loginInfo.id" id="is-login-two" class="h-r-user">
              <a @click="dialogUserVisible = true" title>
                <img :src="loginInfo.avatar" width="30" height="30" class="vam picImg" alt>
                <span id="userName" class="vam disIb">{{ loginInfo.nickName }}</span>
              </a>
              <a href="javascript:void(0);" title="退出" @click="logout()" class="ml5">退出</a>
            </li>

            <!-- /未登录显示第1 li；登录后显示第2，3 li -->
          </ul>

          <aside class="h-r-search">

            <label class="h-r-s-box">
              <input type="text" placeholder="输入你想学的课程" v-model="courseName" value>

              <nuxt-link :to="{path: '/course', query: {courseName: courseName}}">
                <button type="submit" class="s-btn">
                  <em class="icon18">&nbsp;</em>
                </button>
              </nuxt-link>

            </label>

          </aside>

        </div>
        <aside class="mw-nav-btn">
          <div class="mw-nav-icon"></div>
        </aside>
        <div class="clear"></div>
      </section>

    </header>
    <!-- /公共头引入 -->

    <nuxt />

    <!--  用户信息修改框开始  -->
    <el-dialog :before-close="beforeClose" title="个人信息" :visible.sync="dialogUserVisible" width="40%" height="30%">
      <el-form :model="loginInfo">

        <el-form-item label="昵称" label-width="75px">
          <el-input v-model="loginInfo.nickname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="签名" label-width="75px">
          <el-input v-model="loginInfo.sign" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="修改密码" label-width="75px">
          <el-input type="password" v-model="loginInfo.password" autocomplete="off">
          </el-input>
        </el-form-item>

        <el-form-item label="上传头像" label-width="75px">
          <el-upload class="avatar-uploader" :action="BASE_API+'/eduoss/fileoss/upload'" :show-file-list="false"
            :on-success="handleAvatarSuccess" accept="image/*">
            <img v-if="avatar" :src="avatar" width="200px" height="200px" alt="">
            <img v-else-if="loginInfo.avatar" :src="loginInfo.avatar" width="200px" height="200px" alt="">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button round @click="dialogUserVisible = false">取消</el-button>
        <el-button type="primary" round @click="saveUserInfo">确定</el-button>
      </div>

    </el-dialog>
    <!--  用户信息修改框结束  -->

    <!--  订单列表弹窗开始  -->
    <el-dialog title="我的订单" :visible.sync="dialogOrderVisible" width="60%" height="30%">
      <!-- 数据表格 -->
      <el-table :data="orderList" border fit highlight-current-row>
        <el-table-column label="序号" width="73" align="center">
          <template slot-scope="scope">
            <!-- 显示记录的序号 -->
            {{ (page - 1) * limit + scope.$index + 1 }}
            <!-- 这里的scope对象表示这个表格对象 -->
          </template>
        </el-table-column>

        <el-table-column prop="courseTitle" label="课程名" width="203" />
        <el-table-column prop="orderNo" label="订单号" width="200" />
        <el-table-column prop="totalFee" label="价格" width="103" />
        <el-table-column label="支付状态" width="103" align="center">
          <template slot-scope="scope">
            {{ scope.row.status===1?'成功':'失败' }}
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">

          <template slot-scope="scope">
            <router-link :to="'/course/'+scope.row.courseId">
              <el-button type="primary" round size="mini" icon="el-icon-view" @click="clorseWindown">查看</el-button>
            </router-link>

            <el-button type="danger" round size="mini" icon="el-icon-delete" @click="deleteOrder(scope.row.id)">删除
            </el-button>

          </template>
        </el-table-column>

      </el-table>

      <!-- 分页条 -->
      <el-pagination :current-page="page" :page-size="limit" :total="total" style="padding: 30px 0; text-align: center;"
        layout="total, prev, pager, next, jumper" @current-change="gotoPage" />

    </el-dialog>
    <!--  订单列表弹窗结束  -->

    <!--/**.vue中的内容会插在<nuxt/>内
    <nuxt />
    -->

    <!-- 公共底引入 -->
    <footer id="footer">
      <section class="container">
        <div class>
          <h4 class="hLh30">
            <span class="fsize18 f-fM c-999">友情链接</span>
          </h4>
          <ul class="of flink-list">
            <li>
              <a href="https://wanzhu.club/" title="个人博客" target="_blank">个人博客</a>
            </li>
          </ul>
          <div class="clear"></div>
        </div>
        <div class="b-foot">
          <section class="fl col-7">
            <section class="mr20">
              <section class="b-f-link">
                <a href="#" title="关于我们" target="_blank">关于我们</a>|
                <a href="#" title="联系我们" target="_blank">联系我们</a>|
                <a href="#" title="帮助中心" target="_blank">帮助中心</a>|
                <a href="#" title="资源下载" target="_blank">资源下载</a>|
                <span>服务热线：1577771413(广西)</span>
                <span>Email：1792613238@qq.com</span>
              </section>
              <section class="b-f-link mt10">
                <span>©2022课程版权均归徐万竹先生所有 桂ICP备2022002102号</span>
              </section>
            </section>
          </section>
          <aside class="fl col-3 tac mt15">
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wx-icon.png" alt>
              </span>
            </section>
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wb-icon.png" alt>
              </span>
            </section>
          </aside>
          <div class="clear"></div>
        </div>
      </section>
    </footer>
    <!-- /公共底结束 -->
  </div>
</template>


<script>
import '~/assets/css/reset.css'
import '~/assets/css/theme.css'
import '~/assets/css/global.css'
import '~/assets/css/web.css'
import '~/assets/css/base.css'
import '~/assets/css/activity_tab.css'
import '~/assets/css/bottom_rec.css'
import '~/assets/css/nice_select.css'
import '~/assets/css/order.css'
import '~/assets/css/swiper-3.3.1.min.css'
import "~/assets/css/pages-weixinpay.css"

import cookie from 'js-cookie'
import loginApi from '@/api/login'
import orderApi from '@/api/order'

export default {

  data () {
    return {
      token: '',
      loginInfo: {
        id: '',
        age: '',
        avatar: '',
        sign: '', //用户个性签名
        nickname: '',
        sex: ''
      },
      avatar: '',
      dialogUserVisible: false, //false表示关闭弹窗

      dialogOrderVisible: false, //订单弹窗

      BASE_API: 'http://localhost:8222', // 接口API地址，铤而走险
      courseName: '', //搜索的课程名

      orderList: [], //订单列表
      page: 1, //page 当前页 它会跟上面的分页进行绑定,所以gotoPage无需用this
      limit: 5, //每页大小 也会绑定
      total: 0 //总记录数 也会绑定
    }
  },

  created () {
    //1、微信扫码登录或注册。此时首页路径中会有token的值。通过this.$route.query.token可获取。
    this.token = this.$route.query.token
    if (this.token) {//如果微信扫描路径有token存在，则执行方法
      this.wxLogin()
    }
    this.showInfo()

  },

  mounted () {
    if (cookie.get('guli_ucenter')) { //如果用户已登录,账号密码登录或者微信扫码登录
      this.getOrderList()

    }
  },


  methods: {


    //1、创建方法，从cookie中获取并显示用户信息
    showInfo () {
      //从cookie获取用户信息
      var user = cookie.get('guli_ucenter') //获取到的是String类型的数据，不是json数据
      if (user) {
        this.loginInfo = JSON.parse(user) //把json数据转换成字符串对象（js对象）
      }
    },



    //2、微信扫码登录显示的方法
    wxLogin () {
      if (this.token == '') return
      //1、把token存在cookie里面、也可以放在localStorage中
      cookie.set('guli_token', this.token, { domain: 'localhost' })
      cookie.set('guli_ucenter', '', { domain: 'localhost' })
      //2、登录成功根据token获取用户信息
      loginApi.getLoginInfo().then(response => {
        this.loginInfo = response.data.data.userInfo  //赋值
        this.JSONLoginInfo = JSON.stringify(response.data.data.userInfo) //把js对象转换此json存到cookie中
        //将用户信息存到cookie中
        cookie.set('guli_ucenter', this.JSONLoginInfo, { domain: 'localhost' })
      })
    },

    //退出首页
    logout () {
      //debugger,清空
      cookie.set('guli_ucenter', "", { domain: 'localhost' })
      cookie.set('guli_token', "", { domain: 'localhost' })
      //跳转页面
      window.location.href = "/"
    },




    // 上传头像成功后
    handleAvatarSuccess (response) {
      this.avatar = response.data.url //回显
    },
    // 用户修改框关闭前
    beforeClose () {
      this.dialogUserVisible = false
      this.showInfo()
    },
    // 确定保存
    saveUserInfo () {
      if (this.avatar) {
        this.loginInfo.avatar = this.avatar
      }
      loginApi.updateUser(this.loginInfo)
        .then(() => {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.dialogUserVisible = false
          var JSONLoginInfo = JSON.stringify(this.loginInfo) //jide把js对象转换此json存到cookie中
          cookie.set('guli_ucenter', JSONLoginInfo) //把修改后的信息重新放到cookie中
          this.showInfo()
        })
    },




    //1、获取订单列表
    getOrderList (page = 1) {
      this.page = page;
      orderApi.pageFrontOrderList(this.page, this.limit)
        .then(response => {
          this.orderList = response.data.data.items
          this.total = response.data.data.total
        });
    },

    //2、删除订单信息

    deleteOrder (orderId) {
      //消息提示
      console.log("==================orderid==>>" + orderId)
      this.$confirm('是否删除该文章?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        orderApi.deleteOrder(orderId)
          .then(response => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            //删除之后，回显数据
            this.getOrderList()
          })
      })
    },

    //3、关闭弹窗
    clorseWindown () {
      this.dialogOrderVisible = false
    },


    //4、分页跳转
    gotoPage (page) {
      orderApi.pageFrontOrderList(page, this.limit)
        .then(response => {
          this.orderList = response.data.data.items
        })
    }



  }

};
</script>

