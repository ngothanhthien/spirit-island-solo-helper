<script setup lang="ts">
import router from '@/router'
import BaseButton from '@/components/base/BaseButton.vue'
import {computed, onMounted} from 'vue'
import { useEventDeckStore } from '@/stores/EventDeckStore'
import { useFearDeckStore } from '@/stores/FearDeckStore'
import { usePowerDeckStore } from '@/stores/PowerDeckStore'
import { PWAInstallElement } from '@khmyznikov/pwa-install'
import { ref } from 'vue'
import injectWakeScreen from "@/plugins/wakeScreen";
import {useMessageStore} from "@/stores/MessageStore";

const eventDeck = useEventDeckStore()
const fearDeck = useFearDeckStore()
const minorDeck = usePowerDeckStore('minor')
const majorDeck = usePowerDeckStore('major')

const canContinue = computed(() => {
  return (
    eventDeck.isAvailable &&
    minorDeck.isAvailable &&
    majorDeck.isAvailable &&
    fearDeck.isAvailable
  )
})

const appVersion = ref(import.meta.env.VITE_APP_VERSION)
const pwaInstall = ref<PWAInstallElement | null>(null)
const isUnderStandaloneMode = ref(false)

onMounted(() => {
  const pwaInstallEl = document.getElementById('pwa-install') as PWAInstallElement
  isUnderStandaloneMode.value = pwaInstallEl.isUnderStandaloneMode
})

injectWakeScreen()

function installApp() {
  if (!pwaInstall.value?.isInstallAvailable) {
    useMessageStore().setMessage('Installation is not available. Have you already installed the app? If not, please contact the developer.')
  }
  pwaInstall.value?.showDialog(true)
}
</script>

<template>
  <div class="bg-gradient-to-r from-slate-200 to-slate-500 h-screen flex items-center justify-center relative">
    <pwa-install
      id="pwa-install"
      ref="pwaInstall"
      manifest-url="/manifest.webmanifest"
    />
    <div class="flex flex-col space-y-3 w-40">
      <div class="text-center">
        Version {{ appVersion }}
      </div>
      <base-button
        class="w-full"
        button-style="secondary"
        @click="router.push({ name: 'SetupView' })"
      >
        New game
      </base-button>
      <base-button
        class="w-full"
        button-style="secondary"
        :disabled="!canContinue"
        @click="router.push({ name: 'GameView' })"
      >
        Continue
      </base-button>
      <base-button
        class="w-full"
        button-style="secondary"
        @click="router.push({ name: 'StatisticsView' })"
      >
        Statistics
      </base-button>
      <base-button
        class="w-full"
        button-style="warning"
        :disabled="isUnderStandaloneMode"
        @click="installApp"
      >
        {{ isUnderStandaloneMode ? 'Installed' : 'Install' }}
      </base-button>
    </div>
  </div>
</template>
