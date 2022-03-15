import { computed } from 'vue'
import { useStore } from 'vuex'

const useNotifications = () => {

  const store = useStore()
  const notifications = computed(() => store.state.notif.notifications)

  return {
    notifications,
  }

}

export {
  useNotifications,
}