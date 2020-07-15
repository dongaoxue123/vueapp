<template>
  <div>
    <van-nav-bar
    title="期望工作"
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
    v-model="value1"
    label="期望城市"
    style="height: 60px;line-height: 60px;font-size: 16px;"
    placeholder="请填写"
    />
    <van-field
    v-model="value2"
    label="期望职位"
    style="height: 60px;line-height: 60px;font-size: 16px;"
    placeholder="请填写"
    />
    <van-field
    v-model="value3"
    label="期望薪水"
    style="height: 60px;line-height: 60px;font-size: 16px;"
    placeholder="请填写"
    />
    <!-- <van-field
    v-model="value4"
    label="工作形式"
    style="height: 60px;line-height: 60px;font-size: 16px;"
    placeholder="请填写"
    /> -->
    <div @click="showjobtype" style="height: 30px;line-height: 70px;
    font-size: 16px;padding: 26px 16px 8px 16px ;line-height: 28px;display: flex;justify-content: flex-start;align-items: center;">
      <div>工作形式</div>
      <div style="margin-left: 26px;">{{jobtype}}</div></div>
      <div style="height: 2px;border-bottom:  1px solid #f5f6f7;margin-top: 0px;margin-left: 16px;"></div>
    <!-- <van-field @click="showcompnydevelopment"  style="height: 60px;line-height: 60px;font-size: 16px;" label="发展阶段" value="请选择" readonly /> -->
    <van-popup  v-model="showjob" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showjob = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <div @click="showjobtime" style="height: 30px;line-height: 70px;
    font-size: 16px;padding: 26px 16px 8px 16px ;line-height: 28px;display: flex;justify-content: flex-start;align-items: center;">
      <div>到岗时间</div>
      <div style="margin-left: 26px;">{{jobtime}}</div></div>
      <div style="height: 2px;border-bottom:  1px solid #f5f6f7;margin-top: 0px;margin-left: 16px;"></div>
    <!-- <van-field @click="showcompnydevelopment"  style="height: 60px;line-height: 60px;font-size: 16px;" label="发展阶段" value="请选择" readonly /> -->
    <van-popup  v-model="ifjobtime" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns2"
        @cancel="ifjobtime = false"
        @confirm="onConfirm2"
      />
    </van-popup>
  <!-- <div style="height: 2px;border-bottom:  1px solid #eaeaea;margin-top: 20px;"></div> -->
    </div>
    <div style="display: flex;justify-content: center;align-items: center;margin-top: 40px;">
      <van-button @click="pushwantjob" style="border-radius: 20px;width: 40%;" type="info">确定</van-button>
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
import { Picker } from 'vant'
Vue.use(Picker)
Vue.use(Image)
Vue.use(Field)
Vue.use(NavBar)
Vue.use(Toast)
Vue.use(Button)
export default {
  name: 'wantjob',
  data () {
    return {
      value1:'',
      value2:'',
      value3:'',
      value4:'',
      value5:'',
      showjob:false,
      jobtype:'请选择',
      columns:[{ text: '全职' , value: 1 },{ text: '兼职' , value: 2 },{ text: '实习' , value: 3 }],
      columns2:[{ text: '随时' , value: 1 },{ text: '一周内' , value: 2 },{ text: '一月内' , value: 3 },{ text: '三月内' , value: 4 },{ text: '待定' , value: 5 }],
      jobtypevalue:0,
      ifjobtime:false,
      jobtime:'请选择',
      jobtimevalue:0
    }
  },
  methods: {
    showjobtime(){
      this.ifjobtime = true
    },
    onClickLeft(){
      this.$router.back()
    },
    pushwantjob(){
      axios.defaults.headers.common['authToken'] = localStorage.name
      doPost(`${API_HOST}/api/job/resumeUser/updateResumeExpect`,
       {expectworkcity:this.value1,expectnature:this.jobtypevalue,expectwork:this.value2,expectworksalary:this.value3,comeDate:this.jobtimevalue}).then(res => {
      console.log(res.data.code)
      if (res.data.code == 200) {
        Toast.success('提交成功')
        this.$router.push({path: '/perfectResume'})
      } else {
        Toast.fail('失败，请重试')
      }
    })
    },
    showjobtype(){
      this.showjob = true
    },
    onConfirm(value){
      console.log(value)
      this.jobtype=value.text
      this.jobtypevalue = value.value
      this.showjob = false
    },
    onConfirm2(value){
      this.jobtime=value.text
      this.jobtimevalue = value.value
      this.ifjobtime = false
    }
  }
}
</script>
<style>

</style>