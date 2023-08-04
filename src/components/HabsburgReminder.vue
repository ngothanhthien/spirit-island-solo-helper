<script setup lang="ts">
import { useInvaderCardStore } from '@/stores/InvaderCardStore'
import { computed, watch } from 'vue'
import AdversaryText from '@/components/base/AdversaryText.vue'
import { useMessageStore } from '@/stores/MessageStore';

defineEmits(['close'])

const invaderCard = useInvaderCardStore()

const isShow = computed(() => {
  return invaderCard.isShowHabsburg
})
watch(isShow, (value) => {
  if (value) {
    useMessageStore().setMessage('Please do Habsburg level 5')
  }
})
</script>

<template>
  <div
    v-if="isShow"
    class="absolute w-full h-full bg-gray-900/30 top-0 left-0"
    @click.self="$emit('close')"
  >
    <div class="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md max-w-[60%]">
      <div class="bg-orange-800 text-white font-semibold text-lg py-1 px-2 rounded-t-md">
        Habsburg Reminder
      </div>
      <div class="px-3 py-1.5">
        <adversary-text
          :message="{
            name: null,
            text: `Add 1 Cityicon.png to a Coastal land without Cityicon.png and 1 Townicon.png to the 3 Inland lands with the fewest Blight.png`,
          }"
        />
      </div>
    </div>
  </div>
</template>