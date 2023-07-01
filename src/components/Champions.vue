<template>


    <input type="text" v-model="search" placeholder="Search for Champions" style="direction: ltr">
    <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
  <div class="row row-cols-auto g-0">
    <div v-for="champion in filteredChampions" :key="champion.key">
      <div class="card" :style="associatedChampions.indexOf(champion.key) !== -1 ? {'background-color' :'#00FF00'} : {'background-color' : '#000000'}" @click="selectChamp(champion.key)">
          <img :src="require(`../assets/champion/${champion.image}`)" class="card-img"   :alt="champion.name" :title="champion.name" style="width:4vw;">
          <div v-if="associatedChampions.indexOf(champion.key)!==-1">
            <i class="icon">
              <font-awesome-icon :icon="['fas', 'check']"/>
            </i>
          </div>
        </div>
      </div>
    </div>

</template>


<script>

import Champions from "../assets/data/champions.json";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {

  data() {
    return {
      champions: Champions,
      //placeholder
      associatedChampions: [],
        search : '',

    }
  },
  components: {FontAwesomeIcon},
    computed:{

      filteredChampions(){
          return this.champions.filter(champion => champion.name.toLowerCase().includes(this.search))
      }
    },
  methods: {

    selectChamp(key){
      const idx = this.associatedChampions.indexOf(key);

      if(idx!==-1){
        this.associatedChampions.splice(idx,1);
        console.log("removing champion "+ key);
        return;
      }
      this.associatedChampions.push(key);
      console.log("adding champion " + key);
    },

  }
};

</script>

<style scoped>





.icon{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 5vh;
  color:#00FF00;

}



</style>

