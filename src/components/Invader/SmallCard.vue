<script setup lang="ts">
import type { Map, MapType } from './type';

const props = defineProps<{
  type: MapType;
  size: number;
}>();

const map: { [key in MapType]: Omit<Map, 'i'> } = {
  wetland: { x: 2, y: 1 },
  sand: { x: 4, y: 1},
  jungle: { x: 0, y: 1 },
  sandWetland: { x: 4, y: 0 },
  coastalLand: { x: 3, y: 2 },
  mountain: { x: 5, y: 2 },
  sandMountain: { x: 5, y: 1 },
  mountainJungle: { x: 2, y: 2 },
  jungleWetland: { x: 3, y: 0 },
  jungleSand: { x: 1, y: 2 },
  mountainWetland: { x: 0, y: 0 },
}
</script>

<template>
  <div class="small-invader-card wrapper sprite-3">
    <div class="tile"
      :style="{ '--w': props.size + 'px', '--x': map[props.type].x, '--y': map[props.type].y }"
    />
  </div>
</template>

<style>
.small-invader-card.wrapper {
  width: fit-content;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}
</style>
