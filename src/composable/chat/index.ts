import axios from "@/api"
import {
  UseGlobalEmotes,
  emoteData,
} from "./types"
import { ref } from 'vue'

const chatPrefix = '/helix/chat'

const useGlobalEmotes: UseGlobalEmotes = () => {

  const emotes = ref<Array<emoteData>>([])

  axios.get(`${chatPrefix}/emotes/global`).then(
    emotesList => emotes.value = emotesList.data?.data
  )

  return emotes

}

export {
  useGlobalEmotes,
}