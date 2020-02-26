/* eslint-disable vue/no-v-html */

<template>
  <v-responsive class="mx-auto overflow-visible" max-width="1024">
    <v-container class="markdown-body">
      <div v-html="post"></div>
      <v-app-bar-nav-icon class="hidden-lg-and-up" @click="drawer = !drawer" />
      <v-card class="mx-auto overflow-hidden"> </v-card>
      <v-navigation-drawer v-model="drawer" permanent floating clipped
        ><div v-html="navContent"></div>
      </v-navigation-drawer>
      <Fab></Fab>
    </v-container>
  </v-responsive>
</template>

<script>
import Fab from '@/components/utils/Fab'

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

      return {
        post: post.default,
        navContent
      }
    } catch (err) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data() {
    return {
      drawer: null,
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
  display: table;
  font-size: 95%;
  margin-bottom: 1em;
  padding: 32px 0 0;
  margin: 0;
  width: 100%;
}
</style>
