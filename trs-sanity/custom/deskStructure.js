import S from "@sanity/desk-tool/structure-builder";
export default () =>
  S.list() // Outermost / farthest left:  we want to create a vertical "list" pane.
    .title("Base") // Give the pane the title of 'Content' just like it has normally.
    .items([
      // Define the items that will appear in this far-left pane.
      S.listItem()
        .title("Pages")
        .child(
          S.documentList()
            .title("Pages")
            .filter('_type == "pageDefinition"')
        ),
      S.listItem()
        .title("Properties")
        .child(
          S.documentList()
            .title("Properties")
            .filter('_type == "property"')
        ),
      S.listItem()
        .title("Components")
        .child(
          S.list()
            .title("Components")
            .items([
              S.listItem()
                .title("Article PDF")
                .child(
                  S.documentList()
                    .title("Article PDF")
                    .filter('_type == "articlePDF"')
                ),
              S.listItem()
                .title("Menu")
                .child(
                  S.documentList()
                    .title("Menu")
                    .filter('_type == "menu"')
                ),
              S.listItem()
                .title("Block Content")
                .child(
                  S.documentList()
                    .title("Block Content")
                    .filter('_type == "blockcontent"')
                ),
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
              S.listItem()
                .title("Image Carousel")
                .child(
                  S.documentList()
                    .title("Image Carousel")
                    .filter('_type == "imageCarousel"')
                ),
              S.listItem()
                .title("Text Over Image")
                .child(
                  S.documentList()
                    .title("Text Over Image")
                    .filter('_type == "textOverImage"')
                ),
              S.listItem()
                .title("Columns")
                .child(
                  S.documentList()
                    .title("Columns")
                    .filter('_type == "columns"')
                ),
              S.listItem()
                .title("Block Text")
                .child(
                  S.documentList()
                    .title("Block Text")
                    .filter('_type == "blockText"')
                ),
              S.listItem()
                .title("Custom Image")
                .child(
                  S.documentList()
                    .title("Custom Image")
                    .filter('_type == "customImage"')
                ),
              S.listItem()
                .title("Footer")
                .child(
                  S.documentList()
                    .title("Footer")
                    .filter('_type == "footer"')
                ),
              S.listItem()
                .title("TRS Update")
                .child(
                  S.documentList()
                    .title("TRS Update")
                    .filter('_type == "trsUpdate"')
                ),
              S.listItem()
                .title("WYSIWYG")
                .child(
                  S.documentList()
                    .title("WYSIWYG")
                    .filter('_type == "wysiwyg"')
                ),
              S.listItem()
                .title("Contact Form")
                .child(
                  S.documentList()
                    .title("Contact Form")
                    .filter('_type == "contactForm"')
                ),
            ])
        ),
      S.listItem()
        .title("Property Attributes")
        .child(
          S.list()
            .title("Property Attributes")
            .items([
              S.listItem()
                .title("County")
                .child(
                  S.documentList()
                    .title("County")
                    .filter('_type == "county"')
                ),
              S.listItem()
                .title("Region")
                .child(
                  S.documentList()
                    .title("Region")
                    .filter('_type == "region"')
                ),
              S.listItem()
                .title("Property Type")
                .child(
                  S.documentList()
                    .title("Property Type")
                    .filter('_type == "propertyType"')
                ),
            ])
        ),
      S.listItem()
        .title("Team Members")
        .child(
          S.documentList()
            .title("Team Members")
            .filter('_type == "team"')
        ),
      S.listItem()
        .title("Site Settings")
        .child(
          S.documentList()
            .title("Site Settings")
            .filter('_type == "siteSettings"')
        ),
    ]);
