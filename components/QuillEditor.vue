
<template>
  <div>
    <section class="container">
      <quill-editor v-if="isClient" v-model="content" ref="myQuillEditor" :options="editorOption"
        @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)">
      </quill-editor>
      <div>
        <input type="button" class="publish-article" value="提交短文">
      </div>
    </section>
  </div>
</template>


<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  data () {
    return {
      isClient: false,
      content: '<p>开始你的短文书写 . . .</p><p> -  - </p>',
      editorOption: {
        // some quill options
        modules: {
          // toolbar: true 
          toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block']
            [{ 'font': [] }],
            [{ 'align': [] }],
          ]
        }
      }
    }
  },
  mounted () {
    console.log('app init, my quill insrance object is:', this.myQuillEditor)
    // setTimeout(() => {
    //   this.content = 'i am changed'
    // }, 3000)
    if (process.client) {
      const { quillEditor } = require('vue-quill-editor')
      this.$options.components = { quillEditor }
      this.isClient = true
    }
  },
  methods: {
    onEditorBlur (editor) {
      // console.log('editor blur!', editor)
    },
    onEditorFocus (editor) {
      // console.log('editor focus!', editor)
    },
    onEditorReady (editor) {
      for (var i = 0; i < 20; i++) {
        this.content += "<p><br /></p>";
      }

    },
    onEditorChange ({ editor, html, text }) {

    }
  }
}
</script>
<style  scoped>
.container {
  width: 100%;
  margin: 0 0 0 20px;
  padding: 20px 0px;
  background-color: #ffffff;
}

.title {
  padding-bottom: 20px;
  background-color: transparent;
}
.title-box {
  height: 4rem;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
}
.publish-article {
  margin-top: 20px;
  background-color: #48c774;
  color: #ffffff;
  border-radius: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 20px;
  padding-right: 20px;
}
</style>


