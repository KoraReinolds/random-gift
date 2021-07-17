import axios from "@/api"
import store from "@/store"

const chatPrefix = '/helix/chat'

const getGlobalEmotes = async function() {

  return (await axios.get(`${chatPrefix}/emotes/global`)).data.data

}

export {
  getGlobalEmotes,
}