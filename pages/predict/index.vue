<template>
  <div>
    <prediction-form></prediction-form>
  </div>
</template>
<script>
import { mapState } from 'vuex' // <--- To map motif
import SubmitPredictionForm from '@/components/utils/SubmitPredictionForm.vue'
export default {
  components: {
    'prediction-form': SubmitPredictionForm
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
        { text: 'TF target name', value: 'tf_name' },
        { text: 'TF target class', value: 'tf_class' },
        { text: 'TF target family', value: 'tf_family' },
        { text: 'Motif name (JASPAR)', value: 'tf_name_jaspar' },
        { text: 'Motif name (HOCOMOCO)', value: 'tf_name_hocomoco' },
        { text: 'Motif name (Transfac)', value: 'tf_name_transfac' }
      ]
    }
  },
  computed: mapState({
    motifs: (state) => state.motifs.motifs
  }),
  methods: {
    handleClick(motif) {
      this.$router.push('/browse/' + motif.data_id)
    }
  },
  head() {
    return {
      title: this.motif,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'What you need to know about motif #' + this.motifs
        }
      ]
    }
  }
}
</script>
<style></style>
