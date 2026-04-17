import { defineType, defineField } from "sanity";

export default defineType({
  name: "ctaBlock",
  title: "CTA Block",
  type: "document",
  fields: [
    defineField({ name: "headline", title: "Headline", type: "string" }),
    defineField({ name: "subtext", title: "Subtext", type: "text", rows: 2 }),
    defineField({ name: "buttonLabel", title: "Button Label", type: "string" }),
    defineField({ name: "buttonHref", title: "Button URL", type: "string" }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: { list: ["light", "dark"], layout: "radio" },
      initialValue: "dark",
    }),
  ],
  preview: { select: { title: "headline" } },
});
