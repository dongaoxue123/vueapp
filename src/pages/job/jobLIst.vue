<template>
  <div style="height:100%">
    <div style="background: #5fa1ff;padding-left: 8px;padding-right: 8px;    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #5ca3ff;">
     
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      shape="round"
      right-icon="search"
      @search="onSearch(value)"
      background="#5fa1ff"
      style="width:100%;"
      color="#ffffff"
      action-text
    >
  </van-search>
  <van-icon  @click="tohome" style="margin-left: 10px;" color="#fff" size="20px" name="manager" />
  </div>
  <div style="background-image: linear-gradient(#5ca3ff, #ebf1fd);padding-bottom: 20px;">
    <div style="color: aliceblue;margin: 0;padding: 0;font-size: 22px;margin-left: 14px;">推荐职位</div>
    <div  @scroll="scrollEvent" >
    <div  @click="toDeatilJob(index)" v-for="(index,item) in joblist" style="background: #fff;margin: 0 auto;border-radius: 6px;height: 120px;width: 350px;margin-top: 20px;padding: 8px;">
      <div style="display: flex;justify-content: space-between;">
        <div style="font-size: 18px;font-weight: 550;color: #3b3b3b;">{{index.jobname}}</div><div style="color: #ff887a;font-size: 18px;font-weight: 550;">{{index.salary}}-{{index.salarymax}}</div>
      </div>
      <div style="display: flex;justify-content: flex-start;margin-top: 10px;">
        <div class="jobex">{{index.experience}}</div>
        <div class="jobex"></div>
        <div class="jobex">{{index.education}}</div>
        <div class="jobex">{{index.jobadd}}</div>
      </div>
      <div>
        <div style="color: #777777;margin-top: 10px;">{{index.jobtime.substring(10,0)}}</div>
      </div>
      <div style="display: flex;justify-content: flex-start;margin-top: 4px;">
        <div style="border-radius: 50%;width: 30px;height: 30px;">
        <img style="width: 30px;height: 30px;border-radius: 50%;" src="../../../static/img/user2.jpg" alt="">
        </div>
        <div style="height: 30px;line-height: 30px;margin-left: 8px;color: #3c3c3c;font-size: 15px;">
          {{index.company}}
        </div>
      </div>
    </div>
    <div v-if= "showloding" style="display: flex;align-items: center;justify-content: center;margin-top: 10px;"> <van-loading  style="margin: auto;" type="spinner" color="#1989fa" /></div>
  </div>
  </div>
  </div>
</template>
<script>
import Vue from 'vue'
import store from '../../stores/store.js'
import { NavBar } from 'vant'
import { Field } from 'vant'
import { Image } from 'vant'
import { Toast } from 'vant'
import { doGet }  from '../../utils/index.js'
import { doPost }  from '../../utils/index.js'
import { API_HOST }  from '../../utils/api.js'
import { Button } from 'vant'
import { Search, Icon } from 'vant'
import axios from 'axios'
// import  store from '../stores/store.js'
Vue.use(Search)
Vue.use(Icon)
Vue.use(Image)
Vue.use(Field)
Vue.use(NavBar)
Vue.use(Toast)
Vue.use(Button)
export default {
  name: 'JobList',
  data () {
    return {
      value:'',
      joblist:[],
      page:1,
      showloding:false
    }
  },
  mounted() {
    window.addEventListener('scroll', () => {
      let scrollTop = document.documentElement.scrollTop ||
                      document.body.scrollTop ||
                      document.querySelector('.element').scrollTop
      // console.log(scrollTop);
      if(scrollTop + window.innerHeight >= document.body.offsetHeight) {
        console.log('bottom')
        this.showloding = true
        axios.defaults.headers.common['authToken'] = localStorage.name
        doGet(`${API_HOST}/api/job/job/getJobByPage`,{pageNum:++this.page,pageSize:10}).then(res => {
          if (res.data.code=="200") {
            console.log(res.data.list)
            // if(res.data.list.length<10){

            // }
            this.joblist=this.joblist.concat(res.data.list)
            this.$forceUpdate() 
            this.showloding = false
            console.log(this.joblist)
          } else if (res.data.code=="501"){
            this.showloding = false
            // alert('暂无更多')
            Toast('暂无更多');
          }
        })
      }
    }, true);
    axios.defaults.headers.common['authToken'] = localStorage.name
    doGet(`${API_HOST}/api/job/job/getJobByPage`,{pageNum:this.page,pageSize:10}).then(res => {
      if (res) {
        // console.log(res)
        this.joblist = res.data.list
      }
    })
  },
  methods: {
    onSearch (value) {
      console.log(value)
      this.$router.push({path: '/searchjob',
      query: {
          name: value,
        }
      })
    },
    scrollEvent(e){
        console.log(e)
      },

    toDeatilJob(index){
      console.log(index)
      this.$router.push({path: '/detaliJob',
        query: {
          id: index.companyid
        }
      })
    },
    tohome(){
      this.$router.push({path: '/mineJob',})
    }
  }
}
</script>
<style>
  .jobex{
    background: #f8f8f8;color: #777777;margin-right: 6px;font-size: 14px;
  }
/* @import './style.css'; */
</style>