<template>
  <div class="panel">
    <h1>Panel</h1>
    <h1>CONFIG: {{ configuration }}</h1>
    <!-- <h1>CONFIG: {{ $store.state.config.config }}</h1> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useConfiguration } from '@/composable/configuration'

export default defineComponent({
  name: 'Panel',
  setup() {

    const { configuration } = useConfiguration()

    return {
      configuration,
    }

  },
})
</script>

<style lang="scss" scoped>
.panel {
  h1 {
    color: var(--font-color);
  }
}
</style>
