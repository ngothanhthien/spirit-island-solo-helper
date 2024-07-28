<script setup lang="ts">
import BaseModal from '@/components/SpiritPanel/Modal.vue'
import ReplacementBox from '@/components/SpiritPanel/ReplacementBox.vue'
</script>

<template>
  <base-modal>
    <template v-slot:default="{ containerWidth, containerHeight }">
      <replacement-box
        :container="{
          width: 30,
          height: 33.5,
          point: {
            x: 54,
            y: 82
          }
        }"
        cs-style="width: 121%; top: -39%; left: -6%; position: absolute; opacity: 95%;"
        path="/img/aspects/deeps_1.webp"
        :panelWidth="containerWidth"
        :panelHeight="containerHeight"
      />
      <replacement-box
        :container="{
          width: 32,
          height: 33,
          point: {
            x: 86,
            y: 82
          }
        }"
        cs-style="width: 84%; top: -29%; left: -1%; position: absolute; opacity: 93%;"
        path="/img/aspects/deeps_2.webp"
        :panelWidth="containerWidth"
        :panelHeight="containerHeight"
      />
    </template>
  </base-modal>
</template>
