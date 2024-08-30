const fetch = require('cross-fetch');
const cheerio = require('cheerio');

async function fetchProductHelikon(reference) {
  try {
    const rawResponse = await fetch(
      `https://www.helikon-tex.com/en_eur/searchautocomplete/ajax/get/?q=${reference}`
    );

    const responseText = await rawResponse.text();

    const $ = cheerio.load(responseText);
    let productLink = $('li[data-url]').attr('data-url');
    productLink = productLink.replace(/\\/g, '');
    productLink = productLink.replace(/^"(.*)"$/, '$1');

    const productResponse = await fetch(productLink);
    const productPageText = await productResponse.text();

    const $$ = cheerio.load(productPageText);
    const image = $$('meta[property="og:image"]').attr('content');
    const title = $$('meta[name="keywords"]').attr('content');

    return { image, title, description: '' };
  } catch (error) {
    console.error('Failed to fetch or parse response:', error);
  }
}

module.exports = fetchProductHelikon;
