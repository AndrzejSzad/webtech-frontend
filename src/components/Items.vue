<template>

  <div class="row row-cols-6 g-0" style="background-color: #001933">
    <div v-for="item in items" :key="item.key" class="card bg-black">
      <img :src="require(`../assets/item/${item.image}`)" class="card-img">
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