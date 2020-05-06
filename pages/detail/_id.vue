<template>
  <div>
    <v-layout>
      <v-flex>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex xs4 md4 lg4>
              <v-card hover height="100%" class="card-outter">
                <v-card-title>
                  Enrichment score:
                  <v-spacer></v-spacer>
                  <v-img src="/img/motif_logo/enrichmentScore1.png" />
                </v-card-title>
                <v-card-actions class="card-actions">
                  <a
                    href="/img/motif_logo/enrichmentScore1.png"
                    target="_blank"
                    style="text-decoration:none;"
                    ><v-btn text color="secondary">
                      Download
                    </v-btn></a
                  >
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs3 md3 lg3>
              <v-card hover>
                <v-card-title>
                  Coverage:
                  <v-img src="/img/motif_logo/DGF1.png" /> </v-card-title
                ><v-spacer></v-spacer
                ><v-card-actions>
                  <a
                    href="/img/motif_logo/DGF1.png"
                    target="_blank"
                    style="text-decoration:none;"
                    ><v-btn text color="secondary">
                      Download
                    </v-btn></a
                  >
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs4 md4 lg3>
              <v-card hover>
                <v-card-title>
                  Conservation:

                  <v-img src="/img/motif_logo/phastCons1.png" /> </v-card-title
                ><v-spacer></v-spacer
                ><v-card-actions>
                  <a
                    href="/img/motif_logo/phastCons1.png"
                    target="_blank"
                    style="text-decoration:none;"
                    ><v-btn text color="secondary">
                      Download
                    </v-btn></a
                  >
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs12 md12 lg12>
              <v-card hover height="100%" class="card-outter">
                <v-card-title>
                  Position frequency matrix:
                </v-card-title>
                <span>A: </span>
                <span v-for="item in matrix" :key="item.id">
                  <span v-if="item.rows == 'A'">{{ item.vals }} </span>
                </span>
                <v-divider></v-divider>
                <span>C: </span>
                <span v-for="item in matrix" :key="item.id">
                  <span v-if="item.rows == 'C'">{{ item.vals }} </span> </span
                ><v-divider></v-divider>
                <span>G: </span>
                <span v-for="item in matrix" :key="item.id">
                  <span v-if="item.rows == 'A'">{{ item.vals }} </span> </span
                ><v-divider></v-divider>
                <span>T: </span>
                <span v-for="item in matrix" :key="item.id">
                  <span v-if="item.rows == 'A'">{{ item.vals }} </span> </span
                ><v-divider></v-divider>
                <v-card-actions class="card-actions">
                  <a
                    href="/img/motif_logo/test1.jaspar"
                    target="_blank"
                    style="text-decoration:none;"
                    ><v-btn text color="secondary">
                      JASPAR
                    </v-btn></a
                  >
                  <a
                    href="/img/motif_logo/test1.meme"
                    target="_blank"
                    style="text-decoration:none;"
                    ><v-btn text color="secondary">
                      MEME
                    </v-btn></a
                  >
                  <a
                    href="/img/motif_logo/test1.pfm"
                    target="_blank"
                    style="text-decoration:none;"
                    ><v-btn text color="secondary">
                      Raw matrix
                    </v-btn></a
                  >
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs12 md12 lg12>
              <v-card hover>
                <v-card-title>
                  Browse motif instances:
                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                  ></v-text-field>
                </v-card-title>
                <v-data-table
                  :headers="headers"
                  :items="tfbs"
                  :items-per-page="15"
                  :search="search"
                  class="elevation-1"
                  @click:row="handleClick"
                ></v-data-table>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import { mapState } from 'vuex' // <--- To map motif

export default {
  async asyncData({ store, error, params }) {
    try {
      await store.dispatch('motifs/fetchTfbs', params.id)
      await store.dispatch('motifs/fetchMatrix', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message: 'ERROR CODE 503, using async await single tfbs' + params.id
      })
    }
  },
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Motif ID',
          align: 'start',
          sortable: false,
          value: 'base_id'
        },
        { text: 'row', value: 'row' },
        { text: 'chromosome', value: 'chrom' },
        { text: 'start', value: 'start' },
        { text: 'end', value: 'end' },
        { text: 'sequence', value: 'sequence' },
        { text: 'nearset gene', value: 'near_gene' },
        { text: 'distance to nearest gene', value: 'distance_near_gene' }
      ]
    }
  },
  computed: mapState({
    tfbs: (state) => state.motifs.tfbs,
    matrix: (state) => state.motifs.matrix
  }),

  head() {
    return {
      title: 'Motif details',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'What you need to know about motif #'
        }
      ]
    }
  }
}
</script>
<style scoped>
.prompt-box {
  position: relative;
  overflow: hidden;
  padding: 1em;
  margin-bottom: 24px;
  transform: scaleY(1);
}
.prompt-box > .title {
  margin: 0 0 0.5em;
}
.prompt-box > .title > .meta {
  margin-left: 10px;
}
.prompt-box > .actions {
  display: flex;
  align-items: center;
}
.prompt-box > button {
  margin-right: 0.5em;
}
.prompt-box > button:last-of-type {
  margin-right: 0;
}
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.motif-header > .title {
  margin: 0;
}
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list-group > .list-item {
  padding: 1em 0;
  border-bottom: solid 1px #e5e5e5;
}

.card-outter {
  position: relative;
  padding-bottom: 50px;
}
.card-actions {
  position: absolute;
  bottom: 0;
}
</style>
