<script setup lang="ts">
import router from '@/router'
import { useModalStore } from '@/stores/ModalStore'
import BaseButton from '@/components/base/BaseButton.vue'
import { addResult } from '@/database/result'
import { useMessageStore } from '@/stores/MessageStore'
import { useGameOptionStore } from '@/stores/GameOptionStore'
import { useInvaderCardStore } from '@/stores/InvaderCardStore'
import { useFearDeckStore } from '@/stores/FearDeckStore'
import { usePowerDeckStore } from '@/stores/PowerDeckStore'
import { ref } from 'vue'

const isLoading = ref(false)

async function logMatch(win: boolean) {
  const gameOption = useGameOptionStore()
  const fearDeck = useFearDeckStore()

  isLoading.value = true
  try {
    await addResult({
      spirits: gameOption.spiritsName,
      adversary: gameOption.adversaryName,
      win,
      level: gameOption.adversaryLevel,
      invader_card_left: useInvaderCardStore().draw.length,
      fear_stage: fearDeck.draw.length === 0 ? 4 : fearDeck.currentStage
    })
    usePowerDeckStore('minor').$reset()
    usePowerDeckStore('major').$reset()
    await router.push('/HomeView')
  } catch (error) {
    useMessageStore().setMessage('Log failed')
    isLoading.value = false
  }
}

function close() {
  useModalStore().confirmLog = false
}
</script>

<template>
  <div class="absolute z-[99999] bg-gray-900/30 top-0 left-0 h-full w-full flex items-center justify-center" @click.self="close()">
    <div class="bg-white rounded-lg w-fit px-3 py-2">
      <div class="mb-4 flex justify-between">
        <div>Log this match?</div>
        <div @click="close()">
          <span class="icon-x text-2xl" />
        </div>
      </div>
      <div class="flex space-x-2 mt-2">
        <base-button button-style="secondary" :disabled="isLoading" @click="logMatch(true)"> Win </base-button>
        <base-button button-style="secondary" :disabled="isLoading" @click="logMatch(false)"> Lose </base-button>
        <base-button button-style="primary" @click="router.push({ name: 'HomeView' })"> No Log </base-button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
