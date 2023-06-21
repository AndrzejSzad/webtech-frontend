<template>
  <div class= "container-fluid" style="background-color: #001933;">

    <div class="row">
      <div class="col-4 fixedColumn" style="direction: rtl;">
          <champions></champions>
      </div>
      <div class="col-4 " >
        <item-set> </item-set>
      </div>
      <div class="col-4 fixedColumn" >
        <items> </items>
      </div>
      </div>
  </div>
  <div>


  </div>

</template>

<script>
import Champions from "@/components/Champions.vue";
import Items from "@/components/Items.vue";
import ItemSet from "@/components/ItemSet.vue";

export default {
  components: {Items, Champions, ItemSet},

  methods:{
  }
}

</script>

<style>

.fixedColumn{
  height: 100vh;
  overflow: auto;
  position:sticky;
  top:0;
}


</style>
