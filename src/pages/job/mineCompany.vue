<template>
  <div>
    <div style="padding: 20px;">
      <div style="display: flex;justify-content: space-between;align-self: center;">
        <div @click="tojobdetali">
          <van-icon color="#000" size=24 name="arrow-left" /></div>
        <div style="font-size: 16px;display: flex;">
          <div @click="follow" v-if="isfollow" >
            <van-icon size=20 name="plus"/>
          </div>
          <div @click="isnfollow" v-if="!isfollow" ><van-icon  size=20  name="success" /></div>
          <div style="margin-left: 4px;">关注</div>
          </div>
      </div>
      <div>
      </div>
      <div style="display: flex;justify-content: center;margin-top: 10px;">
        <img style="height: 50px;" src="../../../static/img/logo.png" alt="">
        </div>
        <div style="margin: 0 auto;color: #ababab;margin-top: 10px;display: flex;justify-content: center">
          北京小龙潜行科技有限公司
        </div>
      <div style="height: 2px;border-bottom:  1px solid #eaeaea;margin-top: 20px;"></div>
      <h4>
        北京小龙潜行科技有限公司
      </h4>
      <div class="compname">公司主页：</div>
      <div class="compname">工作地址：</div>
      <div class="compname">发展阶段：</div>
      <div class="compname">企业规模：</div>
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
import { Icon } from 'vant'
Vue.use(Icon)
Vue.use(Image)
Vue.use(Field)
Vue.use(NavBar)
Vue.use(Toast)
Vue.use(Button)
export default {
  name: 'MineCompany',
  data () {
    return {
      isfollow:true
      
    }
  },
  methods: {
    follow(){
        this.isfollow=false
      },
    isnfollow(){
      this.isfollow=true
    },
    // toDeatilJob(item){
    //   this.$router.push({path: '/detaliJob'})
    // }
    tojobdetali(){
      this.$router.back()
    }
  }
}
</script>
<style>
  .compname{
    color: #3b3b3b;
    font-size: 15px;
    margin-bottom: 20px;
  }
/* @import './style.css'; */
</style>