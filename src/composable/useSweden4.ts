import { readonly, ref } from 'vue'
import { useInvaderCardStore } from '@/stores/InvaderCardStore'

const sweden4 = ref<string | null>(null)
export function useSweden4() {
  function doSweden4() {
    sweden4.value = useInvaderCardStore().doSweden()
  }

  function clear() {
    sweden4.value = null
  }

  return {
    sweden4: readonly(sweden4),
    doSweden4,
    clear
  }
}
