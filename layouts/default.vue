<template>
  <v-app id="keep">
    <v-app-bar app clipped-left :color="appBarColor" dark>
      <v-app-bar-nav-icon class="hidden-lg-and-up" @click="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-2 pl-4">
        <span class="hidden-sm-and-down">{{ title }}</span>
      </v-toolbar-title>
      <search-box></search-box>
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
          <v-divider v-else-if="item.divider" :key="i" dark />
          <v-list-item v-else :key="i" link :to="item.url">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="black--text">
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
    <v-footer app>
      <span>
        DESSO is developed by BMBL and it is licensed under
        <v-icon>mdi-creative-commons</v-icon> Creative Commons Attribution 4.0
        International License. | {{ new Date().getFullYear() }}
      </span>
    </v-footer>
  </v-app>
</template>
<script>
import SearchBox from '@/components/SearchBox'
export default {
  components: {
    'search-box': SearchBox
  },
  data: () => ({
    drawer: null,
    title: 'DESSO database',
    appBarColor: 'primary',
    appBarTextColor: '#ccccd6', // 远山紫
    items: [
      { icon: 'mdi-home', text: 'Home', url: '/' },
      { icon: 'mdi-table', text: 'Browse', url: '/browse' },
      { icon: 'mdi-file-find-outline', text: 'Prediction', url: '/prediction' },
      { icon: 'mdi-help-box', text: 'Help', url: '/help' },
      { icon: 'mdi-download', text: 'Download', url: '/download' },
      { icon: 'mdi-information', text: 'About us', url: '/about' }
    ]
  }),
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

<style scoped>
#keep .v-navigation-drawer__border {
  display: none;
}
</style>
