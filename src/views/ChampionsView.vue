<template>
  <!--Only meant for testing purposes, to check for changes independent of the other components-->

  <div class="container" style="height: 600px; overflow: auto">
    <div class="row row-cols-auto">
      <div class= "card" v-for="champion in champions" :key="champion.key">
        <img :src= "require(`../assets/champion/${champion.image}`)" class="img">
        <h5 class="card-title"> {{champion.name}} </h5>
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
