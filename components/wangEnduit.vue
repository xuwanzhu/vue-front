<template lang="html">
  <div class="editor">
    <div ref="toolbar" class="toolbar">
    </div>
    <div ref="editor" class="text">
    </div>
  </div>
</template>
 
<script>
import E from "wangeditor";

export default {
  name: "editoritem",
  data () {
    return {
      editor: null,
      info_: null,
    };
  },
  model: {
    prop: "value",
    event: "change",
  },
  // 接收父组件的传值
  props: {
    value: { // 输入的内容
      type: String,
      default: "",
    },
    isClear: { // 是否清空
      type: Boolean,
      default: false,
    },
    // 编辑时回显的内容
    contxt: {
      type: String,
      default: "",
    },
  },

  watch: {
    contxt (contxt) {
      // 在这里监听，如果说回显时，把回显的内容放到编辑区域
      if (contxt !== "") {
        this.editor.txt.html(this.contxt);
      }
    },

    isClear (val) {
      // 触发清除
      if (val) {
        this.editor.txt.clear();
        this.info_ = null;
      }
    },
    value: function (value) {
      // 当内容发生变化是
      if (value !== this.editor.txt.html()) {
        this.editor.txt.html(this.value);
      }
    },
  },

  mounted () {
    this.seteditor();
    // 可能是个无效的判断，因为要区分编辑（回显）跟新增
    if (this.contxt == "") {
      // console.log("这是在修改文章");
    } else {
      this.editor.txt.html(this.value);
    }
  },
  methods: {
    seteditor () {
      // 初始化一下
      this.editor = new E(this.$refs.toolbar, this.$refs.editor);
      // 这里是图片上传部分
      // 首先，把token拿出来
      let token = localStorage.getItem("token");

      this.editor.config.uploadImgShowBase64 = false; // base64格式
      this.editor.config.uploadImgServer = '/eduoss/fileoss/upload'; // 图片上传的地址，这个是后端写好的
      this.editor.config.uploadImgHeaders = {
        token,
        "Access-Control-Allow-Origin": "*",
      }// 请求头，因为第一次跨域了

      this.editor.config.uploadFileName = "file"; // 后端接受上传文件的参数名
      this.editor.config.uploadImgMaxSize = 2 * 1024 * 1024; // 图片大小限制为 2M
      this.editor.config.uploadImgMaxLength = 6; // 一次最多上传 3 张
      this.editor.config.uploadImgTimeout = 3 * 60 * 1000; // 超时

      // 配置富文本的菜单，或者叫功能
      this.editor.config.menus = [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "list", // 列表
        "justify", // 对齐方式
        "quote", // 引用
        "emoticon", // 表情
        "image", // 插入图片
        "table", // 表格
        "video", // 插入视频
        "code", // 插入代码
        "undo", // 撤销
        "redo", // 重复
        "fullscreen", // 全屏
      ];

      this.editor.config.uploadImgHooks = {
        fail: (xhr, editor, result) => {
          // 插入图片失败回调
        },
        success: (xhr, editor, result) => {
          // 图片上传成功回调
        },
        timeout: (xhr, editor) => {
          // 网络超时的回调
        },
        error: (xhr, editor) => {
          // 图片上传错误的回调
        },

        customInsert: (insertImg, result, editor) => {
          // console.log(result, "result");
          //result为上传图片成功的时候返回的数据，这里我们需要后端返回的图片地址，输出一下就能拿到
          let url = result.data;
          insertImg(url);//图片的函数
        },
      };
      this.editor.config.onchange = (html) => {
        this.info_ = html; // 绑定当前逐渐地值
        this.$emit("change", this.info_); // 将内容同步到父组件中
      };
      // 创建富文本编辑器
      this.editor.create();
    },
  },
};
</script>
 
<style lang="css">
.editor {
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 0;
}
.toolbar {
  border: 1px solid #ccc;
}
.text {
  border: 1px solid #ccc;
  height: 500px;
  /*height: 500px; */
  overflow-y: auto;
}
</style>