<template>
    <div>
  <!--Rewrite section for readability TODO-->
  <div class="btn-group" role="group" style="width: 100%">
      <dropdown>
          <li v-for="itemset in itemsets" :key="itemset.primKey" class="dropdown-item textMed" @click="selectSet(itemset)">
              {{ itemset.title }}
          </li>
      </dropdown>
    <large-button @click="addSet()" title="Add new Item Set">
      <font-awesome-icon :icon="['fas', 'plus']"/>
    </large-button>
      <!-- remove button and add drag n drop TODO-->
      <large-button>
          <font-awesome-icon :icon="['fas', 'upload']"/>
      </large-button>


  </div>
  <!-- ItemSet part-->
  <div v-if="selectedSet" class="container my-3 " style="border: 1vh ridge #daa520;">

    <div class="card" style="border:none; background-color: #001933; color: darkgoldenrod">
      <h2 v-if="editSet">
      <input v-model="selectedSet.title" style="background-color: #07213D; color: darkgoldenrod" @keyup.enter="editSet= !editSet">
      </h2>
      <h2 v-else> {{selectedSet.title }}</h2>

        <div class="btn-group" role="group">
        <medium-button @click="editSet = !editSet " title="Edit Item Set name">
                <font-awesome-icon :icon="['fas', 'pencil']"/>
        </medium-button>

        <medium-button @click="saveSet()" title="Save Item Set">
          <font-awesome-icon :icon="['fas', 'floppy-disk']"/>
        </medium-button>

        <medium-button @click="exportSet(selectedSet)" title="Export Item Set">
          <font-awesome-icon :icon="['fas', 'download']"/>
        </medium-button>

        <medium-button @click="removeSet(selectedSet.primKey)" title="Delete Item Set">
          <font-awesome-icon :icon="['far', 'trash-can']"/>
        </medium-button>
      </div>
        <div>
            <hr/>
            <h5   >Item Set should apply to:
                <img :src="require('../assets/maps/11.png')" class="img" alt="SRift" title="Summoner's Rift" :style="{'width': '5vw','filter' : greyOutMap
                (11)}"
                @click="selectMaps(11)">
                <img :src="require('../assets/maps/12.png')" class="img" alt="HA" title="Howling Abyss"  :style="{'width': '5vw','filter' : greyOutMap
                (12)}"
                     @click="selectMaps(12)">
            </h5>
        </div>
    </div>
    <!-- ItemBlock part-->
    <div v-for="block in selectedSet.blocks" :key="block.primKey"
         @click="this.selectedBlock = block;" @dragover="this.selectedBlock=block;" @dragenter.prevent @dragover.prevent @drop="onDrop($event)">
      <!--Temporary Solution, for editing items, saving needs to be bugfixed TODO-->
      <div class="card my-3" :style="{'min-height': '20vh', 'border': '1px solid black', ...highlightSelectedBlock(block)}">

        <div class="card-header d-flex justify-content-between align-items-center">
          <div class="textMed" v-if="block!==selectedBlock || !editBlock">
            {{ block.type }}
          </div>
          <div  class="textMed" v-else>
            <input v-model="block.type" style="background-color: #0B325B; color: darkgoldenrod" @keyup.enter="editBlock= !editBlock">
          </div>
          <medium-button
                  @click="editBlock = !editBlock" title="Edit Item Block name">
            <font-awesome-icon :icon="['fas', 'pencil']" />
          </medium-button>
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


    <medium-button @click="addBlock(selectedSet)" title="Add new Item Block">
      <font-awesome-icon :icon="['fas', 'plus']"/>
    </medium-button>
    <medium-button
            @click="removeBlock(selectedBlock)" :disabled="!selectedBlock" title="Remove Item Block">
      <font-awesome-icon :icon="['far', 'trash-can']"/>
    </medium-button>

  </div>
    </div>
</template>

<script>


import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {ref} from 'vue';
import LargeButton from "@/components/LargeButton.vue";
import Dropdown from "@/components/Dropdown.vue";
import MediumButton from "@/components/MediumButton.vue";

const endpoint = process.env.VUE_APP_BACKEND_BASEURL + '/itemsets';
let editSet = ref(false);
let editBlock = ref(false);
export default {

  data() {
    return {
      itemsets: [
      ],
      selectedSet: null,
      selectedBlock: null,
      editSet,
      editBlock,

    }
  },

  components: {MediumButton, Dropdown, LargeButton, FontAwesomeIcon},

  methods: {

    selectSet(itemset) {
      this.selectedSet = itemset;
    },


    addSet() {
      const newItemSet = {
        title: "New Item Set",
          associatedMaps:[],
          associatedChampions:[],
        blocks: [{
          type: "New Item Block",
          items: []
        }]
      }
      this.itemsets.push(newItemSet);
      this.selectedSet = newItemSet;
    },

    saveSet() {
        console.log("Entering Save Method");
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

      //Remove a set, if it isn't saved in the database yet. TODO
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

      selectMaps(key){
          const idx = this.selectedSet.associatedMaps.indexOf(key);
          if(idx!==-1){
              this.selectedSet.associatedMaps.splice(idx,1);
              console.log(this.selectedSet.associatedMaps);
              return;
          }
          this.selectedSet.associatedMaps.push(key);
          console.log(this.selectedSet.associatedMaps);
      },
      greyOutMap(key) {
          return this.selectedSet.associatedMaps.indexOf(key)!==-1 ? '' : 'brightness(30%)';
      },

      highlightSelectedBlock(block){
         return block === this.selectedBlock ? {'transform': 'scale(1.05)','background-color':'#08274A', 'border':'2px solid black'}
             : {'background-color': '#07213D'};

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
          console.error("There was an error loading the ItemSets!", error);
        });
  }
}
</script>

<style scoped>

hr{
    border: 2px solid darkgoldenrod;
    border-radius: 2px;
    opacity: 100%;

}

.textMed{
      color:darkgoldenrod;
      font-size: 1.2vw;
}


</style>
