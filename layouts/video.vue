<!--
    播放器页面的布局
-->

<template>
  <div class="guli-player">
    <div class="head">
      <a href="/" title="首页在线教育">
        <img class="logo" src="~/assets/img/logo.png" lt="在线教育">
      </a>
    </div>
    <div class="body">
      <div class="content">
        <nuxt />
      </div>
    </div>
  </div>
</template>


<script>
export default {

}
</script>


<style>
html,
body {
  height: 100%;
}
</style>

<style scoped>
.head {
  height: 50px;
  position: absolute;
  top: 12px;
  left: 0;
  width: 100%;
}
.head .logo {
  height: 50px;
  margin-left: 10px;
}
.body {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
</style>