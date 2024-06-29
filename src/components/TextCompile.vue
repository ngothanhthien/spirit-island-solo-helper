<script setup lang="ts">
import RangeIcon from '@/components/icons/RangeIcon.vue'
import useTextCompile from '@/composable/useTextCompile'

const props = defineProps({
  message: {
    type: String,
    required: true
  }
})
const { compileText, iconList } = useTextCompile(props.message)
</script>

<template>
  <div class="px-2 py-0.5 text-xs">
    <template v-for="(part, index) in compileText" :key="index">
      <span v-if="!iconList.includes(part)" v-html="part" />
      <template v-if="part === ':break:'">
        <div class="mt-1" />
      </template>
      <range-icon v-else-if="part === 'plus1Rangeicon'" num="+1" class="w-8 -mb-2 -mt-1" />
      <range-icon v-else-if="part === 'normal1Rangeicon'" num="1" class="w-8 -mb-2 -mt-1" />
      <range-icon v-else-if="part === 'air_range'" num="air" class="w-8 -mb-2 -mt-1" />
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
