<template>
  <div>
    <ais-instant-search-ssr
      :search-client="searchClient"
      index-name="demo_ecommerce"
    >
      <ais-search-box />
      <ais-configure
        :hits-per-page="5"
        :restrict-searchable-attributes="['name']"
      />
      <ais-autocomplete>
        <template slot-scope="{ currentRefinement, indices, refine }">
          <vue-autosuggest
            :suggestions="indicesToSuggestions(indices)"
            :input-props="{
              style: 'width: 100%',
              onInputChange: refine,
              placeholder: 'Search here…'
            }"
            @selected="onSelect"
          >
            <template slot-scope="{ suggestion }">
              <ais-highlight
                v-if="suggestion.item.brand"
                :hit="suggestion.item"
                attribute="brand"
              />
              <strong>$ {{ suggestion.item.price }}</strong>
              <img :src="suggestion.item.image" />
            </template>
          </vue-autosuggest>
        </template>
      </ais-autocomplete>
    </ais-instant-search-ssr>
  </div>
</template>

<script>
import algoliasearch from 'algoliasearch/lite'
import {
  AisInstantSearchSsr,
  AisSearchBox,
  AisAutocomplete,
  AisHighlight,
  AisConfigure,
  createInstantSearch
} from 'vue-instantsearch'
import { VueAutosuggest } from 'vue-autosuggest'

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
)

/*
const searchClient = algoliasearch(
  '17HRN2A0ND',
  'cdeb268994f7da3f6f530b6072caed2d'
)
*/
const { instantsearch, rootMixin } = createInstantSearch({
  searchClient,
  indexName: 'instant_search'
})
export default {
  components: {
    AisSearchBox,
    VueAutosuggest,
    AisAutocomplete,
    AisConfigure,
    AisHighlight,
    AisInstantSearchSsr
  },
  mixins: [rootMixin],
  asyncData() {
    return instantsearch
      .findResultsState({
        // find out which parameters to use here using ais-state-results
        query: 'iphone',
        hitsPerPage: 10,
        disjunctiveFacets: ['brand']
      })
      .then(() => ({
        instantSearchState: instantsearch.getState()
      }))
  },
  beforeMount() {
    instantsearch.hydrate(this.instantSearchState)
  },
  methods: {
    onSelect(selected) {
      if (selected) {
        this.query = selected.item.name
      }
    },
    indicesToSuggestions(indices) {
      return indices.map(({ hits }) => ({ data: hits }))
    }
  }
}
</script>
