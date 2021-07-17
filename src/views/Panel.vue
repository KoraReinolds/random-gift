<template>
  <h1>Panel</h1>
  <div v-for="emote in emotes" :key="emote.id">
    <img :src="emote.images.url_4x">
    {{ emote.name }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { getGlobalEmotes } from '@/api/chat'

export default defineComponent({
  name: 'Panel',
  setup() {

    const emotes = ref([])

    getGlobalEmotes().then((emotesList) => emotes.value = emotesList)

    return {
      emotes,
    }

  },
})
</script>
