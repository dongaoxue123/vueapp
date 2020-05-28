<template>
  <div>
    <!-- <div class="header">
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
    </div> -->
    <!-- <Searchs/> -->
    <van-nav-bar
      title="搜索结果"
      left-text="返回"
      right-text=""
      left-arrow
      @click-left="onClickLeft"
 
    />
    <div @click="toDetailPost(item)" v-for="(item,index) in contentList" class="shareTextcontent">
      <span style="color:pink;font-size:14px">【{{type}}】</span>
      <span style="font-size:14px;color:#000">{{item.name}}</span>
      <div class="shareTime">
        <div><span>发表：</span><span style="color:#078bff">{{item.userName}}</span></div><div><span>发表时间</span>：<span>{{item.createtime}}</span></div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import  { doGet }  from '../../utils/index.js'
import  { API_HOST }  from '../../utils/api.js'
import Searchs from '../../components/search'
import { Search, Icon } from 'vant'
Vue.use(Search)
Vue.use(Icon)
export default {
    data () {
    return {
      type:'资源',
      antor:'i猪联盟',
      bookName: this.$route.query.name,
      time:'2019.11.11',
      contentList:[]
    }
  },
   name: 'SearchContent',
   components: {
    Searchs
  },
   methods: {
    toDetailPost (item) {
      this.$router.push({path: '/detailPost',
        query: {
          id: item.id,
          name: item.name
        }
      })
    },
    onSearch (value) {
      doGet(`${API_HOST}/api/club/tiezi/searchTieziByzhuti`,{name:value}).then(res => {
      if (res) {
        this.contentList = res.data.list
      }
    })
      // this.$router.push({path: '/searchContent',
      //   query: {
      //     name: value,
      //   }
      // })
    },
    tohome () {
      this.$router.push({path: '/'})
    },
    onClickLeft () {
      this.$router.back()
    }
   },
   mounted() {
    doGet(`${API_HOST}/api/club/tiezi/searchTieziByzhuti`,{name:this.$route.query.name}).then(res => {  
      if (res) {
        this.contentList = res.data.list
      }
    })
   },
}
</script>
<style>
@import './style.css';
</style>
