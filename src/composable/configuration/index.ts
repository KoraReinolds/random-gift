import { axiosBackend } from "@/api"
import {
  Configuration,
  UseConfiguration,
} from "./types"
import { ref } from 'vue'

const useConfiguration: UseConfiguration = () => {

  const configurationData = ref<Configuration>()
  const configuration = ref<string>('')

  axiosBackend.get('/configuration').then(
    res => {
      const config: Configuration = res.data
      const key = Object.keys(config)[0]
      configurationData.value = config
      configuration.value = config[key]?.record.content
    }
  )

  return { configurationData, configuration }

}

export {
  useConfiguration,
}