import { ActionList, Config } from '@/store/config/types'
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
  config: Ref<Config>
  productCosts: Ref<string[]>
  saveConfig: () => void
  editAction: (params: EditActionParams) => void
  deleteAction: (params: DeleteActionParams) => void
  addAction: (params: ActionList) => void
}

export {
  Configuration,
  UseConfiguration,
}