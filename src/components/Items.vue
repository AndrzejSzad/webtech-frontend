<template>


  <input type="text" v-model="search">
  <div class="row row-cols-auto g-0" style="background-color: #001933">
    <div v-for="item in filteredItems" :key="item.key" class="card bg-black" >
      <img :src="require(`../assets/item/${item.image}`)" class="card-img" alt="{{item.name}}" style="width:4vw;" draggable="true" @dragstart="startDrag($event,item)">
    </div>
  </div>


</template>

<script>

import Items from "@/assets/data/items.json";





export default {

  data() {
    return {
      items: Items,
      search:'',

    }
  },

    computed:{
        filteredItems(){
            return this.items.filter(item => item.name.includes(this.search))
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
