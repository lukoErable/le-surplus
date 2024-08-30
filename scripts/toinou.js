const fetch = require("cross-fetch")

async function run()
{
    const rawResponse = await fetch("https://stages.defense.gouv.fr/api/offers/11180?first-visit=false")
    const response = await rawResponse.json()
    console.log(response);
    
}
run()