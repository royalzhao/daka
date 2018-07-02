<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url("//at.alicdn.com/t/font_625310_xp70ldy2bw8.css");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

@import url("../static/css/style.css");
#app {
  font-family: '黑体';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  background: #f9f9f9;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
