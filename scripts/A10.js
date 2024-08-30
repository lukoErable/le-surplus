const data = {
  requests: [
    {
      indexName: 'prod_product_fr_1',
      params:
        'clickAnalytics=true&facetFilters=price.pr%3E0%2Cactive%3Atrue&facets=%5B%22id_a_g_32%22%2C%22id_f_11%22%2C%22id_f_110%22%2C%22id_f_23%22%2C%22id_f_58%22%2C%22id_f_59%22%2C%22id_f_71%22%2C%22id_f_81%22%2C%22id_f_93%22%2C%22manufacturer.name%22%2C%22price.pr%22%5D&highlightPostTag=__%2Fais-highlight__&highlightPreTag=__ais-highlight__&hitsPerPage=48&maxValuesPerFacet=200&optionalFilters=false&page=0&query=12824005&tagFilters=',
    },
    {
      indexName: 'prod_category_fr_1',
      params:
        'clickAnalytics=true&facetFilters=active%3Atrue&facets=%5B%22id_a_g_32%22%2C%22id_f_11%22%2C%22id_f_110%22%2C%22id_f_23%22%2C%22id_f_58%22%2C%22id_f_59%22%2C%22id_f_71%22%2C%22id_f_81%22%2C%22id_f_93%22%2C%22manufacturer.name%22%2C%22price.pr%22%5D&highlightPostTag=__%2Fais-highlight__&highlightPreTag=__ais-highlight__&hitsPerPage=5&maxValuesPerFacet=200&optionalFilters=false&page=12824005&tagFilters=',
    },
    {
      indexName: 'prod_product_fr_1_query_suggestions',
      params:
        'clickAnalytics=true&facetFilters=&facets=%5B%22id_a_g_32%22%2C%22id_f_11%22%2C%22id_f_110%22%2C%22id_f_23%22%2C%22id_f_58%22%2C%22id_f_59%22%2C%22id_f_71%22%2C%22id_f_81%22%2C%22id_f_93%22%2C%22manufacturer.name%22%2C%22price.pr%22%5D&highlightPostTag=__%2Fais-highlight__&highlightPreTag=__ais-highlight__&hitsPerPage=5&maxValuesPerFacet=200&optionalFilters=false&page=12824005&tagFilters=',
    },
  ],
};

async function run() {
  const rawResponse = await fetch(
    'https://v3v1yhq7nb-2.algolianet.com/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.23.3)%3B%20Browser%20(lite)%3B%20instantsearch.js%20(4.71.1)%3B%20JS%20Helper%20(3.21.0)&x-algolia-api-key=a49a39ce6b87398a385f6aee76c5f0b2&x-algolia-application-id=V3V1YHQ7NB',
    {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0',
      },
      body: JSON.stringify(data),
    }
  );
  const response = await rawResponse.json();
  console.log(response.results[0].hits[0]);
}

run();
