// columns.js
export default {
  name: "blockText",
  type: "object",
  title: "Block Text",
  fields: [
    {
      title: "Tag",
      name: "tag",
      type: "string",
    },
    {
      title: "Body",
      name: "body",
      type: "array",
      of: [
        {
          type: "block",
        },
        {
          type: "image",
        },
      ],
    },
    {
      name: "reference",
      type: "reference",
      title: "Reference",
      to: [{ type: "team" }],
    },
  ],
};
