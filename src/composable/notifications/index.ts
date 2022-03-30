import { computed } from 'vue'
import { useStore } from 'vuex'
import { Notification } from '@/store/notif/types'

const useNotifications = () => {

  const store = useStore()
  const notifications = computed(() => store.state.notif.notifications)

  return {
    notifications,
    hideMsg: (id: string) => store.commit('notif/HIDE_MSG', id),
    pushNotification: (notif: Notification) => store.commit('notif/PUSH_NOTIFICATION', notif)
  }

}

export {
  useNotifications,
}