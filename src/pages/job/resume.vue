<template>
  <div>
    <van-nav-bar
    title="简历"
    left-text=""
    right-text=""
    left-arrow
    @click-left="onClickLeft"
    />
    <div style="padding: 20px;">
      <div style="display: flex;justify-content: space-between;margin-top: 20px;align-items: center;">
        <div style="display: flex;justify-content: flex-start;">
        <img style="width: 70px;height: 70px;border-radius: 50%;" src="../../../static/img/user2.jpg" alt="">
        <div style="margin-left: 20px;">
          <div style="font-size: 20px;font-weight: 550;">{{uname}}</div>
          <div style="font-size: 17px;margin-top: 5px;">{{expectwork}}</div>
          <div style="font-size: 14px;color: #747273;margin-top: 2px;">{{age}}岁 工作{{workexperience}}年 {{education}}</div>
        </div>
      </div>
      <div>
      </div>
      </div>
      <div style="height: 2px;border-bottom:1px solid #eaeaea;margin-top: 20px;"></div>
      <h3>
        联系方式
      </h3>
      <div>{{email}}</div>
      <div>{{tel}}</div>
      <div style="height: 2px;border-bottom:  1px solid #eaeaea;margin-top: 20px;"></div>
      <div style="display: flex;justify-content: space-between;align-items: center;">
        <h3>
          教育经历
        </h3>
        <div></div>
      </div>
      <div v-for="(index,item) in schoolList">
      <div  style="display: flex;justify-content: space-between;align-items: center;margin-top: 10px;">
        <div style="display: flex;justify-content: flex-start;align-items: center;">
        <img style="width: 50px;height: 50px;border-radius: 50%;" src="../../../static/img/user2.jpg" alt="">
        <div style="margin-left: 20px;">
          <div style="font-size: 18px;font-weight: 500;">{{index.name}}</div>
          <div style="font-size: 15px;margin-top: 5px;color: #747273;">{{index.education}}.{{index.major}}</div>
          <div style="font-size: 14px;color: #747273;margin-top: 2px;">{{index.startDate.substring(7,0)}}|{{index.endDate.substring(7,0)}}</div>
        </div>
      </div>
      <div></div>
      </div>
      <div style="height: 2px;border-bottom:  1px solid #eaeaea;margin-top: 20px;"></div>
    </div>
      <div style="display: flex;justify-content: space-between;align-items: center;">
        <h3>
          工作经历
        </h3>
        <div></div> 
      </div>
      <div v-for="(index,item) in beforeList">
      <div style="display: flex;justify-content: space-between;align-items: center;">
        <div>
          <div style="font-size: 18px;font-weight: 500;">{{index.company}}</div>
          <div style="font-size: 15px;margin-top: 5px;color: #747273;">{{index.jobexp}}</div>
          <div style="font-size: 14px;color: #747273;margin-top: 2px;">{{index.startDate.substring(7,0)}}|{{index.endDate.substring(7,0)}}</div>
        </div>
        <div></div>
      </div>
      <div style="height: 2px;border-bottom:  1px solid #eaeaea;margin-top: 20px;"></div>
      <div style="display: flex;justify-content: center;align-items: center;">
        <van-button @click = "tosearshperson" style="width: 140px;border-radius: 4px;background: #5aa0ff;border: 0px;height: 40px;margin-top: 10px;" type="info">发送面试邀请</van-button>
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
      resume:[],
      uname:'',
      expectwork:'',
      age:'',
      workexperience:'',
      education:'',
      email:'',
      tel:'',
      schoolList:[],
      resumeid:''
    }
  },
  mounted() {
    axios.defaults.headers.common['authToken'] = localStorage.name
    doGet(`${API_HOST}/api/job/resumeUser/getResume`,{id:this.$route.query.id}).then(res => {
      if (res) {
        // console.log(res)
        this.uname = res.data.t.resume.uname
        this.expectwork = res.data.t.resume.expectwork
        this.age = res.data.t.resume.age
        this.workexperience = res.data.t.resume.workexperience
        this.education = res.data.t.resume.education
        this.email = res.data.t.resume.email
        this.resumeid = res.data.t.resume.id
        this.tel = res.data.t.resume.tel
        this.schoolList = res.data.t.schoolList
        this.beforeList = res.data.t.beforeList
      }
    })
  },
  methods: {
    onClickLeft(){
      this.$router.back()
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
    },
    tosearshperson(){
      axios.defaults.headers.common['authToken'] = localStorage.name
      doPost(`${API_HOST}/api/job/resumeCompany/sendResumeInvite`,
       {companyid:localStorage.companyid,resumeid:this.resumeid,uid:localStorage.id}).then(res => {
      // console.log(res.data.code)
      if (res.data.code == "200") {
        Toast.success('发送成功')
        // this.$router.push({path: '/companyAddJob'})
      } else {
        Toast.fail('失败，请重试')
      }
    })
    }
  }
}
</script>
<style>
/* @import './style.css'; */
</style>