<template>
  <ais-instant-search-ssr>
    <v-text-field
      slot="activator"
      solo-inverted
      flat
      hide-details
      label="Search"
      prepend-inner-icon="mdi-magnify"
    />
    <ais-search-box />

    <ais-hits>
      <template slot="item" slot-scope="{ item }">
        <v-card class="mx-auto" max-width="400" tile>
          <v-subheader>Search:</v-subheader>
          <v-list-item shaped three-line>
            <v-list-item-content>
              <v-list-item-title>
                <ais-highlight attribute="brand" :hit="item" />
              </v-list-item-title>
              <v-list-item-subtitle
                ><ais-highlight attribute="name" :hit="item"
              /></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </template>
    </ais-hits>
    <ais-pagination />
  </ais-instant-search-ssr>
</template>

<script>
import {
  AisInstantSearchSsr,
  AisHits,
  AisHighlight,
  AisSearchBox,
  AisPagination,
  createInstantSearch
} from 'vue-instantsearch'
import algoliasearch from 'algoliasearch/lite'

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
)

const { instantsearch, rootMixin } = createInstantSearch({
  searchClient,
  indexName: 'instant_search'
})

export default {
  components: {
    AisInstantSearchSsr,
    AisHits,
    AisHighlight,
    AisSearchBox,
    AisPagination
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
  computed: {
    processingTimeMS() {
      return this.$state.processingTimeMS
    }
  },
  beforeMount() {
    instantsearch.hydrate(this.instantSearchState)
  },
  head() {
    return {
      /*
      link: [
        {
          rel: 'stylesheet',
          href:
            'https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/algolia-min.css'
          // 'https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/reset-min.css'
        }
      ] */
    }
  }
}
</script>
