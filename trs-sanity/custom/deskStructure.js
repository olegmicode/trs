import S from "@sanity/desk-tool/structure-builder";
export default () =>
  S.list() // Outermost / farthest left:  we want to create a vertical "list" pane.
    .title("Base") // Give the pane the title of 'Content' just like it has normally.
    .items([
      // Define the items that will appear in this far-left pane.
      S.listItem()
        .title("Settings")
        .child(S.document().schemaType("siteSettings")),
      S.listItem()
        .title("Sections")
        .child(
          S.list()
            .title("Section Types")
            .items([
              S.listItem()
                .title("Image Left Text Right")
                .child(
                  S.documentList()
                    .title("Image Left Text Right")
                    .filter('_type == "imageLeftTextRight"')
                ),
              S.listItem()
                .title("Image Right Text Left")
                .child(
                  S.documentList()
                    .title("Image Right Text Left")
                    .filter('_type == "imageRightTextLeft"')
                ),
            ])
        ),

      ...S.documentTypeListItems().filter(
        (item) =>
          ![
            "siteSettings",
            "imageRightTextLeft",
            "imageLeftTextRight",
          ].includes(item.getId())
      ), // Include all document types
    ]);
