<template>

  <input type="text" v-model="search">
  <div class="row row-cols-auto g-0">
    <div v-for="champion in filteredChampions" :key="champion.key">
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
      associatedChampions: [],
        search : '',

    }
  },
    computed:{

      filteredChampions(){
          return this.champions.filter(champion => champion.name.includes(this.search))
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

