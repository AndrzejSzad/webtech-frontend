<template>
  <div class= "container-fluid" style="background-color: #001933;">

    <div class="row">
      <div class="col fixedColumn" style="direction: rtl;">
          <champions></champions>
      </div>
      <div class="col " >
        <item-set> </item-set>
      </div>
      <div class="col fixedColumn" >
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
  height: 875px;
  overflow: auto;
  position:sticky;
  top:0;
}


</style>