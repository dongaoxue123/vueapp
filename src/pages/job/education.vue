<template>
  <div>
    <van-nav-bar
    title="教育经历"
    left-text=""
    right-text=""
    left-arrow
    @click-left="onClickLeft"
    />
    <div>
      <!-- <van-field
      readonly
      clickable
      label="学校名称"
      :value="value"
      placeholder="选择学校"
      @click="showPicker = true"
    /> -->
    <van-field
    v-model="valueschool"
    label="学校名称"
    style="height: 60px;line-height: 60px;font-size: 16px;"
    placeholder="选择学校"
    />
    <van-field
    v-model="valueeducation"
    label="学历"
    style="height: 60px;line-height: 60px;font-size: 16px;"
    placeholder="请填写"
    />
    <van-field
    v-model="valuemajor"
    label="我的专业"
    style="height: 60px;line-height: 60px;font-size: 16px;"
    placeholder="请填写"
    />
    <!-- <van-field
    v-model="value"
    label="入学时间"
    style="height: 60px;line-height: 60px;font-size: 16px;"
    placeholder="请填写"
    /> -->
    <div @click="showjobtype" 
    style="height: 30px;line-height: 70px;
    font-size: 16px;padding: 26px 16px 8px 16px ;line-height: 28px;
    display: flex;justify-content: flex-start;align-items: center;">
      <div>入学时间</div>
      <div style="margin-left: 26px;">{{jobtype}}</div></div>
      <div style="height: 2px;border-bottom:  1px solid #f5f6f7;margin-top: 0px;margin-left: 16px;"></div>
    <!-- <van-field @click="showcompnydevelopment"  style="height: 60px;line-height: 60px;font-size: 16px;" label="发展阶段" value="请选择" readonly /> -->
    <van-popup  v-model="showjob" round position="bottom">
        <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="showjob = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <!-- <van-field
    v-model="value"
    label="毕业时间"
    style="height: 60px;line-height: 60px;font-size: 16px;"
    placeholder="请填写"
    /> -->
    <div @click="showendDate" style="height: 30px;line-height: 70px;
    font-size: 16px;padding: 26px 16px 8px 16px ;line-height: 28px;display: flex;justify-content: flex-start;align-items: center;">
      <div>毕业时间</div>
      <div style="margin-left: 26px;">{{endDate}}</div></div>
      <div style="height: 2px;border-bottom:  1px solid #f5f6f7;margin-top: 0px;margin-left: 16px;"></div>
    <!-- <van-field @click="showcompnydevelopment"  style="height: 60px;line-height: 60px;font-size: 16px;" label="发展阶段" value="请选择" readonly /> -->
    <van-popup  v-model="showjobendDate" round position="bottom">
        <van-datetime-picker
        v-model="currentendDate"
        type="date"
        title="选择年月日"
        :min-date="minDate1"
        :max-date="maxDate1"
        @cancel="showjobendDate = false"
        @confirm="onConfirm1"
      />
    </van-popup>
  <!-- <div style="height: 2px;border-bottom:  1px solid #eaeaea;margin-top: 20px;"></div> -->
    </div>
    <div style="display: flex;justify-content: center;align-items: center;margin-top: 40px;">
      <van-button @click="surepersonal" style="border-radius: 20px;width: 40%;" type="info">确定</van-button>
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
  name: 'education',
  data () {
    return {
      minDate: new Date(2000, 0, 1),
      maxDate: new Date(2025, 10, 1),
      minDate1: new Date(2000, 0, 1),
      maxDate1: new Date(2025, 10, 1),
      currentDate: new Date(),
      currentendDate:new Date(),
      showjob:false,
      jobtype:'请选择',
      endDate:'请选择',
      valueschool:'',
      valueeducation:'',
      valuemajor:'',
      showjobendDate:false
    }
  },
  methods: {
    surepersonal(){
      axios.defaults.headers.common['authToken'] = localStorage.name
      doPost(`${API_HOST}/api/job/resumeUser/createResumeSchool`,
        {name:this.valueschool,major:this.valuemajor,education:this.valueeducation,startDate:this.jobtype,
          endDate:this.endDate}).then(res => {
        console.log(res.data.code)
        if (res.data.code == 200) {
          Toast.success('提交成功')
          this.$router.push({path: '/perfectResume'})
        } else {
          Toast.fail('失败，请重试')
        }
      })
    },
    formatDate: function(d) {
      return d.getFullYear() + '-' + this.p1((d.getMonth() + 1)) + '-' + this.p1(d.getDate())
    },
    p(s) {
      return s < 10 ? '0' + s : s
    },
    formatDate1: function(d) {
      return d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
    },
    p1(s) {
      return s < 10 ? '0' + s : s
    },
    onClickLeft(){
      this.$router.back()
    },
    showjobtype(){
      this.showjob = true
    },
    showendDate(){
      this.showjobendDate = true
    },
    onConfirm(d){
      this.jobtype = this.formatDate(d)
      this.showjob = false
      console.log(jobtype)
      // this.jobtype=value.text
      // this.jobtypevalue = value.value
      // this.showjob = false
    },
    onConfirm1(d){
      this.endDate = this.formatDate1(d)
      this.showjobendDate = false
      console.log(endDate)
      // this.jobtype=value.text
      // this.jobtypevalue = value.value
      // this.showjob = false
    }
  }
}
</script>
<style>

</style>