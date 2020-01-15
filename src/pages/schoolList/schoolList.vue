<template>
  <div>
    <van-nav-bar
      title="内容"
      left-text="返回"
      right-text=""
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-list>
      <div style="border-bottom: 1px solid #e5e5e5;padding: 10px;" @click="tocontent(item)" v-for="(item,index) in contentSchoolList">{{item.name}}</div>
    </van-list>
  </div>
</template>
<script>
import Vue from 'vue'
import  store from '../../stores/store.js'
import { NavBar } from 'vant'
import { API_HOST }  from '../../utils/api.js'
import { doGet }  from '../../utils/index.js'
import { List } from 'vant'
Vue.use(List)
Vue.use(NavBar)
export default {
  name:'SchoolList',
  data() {
    return {
      contentSchoolList:[]
    }
  },
  mounted() {
    doGet(`${API_HOST}/api/club/bankuai/getBankuaiByAreaId`,{areaId:this.$route.query.optionid}).then(res => {
      if (res) {
        console.log(res.data.list)
        this.contentSchoolList = res.data.list
      }
    })
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    tocontent(item){
      store.commit('calcOrderSum', {id: item.id})
      store.commit('blockName', {name: item.name})
      this.$router.push({path: '/communityContent',
        query: {
          id: item.id,
          name:item.name
        }
      })
    }
  },
}
</script>