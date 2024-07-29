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
          height: 7,
          point: {
            x: 19.9,
            y: 73.5
          }
        }"
        :panelWidth="containerWidth"
        :panelHeight="containerHeight"
        style="font-size: 0.55rem; line-height: 0.7rem; color: inherit; display: block; border-radius: 0; line-height: 0.7rem"
        class="absolute bg-amber-200/90 px-1 py-0.5"
      >
        <div style="font-size: 0.6rem" class="font-bold leading-3">Unconstrained by Ravaged Lands</div>
        <div>Ranging Hunt may target lands with <span class="icon-blight" />.</div>
      </replacement-box>
      <replacement-box
        :container="{
          width: 37.6,
          height: 13,
          point: {
            x: 19.9,
            y: 92.3
          }
        }"
        :panelWidth="containerWidth"
        :panelHeight="containerHeight"
        style="font-size: 0.55rem; line-height: 0.7rem; color: inherit; display: block; border-radius: 0; line-height: 0.7rem"
        class="absolute bg-amber-200/90 px-1 py-0.5"
      >
        <div style="font-size: 0.6rem" class="font-bold leading-3">Predators Arise</div>
        <div>Each Spirit phase, either Prepare 1 <span class="icon-beasts" /> or Add any number of your prepared <span class="icon-beasts" /> to one of your lands.</div>
      </replacement-box>
    </template>
  </base-modal>
</template>
