<template>
  <div>
    <div class="header">
      <van-icon  @click="tohome" style="margin-left: 10px;" color="#fff" size="20px" name="wap-home" />
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        shape="round"
        right-icon="search"
        left-icon=""
        @search="onSearch(value)"
        background="#5ca3ff"
        style="width:90%;margin-left:10px"
        action-text
      >
    </van-search>
    <van-icon @click="toLogin" size="20px" class="user" name="manager"/>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Search, Icon } from 'vant'
import  store from '../stores/store.js'
Vue.use(Search)
Vue.use(Icon)
export default {
  name: 'Searchs',
  data() {
    return {
      value:''
    }
  },
  methods: {
    toLogin () {
      console.log(localStorage.name)
      if (!localStorage.name) {
        this.$router.push({path: '/login'})
      } else if (localStorage.name == 'undefined') {
        this.$router.push({path: '/login'})
      } else {
        this.$router.push({path: '/personalInformation'})
      }
    },
    onSearch (value) {
      console.log(value)
      this.$router.push({path: '/searchContent',
      query: {
          name: value,
        }
      })
    },
    tohome () {
      this.$router.push({path: '/'})
    }
  }
}
</script>
<style>
@import '../pages/home/style.css';
</style>
