<template>
  <!-- bidirectional data binding（双向数据绑定） -->
  <div class="content-container">

        <header></header>
        <el-input v-model="inputTitle" placeholder="请输入标题"></el-input>

        <quill-editor v-model="content"
                      class="quill-code"
                      ref="myQuillEditor"
                      :options="editorOption"
                      @change="onEditorChange($event)"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)">
        </quill-editor>

        <el-select class="select-cateogry-tag" v-model="valueChannel" placeholder="请选择栏目分类">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

          <el-tag
            class="select-cateogry-tag"
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          <el-button class="button-new-tag" size="small" @click="commitActicle">保存</el-button>
      </div>
</template>

<script>
// you can also register quill modules in the component
import Quill from "quill";
import consts from "../constant/consts";
import Header from "../components/Header.vue";
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
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      // 标题
      inputTitle: "",
      // 分类
      options: [],
      // 分类选择值
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

    handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    commitActicle() {
      if (this.inputTitle && this.valueChannel) {
        const _this = this;
        this.axios.post(consts.posts, {
            title: this.inputTitle,
            body: this.content,
            tags: this.dynamicTags,
            channelId: this.valueChannel
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
        res.data.categories.forEach((item) => {
          _this.options.push({
              value:item.id,
              label:item.name
          })
        })
      })
  },
  mounted() {
    console.log("this is current quill instance object", this.editor);
  },
  components: {
    Header
  }
};
</script>

<style scoped lang="scss">
  .content-container {
    margin: 0 100px;
  }
  .hide-alert {
    display: none;
  }
  .quill-code {
    margin-top: 10px;
    height: 500px;
  }
  .select-cateogry-tag {
    margin-top: 70px;
  }

  .el-button--small, .el-button--small.is-round {
    padding: 9px 15px;
    height: 40px;
}
</style>
