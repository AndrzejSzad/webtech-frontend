<template>


  <input class=input; v-model="search" placeholder="Search for Champions" style="direction: ltr; width:75%; border-radius: 10px" type="text">
  <font-awesome-icon :icon="['fas', 'magnifying-glass']"/>
  <div class="row row-cols-auto g-0 my-3">
    <div v-for="champion in filteredChampions" :key="champion.key">
      <div :style="associatedChampions.indexOf(champion.key) !== -1 ? {'background-color' :'#00FF00'} : {'background-color' : '#000000'}"
           class="card"
           @click="$emit('send-click', champion.key)">
        <img :alt="champion.name" :src="require(`../assets/champion/${champion.image}`)" :title="champion.name"
             class="card-img " draggable="false" style="width:4vw;">
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

  props: {
    associatedChampions:{
      type: Array,
      default: ()=>[]
    }
  },

  data() {



    return {
      champions: Champions,
      search: '',


    }
  },
  components: {FontAwesomeIcon},
  computed: {

    filteredChampions() {
      return this.champions.filter(champion => champion.name.toLowerCase().includes(this.search.toLowerCase()))
    }
  },
  methods: {




  }

}

</script>

<style scoped>


.icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 5vh;
  color: #00FF00;

}

input:focus{
  outline: gold;
}


</style>

