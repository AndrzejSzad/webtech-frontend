<template>

  <div class="input-container">
    <input type="text" v-model="search" placeholder="Search for Items">
    <font-awesome-icon :icon="['fas', 'search']" class="search-icon"></font-awesome-icon>
  </div>

  <div class="row row-cols-auto g-0" style="background-color: #001933">
    <div v-for="item in filteredItems" :key="item.key" class="card bg-black" >
      <img :src="require(`../assets/item/${item.image}`)" class="card-img" :alt="item.name" :title="item.name" style="width:4vw;" draggable="true" @dragstart="startDrag($event,item)">

    </div>
  </div>


</template>

<script>

import Items from "@/assets/data/items.json";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";





export default {

  data() {
    return {
      items: Items,
      search:'',

    }
  },
components:{FontAwesomeIcon},
    computed:{
        filteredItems(){
            return this.items.filter(item => item.name.toLowerCase().includes(this.search))
        }
    },
  methods: {

    startDrag(event,item){
      console.log(item)
      event.dataTransfer.dropEffect='move'
      event.dataTransfer.effectAllowed='move'
      event.dataTransfer.setData('key', item.key);

    }



  }
};

</script>

<style scoped>




</style>
