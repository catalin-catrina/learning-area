import {defineField, defineType} from 'sanity'

export const userType = defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    defineField({
      name: 'userName',
      title: 'UserName',
      type: 'string',
    }),
    defineField({
      name: 'picture',
      title: 'Picture',
      type: 'string',
    }),
  ],
})
