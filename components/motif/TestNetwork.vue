<template>
  <no-ssr>
    <v-hover v-slot:default="{ hover }" open-delay="0">
      <v-card
        height="100%"
        class="mx-auto card-outter"
        :elevation="hover ? 10 : 2"
        :class="{ 'on-hover': hover }"
      >
        <v-card-title class="accent white--text subtitle-1"
          >TF-gene network</v-card-title
        >
        <div>
          <cytoscape
            ref="cyRef"
            style="height: 500px;"
            :config="config"
            @mousedown="addNode"
            @cxttapstart="updateNode"
          >
            <cy-element
              v-for="def in elements"
              :key="`${def.data.id}`"
              :definition="def"
              @mousedown="deleteNode($event, def.data.id)"
            />
          </cytoscape>
        </div>

        <v-card-actions class="card-actions">
          <v-btn text color="secondary">
            Edit in new page
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-hover>
  </no-ssr>
</template>

<script>
import axios from 'axios'

const config = {
  elements: [
    {
      data: { id: 'ARID1A', group: 'tf_source', type: 'triangle' },
      position: { x: 350, y: 60 },
      group: 'nodes'
    },
    {
      data: { id: 'FOXD1', group: 'tf_target', arrow: 'triangle' },
      position: { x: 100, y: 150 },
      group: 'nodes'
    },
    {
      data: { id: 'FOXC1', group: 'tf_target', arrow: 'triangle' },
      position: { x: 280, y: 150 },
      group: 'nodes'
    },
    {
      data: { id: 'FOXL1', group: 'tf_target', arrow: 'triangle' },
      position: { x: 420, y: 150 },
      group: 'nodes',
      color: 'red'
    },
    {
      data: { id: 'FOXI', group: 'tf_target', arrow: 'triangle' },
      position: { x: 580, y: 150 },
      group: 'nodes'
    },
    {
      data: { id: 'UBIAD1', group: 'motif1', arrow: 'triangle' },
      position: { x: 50, y: 200 },
      group: 'nodes'
    },
    {
      data: { id: 'DISP3', group: 'motif1', arrow: 'triangle' },
      position: { x: 10, y: 280 },
      group: 'nodes'
    },
    {
      data: { id: 'RP1-69M21.2', group: 'motif1', arrow: 'triangle' },
      position: { x: 130, y: 180 },
      group: 'nodes'
    },
    {
      data: { id: 'NPPB', group: 'motif1', arrow: 'triangle' },
      position: { x: 140, y: 220 },
      group: 'nodes'
    },
    {
      data: { id: 'AADACL4', group: 'motif1', arrow: 'triangle' },
      position: { x: 140, y: 260 },
      group: 'nodes'
    },
    {
      data: { id: 'C1orf158', group: 'motif1', arrow: 'triangle' },
      position: { x: 100, y: 290 },
      group: 'nodes'
    },
    {
      data: { id: 'PRAMEF20', group: 'motif1', arrow: 'triangle' },
      position: { x: 50, y: 350 },
      group: 'nodes'
    },
    {
      data: { id: 'NPPB', group: 'motif1', arrow: 'triangle' },
      position: { x: 140, y: 400 },
      group: 'nodes'
    },
    {
      data: { id: 'PLA2G2D', group: 'motif2', arrow: 'triangle' },
      position: { x: 240, y: 200 },
      group: 'nodes'
    },
    {
      data: { id: 'PLA2G5', group: 'motif2', arrow: 'triangle' },
      position: { x: 275, y: 230 },
      group: 'nodes'
    },
    {
      data: { id: 'IFFO2', group: 'motif2', arrow: 'triangle' },
      position: { x: 210, y: 280 },
      group: 'nodes'
    },
    {
      data: { id: 'HTR6', group: 'motif2', arrow: 'triangle' },
      position: { x: 330, y: 500 },
      group: 'nodes'
    },
    {
      data: { id: 'CAPZB', group: 'motif2', arrow: 'triangle' },
      position: { x: 340, y: 220 },
      group: 'nodes'
    },
    {
      data: { id: 'CELA2B', group: 'motif2', arrow: 'triangle' },
      position: { x: 340, y: 260 },
      group: 'nodes'
    },
    {
      data: { id: 'RCC2', group: 'motif2', arrow: 'triangle' },
      position: { x: 300, y: 290 },
      group: 'nodes'
    },
    {
      data: { id: 'ACTLB', group: 'motif2', arrow: 'triangle' },
      position: { x: 350, y: 350 },
      group: 'nodes'
    },
    {
      data: { id: 'IFFO2', group: 'motif2', arrow: 'triangle' },
      position: { x: 540, y: 400 },
      group: 'nodes'
    },
    {
      data: { id: 'EPHAB', group: 'motif3', arrow: 'triangle' },
      position: { x: 470, y: 350 },
      group: 'nodes'
    },
    {
      data: { id: 'C1QC', group: 'motif4', arrow: 'triangle' },
      position: { x: 650, y: 250 },
      group: 'nodes'
    },
    {
      data: { id: 'WNT4', group: 'motif4', arrow: 'triangle' },
      position: { x: 750, y: 250 },
      group: 'nodes'
    },
    {
      data: { id: 'a2', source: 'ARID1A', target: 'FOXC1', arrow: 'triangle' },
      group: 'edges',
      arrow: 'triangle',
      classes: 'bezier'
    },
    {
      data: { id: 'a3', source: 'ARID1A', target: 'FOXL1', arrow: 'triangle' },
      group: 'edges',
      arrow: 'triangle',
      classes: 'bezier'
    },
    {
      data: { id: 'a4', source: 'ARID1A', target: 'FOXI', arrow: 'triangle' },
      group: 'edges',
      arrow: 'triangle',
      classes: 'bezier'
    },
    {
      data: { id: 'a5', source: 'ARID1A', target: 'FOXD1', arrow: 'triangle' },
      group: 'edges',
      arrow: 'triangle',
      classes: 'bezier'
    },
    {
      data: {
        source: 'FOXD1',
        target: 'UBIAD1',
        group: 'motif',
        arrow: 'triangle'
      },
      group: 'edges',
      classes: 'bezier'
    },
    {
      data: {
        source: 'FOXD1',
        target: 'NPPB',
        group: 'motif',
        arrow: 'triangle'
      },
      group: 'edges',
      arrow: 'triangle',
      classes: 'bezier'
    },
    {
      data: {
        source: 'FOXD1',
        target: 'AADACL4',
        group: 'motif',
        arrow: 'triangle'
      },
      group: 'edges',
      arrow: 'triangle',
      classes: 'bezier'
    },
    {
      data: {
        source: 'FOXD1',
        target: 'C1orf158',
        group: 'motif',
        arrow: 'triangle'
      },
      group: 'edges',
      arrow: 'triangle',
      classes: 'bezier'
    },
    {
      data: {
        source: 'FOXD1',
        target: 'DISP3',
        group: 'motif',
        arrow: 'triangle'
      },
      group: 'edges',
      arrow: 'triangle',
      classes: 'bezier'
    },
    {
      data: {
        source: 'FOXD1',
        target: 'DISP3',
        group: 'motif',
        arrow: 'triangle'
      },
      group: 'edges',
      arrow: 'triangle',
      classes: 'bezier'
    },
    {
      data: {
        source: 'FOXD1',
        target: 'DISP3',
        group: 'motif',
        arrow: 'triangle'
      },
      group: 'edges',
      arrow: 'triangle',
      classes: 'bezier'
    },
    {
      data: {
        source: 'FOXD1',
        target: 'PRAMEF20',
        group: 'motif',
        arrow: 'triangle'
      },
      group: 'edges',
      arrow: 'triangle',
      classes: 'bezier'
    },
    {
      data: {
        source: 'FOXD1',
        target: 'RP1-69M21.2',
        group: 'motif',
        arrow: 'triangle'
      },
      group: 'edges',
      arrow: 'triangle',
      classes: 'bezier'
    },
    {
      data: {
        source: 'FOXD1',
        target: 'AADACL4',
        group: 'motif',
        arrow: 'triangle'
      },
      group: 'edges',
      arrow: 'triangle',
      classes: 'bezier'
    },
    {
      data: {
        source: 'FOXC1',
        target: 'KAZN',
        group: 'motif',
        arrow: 'triangle'
      },
      group: 'edges',
      arrow: 'triangle',
      classes: 'bezier'
    },
    {
      data: {
        source: 'FOXC1',
        target: 'KAZN',
        group: 'motif',
        arrow: 'triangle'
      },
      group: 'edges',
      arrow: 'triangle',
      classes: 'bezier'
    },
    {
      data: {
        source: 'FOXC1',
        target: 'KAZN',
        group: 'motif',
        arrow: 'triangle'
      },
      group: 'edges',
      arrow: 'triangle',
      classes: 'bezier'
    },
    {
      data: {
        source: 'FOXC1',
        target: 'PLA2G2D',
        group: 'motif',
        arrow: 'triangle'
      },
      group: 'edges',
      arrow: 'triangle',
      classes: 'bezier'
    },
    {
      data: {
        source: 'FOXC1',
        target: 'PLA2G5',
        group: 'motif',
        arrow: 'triangle'
      },
      group: 'edges',
      arrow: 'triangle',
      classes: 'bezier'
    },
    {
      data: {
        source: 'FOXC1',
        target: 'IFFO2',
        group: 'motif',
        arrow: 'triangle'
      },
      group: 'edges',
      arrow: 'triangle',
      classes: 'bezier'
    },
    {
      data: {
        source: 'FOXC1',
        target: 'ACTLB',
        group: 'motif',
        arrow: 'triangle'
      },
      group: 'edges',
      arrow: 'triangle',
      classes: 'bezier'
    },
    {
      data: {
        source: 'FOXC1',
        target: 'FHAD1',
        group: 'motif',
        arrow: 'triangle'
      },
      group: 'edges',
      arrow: 'triangle',
      classes: 'bezier'
    },
    {
      data: {
        source: 'FOXC1',
        target: 'FHAD1',
        group: 'motif',
        arrow: 'triangle'
      },
      group: 'edges',
      arrow: 'triangle',
      classes: 'bezier'
    },
    {
      data: {
        source: 'FOXC1',
        target: 'HTR6',
        group: 'motif',
        arrow: 'triangle'
      },
      group: 'edges',
      arrow: 'triangle',
      classes: 'bezier'
    },
    {
      data: {
        source: 'FOXC1',
        target: 'CAPZB',
        group: 'motif',
        arrow: 'triangle'
      },
      group: 'edges',
      arrow: 'triangle',
      classes: 'bezier'
    },
    {
      data: {
        source: 'FOXC1',
        target: 'RCC2',
        group: 'motif',
        arrow: 'triangle'
      },
      group: 'edges',
      arrow: 'triangle',
      classes: 'bezier'
    },
    {
      data: {
        source: 'FOXL1',
        target: 'EPHAB',
        group: 'motif',
        arrow: 'triangle'
      },
      group: 'edges',
      arrow: 'triangle',
      classes: 'bezier'
    },
    {
      data: {
        source: 'FOXL1',
        target: 'EPHAB',
        group: 'motif',
        arrow: 'triangle'
      },
      group: 'edges',
      arrow: 'triangle',
      classes: 'bezier'
    },
    {
      data: {
        source: 'FOXI',
        target: 'EPHAB',
        group: 'motif',
        arrow: 'triangle'
      },
      group: 'edges',
      arrow: 'triangle',
      classes: 'bezier'
    },
    {
      data: {
        source: 'FOXC1',
        target: 'RCC2',
        group: 'motif',
        arrow: 'triangle'
      },
      group: 'edges',
      arrow: 'triangle',
      classes: 'bezier'
    },
    {
      data: {
        source: 'FOXC1',
        target: 'C1QC',
        group: 'motif',
        arrow: 'triangle'
      },
      group: 'edges',
      arrow: 'triangle',
      classes: 'bezier'
    },
    {
      data: {
        source: 'FOXC1',
        target: 'C1QC',
        group: 'motif',
        arrow: 'triangle'
      },
      group: 'edges',
      arrow: 'triangle',
      classes: 'bezier'
    },
    {
      data: {
        source: 'FOXI',
        target: 'C1QC',
        group: 'motif',
        arrow: 'triangle'
      },
      group: 'edges',
      arrow: 'triangle',
      classes: 'bezier'
    },
    {
      data: {
        source: 'FOXI',
        target: 'WNT4',
        group: 'motif',
        arrow: 'triangle'
      },
      group: 'edges',
      arrow: 'triangle',
      classes: 'bezier'
    }
  ],
  style: [
    {
      selector: 'node',
      style: { 'background-color': '#666', label: 'data(id)' }
    },
    {
      selector: 'node',
      style: { 'background-color': '#666', label: 'data(id)' }
    },
    {
      selector: 'node[type]',
      style: {
        label: 'data(type)'
      }
    },
    {
      selector: 'edge',
      style: {
        width: 3,
        'curve-style': 'straight'
      }
    },
    {
      selector: 'edge.bezier',
      style: {
        'curve-style': 'bezier',
        'control-point-step-size': 40
      }
    },
    {
      selector: 'edge[arrow]',
      style: {
        'target-arrow-shape': 'data(arrow)'
      }
    },
    {
      selector: 'node[group="tf_target"]',
      style: {
        'background-color': '#CA7853',
        label: 'data(id)',
        width: 32,
        height: 32
      }
    },
    {
      selector: 'node[group="tf_source"]',
      style: {
        'background-color': '#1781b5',
        label: 'data(id)',
        width: 48,
        height: 48,
        'font-size': '18px'
      }
    },
    {
      selector: 'node[group="motif1"]',
      style: {
        'background-color': '#F17C67',
        label: 'data(id)',
        width: 18,
        height: 18,
        'font-size': '18px'
      }
    },
    {
      selector: 'node[group="motif2"]',
      style: {
        'background-color': '#F17C67',
        label: 'data(id)',
        width: 18,
        height: 18,
        'font-size': '18px'
      }
    },
    {
      selector: 'node[group="motif3"]',
      style: {
        'background-color': '#F17C67',
        label: 'data(id)',
        width: 18,
        height: 18,
        'font-size': '18px'
      }
    },
    {
      selector: 'node[group="motif4"]',
      style: {
        'background-color': '#F17C67',
        label: 'data(id)',
        width: 18,
        height: 18,
        'font-size': '18px'
      }
    }
  ],
  layout: {
    name: 'grid',
    idealEdgeLength: 100,
    nodeOverlap: 20,
    refresh: 20,
    fit: true,
    padding: 30,
    randomize: false,
    componentSpacing: 100,
    nodeRepulsion: 400000,
    edgeElasticity: 100,
    nestingFactor: 5,
    gravity: 80,
    numIter: 1000,
    initialTemp: 200,
    coolingFactor: 0.95,
    minTemp: 1.0
  }
}

const elements = [...config.elements]
delete config.elements

export default {
  data() {
    return {
      config,
      elements,
      cyData: null
    }
  },

  mounted() {
    axios
      .get('https://js.cytoscape.org/demos/cose-layout/data.json')
      .then((response) => (this.cyData = response))
  },
  methods: {
    addNode(event) {
      console.log(event.target, this.$refs.cyRef.instance)
      if (event.target === this.$refs.cyRef.instance)
        console.log('adding node', event.target)
    },
    deleteNode(id) {
      console.log('node clicked', id)
    },
    updateNode(event) {
      console.log('right click node', event)
    },
    preConfig(cytoscape) {
      console.log('calling pre-config', cytoscape)
    },
    afterCreated(cy) {
      // cy: this is the cytoscape instance
      console.log('after created', cy)
    }
  }
}
</script>

<style scoped>
.card-outter {
  position: relative;
  padding-bottom: 50px;
}
.card-actions {
  position: absolute;
  bottom: 0;
}
</style>
