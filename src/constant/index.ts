import type { PowerCard, Adversary, BlightCard, SpiritType } from '@/types'
import { setupDarkFire, setupIntensify, setupNourishing, setupSpreadingHostility, setupSunshine, setupTangles, setupViolence, setupWarrior } from '@/utils/setup'
import { setupSparking } from '../utils/setup'
import { addFearToTop, moveBack2FearPerPlayer, putEventUnderTwo, returnTopFearToBox } from '@/utils/event'
import { setupDaysThatNeverWere } from '@/utils/spirit'

export const MINOR_CARDS: Array<PowerCard> = [
  {
    name: 'Savage Mawbeasts',
    cost: 0,
    speed: 'Slow',
    elements: ['Fire', 'Animal'],
    description:
      'If target land is Jungle / Wetland, 1 Fear and 1 Damage. -If you have- 3 Animal: 1 Damage.',
  },
  {
    name: 'Shadows of the Burning Forest',
    cost: 0,
    speed: 'Slow',
    elements: ['Moon', 'Fire', 'Plant'],
    description:
      '2 Fear. If target land is Mountain / Jungle, Push 1 Explorer and 1 Town.',
  },
  {
    name: 'Sap the Strength of Multitudes',
    cost: 0,
    speed: 'Fast',
    elements: ['Water', 'Animal'],
    description:
      "Defend 5. -If you have- 1 Air: Increase this Power's Range by 1",
  },
  {
    name: 'Drift down into Slumber',
    cost: 0,
    speed: 'Fast',
    elements: ['Air', 'Earth', 'Plant'],
    description:
      'Defend 1. If target land is Jungle / Sands, instead, Defend 4.',
  },
  {
    name: 'Land of Haunts and Embers',
    cost: 0,
    speed: 'Fast',
    elements: ['Moon', 'Fire', 'Air'],
    description:
      '2 Fear. Push up to 2 Explorer / Town. If target land has Blight, +2 Fear. Push up to 2 more Explorer / Town. Add 1 Blight.',
  },
  {
    name: 'Call to Isolation',
    cost: 0,
    speed: 'Fast',
    elements: ['Sun', 'Air', 'Animal'],
    description: 'Push 1 Explorer / Town per Dahan. -or- Push 1 Dahan.',
  },
  {
    name: 'Gift of Constancy',
    cost: 0,
    speed: 'Fast',
    elements: ['Sun', 'Earth'],
    description:
      'Target Spirit gains 2 Energy. At end of turn, target Spirit may Reclaim 1 Power Card instead of discarding it. If you target another Spirit, you may also Reclaim 1 Power Card instead of discarding it.',
  },
  {
    name: 'Enticing Splendor',
    cost: 0,
    speed: 'Fast',
    elements: ['Sun', 'Air', 'Plant'],
    description: 'Gather 1 Explorer / Town. -or- Gather up to 2 Dahan.',
  },
  {
    name: 'Gift of Living Energy',
    cost: 0,
    speed: 'Fast',
    elements: ['Sun', 'Fire', 'Plant'],
    description:
      'Target Spirit gains 1 Energy, +1 Energy if target Spirit is not yourself. If you have at least 2 SacredSite, target Spirit gains +1 Energy.',
  },
  {
    name: 'Gift of Power',
    cost: 0,
    speed: 'Slow',
    elements: ['Moon', 'Water', 'Earth', 'Plant'],
    description: 'Gain a Minor Power Card.',
  },
  {
    name: 'Gnawing Rootbiters',
    cost: 0,
    speed: 'Slow',
    elements: ['Earth', 'Animal'],
    description: 'Push up to 2 Town.',
  },
  {
    name: 'Lure of the Unknown',
    cost: 0,
    speed: 'Fast',
    elements: ['Moon', 'Fire', 'Air', 'Plant'],
    description: 'Gather 1 Explorer / Town',
  },
  {
    name: 'Rain of Blood',
    cost: 0,
    speed: 'Slow',
    elements: ['Air', 'Water', 'Animal'],
    description: '2 Fear. If target land has at least 2 Town / City, +1 Fear.',
  },
  {
    name: 'Reaching Grasp',
    cost: 0,
    speed: 'Fast',
    elements: ['Sun', 'Air', 'Water'],
    description: 'Target Spirit gets +2 Range with all their Powers.',
  },
  {
    name: "Gold's Allure",
    cost: 0,
    speed: 'Slow',
    elements: ['Fire', 'Earth', 'Animal'],
    description: 'Gather 1 Explorer. and 1 Town. Add 1 Strife.',
  },
  {
    name: 'Here there be Monsters',
    cost: 0,
    speed: 'Slow',
    elements: ['Moon', 'Air', 'Animal'],
    description:
      'You may Push 1 Explorer / Town / Dahan. 2 Fear. If target land has any Beasts, 1 Fear.',
  },
  {
    name: 'Portents of Disaster',
    cost: 0,
    speed: 'Fast',
    elements: ['Sun', 'Moon', 'Air'],
    description:
      '2 Fear. The next time an Invader is destroyed in target land this turn, 1 Fear.',
  },
  // {
  //   name: 'Growth through Sacrifice',
  //   cost: 0,
  //   speed: 'Fast',
  //   elements: ['Moon', 'Fire', 'Water', 'Plant'],
  //   description:
  //     'Destroy 1 of your Presence. Target Spirit chooses to either: Remove 1 Blight from one of their lands. -or- Add 1 Presence to one of their lands. -If you have- 2 Sun: They may do both, in the same land.',
  // },
  {
    name: 'Swarming Wasps',
    cost: 0,
    speed: 'Fast',
    elements: ['Fire', 'Air', 'Animal'],
    description:
      'Add 1 Beasts. -or- If target land has Beasts, Push up to 2 Explorer.',
  },
  {
    name: 'Animated Wrackroot',
    cost: 0,
    speed: 'Slow',
    elements: ['Moon', 'Fire', 'Plant'],
    description: '1 Fear. Destroy 1 Explorer. -or- Add 1 Wilds.',
  },
  {
    name: 'Promises of Protection',
    cost: 0,
    speed: 'Fast',
    elements: ['Sun', 'Earth', 'Animal'],
    description:
      'Gather up to 2 Dahan. Dahan have +2 Health while in target land.',
  },
  {
    name: 'Call to Ferocity',
    cost: 0,
    speed: 'Slow',
    elements: ['Sun', 'Fire', 'Earth'],
    description:
      'Gather up to 3 Dahan. -or- If target land has Dahan, 1 Fear and Push 1 Explorer and 1 Town.',
  },
  {
    name: 'Twilight Fog brings Madness',
    cost: 0,
    speed: 'Slow',
    elements: ['Sun', 'Moon', 'Air', 'Water'],
    description:
      'Add 1 Strife. Push 1 Dahan. Each remaining Dahan takes 1 Damage.',
  },
  {
    name: 'Hazards Spread Across The Island',
    cost: 0,
    speed: 'Fast',
    elements: ['Fire', 'Air', 'Earth', 'Plant'],
    description:
      'Choose a type of token from Badlands / Beasts / Disease / Strife / Wilds that exists in an adjacent land; choosing Disease costs 1 energy. Add 1 of that type of token to target land.',
  },
  {
    name: 'Carapaced Land',
    cost: 0,
    speed: 'Fast',
    elements: ['Earth', 'Plant', 'Animal'],
    description:
      'If targeting a land with Beasts, this Power has +1 Range. Defend 3. -If you have- 2 Earth: Defend +3.',
  },
  {
    name: 'Call To Guard',
    cost: 0,
    speed: 'Fast',
    elements: ['Sun', 'Air', 'Earth'],
    description:
      'Gather up to 1 Dahan. Then, if Dahan are present, either: Defend 1 per Dahan. -or- After Invaders are added or moved to target land, 1 Damage to each added or moved Invader.',
  },
  {
    name: "Gift of Nature's Connection",
    cost: 0,
    speed: 'Fast',
    elements: [],
    description:
      'Target Spirit gains either 2 Energy or 2 of a single Element (their choice). If you target another Spirit, you gain an Element of your choice.',
  },
  {
    name: 'Mesmerized Tranquility',
    cost: 0,
    speed: 'Fast',
    elements: ['Water', 'Earth', 'Animal'],
    description: 'Isolate target land. Each Invader does -1 Damage.',
  },
  {
    name: 'Territorial Strife',
    cost: 0,
    speed: 'Slow',
    elements: ['Sun', 'Fire', 'Animal'],
    description: '3 Damage to Explorer / Town. -or- Add 1 Strife.',
  },
  {
    name: 'Sear Anger Into The Wild Lands',
    cost: 0,
    speed: 'Slow',
    elements: ['Sun', 'Fire', 'Plant'],
    description:
      'Add 1 Badlands. -or- If Wilds and Invaders are present, 1 Fear and 1 Damage.',
  },
  {
    name: 'Strong And Constant Currents',
    cost: 0,
    speed: 'Fast',
    elements: ['Sun', 'Water', 'Earth'],
    description:
      'Push 1 Explorer / Town to an adjacent Coastal land. -or- Move up to 2 Dahan between target land and one other Coastal land. -If you have- 2 Water: You may do both.',
  },
  {
    name: 'Sucking Ooze',
    cost: 0,
    speed: 'Fast',
    elements: ['Moon', 'Water', 'Earth'],
    description: '2 Fear if Invaders are present. Isolate target land.',
  },
  {
    name: 'Terror Turns To Madness',
    cost: 0,
    speed: 'Slow',
    elements: ['Moon', 'Air', 'Water'],
    description:
      'If the Terror Level is... Terror Level 1: 3 Fear. Terror Level 2: 2 Fear or add 1 Strife. Terror Level 3: Add 1 Strife.',
  },
  {
    name: 'Treacherous Waterways',
    cost: 0,
    speed: 'Fast',
    elements: ['Fire', 'Water', 'Earth'],
    description: 'Add 1 Wilds. -or- Push 1 Explorer.',
  },
  {
    name: 'Flow Downriver, Blow Downwind',
    cost: 0,
    speed: 'Slow',
    elements: ['Air', 'Water', 'Plant'],
    description: 'Push up to 1 Blight / Explorer / Town.',
  },
  {
    name: 'Weep For What Is Lost',
    cost: 0,
    speed: 'Slow',
    elements: ['Fire', 'Water', 'Animal'],
    description:
      '1 Fear per type of Invader present. Push up to 1 Explorer / Town per Blight.',
  },
  {
    name: 'Voracious Growth',
    cost: 1,
    speed: 'Slow',
    elements: ['Water', 'Plant'],
    description: '2 Damage. -or- Remove 1 Blight.',
  },
  {
    name: 'Rouse the Trees and Stones',
    cost: 1,
    speed: 'Slow',
    elements: ['Fire', 'Earth', 'Plant'],
    description: '2 Damage. Push 1 Explorer.',
  },
  {
    name: 'Encompassing Ward',
    cost: 1,
    speed: 'Fast',
    elements: ['Sun', 'Water', 'Earth'],
    description: 'Defend 2 in every land where target Spirit has Presence.',
  },
  {
    name: 'Song of Sanctity',
    cost: 1,
    speed: 'Slow',
    elements: ['Sun', 'Water', 'Plant'],
    description:
      'If target land has 1 Explorer, Push all Explorer. Otherwise, remove 1 Blight.',
  },
  {
    name: 'Uncanny Melting',
    cost: 1,
    speed: 'Slow',
    elements: ['Sun', 'Moon', 'Water'],
    description:
      'If Invaders are present, 1 Fear. If target land is Sands / Wetland, remove 1 Blight',
  },
  {
    name: 'Steam Vents',
    cost: 1,
    speed: 'Fast',
    elements: ['Fire', 'Air', 'Water', 'Earth'],
    description:
      'Destroy 1 Explorer. -If you have- 3 Earth: You may instead destroy 1 Town.',
  },
  {
    name: "Veil the Night's Hunt",
    cost: 1,
    speed: 'Fast',
    elements: ['Moon', 'Air', 'Animal'],
    description:
      'Each Dahan deals 1 Damage to a different Invader. -or- Push up to 3 Dahan.',
  },
  {
    name: 'Elemental Boon',
    cost: 1,
    speed: 'Fast',
    elements: [],
    description:
      'Target Spirit gains 3 different Elements of their choice. If you target another Spirit, you also gain the chosen Elements.',
  },
  {
    name: 'Devouring Ants',
    cost: 1,
    speed: 'Slow',
    elements: ['Sun', 'Earth', 'Animal'],
    description:
      '1 Fear. 1 Damage. Destroy 1 Dahan. If target land is Jungle / Sands, +1 Damage.',
  },
  {
    name: 'Dark and Tangled Woods',
    cost: 1,
    speed: 'Fast',
    elements: ['Moon', 'Earth', 'Plant'],
    description: '2 Fear. If target land is Mountain / Jungle, Defend 3.',
  },
  {
    name: "Nature's Resilience",
    cost: 1,
    speed: 'Fast',
    elements: ['Earth', 'Plant', 'Animal'],
    description:
      'Defend 6. -If you have- 2 Water: You may instead remove 1 Blight.',
  },
  {
    name: 'Visions of Fiery Doom',
    cost: 1,
    speed: 'Fast',
    elements: ['Moon', 'Fire'],
    description:
      '1 Fear. Push 1 Explorer / Town. -If you have- 2 Fire: +1 Fear.',
  },
  {
    name: 'Pull Beneath the Hungry Earth',
    cost: 1,
    speed: 'Slow',
    elements: ['Moon', 'Water', 'Earth'],
    description:
      'If target land has your Presence, 1 Fear and 1 Damage. If target land is Sands / Wetland, 1 Damage.',
  },
  {
    name: 'Call of the Dahan Ways',
    cost: 1,
    speed: 'Slow',
    elements: ['Moon', 'Water', 'Animal'],
    description:
      'Replace 1 Explorer with 1 Dahan. -If you have- 2 Moon: You may instead replace 1 Town with 1 Dahan.',
  },
  {
    name: 'Call to Bloodshed',
    cost: 1,
    speed: 'Slow',
    elements: ['Sun', 'Fire', 'Animal'],
    description: '1 Damage per Dahan. -or- Gather up to 3 Dahan.',
  },
  {
    name: 'Call to Migrate',
    cost: 1,
    speed: 'Slow',
    elements: ['Fire', 'Air', 'Animal'],
    description: 'Gather up to 3 Dahan. Push up to 3 Dahan.',
  },
  {
    name: 'Call to Tend',
    cost: 1,
    speed: 'Slow',
    elements: ['Water', 'Plant', 'Animal'],
    description: 'Remove 1 Blight. -or- Push up to 3 Dahan.',
  },
  {
    name: "Quicken the Earth's Struggles",
    cost: 1,
    speed: 'Fast',
    elements: ['Moon', 'Fire', 'Earth', 'Animal'],
    description: '1 Damage to each Town / City. -or- Defend 10.',
  },
  {
    name: 'Delusions of Danger',
    cost: 1,
    speed: 'Fast',
    elements: ['Sun', 'Moon', 'Air'],
    description: 'Push 1 Explorer. -or- 2 Fear.',
  },
  {
    name: 'Drought',
    cost: 1,
    speed: 'Slow',
    elements: ['Sun', 'Fire', 'Earth'],
    description:
      'Destroy 3 Town. 1 Damage to each Town / City. Add 1 Blight. -If you have- 3 Sun: Destroy 1 City.',
  },
  {
    name: 'Entrancing Apparitions',
    cost: 1,
    speed: 'Fast',
    elements: ['Moon', 'Air', 'Water'],
    description:
      'Defend 2. If no Invaders are present, gather up to 2 Explorer.',
  },
  {
    name: 'Purifying Flame',
    cost: 1,
    speed: 'Slow',
    elements: ['Sun', 'Fire', 'Air', 'Plant'],
    description:
      '1 Damage per Blight. If target land is Mountain / Sands, you may instead remove 1 Blight.',
  },
  {
    name: 'Inflame the Fires of Life',
    cost: 1,
    speed: 'Slow',
    elements: ['Moon', 'Fire', 'Plant', 'Animal'],
    description:
      "Add 1 Disease. -or'- 1 Fear. Add 1 Strife. -If you have- 3 Animal: You may do both.",
  },
  {
    name: 'Fire in the Sky',
    cost: 1,
    speed: 'Fast',
    elements: ['Sun', 'Fire', 'Air'],
    description: '2 Fear. Add 1 Strife',
  },
  {
    name: 'Fleshrot Fever',
    cost: 1,
    speed: 'Slow',
    elements: ['Fire', 'Air', 'Water', 'Animal'],
    description: '1 Fear. Add 1 Disease.',
  },
  {
    name: 'Guardian Serpents',
    cost: 1,
    speed: 'Fast',
    elements: ['Sun', 'Moon', 'Earth', 'Animal'],
    description:
      "Add 1 Beasts in one of target Spirit's lands. If target Spirit has a SacredSite in that land: Defend 4 there.",
  },
  {
    name: 'Infested Aquifers',
    cost: 1,
    speed: 'Slow',
    elements: ['Moon', 'Water', 'Earth', 'Animal'],
    description:
      'If target land has any Disease, 1 Damage to each Invader. -or- If target land is Mountain / Wetland, 1 Fear and add 1 Disease.',
  },
  {
    name: 'Poisoned Dew',
    cost: 1,
    speed: 'Slow',
    elements: ['Fire', 'Water', 'Plant'],
    description:
      'Destroy 1 Explorer. If target land is Jungle / Wetland, destroy all Explorer.',
  },
  {
    name: 'Prowling Panthers',
    cost: 1,
    speed: 'Slow',
    elements: ['Moon', 'Fire', 'Animal'],
    description:
      '1 Fear. Add 1 Beasts. -or- If target land has Beasts, destroy 1 Explorer / Town.',
  },
  {
    name: 'Renewing Rain',
    cost: 1,
    speed: 'Slow',
    elements: ['Water', 'Earth', 'Plant'],
    description:
      'If target land is Jungle / Sands, remove 1 Blight. -If you have- 3 Plant: Add 1 Wilds.',
  },
  {
    name: "Rites of the Land's Rejection",
    cost: 1,
    speed: 'Fast',
    elements: ['Moon', 'Fire', 'Earth'],
    description:
      'Invaders do not Build in target land this turn. 1 Fear per Town / City or 1 Fear per Dahan, whichever is less. -or- Push up to 3 Dahan.',
  },
  {
    name: 'Pact of the Joined Hunt',
    cost: 1,
    speed: 'Slow',
    elements: ['Sun', 'Plant', 'Animal'],
    description:
      'Target Spirit Gathers 1 Dahan into one of their lands. 1 Damage in that land per Dahan present.',
  },
  {
    name: 'Razor-Sharp Undergrowth',
    cost: 1,
    speed: 'Fast',
    elements: ['Moon', 'Plant'],
    description: 'Destroy 1 Explorer and 1 Dahan. Add 1 Wilds. Defend 2.',
  },
  {
    name: 'Scour the Land',
    cost: 1,
    speed: 'Slow',
    elements: ['Air', 'Earth'],
    description:
      'Destroy 3 Town and all Explorer. Add 1 Blight. -If you have- 3 Air: This power may be Fast.',
  },
  {
    name: 'Sky Stretches to Shore',
    cost: 1,
    speed: 'Fast',
    elements: ['Sun', 'Air', 'Water', 'Earth'],
    description:
      'This turn, target Spirit may use 1 Slow Power as if it were Fast, or vice versa. Target Spirit gains +3 Range for targeting Coastal lands only.',
  },
  {
    name: 'Absorb Corruption',
    cost: 1,
    speed: 'Slow',
    elements: ['Sun', 'Earth', 'Plant'],
    description:
      'Gather 1 Blight. -or- Pay 1 Energy to remove 1 Blight. -If you have- 2 Plant: You may do both.',
  },
  {
    name: 'Call to Trade',
    cost: 1,
    speed: 'Fast',
    elements: ['Air', 'Water', 'Earth', 'Plant'],
    description:
      'You may Gather 1 Dahan. If the Terror Level is 2 or lower, Gather 1 Town and the first Ravage in target land this turn becomes a Build there instead.',
  },
  {
    name: 'Confounding Mists',
    cost: 1,
    speed: 'Fast',
    elements: ['Air', 'Water'],
    description:
      'Defend 4. -or- Each Invader added to target land this turn may be immediately Pushed to any adjacent land.',
  },
  {
    name: 'Cycles of Time and Tide',
    cost: 1,
    speed: 'Fast',
    elements: ['Sun', 'Moon', 'Water'],
    description:
      'If there are Dahan, add 1 Dahan. If there are no Dahan, remove 1 Blight.',
  },
  {
    name: 'Disorienting Landscape',
    cost: 1,
    speed: 'Fast',
    elements: ['Moon', 'Air', 'Plant'],
    description:
      'Push 1 Explorer. If target land is Mountain / Jungle, add 1 Wilds.',
  },
  {
    name: 'Elusive Ambushes',
    cost: 1,
    speed: 'Fast',
    elements: ['Sun', 'Fire', 'Water'],
    description: '1 Damage. -or- Defend 4.',
  },
  {
    name: 'Tormenting Rotflies',
    cost: 1,
    speed: 'Slow',
    elements: ['Air', 'Plant', 'Animal'],
    description:
      'Add 1 Disease. -or- If target land has Invaders, 2 Fear. If Disease is present, +1 Fear. If Blight is present, +1 Fear.',
  },
  {
    name: 'Teeming Rivers',
    cost: 1,
    speed: 'Slow',
    elements: ['Sun', 'Water', 'Plant', 'Animal'],
    description:
      'If target land has no Blight, add 1 Beasts. If target land has exactly 1 Blight, remove it.',
  },
  {
    name: 'Spur on with Words of Fire',
    cost: 1,
    speed: 'Fast',
    elements: ['Sun', 'Fire', 'Air'],
    description:
      'If you target a Spirit other than yourself, they gain +1 Energy. Target Spirit may immediately play another Power Card by paying its cost. (If it is Slow, it does not resolve until later.)',
  },
  {
    name: 'Bats Scout For Raids By Darkness',
    cost: 1,
    speed: 'Slow',
    elements: ['Moon', 'Air', 'Animal'],
    description:
      'For each Dahan, 1 Damage to Town / City. -or- 1 Fear. Gather up to 2 Dahan.',
  },
  {
    name: 'Birds Cry Warning',
    cost: 1,
    speed: 'Fast',
    elements: ['Sun', 'Air', 'Animal'],
    description:
      'The next time Dahan would be Destroyed in target land, Destroy 2 fewer Dahan. -or- Push up to 3 Dahan.',
  },
  {
    name: 'Blood Draws Predators',
    cost: 1,
    speed: 'Fast',
    elements: ['Sun', 'Fire', 'Water', 'Animal'],
    description:
      'After the next time Invaders are Destroyed in target land: Add 1 Beasts, then 1 Damage per Beasts (max. 3 Damage).',
  },
  {
    name: 'Desiccating Winds',
    cost: 1,
    speed: 'Slow',
    elements: ['Fire', 'Air', 'Earth'],
    description: 'If target land has Badlands, 1 Damage. Add 1 Badlands.',
  },
  {
    name: 'Dry Wood Explodes In Smoldering Splinters',
    cost: 1,
    speed: 'Slow',
    elements: ['Fire', 'Air', 'Plant'],
    description:
      'You may spend 1 Energy to make this Power Fast. 2 Fear. 1 Damage.',
  },
  {
    name: 'Entrap The Forces Of Corruption',
    cost: 1,
    speed: 'Fast',
    elements: ['Earth', 'Plant', 'Animal'],
    description:
      "Gather up to 1 Blight. Isolate target land. When Blight is added to target land, it doesn't cascade.",
  },
  {
    name: 'Domesticated Animals Go Berserk',
    cost: 1,
    speed: 'Fast',
    elements: ['Moon', 'Fire', 'Animal'],
    description: '1 Fear. Defend 5. -If you have- 3 Moon: Add 1 Beasts.',
  },
  {
    name: 'Dire Metamorphosis',
    cost: 1,
    speed: 'Slow',
    elements: ['Moon', 'Air', 'Earth', 'Animal'],
    description:
      '1 Fear. 1 Damage. 1 Damage to Dahan. Add 1 Badlands, 1 Beasts, 1 Disease, 1 Strife, 1 Wilds, and 1 Blight.',
  },
  {
    name: 'Skies Herald The Season Of Return',
    cost: 1,
    speed: 'Fast',
    elements: ['Sun', 'Moon', 'Plant', 'Animal'],
    description:
      'A Spirit with Presence on target board may add 1 of their Destroyed Presence. Gather up to 2 Dahan. Push 1 Blight.',
  },
  {
    name: 'Gift of Twinned Days',
    cost: 1,
    speed: 'Fast',
    elements: ['Sun', 'Moon'],
    description:
      "Once this turn, target Spirit may Repeat the lowest-cost Power Card they have in play by paying it's cost again. You may do likewise.",
  },
  {
    name: 'Haunted By Primal Memories',
    cost: 1,
    speed: 'Fast',
    elements: ['Moon', 'Air', 'Earth'],
    description: '1 Fear. Defend 3. If Beasts are present, +2 Fear.',
  },
  {
    name: 'Like Calls to Like',
    cost: 1,
    speed: 'Slow',
    elements: ['Sun', 'Water', 'Plant'],
    description:
      'If target land has Explorer, Gather up to 1 Explorer. Do likewise for Town, Dahan, Blight, and Beasts.',
  },
  {
    name: 'Unquenchable Flames',
    cost: 1,
    speed: 'Slow',
    elements: ['Moon', 'Fire', 'Earth'],
    description:
      '1 Fear. 1 Damage to Town / City. Invaders do not heal Damage at end of turn. -If you have- 2 Fire: Add 1 Badlands.',
  },
  {
    name: 'Renewing Boon',
    cost: 1,
    speed: 'Slow',
    elements: ['Sun', 'Earth', 'Plant'],
    description:
      'Choose a land where you and target Spirit both have Presence. In that land: Remove 1 Blight, and target Spirit may add 1 of their Destroyed Presence.',
  },
  {
    name: 'Scream Disease Into The Wind',
    cost: 1,
    speed: 'Fast',
    elements: ['Air', 'Water', 'Animal'],
    description:
      'Target Spirit gets +1 Range with all their Powers. Once this turn, after target Spirit uses a Power targeting a land, they may add 1 Disease to that land. (Hand them a Disease token as a reminder.)',
  },
  {
    name: 'Set Them On An Ever-Twisting Trail',
    cost: 1,
    speed: 'Fast',
    elements: ['Air', 'Plant', 'Animal'],
    description: 'Gather or Push 1 Explorer. Isolate target land.',
  },
  {
    name: "Sunset's Fire Flows Across The Land",
    cost: 1,
    speed: 'Slow',
    elements: ['Sun', 'Moon', 'Fire', 'Water'],
    description:
      '1 Fear. 1 Damage. You may pay 1 Energy to deal 1 Damage in an adjacent land.',
  },
  {
    name: 'The Shore Seethes With Hatred',
    cost: 1,
    speed: 'Slow',
    elements: ['Fire', 'Water', 'Earth', 'Plant'],
    description: '1  Fear. Add 1 Badlands and 1 Wilds.',
  },
  {
    name: 'Thriving Chokefungus',
    cost: 1,
    speed: 'Slow',
    elements: ['Moon', 'Water', 'Plant'],
    description: 'Add 1 Disease and 1 Badlands.',
  },
  {
    name: 'Favor Of The Sun And Star-Lit Dark',
    cost: 1,
    speed: 'Fast',
    elements: ['Sun', 'Moon', 'Plant'],
    description: 'Defend 4. Push up to 1 Blight. -If you have- 2 Sun: 1 Fear',
  },
  {
    name: 'Roiling Bog And Snagging Thorn',
    cost: 0,
    speed: 'Fast',
    elements: ['Moon', 'Fire', 'Water', 'Plant'],
    description: '',
  },
]

export const MAJOR_CARDS: Array<PowerCard> = [
  {
    name: 'The Trees and Stones Speak of War',
    cost: 2,
    speed: 'Fast',
    elements: ['Sun', 'Earth', 'Plant'],
    description:
      "For each Dahan in target land, 1 Damage and Defend 2. -If you have- 2 Sun, 2 Earth, 2 Plant: You may Push up to 2 Dahan, moving each's Defend with them.",
  },
  {
    name: 'Entwined Power',
    cost: 2,
    speed: 'Fast',
    elements: ['Moon', 'Water', 'Plant'],
    description:
      "You and target Spirit may use each other's Presence to target Powers. Target Spirit gains a Power Card. You gain one of the power Cards they did not keep. -If you have- 2 Water, 4 Plant: You and target Spirit each gain 3 Energy and may gift the other 1 Power from hand.",
  },
  {
    name: 'Flow like Water, Reach like Air',
    cost: 2,
    speed: 'Fast',
    elements: ['Air', 'Water'],
    description:
      'Target Spirit gets +2 Range with all Powers. Target Spirit may Push 1 of their Presence to an adjacent land, bringing up to 2 Explorer, 2 Town and 2 Dahan along with it. -If you have- 2 Air, 2 Water: The moved Presence may also bring along up to 2 City and up to 2 Blight.',
  },
  {
    name: 'Savage Transformation',
    cost: 2,
    speed: 'Slow',
    elements: ['Moon', 'Animal'],
    description:
      '2 Fear. Replace 1 Explorer with 1 Beasts. -If you have- 2 Moon, 3 Animal: Replace 1 additional Explorer with 1 Beasts in either target or adjacent land.',
  },
  {
    name: 'Tigers Hunting',
    cost: 2,
    speed: 'Fast',
    elements: ['Sun', 'Moon', 'Animal'],
    description:
      '2 Fear. Add 1 Beasts. Gather up to 1 Beasts. 1 Damage per Beasts. Push up to 2 Beasts. -If you have- 2 Sun, 2 Moon, 3 Animal: 1 Damage in an adjacent land without Blight, and +1 Damage per Beasts there.',
  },
  {
    name: "Unleash a Torrent of the Self's Own Essence",
    cost: 2,
    speed: 'Fast',
    elements: ['Sun', 'Moon', 'Fire', 'Water'],
    description:
      'Gain 4 energy. You may forget a power card to gain 4 more energy. -or- Pay X energy (min. 1) to deal X damage in a land at 0 Range.  -If you have- 2 Sun, 3 Fire: You may do both.',
  },
  {
    name: 'Bargains of Power and Protection',
    cost: 2,
    speed: 'Fast',
    elements: ['Sun', 'Water', 'Earth', 'Animal'],
    description:
      'Remove 1 of your Presence on the island from the game, setting it on the Reminder Card. From now on: each Dahan within 1 Range of your Presence provides Defend 1 in its land, and you gain 1 less Energy each turn. (This effect stacks if used multiple times) -If you have- 3 Sun, 2 Water, 2 Earth: The Presence instead comes from your Presence track.',
  },
  {
    name: 'Poisoned Land',
    cost: 3,
    speed: 'Slow',
    elements: ['Earth', 'Plant', 'Animal'],
    description:
      '1 Fear. 7 Damage. Add 1 Blight and destroy all Dahan. -If you have- 3 Earth, 2 Plant, 2 Animal: For each Blight then present, +1 Fear and +4 Damage.',
  },
  {
    name: 'Powerstorm',
    cost: 3,
    speed: 'Fast',
    elements: ['Sun', 'Fire', 'Air'],
    description:
      'Target Spirit gains 3 Energy. Once this turn, target may Repeat a Power Card by paying its cost again. -If you have- 2 Sun, 2 Fire, 3 Air: Target may Repeat up to 2 more Power Cards by paying their costs.',
  },
  {
    name: 'The Jungle Hungers',
    cost: 3,
    speed: 'Slow',
    elements: ['Moon', 'Plant'],
    description:
      'Destroy all Explorer and all Town. Destroy all Dahan. -If you have- 2 Moon, 3 Plant: Destroy 1 City. Do not destroy any Dahan.',
  },
  {
    name: 'Vigor of the Breaking Dawn',
    cost: 3,
    speed: 'Fast',
    elements: ['Sun', 'Animal'],
    description:
      '2 Damage per Dahan in target land. -If you have- 3 Sun, 2 Animal: You may Push up to 2 Dahan. In lands you Pushed Dahan to, 2 Damage per Dahan.',
  },
  {
    name: 'Vengeance of the Dead',
    cost: 3,
    speed: 'Fast',
    elements: ['Moon', 'Fire', 'Animal'],
    description:
      '3 Fear. After each effect that destroys Town / City / Dahan in target land, 1 Damage per Town / City / Dahan destroyed. -If you have- 3 Animal: Damage from this Power may be dealt into adjacent lands.',
  },
  {
    name: 'Wrap in Wings of Sunlight',
    cost: 3,
    speed: 'Fast',
    elements: ['Sun', 'Air', 'Animal'],
    description:
      'Move up to 5 Dahan from target land to any land. Defend 5 in that land. -If you have- 2 Sun, 2 Air, 2 Animal: First, Gather up to 3 Dahan.',
  },
  {
    name: 'Winds of Rust and Atrophy',
    cost: 3,
    speed: 'Fast',
    elements: ['Air', 'Water', 'Animal'],
    description:
      '1 Fear and Defend 6. Replace 1 City with 1 Town or 1 Town with 1 Explorer. -If you have- 3 Air, 3 Water, 2 Animal: Repeat this Power.',
  },
  {
    name: 'Infinite Vitality',
    cost: 3,
    speed: 'Fast',
    elements: ['Earth', 'Plant', 'Animal'],
    description:
      'Dahan have +4 Health while in target land. Whenever Blight would be added to target land, instead leave it on the card. -If you have- 4 Earth: Dahan ignore Damage and Destruction effects. Remove 1 Blight from target or adjacent land.',
  },
  {
    name: 'Pent-Up Calamity',
    cost: 3,
    speed: 'Fast',
    elements: ['Moon', 'Fire', 'Earth', 'Plant', 'Animal'],
    description:
      'Add 1 Disease and 1 Strife. -or- Remove any number of Beasts / Disease / Strife / Wilds. For each token removed, 1 Fear and 3 Damage. -If you have- 2 Moon, 3 Fire: If you have removed tokens, return up to 2 of them. Otherwise, add 2 Strife.',
  },
  {
    name: 'Pyroclastic Flow',
    cost: 3,
    speed: 'Fast',
    elements: ['Fire', 'Air', 'Earth'],
    description:
      '2 Damage. Destroy all Explorer. If target land is Jungle / Wetland, add 1 Blight. -If you have- 2 Fire, 3 Air, 2 Earth: +4 Damage. Add 1 Wilds.',
  },
  {
    name: 'Smothering Infestation',
    cost: 3,
    speed: 'Slow',
    elements: ['Water', 'Plant'],
    description:
      'Add 1 Disease. If target land is Jungle / Wetland, 2 Fear and 3 Damage. -If you have- 2 Water, 2 Plant: 1 Damage to each Invader.',
  },
  {
    name: 'Angry Bears',
    cost: 3,
    speed: 'Slow',
    elements: ['Sun', 'Fire', 'Animal'],
    description:
      '2 Fear. 2 Damage. If no Beasts are present, add 1 Beasts. Otherwise, +2 Damage, and Push up to 1 Beasts.  -If you have- 2 Fire, 3 Animal: 1 Fear and destroy 1 Explorer / Town in an adjacent land with Beasts.',
  },
  {
    name: 'Vanish Softly Away, Forgotten by All',
    cost: 3,
    speed: 'Slow',
    elements: ['Moon', 'Air'],
    description:
      'Remove 1 Invader and 1 Explorer / Town. -or- Remove all Damaged Invaders. Adversary or Scenario rules that prevent or alter Removal do not affect this Power.  -If you have- 3 Moon, 3 Air: In any 2 lands with 4 or more Invaders: Remove 1 Invader.',
  },
  {
    name: 'Settle Into Hunting-Grounds',
    cost: 3,
    speed: 'Fast',
    elements: ['Moon', 'Fire', 'Plant', 'Animal'],
    description:
      'Your Presence may count as Badlands and Beasts. (Decide per Presence, per action.) Your Presence cannot move. -If you have- 2 Plant, 3 Animal: 2 Fear and 2 Damage in one of your lands.',
  },
  {
    name: 'Voice of Command',
    cost: 3,
    speed: 'Fast',
    elements: ['Sun', 'Air'],
    description:
      '1 Damage per Dahan / Explorer, to Town / City only. Defend 2. During Ravage actions, Explorer fight alongside Dahan. (Deal / take damage at the same time, and to / from the same sources.) -If you have- 3 Sun, 2 Air: First, Gather up to 2 Explorer / Town / Dahan',
  },
  {
    name: 'Storm-Swath',
    cost: 3,
    speed: 'Slow',
    elements: ['Fire', 'Air', 'Water'],
    description:
      '2 Fear. In both origin land and target land: 1 Damage to each Invader. -If you have- 2 Fire, 3 Air, 2 Water: +1 Fear. This Power has +1 Range. In a land adjacent to both origin and target, 1 Damage to each Invader. In lands where you did Damage, destroy 1 town.',
  },
  {
    name: 'Sleep and Never Waken',
    cost: 3,
    speed: 'Fast',
    elements: ['Moon', 'Air', 'Earth', 'Animal'],
    description:
      'Invaders skip all Actions in target land. 1 Fear per 2 Explorer this Power removes. Remove up to 2 Explorer. -If you have- 3 Moon, 2 Air, 2 Animal: Remove up to 6 Explorer from among your lands.',
  },
  {
    name: 'Trees Radiate Celestial Brilliance',
    cost: 3,
    speed: 'Fast',
    elements: ['Sun', 'Moon', 'Plant'],
    description:
      '3 Fear. Defend 6. Invaders skip the next build. (In target land this turn.) -If you have- 3 Sun, 2 Moon, 2 Plant: 1 Damage per Sun you have.',
  },
  {
    name: 'Thickets Erupt with Every Touch of Breeze',
    cost: 3,
    speed: 'Fast',
    elements: ['Air', 'Plant'],
    description:
      '2 Damage. Then either: Add 3 Wilds. -or- Remove 1 Blight. -If you have- 3 Plant: 1 Fear. +2 Damage.',
  },
  {
    name: 'Accelerated Rot',
    cost: 4,
    speed: 'Slow',
    elements: ['Sun', 'Water', 'Plant'],
    description:
      '2 Fear. 4 Damage. -If you have- 3 Sun, 2 Water, 3 Plant: +5 Damage. Remove 1 Blight.',
  },
  {
    name: 'Terrifying Nightmares',
    cost: 4,
    speed: 'Fast',
    elements: ['Moon', 'Air'],
    description:
      '2 Fear. Push up to 4 Explorer / Town. -If you have- 4 Moon: +4 Fear.',
  },
  {
    name: 'Paralyzing Fright',
    cost: 4,
    speed: 'Fast',
    elements: ['Air', 'Earth'],
    description:
      '4 Fear. Invaders skip all Actions in target land this turn. -If you have- 2 Air, 3 Earth: +4 Fear.',
  },
  {
    name: 'The Land Thrashes in Furious Pain',
    cost: 4,
    speed: 'Slow',
    elements: ['Moon', 'Fire', 'Earth'],
    description:
      '2 Damage per Blight in target land. +1 Damage per Blight in adjacent lands. -If you have- 3 Moon, 3 Earth: Repeat on an adjacent land.',
  },
  {
    name: 'Indomitable Claim',
    cost: 4,
    speed: 'Fast',
    elements: ['Sun', 'Earth'],
    description:
      'Add 1 Presence in target land even if you normally could not due to land type. Defend 20. -If you have- 2 Sun, 3 Earth: 3 Fear if Invaders are present. Invaders skip all Actions in target land this turn.',
  },
  {
    name: 'Mists of Oblivion',
    cost: 4,
    speed: 'Slow',
    elements: ['Moon', 'Air', 'Water'],
    description:
      '1 Fear per Town / City this Power destroys (to a maximum of 4). 1 Damage to each Invader. -If you have- 2 Moon, 3 Air, 2 Water: 3 Damage.',
  },
  {
    name: 'Dissolve the Bonds of Kinship',
    cost: 4,
    speed: 'Slow',
    elements: ['Fire', 'Water', 'Animal'],
    description:
      'Replace 1 City with 2 Explorer. Replace 1 Town with 1 Explorer. Replace 1 Dahan with 1 Explorer. Push all Explorer from target land to as many different lands as possible. -If you have- 2 Fire, 2 Water, 3 Animal: Before Pushing, Explorer and Town / City do Damage to each other.',
  },
  {
    name: 'Strangling Firevine',
    cost: 4,
    speed: 'Slow',
    elements: ['Fire', 'Plant'],
    description:
      'Destroy all Explorer. Add 1 Wilds. Add 1 Wilds in the originating Sands. 1 Damage per Wilds in / adjacent to target land. -If you have- 2 Fire, 3 Plant: +1 Damage per Wilds in / adjacent to target land.',
  },
  {
    name: 'Bloodwrack Plague',
    cost: 4,
    speed: 'Fast',
    elements: ['Water', 'Earth', 'Animal'],
    description:
      'Add 2 Disease. For each Disease in target land, Defend 1 in target and all adjacent lands. -If you have- 2 Earth, 4 Animal: 2 Fear. For each Disease in target land do 1 Damage in target or an adjacent land.',
  },
  {
    name: 'Death Falls Gently from Open Blossoms',
    cost: 4,
    speed: 'Slow',
    elements: ['Moon', 'Air', 'Plant'],
    description:
      '4 Damage. If any Invaders remain, add 1 Disease. -If you have- 3 Air, 3 Plant: 3 Fear. Add 1 Disease to 2 adjacent lands with Invaders.',
  },
  // {
  //   name: 'Grant Hatred a Ravenous Form',
  //   cost: 4,
  //   speed: 'Slow',
  //   elements: ['Moon', 'Fire'],
  //   description:
  //     'For each Strife / Blight in target land, 1 Fear and 2 Damage. If this destroys all invaders in target land, add 1 Beasts. -If you have- 4 Moon, 2 Fire: Add 1 Strife in up to 3 adjacent lands.',
  // },
  {
    name: 'Insatiable Hunger of the Swarm',
    cost: 4,
    speed: 'Fast',
    elements: ['Air', 'Plant', 'Animal'],
    description:
      'Add 1 Blight. Add 2 Beasts. Gather up to 2 Beasts. Each Beasts deal 1 Fear, 2 Damage to Invaders and 2 Damage to Dahan. Destroy 1 Beasts. -If you have- 2 Air, 4 Animal: Repeat this Power on an adjacent land.',
  },
  {
    name: 'Instruments of their own Ruin',
    cost: 4,
    speed: 'Fast',
    elements: ['Sun', 'Fire', 'Air', 'Animal'],
    description:
      'Add 1 Strife. Each Invader with Strife deals Damage to other Invaders in target land. -If you have- 4 Sun, 2 Fire, 2 Animal: Instead, if Invaders Ravage in target land, they damage Invaders in adjacent lands instead of Dahan and the land. Dahan in target land do not fight back.',
  },
  {
    name: 'Unrelenting Growth',
    cost: 4,
    speed: 'Slow',
    elements: ['Sun', 'Fire', 'Water', 'Plant'],
    description:
      'Target Spirit adds 2 Presence and 1 Wilds to a land at 1 Range. -If you have- 3 Sun, 3 Plant: In that land, add 1 additional Wilds and remove 1 Blight. Target Spirit gains a Power Card.',
  },
  {
    name: 'Sweep into the Sea',
    cost: 4,
    speed: 'Slow',
    elements: ['Sun', 'Air', 'Water'],
    description:
      'Push all Explorer and Town one land towards the nearest Ocean. -or- If target land is Coastal, destroy all Explorer and Town. -If you have- 3 Sun, 2 Water: Repeat on an adjacent land.',
  },
  {
    name: 'Unlock the Gates of Deepest Power',
    cost: 4,
    speed: 'Fast',
    elements: [
      'Sun',
      'Moon',
      'Fire',
      'Air',
      'Water',
      'Earth',
      'Plant',
      'Animal',
    ],
    description:
      'Target Spirit gains a Major Power by drawing 2 and keeping 1, without having to Forget another Power Card. -If you have- 2 Sun, 2 Moon, 2 Fire, 2 Air, 2 Water, 2 Earth, 2 Plant, 2 Animal: Target Spirit may now play the Major Power they keep by paying half its cost (round up) OR by Forgetting it at the end of turn. It gains all elemental thresholds.',
  },
  {
    name: 'Forests of Living Obsidian',
    cost: 4,
    speed: 'Slow',
    elements: ['Sun', 'Fire', 'Earth', 'Plant'],
    description:
      'Add 1 Badlands. Push all Dahan. 1 Damage to each Invader. If the origin land is your Sacred Site, +1 Damage to each Invader.  -If you have- 2 Sun, 3 Fire, 3 Earth: Repeat this Power.',
  },
  {
    name: 'Infestation of Venomous Spiders',
    cost: 4,
    speed: 'Fast',
    elements: ['Air', 'Earth', 'Plant', 'Animal'],
    description:
      'Add 1 Beasts. Gather up to 1 Beasts. For each Beasts, 1 Fear (max. 4) and Invaders skip one Action in target land. -If you have- 2 Air, 2 Earth, 3 Animal; After this Power causes Invaders to skip an Action, 4 Damage.',
  },
  {
    name: 'Walls of Rock and Thorn',
    cost: 4,
    speed: 'Fast',
    elements: ['Sun', 'Earth', 'Plant'],
    description:
      '2 Damage. Defend 8. Add 1 Wilds. Isolate target land. -If you have- 2 Earth, 2 Plant: +2 Damage. +2 Defend. Add 1 Badlands.',
  },
  {
    name: 'The Wounded Wild Turns on its Assailants',
    cost: 4,
    speed: 'Slow',
    elements: ['Fire', 'Plant', 'Animal'],
    description:
      'Add 2 Badlands. Gather up to 2 Beasts. 1 Damage per Blight / Beasts / Wilds. -If you have- 2 Fire, 3 Plant, 2 Animal: 2 Fear per Invader destroyed by the Power (max. 8 Fear).',
  },
  {
    name: 'Utter a Curse of Dread and Bone',
    cost: 4,
    speed: 'Slow',
    elements: ['Moon', 'Animal'],
    description:
      'For each Blight in / adjacent to target land, add 1 Badlands, 1 Disease, or 1 Strife. (Max. +3 of each.) Then: 2 Fear. 1 Damage. -If you have- 3 Moon, 2 Animal: For each type of token you added, add 1 more within 1 Range. 1 Damage in an adjacent land.',
  },
  {
    name: 'Weave Together the Fabric of Place',
    cost: 4,
    speed: 'Fast',
    elements: ['Sun', 'Moon', 'Air', 'Water', 'Earth'],
    description:
      'Target land and a land adjacent to it become a single land for this turn. (It has the terrain and land # of both lands. When this effect expires, divide pieces as you wish; all of them are considered moved.) -If you have- 4 Air: Isolate the joined land. If it has Invaders, 2 Fear, and remove up to 2 Invaders.',
  },
  {
    name: 'Melt Earth into Quicksand',
    cost: 4,
    speed: 'Fast',
    elements: ['Moon', 'Water', 'Earth'],
    description:
      '1 Fear. 2 Damage. Isolate target land. After Invaders / Dahan are Moved into target land, Destroy them.  -If you have- 2 Moon, 4 Water, 2 Earth: +4 Damage. Add 1 Badlands. Add 1 Wilds.',
  },
  {
    name: 'Cleansing Floods',
    cost: 5,
    speed: 'Slow',
    elements: ['Sun', 'Water'],
    description:
      '4 Damage. Remove 1 Blight. -If you have- 4 Water: +10 Damage.',
  },
  {
    name: 'Pillar of Living Flame',
    cost: 5,
    speed: 'Slow',
    elements: ['Fire'],
    description:
      '3 Fear. 5 Damage. If target land is Jungle / Wetland, add 1 Blight. -If you have- 4 Fire: +2 Fear and +5 Damage.',
  },
  {
    name: 'Blazing Renewal',
    cost: 5,
    speed: 'Fast',
    elements: ['Fire', 'Earth', 'Plant'],
    description:
      'Target Spirit adds 2 of their destroyed Presence into a single land, up to 2 Range from your Presence. If any Presence was added, 2 damage to each Town / City in that land. -If you have- 3 Fire, 3 Earth, 2 Plant: 4 Damage in that land.',
  },
  {
    name: 'Sea Monsters',
    cost: 5,
    speed: 'Slow',
    elements: ['Water', 'Animal'],
    description:
      'Add 1 Beasts. If Invaders are present, 2 Fear per Beasts (max. 8 Fear). 3 Damage per Beasts. 1 Damage per Blight. -If you have- 3 Water, 3 Animal: Repeat this power.',
  },
  {
    name: 'Twisted Flowers Murmur Ultimatums',
    cost: 5,
    speed: 'Slow',
    elements: ['Sun', 'Moon', 'Air', 'Earth', 'Plant'],
    description:
      '4 Fear. Add 1 Strife. If the Terror Level is 2 or higher, remove 2 Invaders. -If you have- 3 Moon, 2 Air, 3 Plant: +3 Fear, before the Terror Level check. 3 Damage.',
  },
  {
    name: "Focus the Land's Anguish",
    cost: 5,
    speed: 'Slow',
    elements: ['Sun'],
    description:
      'If this Power Destroys any Town / City, 5 Fear. Gather up to 5 Blight. 1 Damage per Blight.  -If you have- 3 Sun: +1 Damage per Blight.',
  },
  {
    name: 'Spill Bitterness into the Earth',
    cost: 5,
    speed: 'Fast',
    elements: ['Fire', 'Water', 'Earth'],
    description:
      '6 Damage. Add 2 Badlands / Strife and 1 Blight. In up to 3 adjacent lands with Blight, add 1 Badlands / Strife. -If you have- 3 Fire, 3 Water: In up to 3 adjacent lands, 1 Damage to each Invader.',
  },
  {
    name: 'Talons of Lightning',
    cost: 6,
    speed: 'Fast',
    elements: ['Fire', 'Air'],
    description:
      "3 Fear. 5 Damage. -If you have- 3 Fire, 3 Air: Destroy 1 Town in each adjacent land. Increase this power's Range to 3 Range.",
  },
  {
    name: 'Tsunami',
    cost: 6,
    speed: 'Slow',
    elements: ['Water', 'Earth'],
    description:
      '2 Fear. 8 Damage. Destroy 2 Dahan. -If you have- 3 Water, 2 Earth: In each otdher Coastal land on the same board: 1 Fear, 4 Damage, and Destroy 1 Dahan.',
  },
  {
    name: 'Manifest Incarnation',
    cost: 6,
    speed: 'Slow',
    elements: ['Sun', 'Moon', 'Earth', 'Animal'],
    description:
      '6 Fear. +1 Fear for each Town / City and for each of your Presence in target land. Remove 1 City, 1 Town and 1 Explorer. Then Invaders in target land Ravage. -If you have- 3 Sun, 3 Moon: +3 Fear. Invaders do -6 Damage on their Ravage.',
  },
  {
    name: 'Dream of the Untouched Land',
    cost: 6,
    speed: 'Fast',
    elements: ['Moon', 'Water', 'Earth', 'Plant', 'Animal'],
    description:
      'Remove up to 3 Blight and up to 3 Health worth of Invaders.  -If you have- 3 Moon, 2 Water, 3 Earth, 2 Plant: (Max. 1x/game) Add a random new Island Board next to target board. Ignore its Setup icons; add 2 Beasts, 2 Wilds, 2 Badlands and up to 2 Presence (from any Spirits) anywhere on it. From now on, Build cards and "Each board / Each land" Adversary Actions skip 1 Board.',
  },
  // {
  //   name: 'Transform to a Murderous Darkness',
  //   cost: 6,
  //   speed: 'Slow',
  //   elements: [
  //     'Moon',
  //     'Fire',
  //     'Air',
  //     'Water',
  //     'Plant',
  //   ],
  //   description: 'Target Spirit may choose one of their Sacred Sites. In that land: Replace all their Presence with Badlands; the replaced Presence leave the game. Push any number of those Badlands. 3 Fear. 3 Damage per Presence replaced. -If you have- 3 Moon, 2 Fire, 2 Air: 1 Damage in an adjacent land. 1 Damage in an adjacent land.',
  // },
  {
    name: 'Irresistible Call',
    cost: 6,
    speed: 'Fast',
    elements: ['Sun', 'Air', 'Plant'],
    description:
      'Gather 5 Town, 5 Dahan, 5 Beasts, and 15 Explorer. -If you have- 2 Sun, 3 Air, 2 Plant: Invaders skip all Actions in target land. Isolate target land.',
  },
  {
    name: 'Fire and Flood',
    cost: 7,
    speed: 'Slow',
    elements: ['Sun', 'Fire', 'Water'],
    description:
      '4 Damage in each target land. (Range must be measured from the same SacredSite.) -If you have- 3 Fire: +4 Damage in either target land. 3 Water: +4 Damage in either target land.',
  },
  {
    name: 'Volcanic Eruption',
    cost: 8,
    speed: 'Slow',
    elements: ['Fire', 'Earth'],
    description:
      '6 Fear. 20 Damage. Destroy all Dahan and Beasts. Add 1 Blight. -If you have- 4 Fire, 3 Earth: Destroy all Invaders. Add 1 Wilds. In each adjacent land: 10 Damage. Destroy all Dahan and Beasts. If there are no Blight, add 1 Blight.',
  },
  {
    name: 'Draw Towards a Consuming Void',
    cost: 8,
    speed: 'Slow',
    elements: [],
    description:
      'Gather 1 Explorer, Town, City, Dahan, Presence, and Beasts from each adjacent land. 4 Fear. 15 Damage. 5 Damage to Dahan. Destroy 1 Presence from each Spirit. Remove 2 Beasts. -If you have- If you have no other power cards in play: Any number of times: Forget a Minor Power, a Major Power, and a Unique Power to perform the above effects again.',
  },
  {
    name: 'Cast down into the Briny Deep',
    cost: 9,
    speed: 'Slow',
    elements: ['Sun', 'Moon', 'Water', 'Earth'],
    description:
      '6 Fear. Destroy all Invaders. -If you have- 2 Sun, 2 Moon, 4 Water, 4 Earth: Destroy the board containing target land and everything on that board. All destroyed Blight is removed from the game instead of being returned to the Blight Card.',
  },
  {
    name: 'Bargain Of Coursing Paths',
    cost: 2,
    speed: 'Fast',
    elements: ['Moon', 'Air', 'Water', 'Earth'],
    description: '',
  },
  {
    name: 'Flocking Red-Talons',
    cost: 3,
    speed: 'Fast',
    elements: ['Air', 'Water', 'Plant', 'Animal'],
    description: '',
  },
  {
    name: 'Rumbling Earthquakes',
    cost: 6,
    speed: 'Slow',
    elements: ['Fire', 'Earth'],
    description: '',
  },
  {
    name: 'Exaltation Of The Incandescent Sky',
    cost: 7,
    speed: 'Fast',
    elements: ['Sun', 'Fire', 'Air', 'Water'],
    description: '',
  },
  {
    name: 'Bombard With Boulders And Stinging Seeds',
    cost: 2,
    speed: 'Slow',
    elements: ['Air', 'Earth', 'Plant'],
    description: '',
  },
  {
    name: 'Fragments Of Yesteryear',
    cost: 7,
    speed: 'Slow',
    elements: ['Sun', 'Moon'],
    description: '',
  },
  {
    name: 'Inspire The Release Of Stolen Lands',
    cost: 4,
    speed: 'Slow',
    elements: ['Sun', 'Water', 'Plant', 'Animal'],
    description: '',
  },
  {
    name: 'Plague Ships Sail To Distant Ports',
    cost: 4,
    speed: 'Fast',
    elements: ['Fire', 'Air', 'Water', 'Animal'],
    description: '',
  },
  {
    name: 'Ravaged Undergrowth Slithers Back To Life',
    cost: 3,
    speed: 'Slow',
    elements: ['Water', 'Plant', 'Animal'],
    description: '',
  },
  {
    name: 'Solidify Echoes Of Majesty Past',
    cost: 4,
    speed: 'Fast',
    elements: ['Sun', 'Moon', 'Air', 'Earth'],
    description: '',
  },
  {
    name: 'Transformative Sacrifice',
    cost: 3,
    speed: 'Fast',
    elements: ['Moon', 'Fire', 'Water', 'Plant'],
    description: '',
  },
  {
    name: 'Unearth A Beast Of Wrathful Stone',
    cost: 5,
    speed: 'Fast',
    elements: ['Moon', 'Fire', 'Earth', 'Animal'],
    description: '',
  },
]
export const EVENT_CARDS: Array<{ name: string, action?: { title: string, fn: () => void }}> = [
  { name: 'bureaucrats_adjust_funding' },
  { name: 'cities_rise' },
  { name: 'civic_engagement' },
  { name: 'coastal_towns_multiply' },
  { name: 'cultural_assimilation' },
  { name: 'dahan_trade_with_the_invaders' },
  { name: 'distant_exploration' },
  { name: 'eager_explorers' },
  { name: 'fortuneseekers' },
  { name: 'gradual_corruption' },
  { name: 'harvest_bounty_harvest_dust' },
  { name: 'heavy_farming' },
  { name: 'interesting_discoveries' },
  { name: 'invaders_surge_inland' },
  { name: 'invested_aristocracy' },
  { name: 'investigation_of_dangers' },
  { name: 'lifes_balance_tilts' },
  { name: 'mapmakers_chart_the_wild' },
  { name: 'missionaries_arrive', action: { title: 'Put under top 2 cards', fn: putEventUnderTwo } },
  { name: 'new_species_spread', action: { title: 'Put under top 2 cards', fn: putEventUnderTwo } },
  { name: 'no_bravery_without_numbers' },
  { name: 'overconfidence', action: { title: 'Reduce fear', fn: moveBack2FearPerPlayer } },
  { name: 'population_rises' },
  { name: 'promising_farmland' },
  { name: 'provincial_seat' },
  { name: 'pull_together_in_adversity' },
  { name: 'putting_down_roots' },
  { name: 'relentless_optimism' },
  { name: 'remnants_of_a_spirits_heart' },
  { name: 'resourceful_populace' },
  { name: 'rising_interest_in_the_island', action: { title: 'Return top fear to box', fn: returnTopFearToBox } },
  { name: 'sacred_sites_under_threat' },
  { name: 'search_for_new_lands' },
  { name: 'seeking_the_interior' },
  { name: 'seek_new_farmland' },
  { name: 'smaller_ports_spring_up' },
  { name: 'sprawl_contained_by_the_wilds' },
  { name: 'strange_tales_attract_explorers' },
  { name: 'temporary_truce' },
  { name: 'the_frontier_calls' },
  { name: 'the_struggles_of_growth' },
  { name: 'thriving_trade' },
  { name: 'tightknit_communities' },
  { name: 'urban_development' },
  { name: 'wellprepared_explorers' },
  // { "name": "wounded_lands_attract_explorers" },
  { name: 'accumulated_devastation' },
  { name: 'an_ominous_dawn' },
  { name: 'ethereal_conjunction' },
  { name: 'far_off_wars_touch_the_island', action: {
    title: 'Add Fear',
    fn: addFearToTop,
  } },
  { name: 'focused_farming' },
  { name: 'influx_of_settlers' },
  { name: 'search_for_unclaimed_land' },
  { name: 'terror_spikes_upwards' },
  { name: 'visions_out_of_time' },
]
export const FEAR_CARDS: Array<{
  name: string
}> = [
  { name: 'angry_mobs' },
  { name: 'avoid_the_dahan' },
  { name: 'belief_takes_root' },
  { name: 'beset_by_many_troubles' },
  { name: 'communities_in_disarray' },
  { name: 'dahan_attack' },
  { name: 'dahan_enheartened' },
  { name: 'dahan_on_their_guard' },
  { name: 'dahan_raid' },
  { name: 'dahan_reclaim_fishing_grounds' },
  { name: 'dahan_threaten' },
  { name: 'demoralized' },
  { name: 'depart_the_dangerous_land' },
  { name: 'depopulation' },
  { name: 'discord' },
  { name: 'emigration_accelerates' },
  { name: 'explorers_are_reluctant' },
  { name: 'fear_of_the_unseen' },
  { name: 'flee_from_dangerous_lands' },
  { name: 'flee_the_pestilent_land' },
  { name: 'immigration_slows' },
  { name: 'isolation' },
  { name: 'mimic_the_dahan' },
  { name: 'nerves_fray' },
  { name: 'overseas_trade_seem_safer' },
  { name: 'panic' },
  { name: 'panicked_by_wild_beasts' },
  { name: 'plan_for_departure' },
  { name: 'quarantine' },
  { name: 'retreat' },
  { name: 'scapegoats' },
  { name: 'seek_safety' },
  { name: 'sense_of_dread' },
  { name: 'spreading_timidity' },
  { name: 'tall_tales_of_savagery' },
  { name: 'theological_strife' },
  { name: 'too_many_monsters' },
  { name: 'trade_suffers' },
  { name: 'tread_carefully' },
  { name: 'unrest' },
  { name: 'dahan_gain_edge' },
  { name: 'daunted_by_the_dahan' },
  { name: 'distracted_by_local_troubles' },
  { name: 'restlessness' },
  { name: 'seek_company' },
  { name: 'struggles_over_farmland' },
  { name: 'supply_chains_abandoned' },
  { name: 'unsettled' },
]
export const SPIRIT: Array<SpiritType> = [
  {
    name: "Lightning's Swift Strike",
    cards: [
      {
        name: 'Harbingers of the Lightning',
        cost: 0,
        speed: 'Slow',
        elements: ['Fire', 'Air'],
        description:
          'Push up to 2 Dahan. 1 Fear if you pushed any Dahan into a land with Town / City',
      },
      {
        name: "Lightning's Boon",
        cost: 1,
        speed: 'Fast',
        elements: ['Fire', 'Air'],
        description:
          'Target Spirit may use up to 2 Slow Powers as if they were Fast Powers this turn',
      },
      {
        name: 'Shatter Homesteads',
        cost: 2,
        speed: 'Slow',
        elements: ['Fire', 'Air'],
        description: '1 Fear. Destroy 1 Town.',
      },
      {
        name: 'Raging Storm',
        cost: 3,
        speed: 'Slow',
        elements: ['Fire', 'Air', 'Water'],
        description: '1 Damage to each Invader.',
      },
    ],
    aspects: [
      {
        title: 'Immense',
        cards: [
          {
            name: 'AN IMMENSE SPIRIT, TOWERING AND SLOW',
            description:
              'Your top Presence track grants you twice as much Energy during the Spirit Phase. Any ongoing modifiers are counted after doubling.:break: Playing Power Cards during the Spirit Phase costs 2 Card Plays instead of 1. (So if you have 3 Card Plays, you will only be able to play 1 Power Card.) If you have any unused Card Plays at the end of the Spirit Phase, gain 1 Element of your choice.:break:For each Major Power you play, gain 2 different Elements of your choice.',
          },
        ],
      },
      {
        title: 'Pandemonium',
        requirements: ['Replaces: Thundering Destruction'],
        cards: [
          {
            name: 'LIGHTNING-TORN SKIES INCITE PANDEMONIUM',
            description: '3Fire2Air 2 Fear. Add 1 Strife.:break:4Fire3Air 2 Fear. Add 1 Strife.:break:5Fire4Air1Moon 3 Fear. Add 1 Strife. :break:5Fire5Air2Moon 4 Fear. Add 1 Strife.',
            target: {
              speed: 'Slow',
              range: 1,
              scaredSite: true,
              targetLand: 'Invaders',
            }
          }
        ]
      },
      {
        title: 'Wind',
        requirements: ['Replaces: Swiftness of Lightning'],
        cards: [
          {
            name: 'WINDS OF RENEWAL',
            description: `1Air You and target Spirit may each make one of your non-Major Slowicon.png Powers Fasticon.png.:break:
            3Air You and target Spirit each gain plus1Rangeicon with all your Powers this turn.:break:
            4Air1Water You and target Spirit may each Push up to 2 Explorericon.png from one of your respective lands.:break:
            5Air2Water Repeat this Power.`,
            target: {
              speed: 'Fast',
              range: null,
              scaredSite: null,
              targetLand: 'Another Spirit',
            }
          }
        ]
      },
      {
        title: 'Sparking',
        requirements: ['Replaces: Thundering Destruction'],
        cards: [
          {
            name: 'Gift of the Sparking Sky',
            description: `2Sun5Fire3Air Once this turn, after target Spirit uses a Power that targets a land, they may do 1 Damage to each Invader in that land. (This is their Action and gets all benefits and penalties that apply to their Powers.):break:
            2Fire2Air Target Spirit gains a Minor Power:break:
            1Sun3Fir2Air Target Spirit may play a Power Card by paying its cost. (If you target yourself, its Elements arrive too late to apply to prior thresholds of this Power.)`,
            target: {
              speed: 'Fast',
              range: null,
              scaredSite: null,
              targetLand: 'any-spirit',
            }
          }
        ],
        setupFunction: setupSparking,
      }
    ],
  },
  {
    name: 'River Surges In Sunlight',
    cards: [
      {
        name: 'Boon of Vigor',
        cost: 0,
        speed: 'Fast',
        elements: ['Sun', 'Water', 'Plant'],
        description:
          'If you target yourself, gain 1 Energy. If you target another Spirit, they gain 1 Energy per Power Card they played this turn.',
      },
      {
        name: "River's Bounty",
        cost: 0,
        speed: 'Slow',
        elements: ['Sun', 'Water', 'Animal'],
        description:
          'Gather up to 2 Dahan. If there are now at least 2 Dahan, add 1 Dahan and gain 1 Energy.',
      },
      {
        name: 'Wash Away',
        cost: 1,
        speed: 'Slow',
        elements: ['Water', 'Earth'],
        description: 'Push up to 3 Explorer / Town',
      },
      {
        name: 'Flash Floods',
        cost: 2,
        speed: 'Fast',
        elements: ['Sun', 'Water'],
        description: '1 Damage. If target land is Coastal, +1 Damage.',
      },
    ],
    aspects: [
      {
        title: 'Sunshine',
        cards: [
          {
            name: 'WINDS OF RENEWAL',
            description: `2Sun Target Spirit gains Energy equal to 1 less than the highest uncovered number on your Energy track.:break:
            3Sun1Water You also gain that much Energy.:break:
            4Sun2Water Target Spirit may Remove 1 Blight from one of their lands with Dahan.`,
            target: {
              speed: 'Fast',
              range: null,
              scaredSite: null,
              targetLand: 'Another Spirit',
            }
          }
        ],
        setupFunction: setupSunshine
      },
      {
        title: 'Travel',
        requirements: [`Replaces: River's Domain`],
        cards: [
          {
            name: `WINDS OF RENEWAL`,
            description: `After Growth, choose up to 2 Dahan among your lands. Move each of them to any land contiguously connected by your Presence.`,
          },
          {
            name: 'PEOPLE TEND TO THE RIVER, RIVER TENDS TO THE PEOPLE',
            description: `Your lands with 4 or more Dahan are considered Sacred Site, and have Defend 1.`
          }
        ]
      },
      {
        title: 'Haven',
        requirements: [`Replaces: Massive Flooding`],
        cards: [
          {
            name: 'CALL TO A SUNLIT HAVEN',
            description: `E is the highest uncovered number on your Energy track.:break:
            1Sun1WaterDefend E.:break:
            1Sun2Water1EarthIn an adjacent land with your Presence, Defend E.:break:
            1Sun1AnimalIn target land or an adjacent land with your Presence, Gather up to E Dahan.:break:
            1Sun1Water1PlantRemove up to E Health worth of Invaders.`,
            target: {
              speed: 'Fast',
              range: 0,
              scaredSite: true,
              targetLand: 'Any',
            }
          }
        ]
      }
    ]
  },
  {
    name: 'Shadows Flicker Like Flame',
    cards: [
      {
        name: 'Concealing Shadows',
        cost: 0,
        speed: 'Fast',
        elements: ['Moon', 'Air'],
        description:
          '1 Fear. Dahan take no damage from Ravaging Invaders this turn.',
      },
      {
        name: 'Favors Called Due',
        cost: 1,
        speed: 'Slow',
        elements: ['Moon', 'Air', 'Animal'],
        description:
          'Gather up to 4 Dahan. If Invaders are present and Dahan now outnumber them, 3 Fear.',
      },
      {
        name: 'Mantle of Dread',
        cost: 1,
        speed: 'Slow',
        elements: ['Moon', 'Fire', 'Air'],
        description:
          '2 Fear. Target Spirit may Push 1 Explorer and 1 Town from a land where it has Presence.',
      },
      {
        name: 'Crops Wither and Fade',
        cost: 1,
        speed: 'Slow',
        elements: ['Moon', 'Fire', 'Plant'],
        description:
          '2 Fear. Replace 1 Town with 1 Explorer. -or- Replace 1 City with 1 Town.',
      },
    ],
    aspects: [
      {
        title: 'Madness',
        cards: [
          {
            name: 'SHADOWS CAST A SUBTLE MADNESS',
            description: `When you add Presence during Growth, you may also add 1 Strife in that land.`
          },
          {
            name: 'GLIMPSE OF THE SHADOWED VOID',
            description: `When your Presence is Destroyed, if Invaders are present, 1 Fear per Presence Destroyed there.`
          },
        ],
        requirements: ['Replaces: Shadows of the Dahan'],
      },
      {
        title: 'Reach',
        requirements: ['Replaces: Shadows of the Dahan'],
        cards: [
          {
            name: 'REACH THROUGH EPHEMERAL SPACE',
            description: `Once per turn, you may ignore Range.:break:
            (This can be during Growth or for a Power - anything for which there's a Range arrow or the word "Range" is used. It affects a single Action of yours.)`
          },
        ]
      },
      {
        title: 'Amorphous',
        requirements: ['Replaces: Shadows of the Dahan'],
        cards: [
          {
            name: 'SHADOWS PARTAKE OF AMORPHOUS SPACE',
            description: `During each Fasticon.png Phase, you may move 1 of your Presence to an adjacent land, or to a land with Dahan anywhere on the island.:break:
            During each Slowicon.png Phase, you may move 1 of your Presence to an adjacent land, or to a land with Dahan anywhere on the island.`
          },
        ]
      },
      {
        title: 'Foreboding',
        requirements: ['Replaces: Shadows of the Dahan'],
        cards: [
          {
            name: 'STRETCH OUT COILS OF FOREBODING DREAD',
            description: `2Air Your other Powers may ignore Range when targeting the target land.:break:
            1Moon After an Action generates Fear in target land, including from Destroying Townicon.png/Cityicon.png: Push up to 1 Explorericon.png per Fear / 1 Townicon.png per 2 Fear. (You may mix-and-match.):break:
            2Fire 1 Fear.:break:
            2Moon4Air 2 Fear.`,
            target: {
              speed: 'Fast',
              range: 2,
              scaredSite: false,
              targetLand: 'Any',
            }
          },
        ]
      },
      {
        title: 'Dark Fire',
        requirements: ['Replaces: Shadows of the Dahan'],
        cards: [
          {
            name: 'DARK AND FIRE AS ONE',
            description: `You gain 1 permanent Fire/Moon.:break:
            You may treat each Moon available to you as being Fire, or vice versa. (Choose during each Action for each Moon/Fire you have.) You may discard or Forget Powers that grant Moon to pay for Fire Choice Events, and vice versa.`
          },
          {
            name: 'FRIGHTFUL SHADOWS ELUDE DESTRUCTION',
            description: `The first time each Action would destroy your Presence, you may Push 1 of those Presence instead of destroying it.`
          }
        ],
        setupFunction: setupDarkFire,
      }
    ]
  },
  {
    name: 'Thunderspeaker',
    cards: [
      {
        name: 'Voice of Thunder',
        cost: 0,
        speed: 'Slow',
        elements: ['Sun', 'Air'],
        description:
          'Push up to 4 Dahan. -or- If Invaders are Present, 2 Fear.',
      },
      {
        name: 'Words of Warning',
        cost: 1,
        speed: 'Fast',
        elements: ['Sun', 'Air', 'Animal'],
        description:
          'Defend 3. During Ravage, Dahan in target land deal damage simultaneously with Invaders.',
      },
      {
        name: 'Sudden Ambush',
        cost: 2,
        speed: 'Fast',
        elements: ['Fire', 'Air', 'Animal'],
        description: 'You may Gather 1 Dahan. Each Dahan destroys 1 Explorer.',
      },
      {
        name: 'Manifestation of Power and Glory',
        cost: 3,
        speed: 'Slow',
        elements: ['Sun', 'Fire', 'Air'],
        description:
          '1 Fear. Each Dahan deals damage equal to the number of your Presence in target land.',
      },
    ],
    aspects: [
      {
        title: 'Warrior',
        requirements: ['Replaces: Lead the Furious Assault', 'Setup: Replace 1 of your Presence with your Incarna and 1 Dahan.'],
        setupFunction: setupWarrior,
      },
      {
        title: 'Tactician',
      }
    ]
  },
  {
    name: "Ocean's Hungry Grasp",
    cards: [
      {
        name: 'Call of the Deeps',
        cost: 0,
        speed: 'Fast',
        elements: ['Moon', 'Air', 'Water'],
        description:
          'Gather 1 Explorer. If target land is the Ocean, you may Gather another Explorer.',
      },
      {
        name: 'Swallow the Land-Dwellers',
        cost: 0,
        speed: 'Slow',
        elements: ['Water', 'Earth'],
        description: 'Drown 1 Explorer, 1 Town, and 1 Dahan.',
      },
      {
        name: 'Grasping Tide',
        cost: 1,
        speed: 'Fast',
        elements: ['Moon', 'Water'],
        description: '2 Fear. Defend 4.',
      },
      {
        name: 'Tidal Boon',
        cost: 1,
        speed: 'Slow',
        elements: ['Moon', 'Water', 'Earth'],
        description:
          'Target Spirit gains 2 Energy and may Push 1 Town and up to 2 Dahan from one of their lands. If Dahan are pushed to your ocean, you may move them to any Coastal land instead of Drowning them.',
      },
    ],
    aspects: [
      {
        title: 'Deeps',
        requirements: [`Replaces: POUND SHIPS TO SPLINTERS`,
        `Replaces: OCEAN BREAKS THE SHORE`],
        cards: [
          {
            name: 'WATER EATS AWAY THE DEEP ROOTS OF THE EARTH',
            description: `2 Water Add 1 Deeps.:break:
            3 Water Add 1 Deeps to a different Coastal land (on any board).:break:
            3 Moon 4 Water 3 Earth Add 1 Deeps to a third Costal land (on any board).:break:`,
            target: {
              speed: 'Slow',
              range: 1,
              scaredSite: false,
              targetLand: 'Coastal',
            }
          },
          {
            name: `RECLAIMED BY THE DEEPS`,
            description: `2 Water 1 Damage per Deeps, to Townicon.png/Cityicon.png only.:break:
            4 Water 2 Earth If at least 3 Deeps and no Townicon.png/Cityicon.png are present::break:
            Drown all Explorericon.png/Dahan. Push all but 2 Deeps. Target land permanently becomes part of the Ocean on its board. Flip all remaining Deeps; they are reminder markers for the expanded Ocean.:break:
            2 Moon 3 Water Repeat this power in target land or a land with your Presence.`,
            target: {
              speed: 'Slow',
              range: 1,
              scaredSite: false,
              targetLand: 'Coastal',
            }
          }
        ],
        images: ['Deeps 1', 'Deeps 2'],
      }
    ],
  },
  {
    name: 'Bringer Of Dreams And Nightmares',
    cards: [
      {
        name: "Call on Midnight's Dream",
        cost: 0,
        speed: 'Fast',
        elements: ['Moon', 'Animal'],
        description:
          'If target land has Dahan, gain a Major Power. If you Forget this Power, gain Energy equal to Dahan and you may play the Major Power immediately, paying its cost. -or- If Invaders are present, 2 Fear.',
      },
      {
        name: 'Dreams of the Dahan',
        cost: 0,
        speed: 'Fast',
        elements: ['Moon', 'Air'],
        description:
          'Gather up to 2 Dahan. -or- If target land has Town / City, 1 Fear for each Dahan, to a maximum of 3 Fear.',
      },
      {
        name: 'Predatory Nightmares',
        cost: 2,
        speed: 'Slow',
        elements: ['Moon', 'Fire', 'Earth', 'Animal'],
        description:
          '2 Damage. Push up to 2 Dahan. (When your powers would destroy Invaders, instead they generate Fear and/or Push those Invaders.)',
      },
      {
        name: 'Dread Apparitions',
        cost: 2,
        speed: 'Fast',
        elements: ['Moon', 'Air'],
        description:
          'When Powers generate Fear in target land, Defend 1 per Fear. 1 Fear. (Fear from To Dream a Thousand Deaths counts. Fear from destroying Town / City does not.)',
      },
    ],
    aspects: [
      {
        title: 'Enticing',
        requirements: [`Replaces: Night Terrors`],
        cards: [
          {
            name: 'ENTICING AND LULLING DREAMS',
            description: `2Moon1Air Each Invader/Dahan does -1 Damage while in target land.:break:
            2Moon2Animal Gather up to 1 Explorericon.png/Townicon.png.:break:
            3Moon2Air1Animal Each Invader/Dahan does -1 Damage while in target land.:break:
            4Moon3Air2Animal Gather up to 4 Explorericon.png/Townicon.png.`,
            target: {
              speed: 'Fast',
              range: 1,
              scaredSite: false,
              targetLand: 'Any',
            },
          }
        ],
      },
      {
        title: 'Violence',
        requirements: [`Replaces: Spirits May Yet Dream`],
        cards: [
          {
            name: 'NIGHTMARES OF VIOLENCE AND DEATH',
            description: `Card Plays on your bottom Presence track grant twice as many Plays during the Spirit Phase. These extra Card Plays can only be used for Power Cards with Damage or Destroy instructions.:break:
            When To Dream A Thousand Deaths generates Fear, generate +1 Fear per affected Explorericon.png/Townicon.png (to 1/3/5 Fear for Explorericon.png/Townicon.png/Cityicon.png, respectively).`,
          }
        ],
        setupFunction: setupViolence,
      },
    ]
  },
  {
    name: 'A Spread Of Rampant Green',
    cards: [
      {
        name: 'Fields Choked with Growth',
        cost: 0,
        speed: 'Slow',
        elements: ['Sun', 'Water', 'Plant'],
        description: 'Push 1 Town. -or- Push 3 Dahan',
      },
      {
        name: 'Stem the Flow of Fresh Water',
        cost: 0,
        speed: 'Slow',
        elements: ['Water', 'Plant'],
        description:
          '1 Damage to 1 Town / City. If target land is Mountain / Sands, instead, 1 Damage to each Town / City.',
      },
      {
        name: 'Gift of Proliferation',
        cost: 1,
        speed: 'Fast',
        elements: ['Moon', 'Plant'],
        description:
          'Target Spirit adds 1 Presence up to 1 Range from their Presence.',
      },
      {
        name: 'Overgrow in a Night',
        cost: 2,
        speed: 'Fast',
        elements: ['Moon', 'Plant'],
        description:
          'Add 1 Presence. -or- If target land has your Presence and Invaders, 3 Fear.',
      },
    ],
    aspects: [
      {
        title: 'Tangles',
        requirements: ['Replaces: Creepers Tear Into Mortar'],
        cards: [
          {
            name: 'Impenetrable Tangles of Greenery',
            description: `1Sun2Plant Add 1 Wilds.:break:
            2Sun3Plant Push 1 Explorericon.png.:break:
            2Sun4Plant Isolate target land.:break:
            3Sun5Plant Downgrade 1 Cityicon.png. Add 1 Wilds.`,
            target: {
              speed: 'Fast',
              range: 0,
              scaredSite: false,
              targetLand: 'Any',
            }
          }
        ],
        setupFunction: setupTangles,
      },
      {
        title: 'Regrowth',
        requirements: [
          'Replaces: STEADY REGENERATION',
          'Replace: ALL ENVELOPING GREEN',
          'Setup: Take 13 destroy Presence',
        ],
        cards: [
          {
            name: 'Unbelievable Regrowth',
            description: `2Water3Plant This Power may target any terrain.:break:
            1Water3Plant Add 1 Destroy Presence.:break:
            2Water4Plant Add 1 Destroy Presence.:break:
            3Water5Plant Add 1 Destroy Presence to an adjacent land.`,
            target: {
              speed: 'Slow',
              range: 1,
              scaredSite: false,
              targetLand: 'j-w',
            }
          }
        ]
      }
    ],
  },
  {
    name: 'Sharp Fangs Behind The Leaves',
    cards: [
      {
        name: 'Too Near the Jungle',
        cost: 0,
        speed: 'Slow',
        elements: ['Plant', 'Animal'],
        description: '1 Fear. Destroy 1 Explorer.',
      },
      {
        name: 'Prey on the Builders',
        cost: 1,
        speed: 'Fast',
        elements: ['Moon', 'Fire', 'Animal'],
        description:
          'You may Gather 1 Beasts. If target land has Beasts, Invaders do not Build there this turn.',
      },
      {
        name: 'Teeth Gleam from Darkness',
        cost: 1,
        speed: 'Slow',
        elements: ['Moon', 'Plant', 'Animal'],
        description:
          '1 Fear. Add 1 Beasts. -or- If target land has both Beasts and Invaders: 3 Fear.',
      },
      {
        name: 'Terrifying Chase',
        cost: 1,
        speed: 'Slow',
        elements: ['Sun', 'Animal'],
        description:
          'Push 2 Explorer / Town / Dahan. Push another 2 Explorer / Town / Dahan per Beasts in target land. If you Pushed any Invaders, 2 Fear.',
      },
    ],
    aspects: [
      {
        title: 'unconstrained',
        requirements: [`Call Forth Predators`, `Do not add a beast as part of this Spirit Setup`],
        cards: [
          {
            name: 'Unconstrained by Ravaged Lands',
            description: 'Ranging Hunt may target lands with Blight.'
          },
          {
            name: 'Predators Arise',
            description: 'Each Spirit Phase, either Prepare 1 Beast or Add any number of your prepared Beast to one of your lands.'
          }
        ]
      },
      {
        title: 'Encircle',
        requirements: [
          `Replace Special Rule: ALLY OF THE BEAST`,
          `Replace : RANGING HUNT`,
        ],
        cards: [
          {
            name: 'Pack Hunting',
            description: `Your Powers get plus1Rangeicon for targeting lands Beasts.`,
          },
          {
            name: 'Encircle the Land',
            description: `1Plant2Animal You may Gather 1 Beasts into target or an adjacent land. If you do, 1 Damage in that land.:break:
            1Moon3Animal If at least 2 Beasts are within normal1Rangeicon (of target land), 1 Damage.:breal:
            1Moon2Plant4Animal For each adjacent land with Beasts, 1 Damage.`,
            target: {
              speed: 'Slow',
              range: 1,
              scaredSite: false,
              targetLand: 'Any',
            }
          }
        ]
      }
    ]
  },
  {
    name: 'Heart Of The Wildfire',
    cards: [
      {
        name: "Flame's Fury",
        cost: 0,
        speed: 'Fast',
        elements: ['Sun', 'Fire', 'Plant'],
        description:
          "Target Spirit gains 1 Energy. Target Spirit does +1 Damage with each Damage dealing Power they use this turn. (Powers which damage multiple lands or each Invader only get 1 extra damage total. Repeated Powers keep the +1 boost. Destroy effects don't get any bonus.)",
      },
      {
        name: 'Threatening Flames',
        cost: 0,
        speed: 'Fast',
        elements: ['Fire', 'Plant'],
        description:
          '2 Fear. Push 1 Explorer / Town per Terror Level from target land to adjacent lands without your Presence. If there are no such adjacent lands, +2 Fear.',
      },
      {
        name: 'Flash-Fires',
        cost: 2,
        speed: 'Slow',
        elements: ['Fire', 'Air'],
        description:
          '1 Fear. 1 Damage. -If you have- 2 Air: This Power is Fast.',
      },
      {
        name: 'Asphyxiating Smoke',
        cost: 2,
        speed: 'Slow',
        elements: ['Fire', 'Air', 'Plant'],
        description: '1 Fear. Destroy 1 Town. Push 1 Dahan.',
      },
    ],
  },
  {
    name: 'Grinning Trickster Stirs Up Trouble',
    cards: [
      {
        name: 'Unexpected Tigers',
        cost: 0,
        speed: 'Slow',
        elements: ['Moon', 'Fire', 'Animal'],
        description:
          '1 Fear if Invaders are present. If you can gather 1 Beasts, do so, then push 1 Explorer. Otherwise, add 1 Beasts.',
      },
      {
        name: 'Impersonate Authority',
        cost: 0,
        speed: 'Slow',
        elements: ['Sun', 'Air', 'Animal'],
        description: 'Add 1 Strife.',
      },
      {
        name: 'Incite the Mob',
        cost: 1,
        speed: 'Slow',
        elements: ['Moon', 'Fire', 'Air', 'Animal'],
        description:
          '1 Invader with Strife deals Damage to other Invaders (not to each Invader). 1 Fear per Invader this Power Destroyed.',
      },
      {
        name: 'Overenthusiastic Arson',
        cost: 1,
        speed: 'Fast',
        elements: ['Fire', 'Air'],
        description:
          'Destroy 1 Town. Discard the top card of the Minor Power Deck. If it provides Fire: 1 Fear, 2 Damage, and add 1 Blight.',
      },
    ],
  },
  {
    name: 'Shroud Of Silent Mist',
    cards: [
      {
        name: 'Flowing and Silent Forms Dart By',
        cost: 0,
        speed: 'Fast',
        elements: ['Moon', 'Air', 'Water'],
        description:
          '2 Fear if Invaders are present. When Presence in target land would be Destroyed, its owner may, if possible, instead Push that Presence. You may Gather 1 Presence / Sacred Site of another Spirit (with their permission).',
      },
      {
        name: 'The Fog Closes In',
        cost: 1,
        speed: 'Slow',
        elements: ['Moon', 'Air', 'Water'],
        description:
          'For each adjacent land with your Presence, 1 Damage to a different Invader. Push 2 Dahan.',
      },
      {
        name: 'Unnerving Pall',
        cost: 1,
        speed: 'Fast',
        elements: ['Moon', 'Air', 'Animal'],
        description:
          '1 Fear. Up to 3 damaged Invaders do not participate in Ravage. -or- 1 Fear. Defend 1 per Presence you have in target land (when this Power is used).',
      },
      {
        name: 'Dissolving Vapors',
        cost: 2,
        speed: 'Slow',
        elements: ['Air', 'Water'],
        description:
          '1 Fear. 1 Damage to each Invader. 1 Damage to each Dahan.',
      },
    ],
    aspects: [
      {
        title: 'Stranded',
        requirements: [`Replaces: Mists Shift and Flow`],
        cards: [
          {
            name: 'Mists Steadily Drift',
            description: 'Up to twice during the Fast phase and up to twice during Slow phase, Push 1 of your Presence.'
          },
          {
            name: 'Stranded in the Shifting Mist',
            description: 'Once each Fast phase, Isolate one of your lands.'
          }
        ]
      }
    ]
  },
  {
    name: 'Vengeance As A Burning Plague',
    cards: [
      {
        name: 'Fiery Vengeance',
        cost: 0,
        speed: 'Fast',
        elements: ['Sun', 'Fire'],
        description:
          "Cost to Use: Target Spirit Removes 1 of their Destroyed Presence from the game. 1 Fear and 1 Damage in one of target Spirit's lands. (This is your Power, so Blight counts as Badlands, even if target is another Spirit.)",
      },
      {
        name: 'Plaguebearers',
        cost: 1,
        speed: 'Slow',
        elements: ['Fire', 'Water', 'Animal'],
        description:
          '1 Fear if Invaders are present. For each Disease, Push 2 Explorer / Town / Dahan. 1 Disease may move with each Pushed piece.',
      },
      {
        name: 'Fetid Breath Spreads Infection',
        cost: 2,
        speed: 'Slow',
        elements: ['Air', 'Water', 'Animal'],
        description: '1 Fear. Add 1 Disease.',
      },
      {
        name: 'Strike Low with Sudden Fevers',
        cost: 2,
        speed: 'Fast',
        elements: ['Fire', 'Air', 'Earth', 'Animal'],
        description: '1 Fear. Invaders skip Ravage Actions.',
      },
    ],
  },
  {
    name: 'Fractured Days Split The Sky',
    cards: [
      {
        name: 'The Past Returns Again',
        cost: 0,
        speed: 'Fast',
        elements: ['Sun', 'Moon'],
        description:
          "Cost to Use: N Time, and Spirits jointly pay N Energy (where N = # of players). Swap the top card of the Invader Deck with a card in the Invader discard that is within 1 Invader Stage of it. (The discarded card stays face-down. You can't swap cards that don't exist.)",
      },
      {
        name: 'Absolute Stasis',
        cost: 1,
        speed: 'Fast',
        elements: ['Sun', 'Air', 'Earth'],
        description:
          'Cost to Use: 1 Time. Until the end of the Slow phase, target land and everything in it cease to exist for all purposes except checking victory/defeat. (You cannot target into, out of, or through where the land was.) This cannot target an Ocean even if Oceans are in play.',
      },
      {
        name: 'Pour Time Sideways',
        cost: 1,
        speed: 'Fast',
        elements: ['Moon', 'Air', 'Water'],
        description:
          'Cost to Use: 3 Time. Move 1 of your Presence to a different land with your Presence. On the board moved from: During the Invader Phase, Resolve Invader and "Each board / Each land..." Actions one fewer time. On the board moved to: During the Invader Phase, Resolve Invader and "Each board / Each Land..." Actions one more time.',
      },
      {
        name: 'Blur the Arc of Years',
        cost: 1,
        speed: 'Fast',
        elements: ['Sun', 'Moon', 'Air'],
        description:
          'If no Dahan / Invaders are present: Remove 1 Blight. If invaders are present: they Build, then Ravage. If Dahan are present: Add 1 Dahan. Push up to 2 Dahan. You may repeat this power (once) on the same land by spending 1 Time.',
      },
    ],
    setup: setupDaysThatNeverWere
  },
  {
    name: 'Shifting Memory Of Ages',
    cards: [
      {
        name: 'Elemental Teachings',
        cost: 0,
        speed: 'Fast',
        elements: ['Moon', 'Air', 'Earth'],
        description:
          'Prepare 1 Element Marker. Discard up to 3 Element Markers. Target Spirit gains those Elements. (They can be any combination of Elements - the same or different.)',
      },
      {
        name: 'Share Secrets of Survival',
        cost: 0,
        speed: 'Fast',
        elements: ['Sun', 'Air', 'Earth'],
        description:
          'Each time Dahan would be Destroyed in target land, Destroy 2 fewer Dahan. -or- Gather up to 2 Dahan.  -If you have- 3 Air: You may do both.',
      },
      {
        name: "Study the Invaders' Fears",
        cost: 0,
        speed: 'Fast',
        elements: ['Moon', 'Air', 'Animal'],
        description: '2 Fear. Turn the top card of the Fear Deck face-up.',
      },
      {
        name: 'Boon of Ancient Memories',
        cost: 1,
        speed: 'Slow',
        elements: ['Moon', 'Water', 'Earth', 'Plant'],
        description:
          "If you target yourself, gain a Minor Power. Otherwise: Target Spirit gains a Power Card. If it's a Major Power, they may pay 2 Energy instead of Forgetting a Power Card.",
      },
    ],
    aspects: [
      {
        title: 'Mentor',
        requirements: [
          'Replaces: LONG AGES OF KNOWLEDGE',
          'Replaces: OBSERVE THE EVER-CHANGING WORLD',
        ],
        cards: [
          {
            name: 'PAST TEACHINGS SPRING FORTH UNBIDDEN',
            description: 'When you gain Power Cards, draw 2 fewer cards (min. 2) and gain 1 more of them (normally draw 2 cards and gain both). (Forget only one Power Card when gaining Major Powers.)'
          },
          {
            name: 'SHARE MENTORSHIP AND EXPERTISE',
            description: `1AirPut a Power Card from your hand or discard in to target Spirit's hand:break:
            3Air2EarthTarget Spirit may play that Power Card now by paying its cost.:break:
            1Sun4Air3EarthTarget Spirit may Repeat that Power Card once this turn by paying its cost.:break:
            1Air Prepare 1 Element Marker matching an Element on that Power Card. Prepare 1 Element Marker of your choice.`, 
            target: {
              speed: 'Fast',
              range: null,
              scaredSite: null,
              targetLand: 'Another Spirit',
            }
          }
        ]
      },
      {
        title: 'Intensify',
        requirements: [`Replaces: Insights into the World's Nature`],
        setupFunction: setupIntensify,
      }
    ]
  },
  {
    name: 'Starlight Seeks Its Form',
    cards: [
      {
        name: 'Gather the Scattered Light of Stars',
        cost: 0,
        speed: 'Slow',
        elements: ['Moon'],
        description:
          'At end of turn after discarding: Reclaim up to 2 cards to your hand. You may then Forget a Unique Power Card to Reclaim up to 3 additional cards.',
      },
      {
        name: 'Shape the Self Anew',
        cost: 0,
        speed: 'Slow',
        elements: ['Moon'],
        description:
          'Gain a Minor Power. You may Forget this Power Card to gain 3 Energy.  -If you have- 4 Moon: You may gain a Major Power instead of a Minor Power.',
      },
      {
        name: 'Boon of Reimagining',
        cost: 1,
        speed: 'Slow',
        elements: ['Moon'],
        description:
          'Target Spirit may Forget a Power Card from hand or discard. If they do, they draw 6 Minor Power Cards and gain 2 of them. If you target another Spirit, they gain 1 Energy.',
      },
      {
        name: 'Peace of the Nighttime Sky',
        cost: 1,
        speed: 'Fast',
        elements: ['Moon'],
        description:
          'If the Terror Level is 1, Invaders do not Ravage in target land this turn. You may Repeat this Power. If you do, Forget this Power Card and Gain 1 Moon.',
      },
    ],
  },
  {
    name: "Stone's Unyielding Defiance",
    cards: [
      {
        name: 'Jagged Shards Push from the Earth',
        cost: 0,
        speed: 'Slow',
        elements: ['Fire', 'Earth'],
        description: 'Add 1 Badlands. Push up to 2 Dahan.',
      },
      {
        name: 'Stubborn Solidity',
        cost: 1,
        speed: 'Fast',
        elements: ['Sun', 'Earth', 'Animal'],
        description:
          "Defend 1 per Dahan. Dahan in target land cannot be changed. (When they would be Damaged, Destroyed, Removed, Replaced, or moved, instead don't)",
      },
      {
        name: 'Scarred and Stony Land',
        cost: 2,
        speed: 'Slow',
        elements: ['Moon', 'Earth'],
        description:
          '2 Damage. Add 1 Badlands. Remove 1 Blight in target land from the game. (It goes to the box, not the Blight Card.)',
      },
      {
        name: 'Plows Shatter on Rocky Ground',
        cost: 2,
        speed: 'Slow',
        elements: ['Earth'],
        description:
          '1 Damage to each Town / City. Push up to 1 Town. -or- Destroy 1 Town.',
      },
    ],
  },
  {
    name: 'Lure Of The Deep Wilderness',
    cards: [
      {
        name: 'Gift of the Untamed Wild',
        cost: 0,
        speed: 'Slow',
        elements: ['Moon', 'Fire', 'Air', 'Plant'],
        description:
          'Target Spirit chooses to either: add 1 Wilds to one of their lands. -or- Replace 1 of their Presence with 1 Disease.',
      },
      {
        name: 'Perils of the Deepest Island',
        cost: 1,
        speed: 'Slow',
        elements: ['Moon', 'Plant', 'Animal'],
        description:
          '1 Fear. Add 1 Badlands. Add 1 Beasts within 1 Range. Push up to 2 Dahan.',
      },
      {
        name: 'Swallowed by the Wilderness',
        cost: 1,
        speed: 'Fast',
        elements: ['Fire', 'Air', 'Plant', 'Animal'],
        description:
          '2 Fear. 1 Damage per Beasts / Disease / Wilds / Badlands. (Count max. 5 tokens.)',
      },
      {
        name: 'Softly Beckon Ever Inward',
        cost: 2,
        speed: 'Slow',
        elements: ['Moon', 'Air'],
        description:
          'Gather up to 2 Explorer. Gather up to 2 Town. Gather up to 2 Beasts. Gather up to 2 Dahan.',
      },
    ],
  },
  {
    name: 'Many Minds Move As One',
    cards: [
      {
        name: 'Pursue with Scratches, Pecks, and Stings',
        cost: 0,
        speed: 'Fast',
        elements: ['Sun', 'Fire', 'Air', 'Animal'],
        description:
          '1 Fear. For each Beasts past the first, Push 1 Explorer / Town.',
      },
      {
        name: 'A Dreadful Tide of Scurrying Flesh',
        cost: 0,
        speed: 'Fast',
        elements: ['Moon', 'Air', 'Water', 'Animal'],
        description:
          'Remove up to half (round down) of Beasts in target land. For each Beasts Removed, 2 Fear and skip one Invader Action.',
      },
      {
        name: 'Boon of Swarming Bedevilment',
        cost: 0,
        speed: 'Fast',
        elements: ['Air', 'Water', 'Animal'],
        description:
          "For the rest of this turn, each of target Spirit's Presence grants Defend 1 in its land. Target Spirit may Push up to 1 of their Presence.",
      },
      {
        name: 'Guide the Way on Feathered Wings',
        cost: 0,
        speed: 'Fast',
        elements: ['Sun', 'Air', 'Animal'],
        description:
          'Move 1 Beasts up to two lands. As it moves, up to 2 Dahan may move with it, for part or all of the way. (The Beasts / Dahan may move to an adjacent land and then back.)',
      },
      {
        name: 'Ever-Multiplying Swarm',
        cost: 1,
        speed: 'Slow',
        elements: ['Fire', 'Earth', 'Animal'],
        description: 'Add 2 Beasts.',
      },
    ],
  },
  {
    name: 'Downpour Drenches The World',
    cards: [
      {
        name: 'Unbearable Deluge',
        cost: 0,
        speed: 'Fast',
        elements: ['Air', 'Water', 'Earth'],
        description:
          '1 fear. Push 2 Dahan. Defend 3. If target land is Wetland, Isolate it.',
      },
      {
        name: 'Foundations Sink into Mud',
        cost: 1,
        speed: 'Slow',
        elements: ['Water', 'Earth'],
        description:
          '2 damage to Town. If target land is Wetland, you may instead deal 1 Damage to each Town / City.',
      },
      {
        name: 'Gift of Abundance',
        cost: 1,
        speed: 'Fast',
        elements: ['Sun', 'Air', 'Water', 'Plant'],
        description:
          'Target Spirit either gains 2 Energy, or may Repeat one Power Card this turn by paying its cost. Either you or target Spirit may add 1 Destroyed Presence to a Wetland where you have Presence.',
      },
      {
        name: 'Dark Skies Loose a Stinging Rain',
        cost: 1,
        speed: 'Fast',
        elements: ['Moon', 'Air', 'Water'],
        description:
          'Isolate target land. Push up to 1 Explorer and up to 2 Dahan.',
      },
    ],
  },
  {
    name: 'Finder Of Paths Unseen',
    cards: [
      {
        name: "Traveler's Boon",
        cost: 0,
        speed: 'Fast',
        elements: ['Moon', 'Air', 'Water'],
        description:
          'Target spirit moves up to 3 of their Presence to one of your lands. They may move up to 1 Invader, 1 Dahan and 1 Beasts along with their Presence. (Total, not for each Presence.)',
      },
      {
        name: 'Paths Tied by Nature',
        cost: 0,
        speed: 'Slow',
        elements: ['Sun', 'Air', 'Earth', 'Plant'],
        description:
          'Move up to 2 Invaders / Dahan / Presence / Beasts to a land within 2 Range that has the same terrain.',
      },
      {
        name: 'A Circuitous and Wending Journey',
        cost: 0,
        speed: 'Slow',
        elements: ['Moon', 'Air'],
        description:
          'Push up to half (round up) of Invaders from target land. Do likewise (separately) for Dahan, Presence, and Beasts.',
      },
      {
        name: 'Offer Passage Between Worlds',
        cost: 1,
        speed: 'Fast',
        elements: ['Sun', 'Moon', 'Air'],
        description:
          'Move up to 4 Dahan between target land and one of your lands. -or- The next time Dahan would be Destroyed in target land, Destroy 2 fewer Dahan.',
      },
      {
        name: 'Ways of Shore and Heartland',
        cost: 1,
        speed: 'Slow',
        elements: ['Air', 'Water', 'Earth'],
        description:
          'Push up to 2 Invaders / Dahan / Presence / Beasts to a land that is also Coastal / Inland (whichever the target land is.)',
      },
      {
        name: 'Aid from the Spirit-Speakers',
        cost: 2,
        speed: 'Fast',
        elements: ['Sun', 'Fire', 'Air', 'Animal'],
        description:
          'For each Dahan, you may move 1 Invader / Dahan / Presence / Beasts to a land within 2 Range that has Dahan.',
      },
    ],
  },
  {
    name: 'Vital Strength Of The Earth',
    cards: [
      {
        name: 'Draw of the Fruitful Earth',
        cost: 1,
        speed: 'Slow',
        elements: ['Earth', 'Plant', 'Animal'],
        description: 'Gather up to 2 Explorer. Gather up to 2 Dahan.',
      },
      {
        name: 'Guard the Healing Land',
        cost: 3,
        speed: 'Fast',
        elements: ['Water', 'Earth', 'Plant'],
        description: 'Remove 1 Blight. Defend 4.',
      },
      {
        name: 'A Year of Perfect Stillness',
        cost: 3,
        speed: 'Fast',
        elements: ['Sun', 'Earth'],
        description: 'Invaders skip all Actions in target land this turn.',
      },
      {
        name: 'Rituals of Destruction',
        cost: 3,
        speed: 'Slow',
        elements: ['Sun', 'Moon', 'Fire', 'Earth', 'Plant'],
        description:
          '2 Damage. If target land has at least 3 Dahan, +3 Damage and 2 Fear.',
      },
    ],
    aspects: [
      {
        'title': 'Resilience',
        requirements: [`Replaces: Earth's Vitality`],
        cards: [
          {
            name: `ANCHOR THE LAND'S RESILIENCE`,
            description: `In lands with your Sacred Site, it takes 8 additional Damage to add Blight to the land. (So, usually, 10 Damage will add Blight. This does not protect Dahan at all; Damage to them is unaffected.)`,
          }
        ]
      },
      {
        'title': 'Might',
        requirements: [`Replaces: Earth's Vitality`],
        cards: [
          {
            name: `EARTH MOVES WITH VIGOR AND MIGHT`,
            description: `1Plant You may play an additional Power Card by paying 1 Energy plus its cost. (Its Elements apply for the rest of this Innate Power's thresholds.):break:
            1Sun2Earth You do +1 Damage with each Damage-dealing Power you use this turn.:break:
            2Plant3Earth You do +1 Damage with each Damage-dealing Power you use this turn.:break:
            1Sun3Plant Gain a Power Card.`,
            target: {
              speed: 'Fast',
              range: null,
              scaredSite: null,
              targetLand: 'yourself'
            }
          }
        ]
      },
      {
        'title': 'Nourishing',
        requirements: [`Replaces: Earth's Vitality`],
        cards: [
          {
            name: `FLOURISH WITH NATURE'S STRENGTH`,
            description: `After you gain a Major Power, gain a Minor Power.`
          },
          {
            name: `IMBUE WITH NOURSHING VITALITY`,
            description: `1Water1Plant Gather up to 1 Dahan.:break:
            1Water2Plant Add 1 Vitality.:break:
            1Water1Earth2Plant Each Dahan has +2 Health while in target land. If target land has at least 2 Dahan, Add 1 Dahan.`,
            target: {
              speed: 'Fast',
              range: 1,
              scaredSite: true,
              targetLand: 'no-blight'
            }
          }
        ],
        setupFunction: setupNourishing
      },

    ]
  },
  {
    name: 'Keeper Of The Forbidden Wilds',
    cards: [
      {
        name: 'Regrow from Roots',
        cost: 1,
        speed: 'Slow',
        elements: ['Water', 'Earth', 'Plant'],
        description:
          'If there are 2 Blight or fewer in target land, remove 1 Blight.',
      },
      {
        name: 'Boon of Growing Power',
        cost: 1,
        speed: 'Slow',
        elements: ['Sun', 'Moon', 'Plant'],
        description:
          'Target Spirit gains a Power Card. If you target another Spirit, they also gain 1 Energy.',
      },
      {
        name: 'Sacrosanct Wilderness',
        cost: 2,
        speed: 'Fast',
        elements: ['Sun', 'Earth', 'Plant'],
        description:
          'Push 2 Dahan. 2 Damage per Wilds in target land. -or- Add 1 Wilds.',
      },
      {
        name: 'Towering Wrath',
        cost: 3,
        speed: 'Slow',
        elements: ['Sun', 'Fire', 'Plant'],
        description:
          '2 Fear. For each of your SacredSite in / adjacent to target land, 2 Damage. Destroy all Dahan.',
      },
    ],
    aspects: [
      {
        'title': 'Spreading Hostility',
        setupFunction: setupSpreadingHostility
      }
    ],
  },
  {
    name: 'Serpent Slumbering Beneath The Island',
    cards: [
      {
        name: 'Gift of the Primordial Deeps',
        cost: 1,
        speed: 'Fast',
        elements: ['Moon', 'Earth'],
        description:
          'Target Spirit gains a Minor Power. Target Spirit chooses to either: Play it immediately by paying its cost. -or- Gain 1 Moon and 1 Earth.',
      },
      {
        name: 'Gift of Flowing Power',
        cost: 1,
        speed: 'Fast',
        elements: ['Fire', 'Water'],
        description:
          'Target Spirit gains 1 Energy. Target Spirit chooses to either: Play another Power Card by paying its cost. -or- Gain 1 Fire and 1 Water.',
      },
      {
        name: 'Elemental Aegis',
        cost: 1,
        speed: 'Fast',
        elements: ['Fire', 'Water', 'Earth'],
        description:
          'Defend 2 in target land and all adjacent lands. For every Presence on your "Deep Slumber" track, Defend 1 in target land and all adjacent lands.',
      },
      {
        name: 'Absorb Essence',
        cost: 2,
        speed: 'Fast',
        elements: ['Moon', 'Fire', 'Water', 'Earth'],
        description:
          'Gain 3 Energy. Move 1 of target Spirit\'s Presence from the board to your "Deep Slumber" track. Absorbed Presence cannot be returned to play. Target Spirit gains 1 Any and 1 Energy.',
      },
    ],
  },
  {
    name: 'Volcano Looming High',
    cards: [
      {
        name: 'Lava Flows',
        cost: 1,
        speed: 'Slow',
        elements: ['Fire', 'Earth'],
        description: 'Add 1 Badlands and 1 Wilds. -or- 1 Damage.',
      },
      {
        name: 'Exaltation of Molten Stone',
        cost: 1,
        speed: 'Fast',
        elements: ['Moon', 'Fire', 'Earth'],
        description:
          'Split 1 Energy per Fire you have between yourself and target Spirit, as evenly as possible. Target Spirit gains +1 Range with their powers that originate from a Mountain.',
      },
      {
        name: 'Rain of Ash',
        cost: 2,
        speed: 'Slow',
        elements: ['Fire', 'Air', 'Earth'],
        description:
          '2 Fear if Invaders are present. Push 2 Dahan and 2 Explorer / Town to land(s) without your Presence.',
      },
      {
        name: 'Pyroclastic Bombardment',
        cost: 3,
        speed: 'Fast',
        elements: ['Fire', 'Air', 'Earth'],
        description:
          '1 Damage to each Town / City / Dahan. 1 Damage. 1 Damage to Dahan.',
      },
    ],
  },
  {
    name: 'Devouring Teeth Lurk Underfoot',
    cards: [
      {
        name: 'Ferocious Rampage',
        cost: 2,
        speed: 'Slow',
        elements: ['Fire', 'Animal'],
        description: '',
      },
      {
        name: 'Herd Towards The Lurking Maw',
        cost: 1,
        speed: 'Slow',
        elements: ['Water', 'Earth', 'Animal'],
        description: '',
      },
      {
        name: 'Mark Territory With Scars And Teeth',
        cost: 2,
        speed: 'Fast',
        elements: ['Sun', 'Earth', 'Animal'],
        description: '',
      },
      {
        name: 'Gift of Furious Might',
        cost: 1,
        speed: 'Fast',
        elements: ['Moon', 'Fire', 'Animal'],
        description: '',
      },
    ],
  },
  {
    name: 'Fathomless Mud of the Swamp',
    cards: [
      {
        name: 'Open Shifting Waterways',
        cost: 1,
        speed: 'Slow',
        elements: ['Moon', 'Water', 'Animal'],
        description: '',
      },
      {
        name: 'Exaltation of Tangled Growth',
        cost: 0,
        speed: 'Slow',
        elements: ['Water', 'Earth', 'Plant'],
        description: '',
      },
      {
        name: 'Foul Vapors And Fetid Muck',
        cost: 0,
        speed: 'Slow',
        elements: ['Fire', 'Air', 'Water', 'Earth'],
        description: '',
      },
      {
        name: 'Intractable Thickets and Thorns',
        cost: 2,
        speed: 'Fast',
        elements: ['Moon', 'Water', 'Earth', 'Plant'],
        description: '',
      },
    ],
  },
  {
    name: 'Eyes Watch From the Trees',
    cards: [
      {
        name: 'Boon of Watchful Guarding',
        cost: 0,
        speed: 'Fast',
        elements: ['Earth', 'Plant', 'Animal'],
        description: '',
      },
      {
        name: 'Mysterious Abductions',
        cost: 1,
        speed: 'Fast',
        elements: ['Moon', 'Fire', 'Plant'],
        description: '',
      },
      {
        name: 'Whispered Guidance Through the Night',
        cost: 0,
        speed: 'Slow',
        elements: ['Moon', 'Air', 'Plant'],
        description: '',
      },
      {
        name: 'Eerie Noises and Moving Trees',
        cost: 2,
        speed: 'Slow',
        elements: ['Moon', 'Air', 'Plant'],
        description: '',
      },
    ],
  },
  {
    name: 'Rising Heat of Stone and Sand',
    cards: [
      {
        name: 'Call on Herders for Aid',
        cost: 1,
        speed: 'Slow',
        elements: ['Sun', 'Fire', 'Earth', 'Animal'],
        description: '',
      },
      {
        name: 'Stinging Sandstorm',
        cost: 1,
        speed: 'Slow',
        elements: ['Fire', 'Air', 'Earth'],
        description: '',
      },
      {
        name: 'Sweltering Exhaustion',
        cost: 2,
        speed: 'Fast',
        elements: ['Fire', 'Air'],
        description: '',
      },
      {
        name: 'Gift of Searing Heat',
        cost: 0,
        speed: 'Fast',
        elements: ['Sun', 'Fire', 'Air'],
        description: '',
      },
    ],
  },
  {
    name: 'Sun-Bright Whirlwind',
    cards: [
      {
        name: 'Gift of the Sunlit Air',
        cost: 0,
        speed: 'Fast',
        elements: ['Sun', 'Fire', 'Air'],
        description: '',
      },
      {
        name: 'Gift of Wind-Sped Steps',
        cost: 1,
        speed: 'Fast',
        elements: ['Sun', 'Air', 'Animal'],
        description: '',
      },
      {
        name: 'Scatter to the Winds',
        cost: 1,
        speed: 'Slow',
        elements: ['Fire', 'Air', 'Water'],
        description: '',
      },
      {
        name: 'Tempest of Leaves And Branches',
        cost: 2,
        speed: 'Fast',
        elements: ['Sun', 'Air', 'Plant'],
        description: '',
      },
    ],
  },
]
export const ADVERSARY: Array<Adversary> = [
  {
    title: 'Prussia',
    fear: [
      [3, 3, 3],
      [3, 3, 3],
      [3, 3, 3],
      [3, 4, 3],
      [4, 4, 3],
      [4, 4, 3],
      [4, 4, 4],
    ],
    difficultly: [1, 2, 4, 6, 7, 8, 9],
    // invaders: [
    //   '111222233333',
    //   '111222233333',
    //   '111322223333',
    //   '11322223333',
    //   '1132223333',
    //   '132223333',
    //   '32223333',
    // ],
    id: 'prussia',
    detail: {
      title: 'The Kingdom of Brandenburg-Prussia',
      loss: {
        name: null,
        text: 'None',
      },
      escalation: {
        name: 'Land Rush',
        text: 'On each board with Townicon.png/Cityicon.png, add 1 Townicon.png to a land without Townicon.png',
      },
      levelText: [
        {
          name: 'Fast Start',
          text: 'During Setup, on each board add 1 Townicon.png to land #3',
        },
        {
          name: 'Surge of Colonists',
          text: 'New Invader Deck Order:111-3-2222-3333',
        },
        {
          name: 'Efficient',
          text: 'New Invader Deck Order:11-3-2222-3333',
        },
        {
          name: 'Aggressive Timetable',
          text: 'New Invader Deck Order:11-3-222-3333',
        },
        {
          name: 'Ruthlessly Efficient',
          text: 'New Invader Deck Order:1-3-222-3333',
        },
        {
          name: 'Terrifyingly Efficient',
          text: 'New Invader Deck Order:3-222-3333',
        },
      ],
    },
    setup: [
      {},
      {
        piece: 'Add 1 Townicon.png to land #3',
      },
      {
        invaders: '111-3-2222-3333',
      },
      {
        invaders: '11-3-2222-3333',
      },
      {
        invaders: '11-3-222-3333',
      },
      {
        invaders: '1-3-222-3333',
      },
      {
        invaders: '3-222-3333',
      }
    ]
  },
  {
    title: 'England',
    fear: [
      [3, 3, 3],
      [3, 4, 3],
      [4, 4, 3],
      [4, 5, 4],
      [4, 5, 5],
      [4, 5, 5],
      [4, 5, 4],
    ],
    difficultly: [1, 3, 4, 6, 7, 9, 11],
    // invaders: [
    //   '111222233333',
    //   '111222233333',
    //   '111222233333',
    //   '111222233333',
    //   '111222233333',
    //   '111222233333',
    //   '111222233333',
    // ],
    id: 'england',
    detail: {
      title: 'The Kingdom of Brandenburg-Prussia',
      loss: {
        name: 'Proud & Mighty Capital',
        text: 'If 7 or more Townicon.png/Cityicon.png are ever in a single land, the Invaders win',
      },
      escalation: {
        name: 'Building Boom',
        text: 'On each board with Townicon.png/Cityicon.png, Build in the land with the most Townicon.png/Cityicon.png',
      },
      levelText: [
        {
          name: 'Indentured Servants Earn Land',
          text: 'Invader Build Cards affect matching lands without Invaders if they are adjacent to at least 2 Townicon.png/Cityicon.png',
          isHighlight: true,
        },
        {
          name: 'Criminals and Malcontents',
          text: 'During Setup, on each board add 1 Cityicon.png to land #1 and 1 Townicon.png to land #2',
        },
        {
          name: 'High Immigration (I)',
          text: 'Put the "High Immigration" tile on the Invader board, to the left of "Ravage". The Invaders take this Build action each Invader phase before Ravaging. Cards slide left from Ravage to it, and from it to the discard pile. Remove the tile when a Stage II card slides onto it, putting that card in the discard',
        },
        {
          name: 'High Immigration (full)',
          text: 'The extra Build tile remains out the entire game',
        },
        {
          name: 'Local Autonomy',
          text: 'Townicon.png/Cityicon.png have +1 Health',
          isHighlight: true,
        },
        {
          name: 'Independent Resolve',
          text: 'During Setup, add an additional Fear to the Fear Pool per player in the game. During any Invader Phase where you resolve no Fear Cards, perform the Build from High Immigration twice. (This has no effect if no card is on the extra Build slot.)',
          isHighlight: true,
        },
      ],
    },
    setup: [
      {},
      {},
      {
        piece: 'Add 1Townicon.png to land #2 and 1Cityicon.png to land #1',
      },
      {
        piece: 'Put the "High Immigration" tile on the Invader board',
      },
      {},
      {},
      {
        piece: '+1Fear Maximum per player',
      },
    ]
  },
  {
    title: 'France',
    fear: [
      [3, 3, 3],
      [3, 3, 3],
      [3, 4, 3],
      [4, 4, 3],
      [4, 4, 4],
      [4, 5, 4],
      [4, 5, 5],
    ],
    difficultly: [2, 3, 5, 7, 8, 9, 10],
    // invaders: [
    //   '111222233333',
    //   '111222233333',
    //   '111222233333',
    //   '111222233333',
    //   '111222233333',
    //   '111222233333',
    //   '111222233333',
    // ],
    id: 'france',
    detail: {
      title: 'The Kingdom of France (Plantation Colony)',
      loss: {
        name: 'Sprawling Plantations',
        text: 'Before Setup, return all but 7 Townicon.png per player ot the box. Invaders win if you ever cannot place a Townicon.png.',
      },
      escalation: {
        name: 'Demand for New Cash Crops',
        text: 'After Exploring, on each board, pick a land of the shown terrain. If it has Townicon.png/Cityicon.png, add 1 Blight.png. Otherwise, add 1 Townicon.png',
      },
      levelText: [
        {
          name: 'Frontier Explorers',
          text: 'Except during Setup: After Invaders successfully Explore into a land which had no Townicon.png/Cityicon.png, add 1 Explorericon.png there',
          isHighlight: true,
        },
        {
          name: 'Slave Labor',
          text: 'During Setup, put the "Slave Rebellion" event under the top 3 cards of the Event Deck. After Invaders Build in a land with 2 Explorericon.png or more, replace all but 1 Explorericon.png there with an equal number of Townicon.png',
          isHighlight: true,
        },
        {
          name: 'Early Plantation',
          text: 'During Setup, on each board add 1 Townicon.png to the highest-numbered land without Townicon.png. Add 1 Townicon.png to land #1',
        },
        {
          name: 'Triangle Trade',
          text: 'Whenever Invaders Build a Coastal Cityicon.png, add 1 Townicon.png to the adjacent land with the fewest Townicon.png',
          isHighlight: true,
        },
        {
          name: 'Slow-Healing Ecosystem',
          text: 'When you remove Blight.png from the board, put it here instead of onto the Blight Card. As soon as you have 3 Blight.png per player here, move it all back to the Blight Card',
          isHighlight: true,
        },
        {
          name: 'Persistent Explorers',
          text: 'After resolving an Explore Card, on each board add 1 Explorericon.png to a land without any. Fear Card effects never remove Explorericon.png. If one would, you may instead Push that Explorericon.png',
          isHighlight: true,
        },
      ],
    },
    setup: [
      {
        piece: 'Return all but 7Townicon.png to the box',
      },
      {},
      {},
      {
        piece: 'Add 1Townicon.png to the highest-numbered land without Townicon.png. Add 1Townicon.png to land #1',
      },
      {},
      {},
      {}
    ]
  },
  {
    title: 'Sweden',
    fear: [
      [3, 3, 3],
      [3, 3, 3],
      [3, 4, 3],
      [3, 4, 3],
      [3, 4, 4],
      [4, 4, 4],
      [4, 4, 5],
    ],
    difficultly: [1, 2, 3, 5, 6, 7, 8],
    // invaders: [
    //   '111222233333',
    //   '111222233333',
    //   '111222233333',
    //   '111222233333',
    //   '111222233333',
    //   '111222233333',
    //   '111222233333',
    // ],
    id: 'sweden',
    detail: {
      title: 'The Kingdom of Sweden',
      loss: {
        name: null,
        text: 'None',
      },
      escalation: {
        name: 'Swayed by the Invaders',
        text: 'After Invaders Explore into each land this Phase, if that land has at least as many Invaders as Dahan, replace 1 Dahan with 1 Townicon.png',
      },
      levelText: [
        {
          name: 'Heavy Mining',
          text: 'If the Invaders do at least 6 Damage to the land during Ravage, add an extra Blight.png. The additional Blight.png does not destroy Presence or cause cascades',
          isHighlight: true,
        },
        {
          name: 'Population Pressure at Home',
          text: 'During Setup, on each board add 1 Cityicon.png to land #4. On boards where land #4 starts with Blight.png, put that Blight.png in land #5 instead',
        },
        {
          name: 'Fine Steel for Tools and Guns',
          text: 'Townicon.png deal 3 Damage. Cityicon.png deal 5 Damage',
          isHighlight: true,
        },
        {
          name: 'Royal Backing',
          text: 'During Setup, after adding all other Invaders, discard the top card of the Invader Deck. On each board, add 1 Townicon.png to the land of that terrain with the fewest Invaders',
        },
        {
          name: 'Mining Rush',
          text: 'When Ravaging adds at least 1 Blight.png to a land, also add 1 Townicon.png to an adjacent land without Townicon.png/Cityicon.png. Cascading Blight.png does not cause this effect',
          isHighlight: true,
        },
        {
          name: 'Prospecting Outpost',
          text: 'During setup, on each board add 1 Townicon.png and 1 Blight.png to land #8. The Blight.png comes from the box, not the Blight Card',
        },
      ],
    },
    setup: [
      {},
      {},
      {
        piece: 'Add 1Cityicon.png to land #4. If land #4 has Blight.png, put that Blight.png in land #5 instead',
      },
      {},
      {
        piece: 'After adding all other Invaders, discard the top card of the Invader Deck. On each board, add 1Townicon.png to the land of that terrain with the fewest Invaders',
      },
      {},
      {
        piece: 'Add 1Townicon.png and 1Blight.png to land #8',
      }
    ]
  },
  {
    title: 'Habsburg',
    fear: [
      [3, 3, 3],
      [3, 4, 3],
      [4, 5, 2],
      [4, 5, 3],
      [4, 5, 3],
      [4, 6, 3],
      [5, 6, 3],
    ],
    difficultly: [2, 3, 5, 6, 8, 9, 10],
    // invaders: [
    //   '111222233333',
    //   '111222233333',
    //   '111222233333',
    //   '111222233333',
    //   '111222233333',
    //   '111222233333',
    //   '111222233333',
    // ],
    id: 'habsburg',
    detail: {
      title: 'The Habsburg Monarchy (Livestock Colony)',
      loss: {
        name: 'Irreparable Damage',
        text: 'Track how many Blight.png come off the Blight Card during Ravages that do 8+ Damage to the land. If that number ever exceeds players, the Invaders win',
      },
      escalation: {
        name: 'Seek Prime Territory',
        text: 'After Exploring: On each board with 4 or fewer Blight.png, add 1 Townicon.png to a land without Townicon.png/Blight.png. On each board with 2 or fewer Blight.png, do so again',
      },
      levelText: [
        {
          name: 'Migratory Herders',
          text: 'After the normal Build Step: In each land matching a Build Card, Gather 1 Townicon.png from a land not matching a Build Card. (In board/land order.)',
          isHighlight: true,
        },
        {
          name: 'More Rural Than Urban',
          text: 'During Setup, on each board, add 1 Townicon.png to land #2 and 1 Townicon.png to the highest-numbered land without Setup symbols. During Play, when Invaders would Build 1 Cityicon.png in an Inland land, they instead Build 2 Townicon.png',
          isHighlight: true,
        },
        {
          name: 'Fast Spread',
          text: 'When making the Invader Deck, Remove 1 additional Stage I Card. (New deck order: 11-2222-33333)',
        },
        {
          name: 'Herds Thrive in Verdant Lands',
          text: 'Townicon.png in lands without Blight.png are Durable: they have +2 Health, and "Destroy Townicon.png" effects instead deal 2 Damage (to those Townicon.png only) per Townicon.png they could Destroy. ("Destroy all Townicon.png" works normally.)',
          isHighlight: true,
        },
        {
          name: 'Wave of Immigration',
          text: 'Before the initial Explore, put the Habsburg Reminder Card under the top 5 Invader Cards. When Revealed, on each board, add 1 Cityicon.png to a Coastal land without Cityicon.png and 1 Townicon.png to the 3 Inland lands with the fewest Blight.png',
        },
        {
          name: 'Far-Flung Herds',
          text: 'Ravages do +2 Damage (total) if any adjacent lands have Townicon.png. (This does not cause lands without Invaders to Ravage.)',
          isHighlight: true,
        },
      ],
    },
    setup: [
      {},
      {},
      {
        piece: 'Add 1Townicon.png to land #2 and 1Townicon.png to the highest-numbered land without Setup symbols',
      },
      {
        invaders: '11-2222-33333'
      },
      {},
      {
        piece: 'Put the Habsburg Reminder Card under the top 5 Invader Cards'
      },
      {}
    ]
  },
  {
    title: 'Habsburg Mining',
    fear: [
      [3, 3, 3],
      [3, 3, 3],
      [3, 3, 4],
      [3, 4, 4],
      [4, 4, 4],
      [4, 5, 4],
      [4, 5, 4],
    ],
    difficultly: [1, 3, 4, 5, 7, 9, 10],
    // invaders: [
    //   '111222233333',
    //   '111222233333',
    //   '111222233333',
    //   '111222233333',
    //   '111222233333',
    //   '111222233333',
    //   '111222233333',
    // ],
    id: 'habsburg-mining',
    detail: {
      title: 'Habsburg Mining Expedition',
      loss: {
        name: 'Land Stripped Bare',
        text: 'At the end of the Fasticon.png Phase, the Invaders win if any land has at least 8 total Invaders/Blight.png (combined).',
      },
      escalation: {
        name: 'Mining Tunnels',
        text: `After Advancing Invader Cards: On each board, Explore in 2 lands whose terrains don't match a Ravage or Build Card (no source required).`,
      },
      levelText: [
        {
          name: 'Ceaseless Mining',
          text: `When Blight added by a Ravage Action would cascade, instead Upgrade 1 Explorericon.png/Townicon.png (before Dahan counterattack.):break:
          Lands with 3 or more Invaders are Mining lands. In Mining lands::break:
          • Disease and modifiers to Disease affect Ravage Actions as though they were Build Actions.:break:
          • During the Build Step, Build Cards cause Ravage Actions (instead of Build Actions).`,
          isHighlight: true,
        },
        {
          name: 'Miners Come From Far and Wide',
          text: 'Setup: Add 1 Explorericon.png in each land with no Dahan. Add 1 Disease and 1 Cityicon.png in the highest-numbered land with a Townicon.png Setup symbol.',
        },
        {
          name: 'Mining Boom (I)',
          text: 'After the Build Step, on each board: Choose a land with Explorericon.png. Upgrade 1 Explorericon.png there',
          isHighlight: true,
        },
        {
          name: 'Untapped Salt Deposits',
          text: `Setup: Remove the Stage II 'Coastal Lands' card before randomly choosing Stage II cards. Place the 'Salt Deposits' card in place of the 2nd Stage II card.:break:
          (New Deck Order: 111-2S22-33333, where S is the Salt Deposits card. Escalation ignores S.)`,
        },
        {
          name: 'Mining Boom (II)',
          text: `Instead of Mining Boom (I), after the Build Step, on each board: Choose a land with Explorericon.png. Build there, then Upgrade 1 Explorericon.png. (Build normally in a Mining land.)`,
          isHighlight: true,
        },
        {
          name: 'The Empire Ascendant',
          text: 'Setup and During the Explore Step: On boards with 3 or fewer Blight.png: Add +1 Explorericon.png in each land successfully explored. (Max. 2 lands per board per Explore Card.)',
        },
      ],
    },
    setup: [
      {},
      {},
      {
        piece: 'Add 1Explorericon.png to each land without Dahan. Add 1Disease and 1Cityicon.png to the highest-numbered land with a Townicon.png Setup symbol',
      },
      {},
      {
        piece: `Remove the Stage II 'Coastal Lands' card before randomly choosing Stage II cards`,
        invaders: '111-2S22-33333'
      },
      {},
      {
        piece: `Initial Explore: On boards with 3 or fewer Blight.png: Add +1Explorericon.png in each land successfully explored.`
      }
    ]
  },
  {
    title: 'Russia',
    fear: [
      [3, 3, 3],
      [3, 3, 4],
      [4, 3, 4],
      [4, 4, 3],
      [4, 4, 4],
      [4, 5, 4],
      [5, 5, 4],
    ],
    difficultly: [1, 3, 4, 6, 7, 9, 11],
    // invaders: [
    //   '111222233333',
    //   '111222233333',
    //   '111222233333',
    //   '111222233333',
    //   '111222233333',
    //   '111222233333',
    //   '111222233333',
    // ],
    id: 'russia',
    detail: {
      title: 'The Tsardom of Russia',
      loss: {
        name: 'Hunters Swarm the Island',
        text: 'Put Beasts Destroyed by Adversary rules on this panel. If there are ever more Beasts on this panel than on the island, the Invaders win',
      },
      escalation: {
        name: 'Stalk the Predators',
        text: "On each board: Add 2 Explorericon.png (total) among lands with Beasts. If you can't, instead add 2 Explorericon.png among lands with Beasts on a different board",
      },
      levelText: [
        {
          name: 'Hunters Bring Home Shell and Hide',
          text: 'During Setup, on each board, add 1 Beasts and 1 Explorericon.png to the highest-numbered land without Townicon.png/Cityicon.png. During Play, Explorericon.png do +1 Damage. When Ravage adds Blight.png to a land (including cascades), Destroy 1 Beasts in that land',
          isHighlight: true,
        },
        {
          name: 'A Sense for Impending Disaster',
          text: 'The first time each Action would Destroy Explorericon.png: If possible, 1 of those Explorericon.png is instead Pushed; 1 Fear when you do so',
          isHighlight: true,
        },
        {
          name: 'Competition Among Hunters',
          text: 'Ravage Cards also match lands with 3 or more Explorericon.png. (If the land already matched the Ravage Card, it still Ravages just once.)',
          isHighlight: true,
        },
        {
          name: 'Accelerated Exploitation',
          text: 'When making the Invader Deck, put 1 Stage III Card after each Stage II Card. (New Deck Order: 111-2-3-2-3-2-3-2-33)',
        },
        {
          name: 'Entrench in the Face of Fear',
          text: 'Put an unused Stage II Invader Card under the top 3 Fear Cards, and an unused Stage III Card under the top 7 Fear Cards. When one is revealed, immediately place it in the Build space (face-up)',
        },
        {
          name: 'Pressure for Fast Profit',
          text: 'After the Ravage Step of turn 2+, on each board where it added no Blight.png: In the land with the most Explorericon.png (min. 1), add 1 Explorericon.png and 1 Townicon.png',
          isHighlight: true,
        },
      ],
    },
    setup: [
      {},
      {
        piece: 'Add 1Beasts and 1Explorericon.png to the highest-numbered land without Townicon.png/Cityicon.png'
      },
      {},
      {},
      {
        invaders: '111-2-3-2-3-2-3-2-33'
      },
      {},
      {}
    ]
  },
  {
    title: 'Scotland',
    fear: [
      [3, 3, 3],
      [3, 4, 3],
      [4, 4, 3],
      [4, 5, 3],
      [5, 5, 4],
      [5, 6, 4],
      [6, 6, 4],
    ],
    difficultly: [1, 3, 4, 6, 7, 8, 10],
    // invaders: [
    //   '111222233333',
    //   '111222233333',
    //   '111222233333',
    //   '111222233333',
    //   '111222233333',
    //   '111222233333',
    //   '111222233333',
    // ],
    id: 'scotland',
    detail: {
      title: 'The Kingdom of Scotland',
      loss: {
        name: 'Trade Hub',
        text: 'If the number of Coastal lands with Cityicon.png is ever greater than (2 x # of boards), the Invaders win',
      },
      escalation: {
        name: 'Ports Sprawl Outward',
        text: 'On the single board with the most Coastal Townicon.png/Cityicon.png, add 1 Townicon.png to the N lands with the fewest Townicon.png (N = # of players.)',
      },
      levelText: [
        {
          name: 'Trading Port',
          text: 'After Setup, in Coastal lands, Explore Cards add 1 Townicon.png instead of 1 Explorericon.png . "Coastal Lands" Invader cards do this for maximum 2 lands per board',
          isHighlight: true,
        },
        {
          name: 'Seize Opportunity',
          text: 'During Setup, add 1 Cityicon.png to land #2. Place "Coastal Lands" as the 3rd Stage II card, and move the two Stage II Cards above it up by one. (New Deck Order: 11-22-1-C2-33333, where C is the Stage II Coastal Lands Card.)',
        },
        {
          name: 'Chart the Coastline',
          text: 'In Coastal lands, Build Cards affect lands without Invaders, so long as there is an adjacent Cityicon.png',
          isHighlight: true,
        },
        {
          name: 'Ambition of a Minor Nation',
          text: 'During Setup, replace the bottom Stage I Card with the bottom Stage III Card. (New Deck Order: 11-22-3-C2-3333)',
        },
        {
          name: 'Runoff and Bilgewater',
          text: "After a Ravage Action adds Blight.png to a Coastal Land, add 1 Blight.png to that board's Ocean (without cascading). Treat the Ocean as a Coastal Wetland for this rule and for Blight.png removal/movement",
          isHighlight: true,
        },
        {
          name: 'Exports Fuel Inward Growth',
          text: 'After the Ravage step, add 1 Townicon.png to each Inland land that matches a Ravage card and is within Rangeicon.png of Townicon.png/Cityicon.png',
          isHighlight: true,
        },
      ],
    },
    setup: [
      {},
      {},
      {
        piece: 'Add 1Cityicon.png to land #2',
        invaders: '11-22-1-C2-33333'
      },
      {},
      {
        invaders: '11-22-3-C2-3333'
      },
      {},
      {}
    ]
  },
]
export const BLIGHT_CARDS: BlightCard[] = [
  {
    name: 'A Pall Upon The Land',
    isBlighted: true,
  },
  {
    name: 'All Things Weaken',
    isBlighted: true,
  },
  {
    name: 'Attenuated Essence',
    isBlighted: true,
  },
  {
    name: 'Blighted Corrodes the Spirit',
    isBlighted: true,
  },
  {
    name: 'Burn Brightest Before the End',
    isBlighted: true,
  },
  {
    name: 'Disintegrating Ecosystem',
    isBlighted: true,
  },
  {
    name: 'Downward Spiral',
    isBlighted: true,
  },
  {
    name: 'Erosion of Will',
    isBlighted: true,
  },
  {
    name: 'Intensifying Exploitation',
    isBlighted: true,
  },
  {
    name: 'Invaders Find the Land to Their Liking',
    isBlighted: false,
  },
  {
    name: 'Memory Fades to Dust',
    isBlighted: true,
  },
  {
    name: 'Power Corrodes the Spirit',
    isBlighted: true,
  },
  {
    name: 'Promising Farmlands',
    isBlighted: true,
  },
  {
    name: 'Shattered Fragments of Power',
    isBlighted: true,
  },
  {
    name: 'Slow Dissolution of Will',
    isBlighted: true,
  },
  {
    name: 'Strong Earth Shatters Slowly',
    isBlighted: false,
  },
  {
    name: 'The Border of Life and Death',
    isBlighted: false,
  },
  {
    name: 'Thriving Communities',
    isBlighted: true,
  },
  {
    name: 'Thriving Crops',
    isBlighted: false,
  },
  {
    name: 'Unnatural Proliferation',
    isBlighted: true,
  },
  {
    name: 'Untended Land Crumbles',
    isBlighted: true,
  },
]
export const EXTRA_POWERS: PowerCard[] = [
  {
    name: 'Belligerent and Aggressive Crops',
    cost: 1,
    speed: 'Slow',
    elements: ['Sun', 'Fire', 'Plant'],
    description: ''
  },
  {
    name: 'Smite the Land with Fulmination',
    cost: 2,
    speed: 'Slow',
    elements: ['Sun', 'Fire', 'Air'],
    description: ''
  }
]
export const MAP = ['A', 'B', 'C', 'D', 'E', 'F']
export const PHASE_ENUM = [
  'Grow',
  'Play Power',
  'Fast Power',
  'Blight',
  'Event',
  'Invader Action',
  'Time Passed',
]
export const CARD_RATIO = 5 / 7