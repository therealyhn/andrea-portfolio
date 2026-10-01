// The site reads exactly one document of each type; the Studio opens these documents directly.
export const SINGLETONS = [
  { type: 'hero', id: '8d2b5462-fad7-409e-87d6-29724e8bc203', title: 'BANER' },
  { type: 'workSection', id: '7594141b-0096-4ffd-96c1-6658b242bd51', title: 'WORK - KATEGORIJE' },
  { type: 'whyMe', id: '2c2b359f-fd7c-4d0a-a9f4-0b42bf7b02a0', title: 'WHY ME' },
]

export const SINGLETON_TYPES = new Set(SINGLETONS.map(({ type }) => type))

// No create, duplicate, delete or unpublish for them - only edit, publish, discard and restore
export const SINGLETON_ACTIONS = new Set(['publish', 'discardChanges', 'restore'])

export const structure = (S) =>
  S.list()
    .title('Sadržaj sajta')
    .items(
      SINGLETONS.map(({ type, id, title }) =>
        S.listItem()
          .title(title)
          .id(type)
          .schemaType(type)
          .child(S.document().schemaType(type).documentId(id).title(title)),
      ),
    )
