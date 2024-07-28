import type { Adversary } from '@/types'

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
      [4, 4, 4]
    ],
    difficultly: [1, 2, 4, 6, 7, 8, 9],
    invaders: ['', '', '111322223333', '11322223333', '1132223333', '132223333', '32223333'],
    id: 'prussia',
    detail: {
      title: 'The Kingdom of Brandenburg-Prussia',
      loss: {
        name: null,
        text: 'None'
      },
      escalation: {
        name: 'Land Rush',
        text: 'On each board with Townicon.png/Cityicon.png, add 1 Townicon.png to a land without Townicon.png'
      },
      levelText: [
        {
          name: 'Fast Start',
          text: 'During Setup, on each board add 1 Townicon.png to land #3'
        },
        {
          name: 'Surge of Colonists',
          text: 'New Invader Deck Order:111-3-2222-3333'
        },
        {
          name: 'Efficient',
          text: 'New Invader Deck Order:11-3-2222-3333'
        },
        {
          name: 'Aggressive Timetable',
          text: 'New Invader Deck Order:11-3-222-3333'
        },
        {
          name: 'Ruthlessly Efficient',
          text: 'New Invader Deck Order:1-3-222-3333'
        },
        {
          name: 'Terrifyingly Efficient',
          text: 'New Invader Deck Order:3-222-3333'
        }
      ]
    },
    setup: [
      {},
      {
        piece: 'Add 1 Townicon.png to land #3'
      },
      {
        invaders: '111-3-2222-3333'
      },
      {
        invaders: '11-3-2222-3333'
      },
      {
        invaders: '11-3-222-3333'
      },
      {
        invaders: '1-3-222-3333'
      },
      {
        invaders: '3-222-3333'
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
      [4, 5, 4]
    ],
    difficultly: [1, 3, 4, 6, 7, 9, 11],
    id: 'england',
    detail: {
      title: 'The Kingdom of Brandenburg-Prussia',
      loss: {
        name: 'Proud & Mighty Capital',
        text: 'If 7 or more Townicon.png/Cityicon.png are ever in a single land, the Invaders win'
      },
      escalation: {
        name: 'Building Boom',
        text: 'On each board with Townicon.png/Cityicon.png, Build in the land with the most Townicon.png/Cityicon.png'
      },
      levelText: [
        {
          name: 'Indentured Servants Earn Land',
          text: 'Invader Build Cards affect matching lands without Invaders if they are adjacent to at least 2 Townicon.png/Cityicon.png',
          isHighlight: true
        },
        {
          name: 'Criminals and Malcontents',
          text: 'During Setup, on each board add 1 Cityicon.png to land #1 and 1 Townicon.png to land #2'
        },
        {
          name: 'High Immigration (I)',
          text: 'Put the "High Immigration" tile on the Invader board, to the left of "Ravage". The Invaders take this Build action each Invader phase before Ravaging. Cards slide left from Ravage to it, and from it to the discard pile. Remove the tile when a Stage II card slides onto it, putting that card in the discard'
        },
        {
          name: 'High Immigration (full)',
          text: 'The extra Build tile remains out the entire game'
        },
        {
          name: 'Local Autonomy',
          text: 'Townicon.png/Cityicon.png have +1 Health',
          isHighlight: true
        },
        {
          name: 'Independent Resolve',
          text: 'During Setup, add an additional Fear to the Fear Pool per player in the game. During any Invader Phase where you resolve no Fear Cards, perform the Build from High Immigration twice. (This has no effect if no card is on the extra Build slot.)',
          isHighlight: true
        }
      ]
    },
    setup: [
      {},
      {},
      {
        piece: 'Add 1Townicon.png to land #2 and 1Cityicon.png to land #1'
      },
      {
        piece: 'Put the "High Immigration" tile on the Invader board'
      },
      {},
      {},
      {}
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
      [4, 5, 5]
    ],
    difficultly: [2, 3, 5, 7, 8, 9, 10],
    id: 'france',
    detail: {
      title: 'The Kingdom of France (Plantation Colony)',
      loss: {
        name: 'Sprawling Plantations',
        text: 'Before Setup, return all but 7 Townicon.png per player ot the box. Invaders win if you ever cannot place a Townicon.png.'
      },
      escalation: {
        name: 'Demand for New Cash Crops',
        text: 'After Exploring, on each board, pick a land of the shown terrain. If it has Townicon.png/Cityicon.png, add 1 Blight.png. Otherwise, add 1 Townicon.png'
      },
      levelText: [
        {
          name: 'Frontier Explorers',
          text: 'Except during Setup: After Invaders successfully Explore into a land which had no Townicon.png/Cityicon.png, add 1 Explorericon.png there',
          isHighlight: true
        },
        {
          name: 'Slave Labor',
          text: 'During Setup, put the "Slave Rebellion" event under the top 3 cards of the Event Deck. After Invaders Build in a land with 2 Explorericon.png or more, replace all but 1 Explorericon.png there with an equal number of Townicon.png',
          isHighlight: true
        },
        {
          name: 'Early Plantation',
          text: 'During Setup, on each board add 1 Townicon.png to the highest-numbered land without Townicon.png. Add 1 Townicon.png to land #1'
        },
        {
          name: 'Triangle Trade',
          text: 'Whenever Invaders Build a Coastal Cityicon.png, add 1 Townicon.png to the adjacent land with the fewest Townicon.png',
          isHighlight: true
        },
        {
          name: 'Slow-Healing Ecosystem',
          text: 'When you remove Blight.png from the board, put it here instead of onto the Blight Card. As soon as you have 3 Blight.png per player here, move it all back to the Blight Card',
          isHighlight: true
        },
        {
          name: 'Persistent Explorers',
          text: 'After resolving an Explore Card, on each board add 1 Explorericon.png to a land without any. Fear Card effects never remove Explorericon.png. If one would, you may instead Push that Explorericon.png',
          isHighlight: true
        }
      ]
    },
    setup: [
      {
        piece: 'Return all but 7Townicon.png to the box'
      },
      {},
      {},
      {
        piece: 'Add 1Townicon.png to the highest-numbered land without Townicon.png. Add 1Townicon.png to land #1'
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
      [4, 4, 5]
    ],
    difficultly: [1, 2, 3, 5, 6, 7, 8],
    id: 'sweden',
    detail: {
      title: 'The Kingdom of Sweden',
      loss: {
        name: null,
        text: 'None'
      },
      escalation: {
        name: 'Swayed by the Invaders',
        text: 'After Invaders Explore into each land this Phase, if that land has at least as many Invaders as Dahan, replace 1 Dahan with 1 Townicon.png'
      },
      levelText: [
        {
          name: 'Heavy Mining',
          text: 'If the Invaders do at least 6 Damage to the land during Ravage, add an extra Blight.png. The additional Blight.png does not destroy Presence or cause cascades',
          isHighlight: true
        },
        {
          name: 'Population Pressure at Home',
          text: 'During Setup, on each board add 1 Cityicon.png to land #4. On boards where land #4 starts with Blight.png, put that Blight.png in land #5 instead'
        },
        {
          name: 'Fine Steel for Tools and Guns',
          text: 'Townicon.png deal 3 Damage. Cityicon.png deal 5 Damage',
          isHighlight: true
        },
        {
          name: 'Royal Backing',
          text: 'During Setup, after adding all other Invaders, discard the top card of the Invader Deck. On each board, add 1 Townicon.png to the land of that terrain with the fewest Invaders'
        },
        {
          name: 'Mining Rush',
          text: 'When Ravaging adds at least 1 Blight.png to a land, also add 1 Townicon.png to an adjacent land without Townicon.png/Cityicon.png. Cascading Blight.png does not cause this effect',
          isHighlight: true
        },
        {
          name: 'Prospecting Outpost',
          text: 'During setup, on each board add 1 Townicon.png and 1 Blight.png to land #8. The Blight.png comes from the box, not the Blight Card'
        }
      ]
    },
    setup: [
      {},
      {},
      {
        piece: 'Add 1Cityicon.png to land #4. If land #4 has Blight.png, put that Blight.png in land #5 instead'
      },
      {},
      {
        piece: 'After adding all other Invaders, discard the top card of the Invader Deck. On each board, add 1Townicon.png to the land of that terrain with the fewest Invaders'
      },
      {},
      {
        piece: 'Add 1Townicon.png and 1Blight.png to land #8'
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
      [5, 6, 3]
    ],
    difficultly: [2, 3, 5, 6, 8, 9, 10],
    invaders: ['', '', '', '11222233333', '11222233333', '11222233333', '11222233333'],
    id: 'habsburg',
    detail: {
      title: 'The Habsburg Monarchy (Livestock Colony)',
      loss: {
        name: 'Irreparable Damage',
        text: 'Track how many Blight.png come off the Blight Card during Ravages that do 8+ Damage to the land. If that number ever exceeds players, the Invaders win'
      },
      escalation: {
        name: 'Seek Prime Territory',
        text: 'After Exploring: On each board with 4 or fewer Blight.png, add 1 Townicon.png to a land without Townicon.png/Blight.png. On each board with 2 or fewer Blight.png, do so again'
      },
      levelText: [
        {
          name: 'Migratory Herders',
          text: 'After the normal Build Step: In each land matching a Build Card, Gather 1 Townicon.png from a land not matching a Build Card. (In board/land order.)',
          isHighlight: true
        },
        {
          name: 'More Rural Than Urban',
          text: 'During Setup, on each board, add 1 Townicon.png to land #2 and 1 Townicon.png to the highest-numbered land without Setup symbols. During Play, when Invaders would Build 1 Cityicon.png in an Inland land, they instead Build 2 Townicon.png',
          isHighlight: true
        },
        {
          name: 'Fast Spread',
          text: 'When making the Invader Deck, Remove 1 additional Stage I Card. (New deck order: 11-2222-33333)'
        },
        {
          name: 'Herds Thrive in Verdant Lands',
          text: 'Townicon.png in lands without Blight.png are Durable: they have +2 Health, and "Destroy Townicon.png" effects instead deal 2 Damage (to those Townicon.png only) per Townicon.png they could Destroy. ("Destroy all Townicon.png" works normally.)',
          isHighlight: true
        },
        {
          name: 'Wave of Immigration',
          text: 'Before the initial Explore, put the Habsburg Reminder Card under the top 5 Invader Cards. When Revealed, on each board, add 1 Cityicon.png to a Coastal land without Cityicon.png and 1 Townicon.png to the 3 Inland lands with the fewest Blight.png'
        },
        {
          name: 'Far-Flung Herds',
          text: 'Ravages do +2 Damage (total) if any adjacent lands have Townicon.png. (This does not cause lands without Invaders to Ravage.)',
          isHighlight: true
        }
      ]
    },
    setup: [
      {},
      {},
      {
        piece: 'Add 1Townicon.png to land #2 and 1Townicon.png to the highest-numbered land without Setup symbols'
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
      [4, 5, 4]
    ],
    difficultly: [1, 3, 4, 5, 7, 9, 10],
    invaders: ['', '', '', '', '1112D2233333', '1112D2233333', '1112D2233333'],
    id: 'habsburg-mining',
    detail: {
      title: 'Habsburg Mining Expedition',
      loss: {
        name: 'Land Stripped Bare',
        text: 'At the end of the Fasticon.png Phase, the Invaders win if any land has at least 8 total Invaders/Blight.png (combined).'
      },
      escalation: {
        name: 'Mining Tunnels',
        text: `After Advancing Invader Cards: On each board, Explore in 2 lands whose terrains don't match a Ravage or Build Card (no source required).`
      },
      levelText: [
        {
          name: 'Ceaseless Mining',
          text: `When Blight added by a Ravage Action would cascade, instead Upgrade 1 Explorericon.png/Townicon.png (before Dahan counterattack.):break:
          Lands with 3 or more Invaders are Mining lands. In Mining lands::break:
          • Disease and modifiers to Disease affect Ravage Actions as though they were Build Actions.:break:
          • During the Build Step, Build Cards cause Ravage Actions (instead of Build Actions).`,
          isHighlight: true
        },
        {
          name: 'Miners Come From Far and Wide',
          text: 'Setup: Add 1 Explorericon.png in each land with no Dahan. Add 1 Disease and 1 Cityicon.png in the highest-numbered land with a Townicon.png Setup symbol.'
        },
        {
          name: 'Mining Boom (I)',
          text: 'After the Build Step, on each board: Choose a land with Explorericon.png. Upgrade 1 Explorericon.png there',
          isHighlight: true
        },
        {
          name: 'Untapped Salt Deposits',
          text: `Setup: Remove the Stage II 'Coastal Lands' card before randomly choosing Stage II cards. Place the 'Salt Deposits' card in place of the 2nd Stage II card.:break:
          (New Deck Order: 111-2S22-33333, where S is the Salt Deposits card. Escalation ignores S.)`
        },
        {
          name: 'Mining Boom (II)',
          text: `Instead of Mining Boom (I), after the Build Step, on each board: Choose a land with Explorericon.png. Build there, then Upgrade 1 Explorericon.png. (Build normally in a Mining land.)`,
          isHighlight: true
        },
        {
          name: 'The Empire Ascendant',
          text: 'Setup and During the Explore Step: On boards with 3 or fewer Blight.png: Add +1 Explorericon.png in each land successfully explored. (Max. 2 lands per board per Explore Card.)',
          isHighlight: true
        }
      ]
    },
    setup: [
      {},
      {},
      {
        piece: 'Add 1Explorericon.png to each land without Dahan. Add 1Disease and 1Cityicon.png to the highest-numbered land with a Townicon.png Setup symbol'
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
      [5, 5, 4]
    ],
    difficultly: [1, 3, 4, 6, 7, 9, 11],
    invaders: ['', '', '', '', '111232323233', '111232323233', '111232323233'],
    id: 'russia',
    detail: {
      title: 'The Tsardom of Russia',
      loss: {
        name: 'Hunters Swarm the Island',
        text: 'Put Beasts Destroyed by Adversary rules on this panel. If there are ever more Beasts on this panel than on the island, the Invaders win'
      },
      escalation: {
        name: 'Stalk the Predators',
        text: "On each board: Add 2 Explorericon.png (total) among lands with Beasts. If you can't, instead add 2 Explorericon.png among lands with Beasts on a different board"
      },
      levelText: [
        {
          name: 'Hunters Bring Home Shell and Hide',
          text: 'During Setup, on each board, add 1 Beasts and 1 Explorericon.png to the highest-numbered land without Townicon.png/Cityicon.png. During Play, Explorericon.png do +1 Damage. When Ravage adds Blight.png to a land (including cascades), Destroy 1 Beasts in that land',
          isHighlight: true
        },
        {
          name: 'A Sense for Impending Disaster',
          text: 'The first time each Action would Destroy Explorericon.png: If possible, 1 of those Explorericon.png is instead Pushed; 1 Fear when you do so',
          isHighlight: true
        },
        {
          name: 'Competition Among Hunters',
          text: 'Ravage Cards also match lands with 3 or more Explorericon.png. (If the land already matched the Ravage Card, it still Ravages just once.)',
          isHighlight: true
        },
        {
          name: 'Accelerated Exploitation',
          text: 'When making the Invader Deck, put 1 Stage III Card after each Stage II Card. (New Deck Order: 111-2-3-2-3-2-3-2-33)'
        },
        {
          name: 'Entrench in the Face of Fear',
          text: 'Put an unused Stage II Invader Card under the top 3 Fear Cards, and an unused Stage III Card under the top 7 Fear Cards. When one is revealed, immediately place it in the Build space (face-up)'
        },
        {
          name: 'Pressure for Fast Profit',
          text: 'After the Ravage Step of turn 2+, on each board where it added no Blight.png: In the land with the most Explorericon.png (min. 1), add 1 Explorericon.png and 1 Townicon.png',
          isHighlight: true
        }
      ]
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
      [6, 6, 4]
    ],
    difficultly: [1, 3, 4, 6, 7, 8, 10],
    invaders: ['', '', '11221C233333', '11221C233333', '11223C23333', '11223C23333', '11223C23333'],
    id: 'scotland',
    detail: {
      title: 'The Kingdom of Scotland',
      loss: {
        name: 'Trade Hub',
        text: 'If the number of Coastal lands with Cityicon.png is ever greater than (2 x # of boards), the Invaders win'
      },
      escalation: {
        name: 'Ports Sprawl Outward',
        text: 'On the single board with the most Coastal Townicon.png/Cityicon.png, add 1 Townicon.png to the N lands with the fewest Townicon.png (N = # of players.)'
      },
      levelText: [
        {
          name: 'Trading Port',
          text: 'After Setup, in Coastal lands, Explore Cards add 1 Townicon.png instead of 1 Explorericon.png . "Coastal Lands" Invader cards do this for maximum 2 lands per board',
          isHighlight: true
        },
        {
          name: 'Seize Opportunity',
          text: 'During Setup, add 1 Cityicon.png to land #2. Place "Coastal Lands" as the 3rd Stage II card, and move the two Stage II Cards above it up by one. (New Deck Order: 11-22-1-C2-33333, where C is the Stage II Coastal Lands Card.)'
        },
        {
          name: 'Chart the Coastline',
          text: 'In Coastal lands, Build Cards affect lands without Invaders, so long as there is an adjacent Cityicon.png',
          isHighlight: true
        },
        {
          name: 'Ambition of a Minor Nation',
          text: 'During Setup, replace the bottom Stage I Card with the bottom Stage III Card. (New Deck Order: 11-22-3-C2-3333)'
        },
        {
          name: 'Runoff and Bilgewater',
          text: "After a Ravage Action adds Blight.png to a Coastal Land, add 1 Blight.png to that board's Ocean (without cascading). Treat the Ocean as a Coastal Wetland for this rule and for Blight.png removal/movement",
          isHighlight: true
        },
        {
          name: 'Exports Fuel Inward Growth',
          text: 'After the Ravage step, add 1 Townicon.png to each Inland land that matches a Ravage card and is within Rangeicon.png of Townicon.png/Cityicon.png',
          isHighlight: true
        }
      ]
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
  }
]
