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
      <div
        v-if="notif.icon"
        class="icon"
      >
        <icon
          class="pointer"
          :name="notif.icon"
          :width="20"
          :height="20"
        />
      </div>
      <span
        class="text-left grow"
        v-text="notif.msg"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { useNotifications } from '@/composable/notifications'

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
  }
  .hide {
    opacity: 0;
    max-height: 0px;
    min-height: 0px;
    padding: 0px 20px;
    margin-bottom: 0;
  }
  .icon {
    width: 50px;
  }
  .text-left {
    max-width: 400px;
  }
</style>