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
          height: 44,
          point: {
            x: 56.5,
            y: 76.5
          }
        }"
        cs-style="width: 108%; top: -41%; left: -4%; position: absolute; opacity: 95%;"
        path="/img/aspects/sparking.webp"
        :panelWidth="containerWidth"
        :panelHeight="containerHeight"
      />
    </template>
  </base-modal>
</template>
