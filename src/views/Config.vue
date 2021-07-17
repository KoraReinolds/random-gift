<template>
  <div class="about">
    <h1>You loged{{ $store.getters['auth/token'] ? 'In' : 'Out' }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'About',
});
</script>



