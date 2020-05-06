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
const config = {
  elements: [
    {
      data: { id: 'ARID1A' },
      position: { x: 489, y: 182 },
      group: 'nodes'
    },
    {
      data: { id: 'FOXD1' },
      position: { x: 589, y: 282 },
      group: 'nodes'
    },
    {
      data: { id: 'FOXC1' },
      position: { x: 389, y: 182 },
      group: 'nodes'
    },
    {
      data: { id: 'FOXL1' },
      position: { x: 419, y: 382 },
      group: 'nodes',
      color: 'red'
    },
    {
      data: { id: 'FOXI' },
      position: { x: 449, y: 482 },
      group: 'nodes'
    },
    {
      data: { id: 'a1', source: 'ARID1A', target: 'FOXD1' },
      group: 'edges'
    },
    {
      data: { id: 'a2', source: 'ARID1A', target: 'FOXC1' },
      group: 'edges'
    },
    {
      data: { id: 'a3', source: 'ARID1A', target: 'FOXL1' },
      group: 'edges'
    },
    {
      data: { id: 'a4', source: 'ARID1A', target: 'FOXI' },
      group: 'edges'
    },
    {
      data: { id: 'a5', source: 'ARID1A', target: 'FOXD1' },
      group: 'edges'
    }
  ],
  style: [
    {
      selector: 'node',
      style: { 'background-color': '#666', label: 'data(id)' }
    },
    {
      selector: 'edge',
      style: {
        width: 3,
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle'
      }
    }
  ],
  layout: { name: 'grid', rows: 1 }
}

const elements = [...config.elements]
delete config.elements

export default {
  data() {
    return {
      config,
      elements
    }
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
