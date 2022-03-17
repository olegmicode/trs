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
      name: "subTitle",
      type: "string",
      title: "Sub Title",
    },
    {
      title: "Update",
      name: "update",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
};
