// columns.js
export default {
  name: "entityQuery",
  type: "document",
  title: "Entity Query",
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
      title: "Number of Entities",
      name: "number",
      type: "number",
    },
    {
      title: "Type",
      name: "type",
      type: "string",
      options: {
        list: [{ title: "Team", value: "team" }], // <-- predefined values
      },
    },
  ],
};
