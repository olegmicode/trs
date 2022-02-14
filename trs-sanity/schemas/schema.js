// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// We import object and document schemas
import siteSettings from "./siteSettings";
import page from "./page";
import pageDefinition from "./pageDefinition";
import menuItemSub from "./menuItemSub";
import menuItemItem from "./menuItemItem";
import menuItem from "./menuItem";
import menu from "./menu";
import county from "./county";
import region from "./region";
import propertyType from "./propertyType";
import property from "./property";
import blockcontent from "./blockcontent";
import team from "./team";
import imageRightTextLeft from "./section/imageRightTextLeft";
import imageLeftTextRight from "./section/imageLeftTextRight";
import textOverImage from "./section/textOverImage";
import columns from "./section/columns";
import footer from "./footer";
import blockText from "./section/blockText";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    siteSettings,
    page,
    pageDefinition,
    menuItemSub,
    menuItemItem,
    menuItem,
    menu,
    county,
    region,
    propertyType,
    property,
    team,
    blockcontent,
    imageLeftTextRight,
    imageRightTextLeft,
    textOverImage,
    columns,
    blockText,
    footer,
  ]),
});
