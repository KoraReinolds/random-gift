<template>
  <div
    class="w-100p flex-column-center-between mr-8"
  >
    <ul
      class="w-100p bold text-left"
    >
      <li
        class="action-item text flex-row-center-between mt-8 bg-background"
        v-for="(action, index) in list"
        :key="`action-${index}`"
      >
        <base-input
          class="bold pa-8"
          :modelValue="action.value"
          @update:modelValue="editAction({
            actionItem: action,
            newValue: $event,
          })"
          :placeholder="$t(`btn.newAction`)"
          v-focus
        />
        <div
          class="actions flex-row"
        >
          <icon
            class="icon pointer mx-8"
            name="delete"
            :width="20"
            :height="20"
            @click="deleteAction({
              itemIndex: index,
              actionList: list,
            })"
          />
        </div>
      </li>
    </ul>
    <base-button
      class="w-100p mb-8"
      v-text="$t(`btn.addAction`)"
      type="classic"
      @click="addAction(list)"
    />
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue'
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
  setup() {
    
    const { editAction, deleteAction, addAction } = useConfiguration()

    return {
      addAction,
      editAction,
      deleteAction,
    }
  }
}
</script>

<style scoped lang="scss">

// hide delete icon
.action-item:first-of-type.action-item:last-of-type {
  .icon:first-child {
    display: none;
  }
}

.actions {
  transition: 0.5s opacity;
  opacity: 0;

  .text:hover & {
    opacity: 1;
  }
}

</style>
