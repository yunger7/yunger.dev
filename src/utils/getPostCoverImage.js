import { getPlaiceholder } from "plaiceholder";

// Temporarily hosting images on Imgur since Notion's API doesn't support files yet.
export async function getPostCoverImage(page) {
  const files = page.properties["Cover Image"].files;

  if (files.length) {
    const { base64, img } = await getPlaiceholder(files[0].name);

    return {
      ...img,
      blurDataURL: base64,
    };
  }

  return null;
}
