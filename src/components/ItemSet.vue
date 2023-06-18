<template>
  <div class= "dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" style="font-size:30px">
      Browse Itemsets
    </button>
          <ul class="dropdown-menu dropdown-menu-dark">
            <li class="dropdown-item" v-for="itemset in itemsets" :key="itemset.primkey"  v-on:click="selectItemSet(itemset)">
              {{ itemset.title }}
            </li>
          </ul>

        <div v-if="selectedItemSet" class="container my-5" style="border:2px solid black;">
            <div class="card-body">
            <h4 class="card-title"> {{selectedItemSet.title}}</h4>

            <div v-for="block in selectedItemSet.blocks" :key="block.primKey" class="card my-3" style="border:2px solid black;">
              <h5 >{{ block.type }}</h5>
              <div class="row row-cols-auto">
              <div v-for="item in block.items" :key="item.primKey">
                <img :src="require(`../assets/item/${item.id}.png`)" class="card-img mx-1 my-1" :alt="item.name">
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>


</template>

<script>

export default {

  data() {
    return {
      itemsets: [],
      selectedItemSet: null,
    };
  },
  methods: {
    selectItemSet(itemset) {
      this.selectedItemSet = itemset;
    }
  },
  mounted() {
    const endpoint = process.env.VUE_APP_BACKEND_BASEURL + '/itemsets'
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(result => result.forEach(itemset => {
          this.itemsets.push(itemset)
        }))
        .catch(error => console.log('error', error))
  }
}


</script>

