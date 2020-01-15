<template>
    <div>
      <van-nav-bar title="" left-text="返回" @click-left="onClickLeft" left-arrow>
      <van-icon name="" slot="right" />
      </van-nav-bar>
      <div>
        <div class="postflex">
          <div @click="toPersonInfoemation" style="margin: 0;margin-top:10px;margin-left: 10px;" class="postimg"><img style="width:30px; height:30px" src="../../../static/img/user.png">
          </div>
          <div style="padding: 0;padding: 5px;" class="righttxt">
            <div style="display: flex;justify-content: space-between;align-items: center;margin-top: 10px;">
            <h5 style="color:#909090;margin: 0;margin-bottom: 5px;">{{title}}</h5>
            <!-- <van-button v-if="isFollowdone" size="mini" @click="followPer" plain type="info">
              <van-icon name="plus" /><span style="color: #5a5a5a;font-size: 12px;">关注</span>
            </van-button>
              <van-button size="mini" @click="followdone" v-if="isFollowyep" plain type="info"><van-icon name="success" />
              <span style="color: #5a5a5a;font-size: 12px;">取消关注</span></van-button> -->
            </div>
            <div style="margin-top: 10px;">
              <span style="color:pink;font-size:14px">【{{type}}】</span>&nbsp;&nbsp;&nbsp;<span style="font-size:14px;color:#333;font-weight: 600;">{{bookName}}</span>
            </div>
            <p style="color:#5a5a5a;font-size:14px">{{txt}}</p>
            <div style="display: flex;justify-content: space-between;align-items: center;">
              <a :href="'http://192.168.1.50:8093/api/club/file/download?fileName='+href+''"><span  v-if="isHref">文件下载</span></a>
             <div style="font-size: 11px;"> 
                <!-- <van-icon @click="toSave" v-if="isSave" name="star-o"/>
              <van-icon @click="toIntSave" v-if="istSave" name="star"/>
              <span style="color:#565656;font-size:12px">收藏</span> -->
              <span @click="toReview"><van-icon name="chat-o" /><span style="color:#565656;font-size:12px">评论</span></span>
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
              <!-- <h5 v-if="item.freply!=''" style="color:#585858;margin: 0;margin-top: 5px;margin-bottom: 5px;">{{item.freply}}</h5>  -->
              <h5  style="color:#585858;margin: 0;margin-top: 5px;margin-bottom: 5px;">{{item.username}}</h5> 
              <h5 v-if="item.freply!=''" style="color:#585858;margin: 0;margin-top: 5px;margin-bottom: 5px;">->{{item.freply}}</h5> 
            <!-- <div @click="popdoneText" style="border: 1px solid red;border-radius: 5px 5px 5px 5px;font-size:12px; color:red;width: 30px;text-align: center;">禁言</div> -->
          </div>
          <div style="color: #585858;font-size: 14px">{{item.createtime}}</div>
        </div>
        <p style="color: #585858;font-size: 14px;">{{item.contenttxt}}</p>
        <div class="buttext">
          <div></div>
            <div @click="reviewList(item)" style="display: flex;justify-content: center;align-items: center;">
              <!-- <span><van-icon name="delete" /><span style="color: #585858;font-size: 12px">删除</span></span> -->
              <van-icon name="chat-o" /><span style="color: #585858;font-size: 12px">评论</span>
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
    name: 'MineDetailPost',
    data () {
      return {
        title:'',
        href:'',
        type:'资源',
        time: '2016.12.34',
        bookName: this.$route.query.name,
        txt:'dfdhfskdlhf是否考虑是否落实附件里是会计就就发送大附件四分',
        isSave:true,
        istSave: false,
        pinglunList : [],
        huifuid: 0,
        id: 0,
        huifu: false,
        isHref: false,
        isFollowdone: true,
        isFollowyep: false,
        fileName: ''
      }
    },
    mounted() {
      // localStorage.name = ''
      doGet(`${API_HOST}/api/club/tiezi/getTieziByid`, {id:this.$route.query.id}).then(res => {
        if (res) {
          console.log(res.data)
          // this.contentList=res.data.list
          this.title = res.data.t.userName
          this.fileName = res.data.t.name
          // this.resourcePath = res.data.t.resourcePath
          this.id = res.data.t.id
          this.pinglunList = res.data.list
          this.href = res.data.t.resourcePath
          if (res.data.t.resourcePath!=''){
            this.href = res.data.t.resourcePath
            this.isHref = true
          } else {
            this.isHref = false
          }
          // this.pinglunList.forEach(item => {
          //   console.log(item.freply)   
          // });
          // this.txt = res.data.t.contenttxt
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
        });
        } else {
        this.$router.push({path: '/review',
        query: {
            id: this.id
          }
        })}
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
        doPost(`${API_HOST}/api/club/tiezi/changeFollow`,{isFollowId:this.id,status:1}).then(res => {
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
      })}
      },
      followdone () {
        doPost(`${API_HOST}/api/club/tiezi/changeFollow`,{isFollowId:this.id,status:0}).then(res => {
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
          // on cancel
        });
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
            });
            }
          })
        }
      },
      toIntSave () {
        doPost(`${API_HOST}/api/club/tiezi/changeCollectTiezi`,{tieziId:this.id,status:0}).then(res => {
        if (res) {
          console.log(res.data.list)
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
            id: this.id,
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