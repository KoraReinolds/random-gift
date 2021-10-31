import { Config } from '@/store/config/types'
import {
  EditActionParams,
  DeleteActionParams,
} from "@/store/config/types"

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
  editAction: (params: EditActionParams) => void
  deleteAction: (params: DeleteActionParams) => void
}

export {
  Configuration,
  UseConfiguration,
}