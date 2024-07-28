import { addFearToTop, moveBack2FearPerPlayer, putEventUnderTwo, returnTopFearToBox, returnTopInvaderCardToBox } from '@/utils/event'

export const EVENT_CARDS: Array<{
  name: string
  action?: { title: string; fn: () => void }
  action_2?: { title: string; fn: () => void }
}> = [
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
  {
    name: 'invested_aristocracy',
    action: { title: 'Add Fear', fn: addFearToTop }
  },
  { name: 'investigation_of_dangers' },
  { name: 'lifes_balance_tilts' },
  { name: 'mapmakers_chart_the_wild' },
  {
    name: 'missionaries_arrive',
    action: { title: 'Put under top 2 cards', fn: putEventUnderTwo }
  },
  {
    name: 'new_species_spread',
    action: { title: 'Put under top 2 cards', fn: putEventUnderTwo }
  },
  { name: 'no_bravery_without_numbers' },
  {
    name: 'overconfidence',
    action: { title: 'Reduce fear', fn: moveBack2FearPerPlayer }
  },
  { name: 'population_rises' },
  { name: 'promising_farmland' },
  { name: 'provincial_seat' },
  { name: 'pull_together_in_adversity' },
  { name: 'putting_down_roots' },
  { name: 'relentless_optimism' },
  { name: 'remnants_of_a_spirits_heart' },
  { name: 'resourceful_populace' },
  {
    name: 'rising_interest_in_the_island',
    action: { title: 'Return top fear card', fn: returnTopFearToBox },
    action_2: {
      title: 'Return top invader card',
      fn: returnTopInvaderCardToBox
    }
  },
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
  {
    name: 'far_off_wars_touch_the_island',
    action: {
      title: 'Add Fear',
      fn: addFearToTop
    }
  },
  { name: 'focused_farming' },
  { name: 'influx_of_settlers' },
  { name: 'search_for_unclaimed_land' },
  { name: 'terror_spikes_upwards' },
  { name: 'visions_out_of_time' }
]
