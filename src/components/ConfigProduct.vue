<template>
  <div
    class="config-product flex-row"
  >

    <div
      class="image flex-row-center-center"
    >
      <img src="@/assets/img/gift.png" />
    </div>

    <div
      class="chances flex-column-start-center"
    >
      <h1
        class="my-8"
        v-text="$t(`title.configItem.${steps[step].title}`)"
      />
      <div
        class="relative"
      >
        <fragment-shader class="fon absolute" />
      </div>
      <div class="chances__content flex-row-center-between">

        <div
          class="chances__values bg-background h-100p"
        >

        </div>

        <div
          class="chances__actions bg-background h-100p"
        >

        </div>

        <div
          class="chances__range h-100p"
        >

        </div>

      </div>
    </div>

    <div
      class="actions flex-column-center-center"
    >
      <base-button
        @click="changeStep(step + 1)"
        v-text="'Next'"
      />
    </div>

  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import FragmentShader from '@/components/FragmentShader.vue'
import { defineComponent, PropType, ref, watch } from 'vue'
import { Gift, ChangeChances } from '@/store/config/types'
import { useProducts } from '@/composable/products'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'ConfigProduct',
  components: {
    BaseButton,
    FragmentShader,
  },
  props: {
    item: {
      type: Object as PropType<Gift>,
      required: true
    }
  },
  setup(props) {

    const { bitsCost } = useProducts()
    const store = useStore()
    const bitsValue = ref(props.item.bits)
    const step = ref(1)
    const changeStep = (index: number) => {
      step.value = index % steps.length
    }
    const recalculateChances = (params: ChangeChances) => {
      store.commit('config/CHANGE_ITEM_CHANCES', params)
    }
    const steps = [
      { title: 'common' },
      { title: 'uncommon' },
      { title: 'rare' },
      { title: 'epic' },
      { title: 'legendary' },
    ]

    watch(bitsValue, (value) => {
      store.commit('config/CHANGE_ITEM_COST', {
        item: props.item,
        bits: value,
      })
    })

    return {
      step,
      steps,
      changeStep,
      bitsCost,
      bitsValue,
      recalculateChances,
    }
  }
});
</script>

<style scoped lang="scss">
$margin: 8px;
$chances-length: 5;
$chance-size: 64px;
$range-width: 24px;

$content-height: calc(#{$chance-size} * #{$chances-length});
$height: calc(#{$content-height} + #{$margin} * 2);

$content-width: calc(#{$chance-size} + #{$content-height} + #{$range-width} + #{$margin} * 2);
$width: calc(#{$content-width} + #{$margin} * 2);

.actions,
.image {
  width: 300px;
}

.fon {
  width: $width;
  height: $height;
}

.chances {
  width: $width;

  &__content {
    box-sizing: border-box;
    height: $content-height;
    width: $content-width;
    z-index: 1;
    margin: $margin;
  }

  &__values {
    width: $chance-size;
  }

  &__actions {
    width: $content-height;
  }

  &__range {
    width: $range-width;
    border: 2px solid var(--background-color);
    box-shadow: inset 0px 0px 2px 1px var(--background-color);
  }

}

img {
  width: 150px;
}

button {
  width: 150px;
}

</style>
