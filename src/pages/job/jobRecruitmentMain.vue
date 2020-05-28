<template>
  <div>
    <div style="margin: 0px auto;width: 250px;margin-top: 40px;">
      <img style="width: 250px;height: 80px;" src="../../../static/img/job.jpg" alt="">
    </div>
    <div style="text-align: center;font-size: 24px;color: #3b3b3b;letter-spacing: 3px;margin-top: 0px;">欢迎来到青年i猪联盟</div>
    <div style="width: 140px;margin: 0 auto;margin-top: 40px;">
      <img style="width: 140px;" src="../../../static/img/forjob.jpg" alt="">
      <van-button @click="toForJobDetail" style="width: 140px;border-radius: 4px;background: #ff887a;border: 0px;height: 40px;margin-top: 10px;" type="info">我要找工作</van-button>
    </div>
    <div style="width: 300px;height: 2px; border-bottom: 1px dashed #cacaca;margin: auto;margin-top: 40px;"/>
    <div style="width: 140px;margin: 0 auto;margin-top: 40px;">
      <img style="width: 140px;" src="../../../static/img/forperson.jpg" alt="">
      <van-button style="width: 140px;border-radius: 4px;background: #5aa0ff;border: 0px;height: 40px;margin-top: 10px;" type="info">我要找牛人</van-button>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import store from '../../stores/store.js'
import { NavBar } from 'vant'
import { Field } from 'vant'
import { Image } from 'vant'
import { Toast } from 'vant'
import { doGet }  from '../../utils/index.js'
import { doPost }  from '../../utils/index.js'
import { API_HOST }  from '../../utils/api.js'
import { Button } from 'vant'
Vue.use(Image)
Vue.use(Field)
Vue.use(NavBar)
Vue.use(Toast)
Vue.use(Button)
export default {
  name: 'JobRecruitmentMain',
  data () {
    return {
    }
  },
methods: {
  toForJobDetail(){
    this.$router.push({path: '/jobList'})
  }
}
}
</script>
<style>
/* @import './style.css'; */
</style>