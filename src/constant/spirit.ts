import type { SpiritType } from '@/types'
import {
  setupDarkFire,
  setupDeeps,
  setupIntensify,
  setupLocus,
  setupMight,
  setupNourishing,
  setupSparking,
  setupSpreadingHostility,
  setupSunshine,
  setupTangles,
  setupTransforming,
  setupViolence,
  setupWarrior,
  setupEncircle,
  setupHaven,
  setupPandemonium,
  setupWind
} from '@/utils/setup'
import {
  addElement,
  addSwitchElement,
  energyChange,
  increaseCardPlay,
  increaseIncome,
  setupDancesUpEarthquakes,
  setupDaysThatNeverWere,
  setupGleamingHoard,
  setupHearthVigil,
  setupWoundedWaters,
  woundedWatersPresence3
} from '@/utils/spirit'
import { usePlayerCardStore } from '@/stores/PlayerCardStore'

export const SPIRIT: Array<SpiritType> = [
  {
    name: "Lightning's Swift Strike",
    cards: [
      {
        name: 'Harbingers of the Lightning',
        cost: 0,
        speed: 'Slow',
        elements: ['Fire', 'Air'],
        description: 'Push up to 2 Dahan. 1 Fear if you pushed any Dahan into a land with Town / City'
      },
      {
        name: "Lightning's Boon",
        cost: 1,
        speed: 'Fast',
        elements: ['Fire', 'Air'],
        description: 'Target Spirit may use up to 2 Slow Powers as if they were Fast Powers this turn'
      },
      {
        name: 'Shatter Homesteads',
        cost: 2,
        speed: 'Slow',
        elements: ['Fire', 'Air'],
        description: '1 Fear. Destroy 1 Town.'
      },
      {
        name: 'Raging Storm',
        cost: 3,
        speed: 'Slow',
        elements: ['Fire', 'Air', 'Water'],
        description: '1 Damage to each Invader.'
      }
    ],
    aspects: [
      {
        title: 'Immense',
        cards: [
          {
            name: 'AN IMMENSE SPIRIT, TOWERING AND SLOW',
            description:
              'Your top Presence track grants you twice as much Energy during the Spirit Phase. Any ongoing modifiers are counted after doubling.:break: Playing Power Cards during the Spirit Phase costs 2 Card Plays instead of 1. (So if you have 3 Card Plays, you will only be able to play 1 Power Card.) If you have any unused Card Plays at the end of the Spirit Phase, gain 1 Element of your choice.:break:For each Major Power you play, gain 2 different Elements of your choice.'
          }
        ]
      },
      {
        title: 'Pandemonium',
        requirements: ['Replace: Thundering Destruction'],
        cards: [
          {
            name: 'LIGHTNING-TORN SKIES INCITE PANDEMONIUM',
            description: '3Fire2Air 2 Fear. Add 1 Strife.:break:4Fire3Air 2 Fear. Add 1 Strife.:break:5Fire4Air1Moon 3 Fear. Add 1 Strife. :break:5Fire5Air2Moon 4 Fear. Add 1 Strife.',
            target: {
              speed: 'Slow',
              range: 1,
              scaredSite: true,
              targetLand: 'Invaders'
            }
          }
        ],
        setupFunction: setupPandemonium
      },
      {
        title: 'Wind',
        requirements: ['Replace: Swiftness of Lightning'],
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
              targetLand: 'Another Spirit'
            }
          }
        ],
        setupFunction: setupWind
      },
      {
        title: 'Sparking',
        requirements: ['Replace: Thundering Destruction'],
        cards: [
          {
            name: 'Gift of the Sparking Sky',
            description: `2Sun5Fire3Air Once this turn, after target Spirit uses a Power that targets a land, they may do 1 Damage to each Invader in that land. (This is their Action and gets all benefits and penalties that apply to their Powers.):break:
            2Fire2Air Target Spirit gains a Minor Power:break:
            1Sun3Fire2Air Target Spirit may play a Power Card by paying its cost. (If you target yourself, its Elements arrive too late to apply to prior thresholds of this Power.)`,
            target: {
              speed: 'Fast',
              range: null,
              scaredSite: null,
              targetLand: 'any-spirit'
            }
          }
        ],
        setupFunction: setupSparking
      }
    ],
    innate: [
      {
        name: 'Thundering Destruction',
        elements: [
          {
            Fire: 3,
            Air: 2
          },
          {
            Fire: 4,
            Air: 3
          },
          {
            Fire: 5,
            Air: 4,
            Water: 1
          },
          {
            Fire: 5,
            Air: 5,
            Water: 2
          }
        ],
        fast: false
      }
    ],
    panel: {
      presences: [
        {
          point: {
            x: 51,
            y: 30
          }
        },
        {
          point: {
            x: 58.3,
            y: 30
          },
          type: 'energy',
          value: 2
        },
        {
          point: {
            x: 65.6,
            y: 30
          }
        },
        {
          point: {
            x: 72.9,
            y: 30
          },
          type: 'energy',
          value: 3
        },
        {
          point: {
            x: 80.2,
            y: 30
          },
          type: 'energy',
          value: 4
        },
        {
          point: {
            x: 87.5,
            y: 30
          }
        },
        {
          point: {
            x: 94.7,
            y: 30
          },
          type: 'energy',
          value: 5
        },
        {
          point: {
            x: 51,
            y: 46
          },
          type: 'card-play',
          value: 3
        },
        {
          point: {
            x: 58.3,
            y: 46
          },
          type: 'card-play',
          value: 4
        },
        {
          point: {
            x: 65.6,
            y: 46
          },
          type: 'card-play',
          value: 5
        },
        {
          point: {
            x: 72.9,
            y: 46
          },
          type: 'card-play',
          value: 6
        }
      ],
      scale: 6,
      energy: 1,
      cardPlay: 2
    }
  },
  {
    name: 'River Surges In Sunlight',
    cards: [
      {
        name: 'Boon of Vigor',
        cost: 0,
        speed: 'Fast',
        elements: ['Sun', 'Water', 'Plant'],
        description: 'If you target yourself, gain 1 Energy. If you target another Spirit, they gain 1 Energy per Power Card they played this turn.'
      },
      {
        name: "River's Bounty",
        cost: 0,
        speed: 'Slow',
        elements: ['Sun', 'Water', 'Animal'],
        description: 'Gather up to 2 Dahan. If there are now at least 2 Dahan, add 1 Dahan and gain 1 Energy.'
      },
      {
        name: 'Wash Away',
        cost: 1,
        speed: 'Slow',
        elements: ['Water', 'Earth'],
        description: 'Push up to 3 Explorer / Town'
      },
      {
        name: 'Flash Floods',
        cost: 2,
        speed: 'Fast',
        elements: ['Sun', 'Water'],
        description: '1 Damage. If target land is Coastal, +1 Damage.'
      }
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
              targetLand: 'Another Spirit'
            }
          }
        ],
        setupFunction: setupSunshine
      },
      {
        title: 'Travel',
        requirements: [`Replace: River's Domain`],
        cards: [
          {
            name: `WINDS OF RENEWAL`,
            description: `After Growth, choose up to 2 Dahan among your lands. Move each of them to any land contiguously connected by your Presence.`
          },
          {
            name: 'PEOPLE TEND TO THE RIVER, RIVER TENDS TO THE PEOPLE',
            description: `Your lands with 4 or more Dahan are considered Sacred Site, and have Defend 1.`
          }
        ]
      },
      {
        title: 'Haven',
        requirements: [`Replace: Massive Flooding`],
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
              targetLand: 'Any'
            }
          }
        ],
        setupFunction: setupHaven
      }
    ],
    panel: {
      presences: [
        {
          point: {
            x: 50.1,
            y: 30
          },
          value: 2,
          type: 'energy'
        },
        {
          point: {
            x: 57.4,
            y: 30
          }
        },
        {
          point: {
            x: 64.7,
            y: 30
          },
          value: 3,
          type: 'energy'
        },
        {
          point: {
            x: 72,
            y: 30
          },
          value: 4,
          type: 'energy'
        },
        {
          point: {
            x: 79.3,
            y: 30
          }
        },
        {
          point: {
            x: 86.6,
            y: 30
          },
          value: 5,
          type: 'energy'
        },
        {
          point: {
            x: 50.1,
            y: 46
          },
          value: 2,
          type: 'card-play'
        },
        {
          point: {
            x: 57.4,
            y: 46
          }
        },
        {
          point: {
            x: 64.7,
            y: 46
          },
          value: 3,
          type: 'card-play'
        },
        {
          point: {
            x: 72,
            y: 46
          }
        },
        {
          point: {
            x: 79.3,
            y: 46
          },
          value: 4,
          type: 'card-play'
        },
        {
          point: {
            x: 86.6,
            y: 46
          },
          value: 5,
          type: 'card-play'
        }
      ],
      scale: 6,
      energy: 1,
      cardPlay: 1
    },
    innate: [
      {
        name: 'Massive Flooding',
        elements: [
          {
            Sun: 1,
            Water: 2
          },
          {
            Sun: 2,
            Water: 3
          },
          {
            Sun: 3,
            Water: 4,
            Earth: 1
          }
        ],
        fast: false
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
        description: '1 Fear. Dahan take no damage from Ravaging Invaders this turn.'
      },
      {
        name: 'Favors Called Due',
        cost: 1,
        speed: 'Slow',
        elements: ['Moon', 'Air', 'Animal'],
        description: 'Gather up to 4 Dahan. If Invaders are present and Dahan now outnumber them, 3 Fear.'
      },
      {
        name: 'Mantle of Dread',
        cost: 1,
        speed: 'Slow',
        elements: ['Moon', 'Fire', 'Air'],
        description: '2 Fear. Target Spirit may Push 1 Explorer and 1 Town from a land where it has Presence.'
      },
      {
        name: 'Crops Wither and Fade',
        cost: 1,
        speed: 'Slow',
        elements: ['Moon', 'Fire', 'Plant'],
        description: '2 Fear. Replace 1 Town with 1 Explorer. -or- Replace 1 City with 1 Town.'
      }
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
          }
        ],
        requirements: ['Replace: Shadows of the Dahan']
      },
      {
        title: 'Reach',
        requirements: ['Replace: Shadows of the Dahan'],
        cards: [
          {
            name: 'REACH THROUGH EPHEMERAL SPACE',
            description: `Once per turn, you may ignore Range.:break:
            (This can be during Growth or for a Power - anything for which there's a Range arrow or the word "Range" is used. It affects a single Action of yours.)`
          }
        ]
      },
      {
        title: 'Amorphous',
        requirements: ['Replace: Shadows of the Dahan'],
        cards: [
          {
            name: 'SHADOWS PARTAKE OF AMORPHOUS SPACE',
            description: `During each Fasticon.png Phase, you may move 1 of your Presence to an adjacent land, or to a land with Dahan anywhere on the island.:break:
            During each Slowicon.png Phase, you may move 1 of your Presence to an adjacent land, or to a land with Dahan anywhere on the island.`
          }
        ]
      },
      {
        title: 'Foreboding',
        requirements: ['Replace: Shadows of the Dahan'],
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
              targetLand: 'Any'
            }
          }
        ]
      },
      {
        title: 'Dark Fire',
        requirements: ['Replace: Shadows of the Dahan'],
        cards: [
          {
            name: 'DARK AND FIRE AS ONE',
            description: `You may treat each Moon available to you as being Fire, or vice versa. (Choose during each Action for each Moon/Fire you have.) You may discard or Forget Powers that grant Moon to pay for Fire Choice Events, and vice versa.`
          },
          {
            name: 'FRIGHTFUL SHADOWS ELUDE DESTRUCTION',
            description: `The first time each Action would destroy your Presence, you may Push 1 of those Presence instead of destroying it.:break:
            <strong>Bonus space:</strong> Fire (or Moon)`
          }
        ],
        setupFunction: setupDarkFire
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
        description: 'Push up to 4 Dahan. -or- If Invaders are Present, 2 Fear.'
      },
      {
        name: 'Words of Warning',
        cost: 1,
        speed: 'Fast',
        elements: ['Sun', 'Air', 'Animal'],
        description: 'Defend 3. During Ravage, Dahan in target land deal damage simultaneously with Invaders.'
      },
      {
        name: 'Sudden Ambush',
        cost: 2,
        speed: 'Fast',
        elements: ['Fire', 'Air', 'Animal'],
        description: 'You may Gather 1 Dahan. Each Dahan destroys 1 Explorer.'
      },
      {
        name: 'Manifestation of Power and Glory',
        cost: 3,
        speed: 'Slow',
        elements: ['Sun', 'Fire', 'Air'],
        description: '1 Fear. Each Dahan deals damage equal to the number of your Presence in target land.'
      }
    ],
    aspects: [
      {
        title: 'Warrior',
        requirements: ['Replace: Lead the Furious Assault', 'Setup: Replace 1 of your Presence with your Incarna and 1 Dahan.'],
        setupFunction: setupWarrior
      },
      {
        title: 'Tactician'
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
        description: 'Gather 1 Explorer. If target land is the Ocean, you may Gather another Explorer.'
      },
      {
        name: 'Swallow the Land-Dwellers',
        cost: 0,
        speed: 'Slow',
        elements: ['Water', 'Earth'],
        description: 'Drown 1 Explorer, 1 Town, and 1 Dahan.'
      },
      {
        name: 'Grasping Tide',
        cost: 1,
        speed: 'Fast',
        elements: ['Moon', 'Water'],
        description: '2 Fear. Defend 4.'
      },
      {
        name: 'Tidal Boon',
        cost: 1,
        speed: 'Slow',
        elements: ['Moon', 'Water', 'Earth'],
        description:
          'Target Spirit gains 2 Energy and may Push 1 Town and up to 2 Dahan from one of their lands. If Dahan are pushed to your ocean, you may move them to any Coastal land instead of Drowning them.'
      }
    ],
    aspects: [
      {
        title: 'Deeps',
        requirements: [`Replace: POUND SHIPS TO SPLINTERS`, `Replace: OCEAN BREAKS THE SHORE`],
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
              targetLand: 'Coastal'
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
              targetLand: 'Coastal'
            }
          }
        ],
        images: ['Deeps 1', 'Deeps 2'],
        setupFunction: setupDeeps
      }
    ],
    panel: {
      presences: [
        {
          point: {
            x: 51.5,
            y: 43.2
          },
          type: 'element',
          value: 'Moon'
        },
        {
          point: {
            x: 58.86,
            y: 43.2
          },
          type: 'element',
          value: 'Water'
        },
        {
          point: {
            x: 66.12,
            y: 43.2
          },
          type: 'energy',
          value: 1
        },
        {
          point: {
            x: 73.38,
            y: 43.2
          },
          type: 'element',
          value: 'Moon'
        },
        {
          point: {
            x: 80.64,
            y: 43.2
          },
          type: 'element',
          value: 'Water'
        },
        {
          point: {
            x: 87.9,
            y: 43.2
          },
          type: 'energy',
          value: 2
        },
        {
          point: {
            x: 51.5,
            y: 57
          },
          type: 'card-play',
          value: 2
        },
        {
          point: {
            x: 58.76,
            y: 57
          }
        },
        {
          point: {
            x: 66.02,
            y: 57
          },
          type: 'card-play',
          value: 3
        },
        {
          point: {
            x: 73.28,
            y: 57
          },
          type: 'card-play',
          value: 4
        },
        {
          point: {
            x: 80.54,
            y: 57
          },
          type: 'card-play',
          value: 5
        }
      ],
      scale: 6,
      energy: 0,
      cardPlay: 1
    },
    innate: [
      {
        name: 'Pound Ships to Splinters',
        elements: [
          {
            Moon: 1,
            Air: 1,
            Water: 2
          },
          {
            Moon: 2,
            Air: 1,
            Water: 3
          },
          {
            Moon: 3,
            Air: 2,
            Water: 4
          }
        ],
        fast: true
      },
      {
        name: 'Ocean Breaks the Shore',
        elements: [
          {
            Water: 2,
            Earth: 1
          },
          {
            Water: 3,
            Earth: 2
          },
          {
            Water: 4,
            Earth: 3
          }
        ],
        fast: false
      }
    ]
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
          'If target land has Dahan, gain a Major Power. If you Forget this Power, gain Energy equal to Dahan and you may play the Major Power immediately, paying its cost. -or- If Invaders are present, 2 Fear.'
      },
      {
        name: 'Dreams of the Dahan',
        cost: 0,
        speed: 'Fast',
        elements: ['Moon', 'Air'],
        description: 'Gather up to 2 Dahan. -or- If target land has Town / City, 1 Fear for each Dahan, to a maximum of 3 Fear.'
      },
      {
        name: 'Predatory Nightmares',
        cost: 2,
        speed: 'Slow',
        elements: ['Moon', 'Fire', 'Earth', 'Animal'],
        description: '2 Damage. Push up to 2 Dahan. (When your powers would destroy Invaders, instead they generate Fear and/or Push those Invaders.)'
      },
      {
        name: 'Dread Apparitions',
        cost: 2,
        speed: 'Fast',
        elements: ['Moon', 'Air'],
        description: 'When Powers generate Fear in target land, Defend 1 per Fear. 1 Fear. (Fear from To Dream a Thousand Deaths counts. Fear from destroying Town / City does not.)'
      }
    ],
    aspects: [
      {
        title: 'Enticing',
        requirements: [`Replace: Night Terrors`],
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
              targetLand: 'Any'
            }
          }
        ]
      },
      {
        title: 'Violence',
        requirements: [`Replace: Spirits May Yet Dream`],
        cards: [
          {
            name: 'NIGHTMARES OF VIOLENCE AND DEATH',
            description: `Card Plays on your bottom Presence track grant twice as many Plays during the Spirit Phase. These extra Card Plays can only be used for Power Cards with Damage or Destroy instructions.:break:
            When To Dream A Thousand Deaths generates Fear, generate +1 Fear per affected Explorericon.png/Townicon.png (to 1/3/5 Fear for Explorericon.png/Townicon.png/Cityicon.png, respectively).`
          }
        ],
        setupFunction: setupViolence
      }
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
        description: 'Push 1 Town. -or- Push 3 Dahan'
      },
      {
        name: 'Stem the Flow of Fresh Water',
        cost: 0,
        speed: 'Slow',
        elements: ['Water', 'Plant'],
        description: '1 Damage to 1 Town / City. If target land is Mountain / Sands, instead, 1 Damage to each Town / City.'
      },
      {
        name: 'Gift of Proliferation',
        cost: 1,
        speed: 'Fast',
        elements: ['Moon', 'Plant'],
        description: 'Target Spirit adds 1 Presence up to 1 Range from their Presence.'
      },
      {
        name: 'Overgrow in a Night',
        cost: 2,
        speed: 'Fast',
        elements: ['Moon', 'Plant'],
        description: 'Add 1 Presence. -or- If target land has your Presence and Invaders, 3 Fear.'
      }
    ],
    aspects: [
      {
        title: 'Tangles',
        requirements: ['Replace: Creepers Tear Into Mortar'],
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
              targetLand: 'Any'
            }
          }
        ],
        setupFunction: setupTangles
      },
      {
        title: 'Regrowth',
        requirements: ['Replace: STEADY REGENERATION', 'Replace: ALL ENVELOPING GREEN', 'Setup: Take 13 destroy_presence'],
        cards: [
          {
            name: 'Unbelievable Regrowth',
            description: `2Water3Plant This Power may target any terrain.:break:
            1Water3Plant Add 1 destroy_presence.:break:
            2Water4Plant Add 1 destroy_presence.:break:
            3Water5Plant Add 1 destroy_presence to an adjacent land.`,
            target: {
              speed: 'Slow',
              range: 1,
              scaredSite: false,
              targetLand: 'j-w'
            }
          }
        ]
      }
    ]
  },
  {
    name: 'Sharp Fangs Behind The Leaves',
    cards: [
      {
        name: 'Too Near the Jungle',
        cost: 0,
        speed: 'Slow',
        elements: ['Plant', 'Animal'],
        description: '1 Fear. Destroy 1 Explorer.'
      },
      {
        name: 'Prey on the Builders',
        cost: 1,
        speed: 'Fast',
        elements: ['Moon', 'Fire', 'Animal'],
        description: 'You may Gather 1 Beasts. If target land has Beasts, Invaders do not Build there this turn.'
      },
      {
        name: 'Teeth Gleam from Darkness',
        cost: 1,
        speed: 'Slow',
        elements: ['Moon', 'Plant', 'Animal'],
        description: '1 Fear. Add 1 Beasts. -or- If target land has both Beasts and Invaders: 3 Fear.'
      },
      {
        name: 'Terrifying Chase',
        cost: 1,
        speed: 'Slow',
        elements: ['Sun', 'Animal'],
        description: 'Push 2 Explorer / Town / Dahan. Push another 2 Explorer / Town / Dahan per Beasts in target land. If you Pushed any Invaders, 2 Fear.'
      }
    ],
    aspects: [
      {
        title: 'unconstrained',
        requirements: [`Replace: Call Forth Predators`, `Setup: Do not add a beast as part of this Spirit Setup`],
        cards: [
          {
            name: 'Unconstrained by Ravaged Lands',
            description: 'Ranging Hunt may target lands with Blight.'
          },
          {
            name: 'Predators Arise',
            description: 'Each Spirit Phase, either Prepare 1 Beasts or Add any number of your prepared Beasts to one of your lands.'
          }
        ]
      },
      {
        title: 'Encircle',
        requirements: [`Replace Special Rule: ALLY OF THE BEAST`, `Replace : RANGING HUNT`],
        cards: [
          {
            name: 'Pack Hunting',
            description: `Your Powers get plus1Rangeicon for targeting lands Beasts.`
          },
          {
            name: 'Encircle the Land',
            description: `1Plant2Animal You may Gather 1 Beasts into target or an adjacent land. If you do, 1 Damage in that land.:break:
            1Moon3Animal If at least 2 Beasts are within normal1Rangeicon (of target land), 1 Damage.:break:
            1Moon2Plant4Animal For each adjacent land with Beasts, 1 Damage.`,
            target: {
              speed: 'Slow',
              range: 1,
              scaredSite: false,
              targetLand: 'Any'
            }
          }
        ],
        setupFunction: setupEncircle
      }
    ],
    panel: {
      presences: [
        {
          point: {
            x: 51,
            y: 30
          },
          type: 'element',
          value: 'Animal'
        },
        {
          point: {
            x: 58.29,
            y: 30
          },
          type: 'element',
          value: 'Plant'
        },
        {
          point: {
            x: 65.58,
            y: 30
          },
          type: 'energy',
          value: 2
        },
        {
          point: {
            x: 72.87,
            y: 30
          },
          type: 'element',
          value: 'Animal'
        },
        {
          point: {
            x: 80.16,
            y: 30
          },
          type: 'energy',
          value: 3
        },
        {
          point: {
            x: 87.45,
            y: 30
          },
          type: 'energy',
          value: 4
        },
        {
          point: {
            x: 51,
            y: 46
          },
          type: 'card-play',
          value: 2
        },
        {
          point: {
            x: 58.29,
            y: 46
          },
          type: 'card-play',
          value: 3
        },
        {
          point: {
            x: 65.58,
            y: 46
          }
        },
        {
          point: {
            x: 72.87,
            y: 46
          },
          type: 'card-play',
          value: 4
        },
        {
          point: {
            x: 80.16,
            y: 46
          },
          type: 'card-play',
          value: 5
        }
      ],
      scale: 6,
      energy: 1,
      cardPlay: 2
    },
    innate: [
      {
        name: 'Ranging Hunt',
        elements: [
          {
            Animal: 2
          },
          {
            Plant: 2,
            Animal: 3
          },
          {
            Animal: 2
          }
        ],
        fast: true
      },
      {
        name: 'Frenzied Assault',
        elements: [
          {
            Moon: 1,
            Fire: 1,
            Animal: 4
          },
          {
            Animal: 5,
            Fire: 2,
            Moon: 1
          }
        ],
        fast: false
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
          "Target Spirit gains 1 Energy. Target Spirit does +1 Damage with each Damage dealing Power they use this turn. (Powers which damage multiple lands or each Invader only get 1 extra damage total. Repeated Powers keep the +1 boost. Destroy effects don't get any bonus.)"
      },
      {
        name: 'Threatening Flames',
        cost: 0,
        speed: 'Fast',
        elements: ['Fire', 'Plant'],
        description: '2 Fear. Push 1 Explorer / Town per Terror Level from target land to adjacent lands without your Presence. If there are no such adjacent lands, +2 Fear.'
      },
      {
        name: 'Flash-Fires',
        cost: 2,
        speed: 'Slow',
        elements: ['Fire', 'Air'],
        description: '1 Fear. 1 Damage. -If you have- 2 Air: This Power is Fast.'
      },
      {
        name: 'Asphyxiating Smoke',
        cost: 2,
        speed: 'Slow',
        elements: ['Fire', 'Air', 'Plant'],
        description: '1 Fear. Destroy 1 Town. Push 1 Dahan.'
      }
    ],
    aspects: [
      {
        title: 'Transforming',
        requirements: ['Replace: THE BURNED LAND REGROWS'],
        cards: [
          {
            name: 'TRANSFORM RATHER THAN CONSUME',
            description: `When your Actions would Destroy City (including by Damage), instead:
            2 Fear. Replace that City with 1 Town and 1 Explorer. Push both Invaders.:break:
            When your Actions would Destroy Town (including by Damage), instead:
            1 Fear. Replace that Town with 2 Explorer. Push both Invaders.`
          },
          {
            name: 'EXALTATION OF THE TRANSFORMING FLAME',
            description: `4Fire 1Plant Target Spirit may Forget a Power Card to gain a Power Card and 1 Any Element. You may do likewise.:break:
            3Fire 1Earth 2Plant Target Spirit may pay 1 Energy to Replace 1 Blight with 1 Badlands in one of their lands. You may do likewise.:break:
            1Sun 3Fire 1 Animal Target Spirit may Replace 1 Explorer with 1 Beasts in one of their lands. You may do likewise.`,
            target: {
              speed: 'Fast',
              range: null,
              scaredSite: null,
              targetLand: 'Another Spirit'
            }
          }
        ],
        setupFunction: setupTransforming
      }
    ],
    panel: {
      presences: [
        {
          point: {
            x: 51.2,
            y: 30.7
          },
          type: 'element',
          value: 'Fire'
        },
        {
          point: {
            x: 58.55,
            y: 30.7
          },
          type: 'energy',
          value: 1
        },
        {
          point: {
            x: 65.8,
            y: 30.7
          },
          type: 'energy',
          value: 2
        },
        {
          point: {
            x: 73.25,
            y: 30.7
          },
          type: 'element',
          value: 'Fire',
          callback: (reverse: boolean) => {
            addElement('Plant', reverse)
          }
        },
        {
          point: {
            x: 80.6,
            y: 30.7
          },
          value: 3,
          type: 'energy'
        },
        {
          point: {
            x: 51.2,
            y: 46.6
          },
          type: 'element',
          value: 'Fire'
        },
        {
          point: {
            x: 58.55,
            y: 46.6
          },
          type: 'card-play',
          value: 2
        },
        {
          point: {
            x: 65.8,
            y: 46.6
          },
          type: 'card-play',
          value: 3
        },
        {
          point: {
            x: 73.2,
            y: 46.6
          },
          type: 'element',
          value: 'Fire'
        },
        {
          point: {
            x: 80.4,
            y: 46.6
          },
          type: 'card-play',
          value: 4
        }
      ],
      scale: 6,
      energy: 0,
      cardPlay: 1
    },
    innate: [
      {
        name: 'Firestorm',
        elements: [
          {
            Plant: 1
          },
          {
            Plant: 3
          },
          {
            Fire: 4,
            Air: 2
          },
          {
            Fire: 7
          }
        ],
        fast: true
      },
      {
        name: 'The Burned Land Regrows',
        elements: [
          {
            Fire: 4,
            Plant: 1
          },
          {
            Fire: 4,
            Plant: 2
          },
          {
            Fire: 5,
            Earth: 2,
            Plant: 2
          }
        ],
        fast: false
      }
    ]
  },
  {
    name: 'Grinning Trickster Stirs Up Trouble',
    cards: [
      {
        name: 'Unexpected Tigers',
        cost: 0,
        speed: 'Slow',
        elements: ['Moon', 'Fire', 'Animal'],
        description: '1 Fear if Invaders are present. If you can gather 1 Beasts, do so, then push 1 Explorer. Otherwise, add 1 Beasts.'
      },
      {
        name: 'Impersonate Authority',
        cost: 0,
        speed: 'Slow',
        elements: ['Sun', 'Air', 'Animal'],
        description: 'Add 1 Strife.'
      },
      {
        name: 'Incite the Mob',
        cost: 1,
        speed: 'Slow',
        elements: ['Moon', 'Fire', 'Air', 'Animal'],
        description: '1 Invader with Strife deals Damage to other Invaders (not to each Invader). 1 Fear per Invader this Power Destroyed.'
      },
      {
        name: 'Overenthusiastic Arson',
        cost: 1,
        speed: 'Fast',
        elements: ['Fire', 'Air'],
        description: 'Destroy 1 Town. Discard the top card of the Minor Power Deck. If it provides Fire: 1 Fear, 2 Damage, and add 1 Blight.'
      }
    ],
    panel: {
      presences: [
        {
          point: {
            x: 51.5,
            y: 28.3
          },
          type: 'element',
          value: 'Moon'
        },
        {
          point: {
            x: 59.08,
            y: 28.3
          },
          value: 2,
          type: 'energy'
        },
        {
          point: {
            x: 66.66,
            y: 28.3
          },
          type: 'element',
          value: 'Any'
        },
        {
          point: {
            x: 74.24,
            y: 28.3
          },
          type: 'element',
          value: 'Fire'
        },
        {
          point: {
            x: 81.82,
            y: 28.3
          },
          type: 'energy',
          value: 3
        },
        {
          point: {
            x: 51.5,
            y: 42.4
          }
        },
        {
          point: {
            x: 59.08,
            y: 42.4
          },
          type: 'card-play',
          value: 3
        },
        {
          point: {
            x: 66.66,
            y: 42.4
          }
        },
        {
          point: {
            x: 74.24,
            y: 42.4
          },
          type: 'card-play',
          value: 4
        },
        {
          point: {
            x: 81.82,
            y: 42.4
          },
          type: 'element',
          value: 'Air'
        },
        {
          point: {
            x: 89.4,
            y: 42.4
          },
          type: 'card-play',
          value: 5
        }
      ],
      scale: 6,
      energy: 1,
      cardPlay: 2
    },
    innate: [
      {
        name: "Let's See What Happens",
        elements: [
          {
            Moon: 1,
            Fire: 1,
            Air: 2
          },
          {
            Moon: 2,
            Fire: 1,
            Air: 2
          }
        ],
        fast: true
      },
      {
        name: "Why Don't You and Them Fight",
        elements: [
          {
            Moon: 3
          },
          {
            Air: 3
          },
          {
            Sun: 3,
            Fire: 3
          },
          {
            Animal: 3
          }
        ],
        fast: true
      }
    ]
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
          '2 Fear if Invaders are present. When Presence in target land would be Destroyed, its owner may, if possible, instead Push that Presence. You may Gather 1 Presence / Sacred Site of another Spirit (with their permission).'
      },
      {
        name: 'The Fog Closes In',
        cost: 1,
        speed: 'Slow',
        elements: ['Moon', 'Air', 'Water'],
        description: 'For each adjacent land with your Presence, 1 Damage to a different Invader. Push 2 Dahan.'
      },
      {
        name: 'Unnerving Pall',
        cost: 1,
        speed: 'Fast',
        elements: ['Moon', 'Air', 'Animal'],
        description: '1 Fear. Up to 3 damaged Invaders do not participate in Ravage. -or- 1 Fear. Defend 1 per Presence you have in target land (when this Power is used).'
      },
      {
        name: 'Dissolving Vapors',
        cost: 2,
        speed: 'Slow',
        elements: ['Air', 'Water'],
        description: '1 Fear. 1 Damage to each Invader. 1 Damage to each Dahan.'
      }
    ],
    aspects: [
      {
        title: 'Stranded',
        requirements: [`Replace: Mists Shift and Flow`],
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
    ],
    panel: {
      presences: [
        {
          point: {
            x: 49.5,
            y: 29.5
          },
          value: 1,
          type: 'energy'
        },
        {
          point: {
            x: 57.1,
            y: 29.5
          },
          type: 'element',
          value: 'Water'
        },
        {
          point: {
            x: 64.7,
            y: 29.5
          },
          type: 'energy',
          value: 2
        },
        {
          point: {
            x: 72.3,
            y: 29.5
          },
          type: 'element',
          value: 'Air'
        },
        {
          point: {
            x: 49.5,
            y: 45.77
          },
          type: 'card-play',
          value: 2
        },
        {
          point: {
            x: 57.1,
            y: 45.77
          }
        },
        {
          point: {
            x: 64.7,
            y: 45.77
          },
          type: 'element',
          value: 'Moon'
        },
        {
          point: {
            x: 72.3,
            y: 45.77
          },
          type: 'card-play',
          value: 3
        },
        {
          point: {
            x: 79.9,
            y: 45.77
          },
          type: 'card-play',
          value: 4
        },
        {
          point: {
            x: 87.5,
            y: 45.77
          }
        },
        {
          point: {
            x: 95.1,
            y: 45.77
          },
          type: 'card-play',
          value: 5
        }
      ],
      scale: 6,
      energy: 0,
      cardPlay: 1
    },
    innate: [
      {
        name: 'Suffocating Shroud',
        elements: [
          {
            Water: 1,
            Air: 2,
            Moon: 1
          },
          {
            Moon: 2,
            Air: 3,
            Water: 2
          },
          {
            Water: 3,
            Air: 4,
            Moon: 4
          },
          {
            Moon: 5,
            Air: 6,
            Water: 4
          }
        ],
        fast: false
      },
      {
        name: 'Lost in the Swirling Haze',
        elements: [
          {
            Air: 1,
            Water: 2
          },
          {
            Air: 2,
            Water: 3
          },
          {
            Air: 3,
            Water: 4
          }
        ],
        fast: false
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
          "Cost to Use: Target Spirit Removes 1 of their Destroyed Presence from the game. 1 Fear and 1 Damage in one of target Spirit's lands. (This is your Power, so Blight counts as Badlands, even if target is another Spirit.)"
      },
      {
        name: 'Plaguebearers',
        cost: 1,
        speed: 'Slow',
        elements: ['Fire', 'Water', 'Animal'],
        description: '1 Fear if Invaders are present. For each Disease, Push 2 Explorer / Town / Dahan. 1 Disease may move with each Pushed piece.'
      },
      {
        name: 'Fetid Breath Spreads Infection',
        cost: 2,
        speed: 'Slow',
        elements: ['Air', 'Water', 'Animal'],
        description: '1 Fear. Add 1 Disease.'
      },
      {
        name: 'Strike Low with Sudden Fevers',
        cost: 2,
        speed: 'Fast',
        elements: ['Fire', 'Air', 'Earth', 'Animal'],
        description: '1 Fear. Invaders skip Ravage Actions.'
      }
    ],
    panel: {
      presences: [
        {
          point: {
            x: 51.6,
            y: 29.5
          },
          type: 'energy',
          value: 2
        },
        {
          point: {
            x: 59.2,
            y: 29.5
          },
          type: 'element',
          value: 'Animal'
        },
        {
          point: {
            x: 66.7,
            y: 29.5
          },
          type: 'energy',
          value: 3
        },
        {
          point: {
            x: 74.3,
            y: 29.5
          },
          type: 'energy',
          value: 4
        },
        {
          point: {
            x: 51.6,
            y: 45.8
          },
          value: 2,
          type: 'card-play'
        },
        {
          point: {
            x: 59.2,
            y: 45.8
          },
          type: 'element',
          value: 'Fire'
        },
        {
          point: {
            x: 66.8,
            y: 45.8
          }
        },
        {
          point: {
            x: 74.4,
            y: 45.8
          },
          type: 'card-play',
          value: 3
        },
        {
          point: {
            x: 82,
            y: 45.8
          }
        },
        {
          point: {
            x: 89.6,
            y: 45.8
          },
          type: 'card-play',
          value: 4
        }
      ],
      scale: 6,
      energy: 1,
      cardPlay: 1
    },
    innate: [
      {
        name: 'Epidemics Run Rampant',
        elements: [
          {
            Fire: 1,
            Animal: 3
          },
          {
            Fire: 2,
            Water: 1,
            Animal: 4
          },
          {
            Fire: 3,
            Animal: 5,
            Water: 3
          }
        ],
        fast: true
      },
      {
        name: 'Savage Revenges',
        elements: [
          {
            Air: 3
          },
          {
            Fire: 3,
            Animal: 1
          },
          {
            Fire: 4,
            Animal: 2
          },
          {
            Fire: 5,
            Air: 2,
            Animal: 2
          }
        ],
        fast: false
      }
    ]
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
          "Cost to Use: N Time, and Spirits jointly pay N Energy (where N = # of players). Swap the top card of the Invader Deck with a card in the Invader discard that is within 1 Invader Stage of it. (The discarded card stays face-down. You can't swap cards that don't exist.)"
      },
      {
        name: 'Absolute Stasis',
        cost: 1,
        speed: 'Fast',
        elements: ['Sun', 'Air', 'Earth'],
        description:
          'Cost to Use: 1 Time. Until the end of the Slow phase, target land and everything in it cease to exist for all purposes except checking victory/defeat. (You cannot target into, out of, or through where the land was.) This cannot target an Ocean even if Oceans are in play.'
      },
      {
        name: 'Pour Time Sideways',
        cost: 1,
        speed: 'Fast',
        elements: ['Moon', 'Air', 'Water'],
        description:
          'Cost to Use: 3 Time. Move 1 of your Presence to a different land with your Presence. On the board moved from: During the Invader Phase, Resolve Invader and "Each board / Each land..." Actions one fewer time. On the board moved to: During the Invader Phase, Resolve Invader and "Each board / Each Land..." Actions one more time.'
      },
      {
        name: 'Blur the Arc of Years',
        cost: 1,
        speed: 'Fast',
        elements: ['Sun', 'Moon', 'Air'],
        description:
          'If no Dahan / Invaders are present: Remove 1 Blight. If invaders are present: they Build, then Ravage. If Dahan are present: Add 1 Dahan. Push up to 2 Dahan. You may repeat this power (once) on the same land by spending 1 Time.'
      }
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
        description: 'Prepare 1 Element Marker. Discard up to 3 Element Markers. Target Spirit gains those Elements. (They can be any combination of Elements - the same or different.)'
      },
      {
        name: 'Share Secrets of Survival',
        cost: 0,
        speed: 'Fast',
        elements: ['Sun', 'Air', 'Earth'],
        description: 'Each time Dahan would be Destroyed in target land, Destroy 2 fewer Dahan. -or- Gather up to 2 Dahan.  -If you have- 3 Air: You may do both.'
      },
      {
        name: "Study the Invaders' Fears",
        cost: 0,
        speed: 'Fast',
        elements: ['Moon', 'Air', 'Animal'],
        description: '2 Fear. Turn the top card of the Fear Deck face-up.'
      },
      {
        name: 'Boon of Ancient Memories',
        cost: 1,
        speed: 'Slow',
        elements: ['Moon', 'Water', 'Earth', 'Plant'],
        description: "If you target yourself, gain a Minor Power. Otherwise: Target Spirit gains a Power Card. If it's a Major Power, they may pay 2 Energy instead of Forgetting a Power Card."
      }
    ],
    aspects: [
      {
        title: 'Mentor',
        requirements: ['Replace: LONG AGES OF KNOWLEDGE', 'Replace: OBSERVE THE EVER-CHANGING WORLD'],
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
              targetLand: 'Another Spirit'
            }
          }
        ]
      },
      {
        title: 'Intensify',
        requirements: [`Replace: Insights into the World's Nature`],
        setupFunction: setupIntensify
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
        description: 'At end of turn after discarding: Reclaim up to 2 cards to your hand. You may then Forget a Unique Power Card to Reclaim up to 3 additional cards.'
      },
      {
        name: 'Shape the Self Anew',
        cost: 0,
        speed: 'Slow',
        elements: ['Moon'],
        description: 'Gain a Minor Power. You may Forget this Power Card to gain 3 Energy.  -If you have- 4 Moon: You may gain a Major Power instead of a Minor Power.'
      },
      {
        name: 'Boon of Reimagining',
        cost: 1,
        speed: 'Slow',
        elements: ['Moon'],
        description: 'Target Spirit may Forget a Power Card from hand or discard. If they do, they draw 6 Minor Power Cards and gain 2 of them. If you target another Spirit, they gain 1 Energy.'
      },
      {
        name: 'Peace of the Nighttime Sky',
        cost: 1,
        speed: 'Fast',
        elements: ['Moon'],
        description: 'If the Terror Level is 1, Invaders do not Ravage in target land this turn. You may Repeat this Power. If you do, Forget this Power Card and Gain 1 Moon.'
      }
    ],
    innate: [
      {
        name: 'Air Moves, Earth Endures',
        elements: [
          {
            Air: 3
          },
          {
            Earth: 3
          }
        ],
        fast: true
      },
      {
        name: 'Fire Burns, Water Soothes',
        elements: [
          {
            Fire: 3
          },
          {
            Water: 3
          }
        ],
        fast: false
      },
      {
        name: 'Wood Seeks Growth, Humans Seek Freedom',
        elements: [
          {
            Plant: 3
          },
          {
            Animal: 3
          }
        ],
        fast: false
      },
      {
        name: 'Sidereal Guidance',
        elements: [
          {
            Moon: 2
          },
          {
            Moon: 3
          }
        ],
        fast: false
      },
      {
        name: 'Stars Blaze in the Daytime Sky',
        elements: [
          {
            Sun: 4
          }
        ],
        fast: false
      }
    ],
    panel: {
      presences: [
        {
          point: {
            x: 36.6,
            y: 23.5
          },
          type: 'another'
        },
        {
          type: 'another',
          point: {
            x: 36.6,
            y: 36.2
          }
        },
        {
          type: 'another',
          point: {
            x: 35.3,
            y: 47.7
          },
          callback: (reverse) => {
            energyChange(1, reverse)
          }
        },
        {
          type: 'another',
          point: {
            x: 42.8,
            y: 47.7
          },
          callback: (reverse) => {
            energyChange(1, reverse)
          }
        },
        {
          type: 'another',
          point: {
            x: 42.8,
            y: 61.8
          },
          callback: (reverse) => {
            energyChange(1, reverse)
          }
        },
        {
          type: 'another',
          point: {
            x: 35.3,
            y: 61.8
          },
          callback: (reverse) => {
            energyChange(1, reverse)
          }
        },
        {
          type: 'energy',
          value: 2,
          point: {
            x: 50.1,
            y: 77.5
          }
        },
        {
          type: 'another',
          point: {
            x: 57.6,
            y: 77.5
          }
        },
        {
          type: 'energy',
          value: 4,
          point: {
            x: 65.2,
            y: 77.5
          }
        },
        {
          type: 'another',
          point: {
            x: 50.1,
            y: 91
          }
        },
        {
          type: 'another',
          point: {
            x: 57.6,
            y: 91
          }
        },
        {
          type: 'card-play',
          value: 3,
          point: {
            x: 65.2,
            y: 91
          }
        }
      ],
      scale: 6,
      energy: 1,
      cardPlay: 2
    }
  },
  {
    name: "Stone's Unyielding Defiance",
    cards: [
      {
        name: 'Jagged Shards Push from the Earth',
        cost: 0,
        speed: 'Slow',
        elements: ['Fire', 'Earth'],
        description: 'Add 1 Badlands. Push up to 2 Dahan.'
      },
      {
        name: 'Stubborn Solidity',
        cost: 1,
        speed: 'Fast',
        elements: ['Sun', 'Earth', 'Animal'],
        description: "Defend 1 per Dahan. Dahan in target land cannot be changed. (When they would be Damaged, Destroyed, Removed, Replaced, or moved, instead don't)"
      },
      {
        name: 'Scarred and Stony Land',
        cost: 2,
        speed: 'Slow',
        elements: ['Moon', 'Earth'],
        description: '2 Damage. Add 1 Badlands. Remove 1 Blight in target land from the game. (It goes to the box, not the Blight Card.)'
      },
      {
        name: 'Plows Shatter on Rocky Ground',
        cost: 2,
        speed: 'Slow',
        elements: ['Earth'],
        description: '1 Damage to each Town / City. Push up to 1 Town. -or- Destroy 1 Town.'
      }
    ]
  },
  {
    name: 'Lure Of The Deep Wilderness',
    cards: [
      {
        name: 'Gift of the Untamed Wild',
        cost: 0,
        speed: 'Slow',
        elements: ['Moon', 'Fire', 'Air', 'Plant'],
        description: 'Target Spirit chooses to either: add 1 Wilds to one of their lands. -or- Replace 1 of their Presence with 1 Disease.'
      },
      {
        name: 'Perils of the Deepest Island',
        cost: 1,
        speed: 'Slow',
        elements: ['Moon', 'Plant', 'Animal'],
        description: '1 Fear. Add 1 Badlands. Add 1 Beasts within 1 Range. Push up to 2 Dahan.'
      },
      {
        name: 'Swallowed by the Wilderness',
        cost: 1,
        speed: 'Fast',
        elements: ['Fire', 'Air', 'Plant', 'Animal'],
        description: '2 Fear. 1 Damage per Beasts / Disease / Wilds / Badlands. (Count max. 5 tokens.)'
      },
      {
        name: 'Softly Beckon Ever Inward',
        cost: 2,
        speed: 'Slow',
        elements: ['Moon', 'Air'],
        description: 'Gather up to 2 Explorer. Gather up to 2 Town. Gather up to 2 Beasts. Gather up to 2 Dahan.'
      }
    ],
    aspects: [
      {
        title: 'Lair',
        requirements: ['Setup: Put Lair in an Inland land on your starting board. Remove 3 Presence.', 'Replace: FORSAKE SOCIETY TO CHASE AFTER DREAMS', 'Replace: ENTHRALL THE FOREIGN EXPLORERS'],
        cards: [
          {
            name: 'A SINGLE ALLURING LAIR',
            description: `Invaders/Dahan/Beasts/Presence (of any Spirit) at Lair can't move. (You can reposition Lair by adding it with your second Growth option instead of adding Presence.):break:
            6 Explorer and 3 Dahan at Lair don't participate in Ravage. (They don't deal Damage or take Damage.)`
          },
          {
            name: 'SOCIETY DISSOLVES AT THE BECKONING HEART',
            description: `1Moon For every 3 Explorer/Dahan, Downgrade a different Town/City.:break:
            3Moon 1Air Gather 1 Explorer/Town and 1 Dahan:break:
            4Moon 1Air Once for every 6 Explorer/Dahan present (at Lair)::break:
            Gather any invader within air_range one land towards Lair.`
          }
        ],
        faq: [
          {
            title: 'There is no way to bring back the Lair.',
            description: null,
            links: [
              'https://querki.net/u/darker/spirit-island-faq/#!incarna-that-cannot-be-returned-to-play',
              'https://boardgamegeek.com/thread/3156615/two-questions-about-lair-adding-it-and-moving-it'
            ]
          },
          {
            title: 'Any effect that move presence cannot move Lair.',
            description:
              "As rule have mentioned: Invaders/Dahan/Beasts/Presence (of any Spirit) at your Incarna can't move. (You can reposition your Incarna by adding it with your second Growth option instead of adding Presence.)",
            links: ['https://boardgamegeek.com/thread/3156615/two-questions-about-lair-adding-it-and-moving-it']
          },
          {
            title: 'The final threshold of the Lair Aspect allow move an Invader more than once.',
            description: 'If at least 12 Explorers/Dahan are present, the Gathers are resolved sequentially, you can choose the same Invader each time to be the one being gathered',
            links: ['https://querki.net/u/darker/spirit-island-faq/#!lair-gathering-an-invader-multiple-times']
          }
        ]
      }
    ]
  },
  {
    name: 'Many Minds Move As One',
    cards: [
      {
        name: 'Pursue with Scratches, Pecks, and Stings',
        cost: 0,
        speed: 'Fast',
        elements: ['Sun', 'Fire', 'Air', 'Animal'],
        description: '1 Fear. For each Beasts past the first, Push 1 Explorer / Town.'
      },
      {
        name: 'A Dreadful Tide of Scurrying Flesh',
        cost: 0,
        speed: 'Fast',
        elements: ['Moon', 'Air', 'Water', 'Animal'],
        description: 'Remove up to half (round down) of Beasts in target land. For each Beasts Removed, 2 Fear and skip one Invader Action.'
      },
      {
        name: 'Boon of Swarming Bedevilment',
        cost: 0,
        speed: 'Fast',
        elements: ['Air', 'Water', 'Animal'],
        description: "For the rest of this turn, each of target Spirit's Presence grants Defend 1 in its land. Target Spirit may Push up to 1 of their Presence."
      },
      {
        name: 'Guide the Way on Feathered Wings',
        cost: 0,
        speed: 'Fast',
        elements: ['Sun', 'Air', 'Animal'],
        description: 'Move 1 Beasts up to two lands. As it moves, up to 2 Dahan may move with it, for part or all of the way. (The Beasts / Dahan may move to an adjacent land and then back.)'
      },
      {
        name: 'Ever-Multiplying Swarm',
        cost: 1,
        speed: 'Slow',
        elements: ['Fire', 'Earth', 'Animal'],
        description: 'Add 2 Beasts.'
      }
    ],
    panel: {
      presences: [
        {
          point: {
            x: 51.5,
            y: 29.6
          },
          value: 1,
          type: 'energy'
        },
        {
          point: {
            x: 59.1,
            y: 29.6
          },
          value: 'Air',
          type: 'element'
        },
        {
          point: {
            x: 66.7,
            y: 29.6
          },
          value: 2,
          type: 'energy'
        },
        {
          point: {
            x: 74.3,
            y: 29.6
          },
          value: 'Animal',
          type: 'element'
        },
        {
          point: {
            x: 81.9,
            y: 29.6
          },
          value: 3,
          type: 'energy'
        },
        {
          point: {
            x: 89.5,
            y: 29.6
          },
          value: 4,
          type: 'energy'
        },
        {
          point: {
            x: 51.5,
            y: 45.7
          },
          value: 2,
          type: 'card-play'
        },
        {
          point: {
            x: 59.1,
            y: 45.7
          }
        },
        {
          point: {
            x: 66.7,
            y: 45.7
          },
          value: 3,
          type: 'card-play'
        },
        {
          point: {
            x: 74.3,
            y: 45.7
          }
        },
        {
          point: {
            x: 81.9,
            y: 45.7
          },
          value: 4,
          type: 'card-play'
        },
        {
          point: {
            x: 89.5,
            y: 45.7
          },
          value: 5,
          type: 'card-play'
        }
      ],
      scale: 6,
      energy: 0,
      cardPlay: 1
    },
    innate: [
      {
        name: 'The Teeming Host Arrives',
        elements: [
          {
            Air: 2,
            Animal: 1
          },
          {
            Air: 3,
            Water: 1,
            Animal: 2
          },
          {
            Fire: 1,
            Air: 4,
            Animal: 2
          }
        ],
        fast: true
      },
      {
        name: 'Beset and Confound the Invaders',
        elements: [
          {
            Air: 1,
            Animal: 2
          },
          {
            Air: 2,
            Animal: 3
          },
          {
            Air: 3,
            Animal: 4
          },
          {
            Air: 4,
            Animal: 5,
            Earth: 1
          }
        ],
        fast: true
      }
    ]
  },
  {
    name: 'Downpour Drenches The World',
    cards: [
      {
        name: 'Unbearable Deluge',
        cost: 0,
        speed: 'Fast',
        elements: ['Air', 'Water', 'Earth'],
        description: '1 fear. Push 2 Dahan. Defend 3. If target land is Wetland, Isolate it.'
      },
      {
        name: 'Foundations Sink into Mud',
        cost: 1,
        speed: 'Slow',
        elements: ['Water', 'Earth'],
        description: '2 damage to Town. If target land is Wetland, you may instead deal 1 Damage to each Town / City.'
      },
      {
        name: 'Gift of Abundance',
        cost: 1,
        speed: 'Fast',
        elements: ['Sun', 'Air', 'Water', 'Plant'],
        description:
          'Target Spirit either gains 2 Energy, or may Repeat one Power Card this turn by paying its cost. Either you or target Spirit may add 1 Destroyed Presence to a Wetland where you have Presence.'
      },
      {
        name: 'Dark Skies Loose a Stinging Rain',
        cost: 1,
        speed: 'Fast',
        elements: ['Moon', 'Air', 'Water'],
        description: 'Isolate target land. Push up to 1 Explorer and up to 2 Dahan.'
      }
    ],
    panel: {
      presences: [
        {
          point: {
            x: 49.5,
            y: 38.5
          },
          type: 'element',
          value: 'Water'
        },
        {
          point: {
            x: 57.1,
            y: 38.5
          },
          type: 'element',
          value: 'Plant'
        },
        {
          point: {
            x: 64.7,
            y: 38.5
          },
          type: 'element',
          value: 'Water'
        },
        {
          point: {
            x: 72.3,
            y: 38.5
          },
          type: 'energy',
          value: 2,
          callback: (reverse) => {
            addElement('Air', reverse)
          }
        },
        {
          point: {
            x: 79.9,
            y: 38.5
          },
          type: 'element',
          value: 'Water'
        },
        {
          point: {
            x: 87.4,
            y: 38.5
          },
          type: 'element',
          value: 'Earth'
        },
        {
          point: {
            x: 95,
            y: 38.5
          },
          type: 'energy',
          value: 2,
          callback: (reverse) => {
            addElement('Water', reverse)
            addElement('Water', reverse)
          }
        },
        {
          point: {
            x: 49.5,
            y: 52
          }
        },
        {
          point: {
            x: 57.1,
            y: 52
          },
          type: 'element',
          value: 'Water'
        },
        {
          point: {
            x: 64.7,
            y: 52
          },
          type: 'card-play',
          value: '2'
        },
        {
          point: {
            x: 72.3,
            y: 52
          }
        },
        {
          point: {
            x: 79.9,
            y: 52
          },
          type: 'card-play',
          value: 3
        }
      ],
      scale: 6,
      energy: 1,
      cardPlay: 1
    },
    innate: [
      {
        name: 'Rain and Mud Suppress Conflict',
        elements: [
          {
            Water: 3,
            Air: 1
          },
          {
            Water: 5,
            Earth: 1
          },
          {
            Air: 3,
            Water: 9,
            Earth: 2
          }
        ],
        fast: true
      },
      {
        name: "Water Nourishes Life's Growth",
        elements: [
          {
            Water: 3,
            Plant: 2
          },
          {
            Water: 5,
            Earth: 1,
            Plant: 2
          },
          {
            Water: 7,
            Earth: 2,
            Plant: 3
          }
        ],
        fast: true
      }
    ]
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
          'Target spirit moves up to 3 of their Presence to one of your lands. They may move up to 1 Invader, 1 Dahan and 1 Beasts along with their Presence. (Total, not for each Presence.)'
      },
      {
        name: 'Paths Tied by Nature',
        cost: 0,
        speed: 'Slow',
        elements: ['Sun', 'Air', 'Earth', 'Plant'],
        description: 'Move up to 2 Invaders / Dahan / Presence / Beasts to a land within 2 Range that has the same terrain.'
      },
      {
        name: 'A Circuitous and Wending Journey',
        cost: 0,
        speed: 'Slow',
        elements: ['Moon', 'Air'],
        description: 'Push up to half (round up) of Invaders from target land. Do likewise (separately) for Dahan, Presence, and Beasts.'
      },
      {
        name: 'Offer Passage Between Worlds',
        cost: 1,
        speed: 'Fast',
        elements: ['Sun', 'Moon', 'Air'],
        description: 'Move up to 4 Dahan between target land and one of your lands. -or- The next time Dahan would be Destroyed in target land, Destroy 2 fewer Dahan.'
      },
      {
        name: 'Ways of Shore and Heartland',
        cost: 1,
        speed: 'Slow',
        elements: ['Air', 'Water', 'Earth'],
        description: 'Push up to 2 Invaders / Dahan / Presence / Beasts to a land that is also Coastal / Inland (whichever the target land is.)'
      },
      {
        name: 'Aid from the Spirit-Speakers',
        cost: 2,
        speed: 'Fast',
        elements: ['Sun', 'Fire', 'Air', 'Animal'],
        description: 'For each Dahan, you may move 1 Invader / Dahan / Presence / Beasts to a land within 2 Range that has Dahan.'
      }
    ],
    panel: {
      presences: [
        {
          point: {
            x: 51.8,
            y: 29
          },
          type: 'element',
          value: 'Sun'
        },
        {
          // index 1
          point: {
            x: 65.9,
            y: 29
          },
          type: 'element',
          value: 'Water',
          callback: (reverse) => {
            const player = usePlayerCardStore()
            if (player.disk.includes(8)) {
              increaseIncome(1, reverse)
            } else {
              increaseIncome(2, reverse)
            }
          }
        },
        {
          point: {
            x: 80,
            y: 29
          },
          callback: (reverse) => {
            increaseIncome(2, reverse)
          }
        },
        {
          point: {
            x: 94.1,
            y: 29
          },
          type: 'element',
          value: 'Any',
          callback: (reverse) => {
            increaseIncome(1, reverse)
          }
        },
        {
          point: {
            x: 51.8,
            y: 49.2
          },
          type: 'element',
          value: 'Earth'
        },
        {
          point: {
            x: 65.9,
            y: 49.2
          },
          callback: (reverse) => {
            increaseCardPlay(1, reverse)
          }
        },
        {
          point: {
            x: 80,
            y: 49.2
          },
          callback: (reverse) => {
            increaseCardPlay(1, reverse)
          }
        },
        {
          point: {
            x: 94.1,
            y: 49.2
          }
        },
        {
          // index 8
          point: {
            x: 59,
            y: 39.2
          },
          type: 'element',
          value: 'Moon',
          callback: (reverse) => {
            const player = usePlayerCardStore()
            if (!player.disk.includes(1)) {
              increaseIncome(1, reverse)
            }
          }
        },
        {
          point: {
            x: 73.1,
            y: 39.2
          },
          type: 'element',
          value: 'Air'
        },
        {
          point: {
            x: 87.2,
            y: 39.2
          },
          callback: (reverse) => {
            increaseIncome(1, reverse)
          }
        }
      ],
      scale: 6,
      energy: 0,
      cardPlay: 1
    },
    innate: [
      {
        name: 'Lay Paths The Cannot Help But Walk',
        elements: [
          {
            Moon: 2,
            Air: 2
          },
          {
            Sun: 2,
            Air: 2
          },
          {
            Moon: 2,
            Air: 4,
            Water: 3
          }
        ],
        fast: true
      },
      {
        name: '',
        elements: [
          {
            Air: 1,
            Water: 2
          },
          {
            Air: 2,
            Earth: 2
          },
          {
            Air: 3,
            Plant: 2
          }
        ],
        fast: true
      }
    ]
  },
  {
    name: 'Vital Strength Of The Earth',
    cards: [
      {
        name: 'Draw of the Fruitful Earth',
        cost: 1,
        speed: 'Slow',
        elements: ['Earth', 'Plant', 'Animal'],
        description: 'Gather up to 2 Explorer. Gather up to 2 Dahan.'
      },
      {
        name: 'Guard the Healing Land',
        cost: 3,
        speed: 'Fast',
        elements: ['Water', 'Earth', 'Plant'],
        description: 'Remove 1 Blight. Defend 4.'
      },
      {
        name: 'A Year of Perfect Stillness',
        cost: 3,
        speed: 'Fast',
        elements: ['Sun', 'Earth'],
        description: 'Invaders skip all Actions in target land this turn.'
      },
      {
        name: 'Rituals of Destruction',
        cost: 3,
        speed: 'Slow',
        elements: ['Sun', 'Moon', 'Fire', 'Earth', 'Plant'],
        description: '2 Damage. If target land has at least 3 Dahan, +3 Damage and 2 Fear.'
      }
    ],
    aspects: [
      {
        title: 'Resilience',
        requirements: [`Replace: Earth's Vitality`],
        cards: [
          {
            name: `ANCHOR THE LAND'S RESILIENCE`,
            description: `In lands with your Sacred Site, it takes 8 additional Damage to add Blight to the land. (So, usually, 10 Damage will add Blight. This does not protect Dahan at all; Damage to them is unaffected.)`
          }
        ]
      },
      {
        title: 'Might',
        requirements: [`Replace: Earth's Vitality`],
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
        ],
        setupFunction: setupMight
      },
      {
        title: 'Nourishing',
        requirements: [`Replace: Earth's Vitality`],
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
      }
    ],
    innate: [
      {
        name: 'Gift of Strength',
        elements: [
          {
            Sun: 1,
            Earth: 2,
            Plant: 2
          },
          {
            Sun: 2,
            Earth: 3,
            Plant: 2
          },
          {
            Sun: 2,
            Earth: 4,
            Plant: 3
          }
        ],
        fast: true
      }
    ]
  },
  {
    name: 'Covets Gleaming Shards Of Earth',
    panel: {
      presences: [
        {
          point: { x: 50.9, y: 30.83 },
          type: 'energy',
          value: 2
        },
        {
          point: { x: 50.74, y: 50.23 },
          type: 'element',
          value: 'Air'
        },
        {
          point: { x: 58.14, y: 50.23 },
          type: 'card-play',
          value: 2
        },
        {
          point: { x: 65.54, y: 50.23 },
          type: 'element',
          value: 'Sun'
        },
        {
          point: { x: 58.2, y: 36.18 },
          type: 'element',
          value: 'Animal'
        },
        {
          point: { x: 58.2, y: 25.48 },
          type: 'element',
          value: 'Fire'
        },
        {
          point: { x: 72.84, y: 55.58 },
          type: 'element',
          value: 'Animal'
        },
        {
          point: { x: 72.84, y: 44.88 },
          type: 'element',
          value: 'Fire'
        },
        {
          type: 'energy',
          value: 3,
          point: { x: 65.5, y: 30.83 }
        },
        {
          type: 'element',
          value: 'Earth',
          point: { x: 72.8, y: 30.83 }
        },
        {
          type: 'another',
          value: '',
          point: { x: 80.1, y: 30.83 }
        },
        {
          type: 'energy',
          value: 5,
          point: { x: 87.4, y: 30.83 }
        },
        {
          type: 'card-play',
          value: 3,
          point: { x: 80.14, y: 50.23 }
        }
      ],
      scale: 6,
      energy: 1,
      cardPlay: 1
    },
    cards: [
      {
        cost: 1,
        elements: ['Sun', 'Earth', 'Animal'],
        speed: 'Fast',
        name: 'Favors of Steel and Bone',
        description: ''
      },
      {
        cost: 2,
        elements: ['Sun', 'Fire', 'Earth'],
        speed: 'Slow',
        name: 'Melt Earth to Slag',
        description: ''
      },
      {
        cost: 1,
        elements: ['Moon', 'Fire', 'Air', 'Earth'],
        speed: 'Fast',
        name: 'Petition for Smoldering Wrath',
        description: ''
      },
      {
        cost: 1,
        elements: ['Air', 'Earth', 'Animal'],
        speed: 'Slow',
        description: '',
        name: 'Unnerving Attention'
      }
    ],
    innate: [
      {
        name: 'Scent of Shinning Earth',
        fast: true,
        elements: [
          {
            Earth: 1
          },
          {
            Sun: 1,
            Earth: 2,
            Animal: 2
          },
          {
            Fire: 2,
            Air: 2,
            Earth: 2
          },
          {
            Sun: 2,
            Fire: 2,
            Earth: 3
          },
          {
            Earth: 4
          }
        ]
      }
    ],
    setup: setupGleamingHoard
  },
  {
    name: 'Keeper Of The Forbidden Wilds',
    cards: [
      {
        name: 'Regrow from Roots',
        cost: 1,
        speed: 'Slow',
        elements: ['Water', 'Earth', 'Plant'],
        description: 'If there are 2 Blight or fewer in target land, remove 1 Blight.'
      },
      {
        name: 'Boon of Growing Power',
        cost: 1,
        speed: 'Slow',
        elements: ['Sun', 'Moon', 'Plant'],
        description: 'Target Spirit gains a Power Card. If you target another Spirit, they also gain 1 Energy.'
      },
      {
        name: 'Sacrosanct Wilderness',
        cost: 2,
        speed: 'Fast',
        elements: ['Sun', 'Earth', 'Plant'],
        description: 'Push 2 Dahan. 2 Damage per Wilds in target land. -or- Add 1 Wilds.'
      },
      {
        name: 'Towering Wrath',
        cost: 3,
        speed: 'Slow',
        elements: ['Sun', 'Fire', 'Plant'],
        description: '2 Fear. For each of your SacredSite in / adjacent to target land, 2 Damage. Destroy all Dahan.'
      }
    ],
    aspects: [
      {
        title: 'Spreading Hostility',
        setupFunction: setupSpreadingHostility
      }
    ]
  },
  {
    name: 'Serpent Slumbering Beneath The Island',
    cards: [
      {
        name: 'Gift of the Primordial Deeps',
        cost: 1,
        speed: 'Fast',
        elements: ['Moon', 'Earth'],
        description: 'Target Spirit gains a Minor Power. Target Spirit chooses to either: Play it immediately by paying its cost. -or- Gain 1 Moon and 1 Earth.'
      },
      {
        name: 'Gift of Flowing Power',
        cost: 1,
        speed: 'Fast',
        elements: ['Fire', 'Water'],
        description: 'Target Spirit gains 1 Energy. Target Spirit chooses to either: Play another Power Card by paying its cost. -or- Gain 1 Fire and 1 Water.'
      },
      {
        name: 'Elemental Aegis',
        cost: 1,
        speed: 'Fast',
        elements: ['Fire', 'Water', 'Earth'],
        description: 'Defend 2 in target land and all adjacent lands. For every Presence on your "Deep Slumber" track, Defend 1 in target land and all adjacent lands.'
      },
      {
        name: 'Absorb Essence',
        cost: 2,
        speed: 'Fast',
        elements: ['Moon', 'Fire', 'Water', 'Earth'],
        description:
          'Gain 3 Energy. Move 1 of target Spirit\'s Presence from the board to your "Deep Slumber" track. Absorbed Presence cannot be returned to play. Target Spirit gains 1 Any and 1 Energy.'
      }
    ],
    aspects: [
      {
        title: 'Locus',
        setupFunction: setupLocus,
        images: ['Locus 1', 'Locus 2'],
        requirements: [`Replace: SERPENT WAKES IN POWER`, `Setup: Put Locus and the Presence from the Fire space of your Presence track on the starting board in land #5`],
        cards: [
          {
            name: `LOCUS OF THE SERPENT'S REGARD`,
            description: `Spirits with absorbed Presence can use your Presence at Locus for targeting.:break:
            Locus doesn't count towards your Deep Slumber limit.:break:
            After uncovering the Earth space of your Presence track, Empower Locus.:break:
            <strong>Bonus space:</strong> Add/Move Locus to Land with Your Presence.
            `
          },
          {
            name: `STRENGTH OF THE WAKING ISLAND`,
            description: `2Water 1Earth After a Spirit uses a land-targeting Power Card, they may Repeat it at Locus by paying its cost. (Max. 1 Power Card per turn for each of their absorbed Presence.) You may help pay some or all of this cost. (These Repeats ignore Range and target requirements.):break:
            2Moon 2Earth 1Plant Add 1 Vitality at Locus. If a Spirit has 2 or more absorbed Presence, you may instead Add 1 Vitality in one of their lands without Blight.`,
            target: {
              speed: 'Fast',
              range: null,
              scaredSite: null,
              targetLand: 'yourself'
            }
          }
        ]
      }
    ]
  },
  {
    name: 'Volcano Looming High',
    cards: [
      {
        name: 'Lava Flows',
        cost: 1,
        speed: 'Slow',
        elements: ['Fire', 'Earth'],
        description: 'Add 1 Badlands and 1 Wilds. -or- 1 Damage.'
      },
      {
        name: 'Exaltation of Molten Stone',
        cost: 1,
        speed: 'Fast',
        elements: ['Moon', 'Fire', 'Earth'],
        description: 'Split 1 Energy per Fire you have between yourself and target Spirit, as evenly as possible. Target Spirit gains +1 Range with their powers that originate from a Mountain.'
      },
      {
        name: 'Rain of Ash',
        cost: 2,
        speed: 'Slow',
        elements: ['Fire', 'Air', 'Earth'],
        description: '2 Fear if Invaders are present. Push 2 Dahan and 2 Explorer / Town to land(s) without your Presence.'
      },
      {
        name: 'Pyroclastic Bombardment',
        cost: 3,
        speed: 'Fast',
        elements: ['Fire', 'Air', 'Earth'],
        description: '1 Damage to each Town / City / Dahan. 1 Damage. 1 Damage to Dahan.'
      }
    ]
  },
  {
    name: 'Devouring Teeth Lurk Underfoot',
    cards: [
      {
        name: 'Ferocious Rampage',
        cost: 2,
        speed: 'Slow',
        elements: ['Fire', 'Animal'],
        description: ''
      },
      {
        name: 'Herd Towards The Lurking Maw',
        cost: 1,
        speed: 'Slow',
        elements: ['Water', 'Earth', 'Animal'],
        description: ''
      },
      {
        name: 'Mark Territory With Scars And Teeth',
        cost: 2,
        speed: 'Fast',
        elements: ['Sun', 'Earth', 'Animal'],
        description: ''
      },
      {
        name: 'Gift of Furious Might',
        cost: 1,
        speed: 'Fast',
        elements: ['Moon', 'Fire', 'Animal'],
        description: ''
      }
    ]
  },
  {
    name: 'Fathomless Mud of the Swamp',
    cards: [
      {
        name: 'Open Shifting Waterways',
        cost: 1,
        speed: 'Slow',
        elements: ['Moon', 'Water', 'Animal'],
        description: ''
      },
      {
        name: 'Exaltation of Tangled Growth',
        cost: 0,
        speed: 'Slow',
        elements: ['Water', 'Earth', 'Plant'],
        description: ''
      },
      {
        name: 'Foul Vapors And Fetid Muck',
        cost: 0,
        speed: 'Slow',
        elements: ['Fire', 'Air', 'Water', 'Earth'],
        description: ''
      },
      {
        name: 'Intractable Thickets and Thorns',
        cost: 2,
        speed: 'Fast',
        elements: ['Moon', 'Water', 'Earth', 'Plant'],
        description: ''
      }
    ],
    innate: [
      {
        name: 'Spreading and Dreadful Mire',
        elements: [
          {
            Water: 1
          },
          {
            Moon: 1,
            Water: 2,
            Earth: 1
          },
          {
            Moon: 2,
            Water: 3,
            Earth: 2
          },
          {
            Water: 4,
            Earth: 3,
            Moon: 3,
            Plant: 2
          }
        ],
        fast: false
      }
    ],
    panel: {
      presences: [
        {
          point: {
            x: 51.4,
            y: 29.7
          },
          value: 'Plant',
          type: 'element'
        },
        {
          point: {
            x: 58.98,
            y: 29.7
          },
          value: 2,
          type: 'energy'
        },
        {
          point: {
            x: 66.56,
            y: 29.7
          },
          value: 3,
          type: 'energy'
        },
        {
          point: {
            x: 74.14,
            y: 29.7
          },
          value: 'Water',
          type: 'element'
        },
        {
          point: {
            x: 81.72,
            y: 29.7
          },
          value: 4,
          type: 'energy'
        },
        {
          point: {
            x: 89.3,
            y: 29.7
          },
          value: 5,
          type: 'energy'
        },
        {
          point: {
            x: 51.4,
            y: 44.3
          }
        },
        {
          point: {
            x: 58.98,
            y: 44.3
          },
          value: 'Earth',
          type: 'element'
        },
        {
          point: {
            x: 66.56,
            y: 44.3
          },
          value: 3,
          type: 'card-play'
        },
        {
          point: {
            x: 74.14,
            y: 44.3
          },
          value: 'Moon',
          type: 'element'
        },
        {
          point: {
            x: 81.72,
            y: 44.3
          },
          value: 4,
          type: 'card-play'
        }
      ],
      scale: 6,
      energy: 1,
      cardPlay: 1
    }
  },
  {
    name: 'Eyes Watch From the Trees',
    cards: [
      {
        name: 'Boon of Watchful Guarding',
        cost: 0,
        speed: 'Fast',
        elements: ['Earth', 'Plant', 'Animal'],
        description: ''
      },
      {
        name: 'Mysterious Abductions',
        cost: 1,
        speed: 'Fast',
        elements: ['Moon', 'Fire', 'Plant'],
        description: ''
      },
      {
        name: 'Whispered Guidance Through the Night',
        cost: 0,
        speed: 'Slow',
        elements: ['Moon', 'Air', 'Plant'],
        description: ''
      },
      {
        name: 'Eerie Noises and Moving Trees',
        cost: 2,
        speed: 'Slow',
        elements: ['Moon', 'Air', 'Plant'],
        description: ''
      }
    ]
  },
  {
    name: 'Rising Heat of Stone and Sand',
    cards: [
      {
        name: 'Call on Herders for Aid',
        cost: 1,
        speed: 'Slow',
        elements: ['Sun', 'Fire', 'Earth', 'Animal'],
        description: ''
      },
      {
        name: 'Stinging Sandstorm',
        cost: 1,
        speed: 'Slow',
        elements: ['Fire', 'Air', 'Earth'],
        description: ''
      },
      {
        name: 'Sweltering Exhaustion',
        cost: 2,
        speed: 'Fast',
        elements: ['Fire', 'Air'],
        description: ''
      },
      {
        name: 'Gift of Searing Heat',
        cost: 0,
        speed: 'Fast',
        elements: ['Sun', 'Fire', 'Air'],
        description: ''
      }
    ]
  },
  {
    name: 'Sun-Bright Whirlwind',
    cards: [
      {
        name: 'Gift of the Sunlit Air',
        cost: 0,
        speed: 'Fast',
        elements: ['Sun', 'Fire', 'Air'],
        description: ''
      },
      {
        name: 'Gift of Wind-Sped Steps',
        cost: 1,
        speed: 'Fast',
        elements: ['Sun', 'Air', 'Animal'],
        description: ''
      },
      {
        name: 'Scatter to the Winds',
        cost: 1,
        speed: 'Slow',
        elements: ['Fire', 'Air', 'Water'],
        description: ''
      },
      {
        name: 'Tempest of Leaves And Branches',
        cost: 2,
        speed: 'Fast',
        elements: ['Sun', 'Air', 'Plant'],
        description: ''
      }
    ]
  },
  {
    name: 'Ember-Eyed Behemoth',
    cards: [
      {
        name: 'Blazing Intimidation',
        cost: 2,
        speed: 'Fast',
        elements: ['Fire', 'Plant', 'Animal'],
        description: 'Push 2 invaders to a land without blight.'
      },
      {
        name: 'Exaltation of Grasping Roots',
        cost: 0,
        speed: 'Slow',
        elements: ['Moon', 'Fire', 'Earth', 'Plant'],
        description: 'Target Spirit may Add 1 presence in one of their lands. You may do likewise.'
      },
      {
        name: 'Terrifying Rampage',
        cost: 1,
        speed: 'Fast',
        elements: ['Moon', 'Fire', 'Earth'],
        description: "1 Fear. Up to 2 Invaders don't participate in Ravage. (Choose when Ravaging; they don't do Damage or take counterattack Damage.) Push 3 Dahan."
      },
      {
        name: 'Surging Lahar',
        cost: 2,
        speed: 'Slow',
        elements: ['Fire', 'Water', 'Earth'],
        description: '2 Damage. If your Earth is present, Add 1 Fear.'
      }
    ],
    innate: [
      {
        name: 'Smash, Stomp and Flatten',
        elements: [
          {
            Fire: 2,
            Earth: 1
          },
          {
            Fire: 3,
            Earth: 1,
            Plant: 1
          },
          {
            Fire: 4,
            Earth: 2,
            Plant: 1
          },
          {
            Fire: 5,
            Earth: 2,
            Plant: 2
          }
        ],
        fast: false
      }
    ],
    panel: {
      presences: [
        {
          point: {
            x: 51.2,
            y: 43
          },
          type: 'energy',
          value: 1
        },
        {
          point: {
            x: 59.1,
            y: 43
          },
          type: 'energy',
          value: 2,
          callback: (reverse: boolean) => {
            addElement('Fire', reverse)
          }
        },
        {
          point: {
            x: 67,
            y: 43
          },
          type: 'energy',
          value: 3
        },
        {
          point: {
            x: 74.9,
            y: 43
          },
          type: 'element',
          value: 'Earth'
        },
        {
          point: {
            x: 82.8,
            y: 43
          },
          type: 'energy',
          value: 4,
          callback: (reverse: boolean) => {
            addElement('Plant', reverse)
          }
        },
        {
          point: {
            x: 90.7,
            y: 43
          },
          type: 'energy',
          value: 5,
          callback: (reverse: boolean) => {
            addElement('Fire', reverse)
          }
        },
        {
          point: {
            x: 51.2,
            y: 57.4
          },
          type: 'card-play',
          value: 2
        },
        {
          point: {
            x: 59.1,
            y: 57.4
          }
        },
        {
          point: {
            x: 67,
            y: 57.4
          },
          type: 'card-play',
          value: 3
        },
        {
          point: {
            x: 74.9,
            y: 57.4
          },
          type: 'element',
          value: 'Fire'
        },
        {
          point: {
            x: 82.8,
            y: 57.4
          },
          type: 'card-play',
          value: 4
        }
      ],
      scale: 6,
      energy: 0,
      cardPlay: 1
    }
  },
  {
    name: 'Relentless Gaze of the Sun',
    cards: [
      {
        name: 'Blinding Glare',
        cost: 0,
        speed: 'Fast',
        elements: ['Sun', 'Air'],
        description: 'Skip up to one Ravage Action. If you have 5 sun, instead, skip up to one Invader Action.'
      },
      {
        name: "Focus the Sun's Rays",
        cost: 0,
        speed: 'Slow',
        elements: ['Sun', 'Fire', 'Air'],
        description: '1 Damage. 2 Damage to Town. Move up to 3 Dahan directly to target land (from anywhere on the island). You may Bring 1 explorer (total) with those Dahan.'
      },
      {
        name: 'Unbearable Gaze',
        cost: 1,
        speed: 'Slow',
        elements: ['Sun', 'Fire'],
        description: 'Push 2 Dahan from origin or target land (or 1 Dahan from each).'
      },
      {
        name: 'Wither Bodies, Scar Stones',
        cost: 1,
        speed: 'Slow',
        elements: ['Sun', 'Fire', 'Earth'],
        description: '1 Damage. or Add 1 Blight.'
      }
    ],
    panel: {
      presences: [
        {
          point: {
            x: 51.5,
            y: 32.5
          },
          type: 'energy',
          value: 2,
          callback: (reverse: boolean) => {
            addElement('Sun', reverse)
          }
        },
        {
          point: {
            x: 59.35,
            y: 32.5
          },
          type: 'energy',
          value: 3,
          callback: (reverse: boolean) => {
            addElement('Fire', reverse)
          }
        },
        {
          point: {
            x: 67.2,
            y: 32.5
          },
          type: 'element',
          value: 'Sun'
        },
        {
          point: {
            x: 75.05,
            y: 32.5
          },
          type: 'energy',
          value: 4,
          callback: (reverse: boolean) => {
            addElement('Any', reverse)
          }
        },
        {
          point: {
            x: 82.9,
            y: 32.5
          },
          type: 'energy',
          value: 5
        },
        {
          point: {
            x: 51.5,
            y: 48.4
          },
          type: 'card-play',
          value: 1
        },
        {
          point: {
            x: 59.35,
            y: 48.4
          },
          type: 'card-play',
          value: 2
        },
        {
          point: {
            x: 67.2,
            y: 48.4
          },
          type: 'element',
          value: 'Sun'
        },
        {
          point: {
            x: 75.05,
            y: 48.4
          },
          type: 'card-play',
          value: 3
        },
        {
          point: {
            x: 82.9,
            y: 48.4
          }
        },
        {
          point: {
            x: 90.75,
            y: 48.4
          },
          type: 'card-play',
          value: 4
        }
      ],
      scale: 6,
      energy: 1,
      cardPlay: 1
    },
    innate: [
      {
        name: 'Scorching Convergence',
        elements: [
          {
            Sun: 2
          },
          {
            Sun: 3,
            Fire: 1
          },
          {
            Sun: 4,
            Fire: 2,
            Air: 1
          },
          {
            Sun: 5,
            Fire: 3,
            Air: 2
          }
        ],
        fast: false
      },
      {
        name: 'Consider a Harmonious Nature',
        elements: [
          {
            Sun: 3,
            Moon: 1
          },
          {
            Sun: 3,
            Water: 1
          },
          {
            Sun: 3,
            Plant: 1
          },
          {
            Sun: 3,
            Water: 1,
            Plant: 1
          }
        ],
        fast: true
      }
    ]
  },
  {
    name: 'Wounded Waters Bleeding',
    cards: [
      {
        name: 'Blood Water and Bloodlust',
        cost: 1,
        speed: 'Slow',
        elements: ['Fire', 'Water', 'Animal'],
        description: 'Add 1 beast and 1 wilds.'
      },
      {
        name: 'Boon of Corrupted Blood',
        cost: 1,
        speed: 'Fast',
        elements: ['Sun', 'Fire', 'Animal'],
        description: '1 Damage in one of target Spirit’s lands. If you target another Spirit, in that land also: Destroy 1 of their presence. 1 Damage. Gather 1 beast.'
      },
      {
        name: "Draw to the Water's Edge",
        cost: 1,
        speed: 'Fast',
        elements: ['Sun', 'Water', 'Plant'],
        description: 'Gather up to 2 explorers from a single land.'
      },
      {
        name: 'Wrack With Pain and Grief',
        cost: 1,
        speed: 'Slow',
        elements: ['Water', 'Plant', 'Animal'],
        description: 'Push 1 Explorer and 1 Town.'
      }
    ],
    setup: setupWoundedWaters,
    panel: {
      presences: [
        {
          point: {
            x: 51.5,
            y: 46.7
          },
          callback: (reverse: boolean) => {
            addSwitchElement(reverse, 'Water', 'Animal')
          }
        },
        {
          point: {
            x: 59.5,
            y: 46.7
          }
        },
        {
          point: {
            x: 67.5,
            y: 46.7
          },
          callback: woundedWatersPresence3
        },
        {
          type: 'energy',
          point: {
            x: 75,
            y: 39.1
          },
          value: 3
        },
        {
          type: 'energy',
          point: {
            x: 83,
            y: 39.1
          },
          value: 4,
          callback: (reverse: boolean) => {
            addSwitchElement(reverse, 'Fire', 'Plant')
          }
        },
        {
          point: {
            x: 91,
            y: 39.1
          },
          type: 'energy',
          value: 5,
          callback: (reverse: boolean) => {
            addElement('Any', reverse)
          }
        },
        {
          point: {
            x: 75,
            y: 54
          },
          type: 'card-play',
          value: 3
        },
        {
          point: {
            x: 83,
            y: 54
          }
        },
        {
          point: {
            x: 91,
            y: 54
          },
          type: 'card-play',
          value: 4
        }
      ],
      scale: 6,
      energy: 0,
      cardPlay: 1
    },
    innate: [
      {
        name: 'Swirl and Spill',
        elements: [
          {
            Water: 2
          },
          {
            Water: 3,
            Animal: 1
          },
          {
            Water: 5,
            Plant: 2,
            Animal: 2
          }
        ],
        fast: false
      },
      {
        name: 'Sanguinary Taint',
        elements: [
          {
            Animal: 2
          },
          {
            Water: 1,
            Animal: 3
          },
          {
            Fire: 2,
            Water: 2,
            Animal: 5
          }
        ],
        fast: false
      }
    ]
  },
  {
    name: 'Breath of Darkness Down Your Spine',
    cards: [
      {
        name: 'Emerge from the Dread Night Wind',
        cost: 1,
        speed: 'Slow',
        elements: ['Moon', 'Air'],
        description: 'Add/Move 1 explorer to target land. 1 Fear. If exactly 1 Invader is present, Abduct it. Otherwise, Push up to 2 explorers/towns to different lands. Push up to 2 explorers.'
      },
      {
        name: 'Reach From The Infinite Darkness',
        cost: 0,
        speed: 'Fast',
        elements: ['Moon', 'Air', 'Animal'],
        description:
          "Abduct up to 2 [Dahans] (total, with their owners' permission) from any lands on the island, ignoring land type restrictions on moving [Dahans]. Each Spirit's [presence] in [sacred site] grants them +1 [Energy] with all their Powers (this turn)."
      },
      {
        name: 'Swallowed By The Endless Dark',
        cost: 1,
        speed: 'Fast',
        elements: ['Moon', 'Air', 'Water'],
        description: '2 Fear. Abduct 1 Invader. If you have 3 Moon and 3 Water: Abduct 1 Invader.'
      },
      {
        name: 'Terror of the Hunted',
        cost: 1,
        speed: 'Slow',
        elements: ['Moon', 'Fire', 'Animal'],
        description:
          'If Explorers are present, Add 1 Beast and Add 1 Fear. Add 1 Fear per Terror Level. If target land is Mountain, Add 1 Fear. (Beast only Escapes with the Invader it’s attached to.)'
      }
    ],
    panel: {
      presences: [
        {
          point: {
            x: 51.2,
            y: 38.9
          },
          value: 2,
          type: 'energy'
        },
        {
          point: {
            x: 59.05,
            y: 38.9
          },
          type: 'element',
          value: 'Moon'
        },
        {
          point: {
            x: 66.9,
            y: 38.9
          },
          type: 'energy',
          value: 3
        },
        {
          point: {
            x: 74.75,
            y: 38.9
          }
        },
        {
          point: {
            x: 82.7,
            y: 38.9
          },
          type: 'energy',
          value: 4,
          callback: (reverse: boolean) => {
            addElement('Animal', reverse)
          }
        },
        {
          point: {
            x: 90.6,
            y: 38.9
          },
          type: 'energy',
          value: 5,
          callback: (reverse: boolean) => {
            addElement('Air', reverse)
          }
        },
        {
          point: {
            x: 51.2,
            y: 54.5
          }
        },
        {
          point: {
            x: 59.05,
            y: 54.5
          },
          type: 'card-play',
          value: 3
        },
        {
          point: {
            x: 66.9,
            y: 54.5
          },
          type: 'element',
          value: 'Moon'
        },
        {
          point: {
            x: 74.75,
            y: 54.5
          }
        },
        {
          point: {
            x: 82.7,
            y: 54.5
          },
          type: 'card-play',
          value: 4,
          callback: (reverse: boolean) => {
            addElement('Air', reverse)
          }
        }
      ],
      scale: 6,
      energy: 1,
      cardPlay: 2
    },
    innate: [
      {
        name: 'Leave a Trail of Deathly Silence',
        elements: [
          {
            Moon: 2,
            Animal: 1
          },
          {
            Moon: 3,
            Animal: 1,
            Air: 1
          },
          {
            Moon: 4,
            Air: 2,
            Animal: 2
          },
          {
            Moon: 5,
            Air: 2,
            Animal: 3
          }
        ],
        fast: true
      },
      {
        name: 'Lost in the Endless Dark',
        elements: [
          {
            Moon: 2,
            Air: 1
          },
          {
            Moon: 4,
            Air: 3
          },
          {
            Moon: 3,
            Animal: 2
          }
        ],
        fast: false
      }
    ]
  },
  {
    name: 'Dances Up Earthquakes',
    cards: [
      {
        name: 'Exaltation of Echoed Steps',
        cost: 1,
        speed: 'Slow',
        elements: ['Moon', 'Water', 'Earth'],
        description: 'Target Spirit may Push 1 town. Bringing up to 1 explorer/town. You may do likewise.'
      },
      {
        name: 'Inspire a Winding Dance',
        cost: 0,
        speed: 'Slow',
        elements: ['Moon', 'Water', 'Earth', 'Animal'],
        description: 'Push up to 1 explorer/town. Gather up to 1 Dahan.'
      },
      {
        name: 'Gift of Seismic Energy',
        cost: 3,
        speed: 'Fast',
        elements: ['Sun', 'Fire', 'Earth', 'Plant'],
        description: 'If you target yourself, gain 3 Energy. Otherwise, target Spirit gains 1 Energy per Power Card you have in play (max. 6). (Don’t count destroyed ones).'
      },
      {
        name: 'Radiating Tremors',
        cost: 2,
        speed: 'Slow',
        elements: ['Moon', 'Fire', 'Earth'],
        description: '2 Damage. You may Push any number of [explorers/towns], dividing them as evenly as possible between adjacent lands.'
      },
      {
        name: 'Resounding Footfalls Sow Dismay',
        cost: 3,
        speed: 'Fast',
        elements: ['Fire', 'Air', 'Mountain'],
        description: '1 Fear. Add 1 [explorer/town]. Skip all Ravage Actions.'
      },
      {
        name: 'Rumblings Portend A Greater Quake',
        cost: 1,
        speed: 'Fast',
        elements: ['Sun', 'Moon', 'Air', 'Mountain'],
        description: 'If you have at least as many [presence] as Power Cards in play, 1 Fear and Add 1 [explorer/town]. Push up to 3 [Dahans].'
      }
    ],
    setup: setupDancesUpEarthquakes,
    panel: {
      presences: [
        {
          point: {
            x: 51.4,
            y: 29.5
          }
        },
        {
          point: {
            x: 59.3,
            y: 29.5
          },
          type: 'energy',
          value: 2
        },
        {
          point: {
            x: 67.2,
            y: 29.5
          }
        },
        {
          point: {
            x: 75.1,
            y: 29.5
          },
          type: 'energy',
          value: 3
        },
        {
          point: {
            x: 83,
            y: 29.5
          }
        },
        {
          point: {
            x: 90.9,
            y: 29.5
          },
          type: 'energy',
          value: 4,
          callback: (reverse: boolean) => {
            addElement('Any', reverse)
          }
        },
        {
          point: {
            x: 51.4,
            y: 45
          }
        },
        {
          point: {
            x: 59.3,
            y: 45
          },
          type: 'element',
          value: 'Moon',
          callback: (reverse: boolean) => {
            addElement('Fire', reverse)
          }
        },
        {
          point: {
            x: 67.2,
            y: 45
          }
        },
        {
          point: {
            x: 75.1,
            y: 45
          },
          type: 'element',
          value: 'Earth'
        },
        {
          point: {
            x: 83,
            y: 45
          },
          type: 'card-play',
          value: 3
        },
        {
          point: {
            x: 90.9,
            y: 45
          },
          type: 'card-play',
          value: 4
        }
      ],
      scale: 6,
      energy: 1,
      cardPlay: 2
    },
    innate: [
      {
        name: 'Land Creaks With Tension',
        elements: [
          {
            Earth: 1
          },
          {
            Moon: 1,
            Earth: 1
          },
          {
            Moon: 1,
            Earth: 2
          },
          {
            Moon: 2,
            Earth: 3
          }
        ],
        fast: true
      },
      {
        name: 'Earth Shudders, Buildings Fall',
        elements: [
          {
            Fire: 2,
            Earth: 3
          },
          {
            Fire: 3,
            Earth: 4
          },
          {
            Fire: 4,
            Earth: 5
          }
        ],
        fast: false
      }
    ]
  },
  {
    name: 'Towering Roots of the Jungle',
    cards: [
      {
        name: 'Blooming of the Rocks and Trees',
        cost: 0,
        speed: 'Slow',
        elements: ['Sun', 'Air', 'Earth', 'Plant'],
        description: 'If no blight is present, add 1 wilds. If no invaders are present, add 1 wilds. If you have 3 sun, you may do both.'
      },
      {
        name: 'Boon of Resilient Power',
        cost: 1,
        speed: 'Slow',
        elements: ['Sun', 'Moon', 'Water', 'Plant'],
        description: 'Target Spirit may Add 1 presence to one of your lands. If you target yourself, gain a Major Power. Otherwise, target Spirit gains a Power Card.'
      },
      {
        name: 'Entwine the Fates of All',
        cost: 1,
        speed: 'Fast',
        elements: ['Moon', 'Water', 'Earth', 'Plant'],
        description: 'In one of target Spirit’s lands, Defend 2 per presence (from all Spirits).'
      },
      {
        name: 'Radiant and Hallowed Grove',
        cost: 2,
        speed: 'Fast',
        elements: ['Sun', 'Moon', 'Fire', 'Plant'],
        description:
          'Add 2 Fear if Invaders are present or adjacent. In both target and one adjacent land, you may Remove an Invader with Health less than or equal to the Terror Level. (Damage doesn’t reduce Health.)'
      }
    ],
    panel: {
      presences: [
        {
          point: {
            x: 51.2,
            y: 40.9
          },
          type: 'energy',
          value: 2
        },
        {
          point: {
            x: 59.05,
            y: 40.9
          },
          type: 'element',
          value: 'Earth'
        },
        {
          point: {
            x: 66.9,
            y: 40.9
          },
          type: 'energy',
          value: 4
        },
        {
          point: {
            x: 74.75,
            y: 40.9
          },
          type: 'element',
          value: 'Plant'
        },
        {
          point: {
            x: 82.7,
            y: 40.9
          },
          type: 'energy',
          value: 6
        },
        {
          point: {
            x: 51.2,
            y: 56.7
          },
          type: 'card-play',
          value: 2
        },
        {
          point: {
            x: 59.05,
            y: 56.7
          },
          type: 'element',
          value: 'Sun'
        },
        {
          point: {
            x: 66.9,
            y: 56.7
          },
          type: 'card-play',
          value: 3
        },
        {
          point: {
            x: 74.75,
            y: 56.7
          },
          type: 'element',
          value: 'Plant'
        },
        {
          point: {
            x: 82.6,
            y: 56.7
          },
          type: 'card-play',
          value: 4
        }
      ],
      scale: 6,
      energy: 1,
      cardPlay: 1
    },
    innate: [
      {
        name: 'Shelter Under Towering Branches',
        elements: [
          {
            Sun: 1,
            Plant: 1
          },
          {
            Plant: 2,
            Sun: 1,
            Earth: 1
          },
          {
            Sun: 2,
            Earth: 1,
            Plant: 3
          },
          {
            Plant: 4,
            Earth: 2,
            Sun: 3
          }
        ],
        fast: false
      },
      {
        name: 'Revoke Sanctuary and Cast Out',
        elements: [
          {
            Sun: 1,
            Moon: 1,
            Plant: 2
          },
          {
            Sun: 2,
            Moon: 1,
            Plant: 3
          },
          {
            Sun: 2,
            Moon: 2,
            Plant: 4
          }
        ],
        fast: false
      }
    ]
  },
  {
    name: 'Hearth-Vigil',
    cards: [
      {
        name: 'Call to Vigilance',
        cost: 2,
        speed: 'Slow',
        elements: ['Sun', 'Air', 'Animal'],
        description: '2 Fear if Invaders are present. For each town/city in origin land, Push up to 1 town/city.'
      },
      {
        name: 'Coordinated Raid',
        cost: 1,
        speed: 'Slow',
        elements: ['Sun', 'Earth', 'Animal'],
        description: '1 Damage. If towns/cities are present, 1 Damage.'
      },
      {
        name: 'Favors of Story and Season',
        cost: 1,
        speed: 'Fast',
        elements: ['Sun', 'Earth', 'Plant', 'Animal'],
        description:
          'Target Spirit may Gather up to 3 Dahan into one of their lands. If they have at least 3 Dahan among their lands, they gain 1 Energy and may Reclaim 1 Power Card instead of discarding it at the end of turn.'
      },
      {
        name: 'Surrounded By The Dahan',
        cost: 0,
        speed: 'Fast',
        elements: ['Moon', 'Air', 'Animal'],
        description: '2 Fear if Invaders are present. 1 Fear if Dahan outnumber Invaders. Isolate target land.'
      }
    ],
    setup: setupHearthVigil
  },
  {
    name: 'Wandering Voice Keens Delirium',
    cards: [
      {
        name: 'Exhale Confusion and Delirium',
        cost: 0,
        speed: 'Fast',
        elements: ['Sun', 'Moon', 'Air', 'Animal'],
        description: 'Invaders with disease don’t participate in Ravage. (Check when Ravaging; they don’t do Damage or take counterattack Damage.)'
      },
      {
        name: 'Frightful Keening',
        cost: 1,
        speed: 'Slow',
        elements: ['Sun', 'Fire', 'Air'],
        description: 'Push Dahan. If this pushes Dahan into a land with Invaders, add 2 Fear there (before adding Dahan).'
      },
      {
        name: 'Twist Perceptions',
        cost: 1,
        speed: 'Slow',
        elements: ['Moon', 'Air', 'Animal'],
        description: 'Add 1 Fear. You may Push the Invader you added Fear to. (If you add Fear to Town/City, you can push that Invader first with Senseless Roaming before pushing it with this Power.)'
      },
      {
        name: "Turmoil's Touch",
        cost: 0,
        speed: 'Slow',
        elements: ['Sun', 'Moon', 'Air', 'Plant'],
        description: 'Target Spirit may either pay 1 Energy or discard a Power Card (from hand) to Take a Minor Power into their discard. You may do likewise.'
      }
    ]
  }
]
