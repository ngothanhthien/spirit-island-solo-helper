<script setup lang="ts">
import { useDaysThatNeverWereStore } from '@/stores/DaysThatNeverWhereStore'

const daysThatNeverWereDeck = useDaysThatNeverWereStore()
</script>

<template>
  <div class="w-11 h-11 rounded-full bg-green-800 border-2 border-purple-700 overflow-hidden" @click="daysThatNeverWereDeck.showModal()">
    <img src="/img/icon/days_that_never_were.webp" alt="days that never were" class="h-full" />
  </div>
</template>
