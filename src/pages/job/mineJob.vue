<template>
  <div>
    <van-nav-bar
    title="我的"
    left-text=""
    right-text=""
    left-arrow
    @click-left="onClickLeft"
    />
    <div style="padding: 20px;">
      <div style="display: flex;justify-content: flex-start;margin-top: 20px;">
        <img style="width: 70px;height: 70px;border-radius: 50%;" src="../../../static/img/user2.jpg" alt="">
        <div style="margin-left: 20px;">
          <div style="font-size: 20px;font-weight: 550;">{{uname}}</div>
          <div style="font-size: 17px;margin-top: 5px;">{{expectwork}}</div>
          <div style="font-size: 14px;color: #747273;margin-top: 2px;">{{age}}岁 工作{{workexperience}}年 {{education}}</div>
        </div>
      </div>
      <div style="height: 2px;border-bottom:  1px solid #eaeaea;margin-top: 20px;"></div>
      <div style="font-size: 18px;margin-top: 20px;color: #3b3b3b;">
        我的简历
      </div>
      <div style="color: #b0acad;font-size: 16px;margin-top: 10px;">
        完善简历提高您的录取率
      </div>
      <div 
      @click="toperfectResume" 
      style="height: 30px;color: #ff887a;text-align: center;width: 80px;
      border-radius: 4px;
      border: 1px solid #ff887a;
      line-height: 30px;font-size: 15px;margin-top: 10px;font-weight: 600;">
      去完善
      </div>
      <div style="height: 2px;border-bottom:  1px solid #eaeaea;margin-top: 20px;"></div>
      <div style="display: flex;justify-content: flex-start;align-items: center;padding: 20px;margin-top: 20px;">
        <div style="display: flex;justify-content: center;align-items: center;flex-wrap: wrap;width: 40px;">
          <div style="color: #b0acad;font-size: 15px;">
            {{collectNum}}
          </div>
          <div style="font-size: 16px;font-weight: 600;margin-top: 10px;color: #3a3a3a;">收藏</div>
        </div>
        <!-- <div style="display: flex;justify-content: center;align-items: center;flex-wrap: wrap;width: 40px;">
          <div style="color: #b0acad;font-size: 15px;">
            18
          </div>
          <div style="font-size: 16pxfont-weight: 600;margin-top: 10px;color: #3a3a3a;">关注</div>
        </div>
        <div style="display: flex;justify-content: center;align-items: center;flex-wrap: wrap;width: 70px;">
          <div style="color: #b0acad;font-size: 15px;">
            18
          </div>
          <div style="font-size: 16px;font-weight: 600;margin-top: 10px;color: #3a3a3a;">最近浏览</div>
        </div> -->
        <div style="display: flex;justify-content: center;align-items: center;flex-wrap: wrap;width: 70px;">
          <div style="color: #b0acad;font-size: 15px;">
            {{jonNum}}
          </div>
          <div style="font-size: 16px;font-weight: 600;margin-top: 10px;color: #3a3a3a;">应聘记录</div>
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
import { Icon } from 'vant'
import axios from 'axios'
Vue.use(Icon)
Vue.use(Image)
Vue.use(Field)
Vue.use(NavBar)
Vue.use(Toast)
Vue.use(Button)
export default {
  name: 'MineJob',
  data () {
    return {
      uname:'',
      workexperience:'',
      education:'',
      expectwork:'',
      age:'',
      jonNum:'',
      collectNum:''
    }
  },
  mounted() {
    axios.defaults.headers.common['authToken'] = localStorage.name
    doGet(`${API_HOST}/api/job/resumeUser/getResumeById`,{}).then(res => {
      if (res.data.code == "200") {
        console.log(res.data.t.uname)
        this.uname = res.data.t.resume.uname
        this.workexperience = res.data.t.resume.workexperience
        this.education = res.data.t.resume.education
        this.expectwork = res.data.t.resume.expectwork
        this.age = res.data.t.resume.age
        // this.schoolList = res.data.t.schoolList
      }
    })
    // axios.defaults.headers.common['authToken'] = localStorage.name
    doGet(`${API_HOST}/api/job/resumeUser/geMyInfo`,{uid:localStorage.id}).then(res => {
      if (res) {
        this.jonNum = res.data.t.jonNum
        this.collectNum = res.data.t.collectNum
      }
    })
  },
  methods: {
    onClickLeft(){
      this.$router.push({path: '/joblist'})
    },
    toperfectResume(){
      this.$router.push({path: '/perfectResume'})
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