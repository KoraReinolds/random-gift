<template>
  <div
    class="config-main flex-row-center-center w-100p"
  >
    <div
      v-for="index in [0,1,2]"
      :key="`section-${index}`"
      class="config-main__section pointer pa-64 h-100p flex-column-center-center"
      @click="$emit('changeStep', index + 1)"
    >
      <div
        class="config-main__step flex-row-center-center fs-24 bold w-48 h-48 rounded"
        v-text="index + 1"
      />
      <div
        class="config-main__title fs-24 my-16 bold"
        v-text="$t(`configMain.${index}.title`)"
      />
      <div
        class="config-main__desc  fs-16 mb-16"
        v-text="$t(`configMain.${index}.description`)"
      />
      <div class="grow" />
    </div>
  </div>
</template>

<script lang="ts">

export default {
  components: {
  },
  name: 'ConfigMain',
  setup() {
    return {
    }
  }
}
</script>

<style scoped lang="scss">

.config-main {
  max-width: 900px;

  &__step {
    border: 2px solid var(--font-color);
  }

  .config-main__step,
  .config-main__title,
  .config-main__desc {
    transition: 0.3s;
  }

  .config-main__title,
  .config-main__desc {
    width: 250px;
  }

  &__section {
    max-width: 300px;
    
    &:not(.config-main__section:last-child) {
      border-right: 2px solid var(--disabled-color);
    }

    &:hover {
      .config-main__step,
      .config-main__title,
      .config-main__desc {
        transform: scale(1.1);
      }
    }
  }
}

</style>
