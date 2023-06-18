<template>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Item Set Creator</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent nav nav-fill">
                <ul class="nav nav-fill nav-tabs">
                    <router-link class="nav-link" to="/">Home</router-link>
                    <router-link class="nav-link" to="/about">About</router-link>
                  <router-link class="nav-link" to="/champions">Champions</router-link>
                    <router-link class="nav-link" to="/itemsets">Item Sets</router-link>
                </ul>
            </div>
        </nav>
</template>

<script setup>
</script>

<style scoped>

</style>
