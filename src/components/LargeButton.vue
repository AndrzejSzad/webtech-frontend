<template>

    <button class="btn largeBtn btn-link">
        <slot></slot>
    </button>

</template>

<script setup>

</script>

<style scoped>

.largeBtn{
    height:4vw;
    max-width: 4vw;
    font-size: 2vw;
    color: darkgoldenrod;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn:hover{
    color:gold !important;
}

</style>
