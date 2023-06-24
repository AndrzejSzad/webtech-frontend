<template>

  <div class="row row-cols-auto g-0">
    <h2>{{associateChampions}}</h2>
    <button class="btn-danger" @click="receive($event)"></button>
    <div v-for="champion in champions" :key="champion.key" class="card bg-black" >
        <img :src="require(`../assets/champion/${champion.image}`)" class="card-img" alt="{{champion.name}}" style="width:4vw" draggable="false">
    </div>



  </div>

</template>


<script>

import Champions from "../assets/data/champions.json";




export default {

  data() {
    return {
      champions: Champions,

    }
  },
  methods: {
  }
};

</script>

<style scoped>



</style>

