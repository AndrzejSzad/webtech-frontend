<template>
  <div class="btn-group" role="group" style="width: 100%">
    <div class="btn-group" role="group" style="width: 100%">
      <button class="btn btn-secondary dropdown-toggle largeBtn" data-bs-toggle="dropdown"
              type="button" href>
        Browse Itemsets
      </button>
      <ul class="dropdown-menu dropdown-menu-dark">
        <li v-for="itemset in itemsets" :key="itemset.primkey" class="dropdown-item textMed" @click="selectSet(itemset)"  >
          {{ itemset.title }}
        </li>
      </ul>
    </div>
    <button class="btn btn-success largeBtn" type="button" @click="addSet()" style="max-width: 4vw">
      <font-awesome-icon :icon="['fas', 'plus']"/>
    </button>

    <button class="btn btn-info largeBtn" type="button" @click="exportSet(selectedSet)" style="max-width: 4vw">
      <font-awesome-icon :icon="['fas', 'upload']"/>
    </button>


  </div>

  <div v-if="selectedSet" class="container my-3" style="border: 1vh ridge #daa520;">
    <div class="card-title textLg"> {{
        selectedSet.title
        }}
      {{
        selectedSet.primKey
      }}

      <champions />

        <div class="btn-group" role="group">

        <button class="btn btn-secondary medBtn" type="button">
             <span class="align-content-center">
                <font-awesome-icon :icon="['fas', 'pencil']"/>
            </span>

        </button>

        <button class="btn btn-warning medBtn" type="button">
          <font-awesome-icon :icon="['fas', 'floppy-disk']" @click="saveSet()"/>
        </button>

        <button class="btn btn-info medBtn" type="button">
          <font-awesome-icon :icon="['fas', 'download']"/>
        </button>

        <button class="btn btn-danger medBtn" type="button" @click="removeSet(selectedSet.primKey)">
          <font-awesome-icon :icon="['far', 'trash-can']"/>
        </button>


      </div>
    </div>
    <div v-for="block in selectedSet.blocks" :key="block.primKey"
         @click="selectBlock(block)">
      <div :style="{'background-color':'#07213D', 'min-height': '115px', 'border': block === selectedBlock ? '2px solid red' : '1px solid black'}"
           class="card">

        <div class="card-body">

          <div class="card-header textMed">
            {{ block.type }}
            <button class="btn btn-secondary smallBtn" type="button">
              <font-awesome-icon :icon="['fas', 'pencil']" />

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
    <button class="btn btn-success medBtn"  type="button" @click="addBlock(selectedSet)">
      <font-awesome-icon :icon="['fas', 'plus']"/>
    </button>
    <button class="btn btn-danger medBtn" type="submit"
            @click="removeBlock(selectedBlock)">
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
      selectedSet: null,
      selectedBlock: null
    };
  },
  components: {FontAwesomeIcon},

  methods: {

    selectSet(itemset) {
      this.selectedSet = itemset;
    },

    addSet() {
      const newItemSet = {
        title: "New Item Set",
        blocks: [{
          type: "New Item Block",
          items: []
        }]
      }
      this.itemsets.push(newItemSet);
      this.selectedSet = newItemSet;
    },

    saveSet() {
      const toBeSaved = this.selectedSet;
      axios.post(endpoint, toBeSaved)
          .then(response => this.primKey = response.data.primKey)
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error saving the ItemSet!", error);
          });

    },

    saveFile() {

    },

    removeSet(key){
      axios.delete(endpoint + "/" + key)
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
      window.location.reload()

    },
      selectBlock(block) {

          this.selectedBlock = block;
      },

      addBlock() {
          const newBlock = {
              type: "New Item Block",
              items: []
          }
          this.selectedSet.blocks.push(newBlock);
      },

      removeBlock(block) {
          this.selectedSet.blocks.splice(this.selectedSet.blocks.indexOf(block), 1);
          this.selectedBlock=null;
      },

      addItem(){

      },

      removeItem(){

      }

},

  created() {
    axios.get(endpoint)
        .then(response => this.itemsets = response.data)
        .catch(error => {
          this.errorMessage = error.message;
          console.error("There was an error loading the ItemSets!", error);
        });
  }
}
</script>

<style scoped>

.largeBtn{
    height:4vw;
    min-width: 4vw;
    font-size: 1.5vw;
    display: flex;
    align-items: center;
    justify-content: center;
}

.medBtn{
    height:3vw;
    width: 3vw;
    font-size:1.5vw;
    display: flex;
    align-items: center;
    justify-content: center;

}

.smallBtn{
  height:2vw;
  width: 2vw;
  font-size:1vw;
  display: flex;
  align-items: center;
  justify-content: center;


}

.textMed{
      color:darkgoldenrod;
      font-size: 1.2vw;
}

.textLg{
  color:darkgoldenrod;
  font-size: 1.5vw;
}



</style>
