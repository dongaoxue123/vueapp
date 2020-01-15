<template>
  <div>
    <van-nav-bar title="" left-text="返回" @click-left="onClickLeft" left-arrow>
    <van-icon name="" slot="right" />
    </van-nav-bar>
    <div>
      <div class="postflex">
        <div @click="toPersonInfoemation" style="margin: 0;margin-top:10px;margin-left: 10px;overflow: hidden;" class="postimg"><img style="width:30px; height:30px" :src="''">
        </div>
        <div style="padding: 0;padding: 5px;width: 100%;" class="righttxt">
          <div style="display: flex;justify-content: space-between;align-items: center;margin-top: 10px;">
          <h5 style="color:#909090;margin: 0;margin-bottom: 5px;">{{title}}</h5>
          <div v-if="ismine">
          <van-button v-if="isFollowdone" size="mini" @click="followPer" plain type="info">
            <van-icon name="plus" /><span style="color: #5a5a5a;font-size: 12px;">关注</span>
          </van-button>
            <van-button size="mini" @click="followdone" v-if="isFollowyep" plain type="info"><van-icon name="success" />
            <span style="color: #5a5a5a;font-size: 12px;">取消关注</span></van-button>
          </div>
          </div>
          <div style="margin-top: 10px;">
            <span style="color:pink;font-size:15px">【{{type}}】</span>&nbsp;&nbsp;&nbsp;<span style="font-size:15px;color:#333;font-weight: 600;">{{bookName}}</span>
          </div>
          <p style="color:#5a5a5a;font-size:14px">{{txt}}</p>
          <div v-if="isHref"><a :href="'/api/club/file/download?fileName='+href+''"><img v-if="isisimg" style="width: 100%;height: 100%;" :src="'/api/club/file/download?fileName='+href+''"></a>
          <a v-if="isImg" :href="'/api/club/file/download?fileName='+href+' &userid='+uuid+''" style="flex-wrap: wrap;" ><div style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{hrefs}}</div>下载</a>
        </div>
          <div style="display: flex;justify-content: space-between;align-items: center;">
            <div></div>
            <div style="font-size: 11px;">
              <van-icon @click="toSave" v-if="isSave" size="13px" name="star-o"/>
              <van-icon @click="toIntSave" v-if="istSave" size="13px" name="star"/>
              <span style="color:#565656;font-size:13px">收藏</span>
              <span @click="toReview">
                <van-icon size="13px" name="chat-o"/>
                <span style="color:#565656;font-size:13px">评论</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h4 style="padding: 10px;">评论</h4>
    <div v-for="(item,index) in pinglunList" style="padding: 0;padding: 5px;" class="pinglunblock">
      <div style="margin: 0;margin-left: 10px;" class="postimg"><img style="width:30px; height:30px" src="../../../static/img/user.png" alt=""></div>
      <div style="margin-left: 5px;padding-right: 5px;width: 100%;">
        <div class="pinglun">
          <div class="headerdone">
            <h5  style="color:#585858;margin: 0;margin-top: 5px;margin-bottom: 5px;">{{item.username}}</h5>
            <h5 v-if="item.freply!=''" style="color:#585858;margin: 0;margin-top: 5px;margin-bottom: 5px;">->{{item.freply}}</h5>
          </div>
        <div style="color: #585858;font-size: 14px">{{item.createtime}}</div>
      </div>
      <p style="color: #585858;font-size: 14px;">{{item.contenttxt}}</p>
      <div class="buttext">
        <div></div>
        <div @click="reviewList(item)" style="display: flex;justify-content: center;align-items: center;">
          <van-icon name="chat-o"/><span style="color: #585858;font-size: 12px">评论</span>
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
import { Icon } from 'vant'
import { Toast } from 'vant'
import { doGet }  from '../../utils/index.js'
import { doPost }  from '../../utils/index.js'
import { API_HOST }  from '../../utils/api.js'
import { Dialog } from 'vant'
Vue.use(Dialog)
Vue.use(Toast)
Vue.use(Icon)
Vue.use(NavBar)
export default {
  name: 'DetailPost',
  data () {
    return {
      title:'',
      href:'',
      type:'',
      time: '',
      isImg: true,
      bookName: this.$route.query.name,
      txt:'',
      isSave:true,
      istSave: false,
      pinglunList : [],
      huifuid: 0,
      id: 0,
      createuserid:0,
      huifu: false,
      isHref: false,
      isFollowdone: true,
      isFollowyep: false,
      fileName: '',
      isimg: [],
      isisimg: true,
      createuserid: 0,
      uuid:'',
      src: '',
      ismine: true
    }
  },
  mounted() {
    console.log(localStorage.userid)
    this.uuid = localStorage.userid
    doGet(`${API_HOST}/api/club/tiezi/getTieziByid`, {id:this.$route.query.id,userid:localStorage.userid}).then(res => {
      if (res) {
        console.log(res.data.t)
        this.title = res.data.t.userName
        this.fileName = res.data.t.name
        this.txt = res.data.t.contenttxt
        this.id = res.data.t.id
        this.createuserid = res.data.t.createuserid
        this.pinglunList = res.data.list
        this.href = res.data.t.resourcePath
        this.hrefs = res.data.t.resourcePath.substring(22)
        // var disLength = this.href.length
        // this.href= this.href.substring(22);
        this.type = res.data.t.zhutiName
        this.createuserid = res.data.t.createuserid
        this.src = res.data.t.profile
        this.isimg = this.href.split('.')
        console.log(this.href)
        // this.href = this.href.substr(0,22)
        console.log(this.isimg[1])
        console.log(this.createuserid)
        if (localStorage.userid == this.createuserid) {
          console.log('hhhhhhhh')
          this.ismine = false
          this.isSave = false
          this.toIntSave = false
          this.isFollowdone = false
          this.isFollowyep = false
        } else {
          this.ismine = true
          this.isSave = true
          this.toIntSave = true
          this.isFollowdone = true
          this.isFollowyep = true
        }
        if (this.isimg[1] == 'jpg' ||this.isimg[1] == 'png' || this.isimg[1] == 'jpeg' ) {
          this.isImg = false
          this.isisimg = true
        }  else {
          this.isImg = true
          this.isisimg = false
        }
        if (res.data.t.isFollow == 1) {
          this.isFollowyep = true
          this.isFollowdone = false
        } else {
          this.isFollowyep = false
          this.isFollowdone = true
        }
        if (res.data.t.isCollect == 1) {
          this.istSave = true
          this.isSave = false
        } else {
          this.istSave = false
          this.isSave = true
        }
        if (res.data.t.resourcePath!=''){
          this.href = res.data.t.resourcePath
          this.isHref = true
        } else {
          this.isHref = false
        }
      }
    })
  },
  methods: {
    toReview(){
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
        this.$router.push({path: '/review',
        query: {
            id: this.id
          }
        })
      }
    },
    followPer () {
      if (!localStorage.name) {
        // this.show = true
        Dialog.confirm({
        title: '提示',
        message: '请先登录'
      }).then(() => {
        this.$router.push({path: '/login'})
      }).catch(() => {
        // on cancel
      });
      } else {
        axios.defaults.headers.common['authToken'] = localStorage.name
        doPost(`${API_HOST}/api/club/tiezi/changeFollow`,{isFollowId:this.createuserid,status:1}).then(res => {
          if (res.data.code == 200) {
            console.log(res.data.list)
            Toast.success('关注成功')
            this.isFollowdone = false
            this.isFollowyep = true
          } else {
            Dialog.confirm({
            title: '提示',
            message: '请先登录'
          }).then(() => {
            this.$router.push({path: '/login'})
          }).catch(() => {
            // on cancel
          });
          }
        })
      }
    },
    followdone () {
      axios.defaults.headers.common['authToken'] = localStorage.name
      doPost(`${API_HOST}/api/club/tiezi/changeFollow`,{isFollowId:this.createuserid,status:0}).then(res => {
        if (res) {
          console.log(res.data.list)
          Toast.success('取消成功')
          this.isFollowdone = true
          this.isFollowyep = false
        }
      })
    },
    onClickLeft() {
      // this.$router.push({path: '/communityContent'})
      this.$router.back()
    },
    toSave () {
      if (!localStorage.name) {
        // this.show = true
        Dialog.confirm({
          title: '提示',
          message: '请先登录'
        }).then(() => {
          this.$router.push({path: '/login'})
        }).catch(() => {

        })
      } else {
        axios.defaults.headers.common['authToken'] = localStorage.name
        doPost(`${API_HOST}/api/club/tiezi/changeCollectTiezi`,{tieziId:this.id,status:1}).then(res => {
          if (res.data.code == 200) {
            console.log(res.data.list)
            this.isSave = false
            this.istSave = true
            Toast.success('收藏成功')
          } else {
            Dialog.confirm({
              title: '提示',
              message: '请先登录'
            }).then(() => {
              this.$router.push({path: '/login'})
            }).catch(() => {
              // on cancel
            })
          }
        })
      }
    },
    toIntSave () {
      axios.defaults.headers.common['authToken'] = localStorage.name
      doPost(`${API_HOST}/api/club/tiezi/changeCollectTiezi`,{tieziId:this.id,status:0}).then(res => {
        if (res) {
          console.log(res.data.list)
          // this.isSave = true
          this.isSave = true
          this.istSave = false
          Toast.success('取消收藏')
        }
      })
    },
    reviewList (item) {
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
        this.$router.push({path: '/reviews',
          query: {
            id: this.id,
            huifuid: item.id
          }
        })
      }
    },
    toPersonInfoemation () {
      this.$router.push({path: '/detailPerson',
        query: {
          createuserid: this.createuserid
        }
      })
    }
  }
}
</script>
<style>
@import './style.css';
@import '../managePost/style.css';
</style>