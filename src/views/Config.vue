<template>
  <div
    class="flex-column-center-center"
    v-if="config"
  >
    <config-item
      v-for="item in config.giftList"
      :key="item.sku"
      :item="item"
    />
    <div v-text="config" />
    <button
      @click="pushNewGift"
    >
      push new gift
    </button>
    <button
      @click="saveConfig"
    >
      save changes
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import ConfigItem from '@/components/ConfigItem.vue'
import { useConfiguration } from '@/composable/configuration'

export default defineComponent({
  name: 'About',
  components: {
    ConfigItem,
  },
  setup() {
    
    const { config, saveConfig } = useConfiguration()

    const store = useStore()

    const pushNewGift = () => {
      store.commit('config/ADD_GIFT_TO_LIST', {
        title: '123',
        chanceType: ['common'],
      })
    }

    return {
      pushNewGift,
      saveConfig,
      config,
    }

  }
});
</script>

<style lang="scss" scoped>
</style>

