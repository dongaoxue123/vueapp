<template>
  <div>
    <van-nav-bar
    title="我的"
    left-text=""
    right-text=""
    left-arrow
    @click-left="onClickLeft"
    />
    <div style="padding: 20px;">
      <div style="display: flex;justify-content: flex-start;margin-top: 20px;">
        <img style="width: 70px;height: 70px;border-radius: 50%;" src="../../../static/img/user2.jpg" alt="">
        <div style="margin-left: 20px;">
          <div style="font-size: 20px;font-weight: 550;">小团子</div>
          <div style="font-size: 17px;margin-top: 5px;">java工程师</div>
          <div style="font-size: 14px;color: #747273;margin-top: 2px;">28岁 工作5年 本科</div>
        </div>
      </div>
      <div style="height: 2px;border-bottom:  1px solid #eaeaea;margin-top: 20px;"></div>
      <div style="font-size: 18px;margin-top: 20px;color: #3b3b3b;">
        我的简历
      </div>
      <div style="color: #b0acad;font-size: 16px;margin-top: 10px;">
        完善简历提高您的录取率
      </div>
      <div style="height: 30px;
      color: #ff887a;
      text-align: center;
      width: 80px;
      border-radius: 4px;
      border: 1px solid #ff887a;
      line-height: 30px;font-size: 15px;margin-top: 10px;font-weight: 600;">
      去完善
      </div>
      <div style="height: 2px;border-bottom:  1px solid #eaeaea;margin-top: 20px;"></div>
      <div style="display: flex;justify-content: space-between;align-items: center;padding: 20px;margin-top: 20px;">
        <div style="display: flex;justify-content: center;align-items: center;flex-wrap: wrap;width: 40px;">
          <div style="color: #b0acad;font-size: 15px;">
            18
          </div>
          <div style="font-size: 16px;font-weight: 600;margin-top: 10px;color: #3a3a3a;">收藏</div>
        </div>
        <div style="display: flex;justify-content: center;align-items: center;flex-wrap: wrap;width: 40px;">
          <div style="color: #b0acad;font-size: 15px;">
            18
          </div>
          <div style="font-size: 16px;font-weight: 600;margin-top: 10px;color: #3a3a3a;">关注</div>
        </div>
        <div style="display: flex;justify-content: center;align-items: center;flex-wrap: wrap;width: 70px;">
          <div style="color: #b0acad;font-size: 15px;">
            18
          </div>
          <div style="font-size: 16px;font-weight: 600;margin-top: 10px;color: #3a3a3a;">最近浏览</div>
        </div>
        <div style="display: flex;justify-content: center;align-items: center;flex-wrap: wrap;width: 70px;">
          <div style="color: #b0acad;font-size: 15px;">
            18
          </div>
          <div style="font-size: 16px;font-weight: 600;margin-top: 10px;color: #3a3a3a;">应聘记录</div>
        </div>
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
import { Icon } from 'vant'
Vue.use(Icon)
Vue.use(Image)
Vue.use(Field)
Vue.use(NavBar)
Vue.use(Toast)
Vue.use(Button)
export default {
  name: 'MineJob',
  data () {
    return {

      
    }
  },
  methods: {
    onClickLeft(){
      this.$router.back()
    }
  }
}
</script>
<style>
  .compname{
    color: #3b3b3b;
    font-size: 15px;
    margin-bottom: 20px;
  }
/* @import './style.css'; */
</style>