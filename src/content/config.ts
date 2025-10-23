import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    slug: z.string().optional(), // Custom slug override for clean URLs
    cover_image: z.string().optional(),
    hover_image: z.string().optional(),
    hover_video: z.string().optional(),
    thumbnail: z.string().optional(),
    slider_items: z.array(z.object({
      type: z.enum(['image', 'video']),
      src: z.string(),
    })).optional(),
    tags: z.array(z.string()).default(['projects']),
    lang: z.enum(['en', 'tr']).default('en'),
    order: z.number().optional(),
    show_on_homepage: z.boolean().optional(),
    meta_title: z.string().optional(),
    meta_description: z.string().optional(),
  }),
});

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    slug: z.string().optional(), // Custom slug override for clean URLs
    tags: z.array(z.string()).default(['notes']),
    lang: z.enum(['en', 'tr']).default('en'),
    show_on_homepage: z.boolean().optional(),
    meta_title: z.string().optional(),
    meta_description: z.string().optional(),
  }),
});

export const collections = { projects, notes };
