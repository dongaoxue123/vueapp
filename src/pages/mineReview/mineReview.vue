<template>
  <div>
    <van-nav-bar
    title=""
    left-text="我的回复"
    right-text=""
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
    color="#585858"
    />
    <div v-for="(item,index) in contentList"  style="padding: 10px;margin-top: 20px;" class="pinglunblock">
      <div style="margin: 0;margin-left: 10px;" class="postimg">
        <img style="width:30px; height:30px" src="../../../static/img/user.png" alt="">
      </div>
      <div style="margin-left: 5px;padding-right: 5px;">
        <div style="display: flex;justify-content: space-between;align-items: center;" class="pinglun">
          <div  class="headerdone">
            <h5 style="color:#828282;margin: 0;margin-top: 5px;margin-bottom: 5px;font-family: Arial, Helvetica, sans-serif;width: 100%;">{{item.username}}</h5> 
          <!-- <div @click="popdoneText" style="border: 1px solid red;border-radius: 5px 5px 5px 5px;font-size:12px; color:red;width: 30px;text-align: center;">禁言</div> -->
          </div>
          <!-- <div style="color: #585858;font-size: 14px">{{time}}</div> -->
          <div>
            <van-button size="mini" style="border-radius: 3px 3px 3px 3px;padding-left: 3px;padding-right: 3px;" color="pink" plain type="info">查看详细</van-button>
            <van-button @click="todeilt(item)" size="mini" style="border-radius: 3px 3px 3px 3px;padding-left: 3px;padding-right: 3px;" plain type="info">查看主题</van-button>
          </div>
        </div>
        <p style="color: #585858;font-size: 14px">{{item.contenttxt}}</p>
        <div class="buttext">
          <!-- <div style="width: 100%;"></div> -->
          <div>
            <!-- <span><van-icon name="delete" /><span style="color: #585858;font-size: 12px">删除</span></span> -->
            <!-- <span @click="reviewList"><van-icon name="chat-o" /><span style="color: #585858;font-size: 12px">回复</span></span> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import { NavBar } from 'vant'
import { API_HOST }  from '../../utils/api.js'
import { doGet }  from '../../utils/index.js'
Vue.use(NavBar)
export default {
   name: 'MineReview' ,
   data() {
       return {
        contentList:[]
       }
   },
   mounted() {
    axios.defaults.headers.common['authToken'] = localStorage.name
    doGet(`${API_HOST}/api/club/tiezi/getMyReply`).then(res => {
      if (res) {
        // console.log(res.data.list)
        this.contentList = res.data.list
      }
    })
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    todeilt (item){
      this.$router.push({path: '/detailPost',
        query: {
          id: item.tieziid,
          name: item.username
        }
      })
    }
  },
}
</script>
<style>
@import '../managePost/style.css';
</style>