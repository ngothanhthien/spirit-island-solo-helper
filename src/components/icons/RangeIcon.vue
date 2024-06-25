<script lang="ts">
export default {
  props: {
    num: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <div class="inline-block text-center -translate-y-2">
    <div class="text-[11px] font-bold translate-y-1">
      <img
        v-if="num === 'air'"
        :src="`/img/elements/air.webp`"
        class="h-3 inline-block -translate-y-0.5 -my-0.5"
      />
      <span v-else>{{ num }}</span>
    </div>
    <svg
      class="w-full h-2"
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256.000000 43.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,43.000000) scale(0.100000,-0.100000)"
        fill="currentColor"
        stroke="none"
      >
        <path
          d="M306 403 c-4 -5 -69 -8 -144 -8 -162 -1 -166 -4 -103 -89 40 -54 44
-79 15 -90 -19 -7 -18 -35 1 -42 12 -5 8 -16 -20 -56 -56 -77 -51 -82 85 -83
63 0 122 3 131 7 11 5 22 2 29 -7 16 -19 34 -19 50 0 7 8 21 15 31 15 12 0 33
21 55 55 l37 56 833 -3 832 -3 22 -27 c20 -26 27 -28 89 -28 113 0 281 73 289
126 8 55 -143 118 -281 119 -76 0 -80 -1 -103 -30 l-24 -30 -832 -2 -833 -3
-33 50 c-19 31 -39 50 -51 50 -10 0 -24 7 -31 15 -13 16 -32 19 -44 8z"
        />
      </g>
    </svg>
  </div>
</template>
