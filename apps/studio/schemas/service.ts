import { defineType, defineField } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "shortDescription", title: "Short Description", type: "text", rows: 2 }),
    defineField({ name: "overview", title: "Overview", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "painPoints", title: "Pain Points", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "solutionFraming", title: "Solution Framing", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [{ type: "faq" }],
    }),
    defineField({
      name: "relatedServices",
      title: "Related Services",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),
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
  preview: { select: { title: "title", subtitle: "shortDescription" } },
});
