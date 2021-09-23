import {
  UseTwitch,
} from './types'


const useTwitch: UseTwitch = () => {

  return { twitch: window?.Twitch?.ext }

}

export {
  useTwitch,
}