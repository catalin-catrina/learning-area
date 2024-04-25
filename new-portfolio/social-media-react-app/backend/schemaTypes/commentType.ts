import {defineField, defineType} from 'sanity'

export const commentType = defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'postedBy',
      title: 'PostedBy',
      type: 'reference',
      to: [{type: 'user'}],
    }),
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'string',
    }),
  ],
})
