<script setup lang="ts">
import { computed } from 'vue';
import type { Map, MapType } from './type';

const props = defineProps<{
  type: MapType;
  size: number;
  isEscalation: boolean;
  isLock?: boolean;
}>();

const map: { [key in MapType]: Map } = {
  wetland: { x: 1, y: 0, i: 0 },
  sand: { x: 2, y: 0, i: 1},
  jungle: { x: 3, y: 0, i: 2 },
  sandWetland: { x: 1, y: 1, i: 0 },
  coastalLand: { x: 2, y: 1, i: 1 },
  mountain: { x: 3, y: 1, i: 2 },
  sandMountain: { x: 1, y: 0, i: 0, offsetY: 1/7 },
  mountainJungle: { x: 2, y: 0, i: 1, offsetX: -1/8 },
  jungleWetland: { x: 3, y: 0, i: 2, offsetX: -1/8 },
  jungleSand: { x: 2, y: 1, i: 1, offsetX: -1/8 },
  mountainWetland: { x: 2, y: 1, i: 1, offsetX: -1/8 },
};

const isSprite1 = computed(() => props.type === 'wetland' || props.type === 'sand' || props.type === 'jungle' || props.type === 'sandWetland' || props.type === 'coastalLand' || props.type === 'mountain')
</script>

<template>
  <div class="normal-invader-card wrapper" :style="{ '--w': props.size + 'px' }">
    <div class="tile"
      :class="{
        'sprite1': isSprite1,
        'sprite2': !isSprite1,
        'border-4 border-red-700': props.isLock
      }"
      :style="{ '--raw-w': props.size + 'px', '--x': map[props.type].x, '--y': map[props.type].y, '--i': map[props.type].i, '--offset-y': map[props.type].offsetY || 0, '--offset-x': map[props.type].offsetX || 0 }"
    />
    <div v-if="props.isEscalation" class="escalation" :style="{ '--raw-w': props.size + 'px' }" />
  </div>
</template>

<style>
.normal-invader-card.wrapper {
  --w: 0;
  background-color: rgba(0, 0, 0, 0.2);
  width: fit-content;
  padding: calc(var(--w) * 1/12);
  border-radius: 10px;
  position: relative;
}

.normal-invader-card .tile {
  --w: calc(var(--raw-w) * 5/6);
  --x: 0;          /* số cột (number) */
  --y: 0;          /* số hàng (number) */
  --h: calc(var(--w) * 203/128);
  --i: 0;
  --space: calc(var(--w) * 1/25);
  --offset-y: 0;
  --offset-x: 0;

  width: var(--w);
  height: var(--h);

  background-repeat: no-repeat;
  background-size: calc(var(--w) * 225/64) calc(var(--w) * 225/64);

  background-position:
    calc(var(--x) * -1 * var(--w) + (63/64) * var(--w) - var(--i) * var(--space) + var(--offset-x) * var(--w))
    calc(var(--y) * -1 * var(--h) - (39/128) * var(--w) + var(--offset-y) * var(--w));
}

.normal-invader-card .sprite1 {
  background-image: url('/sprite/i1.webp');
}

.normal-invader-card .sprite2 {
  background-image: url('/sprite/i2.webp');
}

.normal-invader-card .escalation {
  --w: calc(var(--raw-w) * 5/6);
  background-image: url('/sprite/i1.webp');
  background-size: calc(var(--w) * 2) calc(var(--w) * 2);
  background-position: 96.4% 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: calc(var(--w) * 1/6);
  height: calc(var(--w) * 1/4);
}
</style>
