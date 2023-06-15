<template>
    <div class= "container">
        <div class="row">
            <!--Placeholder for Champions-->
            <div class="col">
                <h1>Champions</h1>
                </div>
            <div class="col">
        <h1>Item Sets</h1>
        <div class="btn-group">
            <button class="btn btn-lg btn-primary dropdown-toggle" data-bs-toggle="dropdown" type="button">
                Browse Item Sets
            </button>
            <div class="dropdown-menu">
                <button v-for="itemset in itemsets" :key="itemset.primkey" class="dropdown-item" v-on:click="selectItemSet(itemset)">
                    {{ itemset.title }}
                </button>
            </div>
        </div>

        <div v-if="selectedItemSet" class="card my-5" style="width: 18rem;">
            <h2>{{ selectedItemSet.title }}</h2>
                <div v-for="block in selectedItemSet.blocks" :key="block.primKey" class="card my-2">
                    <h3>{{ block.type }}</h3>
                        <!--Placeholder for image from source Items-->
                        <div v-for="item in block.items" :key="item.primKey" class="card">
                                {{ item }}
                        </div>
                    </div>
            </div>
        </div>
            <!--Placeholder for Items-->
            <div class="col">
                <h1>Items</h1>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            itemsets: [
                // Your item sets data
            ],
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

