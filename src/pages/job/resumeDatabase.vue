<template>
  <div>
    <div style="background-image: linear-gradient(#5ca3ff, #ebf1fd);padding-bottom: 20px;padding-left: 20px;padding-right: 20px;">
      <h3 style="color: aliceblue;margin: 0;padding-top: 20px;">
        简历库
      </h3>
      <div @click="toresume(index)" v-for="(index,item) in joblist" style="background-color: #fff;padding: 10px;height: 120px;width: 350px;border-radius: 4px;margin: 0 auto;margin-top: 20px;">
      <div style="display: flex;justify-content: space-between;align-items: center;background-color: #fff;">
        <!-- <div style="background-color: #fff;padding: 5px;"> -->
          <div style="display: flex;justify-content: flex-start;align-items: center;margin-top: 5px;">
            <img style="width: 50px;height: 50px;border-radius: 50%;" src="../../../static/img/user.jpg" alt="">
            <div style="margin-left: 10px;">
              <div>
              {{index.uname}} {{index.sex}}
            </div>
            <div style="font-weight: 600;">{{index.expectwork}}</div>
              <div style="display: flex;justify-content: flex-start;margin-top: 10px;">
                <div class="jobex">{{index.age}}</div>
                <div class="jobex">{{index.workexperience}}</div>
                <div class="jobex">{{index.expectworkcity}}</div>
                <div class="jobex">{{index.education}}</div>
              </div>
            </div>
            <!-- djfjfoiwue -->
          </div>
          <div style="color: #ff887a;font-size: 18px;font-weight: 550;">
            {{index.expectworksalary}}
          </div>
        </div>
          <!-- <div style="display: flex;justify-content: space-between;align-items: center;margin-top: 10px;font-size: 14px;">
            <div>北京小龙潜行科技有限公司</div>
            <div>2019.11-2020.6</div>
          </div>
          <div style="display: flex;justify-content: space-between;align-items: center;font-size: 14px;">
            <div>北京小龙潜行科技有限公司</div>
            <div>2019.11-2020.6</div>
          </div> -->
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
import axios from 'axios'
Vue.use(Image)
Vue.use(Field)
Vue.use(NavBar)
Vue.use(Toast)
Vue.use(Button)
export default {
  name: 'resumeDatabase',
  data () {
    return {
      page:1,
      joblist:[]
    }
  },
  mounted() {
    axios.defaults.headers.common['authToken'] = localStorage.name
    doGet(`${API_HOST}/api/job/resumeCompany/getResumeList`,{pageNum:this.page,pageSize:10,}).then(res => {
      if (res) {
        // console.log(res)
        this.joblist = res.data.list
      }
    })
  },
  methods: {
    toForJobDetail(){
      this.$router.push({path: '/jobList'})
    },
    toresume(index){
      console.log(index)
      this.$router.push({path: '/resume',
        query: {
          id: index.id
        }
      })
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