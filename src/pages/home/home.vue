<template>
  <div class="hello">
    <Searchs/>
    <div class="nav">
      <div class="blockNav">
        <div class="textMargin"><router-link to="/community"> 青年i猪社区 </router-link></div>
        <a class="textMargin" href="">求职招聘</a>
        <a class="textMargin" href="">在线课堂</a>
        <a class="textMargin" href="">YPC头条</a>
        <a class="textMargin" href="">实践项目</a>
        <a class="textMargin" href="">YPC爱问</a>
      </div>
    </div>
    <div class="newRound">
      <div class="new-border">
        <div class="tapBlock">
        <h2 class="text-tap">
          最新
        </h2>
        <van-icon name="ellipsis" />
        </div>
        <div @click="todetil(item)" v-for="(item,index) in contentListnew" class="formation-text">
          <div class="publisher">
          <img style="width:30px; height:30px" src="../../../static/img/user.jpg"></div>
          <div class="msgPink">【{{item.zhutiName}}】</div>
          <div style="overflow: hidden;" class="text-color">{{item.name}}</div>
        </div>
        <div @click="changeNewPost" class="butChange">换一批<van-icon name="replay" /></div>
      </div>
    </div>
    <div class="hotText">
      <div class="hot-textconect">
        <div class="tapBlock">
        <h2 class="text-tap">
          热门
        </h2>
        <van-icon name="ellipsis" />
        </div>
        <div @click="todelhot(item)" v-for="(item,index) in contentListhot" class="formation-text">
          <div class="publisher">
          <img style="width:30px; height:30px" :src="srcimg">
          </div>
          <div class="msgPink">【{{item.zhutiName}}】</div>
          <div class="text-color">{{item.name}}</div>
        </div>
        <div @click="changehot" class="butChange">换一批<van-icon name="replay" /></div>
      </div>
    </div>
    <div style="padding-bottom: 10px;" class="cream">
      <div  class="cream-concet">
        <div class="tapBlock">
        <h2 class="text-tap">
        精华
        </h2>
        <van-icon name="ellipsis" />
        </div>
        <div @click="todelcream(item)" v-for="(item,index) in contentListcream" class="formation-text">
          <div class="publisher"><img style="width:30px; height:30px" src="../../../static/img/user2.jpg"></div>
          <div class="msgPink">【{{item.zhutiName}}】</div>
          <div class="text-color">{{item.name}}</div>
        </div>
        <div @click="changecraem" class="butChange">换一批<van-icon name="replay" /></div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import Searchs from '../../components/search'
import { Search, Icon, Button } from 'vant'
import { doGet }  from '../../utils/index.js'
import { API_HOST }  from '../../utils/api.js'
import  store from '../../stores/store.js'
Vue.use(Search)
Vue.use(Icon)
Vue.use(Button)
// var type = 0
export default {
  name: 'Home',
  components: {
    Searchs
  },
  data () {
    return {
      contentListnew: [],
      contentListhot:[],
      contentListcream: [],
      page: 0,
      pages: 0,
      pagess: 0,
      srcimg:'../../../static/img/user1.jpg'
    }
  },
  mounted() {
    doGet(`${API_HOST}/api/club/tiezi/searchTieziByzhuti`,{beginNum:0,loadNum:3,status:0}).then(res => {
      if (res) {
        console.log(res.data.list)
        this.contentListnew = res.data.list
      }
    })
    doGet(`${API_HOST}/api/club/tiezi/searchTieziByzhuti`,{beginNum:0,loadNum:3,status:1}).then(res => {
        if (res) {
          console.log(res.data.list)
          this.contentListhot=res.data.list
        }
      })
      doGet(`${API_HOST}/api/club/tiezi/searchTieziByzhuti`,{beginNum:0,loadNum:3,status:2}).then(res => {
        if (res) {
          console.log(res.data.list)
          this.contentListcream=res.data.list
        }
      })
  },
  methods: {
    changeNewPost () {
      doGet(`${API_HOST}/api/club/tiezi/searchTieziByzhuti`,{beginNum:++this.page,loadNum:3,status:0}).then(res => {
        if (res) {
          console.log(this.page)
          if(res.data.list.length === 0){
            console.log(res.data.list)
            this.page = 0
            doGet(`${API_HOST}/api/club/tiezi/searchTieziByzhuti`,{beginNum:this.page,loadNum:3,status:0}).then(res => {
              if (res) {
                this.contentListnew = res.data.list
                // this.page= this.page+3
                return
              }
            })
          } else {
            this.contentListnew=res.data.list
          }
        }
      })
    },
    changehot () {
      doGet(`${API_HOST}/api/club/tiezi/searchTieziByzhuti`,{beginNum:++this.pages,loadNum:3,status:1}).then(res => {
        if (res) {
          console.log(res.data.list.length)
          if(res.data.list.length === 0){
            console.log(res.data.list)
            this.pages = 0
            doGet(`${API_HOST}/api/club/tiezi/searchTieziByzhuti`,{beginNum:this.pages,loadNum:3,status:1}).then(res => {
              if (res) {
                console.log(this.pages)
                this.contentListhot=res.data.list
              }
            })
          } else {
            this.contentListhot=res.data.list
          }
          
        }
      })
    },
    changecraem () {
      doGet(`${API_HOST}/api/club/tiezi/searchTieziByzhuti`,{beginNum:++this.pagess,loadNum:3,status:2}).then(res => {
        if (res) {
          console.log(this.pagess)
          if(res.data.list.length === 0){
            console.log(res.data.list)
            // this.pagess = 0
            doGet(`${API_HOST}/api/club/tiezi/searchTieziByzhuti`,{beginNum:this.pagess,loadNum:3,status:2}).then(res => {
              if (res) {
                this.contentListcream=res.data.list
              }
            })
          } else {
            this.contentListcream=res.data.list
          }
          
        }
      })
    },
    toCommunity () {
      this.$router.push({path: '/community'})
    },
    todetil (item) {
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
     } else if (!localStorage.roleid) {
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
    },
    todelhot (item) {
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
     } else if (!localStorage.roleid) {
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
    },
    todelcream (item){
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
     } else if (!localStorage.roleid) {
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
    },
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import './style.css';
</style>
