export function getPostSlug(page) {
  let postSlug = "";

  page.properties["Name"].title.forEach(block => {
    postSlug += block.plain_text;
  });

  return postSlug.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
}
