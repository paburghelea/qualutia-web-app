import sanityClient from "@sanity/client";

export default sanityClient({
    projectId: "nsys9yuw",
    dataset: "studio",
    apiVersion: "2021-03-25",
    useCdn: true,
});

// export const urlFor = (source) => createImageUrlBuilder(config).image(source);
// export const PortableText = createPortableTextComponent({
//     ...config,
//     serializers: {}
// });