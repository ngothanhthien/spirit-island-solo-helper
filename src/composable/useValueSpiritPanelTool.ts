import { reactive } from 'vue'

export function useValueSpiritPanelTool() {
  const value = reactive({
    BASE_ENERGY: 2,
    ENERGY: [1, 1, 2, 1, 1],
    BASE_CARD_PLAY: 1,
    CARD_PLAY: [0, 1, 0, 1, 1]
  })
  function currentEnergy(i: number) {
    let output = value.BASE_ENERGY
    for (let j = 0; j <= i; j++) {
      output += value.ENERGY[j]
    }

    return output
  }
  function currentCardPlay(i: number) {
    let output = value.BASE_CARD_PLAY
    for (let j = 0; j <= i; j++) {
      output += value.CARD_PLAY[j]
    }
    return output
  }

  return {
    value,
    currentEnergy,
    currentCardPlay
  }
}
