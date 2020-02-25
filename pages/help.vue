/* eslint-disable vue/no-v-html */
<template>
  <v-responsive class="mx-auto overflow-visible">
    <v-container class="markdown-body">
      <div v-html="hello"></div>
    </v-container>
  </v-responsive>
</template>

<script>
import hello from '@/static/docs/1.md'

export default {
  computed: {
    hello() {
      return hello
    }
  }
}
</script>

<style>
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 1024px;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
.v-application code {
  box-shadow: none;
}
</style>
