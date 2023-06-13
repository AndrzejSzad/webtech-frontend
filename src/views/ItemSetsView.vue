<template>
<div>
    <h1>ItemSetTest</h1>
</div>

</template>
<script>
export default {

    mounted(){
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch('http://localhost:8080/itemsets', requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error))

    }
}

</script>

