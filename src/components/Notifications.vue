<template>
  <div
    v-if="notifications"
    class="notifications"
  >
    <div
      v-for="notif in notifications"
      :class="['mess flex-row-center-center pa-8 c-font absolute w-100p bg-main',
        notif.type || '',
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
        class="text-left grow"
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
        @click="hideMsg(notif.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useNotifications } from '@/composable/notifications'
  import BaseButton from '@/components/BaseButton.vue'

  const { hideMsg, notifications } = useNotifications()
</script>

<style scoped lang="scss">
  
  .notifications {
    width: 100%;
    height: 50px;
  }
  .mess {
    opacity: 1;
    transition: all 0.5s ease-in-out;
    overflow: hidden;
    height: 50px;
    box-sizing: border-box;

    &.error,
    &.success,
    &.warning {
      color: var(--background-color);
    }
    &.error {
      background: #E2232B;
    }
    &.success {
      background: #58D443;
    }
    &.warning {
      background: #FBAC19;
    }

  }
  .hide {
    opacity: 0;
    max-height: 0px;
    min-height: 0px;
    padding: 0px 20px;
    margin-bottom: 0;
  }
  .text-left {
    max-width: 400px;
  }
</style>