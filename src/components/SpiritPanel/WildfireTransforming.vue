<script setup lang="ts">
import BaseModal from '@/components/SpiritPanel/Modal.vue'
import ReplacementBox from '@/components/SpiritPanel/ReplacementBox.vue'
</script>

<template>
  <base-modal>
    <template v-slot:default="{ containerWidth, containerHeight }">
      <replacement-box
        :container="{
          width: 37.5,
          height: 28.5,
          point: {
            x: 19.5,
            y: 54
          }
        }"
        cs-style="width: 115%; top: -50%; left: -5%; position: absolute; opacity: 93%;"
        path="/img/aspects/transforming.webp"
        :panelWidth="containerWidth"
        :panelHeight="containerHeight"
      />
      <replacement-box
        :container="{
          width: 28,
          height: 32,
          point: {
            x: 85,
            y: 75.8
          }
        }"
        cs-style="width: 115%; top: -100%; left: -7%; position: absolute; opacity: 93%;"
        path="/img/aspects/transforming.webp"
        :panelWidth="containerWidth"
        :panelHeight="containerHeight"
      />
    </template>
  </base-modal>
</template>