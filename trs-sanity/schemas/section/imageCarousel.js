// imageCarousel.js
export default {
  name: "imageCarousel",
  type: "document",
  title: "Image Carousel",
  fields: [
    {
      title: "ID",
      name: "id",
      type: "string",
    },
    {
      title: "Body",
      name: "body",
      type: "array",
      of: [
        {
          type: "customImage",
        },
      ],
    },
  ],
};
