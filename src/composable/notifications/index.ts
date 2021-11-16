import {
  UseNotifications,
} from './types'
import { computed } from 'vue'
import { useStore } from 'vuex'

const useNotifications: UseNotifications = () => {

  const store = useStore()
  const notifications = computed(() => store.state.notif.notifications)

  return {
    notifications,
  }

}

export {
  useNotifications,
}