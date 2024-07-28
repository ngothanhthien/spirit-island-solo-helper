<script setup lang="ts">
import BaseModal from '@/components/SpiritPanel/Modal.vue'
import ReplacementBox from '@/components/SpiritPanel/ReplacementBox.vue'
</script>

<template>
  <base-modal>
    <template v-slot:default="{ containerWidth, containerHeight }">
      <replacement-box
        :container="{
          width: 35,
          height: 38,
          point: {
            x: 56.5,
            y: 79.5
          }
        }"
        cs-style="width: 170%; top: -32%; left: -6%; position: absolute; opacity: 95%;"
        path="/img/aspects/pandemonium.webp"
        :panelWidth="containerWidth"
        :panelHeight="containerHeight"
      />
    </template>
  </base-modal>
</template>
