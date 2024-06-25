<script setup lang="ts">
import { useDaysThatNeverWereStore } from '@/stores/DaysThatNeverWhereStore'
import DaysThatNeverWere from '@/components/DaysThatNeverWere.vue'
import { nextTick, ref } from 'vue'
import VisionOfAShiftingFutureEvent from '@/components/VisionOfAShiftingFutureEvent.vue'

const daysThatNeverWereDeck = useDaysThatNeverWereStore()
const isShowVisionsOfAShiftingFutureEvent = ref(false)
const mountTeleport = ref(false)
nextTick(() => {
  mountTeleport.value = true
})
</script>

<template>
  <div
    class="w-11 h-11 rounded-full bg-green-800 border-2 border-purple-700 overflow-hidden"
    @click="daysThatNeverWereDeck.showModal()"
  >
    <img
      src="/img/icon/days_that_never_were.webp"
      alt="days that never were"
      class="h-full"
    />
    <Teleport v-if="mountTeleport" to="#modal">
      <days-that-never-were
        v-if="daysThatNeverWereDeck.isShowModal"
        @close="daysThatNeverWereDeck.hideModal()"
        @do-visions-of-a-shifting-future="
          isShowVisionsOfAShiftingFutureEvent = true
        "
      />
      <VisionOfAShiftingFutureEvent
        v-if="isShowVisionsOfAShiftingFutureEvent"
        @close="isShowVisionsOfAShiftingFutureEvent = false"
      />
    </Teleport>
  </div>
</template>
