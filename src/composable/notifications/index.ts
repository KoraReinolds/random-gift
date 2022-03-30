import { computed } from 'vue'
import { useStore } from 'vuex'
import { Notification } from '@/store/notif/types'

const useNotifications = () => {

  const store = useStore()
  const notifications = computed(() => store.state.notif.notifications)

  return {
    notifications,
    pushNotification: (notif: Notification) => store.commit('notif/PUSH_NOTIFICATION', notif)
  }

}

export {
  useNotifications,
}