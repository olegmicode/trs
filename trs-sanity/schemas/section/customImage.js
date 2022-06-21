// customImage.js
export default {
  name: "customImage",
  type: "object",
  title: "Custom Image",
  fields: [
    {
      title: "Caption",
      name: "caption",
      type: "string",
    },
    {
      type: "image",
      title: "Desktop version image",
      name: "desktopVersion",
    },
    {
      type: "image",
      title: "Mobile version image",
      name: "mobileVersion",
    },
  ],
};
