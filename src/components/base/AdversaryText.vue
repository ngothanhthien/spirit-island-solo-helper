<script setup lang="ts">
import RangeIcon from '@/components/icons/RangeIcon.vue'
import useTextCompile from '@/composable/useTextCompile'
import {computed, type PropType} from "vue";

interface Message {
  name: string | null
  text: string
}

const props = defineProps({
  message: {
    type: Object as PropType<Message>,
    required: true,
  },
  isHighlight: {
    type: Boolean,
    default: false,
  },
})
const { iconList, compileText, iconMapping } = useTextCompile((props.message as Message).text)
const specIcon = computed(() => {
  return iconList.concat(Object.values(iconMapping))
})
</script>

<template>
  <div
    class="inline-block"
    :class="{'bg-amber-200': isHighlight}"
  >
    <span
      v-if="message.name"
      class="mr-1"
    >
      <span class="font-bold">{{ message.name }}</span>
      <span class="font-bold">:</span>
    </span>
    <template
      v-for="(part, index) in compileText"
      :key="index"
    >
      <span v-if="!specIcon.includes(part)">{{ part }}</span>
      <RangeIcon
        v-else-if="part === 'Rangeicon.png'"
        num="1"
      />
      <template v-else-if="part === ':break:'">
        <div />
      </template>
      <template v-else>
        <span :class="`icon-${part.toLowerCase()}`">
          <span class="path1"></span>
          <span class="path2"></span>
          <span class="path3"></span>
          <span class="path4"></span>
        </span>
      </template>
    </template>
  </div>
</template>
