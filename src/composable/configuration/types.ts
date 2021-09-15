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
  configurationData: Ref<Configuration | undefined>
  configuration: Ref<string>,
}

export {
  Configuration,
  UseConfiguration,
}