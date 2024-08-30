const fetch = require('cross-fetch');
const cheerio = require('cheerio');

async function fetchProductSummit(reference) {
  try {
    const rawResponse = await fetch('https://summit-outdoor.com/fr/recherche', {
      headers: {
        accept: 'application/json, text/javascript, */*; q=0.01',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: `s=${reference}&resultsPerPage=1`,
      method: 'POST',
    });

    if (!rawResponse.ok) {
      throw new Error(`HTTP error! status: ${rawResponse.status}`);
    }

    const response = await rawResponse.json();
    const product = response.products[0];
    const title = product.name;
    const image = product.cover.large.url;
    const productUrl = product.url;

    try {
      const productPageResponse = await fetch(productUrl);
      if (!productPageResponse.ok) {
        throw new Error(`HTTP error! status: ${productPageResponse.status}`);
      }

      const html = await productPageResponse.text();
      const $ = cheerio.load(html);
      const descriptionText = $('meta[property="og:description"]').attr(
        'content'
      );

      return {
        title: title,
        image: image,
        description: descriptionText,
      };
    } catch (error) {
      console.error('There was a problem fetching the product page:', error);
      return {
        title: title,
        image: image,
        description: null,
      };
    }
  } catch (error) {
    console.error(
      'There was a problem with the initial fetch operation:',
      error
    );
    return null;
  }
}

module.exports = fetchProductSummit;
