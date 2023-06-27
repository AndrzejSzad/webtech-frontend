<template>

  <div class="row row-cols-auto g-0">
    <div v-for="champion in champions" :key="champion.key" class="card bg-black" >
        <img :src="require(`../assets/champion/${champion.image}`)" class="card-img" alt="{{champion.name}}" style="width:4vw" @click="changeColor($event)" draggable="false">
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
    changeColor(event) {
      event.target.style.filter = 'brightness(150%) saturate(200%) hue-rotate(180deg)';
    }
  }
};

</script>

<style scoped>



</style>

