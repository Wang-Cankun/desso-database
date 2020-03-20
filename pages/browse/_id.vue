<template>
  <div>
    <v-layout>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex xs12 md6 lg3>
            <v-hover v-slot:default="{ hover }" open-delay="0">
              <v-card
                class="mx-auto"
                :elevation="hover ? 10 : 2"
                :class="{ 'on-hover': hover }"
              >
                <v-card-text>
                  <p class="text--primary">Data ID: {{ motif[0].data_id }}</p>
                  <p class="display-1 text--primary">
                    Target: {{ motif[0].tf_name }}
                  </p>
                  <img
                    src="~/assets/img/motif_logo/DE00000102.png"
                    style="width:300px"
                  />
                  <p class="text--primary">Class: {{ motif[0].tf_class }}</p>
                  <p class="text--primary">Family: {{ motif[0].tf_family }}</p>
                  <p class="text--primary">
                    Dataset source:
                  </p>
                  <p class="text--primary">
                    Species:
                  </p>
                  <p class="text--primary">
                    Experiment:
                  </p>
                  <p class="text--primary">
                    Pubmed ID:
                  </p>
                </v-card-text>
                <v-card-actions>
                  <v-btn text color="secondary">
                    Predict from your data
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-flex>
          <v-flex v-for="(n, i) in motif.length" :key="n" xs12 md6 lg3>
            <v-hover v-slot:default="{ hover }" open-delay="0">
              <v-card
                class="mx-auto pa-2"
                max-width="400"
                tile
                :elevation="hover ? 10 : 2"
                :class="{ 'on-hover': hover }"
              >
                <v-card-text>
                  <p class="text--primary">Motif ID: {{ motif[i].base_id }}</p>
                  <img
                    src="~/assets/img/motif_logo/DE00000101.png"
                    style="width:300px"
                  />
                  <p class="text--primary ma-0">
                    Class: {{ motif[i].tf_class }}
                  </p>
                  <p class="text--primary ma-0">
                    Family: {{ motif[i].tf_family }}
                  </p>
                  <p class="text--primary ma-0">
                    Collection:
                    {{ motif[i].collection.toLowerCase() }} motif
                  </p>

                  <p class="text--primary ma-0">
                    Type: {{ motif[i].motif_type.toLowerCase() }} motif
                  </p>
                  <v-divider></v-divider>
                  <p class="text--primary ma-0">
                    TF name in JASPAR:
                    <span class="font-weight-bold">
                      <a
                        href="http://jaspar.genereg.net/matrix/MA0080.1/"
                        target="_blank"
                        style="text-decoration:none;"
                      >
                        {{ motif[i].tf_name_jaspar }}</a
                      >
                    </span>
                  </p>
                  <p class="text--primary ma-0">
                    TF name in HOCOMOCO:
                    <span class="font-weight-bold"
                      ><a
                        href="http://jaspar.genereg.net/matrix/MA0080.1/"
                        target="_blank"
                        style="text-decoration:none;"
                        >{{ motif[i].tf_name_hocomoco }}</a
                      ></span
                    >
                  </p>
                  <p class="text--primary ma-0">
                    TF name in Transfac:
                    <span class="font-weight-bold"
                      ><a
                        href="http://jaspar.genereg.net/matrix/MA0080.1/"
                        target="_blank"
                        style="text-decoration:none;"
                        >{{ motif[i].tf_name_transfac }}</a
                      ></span
                    >
                  </p>
                </v-card-text>
                <v-card-actions>
                  <nuxt-link
                    :to="'/detail/' + motif[i].base_id"
                    style="text-decoration:none;"
                  >
                    <v-btn color="secondary" text>
                      Explore details
                    </v-btn>
                  </nuxt-link>
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </div>
</template>
<script>
import { mapState } from 'vuex' // <--- To map motif

export default {
  async asyncData({ store, error, params }) {
    try {
      await store.dispatch('motifs/fetchMotif', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message: 'ERROR CODE 503, using async await single motif' + params.id
      })
    }
  },
  computed: mapState({
    motif: (state) => state.motifs.motif
  }),
  head() {
    return {
      title: this.motif.data_id,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'What you need to know about motif #' + this.motif.data_id
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
</style>
