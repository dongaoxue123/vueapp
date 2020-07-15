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
          {{salary}}-{{salarymax}}
        </h3>
        <div @click="tocompany" style="height: 100px;border-top: 1px solid #eaeaea;border-bottom: 1px solid #eaeaea;display: flex;justify-content: space-between;align-items: center;">
          <div style="display: flex;justify-content: flex-start;align-items: center;">
            <img style="width: 50px;height: 50px;margin-left: 4px;" :src="logo" alt="">
            <div style="margin-left: 10px;">
              <span style="font-weight: 600;">HR.</span><span style="font-size: 14px;color: #3b3b3b;">{{inline}}</span>
              <div style="font-size: 14px;color: #3b3b3b;">{{companyname}}</div>
            </div>
          </div>
          <div><van-icon name="arrow" /></div>
        </div>
        <h4>职位详情</h4>
        <div :style="text">
            {{jobrequire}}{{jobrequireTurn}}{{postqualification}}{{postqualificationsTurn}}
      </div>
      <div v-if="isalltext" @click="textall" style="color: #fe887a;font-size: 15px;">查看全部</div>
      <div style="height: 2px;border-bottom: 1px solid #eaeaea;margin-top: 20px;"></div>
      <h4>技能要求</h4>
      <div style="display: flex;justify-content: flex-start;align-items: center;flex-wrap: wrap;padding-bottom:68px ;">
        <div v-for="(index,item) in 6" style="height: 30px;border-radius: 4px;border: 1px solid #c5c5c5;line-height: 30px;font-size: 14px;padding-right: 4px;padding-left: 4px;margin-right: 8px;margin-top: 10px;">平面设计</div>
      </div>
      <van-button @click="letyes" style="width: 90%;border-radius: 30px;background-color: #5aa0ff;position: fixed;bottom: 20px;" type="info">申请该职业</van-button>
      </div>
      <div v-if="isloding" style="width: 100%;height: 100%;background: #fff;position: absolute;top: 0;left: 0;">
      <van-loading size=50px style="position: absolute;top: 50%;left: 50%;" color="#1989fa"/> 
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
import { Loading } from 'vant'
Vue.use(Loading)
import axios from 'axios'
Vue.use(Image)
Vue.use(Field)
Vue.use(NavBar)
Vue.use(Toast)
export default {
  name: 'DetaliJob',
  data () {
    return {
      like:true,
      // jobname:'UI设计师',
      cityname:'',
      education:'',
      longdo:'',
      salary:'10k-20k',
      inline:'在线',
      isalltext:true,
      companyname:'',
      jobname:'',
      jobrequire:'',
      logo:'',
      jobrequireTurn:'',
      postqualification:'',
      postqualificationsTurn:'',
      isloding:true,
      salarymax:'',
      companyid:0,
      jobid:'',
      text:'width: 340px;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical; -webkit-line-clamp: 3; overflow: hidden;color: #777777;font-size: 14px;line-height: 35px;'
    }
  },
  mounted () {
    this.isloding = true
    axios.defaults.headers.common['authToken'] = localStorage.name
    doGet(`${API_HOST}/api/job/job/getJobByJobid`,{jobid:this.$route.query.id}).then(res => {
      if (res) {
        this.isloding = false
        // console.log(res)
        this.companyname = res.data.t.company.companyname
        this.jobname=res.data.t.jobname
        this.cityname=res.data.t.jobadd
        this.longdo=res.data.t.experience
        this.education=res.data.t.education
        this.salary=res.data.t.salary
        this.jobid=res.data.t.jobid
        this.salarymax=res.data.t.salaryMax
        this.logo = res.data.t.company.logo
        this.companyid = res.data.t.company.companyid
        this.jobrequire = res.data.t.description[0].jobrequire
        this.jobrequireTurn = res.data.t.description[0].jobrequireTurn
        this.postqualification = res.data.t.description[0].postqualification
        this.postqualificationsTurn = res.data.t.description[0].postqualificationsTurn
      }
    })
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
      this.$router.push({path: '/company',
        query: {
          id: this.companyid
        }
      })
    },
    letyes(){
      axios.defaults.headers.common['authToken'] = localStorage.name
      doPost(`${API_HOST}/api/job/resumeUser/addResumeToCompany`,
       {jobid:this.jobid,uid:localStorage.id,}).then(res => {
        console.log(res.data.code)
        if (res.data.code == "200") {
          Toast.success('申请成功')
          // this.$router.push({path: '/perfectResume'})
        } else {
          Toast.fail('失败，请重试')
        }
      })
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