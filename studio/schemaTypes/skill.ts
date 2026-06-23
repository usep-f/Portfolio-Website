import { defineType, defineField } from 'sanity';

export const skillType = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Skill Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'level',
      title: 'Proficiency Level (0-100)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0).max(100),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Frontend', value: 'frontend' },
          { title: 'Backend and DB', value: 'backend' },
          { title: 'Programming Languages', value: 'languages' },
          { title: 'Misc', value: 'misc' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Skill SVG Icon',
      type: 'image',
      description: 'Upload an SVG file for the skill icon.',
      options: {
        accept: '.svg',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
