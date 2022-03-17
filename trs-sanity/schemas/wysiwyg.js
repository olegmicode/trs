// wysiwyg.js
export default {
  name: "wysiwyg",
  type: "document",
  title: "WYSIWYG",
  fields: [
    {
      title: "ID",
      name: "id",
      type: "string",
    },
    {
      title: "Title",
      name: "title",
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
  ],
};
