/* eslint-disable vue/no-v-html */

<template>
  <v-responsive class="mx-auto overflow-visible" max-width="1024">
    <v-container class="markdown-body">
      <v-app-bar-nav-icon class="hidden-lg-and-up" @click="drawer = !drawer" />
      <v-card class="mx-auto overflow-hidden"> </v-card>
      <div v-html="post"></div>

      <v-navigation-drawer
        v-model="drawer"
        class="grey lighten-4"
        app
        right
        clipped
        fixed
        ><div v-html="navContent"></div>
        <Fab></Fab>
      </v-navigation-drawer>
    </v-container>
  </v-responsive>
</template>

<script>
import Fab from '@/components/utils/Fab'

export default {
  components: {
    Fab
  },
  async asyncData({ store, error, params }) {
    try {
      const post = await import(`@/static/docs/${params.id}.md`)
      const navStart = post.default.lastIndexOf('<nav')
      const navEnd = post.default.lastIndexOf('nav>') + 4
      const navContent = post.default.substring(navStart, navEnd)
      // await store.dispatch('docs/commitToc', navContent)
      return {
        post: post.default.slice(navEnd),
        navContent
      }
    } catch (err) {
      error({
        statusCode: 404,
        message: 'This page could not be found'
      })
    }
  },
  data() {
    return {
      drawer: null,
      post: null,
      navContent: null
    }
  },
  methods: {
    toLink(pos) {
      this.$vuetify.goTo(0)
    }
  },
  head() {
    return {
      title: 'title',
      meta: [
        {
          name: 'name',
          content: 'content'
        }
      ]
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
