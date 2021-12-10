// siteSettings.js
export default {
  name: "pageDefinition",
  type: "document",
  title: "Page Definition",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
    },
    {
      title: "Entities",
      name: "entities",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            { type: "property" },
            { type: "imageLeftTextRight" },
            { type: "imageRightTextLeft" },
          ],
        },
      ],
    },
  ],
};
