import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'dish',
  title: 'Dish',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name of dish',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'short_description',
      type: 'string',
      title: 'Short Description',
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: 'price',
      type: 'number',
      title: 'Price of the dish in GBP',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image of the Dish',
    }),
  ],
})
