import Vue from 'vue'
import Highcharts from 'highcharts'
import HighchartsVue from 'highcharts-vue'
import Sankey from 'highcharts/modules/sankey'
import DependencyWheel from 'highcharts/modules/dependency-wheel'
import VueCytoscape from 'vue-cytoscape'
import cise from 'cytoscape-cise'
import cytoscape from 'cytoscape'
import automove from 'cytoscape-automove'
cytoscape.use(cise)
cytoscape.use(automove)

if (typeof Highcharts === 'object') {
  Sankey(Highcharts)
  DependencyWheel(Highcharts)
}

Vue.use(HighchartsVue)
Vue.use(VueCytoscape)
Vue.use(cytoscape)
