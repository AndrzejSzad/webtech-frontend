<template>

  <div class="home">
      <img src="../assets/logo.png" alt="League of Legends Logo" class = img-fluid width=500>
    <Instruction></Instruction>
  </div>
</template>

<script>
import Instruction from '@/components/Instruction.vue'

export default {
  name: 'HomeView',
  components: {Instruction}
}
</script>
