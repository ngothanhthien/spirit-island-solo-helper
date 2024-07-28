<script setup lang="ts">
import BaseModal from '@/components/SpiritPanel/Modal.vue'
import ReplacementBox from '@/components/SpiritPanel/ReplacementBox.vue'
</script>

<template>
  <base-modal>
    <template v-slot:default="{ containerWidth, containerHeight }">
      <replacement-box
        :container="{
          width: 38.3,
          height: 36,
          point: {
            x: 19.5,
            y: 79.5
          }
        }"
        cs-style="width: 124%; top: -27%; left: -5%; position: absolute; opacity: 90%;"
        path="/img/aspects/wind.webp"
        :panelWidth="containerWidth"
        :panelHeight="containerHeight"
      />
    </template>
  </base-modal>
</template>
