<template>
  <v-hover v-slot:default="{ hover }" open-delay="0">
    <v-card
      height="100%"
      class="mx-auto"
      :elevation="hover ? 10 : 2"
      :class="{ 'on-hover': hover }"
    >
      <v-card-title class="accent white--text subtitle-1"
        >Transcription factor information</v-card-title
      >
      <v-card-text>
        <p class="subtitle-1 my-3 text--primary">Data ID: {{ tf.data_id }}</p>
        <p class="display-1 text--primary">{{ tf.tf_name }}</p>
        <v-img src="/img/motif_logo/DE00000102.png"></v-img>
      </v-card-text>

      <v-layout row wrap>
        <v-flex xs12 md12 lg7
          ><v-card-title class="my-0 py-0"
            >Overview<v-divider class="my-0 py-0"></v-divider
          ></v-card-title>

          <v-card-text>
            <p class="my-0">
              <span class="text--secondary">Species: </span>
              <span class="text--primary">Human</span>
            </p>
            <p class="my-0">
              <span class="text--secondary">Class: </span>
              <span class="text--primary">{{ tf.tf_class }}</span>
            </p>
            <p class="my-0">
              <span class="text--secondary">Family: </span>
              <span class="text--primary">{{ tf.tf_family }}</span>
            </p>
          </v-card-text>
          <v-card-title class="my-0 py-0"
            >Dataset information
            <v-divider class="my-0 py-0"></v-divider>
          </v-card-title>
          <v-card-text>
            <div v-for="item in terms" :key="item.id">
              <p class="my-0">
                <span class="text--secondary">{{ item.title }}</span>
                <span v-if="item.link" class="text--primary"
                  ><a
                    :href="item.link"
                    target="_blank"
                    style="text-decoration:none;"
                    >{{ item.value }}
                  </a></span
                >
                <span v-else class="text--primary">{{ item.value }}</span>
              </p>
            </div>
          </v-card-text></v-flex
        >
        <v-flex xs12 md12 lg5
          ><v-card-title class="my-0 py-0"
            >Links
            <v-divider class="my-0 py-0"></v-divider>
          </v-card-title>
          <v-card-text>
            <p class="my-0">
              <a
                :href="
                  'https://www.genecards.org/cgi-bin/carddisp.pl?gene=' +
                    tf.tf_name
                "
                target="_blank"
                style="text-decoration:none;"
                >GeneCards
              </a>
            </p>
            <p class="my-0">
              <a
                :href="
                  'http://useast.ensembl.org/Homo_sapiens/Search/Results?q=' +
                    tf.tf_name +
                    ';site=ensembl;facet_species=Human'
                "
                target="_blank"
                style="text-decoration:none;"
                >Ensembl
              </a>
            </p>
            <p class="my-0">
              <a
                :href="
                  'https://genome.ucsc.edu/cgi-bin/hgTracks?clade=mammal&org=Human&db=hg19&position=' +
                    tf.tf_name +
                    '&hgt.positionInput=CEBPB&hgt.suggestTrack=knownGene&Submit=submit'
                "
                target="_blank"
                style="text-decoration:none;"
                >UCSC genome browser
              </a>
            </p>
            <p class="my-0">
              <a
                :href="
                  'https://factorbook.org/tf/human/' + tf.tf_name + '/function'
                "
                target="_blank"
                style="text-decoration:none;"
                >Factorbook
              </a>
            </p>
            <p class="my-0">
              <a
                :href="
                  'https://www.genenames.org/tools/search/#!/genes?query=' +
                    tf.tf_name +
                    '&submit=Submit'
                "
                target="_blank"
                style="text-decoration:none;"
                >HGNC
              </a>
            </p>
            <p class="my-0">
              <a
                :href="'https://ghr.nlm.nih.gov/gene/' + tf.tf_name"
                target="_blank"
                style="text-decoration:none;"
                >Genetic Home Reference
              </a>
            </p>
            <p class="my-0">
              <a
                :href="
                  'http://amigo.geneontology.org/amigo/search/bioentity?q=' +
                    tf.tf_name +
                    ''
                "
                target="_blank"
                style="text-decoration:none;"
                >AmiGo 2
              </a>
            </p>
            <p class="my-0">
              <a
                :href="
                  'https://www.uniprot.org/uniprot/?query=' +
                    tf.tf_name +
                    '&sort=score'
                "
                target="_blank"
                style="text-decoration:none;"
                >Uniprot
              </a>
            </p>
            <p class="my-0">
              <a
                :href="'https://en.wikipedia.org/wiki/' + tf.tf_name + ''"
                target="_blank"
                style="text-decoration:none;"
                >Wikipedia
              </a>
            </p>
          </v-card-text>
        </v-flex>
      </v-layout>

      <v-card-actions>
        <v-btn text color="secondary">
          Predict motifs from your data
        </v-btn>
        <v-btn text color="secondary">
          Scan motifs
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: 'TFInfo',
  props: {
    tf: {
      type: Object,
      required: true
    },
    annotation: {
      type: Array,
      required: true
    }
  },
  computed: {
    terms() {
      const info = []
      for (const element of this.annotation) {
        switch (element.key) {
          case 'encode_id':
            info.push({
              key: element.key,
              value: element.value,
              title: 'ENCODE experiment: ',
              link: 'https://www.encodeproject.org/experiments/' + element.value
            })
            break
          case 'old_encode_id':
            info.push({
              key: element.key,
              value: element.value,
              title: 'Old ENCODE ID: ',
              link:
                'http://genome.ucsc.edu/cgi-bin/hgTracks?tsCurTab=advancedTab&tsGroup=Any&tsType=Any&hgt_mdbVar1=dccAccession&hgt_tSearch=search&hgt_tsDelRow=&hgt_tsAddRow=&hgt_tsPage=&tsSimple=&tsName=&tsDescr=&db=hg19&hgt_mdbVal1=' +
                element.value
            })
            break
          case 'pubmed_id':
            info.push({
              key: element.key,
              value: element.value,
              title: 'PubMed: ',
              link: 'https://www.ncbi.nlm.nih.gov/pubmed/' + element.value
            })
            break
          case 'lab':
            info.push({
              key: element.key,
              value: element.value,
              title: 'Lab: ',
              link: ''
            })
            break
          default:
        }
      }
      info.push({
        key: 'data',
        value: 'Download',
        title: 'ChIP-seq peak: ',
        link: '/data/test_peak.bed'
      })
      return info
    }
  },
  created() {}
}
</script>

<style lang="scss" scoped></style>
