<script setup lang="ts">
import { computed, ref } from 'vue'
import { useGameOptionStore } from '@/stores/GameOptionStore'
import { usePlayerCardStore } from '@/stores/PlayerCardStore'
import { SPIRIT } from '@/constant'
import type { SpiritType } from '@/types'

defineEmits(['close'])
const gameOption = useGameOptionStore()
const player = usePlayerCardStore()

const spiritIndex = computed(() => gameOption.spirits[player.current])
const aspectIndex = computed(() => gameOption.aspects[player.current])
const expanding = ref<number | null>(-1)

const faqs = computed(() => {
  const faq1 = SPIRIT[spiritIndex.value].faq ?? []
  if (aspectIndex.value < 0) return faq1
  const spiritData = SPIRIT[spiritIndex.value] as SpiritType
  if (!spiritData.aspects) return faq1
  const aspectData = spiritData.aspects[aspectIndex.value]
  const faq2 = aspectData.faq ?? []
  return [...faq1, ...faq2]
})

function toggleExpand(index: number) {
  if (expanding.value === index) {
    expanding.value = -1
  } else {
    expanding.value = index
  }
}

function getHostName(url: string) {
  const link = new URL(url)
  return link.hostname
}
</script>

<template>
  <div
    class="absolute z-[99999] bg-gray-900/70 top-0 left-0 h-full w-full flex items-center justify-center"
    @click.self="$emit('close')"
  >
    <div class="bg-white rounded-lg w-[90%]">
      <div
        class="flex justify-between px-3 py-2 rounded-t-lg bg-stone-800 text-white"
      >
        Reminder
        <span
          class="icon-x text-2xl -mr-1.5"
          style="stroke-width: 1px"
          @click="$emit('close')"
        />
      </div>
      <div class="px-2 py-2 h-[70vh] overflow-y-auto">
        <transition-group v-if="faqs.length" name="expand">
          <div
            v-for="(faq, index) in faqs"
            :key="`fqa-${index}`"
            class="divide-y divide-gray-400 divide-dashed relative transition bg-white"
          >
            <div
              class="flex items-center py-2 space-x-2"
              @click="toggleExpand(index)"
            >
              <div
                class="rounded-full bg-pink-700 text-white w-8 h-8 flex items-center text-center justify-center"
              >
                {{ index + 1 }}
              </div>
              <div>{{ faq.title }}</div>
            </div>
            <div
              v-if="expanding === index"
              class="pl-10 divide-y divide-dashed divide-gray-300"
            >
              <div v-if="faq.description" class="py-1">
                {{ faq.description }}
              </div>
              <div class="py-1 text-sm italic">
                <span>Reference:&nbsp;</span>
                <a
                  v-for="(link, i) in faq.links"
                  :key="`link-${i}`"
                  :href="link"
                  target="_blank"
                  class="text-green-600"
                >
                  <span v-if="i > 0">,&nbsp;</span>{{ getHostName(link) }}
                </a>
              </div>
            </div>
          </div>
        </transition-group>
        <div v-else class="text-gray-400 text-center py-10">
          No reminder. :)
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
