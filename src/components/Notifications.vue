<template>
  <div
    v-if="notifications"
    class="notifications"
  >
    <div
      v-for="notif in notifications"
      :class="['mess flex-row-center-center mb-16 pa-16 c-font',
        { hide: !notif.visible },
      ]"
      :key="notif.id"
    >
      <icon
        v-if="notif.icon"
        class="mr-16 pointer"
        :name="notif.icon"
        :width="20"
        :height="20"
      />
      <span
        class="text grow"
        v-text="notif.msg"
      />
      <BaseButton
        class="ml-16"
        v-if="notif.btn"
        v-text="notif.btn?.text"
        type="inverse"
        @click="notif.btn?.onclick()"
      />
      <icon
        v-if="notif.closable"
        class="ml-16 pointer"
        name="close"
        :width="20"
        :height="20"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useNotifications } from '@/composable/notifications'
  import BaseButton from '@/components/BaseButton.vue'

  const { notifications } = useNotifications()
</script>

<style scoped lang="scss">
  
  .notifications {
    width: 100%;
  }
  .mess {
    opacity: 1;
    transition: all 0.5s ease-in-out;
    overflow: hidden;
    background: var(--main-color);
    max-width: 100%;
  }
  .hide {
    opacity: 0;
    max-height: 0px;
    min-height: 0px;
    padding: 0px 20px;
    margin-bottom: 0;
  }
  .text {
    max-width: 400px;
  }
</style>