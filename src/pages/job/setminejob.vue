<template>
  <div>
    <van-nav-bar
    title="个人设置"
    left-text=""
    right-text=""
    left-arrow
    @click-left="onClickLeft"
    />
  <div @click="topushheaderpic" style="display: flex;justify-content: center;align-items: center;margin-top: 20px;">
    <img style="width: 70px;height: 70px;border-radius: 50%;" src="../../../static/img/user2.jpg" alt="">

  </div>
  <!-- <div @click="topushheaderpic" style="display: flex;justify-content: center;align-items: center;color: #b0acad;font-size: 12px;margin-top: 10px;">
    上传头像
    <van-icon name="edit" /> -->
  <!-- </div> -->
    <div>
    <van-field
    v-model="valuename"
    label="真实姓名"
    style="height: 60px;line-height: 60px;font-size: 16px;"
    placeholder="请填写"
    />
    <van-field
    v-model="valuesex"
    label="性别"
    style="height: 60px;line-height: 60px;font-size: 16px;"
    placeholder="请填写"
    />
    <div @click="showjobeducation" style="height: 30px;line-height: 70px;
    font-size: 16px;padding: 26px 16px 8px 16px ;line-height: 28px;display: flex;justify-content: flex-start;align-items: center;">
      <div>学历</div>
      <div style="margin-left: 56px;">{{jobeducation}}</div></div>
      <div style="height: 2px;border-bottom:  1px solid #f5f6f7;margin-top: 0px;margin-left: 16px;"></div>
    <!-- <van-field @click="showcompnydevelopment"  style="height: 60px;line-height: 60px;font-size: 16px;" label="发展阶段" value="请选择" readonly /> -->
    <van-popup  v-model="ifjobeducation" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns1"
        @cancel="ifjobeducation = false"
        @confirm="onConfirm1"
      />
    </van-popup>
    <van-field
    v-model="valueform"
    label="工作经验年限"
    type="digit"
    style="height: 60px;line-height: 60px;font-size: 16px;"
    placeholder="请填写"
    />
    <van-field
    v-model="valuestat"
    label="开始时间"
    style="height: 60px;line-height: 60px;font-size: 16px;"
    placeholder="请填写"
    />
    <van-field
    v-model="valueover"
    label="结束时间"

    style="height: 60px;line-height: 60px;font-size: 16px;"
    placeholder="请填写"
    />
    <van-field
    v-model="valueborn"
    type="digit"
    label="年龄"
    style="height: 60px;line-height: 60px;font-size: 16px;"
    placeholder="请填写"
    />
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
    <van-field
    v-model="valuework"
    label="参加工作"
    style="height: 60px;line-height: 60px;font-size: 16px;"
    placeholder="请填写"
    />
    <van-field
    v-model="valuetel"
    label="手机号"
    style="height: 60px;line-height: 60px;font-size: 16px;"
    placeholder="请填写"
    />
    <van-field
    v-model="valueemil"
    label="邮箱"
    style="height: 60px;line-height: 60px;font-size: 16px;"
    placeholder="请填写"
    />
    <van-field
    v-model="valumoney"
    label="当前年薪"
    style="height: 60px;line-height: 60px;font-size: 16px;"
    placeholder="请填写"
    />
  <!-- <div style="height: 2px;border-bottom:  1px solid #eaeaea;margin-top: 20px;"></div> -->
    </div>
    <div style="display: flex;justify-content: center;align-items: center;margin-top: 40px;">
      <van-button @click="surepersonal" style="border-radius: 20px;width: 40%;" type="info">确定</van-button>
    </div>
    <!-- <div></div> -->
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
  name: 'setminejob',
  data () {
    return {
      valuename:'',
      valuesex:'',
      valuestate:'',
      valueform:'',
      valueborn:'',
      valuework:'',
      valumoney:'',
      valuetel:'',
      valueemil:'',
      // valumoney:'',
      jobeducation:'请选择',
      ifjobeducation:false,
      columns1:['高中','大专','本科','研究生','硕士','博士'],
      showjob:false,
      jobtype:'请选择',
      columns:[   { text: '全职' , value: 1 },{ text: '兼职' , value: 2 },{ text: '实习' , value: 3 }],
      jobtypevalue:0,
      valuestat:'',
      valueover:''

    }
  },
  methods: {
    onClickLeft(){
      this.$router.back()
    },
    topushheaderpic(){

    },
    surepersonal(){
      axios.defaults.headers.common['authToken'] = localStorage.name
      doPost(`${API_HOST}/api/job/resumeUser/createResumeBasic`,
       {uname:this.valuename,sex:this.valuesex,education:this.jobeducation,workexperience:this.valueform,
        age:this.valueborn,tel:this.valuetel,email:this.valueemil,atMoney:this.valumoney,needJobState:this.jobtypevalue,birtime:this.valuestat,worktime:this.valueover}).then(res => {
      console.log(res.data.code)
      if (res.data.code == 200) {
        Toast.success('提交成功')
        this.$router.push({path: '/perfectResume'})
      } else {
        Toast.fail('失败，请重试')
      }
    })
    },
    showjobeducation(){
      this.ifjobeducation = true
    },
    onConfirm1(value){
      this.jobeducation = value
      this.ifjobeducation = false
    },
    showjobtype(){
      this.showjob = true
    },
    onConfirm(value){
      console.log(value)
      this.jobtype=value.text
      this.jobtypevalue = value.value
      this.showjob = false
    }

  }
}
</script>
<style>

</style>