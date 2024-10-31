<template>
  <div>
    <Header v-on:refreshLanguag="refreshLanguag"/>
    <div class="page-content">
      <div style="display:flex;z-index:1">
        <div style="flex:1">
          <div style="height:40px;line-height:40px;display:flex">
            <div>{{sourceCode|currentLanguage(languagCode)}}</div>
            <div class="translator-icon-arrow" @click="isArrow1=!isArrow1">
              <span class="iconfont icon-xiala" :class="{'icon-xiala-rotate':isArrow1}"/>
            </div>
          </div>
          <div style="margin-top:6px;position:relative">
            <editorInput @input="checkLanguage" v-model="sourceText" :hoverIndex="sourceIndex"></editorInput>
            <div class="source-text-hint">{{sourceText.length}}/{{sourceMaxlength}}</div>
            <el-tooltip class="item" effect="dark" content="Ctrl+Enter" placement="top">
              <div @click="translateSource" class="translate-btn">翻译</div>
            </el-tooltip>
            <div @click="clearSource" class="translate-clear">
              <img src="~@/assets/clear.png"/>
            </div>
          </div>
        </div>
        <div style="flex:1;margin-left:10px;display:flex;flex-direction:column;position:relative">
          <img class="exchange" src="~@/assets/exchange.png"/>
          <div style="height:40px;line-height:40px;padding-left:15px;display:flex">
            <div>{{targetCode|currentLanguage(languagCode)}}</div>
            <div class="translator-icon-arrow" @click="isArrow2=!isArrow2">
              <span class="iconfont icon-xiala" :class="{'icon-xiala-rotate':isArrow2}"/>
            </div>
          </div>
          <div style="margin-top:6px;flex:1;background:#F5F5FA;padding:10px">
            <span></span>
            <span :key="index" class="target-item" v-for="(item,index) in targetText">{{item.t}}</span>
          </div>
          <div class="target-hint">
            <img class="target-icon" :src="currentTranslate(0).icon"/>{{currentTranslate(0).value}}
          </div>
          <img class="clipboard" src="~@/assets/clipboard.png"/>
        </div>
        <div v-show="isSecondTranslate" :class="{'animate__fadeInRight':isSecondTranslate}"
             style="flex:1;margin-left:10px;display:flex;flex-direction:column;position:relative">
          <div style="height:40px;line-height:40px"></div>
          <div style="margin-top:6px;flex:1;background:#F5F5FA;padding:10px">
            <span :key="index" class="target-item" v-for="(item,index) in targetText2">
              {{item.t}}
            </span>
          </div>
          <div class="target-hint" v-if="isSecondTranslate">
            <img class="target-icon" :src="currentTranslate(1).icon"/>{{currentTranslate(1).value}}
          </div>
          <img class="clipboard" src="~@/assets/clipboard.png"/>
        </div>
      </div>
      <div style="height:40px;line-height:40px;position:absolute;right:0;top:0;text-align:right;display:flex">
        <div :key="code" style="display:flex;margin-left:10px" v-for="code in checkedArrayTranslate">
          <img :src=" itemTranslate(code).icon" class="el-checkbox-icon"/>
          <span>{{itemTranslate(code).value}}</span>
        </div>
        <div style="display:flex;margin-left:10px">
          <el-popover trigger="click">
            <el-checkbox-group v-model="checkedArrayTranslate" :min="1" :max="2">
              <div :key="item.code" class="translator-item" v-for="item in arrayTranslate">
                <img :src="item.icon" class="el-checkbox-icon"/>
                <el-checkbox :label="item.code">
                  {{item.value}} <span class="el-checkbox-pro">Pro</span>
                </el-checkbox>
              </div>
            </el-checkbox-group>
            <div slot="reference" class="translator-icon-arrow" @click="isArrow=!isArrow">
              <span class="iconfont icon-xiala" :class="{'icon-xiala-rotate':isArrow}"/>
            </div>
          </el-popover>
        </div>
      </div>
      <div class="original-languages-popover" v-show="(isArrow1 && !isArrow2) || (!isArrow1 && isArrow2)">
        <div style="border-bottom: 1px solid #D9D9D9;position:relative">
          <el-input @input="searchLanguages" clearable placeholder="搜索语言" v-model="searchKeyword"></el-input>
          <img class="translator-search" src="~@/assets/search.png"/>
        </div>
        <div class="original-languages">
          <div :key="item.code" class="item-language" v-for="(item) in configLanguages">
            <span style="width:40px;display: inline-block"></span>
            {{item.code|currentLanguage(languagCode)}}
          </div>
        </div>
      </div>
      <div class="source-text-warning">
        <span class="iconfont icon-Vector-2" style="color:#FAAD14"></span> 已超过3,000个字符上限
        <div class="text-warning-close"><img src="~@/assets/clear.png"/></div>
      </div>
    </div>
    <Footer/>
    <demo/>
  </div>
</template>
<script>
  import support from "../plugins/SupportLanguages.js";
  import editorInput from "../components/editorInput";
  import demo from "../components/demo";

  export default {
    name: 'IndexPage',
    components: {editorInput, demo},
    head() {
      return {
        title: "我是自定义标题"
      }
    },
    data() {
      return {
        isDark: false,
        sourceCode: "und",
        sourceText: "<per>请输入或粘贴要翻译的内容</per>",
        sourceIndex: 0,
        sourceMaxlength: 3000,
        //
        targetCode: "zh_Hans",
        //
        targetText: [],
        copyData: "copyData",
        //
        targetText2: [],
        copyData2: "copyData2",
        //
        isArrow: false,
        isArrow1: false,
        isArrow2: false,
        //
        arrayTranslate: [
          {
            icon: require("~/assets/t-mSLLM.png"),
            value: "mSLLM",
            code: "mSLLM"
          },
          {
            icon: require("~/assets/t-Google-Translate.png"),
            value: "Google Translate",
            code: "Google Translate"
          },
          {
            icon: require("~/assets/t-OpenAI-GPT.png"),
            value: "OpenAI-GPT",
            code: "OpenAI-GPT"
          },
          {
            icon: require("~/assets/t-Gemini.png"),
            value: "Gemini",
            code: "Gemini"
          },
          {
            icon: require("~/assets/t-Claude.png"),
            value: "Claude",
            code: "Claude"
          },
          {
            icon: require("~/assets/t-Llama.png"),
            value: "Llama",
            code: "Llama"
          },
          {
            icon: require("~/assets/t-Qwen.png"),
            value: "Qwen",
            code: "Qwen"
          },
          {
            icon: require("~/assets/t-DeepSeek.png"),
            value: "DeepSeek",
            code: "DeepSeek"
          }],
        checkedArrayTranslate: ["mSLLM", "Google Translate"],
        //
        searchKeyword: "",
        configLanguages: [],
        languagCode: this.$cookies.get("languagCode") || "zh_Hans",
      };
    },
    filters: {
      currentLanguage(sourceCode, code) {
        if (sourceCode == "und") {
          return "自动检测";
        }
        const current = support.configs.find(item => item["code"] == sourceCode);
        if (!current) {
          return null;
        }
        return current[code];
      }
    },
    methods: {
      refreshLanguag(value) {
        this.$i18n.locale = value;
        this.languagCode = value;
      },
      currentTranslate(translateIndex) {
        return this.arrayTranslate.find(item => item.code == this.checkedArrayTranslate[translateIndex]);
      },
      itemTranslate(code) {
        return this.arrayTranslate.find(item => item.code == code);
      },
      checkLanguage(value) {
        console.log("xxx:" + value);
        /*if (this.sourceText.length > 5) {
          const cldFactoryPromise = cld3Asm.loadModule();
          cldFactoryPromise.then((cldFactory) => {
            console.log(cldFactory.create(5, 1000).findLanguage(this.sourceText));
          });
        }*/
      },
      translateSource() {
        /*const params = {
          contents: ["The 2024 Nobel Prize in physics has been awarded to John Hopfield and Geoffrey Hinton for their fundamental discoveries in machine learning, which paved the way for how artificial intelligence is used today.\n\nHopfield, a professor at Princeton University and Hinton, a computer scientist at the University of Toronto, were praised for laying the foundations for the machine learning that powers many of today’s AI-based products and applications. Hinton, however, has also expressed fears about AI’s future development, cutting ties with his former employer Google in order to speak more freely on the issue.\n\n“Their work was fundamental in laying the cornerstones for what we experience today as artificial intelligence,” Mark Pearce, a member of the Nobel committee of physics, told CNN.\n\nThe committee announced the prestigious honor, seen as the pinnacle of scientific achievement, in Sweden on Monday. The prize carries a cash award of 11 million Swedish kronor ($1 million).\n\nHinton, who has been dubbed the “godfather” of artificial intelligence (AI), said he was “flabbergasted” to receive the prize."],
          sourceLanguageCode: "en",
          targetLanguageCode: "zh-Hans",
          models: ["mSLLM", "GPT"]
        };
        apiRequest.translateDemo(params).then((res) => {
          this.targetText = res.r[0].translation;
          this.targetText2 = res.r[1].translation;
        });*/
      },
      clearSource() {
        this.sourceText = "";
      },
      onCopySuccess(e) {
        alert("复制成功！");
      },
      searchLanguages() {
        if (this.searchKeyword != "") {
          let arrLanguage = [];
          support.configs.forEach(item => {
            if (item[this.languagCode].search(this.searchKeyword) != -1) {
              arrLanguage.push(item);
            }
          });
          this.configLanguages = arrLanguage;
        } else {
          this.configLanguages = support.configs;
        }
      }
    },
    computed: {
      isSecondTranslate() {
        return this.checkedArrayTranslate.length >= 2 ? true : false;
      }
    },
    created() {
      this.configLanguages = support.configs;
    }
  };
</script>

<style type="text/css">
  .exchange {
    width: 30px;
    height: 30px;
    position: absolute;
    left: -20px;
    top: 5px;
  }

  .clipboard {
    width: 24px;
    height: 24px;
    position: absolute;
    right: 10px;
    bottom: 10px;
    cursor: pointer;
  }

  .el-popover {
    padding: 10px 0px !important;
  }

  .translator-item {
    display: flex;
    height: 50px;
    padding: 10px;
  }

  .translator-item:hover {
    background: #F5F5F5;
  }

  .el-checkbox-icon {
    width: 30px;
    height: 30px;
    margin-top: 5px;
  }

  .el-checkbox {
    position: relative;
    height: 30px;
    line-height: 30px;
    width: 100%;
    padding-right: 20px;
  }

  .el-checkbox .el-checkbox__input {
    position: absolute;
    right: 0;
    line-height: 30px;
    top: 2px;
  }

  .el-checkbox__label {
    font-size: 16px;
    color: #333333;
  }

  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #333333;
  }

  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #7C3AED;
    border-color: #7C3AED;
  }

  .el-checkbox-pro {
    background: linear-gradient(225deg, #FFECC0 0%, #F3BB39 100%);
    color: #563C00;
    display: inline-block;
    font-size: 12px;
    width: 30px;
    height: 16px;
    line-height: 16px;
    border-radius: 8px;
    text-align: center;
  }

  .translator-search {
    width: 18px;
    height: 18px;
    position: absolute;
    left: 10px;
    top: 14px;
    z-index: 2;
  }

  .el-checkbox-group {
    font-size: 16px;
  }

  .el-textarea__inner {
    min-height: 300px !important;
    resize: none;
  }

  .original-languages-popover {
    position: absolute;
    top: 46px;
    left: 0px;
    z-index: 2;
    width: 100%;
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #D9D9D9;
    box-shadow: 0px 9px 28px 8px #F8F5FE;
    box-shadow: 0px 6px 16px 0px #EBEBEB;
    box-shadow: 0px 3px 6px -4px #D9D9D9;
  }

  .original-languages-popover .el-input__inner {
    background-color: #ffffff;
    text-indent: 20px;
  }

  .original-languages {
    display: grid;
    grid-template-columns: repeat(6, 16.66%);
  }

  .item-language {
    height: 30px;
    text-align: left;
    cursor: pointer;
    line-height: 30px;
  }

  .item-language-active {
    background: #F2EBFD;
  }

  .item-language:hover {
    background: #F5F5F5;
  }

  .el-textarea .el-input__count {
    left: 10px;
  }

  .translate-btn {
    width: 100px;
    height: 44px;
    line-height: 44px;
    border-radius: 4px;
    color: #ffffff;
    background: #7C3AED;
    text-align: center;
    position: absolute;
    right: 10px;
    bottom: 10px;
    cursor: pointer;
  }

  .translate-btn:hover {
    background: #6931C9;
  }

  .translate-clear {
    position: absolute;
    right: 5px;
    top: 5px;
    cursor: pointer;
    width: 34px;
    height: 34px;
  }

  .translate-clear:hover {
    background: #F4F4F6;
    border-radius: 4px;
  }

  .translate-clear img {
    width: 24px;
    height: 24px;
    margin-left: 5px;
    margin-top: 5px;
  }

  .target-item {
    cursor: pointer;
    white-space: pre-wrap;
    word-break: break-word;
    word-wrap: break-word;
    display: inline-block;
  }

  .target-item:hover {
    background: rgba(124, 58, 237, 0.15);
  }

  .target-hint {
    background: #F5F5FA;
    display: flex;
    color: #999999;
    padding: 10px;
    font-size: 16px;
    position: relative;
  }

  .target-icon {
    width: 20px;
    height: 20px;
    margin-top: 2px;
  }

  .target-btn-clipboard {
    position: absolute;
    right: 10px;
  }

  .target-btn-clipboard img {
    width: 24px;
    height: 24px;
  }

  .source-text-hint {
    width: auto;
    color: #999999;
    position: absolute;
    bottom: 20px;
    left: 20px;
    font-size: 16px;
  }

  .source-text-warning {
    margin: 10px 0;
    color: #333333;
    height: 50px;
    line-height: 50px;
    background: #FFFBE6;
    border-radius: 1px;
    border: 1px solid #FFE58F;
    text-align: center;
    position: relative;
  }

  .text-warning-close {
    position: absolute;
    right: 5px;
    top: 5px;
    cursor: pointer;
    width: 34px;
    height: 34px;
  }

  .text-warning-close img {
    width: 24px;
    height: 24px;
    margin-left: 5px;
    margin-top: 5px;
  }
</style>
