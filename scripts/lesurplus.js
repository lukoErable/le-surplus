const fetch = require('cross-fetch');

async function run() {
  const rawRespnse = await fetch('https://www.lesurplus.com/recherche', {
    method: 'POST',
    headers: {
      accept: 'application/json, text/javascript, */*; q=0.01',
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: `s=545&resultsPerPage=10`,
  });
  const response = await rawRespnse.json();
  console.log(response.rendered_products_top);
}
run();
