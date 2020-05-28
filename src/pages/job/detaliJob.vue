<template>
  <div>
    <van-nav-bar color="#000000" title="" left-text=""  @click-right="onClickRight" @click-left="onClickLeft" left-arrow>
      <!-- <van-icon name="" slot="right" /> -->
      <template #right>
        <van-icon v-if="like" color="#000000" name="star-o" size="18" />
        <van-icon v-if="!like" color="#000000" name="star" size="18" />
      </template>
      <template #left>
        <van-icon color="#000000" name="arrow-left" size="18" />
      </template>
      <!-- <van-icon name="" slot="left" /> -->
      </van-nav-bar>
      <div style="padding-left: 20px;padding-right: 20px;">
        <h3>
          {{jobname}}
        </h3>
        <div style="display: flex;justify-content: flex-start;margin-top: 20px;">
          <div style="display: flex;justify-content: flex-start;align-items: center;"><van-icon  size="18" name="location-o" /><div>{{cityname}}</div>
        </div>
        <div style="margin-left: 24px;font-size: 15px;display: flex;justify-content: flex-start;align-items: center;">
          <van-icon size="18" name="notes-o" /><div>{{longdo}}</div>
        </div><div style="margin-left: 24px;display: flex;justify-content: flex-start;align-items: center;">
          <van-icon size="18" name="friends-o" />
          <div>{{education}}</div>
          <!-- ///// -->
        </div>
        </div>
        <h3 style="color: #fe887a;">
          {{salary}}
        </h3>
        <div @click="tocompany" style="height: 100px;border-top: 1px solid #eaeaea;border-bottom: 1px solid #eaeaea;display: flex;justify-content: space-between;align-items: center;">
          <div style="display: flex;justify-content: flex-start;align-items: center;">
            <img style="width: 50px;height: 50px;margin-left: 4px;" src="../../../static/img/user2.jpg" alt="">
            <div style="margin-left: 10px;">
              <span style="font-weight: 600;">HR.</span><span style="font-size: 14px;color: #3b3b3b;">{{inline}}</span>
              <div style="font-size: 14px;color: #3b3b3b;">北京小龙潜行科技有限公司</div>
            </div>
          </div>
          <div><van-icon name="arrow" /></div>
        </div>
        <h4>职位详情</h4>
        <div :style="text">
      -webkit-line-clamp 用来限制在一个块元素显示的文本的行数,这是一个不规范的属性（unsupported WebKit property），它没有出现在 CSS 规范草案中。
      display: -webkit-box 将对象作为弹性伸缩盒子模型显示 。
      -webkit-box-orient 设置或检索伸缩盒对象的子元素的排列方式 。
      text-overflow: ellipsis 以用来多行文本的情况下，用省略号“…”隐藏超出范围的文本。  
      -webkit-line-clamp 用来限制在一个块元素显示的文本的行数,这是一个不规范的属性（unsupported WebKit property），它没有出现在 CSS 规范草案中。
      display: -webkit-box 将对象作为弹性伸缩盒子模型显示 。

      </div>
      <div v-if="isalltext" @click="textall" style="color: #fe887a;font-size: 15px;">查看全部</div>
      <div style="height: 2px;border-bottom: 1px solid #eaeaea;margin-top: 20px;"></div>
      <h4>技能要求</h4>
      <div style="display: flex;justify-content: flex-start;align-items: center;flex-wrap: wrap;padding-bottom:68px ;">
        <div v-for="(index,item) in 6" style="height: 30px;border-radius: 4px;border: 1px solid #c5c5c5;line-height: 30px;font-size: 14px;padding-right: 4px;padding-left: 4px;margin-right: 8px;margin-top: 10px;">平面设计</div>
      </div>
      <van-button style="width: 90%;border-radius: 30px;background-color: #5aa0ff;position: fixed;bottom: 20px;" type="info">申请该职业</van-button>
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
Vue.use(Image)
Vue.use(Field)
Vue.use(NavBar)
Vue.use(Toast)
export default {
  name: 'DetaliJob',
  data () {
    return {
      like:true,
      jobname:'UI设计师',
      cityname:'哈尔滨',
      education:'大专',
      longdo:'3-5',
      salary:'10k-20k',
      inline:'在线',
      isalltext:true,
      text:'width: 340px;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical; -webkit-line-clamp: 3; overflow: hidden;color: #777777;font-size: 14px;line-height: 35px;'
    }
  },
  methods: {
    onClickLeft(){
      this.$router.back()
    },
    onClickRight(){
      this.like = false
    },
    textall(){
      this.text='width: 340px;color: #777777;font-size: 14px;line-height: 30px;'
      this.isalltext = false
    },
    tocompany(){
      this.$router.push({path: '/company'})
    }
    // intlike(){
    //   this.like = true
    // }
  }
}
</script>
<style>
/* @import './style.css'; */
</style>