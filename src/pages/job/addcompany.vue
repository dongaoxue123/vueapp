<template>
  <div>
    <van-nav-bar
    title="公司信息"
    left-text=""
    right-text=""
    left-arrow
    @click-left="onClickLeft"
    />
  <!-- <div @click="topushheaderpic" style="display: flex;justify-content: center;align-items: center;margin-top: 20px;">
    <img style="width: 70px;height: 70px;border-radius: 50%;" src="../../../static/img/user2.jpg" alt="">

  </div>
  <div @click="topushheaderpic" style="display: flex;justify-content: center;align-items: center;color: #b0acad;font-size: 12px;margin-top: 10px;">
    上传头像
    <van-icon name="edit" />
  </div> -->
    <div>
    <van-field
    v-model="value1"
    label="公司名称"
    style="height: 60px;line-height: 60px;font-size: 16px;"
    placeholder="请填写"
    />
    <!-- <van-field
    v-model="value"
    label="公司logo"
    style="height: 60px;line-height: 60px;font-size: 16px;"
    placeholder="请上传"
    /> -->
    <van-field @click="topushlogo"  style="height: 60px;line-height: 60px;font-size: 16px;" label="公司logo" value="请上传" readonly />
    <!-- <van-field   style="height: 60px;line-height: 60px;font-size: 16px;" label="公司规模" :valuesize="valuesize1" readonly /> -->
    <div @click="showcompnysize" 
    style="height: 30px;line-height: 70px;
    font-size: 16px;padding: 26px 16px 8px 16px ;
    line-height: 28px;display: flex;justify-content: flex-start;align-items: center;">
      <div>公司规模</div>
      <div style="margin-left: 26px;">{{valuesize}}</div></div>
    <div style="height: 2px;border-bottom:  1px solid #f5f6f7;margin-top: 0px;margin-left: 16px;"></div>
    <van-popup  v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <!-- <van-field
    v-model="value"
    label="公司规模"
    style="height: 60px;line-height: 60px;font-size: 16px;"
    placeholder="请填写"
    /> -->
    <!-- <van-field
    v-model="value"
    label="发展阶段"
    style="height: 60px;line-height: 60px;font-size: 16px;"
    placeholder="请填写"
    /> -->
    <div @click="showcompnydevelopment" style="height: 30px;line-height: 70px;
    font-size: 16px;padding: 26px 16px 8px 16px ;line-height: 28px;display: flex;justify-content: flex-start;align-items: center;">
      <div>发展阶段</div>
      <div style="margin-left: 26px;">{{valuesize1}}</div></div>
      <div style="height: 2px;border-bottom:  1px solid #f5f6f7;margin-top: 0px;margin-left: 16px;"></div>
    <!-- <van-field @click="showcompnydevelopment"  style="height: 60px;line-height: 60px;font-size: 16px;" label="发展阶段" value="请选择" readonly /> -->
    <van-popup  v-model="showPicker1" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns1"
        @cancel="showPicker1 = false"
        @confirm="onConfirm1"
      />
    </van-popup>
    <!-- <van-field
    v-model="value2"
    label="所属行业"
    style="height: 60px;line-height: 60px;font-size: 16px;"
    placeholder="请填写"
    /> -->
    <van-field
    v-model="value3"
    label="公司地点"
    style="height: 60px;line-height: 60px;font-size: 16px;"
    placeholder="请填写"
    />
    <van-field
    v-model="value4"
    label="联系电话"
    style="height: 60px;line-height: 60px;font-size: 16px;"
    placeholder="请填写"
    />
    <!-- <van-field
    v-model="value"
    label="公式简介"
    style="height: 60px;line-height: 60px;font-size: 16px;"
    placeholder="请填写"
    /> -->
    <van-field
      v-model="message"
      style="font-size: 16px;margin-top: 10px;"
      rows="2"
      autosize
      label="公式简介"
      type="textarea"
      maxlength="50"
      placeholder="请填写"
      show-word-limit
    />
  <!-- <div style="height: 2px;border-bottom:  1px solid #eaeaea;margin-top: 20px;"></div> -->
    </div>
    <div style="display: flex;justify-content: center;align-items: center;margin-top: 40px;">
      <van-button @click="surepushinformation" style="border-radius: 20px;width: 40%;" type="info">确定</van-button>
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
import { Picker } from 'vant'
import axios from 'axios'
Vue.use(Picker)
Vue.use(Image)
Vue.use(Field)
Vue.use(NavBar)
Vue.use(Toast)
Vue.use(Button)
export default {
  name: 'addcompany',
  data () {
    return {
      value1:'',
      value2:'',
      value3:'',
      value4:'',
      message:'',
      showPicker:false,
      showPicker1:false,
      columns: ['0-20人', '20-50人', '100人以上', '1000人以上', '10000人以上'],
      columns1: ['未融资', '不需要融资', '天使轮', 'D轮', 'C轮', 'B轮','A轮','已上市'],
      companysize:'',
      companydevelopment:'',
      valuesize:'请选择',
      valuesize1:'请选择'

    }
  },
  mounted() {
    console.log(this.valuesize)
    // this.valuesize = '请选择'
    // this.$forceUpdate()
  },
  methods: {
    surepushinformation(){
      axios.defaults.headers.common['authToken'] = localStorage.name
      doPost(`${API_HOST}/api/job/company/save`, {uid:localStorage.id,
        companyname:this.value1,scale:this.valuesize,develepment:this.valuesize1,address:this.value3,tell:this.value4}).then(res => {
        console.log(res.data.code)
        if (res.data.code == "200") {
          console.log(res.data)
          Toast.success('添加成功')
          this.$router.push({path: '/'})
        } else {
          Toast.fail('添加失败请重试')
        }
      })
    },
    showcompnysize(){
      // console.log('333')
      this.showPicker = true
    },
    showcompnydevelopment(){
      // console.log('333')
      this.showPicker1 = true
    },
    onClickLeft(){
      this.$router.back()
    },
    topushheaderpic(){

    },
    topushlogo(){
      console.log('kkk')
    },
    onConfirm(value){
      console.log(value)
      this.companysize = value
      this.valuesize = value
      this.showPicker = false
      console.log(this.valuesize)
    
    },
    onConfirm1(value){
      console.log(value)
      this.companydevelopment = value
      this.valuesize1 = value
      this.showPicker1 = false
    }
  }
}
</script>
<style>

</style>