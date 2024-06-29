import { computed, readonly, type Ref, ref, type UnwrapRef } from 'vue'
import type { Aspect, AspectOption } from '@/types'
import { SPIRIT } from '@/constant'
import { DEBUG } from '@/configs/general'

export function useAspectSelect(spirits: Ref<Array<UnwrapRef<number>>>, aspectsSelected: Ref<Array<number>>) {
  const currentAspectList = ref<Aspect[]>([])
  const currentAspectSpiritIndex = ref<number>(-1)

  const currentAspect = computed(() => {
    return aspectsSelected.value[currentAspectSpiritIndex.value] || 0
  })
  const aspectsOption = computed(() => {
    const options: Array<AspectOption[] | null> = []
    spirits.value.forEach((index) => {
      const spirit = SPIRIT[index]
      if (!spirit.aspects) {
        options.push(null)
        return
      }
      const option = spirit.aspects.map((aspect, i) => {
        return {
          label: aspect.title,
          value: i
        }
      })
      options.push(option)
    })
    return options
  })

  function showSelectAspect(index: number) {
    if (DEBUG) {
      console.log('showSelectAspect', index)
    }
    const spirit = SPIRIT[spirits.value[index]]
    if (!spirit.aspects) {
      return
    }
    currentAspectList.value = spirit.aspects
    currentAspectSpiritIndex.value = index
  }

  function chooseAspect(index: number) {
    if (DEBUG) {
      console.log('chooseAspect', index)
    }
    if (!currentAspectList.value) {
      return
    }
    aspectsSelected.value[currentAspectSpiritIndex.value] = index
    currentAspectList.value = []
  }

  function closeAspect() {
    if (DEBUG) {
      console.log('closeAspect')
    }
    currentAspectList.value = []
  }

  return {
    currentAspectList: readonly(currentAspectList),
    currentAspect,
    aspectsOption,

    showSelectAspect,
    chooseAspect,
    closeAspect
  }
}
