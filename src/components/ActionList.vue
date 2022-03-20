<template>
  <div
    class="w-100p flex-column-center-between mr-8"
  >
    <div
      :class="['list-title relative w-100p my-8 flex-column-center-center',
        list.length ? 'h-128' : 'h-100p',
      ]"
    >
      <div
        :class="['empty-fon w-100p bg-background grow']"
      />
      <div
        :class="['absolute fw-900 fs-16 px-24 c-font']"
        v-text="$t(
          empty
            ? 'title.emptyConfig'
            : list.length
              ? 'title.actionList'
              : 'title.emptyActionList',
        { chance })"
      />

    </div>
    <template v-if="!empty">
      <ul
        v-if="list.length"
        class="action-list w-100p mb-8 grow bold text-left"
      >
        <li
          class="action-item h-36 text flex-row-center-between mb-8 bg-background"
          v-for="(action, index) in list"
          :key="`action-${index}`"
        >
          <BaseInput
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
      <BaseButton
        class="w-100p mb-8"
        v-text="$t(`btn.addAction`)"
        type="classic"
        v-bind="{ disabled: !isValid }"
        @click="addAction(list)"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { ActionList } from '@/store/config/types'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useConfiguration } from '@/composable/configuration/index'

  const props = defineProps<{
    list: ActionList
    chance: string
    empty: boolean
    isValid: boolean
  }>()

  const { editAction, deleteAction, addAction } = useConfiguration()

</script>

<style scoped lang="scss">

.list-title {
  @include chanceTransition;
  transition-property: height;
}

.action-list {
  height: calc(36px * 3);
  overflow: scroll;
}

.actions {
  transition: 0.5s opacity;
  opacity: 0;

  .text:hover & {
    opacity: 1;
  }
}

.empty-fon {
  opacity: .7;
}

</style>
