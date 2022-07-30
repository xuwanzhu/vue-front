<!--
课程支付页面
-->

<template>
  <div class="cart py-container">

    <!--主内容-->
    <div class="checkout py-container pay">
      <div class="checkout-tit">
        <h4 class="fl tit-txt">
          <span class="appp"> 订单提交成功，请您及时付款！订单号：{{payObj.out_trade_no}}
            <em class="bbb">应付金额：</em>
            <em class="orange money">￥{{payObj.total_fee}}</em>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            <a :href="'/order/'+payObj.out_trade_no" id="pic">返回订单页</a>

          </span>
          <!--<p class="success-info">订单提交成功，请您及时付款！订单号：{{payObj.out_trade_no}}</p>-->

        </h4>

        <!--  <span class="fr">
         <em class="sui-lead">应付金额：</em>
          <em class="orange money">￥{{payObj.total_fee}}</em> 
        </span>-->

        <div class="clearfix"></div>
      </div>

      <div class="checkout-steps">
        <div class="fl weixin">微信支付</div>

        <div class="fl sao">
          <p class="red">请使用微信扫一扫</p>
          <div class="fl code">
            <!-- <img id="qrious" src="~/assets/img/erweima.png" alt=""> -->
            <!-- <qriously value="weixin://wxpay/bizpayurl?pr=R7tnDpZ":size="338"/> -->
            <qriously :value="payObj.code_url" :size="300" />
            <div class="saosao">
              <p>请使用微信扫一扫</p>
              <p>扫描二维码支付</p>
            </div>
          </div>
        </div>

        <div class="clearfix"></div>
        <!-- <p><a href="pay.html" target="_blank">> 其他支付方式</a></p> -->
      </div>

    </div>
  </div>
</template>


<script>
import orderApi from '@/api/order'

export default {

  //1、根据订单id生成微信支付二维码
  asyncData ({ params, error }) {
    return orderApi.createOrderNo(params.pid).then(response => {
      return {
        payObj: response.data.data  //payObj为支付页封装对象
      }
    })
  },


  data () {
    return {
      timer: null, // 用来清除定时器，防止定时器一直循环执行

      initQCode: '',
      timer1: ''
    }
  },


  mounted () {//在页面渲染之后执行
    //2、定时器，每隔三秒，去查询一次支付状态，判断订单是否支付
    this.timer1 = setInterval(() => {
      this.queryPayStatus(this.payObj.out_trade_no) //调用方法
    }, 3000); //3秒
  },


  methods: {
    //3、查询支付状态的方法
    queryPayStatus (out_trade_no) {  //out_trade_no :订单号
      orderApi.queryPayStatus(out_trade_no).then(response => {
        if (response.data.success) {
          //1如果支付成功，清除定时器
          clearInterval(this.timer1)

          this.$message({
            type: 'success',
            message: '支付成功!'
          })

          //2跳转到课程详情页面观看视频
          this.$router.push({ path: '/course/' + this.payObj.course_id })
        }
      })
    }
  }
}
</script>

<style scoped>
.appp {
  margin-left: 180px;

  font-size: 18px;
  display: block;
}
</style>

<style scoped>
.bbb {
  margin-left: 350px;

  font-size: 18px;
}
</style>

<style scoped>
#pic {
  color: rgb(79, 74, 74);
}
</style>