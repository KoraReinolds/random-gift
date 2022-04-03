<template>
  <div
    v-if="notif"
    :class="['mess flex-column-center-center pa-10 c-font bg-background',
      notif.type || '',
      { hide: !notif.visible },
    ]"
  >
    <icon
      v-if="notif.icon"
      class="mr-16 pointer"
      :name="notif.icon"
      :width="20"
      :height="20"
    />
    <span
      class="text-left mb-10"
      v-text="notif.msg"
    />
    <div
      class="navigation flex-row w-100p"
    >
      <BaseButton
        class="mr-8"
        v-if="notif.closable"
        v-text="$t('btn.close')"
        @click="hideMsg(notif.id)"
      />
      <BaseButton
        class="mr-8"
        v-if="notif.btn"
        v-text="notif.btn?.text"
        @click="notif.btn?.onclick()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useNotifications } from '@/composable/notifications'
  import BaseButton from '@/components/BaseButton.vue'

  const { hideMsg, notifications, notif } = useNotifications()

</script>

<style scoped lang="scss">
  .navigation {
    height: 30px;
  }
  .mess {
    width: 300px;
    box-sizing: border-box;
    margin-bottom: 5px;
    border-radius: 6px;
    box-shadow: 0 6px 16px rgba(0,0,0,0.5),0 0px 4px rgba(0,0,0,0.4);

    // &.error,
    // &.success,
    // &.warning {
    //   color: var(--background-color);
    // }
    // &.error {
    //   background: #E2232B;
    // }
    // &.success {
    //   background: #58D443;
    // }
    // &.warning {
    //   background: #FBAC19;
    // }

  }
</style>