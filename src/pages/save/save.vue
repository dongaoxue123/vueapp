<template>
  <div>
    <van-nav-bar
      title=""
      left-text="我的收藏"
      right-text=""
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      color="#585858"
    />
    <div @click="toDetailPost(item)" v-for="(item,index) in contentList" class="shareTextcontent">
      <span style="color:pink;font-size:14px">【{{item.zhutiName}}】</span><span style="font-size:14px;color:#000">{{item.name}}</span>
      <!-- <p style="font-size:13px;color:#575757;padding:6px">将很快肯定会尽快发给好看的反馈开绿灯解放了大家了解砥砺奋进吉林省空军的飞机第三方</p> -->
      <div class="shareTime">
        <div></div><div><span>发表时间</span>：<span>{{item.createtime}}</span></div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import { NavBar } from 'vant'
import { API_HOST }  from '../../utils/api.js'
import { doGet }  from '../../utils/index.js'
Vue.use(NavBar)
export default {
  name: 'Save',
  data () {
    return {
      contentList:[]
    }
  },
  mounted() {
    axios.defaults.headers.common['authToken'] = localStorage.name
    doGet(`${API_HOST}/api/club/tiezi/getMyCollect`).then(res => {
      if (res) {
        // console.log(res.data.list)
        // 'just do it'
        this.contentList = res.data.list
      }
    })
  },
  methods: {
    toDetailPost (item){
      this.$router.push({path: '/detailPost',
        query: {
          id: item.id,
          name: item.name
        }
      })
    },
    onClickLeft () {
      this.$router.back()
    }
  },
}
</script>
<style>
@import './style.css';
</style>