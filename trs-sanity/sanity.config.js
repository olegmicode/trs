import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import schemaTypes from './schemas/schema'
import deskStructure from './src/deskStructure'

export default defineConfig({
  name: 'default',
  title: 'Sanity Project',

  projectId: '4igmg8vf',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: deskStructure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
