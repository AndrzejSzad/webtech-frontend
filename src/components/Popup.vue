
<!--Add code for Save + Remove confirmation/notification popup-->

<template>

<div class="popup">
  <div class="popup-inner">
    <slot>
    </slot>

  </div>

</div>

</template>


<script>

export default{


}

</script>


<style scoped>

.popup{
  position: fixed;
  top:0;
  left:0;
  right: 0;
  bottom:0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-inner{
  border: 1vh ridge #daa520;
  background: #0B325B;
  padding:32px;
}



</style>