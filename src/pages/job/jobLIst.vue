<template>
  <div>
    <div style="background: #5fa1ff;padding-left: 8px;padding-right: 8px;">
    <van-search
    v-model="value"
    placeholder="请输入搜索关键词"
    shape="round"
    right-icon="search"
    @search="onSearch(value)"
    background="#5fa1ff"
    style="width:100%;"
    color="#ffffff"
    action-text
    >
  </van-search>
  </div>
  <div style="background-image: linear-gradient(#5ca3ff, #ebf1fd);padding-bottom: 20px;">
    <div style="color: aliceblue;margin: 0;padding: 0;font-size: 22px;margin-left: 14px;">推荐职位</div>
    <div @click="toDeatilJob(item)" v-for="(index,item) in 10" style="background: #fff;margin: 0 auto;border-radius: 6px;height: 120px;width: 350px;margin-top: 20px;padding: 8px;">
      <div style="display: flex;justify-content: space-between;">
        <div style="font-size: 18px;font-weight: 550;color: #3b3b3b;">前端工程师</div><div style="color: #ff887a;font-size: 18px;font-weight: 550;">5k-10k</div>
      </div>
      <div style="display: flex;justify-content: flex-start;margin-top: 10px;">
        <div class="jobex">3-5年经验</div>
        <div class="jobex">五险一金</div>
        <div class="jobex">本科以上</div>
        <div class="jobex">哈尔滨</div>
      </div>
      <div>
        <div style="color: #777777;margin-top: 10px;">2020-03-03</div>
      </div>
      <div style="display: flex;justify-content: flex-start;margin-top: 4px;">
        <div style="border-radius: 50%;width: 30px;height: 30px;">
        <img style="width: 30px;height: 30px;border-radius: 50%;" src="../../../static/img/user2.jpg" alt="">
        </div>
        <div style="height: 30px;line-height: 30px;margin-left: 8px;color: #3c3c3c;font-size: 15px;">
          北京小龙潜行科技有限公司
        </div>
      </div>
    </div>
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
import { Search, Icon } from 'vant'
// import  store from '../stores/store.js'
Vue.use(Search)
Vue.use(Icon)
Vue.use(Image)
Vue.use(Field)
Vue.use(NavBar)
Vue.use(Toast)
Vue.use(Button)
export default {
  name: 'JobList',
  data () {
    return {
      value:''
    }
  },
methods: {
  toDeatilJob(item){
    this.$router.push({path: '/detaliJob'})
  }
}
}
</script>
<style>
  .jobex{
    background: #f8f8f8;color: #777777;margin-right: 6px;font-size: 14px;
  }
/* @import './style.css'; */
</style>