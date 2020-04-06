<template>
  <div>
    <van-nav-bar
      title="内容"
      left-text="返回"
      right-text="发帖"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-cell-group>
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" @change="changeValue(value1,option1)" />
        <van-dropdown-item v-model="value2" :options="option2" @change="changeValues(value2,option2)" />
      </van-dropdown-menu>
      <van-field
        v-model="message"
        rows="1"
        autosize
        type="textarea"
        placeholder="标题6-30字之间"
        @input="titleChange(message)"
      />
    </van-cell-group>
    <van-field
      v-model="messagep"
      rows="2"
      autosize
      type="textarea"
      maxlength="1000"
      placeholder="正文"
      :autosize="{minHeight:700}"
      @input="pChange(messagep)"
    />
    <div class="font-img">
      <!-- <van-icon size="30px"  name="photograph" /> -->
      <!-- <input type="file" accept="image/*"> -->
      <!-- <van-icon size="30px" name="smile-o" /> -->
    </div>
    <!-- <van-dialog
      v-model="show"
      title="标题"
      show-cancel-button
    >
    </van-dialog> -->
    <div class="file">
      <input id="upload_file" type="file" multiple @change="v_upload_files"/>
      <!-- <input id="upload_file" type="file" multiple @change="v_upload_files"/> -->
      <!-- <input style="background: #fff"  type="file" accept="image/*" ref="myfile">
      <van-button style="padding-left: 5px;padding-right: 5px;" @click="importData" size="mini" type="primary">确认导入</van-button> -->
      <!-- <button @click="importData" type="success" size="mini">确认导入</button> -->
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import { NavBar } from 'vant'
import { Field } from 'vant'
import { Icon } from 'vant'
import { Uploader } from 'vant'
import { API_HOST }  from '../../utils/api.js'
import { DropdownMenu, DropdownItem } from 'vant'
import { doPost }  from '../../utils/index.js'
import { doGet }  from '../../utils/index.js'
import { Toast } from 'vant'
import store from '../../stores/store.js'
import { Dialog } from 'vant'
Vue.use(Dialog)
Vue.use(Toast)
Vue.use(DropdownMenu).use(DropdownItem)
Vue.use(Uploader)
Vue.use(Icon)
Vue.use(Field)
Vue.use(NavBar)
export default {
  name: 'NewPost',
  data () {
    return {
      value1: store.state.id.id,
      option1: [{text:store.state.name.name,value:store.state.id.id}],
      bolckValue: '',
      titleValue: '',
      pValue: '',
      fileurl:'',
      value2: 0,
      option2: [{text:'选择',value:0},{text:'资源',value:5},{text:'求助',value:6}, {text:'话题',value:7}],
      show: false
    }
  },
  mounted () {
    console.log(store.state.userId.userId)
    doGet(`${API_HOST}/api/club/bankuai/getBankuaiList`).then(res => {
      if (res) {
      }
    })
  },
  methods: {
    v_upload_files(e) {
    let files = e.target.files
    let formData = new FormData()
    // formData重复的往一个值添加数据并不会被覆盖掉，可以全部接收到，可以通过formData.getAll('files')来查看所有插入的数据
    for (let i = 0;i < files.length;i++) {
      formData.append('file', files[i])
    }
    formData.append('userid',localStorage.userid)
    let headers = {
      'Content-Type': 'multipart/form-data'
    }
    axios.defaults.headers.common['authToken'] = localStorage.name
    doPost(`${API_HOST}/api/club/file/uploadFile`, formData, {headers: headers}).then(res =>{
      if(res){
        this.fileurl = res.data.path
        Toast.success('上传成功')
        console.log(res)
      }
    })
  },
    // importData () {
    //   var formData = new FormData()
    //   var formData = new window.FormData()
    //   formData.append('file', document.querySelector('input[type=file]').files[0])
    //   formData.append('userid',localStorage.userid)
    //   axios.defaults.headers.common['authToken'] = localStorage.name
    // doPost(`${API_HOST}/api/club/file/uploadFile`,formData).then(res => {
    //     if (res) {
    //       this.fileurl = res.data.path
    //       Toast.success('上传成功')
    //       console.log(res.data.path)
    //     }
    //   })
    // },
    onClickLeft() {
      this.$router.back()
    },
    onClickRight () {
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      if (!localStorage.name) {
        // this.show = true
        Dialog.confirm({
        title: '提示',
        message: '请先登录'
      }).then(() => {
        this.$router.push({path: '/login'})
      }).catch(() => {
        // on cancel
      })
      } else {
        axios.defaults.headers.common['authToken'] = localStorage.name
        doPost(`${API_HOST}/api/club/tiezi/postTiezi`,{name:this.titleValue,bankuaiId:store.state.id.id,zhutiid:this.typeValue,contenttxt:this.pValue,resourcePath:this.fileurl}).then(res => {
          if (res) {
            Toast.success('发送成功')
            this.$router.back()
          }
        })
      }
    },
    changeValue (value1, option1) {
      // console.log(option1[value1].text)
      // this.bolckValue = this.option1[value1].value
      // console.log(this.bolckValue)
    },
    changeValues (value2) {
      console.log(value2)
      this.typeValue = value2
      console.log(this.typeValue)
    },
    titleChange (message) {
      this.titleValue = message
      console.log(message)
    },
    pChange (messagep) {
      this.pValue = messagep
      console.log(messagep)
    }
  }
}
</script>
<style>
@import './style.css';
</style>