<template>
  <div class="btn-group" role="group">
    <div class="btn-group" role="group">
      <button class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" style="font-size:25px; height:50px"
              type="button">
        Browse Itemsets
      </button>
      <ul class="dropdown-menu dropdown-menu-dark">
        <li v-for="itemset in itemsets" :key="itemset.primkey" class="dropdown-item" @click="selectItemSet(itemset)">
          {{ itemset.title }}
        </li>
      </ul>
    </div>
    <button class="btn btn-success" style="width: 50px; height:50px;" type="button" @click="addItemSet()">
      <font-awesome-icon :icon="['fas', 'plus']"/>
    </button>

    <button class="btn btn-info" style="width: 50px;height:50px;" type="button">
      <font-awesome-icon :icon="['fas', 'upload']"/>
    </button>


  </div>

  <div v-if="selectedItemSet" class="container my-3 rounded-5" style="border:5px solid darkgoldenrod;">
    <div class="card-title" style="color:darkgoldenrod; font-weight: bolder; font-size: 25px"> {{
        selectedItemSet.title
      }}

      <div class="btn-group" role="group">
        <button class="btn btn-secondary" style="width: 50px;height:50px;" type="button">
          <font-awesome-icon :icon="['fas', 'pencil']"/>
        </button>

        <button class="btn btn-warning" style="width: 50px;height:50px;" type="button">
          <font-awesome-icon :icon="['fas', 'floppy-disk']"/>
        </button>

        <button class="btn btn-info" style="width: 50px;height:50px;" type="button">
          <font-awesome-icon :icon="['fas', 'download']"/>
        </button>

        <button class="btn btn-danger" style="width: 50px;height:50px;" type="button">
          <font-awesome-icon :icon="['far', 'trash-can']"/>
        </button>

      </div>
    </div>

    <ItemBlock v-for="block in selectedItemSet.blocks" :key="block.primKey" :block="block"
               :selectedItemBlock="selectedItemBlock"
               @click="selectItemBlock(block)">
    </ItemBlock>


    <button class="btn btn-success" style="width: 50px; height:50px;" type="button" @click="addBlock(selectedItemSet)">
      <font-awesome-icon :icon="['fas', 'plus']"/>
    </button>
    <button class="btn btn-danger" style="width: 50px;height:50px;" type="button"
            @click="removeBlock(selectedItemBlock)">
      <font-awesome-icon :icon="['far', 'trash-can']"/>
    </button>
  </div>


</template>

<script>

import ItemBlock from "@/components/ItemBlock.vue";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const endpoint = process.env.VUE_APP_BACKEND_BASEURL + '/itemsets';
export default {

  data() {
    return {
      itemsets: [],
      selectedItemSet: null,
      selectedItemBlock: null
    };
  },
  components: {FontAwesomeIcon, ItemBlock},
  props: ['itemBlocks'],


  methods: {

    selectItemSet(itemset) {
      this.selectedItemSet = itemset;
    },

    selectItemBlock(block) {

      this.selectedItemBlock = block;
    },

    addBlock() {
      const newBlock = {
        type: "New Item Block",
        items: []
      }
      this.selectedItemSet.blocks.push(newBlock);
      this.saveItemSet();
    },

    removeBlock(selectedItemBlock) {
      this.selectedItemSet.blocks.splice(this.selectedItemSet.blocks.indexOf(selectedItemBlock), 1);
    },

    addItemSet() {
      const newItemSet = {
        title: "New Item Set",
        blocks: [{
          type: "New Item Block",
          items: []
        }]
      }
      this.itemsets.push(newItemSet);
      this.selectedItemSet = newItemSet;
      this.saveItemSet();
    },

    saveItemSet() {
      const toBeSaved = this.selectedItemSet;
      axios.post(endpoint, toBeSaved)
          .then(response => this.primKey = response.data.primKey)
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });

    }
  },

  created() {
    axios.get(endpoint)
        .then(response => this.itemsets = response.data)
        .catch(error => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
  }
}


</script>

