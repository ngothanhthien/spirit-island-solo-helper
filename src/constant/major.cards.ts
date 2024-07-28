import type { PowerCard } from '@/types'

export const MAJOR_CARDS: Array<PowerCard> = [
  {
    name: 'The Trees and Stones Speak of War',
    cost: 2,
    speed: 'Fast',
    elements: ['Sun', 'Earth', 'Plant'],
    description: "For each Dahan in target land, 1 Damage and Defend 2. -If you have- 2 Sun, 2 Earth, 2 Plant: You may Push up to 2 Dahan, moving each's Defend with them."
  },
  {
    name: 'Entwined Power',
    cost: 2,
    speed: 'Fast',
    elements: ['Moon', 'Water', 'Plant'],
    description:
      "You and target Spirit may use each other's Presence to target Powers. Target Spirit gains a Power Card. You gain one of the power Cards they did not keep. -If you have- 2 Water, 4 Plant: You and target Spirit each gain 3 Energy and may gift the other 1 Power from hand."
  },
  {
    name: 'Flow like Water, Reach like Air',
    cost: 2,
    speed: 'Fast',
    elements: ['Air', 'Water'],
    description:
      'Target Spirit gets +2 Range with all Powers. Target Spirit may Push 1 of their Presence to an adjacent land, bringing up to 2 Explorer, 2 Town and 2 Dahan along with it. -If you have- 2 Air, 2 Water: The moved Presence may also bring along up to 2 City and up to 2 Blight.'
  },
  {
    name: 'Savage Transformation',
    cost: 2,
    speed: 'Slow',
    elements: ['Moon', 'Animal'],
    description: '2 Fear. Replace 1 Explorer with 1 Beasts. -If you have- 2 Moon, 3 Animal: Replace 1 additional Explorer with 1 Beasts in either target or adjacent land.'
  },
  {
    name: 'Tigers Hunting',
    cost: 2,
    speed: 'Fast',
    elements: ['Sun', 'Moon', 'Animal'],
    description:
      '2 Fear. Add 1 Beasts. Gather up to 1 Beasts. 1 Damage per Beasts. Push up to 2 Beasts. -If you have- 2 Sun, 2 Moon, 3 Animal: 1 Damage in an adjacent land without Blight, and +1 Damage per Beasts there.'
  },
  {
    name: "Unleash a Torrent of the Self's Own Essence",
    cost: 2,
    speed: 'Fast',
    elements: ['Sun', 'Moon', 'Fire', 'Water'],
    description: 'Gain 4 energy. You may forget a power card to gain 4 more energy. -or- Pay X energy (min. 1) to deal X damage in a land at 0 Range.  -If you have- 2 Sun, 3 Fire: You may do both.'
  },
  {
    name: 'Bargains of Power and Protection',
    cost: 2,
    speed: 'Fast',
    elements: ['Sun', 'Water', 'Earth', 'Animal'],
    description:
      'Remove 1 of your Presence on the island from the game, setting it on the Reminder Card. From now on: each Dahan within 1 Range of your Presence provides Defend 1 in its land, and you gain 1 less Energy each turn. (This effect stacks if used multiple times) -If you have- 3 Sun, 2 Water, 2 Earth: The Presence instead comes from your Presence track.'
  },
  {
    name: 'Poisoned Land',
    cost: 3,
    speed: 'Slow',
    elements: ['Earth', 'Plant', 'Animal'],
    description: '1 Fear. 7 Damage. Add 1 Blight and destroy all Dahan. -If you have- 3 Earth, 2 Plant, 2 Animal: For each Blight then present, +1 Fear and +4 Damage.'
  },
  {
    name: 'Powerstorm',
    cost: 3,
    speed: 'Fast',
    elements: ['Sun', 'Fire', 'Air'],
    description:
      'Target Spirit gains 3 Energy. Once this turn, target may Repeat a Power Card by paying its cost again. -If you have- 2 Sun, 2 Fire, 3 Air: Target may Repeat up to 2 more Power Cards by paying their costs.'
  },
  {
    name: 'The Jungle Hungers',
    cost: 3,
    speed: 'Slow',
    elements: ['Moon', 'Plant'],
    description: 'Destroy all Explorer and all Town. Destroy all Dahan. -If you have- 2 Moon, 3 Plant: Destroy 1 City. Do not destroy any Dahan.'
  },
  {
    name: 'Vigor of the Breaking Dawn',
    cost: 3,
    speed: 'Fast',
    elements: ['Sun', 'Animal'],
    description: '2 Damage per Dahan in target land. -If you have- 3 Sun, 2 Animal: You may Push up to 2 Dahan. In lands you Pushed Dahan to, 2 Damage per Dahan.'
  },
  {
    name: 'Vengeance of the Dead',
    cost: 3,
    speed: 'Fast',
    elements: ['Moon', 'Fire', 'Animal'],
    description:
      '3 Fear. After each effect that destroys Town / City / Dahan in target land, 1 Damage per Town / City / Dahan destroyed. -If you have- 3 Animal: Damage from this Power may be dealt into adjacent lands.'
  },
  {
    name: 'Wrap in Wings of Sunlight',
    cost: 3,
    speed: 'Fast',
    elements: ['Sun', 'Air', 'Animal'],
    description: 'Move up to 5 Dahan from target land to any land. Defend 5 in that land. -If you have- 2 Sun, 2 Air, 2 Animal: First, Gather up to 3 Dahan.'
  },
  {
    name: 'Winds of Rust and Atrophy',
    cost: 3,
    speed: 'Fast',
    elements: ['Air', 'Water', 'Animal'],
    description: '1 Fear and Defend 6. Replace 1 City with 1 Town or 1 Town with 1 Explorer. -If you have- 3 Air, 3 Water, 2 Animal: Repeat this Power.'
  },
  {
    name: 'Infinite Vitality',
    cost: 3,
    speed: 'Fast',
    elements: ['Earth', 'Plant', 'Animal'],
    description:
      'Dahan have +4 Health while in target land. Whenever Blight would be added to target land, instead leave it on the card. -If you have- 4 Earth: Dahan ignore Damage and Destruction effects. Remove 1 Blight from target or adjacent land.'
  },
  {
    name: 'Pent-Up Calamity',
    cost: 3,
    speed: 'Fast',
    elements: ['Moon', 'Fire', 'Earth', 'Plant', 'Animal'],
    description:
      'Add 1 Disease and 1 Strife. -or- Remove any number of Beasts / Disease / Strife / Wilds. For each token removed, 1 Fear and 3 Damage. -If you have- 2 Moon, 3 Fire: If you have removed tokens, return up to 2 of them. Otherwise, add 2 Strife.'
  },
  {
    name: 'Pyroclastic Flow',
    cost: 3,
    speed: 'Fast',
    elements: ['Fire', 'Air', 'Earth'],
    description: '2 Damage. Destroy all Explorer. If target land is Jungle / Wetland, add 1 Blight. -If you have- 2 Fire, 3 Air, 2 Earth: +4 Damage. Add 1 Wilds.'
  },
  {
    name: 'Smothering Infestation',
    cost: 3,
    speed: 'Slow',
    elements: ['Water', 'Plant'],
    description: 'Add 1 Disease. If target land is Jungle / Wetland, 2 Fear and 3 Damage. -If you have- 2 Water, 2 Plant: 1 Damage to each Invader.'
  },
  {
    name: 'Angry Bears',
    cost: 3,
    speed: 'Slow',
    elements: ['Sun', 'Fire', 'Animal'],
    description:
      '2 Fear. 2 Damage. If no Beasts are present, add 1 Beasts. Otherwise, +2 Damage, and Push up to 1 Beasts.  -If you have- 2 Fire, 3 Animal: 1 Fear and destroy 1 Explorer / Town in an adjacent land with Beasts.'
  },
  {
    name: 'Vanish Softly Away, Forgotten by All',
    cost: 3,
    speed: 'Slow',
    elements: ['Moon', 'Air'],
    description:
      'Remove 1 Invader and 1 Explorer / Town. -or- Remove all Damaged Invaders. Adversary or Scenario rules that prevent or alter Removal do not affect this Power.  -If you have- 3 Moon, 3 Air: In any 2 lands with 4 or more Invaders: Remove 1 Invader.'
  },
  {
    name: 'Settle Into Hunting-Grounds',
    cost: 3,
    speed: 'Fast',
    elements: ['Moon', 'Fire', 'Plant', 'Animal'],
    description:
      'Your Presence may count as Badlands and Beasts. (Decide per Presence, per action.) Your Presence cannot move. -If you have- 2 Plant, 3 Animal: 2 Fear and 2 Damage in one of your lands.'
  },
  {
    name: 'Voice of Command',
    cost: 3,
    speed: 'Fast',
    elements: ['Sun', 'Air'],
    description:
      '1 Damage per Dahan / Explorer, to Town / City only. Defend 2. During Ravage actions, Explorer fight alongside Dahan. (Deal / take damage at the same time, and to / from the same sources.) -If you have- 3 Sun, 2 Air: First, Gather up to 2 Explorer / Town / Dahan'
  },
  {
    name: 'Storm-Swath',
    cost: 3,
    speed: 'Slow',
    elements: ['Fire', 'Air', 'Water'],
    description:
      '2 Fear. In both origin land and target land: 1 Damage to each Invader. -If you have- 2 Fire, 3 Air, 2 Water: +1 Fear. This Power has +1 Range. In a land adjacent to both origin and target, 1 Damage to each Invader. In lands where you did Damage, destroy 1 town.'
  },
  {
    name: 'Sleep and Never Waken',
    cost: 3,
    speed: 'Fast',
    elements: ['Moon', 'Air', 'Earth', 'Animal'],
    description:
      'Invaders skip all Actions in target land. 1 Fear per 2 Explorer this Power removes. Remove up to 2 Explorer. -If you have- 3 Moon, 2 Air, 2 Animal: Remove up to 6 Explorer from among your lands.'
  },
  {
    name: 'Trees Radiate Celestial Brilliance',
    cost: 3,
    speed: 'Fast',
    elements: ['Sun', 'Moon', 'Plant'],
    description: '3 Fear. Defend 6. Invaders skip the next build. (In target land this turn.) -If you have- 3 Sun, 2 Moon, 2 Plant: 1 Damage per Sun you have.'
  },
  {
    name: 'Thickets Erupt with Every Touch of Breeze',
    cost: 3,
    speed: 'Fast',
    elements: ['Air', 'Plant'],
    description: '2 Damage. Then either: Add 3 Wilds. -or- Remove 1 Blight. -If you have- 3 Plant: 1 Fear. +2 Damage.'
  },
  {
    name: 'Accelerated Rot',
    cost: 4,
    speed: 'Slow',
    elements: ['Sun', 'Water', 'Plant'],
    description: '2 Fear. 4 Damage. -If you have- 3 Sun, 2 Water, 3 Plant: +5 Damage. Remove 1 Blight.'
  },
  {
    name: 'Terrifying Nightmares',
    cost: 4,
    speed: 'Fast',
    elements: ['Moon', 'Air'],
    description: '2 Fear. Push up to 4 Explorer / Town. -If you have- 4 Moon: +4 Fear.'
  },
  {
    name: 'Paralyzing Fright',
    cost: 4,
    speed: 'Fast',
    elements: ['Air', 'Earth'],
    description: '4 Fear. Invaders skip all Actions in target land this turn. -If you have- 2 Air, 3 Earth: +4 Fear.'
  },
  {
    name: 'The Land Thrashes in Furious Pain',
    cost: 4,
    speed: 'Slow',
    elements: ['Moon', 'Fire', 'Earth'],
    description: '2 Damage per Blight in target land. +1 Damage per Blight in adjacent lands. -If you have- 3 Moon, 3 Earth: Repeat on an adjacent land.'
  },
  {
    name: 'Indomitable Claim',
    cost: 4,
    speed: 'Fast',
    elements: ['Sun', 'Earth'],
    description:
      'Add 1 Presence in target land even if you normally could not due to land type. Defend 20. -If you have- 2 Sun, 3 Earth: 3 Fear if Invaders are present. Invaders skip all Actions in target land this turn.'
  },
  {
    name: 'Mists of Oblivion',
    cost: 4,
    speed: 'Slow',
    elements: ['Moon', 'Air', 'Water'],
    description: '1 Fear per Town / City this Power destroys (to a maximum of 4). 1 Damage to each Invader. -If you have- 2 Moon, 3 Air, 2 Water: 3 Damage.'
  },
  {
    name: 'Dissolve the Bonds of Kinship',
    cost: 4,
    speed: 'Slow',
    elements: ['Fire', 'Water', 'Animal'],
    description:
      'Replace 1 City with 2 Explorer. Replace 1 Town with 1 Explorer. Replace 1 Dahan with 1 Explorer. Push all Explorer from target land to as many different lands as possible. -If you have- 2 Fire, 2 Water, 3 Animal: Before Pushing, Explorer and Town / City do Damage to each other.'
  },
  {
    name: 'Strangling Firevine',
    cost: 4,
    speed: 'Slow',
    elements: ['Fire', 'Plant'],
    description:
      'Destroy all Explorer. Add 1 Wilds. Add 1 Wilds in the originating Sands. 1 Damage per Wilds in / adjacent to target land. -If you have- 2 Fire, 3 Plant: +1 Damage per Wilds in / adjacent to target land.'
  },
  {
    name: 'Bloodwrack Plague',
    cost: 4,
    speed: 'Fast',
    elements: ['Water', 'Earth', 'Animal'],
    description:
      'Add 2 Disease. For each Disease in target land, Defend 1 in target and all adjacent lands. -If you have- 2 Earth, 4 Animal: 2 Fear. For each Disease in target land do 1 Damage in target or an adjacent land.'
  },
  {
    name: 'Death Falls Gently from Open Blossoms',
    cost: 4,
    speed: 'Slow',
    elements: ['Moon', 'Air', 'Plant'],
    description: '4 Damage. If any Invaders remain, add 1 Disease. -If you have- 3 Air, 3 Plant: 3 Fear. Add 1 Disease to 2 adjacent lands with Invaders.'
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
      'Add 1 Blight. Add 2 Beasts. Gather up to 2 Beasts. Each Beasts deal 1 Fear, 2 Damage to Invaders and 2 Damage to Dahan. Destroy 1 Beasts. -If you have- 2 Air, 4 Animal: Repeat this Power on an adjacent land.'
  },
  {
    name: 'Instruments of their own Ruin',
    cost: 4,
    speed: 'Fast',
    elements: ['Sun', 'Fire', 'Air', 'Animal'],
    description:
      'Add 1 Strife. Each Invader with Strife deals Damage to other Invaders in target land. -If you have- 4 Sun, 2 Fire, 2 Animal: Instead, if Invaders Ravage in target land, they damage Invaders in adjacent lands instead of Dahan and the land. Dahan in target land do not fight back.'
  },
  {
    name: 'Unrelenting Growth',
    cost: 4,
    speed: 'Slow',
    elements: ['Sun', 'Fire', 'Water', 'Plant'],
    description:
      'Target Spirit adds 2 Presence and 1 Wilds to a land at 1 Range. -If you have- 3 Sun, 3 Plant: In that land, add 1 additional Wilds and remove 1 Blight. Target Spirit gains a Power Card.'
  },
  {
    name: 'Sweep into the Sea',
    cost: 4,
    speed: 'Slow',
    elements: ['Sun', 'Air', 'Water'],
    description:
      'Push all Explorer and Town one land towards the nearest Ocean. -or- If target land is Coastal, destroy all Explorer and Town. -If you have- 3 Sun, 2 Water: Repeat on an adjacent land.'
  },
  {
    name: 'Unlock the Gates of Deepest Power',
    cost: 4,
    speed: 'Fast',
    elements: ['Sun', 'Moon', 'Fire', 'Air', 'Water', 'Earth', 'Plant', 'Animal'],
    description:
      'Target Spirit gains a Major Power by drawing 2 and keeping 1, without having to Forget another Power Card. -If you have- 2 Sun, 2 Moon, 2 Fire, 2 Air, 2 Water, 2 Earth, 2 Plant, 2 Animal: Target Spirit may now play the Major Power they keep by paying half its cost (round up) OR by Forgetting it at the end of turn. It gains all elemental thresholds.'
  },
  {
    name: 'Forests of Living Obsidian',
    cost: 4,
    speed: 'Slow',
    elements: ['Sun', 'Fire', 'Earth', 'Plant'],
    description:
      'Add 1 Badlands. Push all Dahan. 1 Damage to each Invader. If the origin land is your Sacred Site, +1 Damage to each Invader.  -If you have- 2 Sun, 3 Fire, 3 Earth: Repeat this Power.'
  },
  {
    name: 'Infestation of Venomous Spiders',
    cost: 4,
    speed: 'Fast',
    elements: ['Air', 'Earth', 'Plant', 'Animal'],
    description:
      'Add 1 Beasts. Gather up to 1 Beasts. For each Beasts, 1 Fear (max. 4) and Invaders skip one Action in target land. -If you have- 2 Air, 2 Earth, 3 Animal; After this Power causes Invaders to skip an Action, 4 Damage.'
  },
  {
    name: 'Walls of Rock and Thorn',
    cost: 4,
    speed: 'Fast',
    elements: ['Sun', 'Earth', 'Plant'],
    description: '2 Damage. Defend 8. Add 1 Wilds. Isolate target land. -If you have- 2 Earth, 2 Plant: +2 Damage. +2 Defend. Add 1 Badlands.'
  },
  {
    name: 'The Wounded Wild Turns on its Assailants',
    cost: 4,
    speed: 'Slow',
    elements: ['Fire', 'Plant', 'Animal'],
    description: 'Add 2 Badlands. Gather up to 2 Beasts. 1 Damage per Blight / Beasts / Wilds. -If you have- 2 Fire, 3 Plant, 2 Animal: 2 Fear per Invader destroyed by the Power (max. 8 Fear).'
  },
  {
    name: 'Utter a Curse of Dread and Bone',
    cost: 4,
    speed: 'Slow',
    elements: ['Moon', 'Animal'],
    description:
      'For each Blight in / adjacent to target land, add 1 Badlands, 1 Disease, or 1 Strife. (Max. +3 of each.) Then: 2 Fear. 1 Damage. -If you have- 3 Moon, 2 Animal: For each type of token you added, add 1 more within 1 Range. 1 Damage in an adjacent land.'
  },
  {
    name: 'Weave Together the Fabric of Place',
    cost: 4,
    speed: 'Fast',
    elements: ['Sun', 'Moon', 'Air', 'Water', 'Earth'],
    description:
      'Target land and a land adjacent to it become a single land for this turn. (It has the terrain and land # of both lands. When this effect expires, divide pieces as you wish; all of them are considered moved.) -If you have- 4 Air: Isolate the joined land. If it has Invaders, 2 Fear, and remove up to 2 Invaders.'
  },
  {
    name: 'Melt Earth into Quicksand',
    cost: 4,
    speed: 'Fast',
    elements: ['Moon', 'Water', 'Earth'],
    description:
      '1 Fear. 2 Damage. Isolate target land. After Invaders / Dahan are Moved into target land, Destroy them.  -If you have- 2 Moon, 4 Water, 2 Earth: +4 Damage. Add 1 Badlands. Add 1 Wilds.'
  },
  {
    name: 'Cleansing Floods',
    cost: 5,
    speed: 'Slow',
    elements: ['Sun', 'Water'],
    description: '4 Damage. Remove 1 Blight. -If you have- 4 Water: +10 Damage.'
  },
  {
    name: 'Pillar of Living Flame',
    cost: 5,
    speed: 'Slow',
    elements: ['Fire'],
    description: '3 Fear. 5 Damage. If target land is Jungle / Wetland, add 1 Blight. -If you have- 4 Fire: +2 Fear and +5 Damage.'
  },
  {
    name: 'Blazing Renewal',
    cost: 5,
    speed: 'Fast',
    elements: ['Fire', 'Earth', 'Plant'],
    description:
      'Target Spirit adds 2 of their destroyed Presence into a single land, up to 2 Range from your Presence. If any Presence was added, 2 damage to each Town / City in that land. -If you have- 3 Fire, 3 Earth, 2 Plant: 4 Damage in that land.'
  },
  {
    name: 'Sea Monsters',
    cost: 5,
    speed: 'Slow',
    elements: ['Water', 'Animal'],
    description: 'Add 1 Beasts. If Invaders are present, 2 Fear per Beasts (max. 8 Fear). 3 Damage per Beasts. 1 Damage per Blight. -If you have- 3 Water, 3 Animal: Repeat this power.'
  },
  {
    name: 'Twisted Flowers Murmur Ultimatums',
    cost: 5,
    speed: 'Slow',
    elements: ['Sun', 'Moon', 'Air', 'Earth', 'Plant'],
    description: '4 Fear. Add 1 Strife. If the Terror Level is 2 or higher, remove 2 Invaders. -If you have- 3 Moon, 2 Air, 3 Plant: +3 Fear, before the Terror Level check. 3 Damage.'
  },
  {
    name: "Focus the Land's Anguish",
    cost: 5,
    speed: 'Slow',
    elements: ['Sun'],
    description: 'If this Power Destroys any Town / City, 5 Fear. Gather up to 5 Blight. 1 Damage per Blight.  -If you have- 3 Sun: +1 Damage per Blight.'
  },
  {
    name: 'Spill Bitterness into the Earth',
    cost: 5,
    speed: 'Fast',
    elements: ['Fire', 'Water', 'Earth'],
    description:
      '6 Damage. Add 2 Badlands / Strife and 1 Blight. In up to 3 adjacent lands with Blight, add 1 Badlands / Strife. -If you have- 3 Fire, 3 Water: In up to 3 adjacent lands, 1 Damage to each Invader.'
  },
  {
    name: 'Talons of Lightning',
    cost: 6,
    speed: 'Fast',
    elements: ['Fire', 'Air'],
    description: "3 Fear. 5 Damage. -If you have- 3 Fire, 3 Air: Destroy 1 Town in each adjacent land. Increase this power's Range to 3 Range."
  },
  {
    name: 'Tsunami',
    cost: 6,
    speed: 'Slow',
    elements: ['Water', 'Earth'],
    description: '2 Fear. 8 Damage. Destroy 2 Dahan. -If you have- 3 Water, 2 Earth: In each otdher Coastal land on the same board: 1 Fear, 4 Damage, and Destroy 1 Dahan.'
  },
  {
    name: 'Manifest Incarnation',
    cost: 6,
    speed: 'Slow',
    elements: ['Sun', 'Moon', 'Earth', 'Animal'],
    description:
      '6 Fear. +1 Fear for each Town / City and for each of your Presence in target land. Remove 1 City, 1 Town and 1 Explorer. Then Invaders in target land Ravage. -If you have- 3 Sun, 3 Moon: +3 Fear. Invaders do -6 Damage on their Ravage.'
  },
  {
    name: 'Dream of the Untouched Land',
    cost: 6,
    speed: 'Fast',
    elements: ['Moon', 'Water', 'Earth', 'Plant', 'Animal'],
    description:
      'Remove up to 3 Blight and up to 3 Health worth of Invaders.  -If you have- 3 Moon, 2 Water, 3 Earth, 2 Plant: (Max. 1x/game) Add a random new Island Board next to target board. Ignore its Setup icons; add 2 Beasts, 2 Wilds, 2 Badlands and up to 2 Presence (from any Spirits) anywhere on it. From now on, Build cards and "Each board / Each land" Adversary Actions skip 1 Board.'
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
    description: 'Gather 5 Town, 5 Dahan, 5 Beasts, and 15 Explorer. -If you have- 2 Sun, 3 Air, 2 Plant: Invaders skip all Actions in target land. Isolate target land.'
  },
  {
    name: 'Fire and Flood',
    cost: 7,
    speed: 'Slow',
    elements: ['Sun', 'Fire', 'Water'],
    description: '4 Damage in each target land. (Range must be measured from the same SacredSite.) -If you have- 3 Fire: +4 Damage in either target land. 3 Water: +4 Damage in either target land.'
  },
  {
    name: 'Volcanic Eruption',
    cost: 8,
    speed: 'Slow',
    elements: ['Fire', 'Earth'],
    description:
      '6 Fear. 20 Damage. Destroy all Dahan and Beasts. Add 1 Blight. -If you have- 4 Fire, 3 Earth: Destroy all Invaders. Add 1 Wilds. In each adjacent land: 10 Damage. Destroy all Dahan and Beasts. If there are no Blight, add 1 Blight.'
  },
  {
    name: 'Draw Towards a Consuming Void',
    cost: 8,
    speed: 'Slow',
    elements: [],
    description:
      'Gather 1 Explorer, Town, City, Dahan, Presence, and Beasts from each adjacent land. 4 Fear. 15 Damage. 5 Damage to Dahan. Destroy 1 Presence from each Spirit. Remove 2 Beasts. -If you have- If you have no other power cards in play: Any number of times: Forget a Minor Power, a Major Power, and a Unique Power to perform the above effects again.'
  },
  {
    name: 'Cast down into the Briny Deep',
    cost: 9,
    speed: 'Slow',
    elements: ['Sun', 'Moon', 'Water', 'Earth'],
    description:
      '6 Fear. Destroy all Invaders. -If you have- 2 Sun, 2 Moon, 4 Water, 4 Earth: Destroy the board containing target land and everything on that board. All destroyed Blight is removed from the game instead of being returned to the Blight Card.'
  },
  {
    name: 'Bargain Of Coursing Paths',
    cost: 2,
    speed: 'Fast',
    elements: ['Moon', 'Air', 'Water', 'Earth'],
    description: ''
  },
  {
    name: 'Flocking Red-Talons',
    cost: 3,
    speed: 'Fast',
    elements: ['Air', 'Water', 'Plant', 'Animal'],
    description: ''
  },
  {
    name: 'Rumbling Earthquakes',
    cost: 6,
    speed: 'Slow',
    elements: ['Fire', 'Earth'],
    description: ''
  },
  {
    name: 'Exaltation Of The Incandescent Sky',
    cost: 7,
    speed: 'Fast',
    elements: ['Sun', 'Fire', 'Air', 'Water'],
    description: ''
  },
  {
    name: 'Bombard With Boulders And Stinging Seeds',
    cost: 2,
    speed: 'Slow',
    elements: ['Air', 'Earth', 'Plant'],
    description: ''
  },
  {
    name: 'Fragments Of Yesteryear',
    cost: 7,
    speed: 'Slow',
    elements: ['Sun', 'Moon'],
    description: ''
  },
  {
    name: 'Inspire The Release Of Stolen Lands',
    cost: 4,
    speed: 'Slow',
    elements: ['Sun', 'Water', 'Plant', 'Animal'],
    description: ''
  },
  {
    name: 'Plague Ships Sail To Distant Ports',
    cost: 4,
    speed: 'Fast',
    elements: ['Fire', 'Air', 'Water', 'Animal'],
    description: ''
  },
  {
    name: 'Ravaged Undergrowth Slithers Back To Life',
    cost: 3,
    speed: 'Slow',
    elements: ['Water', 'Plant', 'Animal'],
    description: ''
  },
  {
    name: 'Solidify Echoes Of Majesty Past',
    cost: 4,
    speed: 'Fast',
    elements: ['Sun', 'Moon', 'Air', 'Earth'],
    description: ''
  },
  {
    name: 'Transformative Sacrifice',
    cost: 3,
    speed: 'Fast',
    elements: ['Moon', 'Fire', 'Water', 'Plant'],
    description: ''
  },
  {
    name: 'Unearth A Beast Of Wrathful Stone',
    cost: 5,
    speed: 'Fast',
    elements: ['Moon', 'Fire', 'Earth', 'Animal'],
    description: ''
  }
]
