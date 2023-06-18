<template>
  <div class= "container" style="border:2px solid black; height: 850px; overflow: auto">
    <div class="row row-cols-5">
      <div class="col" v-for="item in items" :key="item.key">
        <div class="card">
          <img :src="require(`../assets/item/${item.image}`)" class="card-img-top" :alt="item.name">

        </div>
      </div>
    </div>
  </div>

</template>

<script>




import Items from "@/assets/data/items.json";

export default {
  data() {
    return{
      items : Items
    }
  }
};

</script>

<style scoped>

</style>