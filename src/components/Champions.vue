<template>

  <div class="container" style="border:2px solid black;height: 850px; overflow: auto">
    <div class="row row-cols-5">
      <div class= "card" v-for="champion in champions" :key="champion.key">
          <img :src= "require(`../assets/champion/${champion.image}`)" class="img">
      </div>
  </div>
    </div>



</template>


<script>

import Champions from "../assets/data/champions.json";

export default {
  data() {
    return{
      champions : Champions
    }
  }
};

</script>

<style scoped>



</style>

