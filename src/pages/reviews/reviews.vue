<template>
    <div>
      <van-nav-bar
        title="回帖"
        left-text="取消"
        right-text="发送"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
        color="#585858"
      />
      <van-cell-group>
        <van-field
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="200"
          placeholder="请输入回复"
          :autosize="{minHeight:100}"
          @input = "reviewText"
        />
      </van-cell-group>
      <!-- <van-uploader style="margin-left:10px" v-model="fileList" multiple /> -->
    </div>
  </template>
  <script>
  import Vue from 'vue'
  import { NavBar } from 'vant'
  import { Uploader } from 'vant'
  import { Field } from 'vant'
  import axios from 'axios'
  import { Toast } from 'vant'
  import { API_HOST }  from '../../utils/api.js'
  import { doPost }  from '../../utils/index.js'
  Vue.use(Toast)
  Vue.use(Field)
  Vue.use(Uploader)
  Vue.use(NavBar)
  export default {
    name: 'Reviews',
    data () {
      return {
      value : '',
      fileList: []
      }
    },
    mounted() {
    },
    methods: {
      onClickLeft() {
        this.$router.back()
      },
      onClickRight () {
        axios.defaults.headers.common['authToken'] = localStorage.name
        doPost(`${API_HOST}/api/club/tiezi/replyTiezi`, {tieziid:this.$route.query.id, contenttxt:this.value, huifuid:this.$route.query.huifuid}).then(res => {
          if (res) {
            console.log(res.data)
            Toast.success('回复成功')
            this.$router.back()
          }
        })
      },
      reviewText (value) {
        this.value = value
        console.log(value)
      }
    }
  }
  </script>
  <style>
  .font-img{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 10px;
  }
  </style>