<template>

  <div class="row row-cols-auto g-0" style="background-color: #001933">
    <div v-for="item in items" :key="item.key" class="card bg-black">
      <img :src="require(`../assets/item/${item.image}`)" class="card-img" style="width:4vw;">
    </div>
  </div>

</template>

<script>

import Items from "@/assets/data/items.json";

export default {

  data() {
    return {
      items: Items,
    }
  },
  methods: {}
};

</script>

<style scoped>

</style>
