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
        <h2 style="color: aliceblue;margin: 0;padding-bottom: 5px;">{{companyname}}</h2>
        <span style="color: #e0e7ff;font-size: 14px;">{{scale}}/{{sectorName}}</span>
      </div>
      <img style="width: 50px;height: 50px;" :src="comppic" alt="">
      </div>
      <div  style="color: #e0e7ff;font-size: 14px;margin-top: 5px;">{{develepment}}</div>
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
        <div @click="toDeatilJob(index)" v-for="(index,item) in joblist" style="background: #fff;margin: 0 auto;border-radius: 6px;height: 90px;width: 350px;margin-top: 20px;padding: 8px;border-bottom: 1px solid #ebebeb;">
          <div style="display: flex;justify-content: space-between;">
            <div style="font-size: 18px;font-weight: 550;color: #3b3b3b;">{{index.jobname}}</div><div style="color: #ff887a;font-size: 18px;font-weight: 550;">{{index.salary}}</div>
          </div>
          <div style="display: flex;justify-content: flex-start;margin-top: 10px;">
            <!-- <div  style="background: #f8f8f8;color: #777777;margin-right: 6px;font-size: 14px;"></div> -->
            <div style="background: #f8f8f8;color: #777777;margin-right: 6px;font-size: 14px;">{{index.education}}</div>
            <div style="background: #f8f8f8;color: #777777;margin-right: 6px;font-size: 14px;">{{index.experience}}</div>
            <div style="background: #f8f8f8;color: #777777;margin-right: 6px;font-size: 14px;">{{index.jobadd}}</div>
          </div>
          <div>
            <div style="color: #777777;margin-top: 10px;">{{index.jobtime.substring(10,0)}}</div>
          </div>
        </div>
      </div>
      <div v-if="ispositionlist">
        <h4 style="color: #3b3b3b;">公司福利</h4>
        <div style="display: flex;justify-content: flex-start;margin-top: 10px;">
          <div v-for="(index,item) in warelist" style="background: #f8f8f8;color: #777777;margin-right: 8px;font-size: 14px;padding: 5px;">{{index.warfarename}}</div>
          <!-- <div style="background: #f8f8f8;color: #777777;margin-right: 8px;font-size: 14px;padding: 5px;">五险一金</div>
          <div style="background: #f8f8f8;color: #777777;margin-right: 8px;font-size: 14px;padding: 5px;">年终奖励</div>
          <div style="background: #f8f8f8;color: #777777;margin-right: 8px;font-size: 14px;padding: 5px;">双法双休</div> -->
        </div>
        <h4 style="color: #3b3b3b;">企业介绍</h4>
        <div :style="text">
          {{companyprofile}}
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
import axios from 'axios'
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
      companyname:'',
      sectorName:'',
      scale:'',
      develepment:'',
      warelist:[],
      companyprofile:'',
      comppic:'',
      joblist:[],
      text:'width: 340px;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical; -webkit-line-clamp: 3; overflow: hidden;color: #777777;font-size: 14px;line-height: 35px;'
    }
  },
  mounted() {
    console.log(this.$route.query.id)
    axios.defaults.headers.common['authToken'] = localStorage.name
    doGet(`${API_HOST}/api/job/company/getCompanyByCompanyId`,{id:this.$route.query.id}).then(res => {
      if (res) {
        console.log(res)
        this.companyname = res.data.t.companyname
        this.scale = res.data.t.scale
        this.sectorName = res.data.t.sectorName
        this.develepment = res.data.t.develepment
        this.warelist = res.data.t.warelist
        this.companyprofile = res.data.t.companyprofile
        this.comppic = res.data.t.logo
        this.joblist = res.data.t.joblist
        // this.companylist = res.data.list
      }
    })
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
  toDeatilJob(index){
    this.$router.push({path: '/detaliJob',
      query: {
          id: index.jobid
        }
    })
  }
}
}
</script>
<style>
/* @import './style.css'; */
</style>