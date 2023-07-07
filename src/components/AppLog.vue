<script setup lang="ts">
import { ref, watch } from 'vue'
import { useLogStore } from '@/stores/LogStore'
import { useElementHover, useScroll } from '@vueuse/core'
import IconLog from '@/components/icon/IconLog.vue'

const el = ref<HTMLElement | null>(null)
const isHovered = useElementHover(el)
const { y } = useScroll(el)
const logStore = useLogStore()
watch(() => logStore.getLogs, () => {
  if (!isHovered.value) {
    y.value = 9999
  }
}, { deep: true })
const showLog = ref(true)
</script>
<template>
  <div ref="el" :class="{'border-none bg-transparent': !showLog, 'bg-white': showLog}" class="border border-gray-400 overflow-auto text-sm rounded-md">
    <div class="relative p-2">
      <template v-if="showLog">
        <div v-for="(log, index) in logStore.getLogs" :key="index" 
        :class="{
          'text-red-500': log.type === 'error',
          'text-green-500': log.type === 'success',
          'text-gray-500': log.type === 'info',
        }">
          {{ log.createdAt }} - {{ log.message }}
        </div>
      </template>
      <button @click="showLog = !showLog">
        <icon-log class="w-5 h-5 absolute top-1 right-1" />
      </button>
    </div>
  </div>
</template>
