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
           <!-- <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad(offset)"
              :offset = "offset"
            >  -->
            <!-- <van-pull-refresh v-model="isRefresh" @refresh="onRefresh" ref="pullRefresh"> -->
        <div @click="toDetailPost(item)" v-for="(item,index) in textlist" class="shareTextcontent">
          <span style="color:pink;font-size:16px;font-weight: 700;">【{{item.zhutiName}}】</span><span style="font-size:15px;color:#333;font-weight: 600;">{{item.name}}</span>
          <!-- <p style="font-size:13px;color:#585858;padding:6px">将很快肯定会尽快发给好看的反馈开绿灯解放了大家了解砥砺奋进吉林省空军的飞机第三方</p> -->
          <div style="font-size:13px" class="shareTime">
            <!-- <div></div> -->
          <div><span>发表：</span><span>{{item.userName}}</span></div><div><span>发表时间</span>：<span>{{item.createtime}}</span></div>
          </div>
        </div>
      <!-- </van-pull-refresh> -->
        <!-- <button v-if="isclick" @click="clickl">
          点击
        </button> -->
        <div v-if="isclick" style="display: flex;justify-content: center;align-items: center;margin-top: 10px;">
          <van-loading v-if="isloding" type="spinner" color="#1989fa" />
        <van-button style="border-radius: 10px 10px 10px 10px;width: 90%;font-size: 14px;" size="small" v-if="isclick" @click="clickl" plain type="info">加载更多</van-button>
      </div>
        <!-- </van-list> -->
      <!-- </div> -->
        </div>
      </van-pull-refresh>
      </van-tab>
      <van-tab title="热门" name="b">
        <div class="taptitle">
          <div><span @click="toCommunity" style="color:#666;font-size:14px">板块</span>><span style="color:#666;font-size:14px">{{name}}</span></div>
          <div @click="toNewPost" class="shareText">发帖</div>
          </div>
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh1">
          <div style="background:#ebf1fd;padding-top:10px;padding-bottom:10px;">
          <!-- <div v-if="isListNone"> -->
          <div @click="toDetailPost(item)" v-for="(item,index) in textlists" class="shareTextcontent">
            <span style="color:pink;font-size:16px;font-weight: 700;">【{{item.zhutiName}}】</span><span style="font-size:15px;color:#333; font-weight: 600;">{{item.name}}</span>
            <!-- <p style="font-size:13px;color:#585858;padding:6px">将很快肯定会尽快发给好看的反馈开绿灯解放了大家了解砥砺奋进吉林省空军的飞机第三方</p> -->
            <div style="font-size:13px" class="shareTime">
            <div><span>发表：</span><span>{{item.userName}}</span></div><div><span>发表时间</span>：<span>{{item.createtime}}</span></div>
            </div>
          </div>
        <!-- </div> -->
        <div v-if="isclickhott" style="display: flex;justify-content: center;align-items: center;margin-top: 10px;">
          <van-loading v-if="islodinghot" type="spinner" color="#1989fa" />
        <van-button style="border-radius: 10px 10px 10px 10px;width: 90%;font-size: 14px;" size="small" v-if="isclickhott" @click="clickhott" plain type="info">加载更多</van-button>
      </div>
        </div>
      </van-pull-refresh>
      </van-tab>
      <van-tab title="精华" name="c">
        <div class="taptitle">
          <div><span @click="toCommunity" style="color:#666;font-size:14px">板块</span>><span style="color:#666;font-size:14px">{{name}}</span></div>
          <div @click="toNewPost" class="shareText">发帖</div>
          </div>
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh2">
          <div style="background:#ebf1fd;padding-top:10px;padding-bottom:10px;">
            <!-- <div v-if="isListNone"> -->
          <div @click="toDetailPost(item)" v-for="(item,index) in textlistss" class="shareTextcontent">
            <span style="color:pink;font-size:16px;font-weight: 700;">【{{item.zhutiName}}】</span><span style="font-size:15px;color:#333;font-weight: 600;">{{item.name}}</span>
            <!-- <p style="font-size:13px;color:#585858;padding:6px">将很快肯定会尽快发给好看的反馈开绿灯解放了大家了解砥砺奋进吉林省空军的飞机第三方</p> -->
            <div style="font-size:13px" class="shareTime">
            <div><span>发表：</span><span>{{item.userName}}</span></div><div><span>发表时间</span>：<span>{{item.createtime}}</span></div>
          </div>
        </div>
        <!-- </div> -->
        <div v-if="isclickcream" style="display: flex;justify-content: center;align-items: center;margin-top: 10px;">
          <van-loading v-if="islodingcream" type="spinner" color="#1989fa" />
        <van-button style="border-radius: 10px 10px 10px 10px;width: 90%;font-size: 14px;" size="small" v-if="isclickcream" @click="clickcream" plain type="info">加载更多</van-button>
      </div>
        </div>
      </van-pull-refresh>
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
      offset: 0,
      shopPage:10,
      shopListLength:0,
      // shopListLengths:0,
      shopPages:10,
      shopListLengths:0,
      shopPagess:10,
      shopListLengthss:0,
      isloding: false,
      isclick:true,
      islodinghot: false,
      isclickhott:true,
      islodingcream: false,
      isclickcream:true,
    }
  },
  mounted() {
    // this.$router.go(0)
    this.contentList = []
    let date = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    console.log(date)
    this.showlist()
    doGet(`${API_HOST}/api/club/tiezi/searchTieziByzhuti`,{bankuaiId:this.$route.query.id,status:1,createtime:date}).then(res => {
      if (res) {
        this.contentLists = res.data.list
        this.shopListLengths = this.contentLists.length
        this.textlists = this.contentLists.slice(0, this.shopPages)
      }
    })
    doGet(`${API_HOST}/api/club/tiezi/searchTieziByzhuti`,{bankuaiId:this.$route.query.id,status:2,createtime:date}).then(res => {
      if (res) {
        // console.log(res.data.list)
        // this.contentListcream = res.data.list
        this.contentListss = res.data.list
        // this.contentList = res.data.list
        this.shopListLengthss = this.contentListss.length
        this.textlistss = this.contentListss.slice(0, this.shopPagess)
      }
    })
  },
  methods: {
    clickl(){
      // let that = this
      let pageNumber = this.textlist.length
      if (pageNumber < this.shopListLength) {
      // this.isMoreShop = true
      if (pageNumber + this.shopPage < this.shopListLength) {
        console.log(this.shopListLength)
        this.isloding = true
        this.textlist = this.contentList.slice(0, pageNumber + this.shopPage)
        this.$forceUpdate() 
        this.isloding = false
        console.log(this.textlist)
      } else {
        this.isloding = true
        this.textlist = this.contentList.slice(0, this.shopListLength)
        this.isclick = false
        this.$forceUpdate() 
        this.isloding = false
      }
      // console.log(pageNumber, this.shopListLength)
    } else {
      // console.log(this.isMoreShop)
      // this.isMoreShop = true
      }
    },
    clickhott(){
      // let that = this
      let pageNumbers = this.textlists.length
      if (pageNumbers < this.shopListLengths) {
      // this.isMoreShop = true
      if (pageNumbers + this.shopPages < this.shopListLengths) {
        console.log(this.shopListLengths)
        this.islodinghot = true
        this.textlists = this.contentLists.slice(0, pageNumbers + this.shopPages)
        this.$forceUpdate() 
        this.islodinghot = false
        console.log(this.textlist)
      } else {
        this.islodinghot = true
        this.textlists = this.contentLists.slice(0, this.shopListLengths)
        this.isclickhott = false
        this.$forceUpdate() 
        this.islodinghot = false
      }
      // console.log(pageNumber, this.shopListLength)
    } else {
      // console.log(this.isMoreShop)
      // this.isMoreShop = true
    }
    },
    clickcream(){
      // let that = this
      let pageNumberss = this.textlistss.length
      if (pageNumberss < this.shopListLengthss) {
      // this.isMoreShop = true
      if (pageNumberss + this.shopPagess < this.shopListLengthss) {
        console.log(this.shopListLengthss)
        this.islodingcream = true
        this.textlistss = this.contentListss.slice(0, pageNumberss + this.shopPagess)
        this.$forceUpdate()
        this.islodingcream = false
        console.log(this.textlistss)
      } else {
        this.islodingcream = true
        this.textlistss = this.contentListss.slice(0, this.shopListLengthss)
        this.isclickcream = false
        this.$forceUpdate() 
        this.islodingcream = false
      }
      // console.log(pageNumber, this.shopListLength)
    } else {
      // console.log(this.isMoreShop)
      // this.isMoreShop = true
    }
    },
    showlist(){
      let date = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      doGet(`${API_HOST}/api/club/tiezi/searchTieziByzhuti`,{bankuaiId:this.$route.query.id,status:0,createtime:date}).then(res => {
      if (res) {
        // console.log(res.data.list)
        this.contentList = res.data.list
        this.shopListLength = this.contentList.length
        this.textlist = this.contentList.slice(0, this.shopPage)
        console.log(this.textlist)
        // if (this.shopList.length === 0) {
        //   this.isHaveShop = true
        // } else {
        //   this.isHaveShop = false
        // }
      }
    })
    },
    onLoad(offset) {
      setTimeout(() => {
        console.log(offset)
        // for (let i = 0; i < 10; i++) {
        //   this.list.push(this.list.length + 1);
        // }
      })
    },
    onRefresh() {
      let date = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      console.log(date)
      doGet(`${API_HOST}/api/club/tiezi/searchTieziByzhuti`,{bankuaiId:this.$route.query.id,status:0,createtime:date}).then(res => {
        if (res) {
          // console.log(res.data.list)
          this.contentList = res.data.list
          this.$toast('刷新成功')
          this.isLoading = false
        }
      })
      // setTimeout(() => {
      //   this.$toast('刷新成功')
      //   this.isLoading = false
      // }, 500);
    },
    onRefresh1() {
      let date = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    // let now=new Date() 
    // let date = 1900+now.getYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()
    console.log(date)
    doGet(`${API_HOST}/api/club/tiezi/searchTieziByzhuti`,{bankuaiId:this.$route.query.id,status:1,createtime:date}).then(res => {
      if (res) {
        // console.log(res.data.list)
        this.contentLists = res.data.list
        this.$toast('刷新成功')
        this.isLoading = false
      }
    })
      // setTimeout(() => {
      //   this.$toast('刷新成功')
      //   this.isLoading = false
      // }, 500);
    },
    onRefresh2() {
      let date = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    // let now=new Date() 
    // let date = 1900+now.getYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()
    console.log(date)
    doGet(`${API_HOST}/api/club/tiezi/searchTieziByzhuti`,{bankuaiId:this.$route.query.id,status:2,createtime:date}).then(res => {
      if (res) {
        // console.log(res.data.list)

        this.contentListcream = res.data.list
        this.$toast('刷新成功')
        this.isLoading = false
      }
    })
      // setTimeout(() => {
      //   this.$toast('刷新成功')
      //   this.isLoading = false
      // }, 500);
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
      if (localStorage.roleid == 0) {
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
  computed: {

  },
}
</script>
<style>
@import './style.css';
</style>