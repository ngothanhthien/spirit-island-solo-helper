export interface Map {
  x: number;
  y: number;
  i: number;
  offsetY?: number;
  offsetX?: number;
}

export type MapType = 'wetland' | 'sand' | 'jungle' | 'sandWetland' | 'coastalLand' | 'mountain' | 'sandMountain' | 'mountainJungle' | 'jungleWetland' | 'jungleSand' | 'mountainWetland';
