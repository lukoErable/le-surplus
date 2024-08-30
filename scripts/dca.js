const fetch = require('cross-fetch');

async function run() {
  try {
    const url =
      'https://v3v1yhq7nb-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.23.3)%3B%20Browser%20(lite)%3B%20instantsearch.js%20(4.71.1)%3B%20JS%20Helper%20(3.21.0)&x-algolia-api-key=a49a39ce6b87398a385f6aee76c5f0b2&x-algolia-application-id=V3V1YHQ7NB';

    // Créer un objet FormData
    const formData = new URLSearchParams();
    formData.append(
      'requests',
      JSON.stringify([
        {
          indexName: 'prod_product_fr_1',
          params:
            'clickAnalytics: true\nfacetFilters: price.pr>0,active:true\nfacets: ["id_a_g_32","id_f_11","id_f_110","id_f_23","id_f_58","id_f_59","id_f_71","id_f_81","id_f_93","manufacturer.name","price.pr"]\nhighlightPostTag: __/ais-highlight__\nhighlightPreTag: __ais-highlight__\nhitsPerPage: 48\nmaxValuesPerFacet: 200\noptionalFilters: false\npage: 0\nquery: 01.057700\ntagFilters: ',
        },
        {
          indexName: 'prod_category_fr_1',
          params:
            'clickAnalytics=true\nfacetFilters: active:true\nfacets: ["id_a_g_32","id_f_11","id_f_110","id_f_23","id_f_58","id_f_59","id_f_71","id_f_81","id_f_93","manufacturer.name","price.pr"]\nhighlightPostTag: __/ais-highlight__\nhighlightPreTag: __ais-highlight__\nhitsPerPage: 5\nmaxValuesPerFacet: 200\noptionalFilters: false\npage: 0\nquery: 01.057700\ntagFilters: ',
        },
        {
          indexName: 'prod_product_fr_1_query_suggestions',
          params:
            'clickAnalytics=true\nfacetFilters: \nfacets: ["id_a_g_32","id_f_11","id_f_110","id_f_23","id_f_58","id_f_59","id_f_71","id_f_81","id_f_93","manufacturer.name","price.pr"]\nhighlightPostTag: __/ais-highlight__\nhighlightPreTag: __ais-highlight__\nhitsPerPage: 5\nmaxValuesPerFacet: 200\noptionalFilters: false\npage: 0\nquery: 01.057700\ntagFilters: ',
        },
      ])
    );

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(), // Convertir FormData en chaîne
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

run();
