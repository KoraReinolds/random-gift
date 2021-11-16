import { Notification } from '@/store/notif/types'

interface Ref<T> {
  value: T
}

type UseNotifications = () => {
  notifications: Ref<Notification[]>,
}

export {
  UseNotifications,
}