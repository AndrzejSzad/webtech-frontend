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
  font-family: Georgia, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-weight: bold;
}


</style>
<script setup>

</script>
