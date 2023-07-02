<template>
  <!--Rewrite page for better readability TODO-->

  <div class="container-fluid">
    <div class="row">

      <div class="col-4 fixedColumn" style="direction: rtl;   -webkit-user-select: none;">
        <champions :associated-champions=assocChampions @send-click="selectChamp"></champions>
      </div>


      <div class="col-4 ">

        <div class="btn-group" role="group" style="width: 100%">
          <dropdown>
            <li v-for="itemset in itemsets" :key="itemset.primKey" class="dropdown-item textMed"
                @click="selectedSet=itemset">
              {{ itemset.title }}
            </li>
          </dropdown>
          <large-button title="Add new Item Set" @click="addSet()">
            <font-awesome-icon :icon="['fas', 'plus']"/>
          </large-button>

          <large-button>
            <label>
              <input  type="file" style="display: none" @change="uploadFile">
              <font-awesome-icon :icon="['fas', 'upload']"/>
            </label>
          </large-button>


        </div>
        <!-- ItemSet part-->
        <div v-if="selectedSet" class="container my-3 " style="border: 1vh ridge #daa520;" >

          <div class="card" style="border:none; background-color: #001933;">
            <h2 v-if="editSet">
              <input v-model="selectedSet.title" @keyup.enter="editSet= !editSet">
            </h2>
            <h3 v-else> {{ selectedSet.title }}</h3>

            <div class="btn-group" role="group">
              <medium-button title="Edit Item Set name" @click="editSet = !editSet ">
                <font-awesome-icon :icon="['fas', 'pencil']"/>
              </medium-button>

              <medium-button title="Save Item Set" @click="saveSet()">
                <font-awesome-icon :icon="['fas', 'floppy-disk']"/>
              </medium-button>

              <medium-button title="Export Item Set" @click="exportSet(selectedSet)">
                <font-awesome-icon :icon="['fas', 'download']"/>
              </medium-button>

              <medium-button title="Delete Item Set" @click="removeSet(selectedSet.primKey)">
                <font-awesome-icon :icon="['far', 'trash-can']"/>
              </medium-button>
            </div>
            <div>
              <hr/>
              <h5>Item Set should apply to:
                <img :src="require('../assets/maps/11.png')" :style="{'width': '5vw','filter' : greyOutMap
                (11)}" alt="SRift" class="img" title="Summoner's Rift"
                     @click="selectMaps(11)">
                <img :src="require('../assets/maps/12.png')" :style="{'width': '5vw','filter' : greyOutMap
                (12)}" alt="HA" class="img" title="Howling Abyss"
                     @click="selectMaps(12)">
              </h5>
            </div>
          </div>
          <!-- ItemBlock part-->
          <div v-for="block in selectedSet.blocks" :key="block.primKey"
               @click="this.selectedBlock = block;" @dragover="this.selectedBlock=block;" @drop="onDrop($event)"
               @dragenter.prevent @dragover.prevent>
            <div :style="{'min-height': '20vh', 'border': '1px solid black', ...highlightSelectedBlock(block)}"
                 class="card my-3">

              <div class="card-header d-flex justify-content-between align-items-center">
                <div v-if="block!==selectedBlock || !block.editBlock" class="textMed">
                  {{ block.type }}
                </div>
                <div v-else class="textMed">
                  <input v-model="block.type" @keyup.enter=editBlockName(block)  @blur="block.editBlock=false"  ref="inputField" >
                </div>

                <medium-button
                    title="Edit Item Block name" @click="editBlockName(block)">
                  <font-awesome-icon :icon="['fas', 'pencil']"/>
                </medium-button>
              </div>
              <!-- Item part-->
              <div class="row row-cols-auto" style="margin-top: 2vh;margin-left: 2vh; margin-right: 2vh; ">
                <div v-for="item in block.items" :key="item.primKey">
                  <img :alt="item.name" :src="require(`../assets/item/${item.id}.png`)" class="card-img"
                       style="width: 3.2vw; margin-bottom: 2vh; align-content: center" @click="removeItem(block,item)">
                </div>
              </div>
            </div>
          </div>


          <medium-button title="Add new Item Block" @click="addBlock(selectedSet)">
            <font-awesome-icon :icon="['fas', 'plus']"/>
          </medium-button>
          <medium-button
              :disabled="!selectedBlock" title="Remove Item Block" @click="removeBlock(selectedBlock)">
            <font-awesome-icon :icon="['far', 'trash-can']"/>
          </medium-button>

        </div>
      </div>

      <div class="col-4 fixedColumn">
        <items></items>
      </div>


    </div>
  </div>


</template>

<script>


import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import LargeButton from "@/components/LargeButton.vue";
import Dropdown from "@/components/Dropdown.vue";
import MediumButton from "@/components/MediumButton.vue";
import Items from "@/components/Items.vue";
import Champions from "@/components/Champions.vue";

const endpoint = process.env.VUE_APP_BACKEND_BASEURL + '/itemsets';
const editSet = false;
const editBlock = false;
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
  computed: {
    assocChampions() {
      if (this.selectedSet !== null) {
        return this.selectedSet.associatedChampions;
      }

      return [];
    }
  },

  components: {Champions, Items, MediumButton, Dropdown, LargeButton, FontAwesomeIcon},

  methods: {

    // Black magic, but somehow working.
    uploadFile(event){
      const file = event.target.files[0];
      const reader = new FileReader();
        reader.onload = () => {
          try{
          this.selectedSet=JSON.parse(reader.result.toString());
          this.itemsets.push(this.selectedSet);
          }
          catch(error){
            console.error("File not a valid JSON / ItemSet object" + error);
          }
        }
      reader.readAsText(file);
    },


    editBlockName(block){
      block.editBlock= !block.editBlock;
    },

    selectChamp(key) {

      if(this.selectedSet==null){
        return;
      }
      const idx = this.selectedSet.associatedChampions.indexOf(key);

      if (idx !== -1) {
        this.selectedSet.associatedChampions.splice(idx, 1);
        console.log("removing champion " + key);
      } else {
        this.selectedSet.associatedChampions.push(key);
        console.log("adding champion " + key);
      }
    },





    addSet() {
      const newItemSet = {
        title: "New Item Set",
        associatedMaps: [],
        associatedChampions: [],
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
          .then(response => {
            this.primKey = response.data.primKey;
            console.log("Saved ItemSet");
            this.selectedSet = response.data;
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
          })
          .catch(function (error) {
            console.log(error)
          })
      location.reload();
    },

    selectMaps(key) {
      const idx = this.selectedSet.associatedMaps.indexOf(key);
      if (idx !== -1) {
        this.selectedSet.associatedMaps.splice(idx, 1);
        console.log(this.selectedSet.associatedMaps);
        return;
      }
      this.selectedSet.associatedMaps.push(key);
      console.log(this.selectedSet.associatedMaps);
    },
    greyOutMap(key) {
      return this.selectedSet.associatedMaps.indexOf(key) !== -1 ? '' : 'brightness(30%)';
    },

    highlightSelectedBlock(block) {
      return block === this.selectedBlock ? {
            'transform': 'scale(1.05)',
            'background-color': '#08274A',
            'border': '2px solid black'
          }
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
      this.selectedBlock = null;
    },

    addItem(key) {
      const newItem = {
        id: key,
        count: 1
      }

      this.selectedBlock.items.push(newItem);
    },

    onDrop(event) {
      const key = event.dataTransfer.getData('key');
      if (key) {
        console.log("Dropped item ID:", key);
        this.addItem(key);
      }
    },

    removeItem(block, item) {
      block.items.splice(block.items.indexOf(item), 1);
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

hr {
  border: 2px solid darkgoldenrod;
  border-radius: 2px;
  opacity: 100%;
}

.fixedColumn {
  height: 100vh;
  overflow: auto;
  position: sticky;
  top: 0;


}

.textMed {
  color: darkgoldenrod;
  font-size: 1.2vw;
}


::-webkit-scrollbar {
  width: 0.3vw;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #0B325B;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: darkgoldenrod;
  border-radius: 10px;
}
</style>
