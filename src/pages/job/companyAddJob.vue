<template>
  <div>
    <van-nav-bar
    title="职位"
    left-text=""
    right-text=""
    left-arrow
    @click-left="onClickLeft"
    />

    <div v-if="listnullshowdis" style="padding: 10px;">
      <h4>已发布职位</h4>
      <div  @click="toDeatilJob(index)" v-for="(index,item) in joblist" style="background: #fff;margin: 0 auto;border-radius: 6px;height: 120px;width: 350px;margin-top: 20px;padding: 8px;">
        <div style="display: flex;justify-content: space-between;">
          <div style="font-size: 18px;font-weight: 550;color: #3b3b3b;">{{index.jobname}}</div><div style="color: #ff887a;font-size: 18px;font-weight: 550;"></div>
        </div>
        <!-- <div style="display: flex;justify-content: flex-start;margin-top: 10px;">
          <div class="jobex">{{index.experience}}</div>
          <div class="jobex"></div>
          <div class="jobex">{{index.education}}</div>
          <div class="jobex">{{index.jobadd}}</div>
        </div> -->
        <div style="display: flex;justify-content: flex-start;margin-top: 10px;">
          <!-- <div  style="background: #f8f8f8;color: #777777;margin-right: 6px;font-size: 14px;"></div> -->
          <div style="background: #f8f8f8;color: #777777;margin-right: 6px;font-size: 14px;">{{index.education}}</div>
          <div style="background: #f8f8f8;color: #777777;margin-right: 6px;font-size: 14px;">{{index.experience}}</div>
          <div style="background: #f8f8f8;color: #777777;margin-right: 6px;font-size: 14px;">{{index.jobadd}}</div>
          <div style="background: #f8f8f8;color: #777777;margin-right: 6px;font-size: 14px;">{{index.salary}}-{{index.salarymax}}</div>
        </div>
        <div>
          <div style="color: #777777;margin-top: 10px;">收到简历：</div>
        </div>
        <div style="height: 2px;border-bottom:  1px solid #eaeaea;margin-top: 10px;"></div>
      </div>
      <div style="display: flex;justify-content: center;align-items: center;">
      <van-button @click = "tosearshperson" style="width: 140px;border-radius: 4px;background: #5aa0ff;border: 0px;height: 40px;margin-top: 10px;" type="info">去简历库</van-button>
    </div>
    </div>
    <div  v-if = "listnullshow">
    <div style="padding: 20px;display: flex;justify-content: center;align-items: center;margin-top: 20px;"><img style="width: 330px;" src="../../../static/img/a.jpg" alt=""></div>
    <div style="display: flex;justify-content: center;align-items: center;">
      <van-button @click="releasejob" style="border-radius: 20px;width: 65%;background: #5aa0ff;" type="info">发职位</van-button>
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
  name: 'companyAddJob',
  data () {
    return {
      joblist:[],
      page:1,
      listnullshow:false,
      listnullshowdis:false,
      companyid:''
    }
  },
  mounted() {
    axios.defaults.headers.common['authToken'] = localStorage.name
    doGet(`${API_HOST}/api/job/job/getCompanyJob`,{uid:localStorage.id}).then(res => {
      if (res) {
        // console.log(res)
        console.log(res.data.list.length)
        if(res.data.list.length === 0){
          
          this.listnullshow = true
          this.listnullshowdis = false
        } else{
          this.companyid = res.data.list[0].companyid
          this.joblist = res.data.list
          this.listnullshow = false
          this.listnullshowdis = true
        }
        
      }
    })
  },
methods: {
  releasejob(){
    axios.defaults.headers.common['authToken'] = localStorage.name
    doGet(`${API_HOST}/api/job/company/getCompanyByUserId`,{uid:localStorage.id}).then(res => {
      if (res.data.code == "200") {
        // localStorage['companyid'] = 
        this.$router.push({path: '/addjob',
        query: {
          companyid: res.data.t.companyid
        }
    
      })
      
        // console.log(res)
        // this.companylist = res.data.list
      } else{
        this.$router.push({path: '/addcompany'})
      }
    })
    
  },
  onClickLeft(){
    this.$router.back()
  },
  tosearshperson(){
    localStorage['companyid'] = this.companyid
    this.$router.push({path: '/resumeDatabase'})
  }
}
}
</script>
<style>
/* @import './style.css'; */
</style>