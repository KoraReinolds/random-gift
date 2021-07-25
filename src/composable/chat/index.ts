import axios from "@/api"
import {
  UseGlobalEmotes,
  emoteData,
} from "./types"
import { ref } from 'vue'

const useGlobalEmotes: UseGlobalEmotes = () => {

  const emotes = ref<Array<emoteData>>([])

  axios.get('').then(
    emotesList => {
      emotes.value = emotesList.data?.data
    }
  )

  return emotes

}

export {
  useGlobalEmotes,
}