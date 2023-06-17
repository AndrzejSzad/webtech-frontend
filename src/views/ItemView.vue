
<template>
    <div class="container-fluid">
        <h1> Items </h1>
        <div class=row-cols-auto>
            <div class= "col" v-for="item in items" :key="item.key">
                <div class="card w-25 h-25 ">
                    <h5> {{item.name}} </h5>
                </div>

            </div>
        </div>

    </div>

</template>


<script>
export default {
    name: "Items",
    data(){
        return{
            items: [
                {
                    key: 4644,
                    name: "Crown of the Shattered Queen",
                    image: "../assets/item/4644.png",
                    gold: 2800,
                        "tags": [
                          "Health",
                          "SpellDamage",
                          "Mana",
                          "NonbootsMovement",
                          "AbilityHaste"
                        ],
                stats: {
                      "FlatHPPoolMod": 250,
                      "FlatMPPoolMod": 600,
                      "FlatMagicDamageMod": 70}


                },
                {
                    key: 6632,
                        name: "Divine Sunderer",
                        image: "../assets/item/6632.png",
                        gold: 3300,
                        tags: [
                          "Health",
                          "Damage",
                          "CooldownReduction",
                          "OnHit",
                          "MagicPenetration",
                          "ArmorPenetration",
                          "AbilityHaste"
                        ],
                        stats: {
                          "FlatPhysicalDamageMod": 40,
                          "FlatHPPoolMod": 300
                }
                },
                {
                   key: 6691,
                       name: "Duskblade of Draktharr",
                       image: "../assets/item/6691.png",
                       gold: 3100,
                       tags: [
                         "Damage",
                         "Stealth",
                         "CooldownReduction",
                         "Slow",
                         "NonbootsMovement",
                         "ArmorPenetration",
                         "AbilityHaste"
                       ],
                       stats: {
                         "FlatPhysicalDamageMod": 60
                       }
                     },
                {
                    key: 6691,
                    name: "Duskblade of Draktharr",
                    image: "../assets/item/6691.png",
                    gold: 3100,
                    tags: [
                      "Damage",
                      "Stealth",
                      "CooldownReduction",
                      "Slow",
                      "NonbootsMovement",
                      "ArmorPenetration",
                      "AbilityHaste"
                    ],
                    stats: {
                      "FlatPhysicalDamageMod": 60
                    }
                  },
                  {
                    key: 6692,
                    name: "Eclipse",
                    image: "../assets/item/6692.png",
                    gold: 3100,
                    tags: [
                      "Damage",
                      "CooldownReduction",
                      "NonbootsMovement",
                      "ArmorPenetration",
                      "AbilityHaste"
                    ],
                    stats: {
                      "FlatPhysicalDamageMod": 60
                    }
                  }
                ]
        }
    }
}


</script>


<style scoped>

</style>
