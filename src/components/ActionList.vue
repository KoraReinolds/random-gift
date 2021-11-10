<template>
  <ul
    class="action-list bold text-left"
  >
    <base-button
      class="w-100p"
      v-if="!list.length"
      :action="addActionToList"
      v-text="'Add action'"
    />
    <li
      class="flex-row-center-between"
      v-for="(action, index) in list"
      :key="`action-${index}`"
      v-else
    >
      <base-input
        v-if="editIndex === index"
        v-model="newValue"
        v-focus
      />
      <span v-else v-text="action" />
      <div
        class="flex-row"
      >
          <icon
            class="pointer"
            :name="editIndex === index ? 'accept' : 'delete'"
            :width="20"
            :height="20"
            @click="editIndex === index ? changeFieldValue() : deleteFieldValue(index)"
          />
          <icon
            class="pointer"
            :name="editIndex === index ? 'close' : 'edit'"
            :width="20"
            :height="20"
            @click="editIndex === index ? stopEditField() : editField(index, action)"
          />
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { ref, PropType } from 'vue'
import { ActionList } from '@/store/config/types'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useConfiguration } from '@/composable/configuration/index'

export default {
  name: 'ActionList',
  props: {
    list: {
      type: Object as PropType<ActionList>,
      required: true
    }
  },
  components: {
    BaseInput,
    BaseButton,
  },
  setup(props: any) {
    
    const { editAction, deleteAction } = useConfiguration()
    const editIndex = ref(-1)
    const newValue = ref('')
    const editField = (index: number, value: string) => {
      editIndex.value = index
      newValue.value = value
    }
    const deleteFieldValue = (itemIndex: number) => {
      deleteAction({
        itemIndex,
        actionList: props.list,
      })
      editField(-1, '')
    }
    const stopEditField = () => editField(-1, '')
    const changeFieldValue = () => {
      editAction({
        itemIndex: editIndex.value,
        actionList: props.list,
        newValue: newValue.value,
      })
      editField(-1, '')
    }

    return {
      editIndex,
      newValue,
      editField,
      stopEditField,
      changeFieldValue,
      deleteFieldValue,
    }
  }
}
</script>

<style scoped lang="scss">
  .action-list {
    max-width: 150px;
  }
</style>
