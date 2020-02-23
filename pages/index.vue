<template>
  <div>
    <v-layout column justify-center align-center>
      <v-flex xs12 sm8 md6 lg12>
        <client-only>
          <p class="display-3">DEep Sequence and Shape mOtif or DESSO</p>
          <vue-particles color="#fff" />
        </client-only>
      </v-flex>
    </v-layout>
    <index-search-box></index-search-box>
  </div>
</template>

<script>
import IndexSearchBox from '@/components/IndexSearchBox'

export default {
  components: {
    'index-search-box': IndexSearchBox
  }
}
</script>

<style lang="scss" scoped></style>
