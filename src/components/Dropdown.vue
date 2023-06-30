<script setup>

</script>

<template>
        <button class="btn dropdown-toggle largeBtn btn-link" data-bs-toggle="dropdown">
            Browse Item Sets
        </button>
        <ul class="dropdown-menu dropdown-menu-dark">
            <slot></slot>
        </ul>
</template>

<style scoped>

/*Hover color not working, might have something to do with not(.active), fix TODO---> */
.largeBtn{
    height:4vw;
    font-size: 2.2vw;
    color: darkgoldenrod;
    text-decoration: none;
}

.btn:hover{
    color:gold !important;
}

.btn:not(.active){
    color: darkgoldenrod;
}

</style>
