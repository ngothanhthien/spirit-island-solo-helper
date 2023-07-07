<script setup lang="ts">
import CardDeck from '@/components/base/CardDeck.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { useLogStore } from '@/stores/LogStore';
import { useFearDeckStore } from '@/stores/FearDeckStore';

const logStore = useLogStore()
const fearDeck = useFearDeckStore()
function shuffle() {
  fearDeck.shuffle()
  logStore.add('Fear deck shuffled', 'success')
}
</script>

<template>
  <div>Todo</div>
</template>
