

<template>

    <button class="btn medBtn btn-link">
        <slot></slot>
    </button>

</template>

<script setup>

</script>

<style scoped>

.btn{
    height:3vw;
    width: 3vw;
    color: darkgoldenrod;
    font-size: 2vw;
    align-items: center;
    justify-content: center;
    outline:none;
}

.btn:hover,
.btn:focus{
    color:gold !important;
}

.btn:disabled{
    color:grey;
}


</style>
