<template>
    <div>
      <Searchs/>
      <div class="textname">
        <h3>板块
        </h3>
        <div class="textbolck">
          <div @click="toContent(item)" v-for="(item,index) in bolckList " class="maintext">{{item.name}}</div>
        </div>
      </div>
      <div class="textname">
        <h3>地区/学校</h3>
          <div class="textbolck">
            <p @click="toschool(item)" v-for="(item,index) in bolckListsh" class="maintext">{{item.optionname}}</p>
          </div>
        </div>
      <div class="textname">
       <h3>休闲灌水</h3>
        <div class="textbolck">
          <p v-for="(item,index) in bolckListsafe" class="maintext">{{item.name}}</p>
        </div>
      </div>
      <van-overlay :show="show">
        <div style="display: flex;align-items: center;justify-content: center;height: 100%;">
          <van-loading />
        </div>
    </van-overlay>
    </div>
</template>
<script>
import Vue from 'vue'
import Searchs from '../../components/search'
import { doGet }  from '../../utils/index.js'
import { API_HOST }  from '../../utils/api.js'
import store from '../../stores/store.js'
import { Overlay } from 'vant'
import { Loading } from 'vant'
Vue.use(Loading)
Vue.use(Overlay)
export default {
  name: 'Community',
  components:{
    Searchs
  },
  data () {
    return {
      bolckList: [], 
      bolckListsh: [],
      bolckListsafe: [],
      show: true
    }
  },
  mounted() {
    doGet(`${API_HOST}/api/club/bankuai/getBankuaiList`,{parentid: 1}).then(res => {
      if (res) {
        console.log(res.data.list)
        this.show = false
        this.bolckList = res.data.list
      }
    })
    doGet(`${API_HOST}/api/club/bankuai/getBankuaiList`,{parentid: 2}).then(res => {
      if (res) {
        // console.log(res.data.list)
        this.show = false
        this.bolckListsafe = res.data.list
      }
    })
    doGet(`${API_HOST}/api/club/bankuai/getAllArea`,{optionType: 'area'}).then(res => {
      if (res) {
        console.log(res.data.list)
        this.show = false
        this.bolckListsh = res.data.list
      }
    })
  },
  methods: {
    toContent (item) {
      store.commit('calcOrderSum', {id: item.id})
      store.commit('blockName', {name: item.name})
      this.$router.push({path: '/communityContent',
        query: {
          id: item.id,
          name:item.name
        }
      })
    },
    toschool (item) {
      this.$router.push({path: '/schoolList',
        query: {
          // id: item.id,
          optionid: item.optionid,
          // name:item.name
        }
      })
    }
  },
}
</script>
<style>
@import './style.css';
</style>