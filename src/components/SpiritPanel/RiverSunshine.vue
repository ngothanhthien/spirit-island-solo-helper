<script setup lang="ts">
import BaseModal from '@/components/SpiritPanel/Modal.vue'
import ReplacementBox from '@/components/SpiritPanel/ReplacementBox.vue'
</script>

<template>
  <base-modal>
    <template v-slot:default="{ containerWidth, containerHeight }">
      <replacement-box
        :container="{
          width: 37.7,
          height: 25,
          point: {
            x: 19.9,
            y: 63.5
          }
        }"
        cs-style="width: 113%; top: -34%; left: -5%; position: absolute; opacity: 90%;"
        path="/img/aspects/sunshine.webp"
        :panelWidth="containerWidth"
        :panelHeight="containerHeight"
      />
    </template>
  </base-modal>
</template>
