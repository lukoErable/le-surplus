const fetch = require('cross-fetch');

async function fetchProductHighlander(reference) {
  try {
    const rawResponse = await fetch(
      `https://highlander-outdoor.com/search/suggest.json?q=${reference}&resources%5Btype%5D=product&resources%5Blimit%5D=8&resources%5Boptions%5D%5Bunavailable_products%5D=last&resources%5Boptions%5D%5Bfields%5D=title%2Cproduct_type%2Cvendor%2Cvariants.title%2Cvariants.sku%2Ctag`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json, text/javascript, */*; q=0.01',
        },
      }
    );
    const response = await rawResponse.json();

    if (
      !response.resources ||
      !response.resources.results ||
      !response.resources.results.products ||
      response.resources.results.products.length === 0
    ) {
      return null;
    }

    const item = response.resources.results.products[0];
    const title = item.title;
    const image = item.image;

    const description = item.body
      .replace(/<[^>]*>/g, '')
      .replace(/[\r\n]+/g, ' ')
      .trim();

    return { title, image, description };
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
}

module.exports = fetchProductHighlander;
