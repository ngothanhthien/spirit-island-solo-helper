import type { PowerCard } from '@/types'

export const MINOR_CARDS: Array<PowerCard> = [
  {
    name: 'Savage Mawbeasts',
    cost: 0,
    speed: 'Slow',
    elements: ['Fire', 'Animal'],
    description: 'If target land is Jungle / Wetland, 1 Fear and 1 Damage. -If you have- 3 Animal: 1 Damage.'
  },
  {
    name: 'Shadows of the Burning Forest',
    cost: 0,
    speed: 'Slow',
    elements: ['Moon', 'Fire', 'Plant'],
    description: '2 Fear. If target land is Mountain / Jungle, Push 1 Explorer and 1 Town.'
  },
  {
    name: 'Sap the Strength of Multitudes',
    cost: 0,
    speed: 'Fast',
    elements: ['Water', 'Animal'],
    description: "Defend 5. -If you have- 1 Air: Increase this Power's Range by 1"
  },
  {
    name: 'Drift down into Slumber',
    cost: 0,
    speed: 'Fast',
    elements: ['Air', 'Earth', 'Plant'],
    description: 'Defend 1. If target land is Jungle / Sands, instead, Defend 4.'
  },
  {
    name: 'Land of Haunts and Embers',
    cost: 0,
    speed: 'Fast',
    elements: ['Moon', 'Fire', 'Air'],
    description: '2 Fear. Push up to 2 Explorer / Town. If target land has Blight, +2 Fear. Push up to 2 more Explorer / Town. Add 1 Blight.'
  },
  {
    name: 'Call to Isolation',
    cost: 0,
    speed: 'Fast',
    elements: ['Sun', 'Air', 'Animal'],
    description: 'Push 1 Explorer / Town per Dahan. -or- Push 1 Dahan.'
  },
  {
    name: 'Gift of Constancy',
    cost: 0,
    speed: 'Fast',
    elements: ['Sun', 'Earth'],
    description:
      'Target Spirit gains 2 Energy. At end of turn, target Spirit may Reclaim 1 Power Card instead of discarding it. If you target another Spirit, you may also Reclaim 1 Power Card instead of discarding it.'
  },
  {
    name: 'Enticing Splendor',
    cost: 0,
    speed: 'Fast',
    elements: ['Sun', 'Air', 'Plant'],
    description: 'Gather 1 Explorer / Town. -or- Gather up to 2 Dahan.'
  },
  {
    name: 'Gift of Living Energy',
    cost: 0,
    speed: 'Fast',
    elements: ['Sun', 'Fire', 'Plant'],
    description: 'Target Spirit gains 1 Energy, +1 Energy if target Spirit is not yourself. If you have at least 2 SacredSite, target Spirit gains +1 Energy.'
  },
  {
    name: 'Gift of Power',
    cost: 0,
    speed: 'Slow',
    elements: ['Moon', 'Water', 'Earth', 'Plant'],
    description: 'Gain a Minor Power Card.'
  },
  {
    name: 'Gnawing Rootbiters',
    cost: 0,
    speed: 'Slow',
    elements: ['Earth', 'Animal'],
    description: 'Push up to 2 Town.'
  },
  {
    name: 'Lure of the Unknown',
    cost: 0,
    speed: 'Fast',
    elements: ['Moon', 'Fire', 'Air', 'Plant'],
    description: 'Gather 1 Explorer / Town'
  },
  {
    name: 'Rain of Blood',
    cost: 0,
    speed: 'Slow',
    elements: ['Air', 'Water', 'Animal'],
    description: '2 Fear. If target land has at least 2 Town / City, +1 Fear.'
  },
  {
    name: 'Reaching Grasp',
    cost: 0,
    speed: 'Fast',
    elements: ['Sun', 'Air', 'Water'],
    description: 'Target Spirit gets +2 Range with all their Powers.'
  },
  {
    name: "Gold's Allure",
    cost: 0,
    speed: 'Slow',
    elements: ['Fire', 'Earth', 'Animal'],
    description: 'Gather 1 Explorer. and 1 Town. Add 1 Strife.'
  },
  {
    name: 'Here there be Monsters',
    cost: 0,
    speed: 'Slow',
    elements: ['Moon', 'Air', 'Animal'],
    description: 'You may Push 1 Explorer / Town / Dahan. 2 Fear. If target land has any Beasts, 1 Fear.'
  },
  {
    name: 'Portents of Disaster',
    cost: 0,
    speed: 'Fast',
    elements: ['Sun', 'Moon', 'Air'],
    description: '2 Fear. The next time an Invader is destroyed in target land this turn, 1 Fear.'
  },
  {
    name: 'Swarming Wasps',
    cost: 0,
    speed: 'Fast',
    elements: ['Fire', 'Air', 'Animal'],
    description: 'Add 1 Beasts. -or- If target land has Beasts, Push up to 2 Explorer.'
  },
  {
    name: 'Animated Wrackroot',
    cost: 0,
    speed: 'Slow',
    elements: ['Moon', 'Fire', 'Plant'],
    description: '1 Fear. Destroy 1 Explorer. -or- Add 1 Wilds.'
  },
  {
    name: 'Promises of Protection',
    cost: 0,
    speed: 'Fast',
    elements: ['Sun', 'Earth', 'Animal'],
    description: 'Gather up to 2 Dahan. Dahan have +2 Health while in target land.'
  },
  {
    name: 'Call to Ferocity',
    cost: 0,
    speed: 'Slow',
    elements: ['Sun', 'Fire', 'Earth'],
    description: 'Gather up to 3 Dahan. -or- If target land has Dahan, 1 Fear and Push 1 Explorer and 1 Town.'
  },
  {
    name: 'Twilight Fog brings Madness',
    cost: 0,
    speed: 'Slow',
    elements: ['Sun', 'Moon', 'Air', 'Water'],
    description: 'Add 1 Strife. Push 1 Dahan. Each remaining Dahan takes 1 Damage.'
  },
  {
    name: 'Hazards Spread Across The Island',
    cost: 0,
    speed: 'Fast',
    elements: ['Fire', 'Air', 'Earth', 'Plant'],
    description:
      'Choose a type of token from Badlands / Beasts / Disease / Strife / Wilds that exists in an adjacent land; choosing Disease costs 1 energy. Add 1 of that type of token to target land.'
  },
  {
    name: 'Carapaced Land',
    cost: 0,
    speed: 'Fast',
    elements: ['Earth', 'Plant', 'Animal'],
    description: 'If targeting a land with Beasts, this Power has +1 Range. Defend 3. -If you have- 2 Earth: Defend +3.'
  },
  {
    name: 'Call To Guard',
    cost: 0,
    speed: 'Fast',
    elements: ['Sun', 'Air', 'Earth'],
    description: 'Gather up to 1 Dahan. Then, if Dahan are present, either: Defend 1 per Dahan. -or- After Invaders are added or moved to target land, 1 Damage to each added or moved Invader.'
  },
  {
    name: "Gift of Nature's Connection",
    cost: 0,
    speed: 'Fast',
    elements: ['Any'],
    description: 'Target Spirit gains either 2 Energy or 2 of a single Element (their choice). If you target another Spirit, you gain an Element of your choice.'
  },
  {
    name: 'Mesmerized Tranquility',
    cost: 0,
    speed: 'Fast',
    elements: ['Water', 'Earth', 'Animal'],
    description: 'Isolate target land. Each Invader does -1 Damage.'
  },
  {
    name: 'Territorial Strife',
    cost: 0,
    speed: 'Slow',
    elements: ['Sun', 'Fire', 'Animal'],
    description: '3 Damage to Explorer / Town. -or- Add 1 Strife.'
  },
  {
    name: 'Sear Anger Into The Wild Lands',
    cost: 0,
    speed: 'Slow',
    elements: ['Sun', 'Fire', 'Plant'],
    description: 'Add 1 Badlands. -or- If Wilds and Invaders are present, 1 Fear and 1 Damage.'
  },
  {
    name: 'Strong And Constant Currents',
    cost: 0,
    speed: 'Fast',
    elements: ['Sun', 'Water', 'Earth'],
    description: 'Push 1 Explorer / Town to an adjacent Coastal land. -or- Move up to 2 Dahan between target land and one other Coastal land. -If you have- 2 Water: You may do both.'
  },
  {
    name: 'Sucking Ooze',
    cost: 0,
    speed: 'Fast',
    elements: ['Moon', 'Water', 'Earth'],
    description: '2 Fear if Invaders are present. Isolate target land.'
  },
  {
    name: 'Terror Turns To Madness',
    cost: 0,
    speed: 'Slow',
    elements: ['Moon', 'Air', 'Water'],
    description: 'If the Terror Level is... Terror Level 1: 3 Fear. Terror Level 2: 2 Fear or add 1 Strife. Terror Level 3: Add 1 Strife.'
  },
  {
    name: 'Treacherous Waterways',
    cost: 0,
    speed: 'Fast',
    elements: ['Fire', 'Water', 'Earth'],
    description: 'Add 1 Wilds. -or- Push 1 Explorer.'
  },
  {
    name: 'Flow Downriver, Blow Downwind',
    cost: 0,
    speed: 'Slow',
    elements: ['Air', 'Water', 'Plant'],
    description: 'Push up to 1 Blight / Explorer / Town.'
  },
  {
    name: 'Weep For What Is Lost',
    cost: 0,
    speed: 'Slow',
    elements: ['Fire', 'Water', 'Animal'],
    description: '1 Fear per type of Invader present. Push up to 1 Explorer / Town per Blight.'
  },
  {
    name: 'Voracious Growth',
    cost: 1,
    speed: 'Slow',
    elements: ['Water', 'Plant'],
    description: '2 Damage. -or- Remove 1 Blight.'
  },
  {
    name: 'Rouse the Trees and Stones',
    cost: 1,
    speed: 'Slow',
    elements: ['Fire', 'Earth', 'Plant'],
    description: '2 Damage. Push 1 Explorer.'
  },
  {
    name: 'Encompassing Ward',
    cost: 1,
    speed: 'Fast',
    elements: ['Sun', 'Water', 'Earth'],
    description: 'Defend 2 in every land where target Spirit has Presence.'
  },
  {
    name: 'Song of Sanctity',
    cost: 1,
    speed: 'Slow',
    elements: ['Sun', 'Water', 'Plant'],
    description: 'If target land has 1 Explorer, Push all Explorer. Otherwise, remove 1 Blight.'
  },
  {
    name: 'Uncanny Melting',
    cost: 1,
    speed: 'Slow',
    elements: ['Sun', 'Moon', 'Water'],
    description: 'If Invaders are present, 1 Fear. If target land is Sands / Wetland, remove 1 Blight'
  },
  {
    name: 'Steam Vents',
    cost: 1,
    speed: 'Fast',
    elements: ['Fire', 'Air', 'Water', 'Earth'],
    description: 'Destroy 1 Explorer. -If you have- 3 Earth: You may instead destroy 1 Town.'
  },
  {
    name: "Veil the Night's Hunt",
    cost: 1,
    speed: 'Fast',
    elements: ['Moon', 'Air', 'Animal'],
    description: 'Each Dahan deals 1 Damage to a different Invader. -or- Push up to 3 Dahan.'
  },
  {
    name: 'Elemental Boon',
    cost: 1,
    speed: 'Fast',
    elements: [],
    description: 'Target Spirit gains 3 different Elements of their choice. If you target another Spirit, you also gain the chosen Elements.'
  },
  {
    name: 'Devouring Ants',
    cost: 1,
    speed: 'Slow',
    elements: ['Sun', 'Earth', 'Animal'],
    description: '1 Fear. 1 Damage. Destroy 1 Dahan. If target land is Jungle / Sands, +1 Damage.'
  },
  {
    name: 'Dark and Tangled Woods',
    cost: 1,
    speed: 'Fast',
    elements: ['Moon', 'Earth', 'Plant'],
    description: '2 Fear. If target land is Mountain / Jungle, Defend 3.'
  },
  {
    name: "Nature's Resilience",
    cost: 1,
    speed: 'Fast',
    elements: ['Earth', 'Plant', 'Animal'],
    description: 'Defend 6. -If you have- 2 Water: You may instead remove 1 Blight.'
  },
  {
    name: 'Visions of Fiery Doom',
    cost: 1,
    speed: 'Fast',
    elements: ['Moon', 'Fire'],
    description: '1 Fear. Push 1 Explorer / Town. -If you have- 2 Fire: +1 Fear.'
  },
  {
    name: 'Pull Beneath the Hungry Earth',
    cost: 1,
    speed: 'Slow',
    elements: ['Moon', 'Water', 'Earth'],
    description: 'If target land has your Presence, 1 Fear and 1 Damage. If target land is Sands / Wetland, 1 Damage.'
  },
  {
    name: 'Call of the Dahan Ways',
    cost: 1,
    speed: 'Slow',
    elements: ['Moon', 'Water', 'Animal'],
    description: 'Replace 1 Explorer with 1 Dahan. -If you have- 2 Moon: You may instead replace 1 Town with 1 Dahan.'
  },
  {
    name: 'Call to Bloodshed',
    cost: 1,
    speed: 'Slow',
    elements: ['Sun', 'Fire', 'Animal'],
    description: '1 Damage per Dahan. -or- Gather up to 3 Dahan.'
  },
  {
    name: 'Call to Migrate',
    cost: 1,
    speed: 'Slow',
    elements: ['Fire', 'Air', 'Animal'],
    description: 'Gather up to 3 Dahan. Push up to 3 Dahan.'
  },
  {
    name: 'Call to Tend',
    cost: 1,
    speed: 'Slow',
    elements: ['Water', 'Plant', 'Animal'],
    description: 'Remove 1 Blight. -or- Push up to 3 Dahan.'
  },
  {
    name: "Quicken the Earth's Struggles",
    cost: 1,
    speed: 'Fast',
    elements: ['Moon', 'Fire', 'Earth', 'Animal'],
    description: '1 Damage to each Town / City. -or- Defend 10.'
  },
  {
    name: 'Delusions of Danger',
    cost: 1,
    speed: 'Fast',
    elements: ['Sun', 'Moon', 'Air'],
    description: 'Push 1 Explorer. -or- 2 Fear.'
  },
  {
    name: 'Drought',
    cost: 1,
    speed: 'Slow',
    elements: ['Sun', 'Fire', 'Earth'],
    description: 'Destroy 3 Town. 1 Damage to each Town / City. Add 1 Blight. -If you have- 3 Sun: Destroy 1 City.'
  },
  {
    name: 'Entrancing Apparitions',
    cost: 1,
    speed: 'Fast',
    elements: ['Moon', 'Air', 'Water'],
    description: 'Defend 2. If no Invaders are present, gather up to 2 Explorer.'
  },
  {
    name: 'Purifying Flame',
    cost: 1,
    speed: 'Slow',
    elements: ['Sun', 'Fire', 'Air', 'Plant'],
    description: '1 Damage per Blight. If target land is Mountain / Sands, you may instead remove 1 Blight.'
  },
  {
    name: 'Inflame the Fires of Life',
    cost: 1,
    speed: 'Slow',
    elements: ['Moon', 'Fire', 'Plant', 'Animal'],
    description: "Add 1 Disease. -or'- 1 Fear. Add 1 Strife. -If you have- 3 Animal: You may do both."
  },
  {
    name: 'Fire in the Sky',
    cost: 1,
    speed: 'Fast',
    elements: ['Sun', 'Fire', 'Air'],
    description: '2 Fear. Add 1 Strife'
  },
  {
    name: 'Fleshrot Fever',
    cost: 1,
    speed: 'Slow',
    elements: ['Fire', 'Air', 'Water', 'Animal'],
    description: '1 Fear. Add 1 Disease.'
  },
  {
    name: 'Guardian Serpents',
    cost: 1,
    speed: 'Fast',
    elements: ['Sun', 'Moon', 'Earth', 'Animal'],
    description: "Add 1 Beasts in one of target Spirit's lands. If target Spirit has a SacredSite in that land: Defend 4 there."
  },
  {
    name: 'Infested Aquifers',
    cost: 1,
    speed: 'Slow',
    elements: ['Moon', 'Water', 'Earth', 'Animal'],
    description: 'If target land has any Disease, 1 Damage to each Invader. -or- If target land is Mountain / Wetland, 1 Fear and add 1 Disease.'
  },
  {
    name: 'Poisoned Dew',
    cost: 1,
    speed: 'Slow',
    elements: ['Fire', 'Water', 'Plant'],
    description: 'Destroy 1 Explorer. If target land is Jungle / Wetland, destroy all Explorer.'
  },
  {
    name: 'Prowling Panthers',
    cost: 1,
    speed: 'Slow',
    elements: ['Moon', 'Fire', 'Animal'],
    description: '1 Fear. Add 1 Beasts. -or- If target land has Beasts, destroy 1 Explorer / Town.'
  },
  {
    name: 'Renewing Rain',
    cost: 1,
    speed: 'Slow',
    elements: ['Water', 'Earth', 'Plant'],
    description: 'If target land is Jungle / Sands, remove 1 Blight. -If you have- 3 Plant: Add 1 Wilds.'
  },
  {
    name: "Rites of the Land's Rejection",
    cost: 1,
    speed: 'Fast',
    elements: ['Moon', 'Fire', 'Earth'],
    description: 'Invaders do not Build in target land this turn. 1 Fear per Town / City or 1 Fear per Dahan, whichever is less. -or- Push up to 3 Dahan.'
  },
  {
    name: 'Pact of the Joined Hunt',
    cost: 1,
    speed: 'Slow',
    elements: ['Sun', 'Plant', 'Animal'],
    description: 'Target Spirit Gathers 1 Dahan into one of their lands. 1 Damage in that land per Dahan present.'
  },
  {
    name: 'Razor-Sharp Undergrowth',
    cost: 1,
    speed: 'Fast',
    elements: ['Moon', 'Plant'],
    description: 'Destroy 1 Explorer and 1 Dahan. Add 1 Wilds. Defend 2.'
  },
  {
    name: 'Scour the Land',
    cost: 1,
    speed: 'Slow',
    elements: ['Air', 'Earth'],
    description: 'Destroy 3 Town and all Explorer. Add 1 Blight. -If you have- 3 Air: This power may be Fast.'
  },
  {
    name: 'Sky Stretches to Shore',
    cost: 1,
    speed: 'Fast',
    elements: ['Sun', 'Air', 'Water', 'Earth'],
    description: 'This turn, target Spirit may use 1 Slow Power as if it were Fast, or vice versa. Target Spirit gains +3 Range for targeting Coastal lands only.'
  },
  {
    name: 'Absorb Corruption',
    cost: 1,
    speed: 'Slow',
    elements: ['Sun', 'Earth', 'Plant'],
    description: 'Gather 1 Blight. -or- Pay 1 Energy to remove 1 Blight. -If you have- 2 Plant: You may do both.'
  },
  {
    name: 'Call to Trade',
    cost: 1,
    speed: 'Fast',
    elements: ['Air', 'Water', 'Earth', 'Plant'],
    description: 'You may Gather 1 Dahan. If the Terror Level is 2 or lower, Gather 1 Town and the first Ravage in target land this turn becomes a Build there instead.'
  },
  {
    name: 'Confounding Mists',
    cost: 1,
    speed: 'Fast',
    elements: ['Air', 'Water'],
    description: 'Defend 4. -or- Each Invader added to target land this turn may be immediately Pushed to any adjacent land.'
  },
  {
    name: 'Cycles of Time and Tide',
    cost: 1,
    speed: 'Fast',
    elements: ['Sun', 'Moon', 'Water'],
    description: 'If there are Dahan, add 1 Dahan. If there are no Dahan, remove 1 Blight.'
  },
  {
    name: 'Disorienting Landscape',
    cost: 1,
    speed: 'Fast',
    elements: ['Moon', 'Air', 'Plant'],
    description: 'Push 1 Explorer. If target land is Mountain / Jungle, add 1 Wilds.'
  },
  {
    name: 'Elusive Ambushes',
    cost: 1,
    speed: 'Fast',
    elements: ['Sun', 'Fire', 'Water'],
    description: '1 Damage. -or- Defend 4.'
  },
  {
    name: 'Tormenting Rotflies',
    cost: 1,
    speed: 'Slow',
    elements: ['Air', 'Plant', 'Animal'],
    description: 'Add 1 Disease. -or- If target land has Invaders, 2 Fear. If Disease is present, +1 Fear. If Blight is present, +1 Fear.'
  },
  {
    name: 'Teeming Rivers',
    cost: 1,
    speed: 'Slow',
    elements: ['Sun', 'Water', 'Plant', 'Animal'],
    description: 'If target land has no Blight, add 1 Beasts. If target land has exactly 1 Blight, remove it.'
  },
  {
    name: 'Spur on with Words of Fire',
    cost: 1,
    speed: 'Fast',
    elements: ['Sun', 'Fire', 'Air'],
    description:
      'If you target a Spirit other than yourself, they gain +1 Energy. Target Spirit may immediately play another Power Card by paying its cost. (If it is Slow, it does not resolve until later.)'
  },
  {
    name: 'Bats Scout For Raids By Darkness',
    cost: 1,
    speed: 'Slow',
    elements: ['Moon', 'Air', 'Animal'],
    description: 'For each Dahan, 1 Damage to Town / City. -or- 1 Fear. Gather up to 2 Dahan.'
  },
  {
    name: 'Birds Cry Warning',
    cost: 1,
    speed: 'Fast',
    elements: ['Sun', 'Air', 'Animal'],
    description: 'The next time Dahan would be Destroyed in target land, Destroy 2 fewer Dahan. -or- Push up to 3 Dahan.'
  },
  {
    name: 'Blood Draws Predators',
    cost: 1,
    speed: 'Fast',
    elements: ['Sun', 'Fire', 'Water', 'Animal'],
    description: 'After the next time Invaders are Destroyed in target land: Add 1 Beasts, then 1 Damage per Beasts (max. 3 Damage).'
  },
  {
    name: 'Desiccating Winds',
    cost: 1,
    speed: 'Slow',
    elements: ['Fire', 'Air', 'Earth'],
    description: 'If target land has Badlands, 1 Damage. Add 1 Badlands.'
  },
  {
    name: 'Dry Wood Explodes In Smoldering Splinters',
    cost: 1,
    speed: 'Slow',
    elements: ['Fire', 'Air', 'Plant'],
    description: 'You may spend 1 Energy to make this Power Fast. 2 Fear. 1 Damage.'
  },
  {
    name: 'Entrap The Forces Of Corruption',
    cost: 1,
    speed: 'Fast',
    elements: ['Earth', 'Plant', 'Animal'],
    description: "Gather up to 1 Blight. Isolate target land. When Blight is added to target land, it doesn't cascade."
  },
  {
    name: 'Domesticated Animals Go Berserk',
    cost: 1,
    speed: 'Fast',
    elements: ['Moon', 'Fire', 'Animal'],
    description: '1 Fear. Defend 5. -If you have- 3 Moon: Add 1 Beasts.'
  },
  {
    name: 'Dire Metamorphosis',
    cost: 1,
    speed: 'Slow',
    elements: ['Moon', 'Air', 'Earth', 'Animal'],
    description: '1 Fear. 1 Damage. 1 Damage to Dahan. Add 1 Badlands, 1 Beasts, 1 Disease, 1 Strife, 1 Wilds, and 1 Blight.'
  },
  {
    name: 'Skies Herald The Season Of Return',
    cost: 1,
    speed: 'Fast',
    elements: ['Sun', 'Moon', 'Plant', 'Animal'],
    description: 'A Spirit with Presence on target board may add 1 of their Destroyed Presence. Gather up to 2 Dahan. Push 1 Blight.'
  },
  {
    name: 'Gift of Twinned Days',
    cost: 1,
    speed: 'Fast',
    elements: ['Sun', 'Moon'],
    description: "Once this turn, target Spirit may Repeat the lowest-cost Power Card they have in play by paying it's cost again. You may do likewise."
  },
  {
    name: 'Haunted By Primal Memories',
    cost: 1,
    speed: 'Fast',
    elements: ['Moon', 'Air', 'Earth'],
    description: '1 Fear. Defend 3. If Beasts are present, +2 Fear.'
  },
  {
    name: 'Like Calls to Like',
    cost: 1,
    speed: 'Slow',
    elements: ['Sun', 'Water', 'Plant'],
    description: 'If target land has Explorer, Gather up to 1 Explorer. Do likewise for Town, Dahan, Blight, and Beasts.'
  },
  {
    name: 'Unquenchable Flames',
    cost: 1,
    speed: 'Slow',
    elements: ['Moon', 'Fire', 'Earth'],
    description: '1 Fear. 1 Damage to Town / City. Invaders do not heal Damage at end of turn. -If you have- 2 Fire: Add 1 Badlands.'
  },
  {
    name: 'Renewing Boon',
    cost: 1,
    speed: 'Slow',
    elements: ['Sun', 'Earth', 'Plant'],
    description: 'Choose a land where you and target Spirit both have Presence. In that land: Remove 1 Blight, and target Spirit may add 1 of their Destroyed Presence.'
  },
  {
    name: 'Scream Disease Into The Wind',
    cost: 1,
    speed: 'Fast',
    elements: ['Air', 'Water', 'Animal'],
    description:
      'Target Spirit gets +1 Range with all their Powers. Once this turn, after target Spirit uses a Power targeting a land, they may add 1 Disease to that land. (Hand them a Disease token as a reminder.)'
  },
  {
    name: 'Set Them On An Ever-Twisting Trail',
    cost: 1,
    speed: 'Fast',
    elements: ['Air', 'Plant', 'Animal'],
    description: 'Gather or Push 1 Explorer. Isolate target land.'
  },
  {
    name: "Sunset's Fire Flows Across The Land",
    cost: 1,
    speed: 'Slow',
    elements: ['Sun', 'Moon', 'Fire', 'Water'],
    description: '1 Fear. 1 Damage. You may pay 1 Energy to deal 1 Damage in an adjacent land.'
  },
  {
    name: 'The Shore Seethes With Hatred',
    cost: 1,
    speed: 'Slow',
    elements: ['Fire', 'Water', 'Earth', 'Plant'],
    description: '1  Fear. Add 1 Badlands and 1 Wilds.'
  },
  {
    name: 'Thriving Chokefungus',
    cost: 1,
    speed: 'Slow',
    elements: ['Moon', 'Water', 'Plant'],
    description: 'Add 1 Disease and 1 Badlands.'
  },
  {
    name: 'Favor Of The Sun And Star-Lit Dark',
    cost: 1,
    speed: 'Fast',
    elements: ['Sun', 'Moon', 'Plant'],
    description: 'Defend 4. Push up to 1 Blight. -If you have- 2 Sun: 1 Fear'
  },
  {
    name: 'Roiling Bog And Snagging Thorn',
    cost: 0,
    speed: 'Fast',
    elements: ['Moon', 'Fire', 'Water', 'Plant'],
    description: ''
  }
]
