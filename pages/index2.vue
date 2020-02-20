<template>
  <v-app id="keep">
    <v-app-bar app clipped-left color="blue">
      <!--<v-app-bar-nav-icon @click="drawer = !drawer" />-->
      <span class="title ml-3 mr-5"
        >DESSO&nbsp;<span class="font-weight-light">database</span></span
      >
      <v-text-field
        solo-inverted
        flat
        hide-details
        label="Search"
        prepend-inner-icon="mdi-magnify"
      />

      <v-spacer />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped color="grey lighten-4">
      <v-list dense class="grey lighten-4">
        <template v-for="(item, i) in items">
          <v-row v-if="item.heading" :key="i" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col cols="6" class="text-right">
              <v-btn small text>edit</v-btn>
            </v-col>
          </v-row>
          <v-divider v-else-if="item.divider" :key="i" dark class="my-4" />
          <v-list-item v-else :key="i" link :to="item.url">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    items: [
      { icon: 'mdi-home', text: 'Home', url: '/' },
      { icon: 'mdi-table', text: 'Browse', url: '/browse' },
      { icon: 'mdi-file-find-outline', text: 'Prediction', url: '/prediction' },
      { icon: 'mdi-help-box', text: 'Help', url: '/help' },
      { icon: 'mdi-download', text: 'Download', url: '/download' },
      { icon: 'mdi-information', text: 'About us', url: '/about' }
    ]
  })
}
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none;
}
</style>
