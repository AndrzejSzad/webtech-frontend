<template>
   <div class= "container">
     <div class="row row-cols-1 row-cols-md-4 g-4">
        <h1>Items</h1>
        <div class="col" v-for="item in items" :key="item.key">
          <div class="card h-25">
            <img :src="getImage(item)" class="card-img-top" :alt="item.name">
            <div class="card-body">
              <h5 class="card-title"> {{item.name}}</h5>
              <p class="card-text">
                {{item.name}} kostet {{item.gold}} und verleiht dir {{item.stats}}
              </p>
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
            items: [
            ],
            selectedItem: null,
        };
    },
    methods: {
        selectItem(item) {
            this.selectedItem = item;
        },
      getImage(item){
          return require('../assets/'+ item.key + '.pdf')

      }
    },
    mounted() {
        const endpoint = process.env.VUE_APP_BACKEND_BASEURL + '/items'
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(endpoint, requestOptions)
            .then(response => response.json())
            .then(result => result.forEach(item => {
                this.items.push(item)
            }))
            .catch(error => console.log('error', error))
    },
}


</script>