import { defineType, defineField } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "quote", title: "Quote", type: "text", rows: 4 }),
    defineField({ name: "clientName", title: "Client Name", type: "string" }),
    defineField({ name: "clientRole", title: "Client Role", type: "string" }),
    defineField({ name: "clientCompany", title: "Client Company", type: "string" }),
    defineField({ name: "rating", title: "Rating (1–5)", type: "number" }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
  ],
  preview: { select: { title: "clientName", subtitle: "clientCompany" } },
});
