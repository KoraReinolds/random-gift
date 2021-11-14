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
  name: 'Loader',
  props: {
    size: {
      type: Number,
      default: 64,
    }
  },
});
</script>

<style scoped lang="scss">
.lds-ring {
  border: 8px solid transparent;
  border-top-color: var(--primary-color);
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}

@for $i from 1 through 3 {
  .lds-ring:nth-child(#{$i}) {
    animation-delay: -#{$i * 0.15}s;
  }
}

@keyframes lds-ring {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
