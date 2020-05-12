<template>
  <div>
    <v-row no-gutters align="start" justify="center">
      <v-col xs="12" md="12" lg="8">
        <v-form ref="form">
          <v-card class="overflow-hidden">
            <v-card-title class="accent white--text"
              >Motif prediction</v-card-title
            >
            <v-card-text class="mt-4 grey--text text--darken-2"
              >Predict motifs from your peak file
              <a
                class="grey--text text--darken-3"
                href="https://m.ensembl.org/info/website/upload/bed.html"
                target="_blank"
                >(BED format)</a
              >
              using pre-trained deep learning models. For more information visit
              our
              <a
                class="grey--text text--darken-3"
                href="/help/faq"
                target="_blank"
                >FAQ: Why do you deploy DESSO, Basset, and XXX for motif
                finding?</a
              ></v-card-text
            >
            <v-col xs="12" md="8" lg="8">
              <v-select
                prepend-inner-icon="mdi-dna"
                :items="assembly"
                label="Species Assembly"
              ></v-select>
            </v-col>
            <v-col xs="12" md="8" lg="8">
              <v-autocomplete
                prepend-inner-icon="mdi-alpha-t-box mdi-alpha-f-box"
                :items="tf"
                label="Target transcription factor"
              ></v-autocomplete>
            </v-col>
            <v-col xs="12" md="8" lg="8">
              <v-select
                prepend-inner-icon="mdi-hammer-screwdriver"
                :items="program"
                label="Motif finding program"
              ></v-select>
            </v-col>
            <v-col cols="12" md="8">
              <v-radio-group v-model="uploadType">
                <span class="title">Input the genomic regions</span>
                <v-radio label="Upload BED file." value="upload"></v-radio>
                <v-radio label="Type in BED data." value="type"></v-radio>
              </v-radio-group>
            </v-col>

            <v-col v-if="uploadType === 'upload'" cols="12" md="8">
              <v-file-input
                accept="image/*"
                label="Upload BED file."
              ></v-file-input>
            </v-col>
            <v-col v-if="uploadType === 'type'" cols="12" md="8">
              <v-textarea
                outlined
                label="Type in BED data here."
                value=""
                clearable
                :clear-icon-cb="onClearClicked"
              >
                ></v-textarea
              >
            </v-col>
            <v-col cols="12" md="8">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                hint="Optional: You will be notified by email when the job is done."
                persistent-hint
              ></v-text-field>
            </v-col>
            <v-card-actions
              ><v-btn text color="secondary">
                Submit
              </v-btn>
              <v-btn text color="secondary" @click="reset">
                Reset
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'SubmitPredictionForm',
  props: {
    content: {
      type: String,
      required: false,
      default: '1'
    }
  },
  data: () => ({
    program: ['DESSO', 'Basset', 'other1', 'other2'],
    assembly: [
      'Human: GRCh38 (UCSC hg38, Dec. 2013)',
      'Human: GRCh37 (UCSC hg19, Feb. 2009)'
    ],
    tf: ['ARID1A', 'BPTF', 'BACG1', 'MAFB', 'NF2L2', 'FOXA1'],
    uploadType: 'upload',
    emailRules: [(v) => /.+@.+\..+/.test(v) || 'E-mail must be valid']
  }),
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    }
  }
}
</script>

<style lang="scss" scoped></style>
