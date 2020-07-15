<template>
  <div>
    <van-nav-bar
    title="我的简历"
    left-text=""
    right-text=""
    left-arrow
    @click-left="onClickLeft"
    />
    <!-- <embed src="../../../static/img/董傲雪.pdf" type="application/pdf" width="100%" height="100%">  -->
    <div style="padding: 20px;">
      <div @click="tosetminejob" style="display: flex;justify-content: space-between;margin-top: 20px;align-items: center;">
        <div style="display: flex;justify-content: flex-start;">
        <img style="width: 70px;height: 70px;border-radius: 50%;" src="../../../static/img/user2.jpg" alt="">
        <div style="margin-left: 20px;">
          <div style="font-size: 20px;font-weight: 550;">{{uname}}</div>
          <div style="font-size: 17px;margin-top: 5px;">{{expectwork}}</div>
          <div style="font-size: 14px;color: #747273;margin-top: 2px;">{{age}}岁 工作{{workexperience}}年 {{education}}</div>
        </div>
      </div>
      <div>
        <van-icon name="arrow" />
      </div>
      </div>
      <div style="height: 2px;border-bottom:  1px solid #eaeaea;margin-top: 20px;"></div>
      <div style="display: flex;justify-content: space-between;align-items: center;">
        <h3>
          教育经历
        </h3>
        <div><van-icon @click="toeducation" size=20 name="add-o" /></div>
      </div>
      <div v-for="(index,item) in schoolList" style="margin-top: 10px;">
      <div  style="display: flex;justify-content: space-between;align-items: center;">
        <div style="display: flex;justify-content: flex-start;align-items: center;">
        <img style="width: 50px;height: 50px;border-radius: 50%;" src="../../../static/img/user2.jpg" alt="">
        <div style="margin-left: 20px;">
          <div style="font-size: 18px;font-weight: 500;">{{index.name}}</div>
          <div style="font-size: 15px;margin-top: 5px;color: #747273;">{{index.education}}.{{index.major}}</div>
          <div style="font-size: 14px;color: #747273;margin-top: 2px;">{{index.addTime.substring(7,0)}}|{{index.endDate.substring(7,0)}}</div>
        </div>
      </div>
      <div><van-icon name="arrow" /></div>
      </div>
      <div style="height: 2px;border-bottom:1px solid #eaeaea;margin-top: 20px;"></div>
    </div>
      <div style="display: flex;justify-content: space-between;align-items: center;">
        <h3>
          工作经历
        </h3>
        <div><van-icon @click="tojobposation" size=20 name="add-o" /></div>
      </div>
      <div v-for="(index,item) in beforeList">
      <div style="display: flex;justify-content: space-between;align-items: center;">
        <div>
          <div style="font-size: 18px;font-weight: 500;">{{index.company}}</div>
          <div style="font-size: 15px;margin-top: 5px;color: #747273;">{{index.jobexp}}</div>
          <div style="font-size: 14px;color: #747273;margin-top: 2px;">{{index.startDate.substring(7,0)}}|{{index.endDate.substring(7,0)}}</div>
        </div>
        <div><van-icon  name="arrow" /></div>
      </div>
      <div style="height: 2px;border-bottom:  1px solid #eaeaea;margin-top: 20px;"></div>
    </div>
    <div style="display: flex;justify-content: space-between;align-items: center;">
      <h3>
        期望工作
      </h3>
      <div><van-icon @click="towantjob" name="arrow" /></div>
    </div>
      <div>{{expectwork}}</div>
      <div style="font-size: 14px;color: #747273;margin-top: 5px;">{{expectworksalary}} {{expectworkcity}}</div>
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
  name: 'perfectResume',
  data () {
    return {
      uname:'',
      workexperience:'',
      education:'',
      schoolList:[],
      expectwork:'',
      age:'',
      beforeList:[],
      expectworkcity:'',
      expectwork:'',
      expectworksalary:''
    }
  },
  mounted() {
    axios.defaults.headers.common['authToken'] = localStorage.name
    doGet(`${API_HOST}/api/job/resumeUser/getResumeById`,{}).then(res => {
      if (res.data.code =="200") {
        console.log(res.data.t.uname)
        this.uname = res.data.t.resume.uname
        this.workexperience = res.data.t.resume.workexperience
        this.education = res.data.t.resume.education
        this.expectwork = res.data.t.resume.expectwork
        this.schoolList = res.data.t.schoolList
        this.beforeList = res.data.t.beforeList
        this.age = res.data.t.resume.age
        this.expectworkcity = res.data.t.resume.expectworkcity
        this.expectwork = res.data.t.resume.expectwork
        this.expectworksalary = res.data.t.resume.expectworksalary
      }
    })
  },
  methods: {
    onClickLeft(){
      this.$router.push({path: '/mineJob'})
    },
    toeducation(){
      this.$router.push({path: '/education'})
    },
    towantjob(){
      this.$router.push({path: '/wantjob'})
    },
    tojobposation(){
      // console,log('2222')
      this.$router.push({path: '/workExperience'})
    },
    tosetminejob(){
      this.$router.push({path: '/setminejob'})
    }
  }
}
</script>
<style>
/* @import './style.css'; */
</style>