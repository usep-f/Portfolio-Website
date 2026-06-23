import { defineType, defineField } from 'sanity';

export const timelineItemType = defineType({
  name: 'timelineItem',
  title: 'Timeline Item',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      title: 'Year Range',
      type: 'string',
      description: 'e.g. 2024 — Present, 2020 — 2022',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Degree',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company / Institution',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Work Experience', value: 'work' },
          { title: 'Education', value: 'education' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
