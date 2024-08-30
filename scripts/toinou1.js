const fetch = require("cross-fetch")

async function run()
{
    const rawResponse = await fetch("https://stagehttps://www.stages.defense.gouv.fr/offer/adjoint-responsable-de-conduite-de-projets-informatiques-(2)-12272s.defense.gouv.fr/api/offers?businessDomains=informatique1605166027221&field=publishAt&offerTypes=3&offset=0&order=DESC&regions=11https://www.stages.defense.gouv.fr/offer/datascientist-12307&size=100")
    const response = await rawResponse.json()
    console.log(response.result.length);
    
}
run()