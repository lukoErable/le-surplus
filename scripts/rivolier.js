const cheerio = require('cheerio')

async function run()
{
    const rawResponse = await fetch('https://www.rivolier-sd.com/catalogsearch/result/?q=TT7783', {
        method: 'GET',
        headers:{
            'accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
        }
    })
    const response = await rawResponse.text()
    const $ = cheerio.load(response);
    //product-item-link
    //product-item-details
    const $data = $.extract({
       data: ['.product-item-link']
    })
    console.log($data);
    
    
}

run()