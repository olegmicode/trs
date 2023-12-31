// First, we must import the schema creator
// import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
// import schemaTypes from "all:part:@sanity/base/schema-type";

// We import object and document schemas
import siteSettings from "./siteSettings";
import trsUpdate from "./trsUpdate";
import page from "./page";
import pageDefinition from "./pageDefinition";
import articlePDF from "./articlePDF";
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
import imageCarousel from "./section/imageCarousel";
import columns from "./section/columns";
import footer from "./footer";
import blockText from "./section/blockText";
import wysiwyg from "./wysiwyg";
import contactForm from "./section/contactForm";
import customImage from "./section/customImage";

// Then we give our schema to the builder and provide the result to Sanity
export default [
    /* Your types here! */
    siteSettings,
    page,
    pageDefinition,
    articlePDF,
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
    imageCarousel,
    textOverImage,
    columns,
    blockText,
    customImage,
    footer,
    trsUpdate,
    wysiwyg,
    contactForm,
];
