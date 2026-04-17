import { defineType, defineField } from "sanity";

export default defineType({
  name: "policyPage",
  title: "Policy Page",
  type: "document",
  fields: [
    defineField({
      name: "pageType",
      title: "Page Type",
      type: "string",
      options: { list: ["privacy", "terms", "disclaimer"], layout: "radio" },
    }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "lastUpdated", title: "Last Updated", type: "date" }),
    defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }] }),
  ],
  preview: { select: { title: "title", subtitle: "pageType" } },
});
