import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { SINGLETON_ACTIONS, SINGLETON_TYPES, structure } from './structure'

export default defineConfig({
  name: 'default',
  title: 'Andrea Portfolio',

  projectId: '0c6yhpfy',
  dataset: 'production',

  plugins: [structureTool({ structure }), visionTool()],

  schema: {
    types: schemaTypes,
    // the three site documents already exist; no "create new" for their types
    templates: (templates) => templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },

  document: {
    actions: (actions, { schemaType }) =>
      SINGLETON_TYPES.has(schemaType)
        ? actions.filter(({ action }) => action && SINGLETON_ACTIONS.has(action))
        : actions,
  },
})
