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
    <div style="color: aliceblue;margin: 0;padding: 0;font-size: 22px;margin-left: 14px;">热门企业</div>
    <div @click="toDeatilJob(item)" v-for="(index,item) in 10" style="background: #fff;margin: 0 auto;border-radius: 6px;height: 120px;width: 350px;margin-top: 20px;padding: 8px;">
      <div style="display: flex;justify-content: space-between;align-items: center;margin-top: 10px;">
        <div style="margin-left: 0px;display: flex;justify-content: flex-start;align-items: center;">
          <img style="width: 60px;height: 60px;margin-left: 4px;" src="../../../static/img/user2.jpg" alt="">
          <div style="margin-left: 10px;">
          <div style="font-weight: 600;font-size: 18px;">北京小龙潜行科技有限公司</div>
          <div style="font-size: 15px;color: #777777;margin-top: 5px;">100人以上|A轮</div>
        </div>
          <!-- <div style="font-size: 14px;color: #3b3b3b;">北京小龙潜行科技有限公司</div> -->
        </div>
        <div><van-icon name="arrow" /></div>
      </div>
      <div style="display: flex;justify-content: center;align-items: center;margin-top: 10px;font-size: 17px;">前端工程师等<span style="color: #ff877a;">6</span>个职位在招</div>
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
  name: 'CompanyList',
  data () {
    return {
      value:''
    }
  },
methods: {
  toDeatilJob(item){
    this.$router.push({path: '/company'})
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