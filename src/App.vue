<template>
    <navbar>

    </navbar>
  <router-view/>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
export default{
    name: 'App',
    components: {Navbar}
}
</script>
<style>
#app {
  color: darkgoldenrod;
  background-color: #001933;
  font-family: Georgia, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-weight: bold;
}

input{
  color:darkgoldenrod;
  background-color: #0B325B;
}



</style>
<script setup>

</script>
