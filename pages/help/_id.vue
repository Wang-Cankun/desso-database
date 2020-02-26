/* eslint-disable vue/no-v-html */

<template>
  <v-responsive class="mx-auto overflow-visible" max-width="1024">
    <v-container class="markdown-body">
      <div v-html="post"></div>
      <Fab></Fab>
      {{ toc }}
    </v-container>
  </v-responsive>
</template>

<script>
import Fab from '@/components/Fab'

export default {
  components: {
    Fab
  },
  async asyncData({ params, error }) {
    try {
      const post = await import(`@/static/docs/${params.id}.md`)
      const navStart = post.default.lastIndexOf('<nav')
      const navEnd = post.default.lastIndexOf('nav>') + 4
      const navContent = post.default.substring(navStart, navEnd)

      console.log(navContent)
      return {
        post: post.default
      }
    } catch (err) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data() {
    return {
      post: null
    }
  },
  computed: {
    toc() {
      return 1
    }
  },
  methods: {
    toLink(pos) {
      this.$vuetify.goTo(0)
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
.table-of-contents {
  background: #f9f9f9 none repeat scroll 0 0;
  border: 1px solid #aaa;
  display: table;
  font-size: 95%;
  margin-bottom: 1em;
  padding: 32px 0 0;
  margin: 0;
  width: 100%;
}
</style>
