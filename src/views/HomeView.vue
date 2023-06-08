<template>

  <div class="home">
      <img src="../assets/ui/logo.png" alt="League of Legends Logo" class = img-fluid width=500>
    <HelloWorld msg="Hello World"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
