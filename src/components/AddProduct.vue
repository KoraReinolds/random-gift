<template>
  <div
    class="add-product flex-row-center-center w-100p"
  >
    <div
      v-for="index in [1,2,3]"
      :key="`section-${index}`"
      :class="[
        `add-product__section pointer pa-32 h-100p flex-row-center-center`,
        { active: index === step },
      ]"
      @click="$emit('changeStep', index)"
    >
      <div
        class="border mr-8 flex-row-center-center fs-24 bold w-48 h-48 rounded"
        v-text="index"
      />
      <div
        class="fs-24 my-16 bold"
        v-text="$t(`configMain.${index - 1}.title`)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
  },
  emits: ['changeStep'],
  name: 'AddProduct',
  props: {
    step: {
      type: Number,
      required: true,
    }
  },
  setup() {
    return {
    }
  }
})
</script>

<style scoped lang="scss">

.add-product {
  max-width: 900px;

  &__section {
    max-width: 300px;

    &.active div {
      color: var(--light-main-color);
    }
    
    &:not(.add-product__section:last-child) {
      border-right: 2px solid var(--disabled-color);
    }

  }
}

</style>
