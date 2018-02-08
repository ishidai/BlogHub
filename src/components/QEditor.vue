<template>
  <!-- bidirectional data binding（双向数据绑定） -->
  <div>
    <header-bar
    :isPublish="true"
    :isLogin="true"
    @commitActicle="commitActicle"></header-bar>
      <div>
        <el-input v-model="inputTitle" placeholder="请输入标题"></el-input>
        <el-select v-model="valueChannel" placeholder="请选择栏目">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <quill-editor v-model="content"
                    class="quill-code"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @change="onEditorChange($event)"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)">
      </quill-editor>
    </div>
</template>

<script>
// you can also register quill modules in the component
import Quill from "quill";
import consts from "../constant/consts";
import HeaderBar from "./HeaderBar.vue";
import Vue from "vue";
import { Message } from "element-ui";
import { Input } from "element-ui";
import { Select } from "element-ui";
Vue.component(Message.name, Message);
Vue.component(Input.name, Input);
Vue.component(Select.name, Select);

export default {
  data() {
    return {
      inputTitle: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕1111"
        }
      ],
      valueChannel: "",
      content: "",
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 3 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["clean"],
            ["link", "image", "video"]
          ],
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          }
        }
      }
    };
  },
  // manually control the data synchronization
  // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
  methods: {
    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      console.log("editor ready!", quill);
    },
    onEditorChange({ quill, html, text }) {
      console.log("editor change!", quill, html, text);
      this.content = html;
    },
    commitActicle() {
      console.log("this.inputTitle", this.inputTitle);
      console.log("this.valueChannel", this.valueChannel);
      if (this.inputTitle && this.valueChannel) {
        const _this = this;
        this.axios
          .post(consts.posts, {
            title: this.inputTitle,
            body: this.content
          })
          .then(function(response) {
            if (response.status === 201) {
              _this.$router.push("/");
              _this.loginSucc();
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        this.$message({
          message: "请填写完整",
          type: "warning"
        });
        return;
      }
    },
    loginSucc() {
      this.$message({
        message: "恭喜你，发表成功",
        type: "success"
      });
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  created() {
      const _this = this;
      this.axios.get(consts.categories).then((res) => {
        console.log('====>', res.data.categorys)
        res.data.categorys.forEach((item) => {
          _this.options.concat({
              value:item.id,
              label:item.name
          })
        })
        console.log('===options=>', _this.options)
      })
  },
  mounted() {
    console.log("this is current quill instance object", this.editor);
  },
  components: {
    HeaderBar
  }
};
</script>

<style scoped lang="scss">
  .hide-alert {
    display: none;
  }
  .quill-code {
    margin-top: 10px;
    margin: 0 100px;
    height: 500px;
  }
</style>
