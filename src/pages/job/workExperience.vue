<template>
  <div>
    <van-nav-bar
    title="工作经历"
    left-text=""
    right-text=""
    left-arrow
    @click-left="onClickLeft"
    />
    <div>
    <van-field
    v-model="valuecompy"
    label="公司名称"
    style="height: 60px;line-height: 60px;font-size: 16px;"
    placeholder="请填写"
    />
    <van-field
    v-model="sector"
    label="所属行业"
    style="height: 60px;line-height: 60px;font-size: 16px;"
    placeholder="请填写"
    />
    <van-field
    v-model="jobexp"
    label="职业名称"
    style="height: 60px;line-height: 60px;font-size: 16px;"
    placeholder="请填写"
    />
    <van-field
    v-model="department"
    label="所属部门"
    style="height: 60px;line-height: 60px;font-size: 16px;"
    placeholder="请填写"
    />
    <van-field
    v-model="nature"
    label="企业性质"
    style="height: 60px;line-height: 60px;font-size: 16px;"
    placeholder="请填写"
    />
    <van-field
    v-model="scale"
    label="公司规模"
    style="height: 60px;line-height: 60px;font-size: 16px;"
    placeholder="请填写"
    />
    <van-field
    v-model="startDate"
    label="入职时间"
    style="height: 60px;line-height: 60px;font-size: 16px;"
    placeholder="请填写"
    />
    <van-field
    v-model="endDate"
    label="离职时间"
    style="height: 60px;line-height: 60px;font-size: 16px;"
    placeholder="请填写"
    />
    <van-field
    v-model="jobContent"
    label="工作职责"
    style="height: 60px;line-height: 60px;font-size: 16px;"
    placeholder="请填写"
    />
  <!-- <div style="height: 2px;border-bottom:  1px solid #eaeaea;margin-top: 20px;"></div> -->
    </div>
    <div style="display: flex;justify-content: center;align-items: center;margin-top: 40px;">
      <van-button @click="tosavebefore" style="border-radius: 20px;width: 40%;" type="info">确定</van-button>
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
  name: 'workExperience',
  data () {
    return {
      valuecompy:'',
      jobexp:'',
      department:'',
      sector:'',
      nature:'',
      scale:'',
      jobContent:'',
      startDate:'',
      endDate:''
    }
  },
  methods: {
    tosavebefore(){
      axios.defaults.headers.common['authToken'] = localStorage.name
      doPost(`${API_HOST}/api/job/resumeUser/createResumeBefore`,
       {company:this.valuecompy,jobexp:this.jobexp,department:this.department,sector:this.sector,nature:this.nature,scale:this.scale,jobContent:this.jobContent,startDate:this.startDate,endDate:this.endDate}).then(res => {
      console.log(res.data.code)
      if (res.data.code == 200) {
        Toast.success('提交成功')
        this.$router.push({path: '/perfectResume'})
      } else {
        Toast.fail('失败，请重试')
      }
    })
    },
    onClickLeft(){
      this.$router.back()
    }
  }
}
</script>
<style>

</style>