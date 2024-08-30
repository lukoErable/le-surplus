const fs = require('fs')

async function run ()
{
    const rawResponse = await fetch("http://www.military1st.fr/media/catalog/product/3/1/3170-1-Brandit-Performance-Outdoor-Jacket-Olive_1_3.jpg", {
        method: 'GET'
    })
    let response = await rawResponse.blob()
    Buffer.from(response).toString('base64')
    console.log(response);
    
}
run()