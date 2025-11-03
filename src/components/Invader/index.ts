import type { MapType } from './type';

export function convertInvaderCardCode(code: string): { type: MapType; isEscalation: boolean } | undefined {
  switch (code) {
    case 'j-1':
      return {
        type: 'jungle',
        isEscalation: false,
      }
    case 'j-2':
      return {
        type: 'jungle',
        isEscalation: true,
      }
    case 'w-1':
      return {
        type: 'wetland',
        isEscalation: false,
      }
    case 'w-2':
      return {
        type: 'wetland',
        isEscalation: true,
      }
    case 's-1':
      return {
        type: 'sand',
        isEscalation: false,
      }
    case 's-2':
      return {
        type: 'sand',
        isEscalation: true,
      }
    case 'm-1':
      return {
        type: 'mountain',
        isEscalation: false,
      }
    case 'm-2':
      return {
        type: 'mountain',
        isEscalation: true,
      }
    case 'sj-3':
      return {
        type: 'jungleSand',
        isEscalation: false,
      }
    case 'sm-3':
      return {
        type: 'sandMountain',
        isEscalation: true,
      }
    case 'jm-3':
      return {
        type: 'mountainJungle',
        isEscalation: false,
      }
    case 'sw-3':
      return {
        type: 'sandWetland',
        isEscalation: false,
      }
    case 'wj-3':
      return {
        type: 'jungleWetland',
        isEscalation: false,
      }
    case 'wm-3':
      return {
        type: 'mountainWetland',
        isEscalation: false,
      }
    case 'c-2':
      return {
        type: 'coastalLand',
        isEscalation: false,
      }
    default:
      return undefined;
  }
}
