<script setup>
import { useImpendingCardStore } from '@/stores/ImpendingCardStore'
import { computed, defineAsyncComponent } from 'vue'
import InvaderControl from '@/components/InvaderControl.vue'
import ModalDiscardCommon from '@/components/ModalDiscardCommon.vue'
import ModalDiscardPower from '@/components/ModalDiscardPower.vue'
import ModalZoomBlightCard from '@/components/ModalZoomBlightCard.vue'
import ModalEarnedFear from '@/components/ModalEarnedFear.vue'
import ModalFearDeck from '@/components/ModalFearDeck.vue'
import ModalFearReveal from '@/components/ModalFearReveal.vue'
import GameSettingModal from '@/components/GameSettingModal.vue'
import CardZoomModal from '@/components/CardZoomModal.vue'
import EventZoomModal from '@/components/EventZoomModal.vue'
import AdversarySetupInfo from '@/components/AdversarySetupInfo.vue'
import { useCardZoomStore } from '@/stores/CardZoomStore'
import { useEventDeckStore } from '@/stores/EventDeckStore'
import { useModalStore } from '@/stores/ModalStore'
import { useFearDeckStore } from '@/stores/FearDeckStore'
import { useGameOptionStore } from '@/stores/GameOptionStore'
import { useModalDiscardStore } from '@/stores/ModalDiscardStore'
import DaysThatNeverWere from '@/components/DaysThatNeverWere.vue'
import { useDaysThatNeverWereStore } from '@/stores/DaysThatNeverWhereStore'
import GleamingHoard from '@/components/GleamingHoard/Modal.vue'
import { useGleamingHoardStore } from '@/components/GleamingHoard/Store'
import { usePlayerCardStore } from '@/stores/PlayerCardStore'
import { useSpiritInfo } from '@/composable/useSpiritInfo'
import BaseZoom from '@/components/base/BaseZoom.vue'
const Sweden4Modal = defineAsyncComponent(() => import('@/components/Adversary/Sweden4Modal.vue'))
const SaltDepositModal = defineAsyncComponent(() => import('@/components/Adversary/SaltDepositModal.vue'))
const AspectDetail = defineAsyncComponent(() => import('@/components/AspectDetail.vue'))
const AdversaryModal = defineAsyncComponent(() => import('@/components/AdversaryModal.vue'))
const ConfirmLogMatchModal = defineAsyncComponent(() => import('@/components/ConfirmLogMatchModal.vue'))
const VisionOfAShiftingFutureEvent = defineAsyncComponent(() => import('@/components/VisionOfAShiftingFutureEvent.vue'))
const InvaderDrawModal = defineAsyncComponent(() => import('@/components/Invader/DrawModal.vue'))
const InvaderDiscardModal = defineAsyncComponent(() => import('@/components/Invader/DiscardModal.vue'))
const FaqModal = defineAsyncComponent(() => import('@/components/FaqModal.vue'))
const HabsburgReminder = defineAsyncComponent(() => import('@/components/HabsburgReminder.vue'))
const Russia5Modal = defineAsyncComponent(() => import('@/components/Russia5Modal.vue'))
const ImpedingCardModal = defineAsyncComponent(() => import('@/components/ImpendingCardModal.vue'))

const modal = useModalStore()
const gameOption = useGameOptionStore()
const daysThatNeverWereDeck = useDaysThatNeverWereStore()
const gleamingHoardStore = useGleamingHoardStore()
const player = usePlayerCardStore()
const isHasAspect = computed(() => Boolean(gameOption.aspectsDetail[player.current]))
const { spiritInfo } = useSpiritInfo()
const aspect = computed(() => gameOption.aspectsDetail[player.current])
const spiritPanelModal = computed(() => {
  switch (spiritInfo.value.name) {
    case 'Wounded Waters Bleeding':
      return defineAsyncComponent(() => import('@/components/SpiritPanel/WoundedWatersBleed.vue'))
    case 'Starlight Seeks Its Form':
      return defineAsyncComponent(() => import('@/components/SpiritPanel/Starlight.vue'))
    case 'Shroud Of Silent Mist':
      if (aspect.value) {
        return defineAsyncComponent(() => import('@/components/SpiritPanel/MistStranded.vue'))
      }
      break
    case 'Heart Of The Wildfire':
      if (aspect.value) {
        return defineAsyncComponent(() => import('@/components/SpiritPanel/WildfireTransforming.vue'))
      }
      break
    case "Ocean's Hungry Grasp":
      if (aspect.value) {
        return defineAsyncComponent(() => import('@/components/SpiritPanel/OceanDeeps.vue'))
      }
      break
  }
  switch (aspect.value?.title?.toLowerCase()) {
    case 'unconstrained':
      return defineAsyncComponent(() => import('@/components/SpiritPanel/FangsUnconstrained.vue'))
    case 'encircle':
      return defineAsyncComponent(() => import('@/components/SpiritPanel/FangsEncircle.vue'))
    case 'sunshine':
      return defineAsyncComponent(() => import('@/components/SpiritPanel/RiverSunshine.vue'))
    case 'travel':
      return defineAsyncComponent(() => import('@/components/SpiritPanel/RiverTravel.vue'))
    case 'haven':
      return defineAsyncComponent(() => import('@/components/SpiritPanel/RiverHaven.vue'))
    case 'immense':
      return defineAsyncComponent(() => import('@/components/SpiritPanel/LightningImmense.vue'))
    case 'pandemonium':
      return defineAsyncComponent(() => import('@/components/SpiritPanel/LightningPandemonium.vue'))
    case 'wind':
      return defineAsyncComponent(() => import('@/components/SpiritPanel/LightningWind.vue'))
    case 'sparking':
      return defineAsyncComponent(() => import('@/components/SpiritPanel/LightningSparking.vue'))
  }

  return defineAsyncComponent(() => import('@/components/SpiritPanel/Modal.vue'))
})
</script>

<template>
  <div>
    <modal-discard-common v-if="useModalDiscardStore().getType === 'common'" />
    <modal-discard-power v-if="modal.discardPower" />
    <modal-zoom-blight-card v-if="modal.zoomBlightCard" />
    <modal-earned-fear v-if="modal.earnedFear" />
    <modal-fear-deck v-if="modal.fearDeck && useFearDeckStore().draw.length > 0" />
    <modal-fear-reveal v-if="useFearDeckStore().currentReveal" />
    <game-setting-modal v-if="modal.gameSettings" />
    <card-zoom-modal v-if="useCardZoomStore().isShow" />
    <event-zoom-modal v-if="useEventDeckStore().reveal" />
    <aspect-detail v-if="modal.aspectDetail && isHasAspect" />
    <russia5-modal v-if="gameOption.hasRussia5" />
    <invader-control v-if="modal.invaderControl" />
    <adversary-setup-info v-if="modal.adversarySetup" />
    <habsburg-reminder v-if="modal.habsburgReminder && gameOption.hasHabsburg5" />
    <impeding-card-modal v-if="useImpendingCardStore().index !== null && modal.impendingCardModel" />
    <faq-modal v-if="modal.faq" />
    <confirm-log-match-modal v-if="modal.confirmLog" />
    <adversary-modal v-if="modal.adversary" class="z-50" />
    <invader-draw-modal v-if="modal.invaderDraw" />
    <invader-discard-modal v-if="modal.invaderDiscard" />
    <days-that-never-were v-if="daysThatNeverWereDeck.isShowModal" />
    <VisionOfAShiftingFutureEvent v-if="modal.visionsOfAShiftingFutureEvent" />
    <SaltDepositModal v-if="modal.saltDeposit" />
    <Sweden4Modal v-if="gameOption.hasSweden4" />
    <spirit-panel-modal v-if="modal.panel" />
    <gleaming-hoard v-if="gleamingHoardStore.isShowModal" />
    <base-zoom v-if="modal.baseZoom.length > 0" />
  </div>
</template>
