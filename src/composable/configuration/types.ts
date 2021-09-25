import { Config } from '@/store/config/types'

interface Ref<T> {
  value: T
}

interface Configuration {
  [key: string]: {
    record: {
      content: string,
    },
    segment: {
      channel_id: string,
      segment_type: string,
    },
  }
}

type UseConfiguration = () => {
  config: Ref<Config>,
  saveConfig: () => void
}

export {
  Configuration,
  UseConfiguration,
}