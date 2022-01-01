<template>
  <div
    class="add-product flex-row-center-center w-100p"
  >
    <div
      v-for="index in [0,1,2]"
      :key="`section-${index}`"
      class="add-product__section pointer pa-64 h-100p flex-column-center-center"
      @click="$emit('changeStep', index + 1)"
    >
      <div
        class="add-product__step flex-row-center-center fs-24 bold w-48 h-48 rounded"
        v-text="index + 1"
      />
      <div
        class="add-product__title fs-24 my-16 bold"
        v-text="$t(`configMain.${index}.title`)"
      />
      <div
        class="add-product__desc  fs-16 mb-16"
        v-text="$t(`configMain.${index}.description`)"
      />
      <div class="grow" />
    </div>
  </div>
  <div
    class="flex-row mt-24"
  >
    <base-button
      @click="$emit('changeStep', 0)"
      v-text="$t('btn.configBack')"
    />
    <base-button
      class="ml-24"
      @click="$emit('changeStep', 1)"
      v-text="$t('btn.configContinue')"
    />
  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    BaseButton,
  },
  emits: ['changeStep'],
  name: 'AddProduct',
  setup() {
    return {
    }
  }
})
</script>

<style scoped lang="scss">

.add-product {
  max-width: 900px;

  &__step {
    border: 2px solid var(--font-color);
  }

  .add-product__step,
  .add-product__title,
  .add-product__desc {
    transition: 0.3s;
  }

  .add-product__title,
  .add-product__desc {
    width: 250px;
  }

  &__section {
    max-width: 300px;
    
    &:not(.add-product__section:last-child) {
      border-right: 2px solid var(--disabled-color);
    }

    &:hover {
      .add-product__step,
      .add-product__title,
      .add-product__desc {
        transform: scale(1.1);
      }
    }
  }
}

</style>
