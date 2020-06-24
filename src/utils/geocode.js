const request = require('request')

const keyAPI = 'pk.eyJ1IjoicmF5bW9uZGNodSIsImEiOiJja2FqeWtnbDgwZjVoMnRwNnpzbXRid3pvIn0.jrSHwg1i1z4YeUZZaST4Fg'
const limitParam = 'limit=1'

//without callback

// request({url: addressURL, json:true}, (error, response) =>{
//     // console.log(response.body)
//     if(error){
//         console.log('unable to connect')
//     }else if(response.body.features.length === 0){
//         console.log('missing location parameter')
//     } else{
//         const latitude = response.body.features[0].center[1]
//         const longitude = response.body.features[0].center[0]
//         console.log(longitude, latitude)
//     }

// });

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + 
    encodeURIComponent(address) +
    '.json?' + 'access_token=' + keyAPI + '&' + limitParam 
    // console.log(url);
    
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('unable to connect to location services', undefined)
        }else if(body.features.length === 0){
            callback('unable to connect to location services. Try another search', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name

            })
        }
    })
}

module.exports = geocode