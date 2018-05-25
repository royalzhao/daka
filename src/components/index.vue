<template>
  <div class="hello">
    <div class="main-content">
        <router-view/>
    </div>
    <div class="footer">
        <cfooter></cfooter>
    </div>
    
  </div>
</template>

<script>
  import cfooter from './common/footer.vue'
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    components:{
      cfooter
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.main-content{
  margin-bottom: 68px;
}
.footer{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
</style>
