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
    <div v-for="block in selectedItemSet.blocks" :key="block.primKey"
         @click="selectItemBlock(block)">>
      <div :style="{'min-height': '115px', 'border': block === selectedItemBlock ? '2px solid red' : '1px solid black'}"
           class="card"
           style="background-color: #001933">

        <div class="card-body">

          <div class="card-header" style="font-size: 25px; color: gold">
            {{ block.type }}
            <button class="btn btn-secondary" style="height: 30px; width: 30px; padding:0" type="button">
              <font-awesome-icon :icon="['fas', 'pencil']" style="font-size: 16px;"/>

            </button>
            <input v-model="block.type" placeholder="Block Name" />

          </div>

          <div class="row row-cols-auto">
            <div v-for="item in block.items" :key="item.primKey">
              <img :alt="item.name" :src="require(`../assets/item/${item.id}.png`)" class="card-img mx-1 my-1">
            </div>
          </div>
        </div>
      </div>


    </div>
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
  components: {FontAwesomeIcon},
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

