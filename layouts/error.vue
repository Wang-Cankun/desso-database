<template>
  <div>
    <v-layout v-if="statusCode === 404" column justify-center align-center>
      <v-flex xs12 sm8 md6 lg3 xl3>
        <v-card>
          <v-card-title class="headline title">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="45"
              height="45"
              fill="#DBE1EC"
              viewBox="0 0 48 48"
            >
              <path
                d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z"
              /></svg
            >{{ message }}
          </v-card-title>

          <v-card-text>
            <p>
              Google. The spectacle before us was indeed sublime. Lorem ipsum
              dolor sit amet, cu semper pertinax duo, at mea iuvaret noluisse
              tincidunt, an tollit sensibus petentium vel.
            </p>
            <p>
              For more information, check out the
              <a href="https://vuetifyjs.com" target="_blank"> documentation</a
              >.
            </p>
            <p>
              If you have questions or suggestions, please
              <a
                href="https://chat.vuetifyjs.com/"
                target="_blank"
                title="chat"
              >
                contact
              </a>
              us.
            </p>
            <p>
              Find a bug? Report it on the github
              <a
                href="https://github.com/vuetifyjs/vuetify/issues"
                target="_blank"
                title="contribute"
              >
                issue board </a
              >.
            </p>

            <hr class="my-3" />
            <a href="https://nuxtjs.org/" target="_blank">
              DESSO Documentation
            </a>
            <br />
            <a href="https://github.com/nuxt/nuxt.js" target="_blank">
              DESSO GitHub
            </a>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" nuxt to="/">
              Return to home
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  name: 'NuxtError',
  props: {
    error: {
      // <--- Send in the error
      type: Object,
      default: null
    }
  },
  computed: {
    statusCode() {
      // <--- Get the status code
      return (this.error && this.error.statusCode) || 500
    },
    message() {
      // <--- Print the error
      return 'Page not found'
      // return this.error.message
    }
  },
  head() {
    return {
      title: this.message // <--- Set the SEO title
    }
  }
}
</script>
