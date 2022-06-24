// columns.js
export default {
  name: "columns",
  type: "document",
  title: "Columns",
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
      title: "Item",
      name: "item",
      type: "array",
      of: [
        {
          type: "customImage",
        },
      ],
    },
  ],
};
