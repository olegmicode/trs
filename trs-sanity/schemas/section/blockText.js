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
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "H5", value: "h5" },
            { title: "H6", value: "h6" },
            { title: "Subscribe Form", value: "subscribe-form" },
          ],
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
