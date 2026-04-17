import { defineType, defineField } from "sanity";

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({ name: "heroHeadline", title: "Hero Headline", type: "string" }),
    defineField({ name: "heroSubtext", title: "Hero Subtext", type: "text", rows: 2 }),
    defineField({
      name: "heroCTA",
      title: "Hero CTA",
      type: "object",
      fields: [
        { name: "label", type: "string", title: "Label" },
        { name: "href", type: "string", title: "URL" },
      ],
    }),
    defineField({ name: "introText", title: "Intro Text", type: "text", rows: 4 }),
    defineField({
      name: "featuredServices",
      title: "Featured Services",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),
    defineField({
      name: "featuredTestimonials",
      title: "Featured Testimonials",
      type: "array",
      of: [{ type: "reference", to: [{ type: "testimonial" }] }],
    }),
    defineField({ name: "ctaBannerHeadline", title: "CTA Banner Headline", type: "string" }),
    defineField({ name: "ctaBannerSubtext", title: "CTA Banner Subtext", type: "text", rows: 2 }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        { name: "title", type: "string", title: "Title" },
        { name: "description", type: "text", title: "Description", rows: 2 },
      ],
    }),
  ],
});
