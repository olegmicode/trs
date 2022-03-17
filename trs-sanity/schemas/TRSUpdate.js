// siteSettings.js
export default {
  name: "trsUpdate",
  type: "document",
  title: "TRS Update",
  __experimental_actions: ["update", "create", "delete", "publish"],
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      title: "Update",
      name: "update",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
};
