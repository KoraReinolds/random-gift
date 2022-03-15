<template>
  <div
    class="image relative"
  >
    <img
      class="h-100p w-100p"
      :src="`type${index + 1}.gif`"
    >
    <ul
      :class="['dots py-8 absolute w-100p flex-row-center-center']"
    >
      <li
        v-for="(imgSrc, i) in list"
        :class="['w-16 h-16 pointer flex-row-center-center',
          { active: index === i }
        ]"
        :key="imgSrc"
        @click="changeIndex(+i + 1)"
      >
        <div
          :class="['rounded h-100p w-100p bg-font']"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">

import { ref, defineProps } from 'vue'

  const props = defineProps<{
    list: string[]
  }>()
  const index = ref(0)
  let interval: number
  const changeIndex = (newIndex: number) => {
    if (interval) clearInterval(interval)
    index.value = newIndex % props.list.length
    interval = setInterval(() => {
      newIndex += 1;
      index.value = newIndex % props.list.length
    }, 5000)
  }
  changeIndex(index.value)

</script>

<style scoped lang="scss">
.image {
  width: $config-body-height;
  height: $config-body-height;
}

.dots {
  background: linear-gradient(transparent, var(--background-color));
  bottom: 0px;
}

li {
  div {
    transition: 0.3s;
    transform: scale(0.7);
  }
  &.active div {
    transform: scale(0.4);
  }
}
</style>
