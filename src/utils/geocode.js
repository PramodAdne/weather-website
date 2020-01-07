const request = require('request')

const geoCode= (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicHJhbW9kYWRuZSIsImEiOiJjazRtZHVienUwMGYwM3FtaDhzemh3cmo0In0.nplycLqTxL1EjJ1tpNkNrw'

    request({url, json :true}, (err, {body} = {})=>{

        if(err){
            callback('Check Connectivity', undefined)
        }
        else if(body.message){
            callback(body.message, undefined)
        } else if(body.features.length === 0){
            callback('Unable to find location try another search', undefined)
        } else {
            callback(undefined, {
                lattitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name

            })
        }
        

    })
}

module.exports = geoCode