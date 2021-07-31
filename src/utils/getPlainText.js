export function getPlainTextFromRichText(richText) {
  let plainText = "";

  richText.forEach(block => {
    plainText += block.plain_text;
  });

  return plainText;
}

export function getPlainTextFromBlocks(blocks) {
  let plainText = "";

  for (const block of blocks) {
		const value = block[block.type];

		switch (block.type) {
			case "paragraph":
      case "heading_1":
      case "heading_2":
      case "heading_3":
      case "bulleted_list_item":
      case "numbered_list_item":
      case "to_do":
      case "toggle":
        plainText += getPlainTextFromRichText(value.text);

        if (value.children) {
          plainText += getPlainTextFromBlocks(value.children);
        }

        plainText += " ";
				break;
		}
	}

  return plainText;
}
