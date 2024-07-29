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
          height: 24,
          point: {
            x: 19.9,
            y: 86.5
          }
        }"
        :panelWidth="containerWidth"
        :panelHeight="containerHeight"
        style="font-size: 0.55rem; line-height: 0.7rem; color: inherit; display: block; border-radius: 0;"
        class="absolute bg-amber-200/90 px-1 py-0.5"
      >
        <div style="font-size: 0.6rem" class="font-bold leading-3">Travel on the River's Back</div>
        <div>After Growth, choose up to 2 <span class="icon-dahan" /> among your lands. Move each of them to any land contiguously connected by your <span class="icon-presence" />.</div>
        <div style="font-size: 0.6rem" class="font-bold leading-3 mt-1">People Tend to the River, River Tends to the People</div>
        <div>Your lands with 4 or more <span class="icon-dahan" />are considered <span class="icon-scared-site" />, and have Defend 1.</div>
      </replacement-box>
    </template>
  </base-modal>
</template>
