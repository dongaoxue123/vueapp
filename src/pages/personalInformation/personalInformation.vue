<template>
  <div>
    <van-nav-bar
      title="个人中心"
      left-text=""
      right-text="设置"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div @click="setheaderimg" style="border-radius: 50%;border:1px solid #f1f1f1;width:5rem;height:5rem;margin:0 auto;margin-top:10px">
    <van-image
      round
      width="5rem"
      height="5rem"
      :src=imgsrc
    />
    <!-- <div @click="setheader" style="margin-top: 10px;">
      上传头像<van-icon  name="edit" />
    </div> -->
    </div>
    <van-image-preview
      v-model="show"
      :images="images"
      @change="onChange"
      @onClose="onClose"
    >
  <!-- <template v-slot:index>第{{ index }}页</template> -->
    </van-image-preview>
    <div style="display: flex;justify-content: center;"><span>{{name}}</span></div>
    <!-- <div style="display: flex;justify-content: center;"><span style="color:#989898;font-size:14px">{{lev}}：</span><span style="color:#ff9a8e;font-size:14px">{{nub}}</span></div> -->
      <div style="display: flex;justify-content: center;align-items: center;">
        <div style="padding:20px">
          <div>{{math}}</div>
          <div style="color:#989898;font-size:10px">积分</div>
        </div>
        <div style="padding:20px">
          <div>{{foll}}</div>
            <div style="color:#989898;font-size:10px">关注</div>
        </div>
        <div style="padding:20px">
          <div>{{fans}}</div>
          <div style="color:#989898;font-size:10px">粉丝</div>
        </div>
      </div>
      <van-grid clickable :column-num="3">
        <van-grid-item icon="star-o" text="我的收藏" to="/save" />
        <van-grid-item icon="upgrade" text="我的发布" to="/sharePost" />
        <van-grid-item icon="chat-o" text="我的回复" to="/mineReview" />
        <van-grid-item icon="description" text="我的简历" url="/vant/mobile.html" />
        <van-grid-item icon="contact" text="我的招聘" to="/" />
        <van-grid-item icon="aim" text="我的实践" url="/vant/mobile.html" />
      </van-grid>
    </div>
</template>
<script>
import Vue from 'vue'
import { NavBar } from 'vant'
import { Icon } from 'vant'
import { Row, Col } from 'vant'
import { Grid, GridItem } from 'vant'
import axios from 'axios'
import { API_HOST }  from '../../utils/api.js'
import { doGet }  from '../../utils/index.js'
import { ImagePreview } from 'vant'
Vue.use(ImagePreview)
Vue.use(Row).use(Col)
Vue.use(Grid).use(GridItem)
Vue.use(Icon)
Vue.use(NavBar)
export default {
  name: 'DetailPost',
  data () {
    return {
      name:'',
      lev:'',
      nub:'',
      foll:'',
      fans:'',
      math:'',
      show: false,
      images: [''],
      imgsrc :''
    }
  },
  mounted() {
    axios.defaults.headers.common['authToken'] = localStorage.name
    doGet(`${API_HOST}/api/club/userExt/getUserDetail`).then(res => {
      if (res) {
        this.name = res.data.t.uname
        this.foll = res.data.t.followTotals
        this.fans = res.data.t.fansTotals
        this.math = res.data.t.jifen
        this.imgsrc = res.data.t.profile
        this.images[0] = res.data.t.profile
        console.log(this.images)
      }
    })
  },
  methods: {
    onClickRight() {
      this.$router.push({path: '/setIformation'})
    },
    onClickLeft () {
      this.$router.back()
    },
    setheaderimg () {
      this.show = true
    },
    onClose () {
      this.show = false
    },
    setheader () {
      console.log(111)
      this.$router.push({path: '/setHeader'})
    }
  },
}
</script>
<style>

</style>