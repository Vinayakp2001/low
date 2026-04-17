import { defineType, defineField } from "sanity";

export default defineType({
  name: "officeInfo",
  title: "Office Info",
  type: "document",
  fields: [
    defineField({ name: "firmName", title: "Firm Name", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "address", title: "Street Address", type: "string" }),
    defineField({ name: "city", title: "City", type: "string" }),
    defineField({ name: "state", title: "State", type: "string" }),
    defineField({ name: "zip", title: "ZIP", type: "string" }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "platform", type: "string", title: "Platform" },
          { name: "url", type: "url", title: "URL" },
        ],
      }],
    }),
  ],
});
