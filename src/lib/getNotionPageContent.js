import { notion } from "@services/notion";

export async function getNotionPageContent(id) {
	const pageContent = await getBlocks(id);

	async function getBlocks(id) {
		const { results } = await notion.blocks.children.list({
			block_id: id,
		});

		const blocksWithChildren = [];

		for (const block of results) {
			if (block.has_children) {
				const childBlocks = await getBlocks(block.id);
				block[block.type].children = childBlocks;
			}

			blocksWithChildren.push(block);
		}

		return blocksWithChildren;
	}

	return pageContent;
}
