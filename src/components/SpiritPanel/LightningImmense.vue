<script setup lang="ts">
import BaseModal from '@/components/SpiritPanel/Modal.vue'
import ReplacementBox from '@/components/SpiritPanel/ReplacementBox.vue'
</script>

<template>
  <base-modal>
    <template v-slot:default="{ containerWidth, containerHeight }">
      <replacement-box
        :container="{
          width: 37.6,
          height: 29,
          point: {
            x: 19.9,
            y: 60.5
          }
        }"
        :panelWidth="containerWidth"
        :panelHeight="containerHeight"
        style="font-size: 0.62rem; color: inherit; display: block; border-radius: 0; line-height: 0.7rem"
        class="absolute bg-amber-200/90 px-1 py-0.5"
      >
        <div style="font-size: 0.65rem" class="font-bold leading-3">An Immense Spirit, Towering and Slow</div>
        <div>Your top Presence Track grants you twice as much Energy during the Growth. Any ongoing modifiers are counted after doubling.</div>
        <div class="mt-1">Playing Power Cards during the Spirit Phase costs 2 Card Plays instead of 1. Gain 1 <span class="icon-any" /> for each unused Card Plays.</div>
        <div class="mt-1">For each Major Power you play, gain 2 different Elements of your choice.</div>
      </replacement-box>
    </template>
  </base-modal>
</template>
