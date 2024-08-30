const fetch = require('cross-fetch');
const cheerio = require('cheerio');

async function fetchProductDetails(reference) {
  const rawResponse = await fetch(
    `https://www.promodis.net/search/ajax/suggest/?q=${reference}`
  );
  const response = await rawResponse.json();

  const product = response.find((item) => item.type === 'product');
  if (!product) {
    console.error(`No product found for reference: ${reference}`);
    return null;
  }

  const { title, url } = product;

  // Fetch product details from the link
  const imageUrl = await fetchImageUrlAndDescription(url);
  const description = await fetchDescription(url);

  return { title, image: imageUrl, description };
}

async function fetchImageUrlAndDescription(url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'text/html',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract the image URL directly from the HTML using regex
    const imageUrlMatch = html.match(
      /https:\/\/www\.promodis\.net\/media\/catalog\/product\/cache\/[^\s"]+/
    );
    const imageUrl = imageUrlMatch ? imageUrlMatch[0] : null;

    return imageUrl;
  } catch (error) {
    console.error('Failed to fetch product details:', error);
    return null;
  }
}

async function fetchDescription(url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'text/html',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    const $ = cheerio.load(html);

    const description = $('.product.attribute.description .value')
      .text()
      .trim();
    return description;
  } catch (error) {
    console.error('Failed to fetch item description:', error);
    return '';
  }
}

module.exports = fetchProductDetails;
