<template>
  <div>
    <van-nav-bar
    title="职位"
    left-text=""
    right-text=""
    left-arrow
    @click-left="onClickLeft"
    />
    <div style="padding: 20px;display: flex;justify-content: center;align-items: center;margin-top: 20px;"><img style="width: 330px;" src="../../../static/img/b.jpg" alt=""></div>
    <div style="display: flex;justify-content: center;align-items: center;">
      <van-button @click="releasejob" style="border-radius: 20px;width: 65%;background: #5aa0ff;" type="info">加入公司</van-button>
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
Vue.use(Image)
Vue.use(Field)
Vue.use(NavBar)
Vue.use(Toast)
Vue.use(Button)
export default {
  name: 'jobaddcopy',
  data () {
    return {
    }
  },
  methods: {
    releasejob(){
      this.$router.push({path: '/addcompany'})
    },
    onClickLeft(){
      this.$router.back()
    }
  }
}
</script>
<style>
/* @import './style.css'; */
</style>