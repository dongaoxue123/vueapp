<template>
  <div>
    <van-nav-bar title="" left-text="返回" @click-left="onClickLeft" left-arrow>
        <van-icon name="" slot="right" />
    </van-nav-bar>
    <div style="border-radius: 50%;border:1px solid #f1f1f1;width:5rem;height:5rem;margin:0 auto;margin-top:30px">
        <van-image
          round
          width="5rem"
          height="5rem"
          src=""
        />
        </div>
        <div style="display: flex;justify-content: center;"><span>{{name}}</span></div>
        <!-- <div style="display: flex;justify-content: center;"><span style="color:#989898;font-size:14px">{{lev}}：</span><span style="color:#ff9a8e;font-size:14px">{{nub}}</span></div> -->
          <div style="display: flex;justify-content: center;align-items: center;">
            <div style="padding:20px">
            <div>{{jifen}}</div>
            <div style="color:#989898;font-size:10px">积分</div>
            </div>
            <div style="padding:20px">
            <div>{{followTotals}}</div>
            <div style="color:#989898;font-size:10px">关注</div>
            </div>
            <div style="padding:20px">
            <div>{{fansTotals}}</div>
            <div style="color:#989898;font-size:10px">粉丝</div>
          </div>
        </div>
        <div style="padding: 10px;">
        <h4>内容</h4>
        <div @click="toDetailPost" v-for="(item,index) in personList" class="shareTextcontent">
          <span style="color:pink;font-size:14px;font-weight: 600;">【{{item.zhutiName}}】</span><span style="font-size:14px;color:#000;font-weight: 600;">{{item.name}}</span>
          <div class="shareTime">
            <div><span>发表：</span><span style="color:#078bff">{{item.userName}}</span></div><div><span>发表时间</span>：<span>{{item.createtime}}</span></div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import  { doGet }  from '../../utils/index.js'
import  { API_HOST }  from '../../utils/api.js'
import { NavBar } from 'vant'
Vue.use(NavBar)
export default {
  name: 'DetailPerson',
  data() {
    return {
      foll: 0,
      name: '',
      lev:'',
      nub: '',
      type: '',
      antor: '',
      time: '',
      bookName: '',
      followTotals: 0,
      fansTotals: 0,
      jifen: 0,
      personList: []
    }
  },
  mounted() {
    axios.defaults.headers.common['authToken'] = localStorage.name
    doGet(`${API_HOST}/api/club/tiezi/userDetails`,{createuserid: this.$route.query.createuserid}).then(res => {
      if (res) {
        console.log(res.data.list)
        this.followTotals = res.data.t.followTotals
        this.fansTotals = res.data.t.fansTotals
        this.jifen = res.data.t.jifen
        this.name  = res.data.t.uname
        this.personList = res.data.list
      }
    })
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    toDetailPost(){
      
    }
  },
}
</script>
<style>
.taptitle{
    margin: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.shareText{
  background: #5ca3ff;
  border-radius: 5px 5px 5px 5px;
  color: #fff;
  text-align: center;
  font-size: 14px;
  padding-left: 8px;
  padding-right: 8px;
}
.shareTextcontent{
  background: #fff;
  /* border-radius: 10px 10px 10px 10px; */
  margin: 20px 20px 0;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebebeb;
}
.shareTime{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  font-size: 12px;
}
</style>