import { defineType, defineField } from "sanity";

export default defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "title", title: "Title / Role", type: "string" }),
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "shortBio", title: "Short Bio", type: "text", rows: 3 }),
    defineField({ name: "fullBio", title: "Full Bio", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "expertiseAreas", title: "Expertise Areas", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "barAdmissions", title: "Bar Admissions", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "education",
      title: "Education",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "degree", type: "string", title: "Degree" },
          { name: "institution", type: "string", title: "Institution" },
          { name: "year", type: "number", title: "Year" },
        ],
      }],
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
  preview: { select: { title: "name", subtitle: "title", media: "photo" } },
});
