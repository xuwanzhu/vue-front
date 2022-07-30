<template>
  <div class="main">

    <div class="title">
      <a class="active" href="/login">登录</a>
      <span>·</span>
      <a href="/register">注册</a>
    </div>

    <div class="sign-up-container">
      <el-form ref="userForm" :model="user">

        <el-form-item class="input-prepend restyle" prop="mobile"
          :rules="[{required: true, message: '请输入手机号码', trigger: 'blur' },{validator:checkPhone, trigger: 'blur'}]">
          <div>
            <el-input type="text" placeholder="手机号" v-model="user.mobile" />
            <i class="iconfont icon-phone" />
          </div>
        </el-form-item>

        <el-form-item class="input-prepend" prop="password"
          :rules="[{ required:true, message: '请输入密码', trigger: 'blur' }]">
          <div>
            <el-input type="password" placeholder="密码" v-model="user.password" />
            <i class="iconfont icon-password" />
          </div>
        </el-form-item>

        <div class="btn">
          <input type="button" class="sign-in-button" value="登录" @click="submitLogin()">
        </div>

      </el-form>
      <!-- 更多登录方式 -->
      <div class="more-sign">
        <h6>社交帐号登录</h6>
        <ul>
          <li><a id="weixin" class="weixin" target="_blank" href="http://localhost:8160/api/ucenter/wx/login">
              <i class="iconfont icon-weixin" /></a>
          </li>
          <!--<li><a id="qq" class="qq" target="_blank" href="#"><i class="iconfonticon-qq" /></a>
          </li>-->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import '~/assets/css/sign.css'
import '~/assets/css/iconfont.css'
import cookie from 'js-cookie'
import loginApi from '@/api/login'


export default {
  layout: 'sign', //登录页面的 布局
  data () {
    return {
      user: { //登录对象
        mobile: '',
        password: ''
      },
      loginInfo: {} //登录后的用户数据 显示
    }
  },

  methods: {
    submitLogin () {
      //第一步  调用接口进行登录，返回token字符串
      loginApi.submitLogin(this.user).then(response => {
        if (response.data.success) {
          //第二步  获取token字符串放到cookie里面 ，这个放cookie是存token信息，第五步放cookie是存用户信息
          //把token存在cookie中、也可以放在localStorage中
          //第一个参数cookie名称，第二个参数的值，第三个参数作用范围
          cookie.set('guli_token', response.data.data.token, { domain: 'localhost' })


          //第三步在request.js中，将用户token信息放到页面headers中
          debugger

          loginApi.getLoginInfo().then(response => {//第四步 调用接口，后端根据页面request对象获取头信息，然后获取用户信息，为了首页面显示用户信息
            debugger
            this.loginInfo = JSON.stringify(response.data.data.userInfo) //将 JavaScript 对象转换为 JSON 字符串

            //第五步（第四步）、获取完整的用户数据，将用户信息再次放到cookie里面，用于用户信息显示(此时还没显示，第五步才显示)
            cookie.set('guli_ucenter', this.loginInfo, { domain: 'localhost' })
            //跳转页面，也可以用路由跳转
            window.location.href = "/";
          })

        }

      })
    },

    //判断输入的手机号码格式是否正确
    checkPhone (rule, value, callback) {
      //debugger
      if (!(/^1[34578]\d{9}$/.test(value))) {
        return callback(new Error('手机号码格式不正确'))
      }
      return callback()
    }
  }
}
</script>


<style>
.el-form-item__error {
  z-index: 9999999;
}
</style>