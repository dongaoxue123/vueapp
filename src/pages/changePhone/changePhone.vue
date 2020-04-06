<template>
  <div>
    <van-nav-bar
        title="修改手机号"
        left-text="返回"
        right-text=""
        left-arrow
        @click-left="onClickLeft"
      
    /> 
    <van-cell-group>
      <van-field
        v-model="phone"
        label="手机号"
        placeholder="请输新入手机号"
        @input = phoneValue
      />
      <van-field
        v-model="sms"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
        @input = "passwordValue"
      >
        <van-button v-if="!iscode" @click="tosendmunber" color="#5ca3ff" slot="button" size="small" type="primary">发送验证码{{showtime}}</van-button>
        <van-button v-if="iscode"  color="#5ca3ff" slot="button" size="small" type="primary">{{showtime}}</van-button>
      </van-field>
    </van-cell-group>
    <div class="butlogin"><van-button @click="tologin" style="border-radius:10px 10px 10px 10px;width:80%;margin-top:20px;" color="#5ca3ff" type="info">确认</van-button></div>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
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
  name: 'ChangePhone',
  data () {
    return {
      phone:'',
      code: '',
      timeCounter: null,
      iscode: false,
      showtime: null
    }
  },
methods: {
  countDownText(s) {
  this.showtime = `${s}s后重新获取`
  if (s === 0) {
    this.iscode= false
  }
 },
  countDown(times) {
    const self = this;
    const interval = 1000;
    let count = 0;
    self.timeCounter = setTimeout(countDownStart, interval);
    function countDownStart() {
    if (self.timeCounter == null) {
      this.iscode= false
      return false;
    }
    count++
    self.countDownText(times - count + 1);
    if (count > times) {
    clearTimeout(self.timeCounter)
    self.showtime = null;
    this.iscode= false
    } else {
    self.timeCounter = setTimeout(countDownStart, interval)
    }
  }
 },
  onClickLeft() {
    this.$router.push({path: '/setIformation'})
    
  },
  // onClickRight() {
  //   this.$router.push({path: '/password'})
  // },
  phoneValue (value) {
    console.log (value)
    this.value = value
  },
  passwordValue (value) {
    console.log (value)
    this.code = value
  },
  tosendmunber () {
    doGet(`${API_HOST}/api/club/user/sendSms`, {phone:this.phone}).then(res => {
      if (res) {
        this.iscode= true
        this.countDown(60)
        console.log(res.data)
      }
    })
  },
  tologin () {
    if(!(/^1[3456789]\d{9}$/.test(this.value))){ 
      Toast.fail('手机号码有误，请重填')
      return false
    }  else {
    axios.defaults.headers.common['authToken'] = localStorage.name
    doPost(`${API_HOST}/api/club/user/updatePhone`, {phone:this.phone,code:this.code,uid: localStorage.id}).then(res => {
      if (res) {
        console.log(res.data)
        // localStorage.setItem(JSON.stringify({'authToken':res.data.t.authToken}))
        // localStorage.name
        // localStorage['name'] = res.data.t.authToken
        // localStorage['id'] = res.data.t.user.uid
        // localStorage['userid'] = res.data.t.user.urId
        // localStorage['roleid'] = res.data.t.roleid
        
        // console.log(localStorage.name)
        // store.commit('login', {userId: res.data.t.authToken})
        Toast.success('修改成功')
        this.$router.push({path: '/setIformation'})
      }
    })
  }
  }
}
}
</script>
<style>
/* @import './style.css'; */
</style>