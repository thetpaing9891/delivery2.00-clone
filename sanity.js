import sanityClient  from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = sanityClient({
    projectId : 'csfmu38f',
    dataset: "production",
    useCdn : true,
    apiVersion : "2022-09-03"
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)

export default client;