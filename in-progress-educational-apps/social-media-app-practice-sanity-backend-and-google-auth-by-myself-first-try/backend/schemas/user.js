export default {
  name: 'user', // tells sanity to add "_type": "user" to json
  title: 'User', // defines how this document type will be called in studio UI, usually capitalized value of "name"
  type: 'document', // tells sanity it should be able to create new user documents
  fields: [
    {
      name: 'userName', // will be the "key" in the data
      title: 'UserName',
      type: 'string',
    },
    {
      name: 'picture',
      title: 'Picture',
      type: 'string',
    },
  ],
}
