<template>
  <div id="app">
    <nav-bar />
    <nuxt />
  </div>
</template>
<script>
import NavBar from '~/components/NavBar.vue'

export default {
  components: {
    NavBar
  },
  head() {
    return {
      titleTemplate: '%s - DESSO database',
      meta: [
        {
          hid: 'default description',
          name: 'default description',
          content: 'default content here'
        }
      ]
    }
  }
}
</script>

<style></style>
