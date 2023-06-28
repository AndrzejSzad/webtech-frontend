<template>

    <button class="btn largeBtn" type="button">
        <slot></slot>
    </button>

</template>

<script setup>

</script>

<style scoped>

.largeBtn{
    height:4vw;
    max-width: 4vw;
    font-size: 1.5vw;
    color: darkgoldenrod;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn:hover{
    color:gold;
}

</style>
