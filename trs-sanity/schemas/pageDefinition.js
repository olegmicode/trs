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
      name: "metaTitle",
      type: "text",
      title: "Meta Title",
    },
    {
      name: "metaDescription",
      type: "text",
      title: "Meta Description",
    },
    {
      title: "Hero",
      name: "hero",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "blockcontent" }],
        },
      ],
    },
    {
      title: "Hero Image",
      name: "heroImage",
      type: "image",
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
            { type: "textOverImage" },
            { type: "columns" },
            { type: "wysiwyg" },
            { type: "contactForm" },
          ],
        },
      ],
    },
    {
      title: "Sidebar",
      name: "sidebar",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "blockcontent" }],
        },
      ],
    },
  ],
};
