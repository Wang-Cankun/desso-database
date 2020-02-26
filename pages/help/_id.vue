/* eslint-disable vue/no-v-html */
<template>
  <v-responsive class="mx-auto overflow-visible" max-width="1024">
    <v-container class="markdown-body">
      <template lang="md">
        # Hello World!
        Current route is: {{ $route.path }}
      </template>

      <div v-html="post"></div>
    </v-container>
  </v-responsive>
</template>

<script>
// import hello from '@/static/docs/1.md'
export default {
  async asyncData({ params, error }) {
    try {
      const post = await import(`@/static/docs/${params.id}.md`)
      return {
        post: post.default
      }
    } catch (err) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data() {
    return {
      post: null,
      model: '# Hello World!'
    }
  }
}
</script>

<style>
.v-application code {
  box-shadow: none;
}
.v-application code::after,
.v-application code::before {
  content: none;
}
</style>
