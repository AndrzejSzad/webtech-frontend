<template>
  <div class= "container-fluid">
    <div class="row">
      <div class="col">
          <champions></champions>
      </div>
      <div class="col">
        <item-set> </item-set>
      </div>
      <div class="col">
        <items> Items </items>
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
  components: {Items, Champions, ItemSet}

}


</script>

