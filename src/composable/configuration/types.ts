import { ActionList, Config, Gift } from '@/store/config/types'
import {
  EditActionParams,
  DeleteActionParams,
  ChangeBitsParams,
  ChangeTypeParams,
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
  item: Ref<Gift | null>
  config: Ref<Config>
  productCosts: Ref<string[]>
  saveConfig: () => void
  addNewGift: (params: Gift) => void
  configurateItem: (params: number) => void
  changeBits: (params: ChangeBitsParams) => void
  changeItem: (params: ChangeTypeParams) => void
  editAction: (params: EditActionParams) => void
  deleteAction: (params: DeleteActionParams) => void
  addAction: (params: ActionList) => void
}

export {
  Configuration,
  UseConfiguration,
}