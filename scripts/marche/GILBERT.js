const fetch = require('cross-fetch');
const cheerio = require('cheerio');

async function fetchProductGilbert(reference) {
  const rawResponse = await fetch(
    'https://www.gilbert-production.fr/recherche',
    {
      method: 'POST',
      headers: {
        accept: 'application/json, text/javascript, */*;',
        'content-type': 'application/x-www-form-urlencoded;',
      },
      body: `s=${reference}&resultsPerPage=10`,
    }
  );
  const response = await rawResponse.json();

  const product = response.products[0];

  if (!product) {
    console.error(`No product found for reference: ${reference}`);
    return null;
  }

  const title = product.name;
  const descriptionHtml = product.description_short;

  const $ = cheerio.load(descriptionHtml);
  const description = $.text();

  const renderedProductsHtml = response.rendered_products;
  const $$ = cheerio.load(renderedProductsHtml);
  const imageUrl = $$('.product-thumbnail img').attr('src');

  return { title, image: imageUrl, description };
}

module.exports = fetchProductGilbert;
