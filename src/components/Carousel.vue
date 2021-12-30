<template>
  <div
  >
    <img
      class="image"
      :src="`type${index + 1}.gif`"
    >
    <ul
      :class="'flex-row-center-center'"
    >
      <li
        v-for="(imgSrc, i) in list"
        :class="['w-16 h-16 pointer flex-row-center-center',
          { active: index === i }
        ]"
        :key="imgSrc"
        @click="changeIndex(i + 1)"
      >
        <div
          :class="['rounded h-100p w-100p bg-font']"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Carousel',
  props: {
    list: {
      type: Array,
      require: true,
    }
  },
  setup(props) {

    const index = ref(0)
    const changeIndex = (newIndex) => index.value = newIndex % props.list.length

    return {
      index,
      changeIndex,
    }
  }
});
</script>

<style lang="scss">
.image {
  width: 300px;
  height: 300px;
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
