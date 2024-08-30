const fetch = require('cross-fetch');
const cheerio = require('cheerio');

async function fetchProductVanos(reference) {
  try {
    const rawResponse = await fetch(
      `https://www.quaerius.com/recherche?q=${reference}&limit=10&timestamp=1723558257830&ajaxSearch=1&id_lang=1`
    );

    if (!rawResponse.ok) {
      throw new Error(`HTTP error! status: ${rawResponse.status}`);
    }

    const response = await rawResponse.json();

    if (!response || response.length === 0) {
      console.log('No products found.');
      return null;
    }

    const product = response[0];
    const title = product.pname;
    const productLink = product.product_link;

    if (productLink) {
      const productResponse = await fetch(productLink);

      if (!productResponse.ok) {
        throw new Error(`HTTP error! status: ${productResponse.status}`);
      }

      const productHtml = await productResponse.text();
      const $ = cheerio.load(productHtml);
      const imageUrl = $('#bigpic').attr('src');
      const description = $('#short_description_content').text().trim();
      console.log(description);

      return { title, image: imageUrl, description };
    } else {
      console.log('No product link found.');
      return null;
    }
  } catch (error) {
    console.error('Failed to fetch product details:', error);
    return null;
  }
}

module.exports = fetchProductVanos;
