const fetch = require('cross-fetch');
const cheerio = require('cheerio');

async function fetchProductMpsec(reference) {
  const url = `https://www.catalogue.mp-sec.fr/autocomplete.php?store=mpsec_fr&fallback_url=https://www.catalogue.mp-sec.fr/catalogsearch/ajax/suggest/&q=${reference}`;
  const rawResponse = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'text/javascript, text/html, application/xml, text/xml, */*',
    },
  });
  const response = await rawResponse.text();
  const $ = cheerio.load(response);
  const imageUrl = $('img').attr('src');
  const title = $('a').attr('title');
  const hrefLink = $('a').attr('href');
  const fullLink = `https:${hrefLink}`;

  const formatImageUrl = (url) => {
    const baseUrl = 'https://www.catalogue.mp-sec.fr';
    return url
      .replace('//www.catalogue.mp-sec.fr', baseUrl)
      .replace('/cache/0/image/50x50/', '/cache/2/image/');
  };

  const image = formatImageUrl(imageUrl);
  const description = await fetchDescription(fullLink);

  return { title, image, description };
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
    const description = $('.short-description .std').text().trim();
    return description;
  } catch (error) {
    console.error('Failed to fetch product details:', error);
    return '';
  }
}

module.exports = fetchProductMpsec;
