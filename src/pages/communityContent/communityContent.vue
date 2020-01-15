<template>
    <div>
      <Searchs/>
      <van-tabs v-model="activeName" color="#5ca3ff">
      <van-tab title="最新" name="a">
        <div class="taptitle">
        <div><span @click="toCommunity" style="color:#666;font-size:14px">板块</span>><span style="color:#666;font-size:14px">{{name}}</span></div>
        <div @click="toNewPost" class="shareText">发帖</div>
        </div>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <!-- <p>刷新次数: {{ count }}</p> -->
        
        <div style="background:#ebf1fd;padding-top:10px;padding-bottom:10px ;">
          <!-- <div v-if="isListNone"> -->
           <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              :offset = "offset"
            > 
        <div @click="toDetailPost(item)" v-for="(item,index) in contentList" class="shareTextcontent">
          <span style="color:pink;font-size:16px;font-weight: 700;">【{{item.zhutiName}}】</span><span style="font-size:15px;color:#333;font-weight: 600;">{{item.name}}</span>
          <!-- <p style="font-size:13px;color:#585858;padding:6px">将很快肯定会尽快发给好看的反馈开绿灯解放了大家了解砥砺奋进吉林省空军的飞机第三方</p> -->
          <div style="font-size:13px" class="shareTime">
          <div><span>发表：</span><span>{{item.userName}}</span></div><div><span>发表时间</span>：<span>{{item.createtime}}</span></div>
          </div>
        </div>
      </van-list>
      <!-- </div> -->
        </div>
      </van-pull-refresh>
      </van-tab>
      <van-tab title="热门" name="b">
        <div class="taptitle">
          <div><span @click="toCommunity" style="color:#666;font-size:14px">板块</span>><span style="color:#666;font-size:14px">{{name}}</span></div>
          <div @click="toNewPost" class="shareText">发帖</div>
          </div>
          <div style="background:#ebf1fd;padding-top:10px;padding-bottom:10px;">
          <!-- <div v-if="isListNone"> -->
          <div @click="toDetailPost(item)" v-for="(item,index) in contentLists" class="shareTextcontent">
            <span style="color:pink;font-size:16px;font-weight: 700;">【{{item.zhutiName}}】</span><span style="font-size:15px;color:#333; font-weight: 600;">{{item.name}}</span>
            <!-- <p style="font-size:13px;color:#585858;padding:6px">将很快肯定会尽快发给好看的反馈开绿灯解放了大家了解砥砺奋进吉林省空军的飞机第三方</p> -->
            <div style="font-size:13px" class="shareTime">
            <div><span>发表：</span><span>{{item.userName}}</span></div><div><span>发表时间</span>：<span>{{item.createtime}}</span></div>
            </div>
          </div>
        <!-- </div> -->
        </div>
      </van-tab>
      <van-tab title="精华" name="c">
        <div class="taptitle">
          <div><span @click="toCommunity" style="color:#666;font-size:14px">板块</span>><span style="color:#666;font-size:14px">{{name}}</span></div>
          <div @click="toNewPost" class="shareText">发帖</div>
          </div>
          <div style="background:#ebf1fd;padding-top:10px;padding-bottom:10px;">
            <!-- <div v-if="isListNone"> -->
          <div @click="toDetailPost(item)" v-for="(item,index) in contentListcream" class="shareTextcontent">
            <span style="color:pink;font-size:16px;font-weight: 700;">【{{item.zhutiName}}】</span><span style="font-size:15px;color:#333;font-weight: 600;">{{item.name}}</span>
            <!-- <p style="font-size:13px;color:#585858;padding:6px">将很快肯定会尽快发给好看的反馈开绿灯解放了大家了解砥砺奋进吉林省空军的飞机第三方</p> -->
            <div style="font-size:13px" class="shareTime">
            <div><span>发表：</span><span>{{item.userName}}</span></div><div><span>发表时间</span>：<span>{{item.createtime}}</span></div>
          </div>
        </div>
        <!-- </div> -->
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import Vue from 'vue'
import Searchs from '../../components/search'
import  { doGet }  from '../../utils/index.js'
import  { API_HOST }  from '../../utils/api.js'
import  store from '../../stores/store.js'
import { Tab, Tabs } from 'vant'
import { Dialog } from 'vant'
import { PullRefresh } from 'vant'
Vue.use(PullRefresh)
Vue.use(Dialog);
Vue.use(Tab).use(Tabs)
var user = 0
export default {
   name: 'CommunityContent',
   components:{
      Searchs
   },
  data () {
    return {
      activeName: 'a',
      name: this.$route.query.name,
      contentList:[],
      isListNone: true,
      contentListcream: [],
      contentLists: [],
      isLoading: false,
      loading: false,
      finished: false,
      page: 0,
      offset: 0
    }
  },
  mounted() {
    // this.$router.go(0)
    let date = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    // let now=new Date() 
    // let date = 1900+now.getYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()
    console.log(date)
    doGet(`${API_HOST}/api/club/tiezi/searchTieziByzhuti`,{bankuaiId:this.$route.query.id,status:0,createtime:date}).then(res => {
      if (res) {
        // console.log(res.data.list)
        this.contentList = res.data.list
      }
    })
    doGet(`${API_HOST}/api/club/tiezi/searchTieziByzhuti`,{bankuaiId:this.$route.query.id,status:1,createtime:date}).then(res => {
      if (res) {
        // console.log(res.data.list)
        this.contentLists = res.data.list
      }
    })
    doGet(`${API_HOST}/api/club/tiezi/searchTieziByzhuti`,{bankuaiId:this.$route.query.id,status:2,createtime:date}).then(res => {
      if (res) {
        // console.log(res.data.list)
        this.contentListcream = res.data.list
      }
    })
  },
  methods: {
    onLoad() {
      console.log(333)
    let date = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    doGet(`${API_HOST}/api/club/tiezi/searchTieziByzhuti`,{bankuaiId:this.$route.query.id,status:0,createtime:date,beginNum:this.page+10, loadNum:10}).then(res => {
      if (res) {
        // console.log(res.data.list)
        this.contentList = this.contentList.concat(res.data.list)
        console.log(this.contentList)
      }
    })
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500);
    },
    toNewPost () {
      console.log(localStorage.name)
      if (localStorage.name == 'undefined') {
        Dialog.confirm({
          title: '提示',
          message: '登录已过期，请从新登录'
        }).then(() => {
          this.$router.push({path: '/login'})
        }).catch(() => {
        })
      } else if (!localStorage.name) {
        Dialog.confirm({
          title: '提示',
          message: '登录已过期，请从新登录'
        }).then(() => {
          this.$router.push({path: '/login'})
        }).catch(() => {
          // on cancel
        });
      }
      this.$router.push({path: '/newPost'})
    },
    toCommunity() {
      this.$router.push({path: '/community'})
    },
    toDetailPost(item) {
      console.log(localStorage.roleid)
      store.commit('tieziId', {adminId: item.id})
      if (localStorage.roleid == 1) {
      this.$router.push({path: '/detailPost',
        query: {
          id: item.id,
          name: item.name
        }
      })
     } else if (localStorage.roleid == 2) {
       console.log(localStorage.roleid)
      this.$router.push({path: '/managePost',
        query: {
          id: item.id,
          name: item.name
        }
      })
     }  else if (!localStorage.roleid) {
       console.log(localStorage.roleid)
      this.$router.push({path: '/detailPost',
        query: {
          id: item.id,
          name: item.name
        }
      })
     }else if (localStorage.roleid == 'undefined') {
       console.log(localStorage.roleid)
      this.$router.push({path: '/detailPost',
        query: {
          id: item.id,
          name: item.name
        }
      })
     }
    }
  },
}
</script>
<style>
@import './style.css';
</style>