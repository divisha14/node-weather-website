const request=require('request');
const forecast=(longitude,latitude,callback)=>
{
    const url='http://api.weatherstack.com/current?access_key=6bdbfccca7d9f97c33c44b9ff90863d9&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m';
    request({url,json:true},(error,{body})=>
    {
        if(error)
        callback('Unable to connect to weather service!',undefined)
        else if(body.error)
        callback('Unable to find location. Try another search',undefined)
        else
        callback(undefined, body.current.weather_descriptions[0] + '. It is currently '+ body.current.temperature + ' degree out. It feels like ' + body.current.feelslike+' degree out.'
            )
    }

    )
}