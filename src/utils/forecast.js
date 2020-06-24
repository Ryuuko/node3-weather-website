const request = require('request')

const keyAPI = 'abb47455276b705cfdaf2c98641aacd7'

//without callback

// request({url: url, json:true }, (error, response) =>{
//     if(error){
//         console.log('unable to connect ')
//     }else if(response.body.error){
//         console.log('unable to find location')
//     }else{
//         console.log( response.body.current.weather_descriptions[0] +
//             '. It is currently '+ response.body.current.temperature + ' degree outside.' +
//         'It feels like ' +  response.body.current.feelslike + ' though')
//     }

// })

const forecast = (latitude, longtitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=' + keyAPI + 
    '&query=' + latitude + ',' + longtitude 
    // console.log(url)
    
    request({url, json: true}, (error, {body})=>{
    

        if(error){
            callback('unable to connect to the services', undefined)
        }else if(body.error){
            callback('invalid coordinate. Try another search', undefined)
        }else{

            // console.log(body);
            callback(undefined, 
                body.current.weather_descriptions[0] + '. ' +
                'It is currently temperature is ' + body.current.temperature  + '. ' +
                'It feels like ' + body.current.feelslike
            )
        }
    })
}

module.exports = forecast