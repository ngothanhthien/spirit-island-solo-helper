import { readonly, type Ref, ref, type UnwrapRef } from 'vue'

export function useSpiritSelect(spirits: Ref<Array<UnwrapRef<number>>>, aspectsSelected: Ref<Array<number>>) {
  const spiritSelect = ref<number | null>(null)

  function closeSpiritSelect() {
    spiritSelect.value = null
  }

  function toggleSpiritSelect(value: number) {
    spiritSelect.value = spiritSelect.value === value ? null : value
  }

  function selectSpirit(newSpirit: number) {
    spirits.value[spiritSelect.value as number] = newSpirit
    aspectsSelected.value[spiritSelect.value as number] = -1
    spiritSelect.value = null
  }

  return {
    toggleSpiritSelect,
    selectSpirit,
    closeSpiritSelect,

    spiritSelect: readonly(spiritSelect)
  }
}
