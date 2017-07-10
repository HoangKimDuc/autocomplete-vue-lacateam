<template>
  <div id="app">
    <img src="http://vuejs.org/images/logo.png">
    <h1>{{ msg }}</h1>
    <div class="" style="margin:20px auto; width:400px;">
    <autocomplete 
    :url="'https://jsonplaceholder.typicode.com/users'"
    :callbackdata="mess"
    :callbackdataselected="mess"></autocomplete>
    </div>
  </div>
</template>

<script>
   // Vue.prototype.$http = window.axios;
  // import $ from 'jquery'
import autocomplete from './AutoComplete.vue'
export default {
  name: 'app',
  components:{
    autocomplete
  },
  data () {
    return {
      msg: 'Auto complete VueJs 2'
    }
  },
  methods:{
    mess:function(e){
      console.log(e);
    }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

img {
  width: 200px;
  height: 200px;
}

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
</style>
