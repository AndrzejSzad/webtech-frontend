<template>

  <div class="row row-cols-auto g-0">
    <div v-for="champion in champions" :key="champion.key" class="card bg-black">
        <img :src="require(`../assets/champion/${champion.image}`)" class="card-img" style="width:4vw">
    </div>



  </div>

</template>


<script>

import Champions from "../assets/data/champions.json";

export default {

  data() {
    return {
      champions: Champions
    }
  },
  methods: {

    save(champion) {
      console.log(champion.key);
    }
  }
};

</script>

<style scoped>



</style>

