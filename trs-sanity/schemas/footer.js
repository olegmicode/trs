// footer.js
export default {
  name: "footer",
  type: "document",
  title: "Footer",
  fields: [
    {
      title: "Item",
      name: "item",
      type: "array",
      of: [
        {
          type: "blockText",
        },
      ],
    },
  ],
};
