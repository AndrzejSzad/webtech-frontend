<template>

  <div class="input-container">
    <font-awesome-icon :icon="['fas', 'search']" class="search-icon"></font-awesome-icon>
    <input v-model="search" placeholder="Search for Items" type="text" style="width:75%; border-radius: 10px;">

  </div>

  <div class="row row-cols-auto g-0 my-3" style="background-color: #001933">

    <div v-for="item in filteredItems" :key="item.key" class="card bg-black">
      <img :alt="item.name" :src="require(`../assets/item/${item.image}`)" :title="item.name" class="card-img"
           draggable="true" style="width:4vw;" @dragstart="startDrag($event,item)">

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
      search: '',
      hover: false

    }
  },
  components: {FontAwesomeIcon},
  computed: {
    filteredItems() {
      return this.items.filter(item => item.name.toLowerCase().includes(this.search.toLowerCase()))
    }
  },
  methods: {

    startDrag(event, item) {
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('key', item.key);

    }

  }
};

</script>

<style scoped>


input:focus{
  outline: gold;
}


</style>
