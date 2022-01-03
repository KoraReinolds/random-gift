<template>
  <div
    class="image relative"
  >
    <img
      class="h-100p w-100p"
      :src="`type${index + 1}.gif`"
    >
    <ul
      :class="'dots py-8 absolute w-100p flex-row-center-center'"
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
    let interval
    const changeIndex = (newIndex) => {
      if (interval) clearInterval(interval)
      index.value = newIndex % props.list.length
      interval = setInterval(() => {
        newIndex += 1;
        index.value = newIndex % props.list.length
      }, 5000)
    }
    changeIndex(index.value)

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
