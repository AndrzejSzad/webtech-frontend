<template>

  <div class="row row-cols-auto g-0">
    <div v-for="champion in champions" :key="champion.key">
      <div class="card" :style="associatedChampions.indexOf(champion.key) !== -1 ? {'background-color' :'#00FF00'} : {'background-color' : '#000000'}" @click="selectChamp(champion.key)">
      <img :src="require(`../assets/champion/${champion.image}`)" class="card-img"   alt="{{champion.name}}" style="width:4vw;">
      </div>
    </div>
  </div>

</template>


<script>

import Champions from "../assets/data/champions.json";


export default {

  data() {
    return {
      champions: Champions,
      //placeholder
      associatedChampions: []

    }
  },
  methods: {

    selectChamp(key){
      const idx = this.associatedChampions.indexOf(key);
      if(idx!==-1){
        this.associatedChampions.splice(idx,1);
        return;
      }
      this.associatedChampions.push(key);
    },

  }
};

</script>

<style scoped>

</style>

