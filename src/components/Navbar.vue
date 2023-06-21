<template>
  <nav class="navbar navbar-expand navbar-dark nav-style">
    <a class="navbar-brand" style="color: #f5ab2c; font-weight: bolder; font-size: 5vh; text-shadow: red 0 0 10px;">Item
      Set Creator</a>
    <ul class="nav nav-pills">
      <router-link class="nav-link" to="/">Home</router-link>
      <router-link class="nav-link" to="/itemsets">Item Sets</router-link>
    </ul>
  </nav>
</template>

<script setup>
</script>

<style scoped>

.nav-style {
  font-size: 3vh;
  background-color: #001933;
  height: 10vh;
}

.nav-pills .nav-link.active {
  background-color: darkgoldenrod;
  color: black;
}

.nav-pills .nav-link:not(.active) {
  color: darkgoldenrod;
}

</style>
