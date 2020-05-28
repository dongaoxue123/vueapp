<template>
  <div>
    <div style="background-color: #64a5ff;padding: 20px;">
      <div style="display: flex;justify-content: space-between;align-self: center;">
        <div @click="tojobdetali"><van-icon size=24 color="#fff" name="arrow-left" /></div>
        <div style="color:#fff;font-size: 16px;display: flex;">
          <div @click="follow" v-if="isfollow" >
            <van-icon size=20 color="#fff"  name="plus" />
          </div>
          <div @click="isnfollow" v-if="!isfollow" ><van-icon  size=20 color="#fff"  name="success" /></div>
          <div style="margin-left: 4px;">关注</div>
          </div>
      </div>
      <div style="display: flex;justify-content: space-between;align-items: center;margin-top: 20px;">
        <div>
        <h2 style="color: aliceblue;margin: 0;padding-bottom: 5px;">北京小龙潜行科技有限公司</h2>
        <span style="color: #e0e7ff;font-size: 14px;">100人以上|农牧企业|IT服务商</span>
      </div>
      <img style="width: 50px;height: 50px;" src="../../../static/img/user2.jpg" alt="">
      </div>
      <div  style="color: #e0e7ff;font-size: 14px;margin-top: 5px;">私企.民营企业</div>
      <div style="display: flex;justify-content: flex-start;align-items: center;margin-top: 40px;">
        <div @click="isintroduction" style="font-size: 20px;color: #fff;">简介</div>
        <div @click="isposition" style="font-size: 20px;color: #fff;margin-left: 20px;">职位</div>
      </div>
      <div style="display: flex;justify-content: flex-start;align-items: center;margin-top: 10px;">
        <div v-if="ifpink" style="width: 20px;height: 2px;background-color: #fe887a;border-radius: 2px;margin-left: 8px;"></div>
        <div v-if="!ifpink" style="width: 20px;height: 2px;background-color: #fe887a;border-radius: 2px;margin-left: 70px;"></div>
      </div>
    </div>
    <div style="padding: 20px;">
      <div v-if="!ispositionlist">
        <div @click="toDeatilJob(item)" v-for="(index,item) in 10" style="background: #fff;margin: 0 auto;border-radius: 6px;height: 90px;width: 350px;margin-top: 20px;padding: 8px;border-bottom: 1px solid #ebebeb;">
          <div style="display: flex;justify-content: space-between;">
            <div style="font-size: 18px;font-weight: 550;color: #3b3b3b;">前端工程师</div><div style="color: #ff887a;font-size: 18px;font-weight: 550;">5k-10k</div>
          </div>
          <div style="display: flex;justify-content: flex-start;margin-top: 10px;">
            <div style="background: #f8f8f8;color: #777777;margin-right: 6px;font-size: 14px;">3-5年经验</div>
            <div style="background: #f8f8f8;color: #777777;margin-right: 6px;font-size: 14px;">五险一金</div>
            <div style="background: #f8f8f8;color: #777777;margin-right: 6px;font-size: 14px;">本科以上</div>
            <div style="background: #f8f8f8;color: #777777;margin-right: 6px;font-size: 14px;">哈尔滨</div>
          </div>
          <div>
            <div style="color: #777777;margin-top: 10px;">2020-03-03</div>
          </div>
        </div>
      </div>
      <div v-if="ispositionlist">
        <h4 style="color: #3b3b3b;">公司福利</h4>
        <div style="display: flex;justify-content: flex-start;margin-top: 10px;">
          <div style="background: #f8f8f8;color: #777777;margin-right: 8px;font-size: 14px;padding: 5px;">股权奖励</div>
          <div style="background: #f8f8f8;color: #777777;margin-right: 8px;font-size: 14px;padding: 5px;">五险一金</div>
          <div style="background: #f8f8f8;color: #777777;margin-right: 8px;font-size: 14px;padding: 5px;">年终奖励</div>
          <div style="background: #f8f8f8;color: #777777;margin-right: 8px;font-size: 14px;padding: 5px;">双法双休</div>
        </div>
        <h4 style="color: #3b3b3b;">企业介绍</h4>
        <div :style="text">
          -webkit-line-clamp 用来限制在一个块元素显示的文本的行数,这是一个不规范的属性（unsupported WebKit property），它没有出现在 CSS 规范草案中。
          display: -webkit-box 将对象作为弹性伸缩盒子模型显示 。
          -webkit-box-orient 设置或检索伸缩盒对象的子元素的排列方式 。
          text-overflow: ellipsis 以用来多行文本的情况下，用省略号“…”隐藏超出范围的文本。  
          -webkit-line-clamp 用来限制在一个块元素显示的文本的行数,这是一个不规范的属性（unsupported WebKit property），它没有出现在 CSS 规范草案中。
          display: -webkit-box 将对象作为弹性伸缩盒子模型显示
          </div>
          <div v-if="isalltext" @click="textall" style="color: #fe887a;font-size: 15px;">查看全部</div>
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
Vue.use(Image)
Vue.use(Field)
Vue.use(NavBar)
Vue.use(Toast)
Vue.use(Button)
export default {
  name: 'Company',
  data () {
    return {
      ifpink:true,
      ispositionlist:true,
      isalltext:true,
      isfollow:true,
      text:'width: 340px;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical; -webkit-line-clamp: 5; overflow: hidden;color: #777777;font-size: 14px;line-height: 35px;'
    }
  },
methods: {
  isintroduction(){
    this.ifpink= true
    this.ispositionlist = true
  },
  isposition(){
    this.ifpink= false
    this.ispositionlist = false
  },
  textall(){
      this.text='width: 340px;color: #777777;font-size: 14px;line-height: 30px;'
      this.isalltext = false
    },
    tojobdetali(){
      this.$router.back()
    },
    follow(){
      this.isfollow=false
    },
    isnfollow(){
      this.isfollow=true
    },
    toDeatilJob(item){
      this.$router.push({path: '/detaliJob'})
    }
}
}
</script>
<style>
/* @import './style.css'; */
</style>