// textOverImage.js
export default {
  name: "textOverImage",
  type: "document",
  title: "Text Over Image",
  fields: [
    {
      title: "ID",
      name: "id",
      type: "string",
    },
    {
      title: "Background Image",
      name: "backgroundImage",
      type: "image",
      options: {
        hotspot: true, // <-- Defaults to false
      },
    },
    {
      title: "Body",
      name: "body",
      type: "array",
      of: [
        {
          type: "block",
          marks: {
            annotations: [{ name: "color", title: "Color", type: "color" }],
          },
        },
        {
          type: "image",
        },
      ],
    },
  ],
};
