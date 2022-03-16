export default {
  title: "Menu Item Item",
  name: "menuItemItem",
  type: "object",
  fields: [
    {
      name: "document",
      type: "reference",
      title: "Document Reference",
      to: [{ type: "pageDefinition" }],
    },
    { name: "title", type: "string", title: "Menu Title" },
    {
      title: "Submenu Items",
      name: "submenu",
      type: "array",
      of: [
        {
          type: "menuItemSub",
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "children.title",
      pageSlug: "children.document.slug.current",
    },
    prepare(selection) {
      const { pageSlug, title } = selection;
      console.log(selection);
      return {
        ...selection,
        title: title,
        subtitle: `URL: https://www.texasranchesforsale.com/` + pageSlug,
      };
    },
  },
};
