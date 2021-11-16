<template>
  <div
    class="h-100p w-100p flex-row-center-center"
  >
    <div
      class="lds-ring absolute rounded"
      v-for="n in 4"
      :key="n"
      :style="{
        width: `${size}px`,
        height: `${size}px`,
      }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Notification',
  props: {
    size: {
      type: Number,
      default: 64,
    }
  },
});
</script>

<style scoped lang="scss">

</style>
