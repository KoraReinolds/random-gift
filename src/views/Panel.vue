<template>
  <h1>Panel</h1>
  <div v-for="emote in emotes" :key="emote.id">
    <img :src="emote.images.url_4x">
    {{ emote.name }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useGlobalEmotes } from '@/composable/chat'

export default defineComponent({
  name: 'Panel',
  setup() {

    return {
      emotes: useGlobalEmotes(),
    }

  },
})
</script>
