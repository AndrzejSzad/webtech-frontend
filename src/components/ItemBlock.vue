<template>
  <div :style="{'min-height': '115px', 'border': block === selectedItemBlock ? '2px solid red' : '1px solid black'}"
       class="card"
       style="background-color: #001933">

    <div class="card-body">

      <div class="card-header" style="font-size: 25px; color: gold">
        {{ block.type }}
        <button class="btn btn-secondary" style="height: 30px; width: 30px; padding:0" type="button">
          <font-awesome-icon :icon="['fas', 'pencil']" style="font-size: 16px;"/>
        </button>

      </div>

      <div class="row row-cols-auto">
        <div v-for="item in block.items" :key="item.primKey">
          <img :alt="item.name" :src="require(`../assets/item/${item.id}.png`)" class="card-img mx-1 my-1">
        </div>
      </div>
    </div>
  </div>

</template>


<script>

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  props:
      ['block', 'selectedItemBlock'],

  components: {FontAwesomeIcon},
  methods: {}
}

</script>


<style scoped>

</style>