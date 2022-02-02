import { ActionList, Config, Gift } from '@/store/config/types'
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
  changeStep: (params: string) => void
  item: Ref<Gift | null>
  config: Ref<Config>
  productCosts: Ref<string[]>
  changeGiftList: (params: Gift[]) => void
  saveConfig: () => void
  addNewGift: () => void
  configurateItem: (params: number) => void
  changeFinishedSteps: (params: string[]) => void
  changeAvailableSteps: (params: string[]) => void
  changeBits: (params: string) => void
  changeItem: (params: string) => void
  editAction: (params: EditActionParams) => void
  deleteAction: (params: DeleteActionParams) => void
  addAction: (params: ActionList) => void
}

export {
  Configuration,
  UseConfiguration,
}