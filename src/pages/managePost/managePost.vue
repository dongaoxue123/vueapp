<template>
  <div>
    <van-nav-bar title="" left-text="" @click-left="onClickLeft"  left-arrow>
      <van-icon name="" slot="right" />
    </van-nav-bar>
    <div>
      <div class="postflex">
        <div @click="toDetailPerson">
          <div @click="toPersonInfoemation"  class="postimg">
            <img style="width:30px; height:30px" src="../../../static/img/user.jpg">
          </div>
        </div>
        <div style="width: 100%;" class="righttxt">
          <div @click="popdoneText" style="border: 1px solid red;border-radius: 5px 5px 5px 5px;font-size:12px; color:red;width: 30px;text-align: center;">禁言
          </div>
            <van-popup
            v-model="isShowDone"
            round
            position="bottom"
            :style="{ height: '60%' }"
            >
              <div style="padding: 20px;">
                <h3>是否将以下主题禁言</h3>
                <span style="color:pink;font-size:15px;font-weight: 600;">【{{type}}】</span>&nbsp;&nbsp;&nbsp;<span style="font-size:15px;color:#333;font-weight: 600;">{{name}}</span>
                <h4>禁言原因</h4>
                <!-- <van-radio-group v-model="radio" @change="changeTalk">
                  <van-radio style="margin-top: 20px;" name="违反法律">违反法律</van-radio>
                  <van-radio style="margin-top: 20px;" name="低俗内容">低俗内容</van-radio>
                  <van-radio style="margin-top: 20px;" name="单选框 1">单选框 1</van-radio>
                  <van-radio style="margin-top: 20px;" name="单选框 2">单选框 2</van-radio>
                </van-radio-group> -->
                <van-radio-group v-model="radio" @change="changeTalk">
                  <van-radio style="margin-top: 20px;" name="0">三天</van-radio>
                  <van-radio style="margin-top: 20px;" name="1">七天</van-radio>
                  <van-radio style="margin-top: 20px;" name="2">一个月</van-radio>
                </van-radio-group>
                <van-cell-group style="margin-top: 20px;">
                  <van-field
                    style="margin-top: 20px;"
                    v-model="message"
                    rows="1"
                    autosize
                    label="禁言原因"
                    type="textarea"
                    placeholder="请输入"
                    @input="changeTalkup"
                  />
                </van-cell-group>
                <div class="savebut">
                  <van-button @click="canel3"  style="padding-left: 20px;padding-right: 20px;font-size: 15px;" type="default">取消</van-button>
                  <van-button @click="sureTalk" style="padding-left: 20px;padding-right: 20px;" type="info">确认</van-button>
                </div>
              </div>
            </van-popup>
            <div style="display: flex;justify-content: space-between;align-items: center;margin-top: 10px;">
              <h5 style="color:#909090;margin: 0;margin-bottom: 5px;">{{title}}</h5>
              <van-button v-if="isFollowdone" size="mini" @click="followPer" plain type="info">
                <van-icon name="plus" /><span style="color: #5a5a5a;font-size: 12px;">关注</span>
              </van-button>
              <van-button size="mini" @click="followdone" v-if="isFollowyep" plain type="info"><van-icon name="success" />
                <span style="color: #5a5a5a;font-size: 12px;">取消关注</span>
              </van-button>
            </div>
            <span style="color:pink;font-size:15px;font-weight: 600;">【{{type}}】</span>&nbsp;&nbsp;&nbsp;<span style="font-size:15px;font-weight: 600;color:#333">{{name}}</span>
            <p style="color:#565656;font-size:14px">{{txt}}</p>
            <div v-if="isHref"><a :href="'/api/club/file/download?fileName='+href+'&userid='+uuid+''"><img v-if="isisimg" style="width: 100%;height: 100%;" :src="'/api/club/file/download?fileName='+href+''"></a>
              <a v-if="isImg" :href="'/api/club/file/download?fileName='+href+''" style="flex-wrap: wrap;" ><div style="width: 100px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{href}}</div>下载</a>
            </div>
              <div>
              <div class="burBlock">
                <div class="setButton">
                  <van-button @click="popElite" style="border-radius: 4px 4px 4px 4px;border-color: #f89f8d;color: #f89f8d;" size="mini" plain type="info">设为精华</van-button>
                    <van-popup
                      v-model="isShowCream"
                      round
                      position="bottom"
                      :style="{ height: '50%' }"
                    >
                    <div style="padding: 20px;">
                      <h3>是否将以下主题设为精华</h3>
                      <span style="color:pink;font-size:14px">【{{type}}】</span>&nbsp;&nbsp;&nbsp;<span style="font-size:14px;color:#333">{{name}}</span>
                      <van-radio-group v-model="radio" @change="changeName">
                        <van-radio style="margin-top: 20px;" name="1">重要资料</van-radio>
                        <van-radio style="margin-top: 20px;" name="2">很有价值</van-radio>
                        <van-radio style="margin-top: 20px;" name="3">单选框 1</van-radio>
                        <van-radio style="margin-top: 20px;" name="4">单选框 2</van-radio>
                      </van-radio-group>
                      <div class="savebut">
                        <van-button @click="canel"  style="padding-left: 20px;padding-right: 20px;font-size: 15px;" type="default">取消</van-button>
                        <van-button @click="sureCream" style="padding-left: 20px;padding-right: 20px;" type="info">确认</van-button>
                      </div>
                    </div>
                  </van-popup>
                  <van-button @click="popDel" style="border-radius: 4px 4px 4px 4px;border-color: #eaeaea;color: #585858;" size="mini" plain type="info">删除</van-button>
                    <van-popup
                      v-model="isShowdel"
                      round
                      position="bottom"
                      :style="{ height: '50%' }"
                    >
                      <div style="padding: 20px;">
                        <h3>是否将以下主题删除</h3>
                        <span style="color:pink;font-size:14px">【{{type}}】</span>&nbsp;&nbsp;&nbsp;<span style="font-size:14px;color:#333">{{name}}</span>
                          <van-radio style="margin-top: 20px;" name="1">因敏感词被系统删除</van-radio>
                          <van-radio style="margin-top: 20px;" name="2">不同意见，被版主删除</van-radio>
                          <van-radio style="margin-top: 20px;" name="3">严重违规被系统永久删除</van-radio>
                        </van-radio-group>
                        <div class="savebut">
                          <van-button @click="canel1" style="padding-left: 20px;padding-right: 20px;font-size: 15px;" type="default">取消</van-button>
                          <van-button @click="sureDelTxt" style="padding-left: 20px;padding-right: 20px;" type="info">确认</van-button>
                        </div>
                      </div>
                    </van-popup>
                    <van-button @click="popMove" style="border-radius: 4px 4px 4px 4px;border-color: #eaeaea;color: #585858;" size="mini" plain type="info">移动</van-button>
                      <van-popup
                        v-model="isShowMove"
                        round
                        position="bottom"
                        :style="{ height: '70%' }"
                      >
                      <div style="padding: 20px;">
                      <h3>是否将以下主题移动到目标板块</h3>
                      <span style="color:pink;font-size:14px; font-weight: 600;">【{{type}}】</span>&nbsp;&nbsp;&nbsp;<span style="font-size:14px;color:#333;font-weight: 600;"></span>{{name}}</span>
                      <h4>移动到</h4>
                      <div class="blockBut">
                        <van-radio-group style="display: flex;justify-content: space-between;align-content: center;flex-wrap: wrap;" v-model="radio" @change="changemove">
                          <van-radio v-for="(item,index) in bolckList" :key="index" style="margin-top: 20px;" :name = "index">{{item.name}}</van-radio>
                        </van-radio-group>
                      </div>
                      <h4>地区/高校</h4>
                      <h4>其他</h4>
                      <div class="savebut">
                        <van-button @click="canel2"  style="padding-left: 20px;padding-right: 20px;font-size: 15px;" type="default">取消</van-button>
                        <van-button @click="sureMove" style="padding-left: 20px;padding-right: 20px;" type="info">确认</van-button>
                      </div>
                    </div>
                  </van-popup>
                </div>
                <div>
                  <van-icon @click="toSave" v-if="isSave" size="13px" name="star-o"/>
                  <van-icon @click="toIntSave" v-if="istSave" size="13px" name="star"/>
                  <span style="color:#565656;font-size:13px">收藏</span>
                  <span @click="toReview"><van-icon name="chat-o"/><span style="color:#565656;font-size:14px">评论</span></span>
                </div>
              </div>
            </div>
          </div>
          </div>
          <h4 style="padding: 10px;">评论</h4>
          <div v-for="(item, index) in pinglunList" style="padding: 5px;" class="pinglunblock">
            <div style="margin: 0;margin-left: 10px;" class="postimg"><img style="width:30px; height:30px" src="../../../static/img/user.png" alt=""></div>
            <div style="margin-left: 5px;width: 100%;">
              <div class="pinglun">
                <div class="headerdone">
                  <h5 style="color:#585858;margin: 0;margin-top: 5px;margin-bottom: 5px;">{{item.username}}</h5> 
                  <h5 v-if="item.freply!=''" style="color:#585858;margin: 0;margin-top: 5px;margin-bottom: 5px;">->{{item.freply}}</h5> 
                <div @click="popdoneText" style="border: 1px solid red;border-radius: 5px 5px 5px 5px;font-size:12px; color:red;width: 30px;text-align: center;">禁言</div>
              </div>
              <div style="color: #585858;font-size: 14px">{{time}}</div>
            </div>
            <p style="color: #585858;font-size: 14px">{{item.contenttxt}}</p>
            <div class="buttext">
              <div></div>
              <div>
                <span><van-icon name="delete"/><span style="color: #585858;font-size: 12px">删除</span></span>
                <span @click="reviewList(item)"><van-icon name="chat-o" /><span style="color: #585858;font-size: 12px">评论</span></span>
              </div>
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
import { Popup } from 'vant'
import { RadioGroup, Radio } from 'vant'
import { Divider } from 'vant'
import { Checkbox, CheckboxGroup } from 'vant'
import { doGet }  from '../../utils/index.js'
import { doPost }  from '../../utils/index.js'
import { Toast } from 'vant'
import store from '../../stores/store.js'
import { API_HOST }  from '../../utils/api.js'
import { DropdownMenu, DropdownItem } from 'vant'
import { Field } from 'vant'
import { Dialog } from 'vant'
Vue.use(Dialog)
Vue.use(Field)
Vue.use(DropdownMenu).use(DropdownItem)
Vue.use(Checkbox).use(CheckboxGroup)
Vue.use(Divider)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Popup)
Vue.use(Icon)
Vue.use(NavBar)
Vue.use(Toast)
export default {
  name: 'ManagePost',
  data () {
    return {
      value1: 0,
      option1: [
        { text: '三天', value: 0 },
        { text: '七天', value: 1 },
        { text: '一个月', value: 2 }
      ],
      checked: true,
      name: '',
      contentList: [],
      title:'',
      isShowCream: false,
      isSave:true,
      istSave: false,
      isImg: true,
      type:'',
      time:'',
      radio: '1',
      bookName:'',
      isShowdel: false,
      isShowMove: false,
      isShowDone:false,
      pinglunList: [],
      changeNameTxt: 0,
      changeTalkTxt: '',
      changeTalkuptxt: '',
      changedelTxt:'',
      txt:'',
      href:'',
      fileName: '',
      huifuid: 0,
      id: 0,
      isimg: [],
      isisimg: true,
      createuserid:0,
      huifu: false,
      isHref: false,
      isFollowdone: true,
      isFollowyep: false,
      bolckList : [],
      uuid: localStorage.userid
    }
  },
  mounted () {
    doGet(`${API_HOST}/api/club/tiezi/getTieziByid`, {id:this.$route.query.id,userid:localStorage.userid}).then(res => {
      if (res) {
        console.log(res.data)
        // this.contentList=res.data.list
        this.title = res.data.t.userName
        this.id = res.data.t.id
        this.pinglunList = res.data.list
        this.name = res.data.t.name
                // this.contentList=res.data.list
        this.title = res.data.t.userName
        this.fileName = res.data.t.name
        // this.resourcePath = res.data.t.resourcePath
        this.txt = res.data.t.contenttxt
        this.id = res.data.t.id
        this.createuserid = res.data.t.createuserid
        this.pinglunList = res.data.list
        this.href = res.data.t.resourcePath
        this.type = res.data.t.zhutiName
        // this.createuserid = res.data.t.createuserid
        this.isimg = this.href.split('.')
        console.log(this.isimg[1])
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
          })
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
    popElite () {
      this.isShowCream = true
    },
    changeName (name) {
      this.changeNameTxt = name
      console.log(name)
    },
    changeTalk (name) {
      console.log(event)
      this.changeTalkTxt = name
    },
    changeTalkup (value) {
      this.changeTalkuptxt = value
    },
    sureTalk () {
      axios.defaults.headers.common['authToken'] = localStorage.name
      doPost(`${API_HOST}/api/club/tiezi/setGag`, {createuserid:this.$route.query.id, delReason:this.changeTalkuptxt, status: this.changeTalkTxt}).then(res => {
        if (res) {
          console.log(res.data)
          Toast.success('设置成功')
          this.isShowDone = false
        }
      })
    },
    sureCream () {
      axios.defaults.headers.common['authToken'] = localStorage.name
      doPost(`${API_HOST}/api/club/tiezi/setJinghua`, {id:this.$route.query.id, Jinghua:this.changeNameTxt}).then(res => {
        if (res) {
          console.log(res.data)
          Toast.success('设置成功')
          this.isShowCream = false
        }
      })
    },
    changedel (name){
      this.changedelTxt = name
    },
    changemove (name) {
      this.changemovetxt = name
    },
    sureMove () {
      axios.defaults.headers.common['authToken'] = localStorage.name
      doPost(`${API_HOST}/api/club/tiezi/moveTiezi`, {id:this.$route.query.id, bankuaiId:this.changemovetxt}).then(res => {
        if (res) {
          console.log(res.data)
          Toast.success('设置成功')
          this.isShowMove = false
        }
      })
    },
    sureDelTxt () {
      axios.defaults.headers.common['authToken'] = localStorage.name
      doPost(`${API_HOST}/api/club/tiezi/delTiezi`, {id:this.$route.query.id, delReason:this.changedelTxt}).then(res => {
        if (res) {
          console.log(res.data)
          Toast.success('设置成功')
          this.isShowdel = false
        }
      })
    },
    canel () {
      this.isShowCream = false
    },
    onClickLeft () {
      this.$router.back()
    },
    popDel () {
      this.isShowdel= true
    },
    canel1 () {
      this.isShowdel= false
    },
    popMove () {
      this.isShowMove = true
      doGet(`${API_HOST}/api/club/bankuai/getBankuaiList`,{parentid: 1}).then(res => {
      if (res) {
        console.log(res.data.list)
        // this.show = false
        this.bolckList = res.data.list
      }
    })
    },
    canel2 () {
      this.isShowMove = false
    },
    popdoneText () {
      this.isShowDone = true
    },
    canel3 () {
      this.isShowDone = false
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
    toDetailPerson () {
      this.$router.push({path: '/detailPerson'})
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
        });
        }
      })
    }
  },
  toIntSave () {
    axios.defaults.headers.common['authToken'] = localStorage.name
    doPost(`${API_HOST}/api/club/tiezi/changeCollectTiezi`,{tieziId:this.id,status:0}).then(res => {
    if (res) {
      console.log(res.data.list)
      this.isSave = true
      this.istSave = false
      Toast.success('取消收藏')
      }
    })
  },
  toPersonInfoemation () {
    this.$router.push({path: '/detailPerson',
      query: {
        createuserid: this.createuserid,
      }
    })
  }
  },
}
</script>
<style>
@import './style.css';
</style>