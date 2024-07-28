<script setup lang="ts">
import BaseModal from '@/components/SpiritPanel/Modal.vue'
import ReplacementBox from '@/components/SpiritPanel/ReplacementBox.vue'
</script>

<template>
  <base-modal>
    <template v-slot:default="{ containerWidth, containerHeight }">
      <replacement-box
        :container="{
          width: 33.7,
          height: 45,
          point: {
            x: 56.9,
            y: 76.5
          }
        }"
        cs-style="width: 99%; top: -22%; left: -0.5%; position: absolute; opacity: 98%;"
        path="/img/aspects/haven.webp"
        :panelWidth="containerWidth"
        :panelHeight="containerHeight"
      />
    </template>
  </base-modal>
</template>
