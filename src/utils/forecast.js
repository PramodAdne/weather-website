const request = require('request')

const forecast = (latitude, longitude, callback)=>{
const url = 'https://api.darksky.net/forecast/fa492f087f66640a93643a73e34ecde1/'+latitude+','+longitude+'?units=si';

request({url, json : true}, (err,{body})=>{
    if(err){
        callback('Check connectivity', undefined)
    }
    else if(body.error){
        callback(body.error, undefined)
    }else {
        callback(undefined,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degree out. There is a ' +body.currently.precipProbability + '% chance of rain, Highest Teperature today : ' + body.daily.data[0].temperatureHigh +' Lowest Temperature Today '+body.daily.data[0].temperatureLow)
        //     summary : res.body.daily.data[0].summary,
        //     temperature : res.body.currently.temperature,
        //     rain : res.body.currently.precipProbability
        // })
    }
})
}

module.exports = forecast;