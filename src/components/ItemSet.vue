<template>
    <div>
      <!-- Add file drag n drop instead of button, TODO-->
  <div class="btn-group" role="group" style="width: 100%">
    <div class="btn-group" role="group" style="width: 100%">
      <button class="btn btn-secondary dropdown-toggle largeBtn" data-bs-toggle="dropdown"
              type="button" href>
        Browse Itemsets
      </button>
      <ul class="dropdown-menu dropdown-menu-dark">
        <li v-for="itemset in itemsets" :key="itemset.primKey" class="dropdown-item textMed" @click="selectSet(itemset)">
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
  <!-- ItemSet part-->
  <div v-if="selectedSet" class="container my-3 " style="border: 1vh ridge #daa520;">


    <div class="card" style="background-color: #001933; color: darkgoldenrod">
      <h2 v-if="editSet">
      <input v-model="selectedSet.title" style="background-color: #07213D; color: darkgoldenrod" @keyup.enter="editSet= !editSet">
      </h2>
      <h2 v-else> {{selectedSet.title }}</h2>

        <div class="btn-group" role="group">

        <button class="btn btn-secondary medBtn"
        @click="editSet = !editSet ">
                <font-awesome-icon :icon="['fas', 'pencil']"/>
        </button>

        <button class="btn btn-warning medBtn" >
          <font-awesome-icon :icon="['fas', 'floppy-disk']" @click="saveSet()"/>
        </button>

        <button class="btn btn-info medBtn"  @click="exportSet(selectedSet)">
          <font-awesome-icon :icon="['fas', 'download']"/>
        </button>

        <button class="btn btn-danger medBtn"  @click="removeSet(selectedSet.primKey)">
          <font-awesome-icon :icon="['far', 'trash-can']"/>
        </button>

      </div>
    </div>
    <!-- ItemBlock part-->
    <div v-for="block in selectedSet.blocks" :key="block.primKey"
         @click="this.selectedBlock = block;" @dragover="this.selectedBlock=block;" @dragenter.prevent @dragover.prevent @drop="onDrop($event)">
      <!--Temporary Solution, for editing items, saving needs to be bugfixed TODO-->
      <div class="card my-3" style="background-color: #07213D; min-height: 16vh; border: 1px solid black" :style=" block === selectedBlock
           ? {'transform': 'scale(1.05)','background-color':'#08274A', 'border':'2px solid black'}:{}" >

        <div class="card-header d-flex justify-content-between align-items-center">
          <div class="textMed" v-if="block!==selectedBlock || !editBlock">
            {{ block.type }}
          </div>
          <div  class="textMed" v-else>
            <input v-model="block.type" style="background-color: #0B325B; color: darkgoldenrod" @keyup.enter="editBlock= !editBlock">
          </div>
          <button class="btn btn-secondary smallBtn align-items-center"
                  @click="editBlock = !editBlock ">
            <font-awesome-icon :icon="['fas', 'pencil']" />

          </button>
        </div>
          <!-- Item part-->
          <div class="row row-cols-auto" style="margin-top: 2vh;margin-left: 2vh; margin-right: 2vh; ">
            <div v-for="item in block.items" :key="item.primKey">
              <img :alt="item.name" :src="require(`../assets/item/${item.id}.png`)" class="card-img"
              style="width: 3.2vw; margin-bottom: 2vh; align-content: center" @click="removeItem(block,item)" >
            </div>
          </div>
          </div>
      </div>


    <button class="btn btn-success medBtn "  @click="addBlock(selectedSet)">
      <font-awesome-icon :icon="['fas', 'plus']"/>
    </button>
    <button class="btn btn-danger medBtn "
            @click="removeBlock(selectedBlock)" :disabled="!selectedBlock">
      <font-awesome-icon :icon="['far', 'trash-can']"/>
    </button>

  </div>

    </div>
</template>

<script>


import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {ref} from 'vue';

const endpoint = process.env.VUE_APP_BACKEND_BASEURL + '/itemsets';
let editSet = ref(false);
let editBlock = ref(false);
export default {

  data() {
    return {
      itemsets: [],
      selectedSet: null,
      selectedBlock: null,
      editSet,
      editBlock,

    }
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

      axios.post(endpoint, this.selectedSet)
          .then(response => {this.primKey = response.data.primKey;
      console.error("Saved ItemSet");
          })

          .catch(error => {
            console.error("There was an error saving the ItemSet!", error);
          });


    },

    exportSet(set) {

      const blob = new Blob([JSON.stringify(set)]);
      const href = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('download', set.title + '.json');
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(href);
      document.body.removeChild(link);


    },

    removeSet(key) {
      axios.delete(endpoint + "/" + key)
          .then(function (response) {
            console.log(response)
              location.reload();
          })
          .catch(function (error) {
            console.log(error)
          })
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

      addItem(key){
        const newItem = {
          id:key,
          count:1
        }

        this.selectedBlock.items.push(newItem);
      },

    onDrop(event) {
      const key  = event.dataTransfer.getData('key');
      if(key){
        console.log("Dropped item ID:", key);
        this.addItem(key);
      }
    },

      removeItem(block, item) {
        block.items.splice(block.items.indexOf(item),1);
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
    align-items: center;
    justify-content: center;


}

.smallBtn{
  height:2vw;
  width: 2vw;
  font-size:1vw;
    display: flex;
    justify-content: center;
    align-items: center;



}

.textMed{
      color:darkgoldenrod;
      font-size: 1.2vw;
}


</style>
