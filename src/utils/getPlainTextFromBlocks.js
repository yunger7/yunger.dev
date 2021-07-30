export function getPlainTextFromBlocks(blocks) {
  let plainText = "";

  blocks.forEach(block => {
    plainText += block.plain_text;
  });

  return plainText;
}