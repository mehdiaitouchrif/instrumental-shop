import { Cloudinary } from "@cloudinary/url-gen";
import { backgroundRemoval } from "@cloudinary/url-gen/actions/effect";

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  },
});

function extractPublicId(url) {
  const regex = /v\d+\/(.+?)\.\w+$/;

  // Extract the part after 'vxxxx/' and remove the file extension
  const match = url.match(regex);

  // The result is in the first captured group
  const result = match ? match[1] : null;

  return result;
}

function getBackgroundRemovedUrl(publicID) {
  const myImage = cld.image(publicID);

  myImage.effect(backgroundRemoval()).format("auto").quality("auto");

  return myImage.toURL();
}

export { cld, extractPublicId, getBackgroundRemovedUrl };
