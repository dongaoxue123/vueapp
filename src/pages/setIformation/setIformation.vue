<template>
  <div>
    <van-nav-bar
      title=""
      left-text="返回"
      right-text=""
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      color="#585858"
    />
    <h4 style="padding:10px">设置</h4>
    <div style="display:flex;justify-content: center;align-items: center;">
      <div>
    <div style="width: 100px;height: 100px;border: 1px solid #eeeeee;">
      <img :src="img" alt="">
    </div>
    <div @click="setheader" style="margin-top: 10px;color: #666;">
      上传头像<van-icon  name="edit" />
    </div>
  </div>
</div>
    <van-cell-group>
      <van-field
        v-model="username"
        label="我的昵称"
        placeholder="请输入昵称"
        @input="changename(username)"
      />
      <van-field
        v-model="phone"
        label="手机号"
        placeholder="请输入手机号"
        @input="changephone(phone)"
      />
      <div style="font-size:14px;color:#585858;padding:14px"><span>更改密码：</span><van-button @click="tochangePhone" style="border-radius:4px 4px 4px 4px;padding-left:4px;padding-right:4px" color="#5ca3ff" size="mini" type="info">更改手机号</van-button></div>
      <div style="display: flex;justify-content: space-between;align-items: center;padding-left:14px"><div style="font-size:14px;color:#585858;">我的状态：</div><van-dropdown-menu>
      <van-dropdown-item style="color: #585858;font-size:14px;" v-model="value1" :options="option1" @change="changeValue(value1)"/>
      </van-dropdown-menu>
      <div></div>
      </div>
      <div style="display: flex;justify-content: space-between;align-items: center;padding-left:14px"><div style="font-size:14px;color:#585858;">我的地区：</div><van-dropdown-menu>
      <van-dropdown-item style="color: #585858;font-size:14px;" v-model="value2" :options="option2" @change="changeValues(value2)"/>
      </van-dropdown-menu>
      <div></div>
      </div>
      <div style="display: flex;justify-content: space-between;align-items: center;padding-left:14px"><div style="font-size:14px;color:#585858;">我的院校：</div><van-dropdown-menu>
      <van-dropdown-item style="color: #585858;font-size:14px;" v-model="value3" :options="option3" @change="changeValuess(value3)"/>
      </van-dropdown-menu>
      <div></div>
      </div>
      <div style="display: flex;justify-content: center;align-items: center;"><van-button @click="save" style="border-radius:10px 10px 10px 10px;width:80%;margin-top:20px;" color="#5ca3ff" type="info">保存</van-button></div>
    </van-cell-group>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import { Field } from 'vant'
import { Button } from 'vant'
import { API_HOST }  from '../../utils/api.js'
import { doGet }  from '../../utils/index.js'
import { doPost }  from '../../utils/index.js'
import { Toast } from 'vant'
import { NavBar } from 'vant'
import { DropdownMenu, DropdownItem } from 'vant'
Vue.use(Toast)
Vue.use(DropdownMenu).use(DropdownItem)
Vue.use(Button)
Vue.use(Field)
Vue.use(NavBar)
export default {
  name: 'SetIformation',
  data () {
    return {
      value1: 0,
      value2: 0,
      value3: 0,
      diquId: 0,
      namevalue: '',
      phonevalue:'',
      statusvalue: 0,
      schoolvalue: 0,
      img:'',
      option3: [
        {text: '请选择', value: 0},
      ],
      option1: [
        {text: '请选择', value: 0},
        { text: '', value: 0 },
        { text: '', value: 1 },
      ],
      option2: [
      ],
    }
  },
  mounted() {
    this.src = this.$route.query.url
    console.log(localStorage.name)
    doGet(`${API_HOST}/api/club/option/getOptionByParentType`,{optiontype:"studyStatus"}).then(res => {
      if (res) {
        console.log(res.data.list)
        this.option1[1].value = res.data.list[0].optionid
        this.option1[1].text = res.data.list[0].optionname
        this.option1[2].value = res.data.list[1].optionid
        this.option1[2].text = res.data.list[1].optionname
      }
    })
    doGet(`${API_HOST}/api/club/option/getOptionByParentType`,{optiontype:"area"}).then(res => {
      if (res) {
        console.log(res.data.list)
        this.value2 = res.data.list[0].optionid
        // this.option2 = res.data.list
        for (let i in res.data.list) {
          this.option2.push({'text': res.data.list[i].optionname,'value': res.data.list[i].optionid})
          // this.option2.push({'value': res.data.list[i].optionid})
        }
      }
    })
  },
  methods: {
    tochangePhone () {
      this.$router.push({path: '/changePhone'})
    },
    changeValue (value1){
      this.statusvalue = value1
    },
    changeValue (value3){
      this.schoolvalue = value3
    },
    changeValues (value2) {
      this.diquId = value2
      doGet(`${API_HOST}/api/club/option/getOptionByParentType`,{optionid:this.diquId}).then(res => {
        if (res) {
          this.value3 = res.data.list[0].optionid
          for (let i in res.data.list) {
            this.option3.push({'text': res.data.list[i].optionname,'value': res.data.list[i].optionid})
            // this.option2.push({'value': res.data.list[i].optionid})
          }
        }
      })
    },
    changename (username){
      this.namevalue = username
    },
    changephone (phone) {
      this.phonevalue = phone
    },
    onClickLeft () {
      this.$router.push({path: '/personalInformation'})
    },
    save () {
      axios.defaults.headers.common['authToken'] = localStorage.name
      doPost(`${API_HOST}/api/club/userExt/updateUserInfo`,
      {
        phone:this.phonevalue,
        nickname :this.namevalue,	// 昵称
        uid:localStorage.id,			//用户id
        status:this.statusvalue,	//我的状态
        areaId:this.diquId,		//地区id
        schoolId:this.schoolvalue,	//学校id
        profile:this.img
	      // majorId:1,		//专业id}
      }).then(res=>{
        if (res.data.code == 200) {
          Toast.success('修改成功')
          this.$router.push({path: '/personalInformation'})
        }
      })
    },
    setheader () {
      this.$router.push({path: '/setHeader'})
    }
  },
}
</script>
<style>

</style>