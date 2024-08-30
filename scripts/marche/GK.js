const fetch = require('cross-fetch');
const cheerio = require('cheerio');

async function fetchProductDetails(reference) {
  const rawResponse = await fetch(
    `https://gkpro.fr/wp-admin/admin-ajax.php?action=woodmart_ajax_search&number=20&post_type=product&query=${reference}`,
    {
      method: 'GET',
      headers: {
        accept: 'text/plain, */*; q=0.01',
      },
    }
  );

  const response = await rawResponse.json();

  if (!response.suggestions || response.suggestions.length === 0) {
    console.error(`No product found for reference: ${reference}`);
    return null;
  }

  const title = response.suggestions[0].value;
  const permalink = response.suggestions[0].permalink;
  const thumbnailHtml = response.suggestions[0].thumbnail;

  // Utiliser cheerio pour extraire l'URL de l'image du thumbnail
  const $ = cheerio.load(thumbnailHtml);
  const imageUrl = $('img').attr('src');

  const description = await fetchDescription(permalink);

  return { title, image: imageUrl, description };
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

    let description = $('#tab-description').text().trim();
    description = description.replace(/\n/g, ' '); // Remove newlines

    return description;
  } catch (error) {
    console.error('Failed to fetch item description:', error);
    return '';
  }
}

module.exports = fetchProductDetails;
