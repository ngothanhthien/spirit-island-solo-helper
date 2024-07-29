<script setup lang="ts">
import BaseModal from '@/components/SpiritPanel/Modal.vue'
import ReplacementBox from '@/components/SpiritPanel/ReplacementBox.vue'
</script>

<template>
  <base-modal>
    <template v-slot:default="{ containerWidth, containerHeight }">
      <replacement-box
        :container="{
          width: 37,
          height: 11,
          point: {
            x: 19.9,
            y: 78.3
          }
        }"
        :panelWidth="containerWidth"
        :panelHeight="containerHeight"
        style="font-size: 0.55rem; line-height: 0.7rem; color: inherit; display: block; border-radius: 0"
        class="absolute bg-amber-100 px-1 py-1"
      >
        <div style="font-size: 0.6rem" class="font-bold leading-3">Mists Steadily Drift</div>
        <div>Up to twice during <span class="icon-fast text-red-700" /> and up to twice during <span class="icon-slow text-blue-900" />, Push 1 of your <span class="icon-presence" />.</div>
        <div style="font-size: 0.6rem" class="font-bold mt-1 leading-3">Stranded in the Shifting Mist</div>
        <div>Once each <span class="icon-fast text-red-700" />, Isolate one of your lands.</div>
      </replacement-box>
    </template>
  </base-modal>
</template>
