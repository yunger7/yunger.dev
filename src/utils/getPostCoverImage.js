import { getPlaiceholder } from "plaiceholder";

export async function getPostCoverImage(page) {
	const image = page.cover;

	if (image && image.type === "external") {
		const { base64, img: imageData } = await getPlaiceholder(
			image.external.url
		);

		return {
			...imageData,
			blurDataURL: base64,
		};
	}

	return null;
}
