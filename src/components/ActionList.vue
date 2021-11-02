<template>
  <ul
    class="action-list"
  >
    <button
      class="action-list__add"
      v-if="!list.length"
      :action="addActionToList"
    >
      Add action
    </button>
    <li
      class="action-list__item"
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
        class="action-list__btns"
      >
          <icon
            class="action-list__icon"
            :name="editIndex === index ? 'accept' : 'delete'"
            :width="20"
            :height="20"
            @click="editIndex === index ? changeFieldValue() : deleteFieldValue(index)"
          />
          <icon
            class="action-list__icon"
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
    text-align: left;
    font-weight: bold;

    &__btns {
      display: flex;
    }

    &__item {
      display: flex;
      justify-content: space-between;
    }

    &__icon {
      cursor: pointer;
    }

    &__add {
      width: 100%;
    }
  }
</style>
