interface Ref<T> {
  value: T
}

interface emoteData {
  id: string,
  name: string,
  images: {
    url_1x: string,
    url_2x: string,
    url_4x: string,
  },
}

type UseGlobalEmotes = () => Ref<Array<emoteData>>

export {
  emoteData,
  UseGlobalEmotes,
}