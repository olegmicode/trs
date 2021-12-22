// textOverImage.js
export default {
  name: "textOverImage",
  type: "document",
  title: "Text Over Image",
  fields: [
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
        },
        {
          type: "image",
        },
      ],
    },
  ],
};
