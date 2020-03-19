<template>
  <div>
    <div class="motif-header">
      <h1 class="title">
        {{ motif.base_id }}
      </h1>
    </div>
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
      title: this.motif.base_id,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'What you need to know about motif #' + this.motif.base_id
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
