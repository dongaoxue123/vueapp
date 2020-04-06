<template>
  <div>
    <div id="app">
      <!-- <keep-alive> -->
      <router-view></router-view>
    <!-- </keep-alive> -->
    </div>
  </div>
</template>

<script>
import Home from './pages/home/home'
import store from './stores/store.js'
// import { Search } from 'vant'
export default {
  name: 'App',
}
</script>

<style>
</style>
