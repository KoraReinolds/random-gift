<template>
  <div
    v-if="notifications"
    class="notifications absolute"
  >
    <div
      v-for="notif in notifications"
      :class="['mess flex-row-center-center mb-16 pa-16',
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
        class="grow text-left"
        v-text="notif.msg"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useNotifications } from '@/composable/notifications'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Notifications',
  setup() {

    const { notifications } = useNotifications()

    return {
      notifications,
    }
  }
})
</script>

<style scoped lang="scss">
  
  .notifications {
    top: 20px;
    right: 20px;
    width: 320px;
    z-index: 11111111;
  }
  .mess {
    opacity: 1;
    transition: all 0.5s ease-in-out;
    overflow: hidden;
    background: var(--background-color);
    box-shadow: 0px 4px 20px rgba(22, 29, 37, 0.12);
    border-radius: 8px;
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
</style>