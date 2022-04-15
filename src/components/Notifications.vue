<template>
  <div
    v-if="notif"
    :class="['mess flex-column-start-center pa-10 c-font bg-background absolute',
      notif.type || '',
      { hide: !notif.visible },
    ]"
  >
    <div
      class="flex-row mb-8"
    >
      <icon
        v-if="icon"
        :class="['mr-16 pointer', `c-${icon}`]"
        :name="icon"
        :width="44"
        :height="44"
      />
      <span
        class="text-left"
        v-html="notif.msg"
      />
    </div>
    <div
      class="flex-row w-100p"
    >
      <BaseButton
        class="mr-8 mt-10"
        v-if="notif.closable"
        v-text="$t('btn.close')"
        @click="hideMsg(notif.id)"
      />
      <BaseButton
        class="mr-8 mt-10"
        v-if="notif.btn"
        v-text="notif.btn?.text"
        @click="notif.btn?.onclick()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { useNotifications } from '@/composable/notifications'
  import { Notification } from '@/store/notif/types'
  import BaseButton from '@/components/BaseButton.vue'
  import Icon from '@/components/Icon.vue'

  const { hideMsg, notifications, notif } = useNotifications()

  const icon = ref<string | undefined>(undefined)

  watch(notif, (notif: Notification) => {
    icon.value = notif.icon || notif.type
  })
  
</script>

<style scoped lang="scss">
  .mess {
    width: calc(100% - 18px);
    bottom: 0;
    max-width: 500px;
    box-sizing: border-box;
    margin: 0 9px 5px;
    border-radius: 6px;
    box-shadow: 0 6px 16px rgba(0,0,0,0.5),0 0px 4px rgba(0,0,0,0.4);
  }
</style>