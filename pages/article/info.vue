<template>
  <div class="app-container">

    <h1 style="text-align: center;font-size: 18px;">发布新文章</h1>

    <el-form label-width="120px">
      <el-form-item label="文章标题">
        <el-input v-model="article.title" placeholder=" 示例：文章标题"></el-input>
      </el-form-item>

      <!-- 课程封面-->
      <el-form-item label="添加封面">
        <el-upload class="avatar-uploader" :action="BASE_API+'/eduoss/fileoss/upload'" :show-file-list="false"
          :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="article.picture" :src="article.picture" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <!--    <el-form-item label="文章内容">
        <el-input type="textarea" :rows="9" placeholder="请输入内容" v-model="article.description">
        </el-input>
      </el-form-item>
      -->

      <!-- TODO 课程简介 富文本编辑器-->
      <el-form-item label="文章内容">
        <div id="article_content"></div>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="SaveOrUpdate">发表文章</el-button>
        <el-button :disabled="saveBtnDisabled" type="" @click="Savetest">保存草稿</el-button>
      </el-form-item>
      <br />
      <br />
      <br />
      <br />
      <br />

    </el-form>
  </div>

</template>


<script>
import articleApi from '@/api/article'
import cookie from "js-cookie"



export default {


  editor: null,

  data () {
    return {





      saveBtnDisabled: false, // 保存按钮是否禁用

      article: {
        title: '',
        description: '',
        picture: '' //oss中返回的地址
      },

      articleId: '', //文章id,返回上一步时用来（回显数据）

      BASE_API: 'http://localhost:8222', // 接口API地址，铤而走险
      //BASE_API: service.baseURL, // TODO 接口API地址？？获取方法？？

    }
  },
  created () {
    //修改课程初始化
    //根据课程id回显数据
    //获取网址中的id,   为啥是id?因为路由中的参数就名为id

    if (this.$route.query && this.$route.query.id) {

      //获取id
      this.articleId = this.$route.query.id

      //根据文章id做数据回显
      this.getArticleInfo(this.articleId)

    }

  },


  mounted () {
    this.int_wangeditor();

  },

  methods: {
    int_wangeditor () {
      this.editor = this.$wangeditor('#article_content')
      // 自定义菜单配置
      this.editor.config.menus = [
        //'head', // 标题
        'bold', // 粗体
        //'fontSize', // 字号
        // 'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        // 'image', // 插入图片
        'table', // 表格
        'code', // 插入代码
        'undo', // 撤销
        'redo' // 重复
      ]
      /*配置图片的服务器地址
      editor.config.uploadImgServer = this.$store.state.upload_img_url;*/
      //编辑器里面的内容，监听内容有变化就修改要提交的值
      this.editor.config.onchange = (html) => {
        this.article.description = html
      }
      //创建编辑器
      this.editor.create()
    },

    createData () { // 新建或者编辑回显
      this.editor.txt.html(this.article.description) // 向富文本中插入回显的数据
    },


    //根据文章id做数据回显
    getArticleInfo (articleId) {
      articleApi.getArticleInfo(articleId)
        .then(response => {
          this.article = response.data.data.articleInfo

          this.createData()
        })
    },


    //判断是添加还是修改课程
    SaveOrUpdate () {
      //1、添加(发表)文章

      if (this.article.title.length == 0 || this.article.picture.length == 0 || this.article.description.length == 0) {
        this.$message({
          type: 'error',
          message: '请完整填写信息!'
        })
      }
      else if (this.articleId.length == 0 && cookie.get('guli_token')) { //this.articleId.length == 0 ，表示articleId不存在
        this.article.isPublish = 1 //设为发表状态
        articleApi.addArticle(this.article)//将表单对象courseInfo传到后台
          .then(response => {
            //提示成功
            this.$message({
              type: 'success',
              message: '发表文章成功！'
            })
            //返回列表
            //这个跳转路径是 router中path中的地址
            this.$router.push({ path: '/article/admin' })
          })
      }
      else if (this.articleId.length > 0 && cookie.get('guli_token')) {  //2、修改课程信息
        this.article.id = this.articleId
        this.article.isPublish = 1 //设为发表状态

        debugger
        articleApi.updateArticle(this.article)
          .then(response => {
            //提示成功
            this.$message({
              type: 'success',
              message: '修改成功！'
            })

            //返回列表
            //这个跳转路径是 router中path中的地址
            this.$router.push({ path: '/article/admin' })
          })

      } else if (!cookie.get('guli_token')) {
        this.$message({
          type: 'error',
          message: '请先登录'
        })
      }
    },

    //保存草稿
    Savetest () {

      if (this.article.title.length == 0 || this.article.picture.length == 0 || this.article.description.length == 0) {
        this.$message({
          type: 'error',
          message: '请完整填写信息!'
        })
      } else if (this.articleId.length == 0 && cookie.get('guli_token')) {//新建文章然后点击保存，this.article.id 表示articleId不存在
        this.article.isPublish = 0 //设置为保存状态
        articleApi.addArticle(this.article)
          .then(response => {
            //提示成功
            this.$message({
              type: 'success',
              message: '保存成功！'
            })
            this.$router.push({ path: '/article' })
          })
      } else if (this.articleId.length > 0 && cookie.get('guli_token')) {  //修改然后保存
        this.article.isPublish = 0 //设置为保存状态
        articleApi.updateArticle(this.article)
          .then(response => {
            //提示成功
            this.$message({
              type: 'success',
              message: '保存成功！'
            })
            this.$router.push({ path: '/article/admin' })
          })
      }



    },



    //上传封面成功调用的方法
    //结果回调
    handleAvatarSuccess (response, file) {
      this.article.picture = response.data.url  //执行eduoss中的方法
    },

    //上传封面之前调用的方法
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 5
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }

}
</script>

<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 375px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 375px;
  height: 150px;
  display: block;
}
</style>