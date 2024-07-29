<script setup lang="ts">
import BaseModal from '@/components/SpiritPanel/Modal.vue'
import ReplacementBox from '@/components/SpiritPanel/ReplacementBox.vue'
import RangeIcon from '@/components/icons/RangeIcon.vue'
</script>

<template>
  <base-modal>
    <template v-slot:default="{ containerWidth, containerHeight }">
      <replacement-box
        :container="{
          width: 28,
          height: 41,
          point: {
            x: 53.5,
            y: 80.5
          }
        }"
        cs-style="width: 118%; top: -48%; left: -6%; position: absolute; opacity: 95%;"
        path="/img/aspects/encircle.webp"
        :panelWidth="containerWidth"
        :panelHeight="containerHeight"
      />
      <replacement-box
        :container="{
          width: 38,
          height: 9.5,
          point: {
            x: 19.9,
            y: 81.5
          }
        }"
        :panelWidth="containerWidth"
        :panelHeight="containerHeight"
        style="font-size: 0.55rem; line-height: 0.7rem; color: inherit; display: block; border-radius: 0; line-height: 0.7rem"
        class="absolute bg-amber-200/90 pl-1 py-0.5"
      >
        <div style="font-size: 0.6rem" class="font-bold leading-3">Pack Hunting</div>
        <div>Your Powers get <range-icon num="+1" class="w-5 mb-2 mt-1 text-gray-800/90" /> for targeting lands with <span class="icon-beasts" />.</div>
      </replacement-box>
    </template>
  </base-modal>
</template>
