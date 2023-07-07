import { ref } from "vue"

export default function () {
  const picked = ref<string[]>([])
  
  function togglePick(card: string) {
    if (picked.value.includes(card)) {
      picked.value = picked.value.filter((c) => c !== card)
    } else {
      picked.value.push(card)
    }
  }
  function isPicked(card: string) {
    return picked.value.includes(card)
  }
  return {
    picked,
    togglePick,
    isPicked,
  }
}
