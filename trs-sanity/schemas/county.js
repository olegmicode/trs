export default {
  title: "County",
  name: "county",
  type: "document",
  fields: [
    {
      title: "County Name",
      name: "countyName",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Meta Title",
      name: "metaTitle",
      type: "text",
    },
    {
      title: "Meta Description",
      name: "metaDescription",
      type: "text",
    },
    {
      title: "County Description",
      name: "countyDescrition",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
  preview: {
    select: {
      pageTitle: "countyName",
    },
    prepare(selection) {
      const { pageTitle } = selection;
      return {
        ...selection,
        title: pageTitle,
      };
    },
  },
};
