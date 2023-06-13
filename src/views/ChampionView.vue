
<template>
    <div class="container-fluid">
        <h1> Champions </h1>
        <div class=row-cols-auto>
            <div class= "col" v-for="champion in champions" :key="champion.key">
                <div class="card w-25 h-25 ">
                    <h5> {{champion.name}} </h5>
                </div>

            </div>
        </div>

    </div>

</template>


<script>
export default {
    name: "Champions",
    data(){
        return{
            champions: [
                {
                    key: 266,
                    name: "Aatrox",
                    image: "../assets/champion/Aatrox.png"
                },
                {
                    key: 103,
                    name: "Ahri",
                    image: "@/assets/champion/Ahri.png"
                },
                {
                    key: 84,
                    name: "Akali",
                    image: "@/assets/champion/Akali.png"
                },
                {
                    key: 166,
                    name: "Akshan",
                    image: "@/assets/champion/Akshan.png"
                },
                {
                    key: 12,
                    name: "Alistar",
                    image: "@/assets/champion/Alistar.png"
                }
                ]
        }
    }
}


</script>


<style scoped>

</style>
