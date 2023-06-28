<script setup>

</script>

<template>
        <button class="btn dropdown-toggle largeBtn" data-bs-toggle="dropdown"
                type="button" href>
            Browse Item Sets
        </button>
        <ul class="dropdown-menu dropdown-menu-dark">
            <slot></slot>
        </ul>
</template>

<style scoped>
//Hover color not working, might have something to do with not(.active), fix TODO

.largeBtn{
    height:4vw;
    font-size: 2vw;
    color: darkgoldenrod;
}

.btn:hover{
    color:gold;
}

.btn:not(.active){
    color: darkgoldenrod;
}

</style>
