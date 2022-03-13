<template>
  <div id="app">
    <h1>Routing</h1>
    <first-component />
    <router-view></router-view>
  </div>
</template>

<script>
import FirstComponent from './components/FirstComponent'


export default {
  components: {FirstComponent}
  
}
</script>


<style lang='scss' scoped>

</style>
