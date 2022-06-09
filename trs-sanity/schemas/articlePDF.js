// articlePDF.js
export default {
  name: "articlePDF",
  type: "document",
  title: "Article PDF",
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
      options: {
        source: 'title',
      }
    },
    {
      title: 'PDF',
      name: 'pdf',
      type: 'file',
    },
    {
      title: "Cover Image",
      name: "coverImage",
      type: "image",
    },
  ],
};
