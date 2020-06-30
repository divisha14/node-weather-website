const path = require('path')
const express = require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const { request } = require('http')
const app = express()

console.log(__dirname)
//console.log(path.join(__dirname, '../public'))
//Define path for express config
const viewpath= path.join(__dirname,'/templates/views')
const partialspath= path.join(__dirname,'/templates/partials')
hbs.registerPartials(partialspath)
//Setup handlebar engines and views location
app.set('views',viewpath)
app.set('view engine','hbs')

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req,res) =>
{
    res.render('index',{
        title:'Weather App',
        name: 'Divisha Bapna'
    })
})
app.get('/about', (req,res) =>
{
    res.render('about',{
        title: 'About Me',
        name:'Divisha Bapna'
    })
}
)
app.get('/help', (req,res) =>
{
    res.render('help',{
        helptext:'This is some helpful text',
        title: 'Help',
        name:'Divisha Bapna'
    })
}
)
// app.get('/About', (req,res) =>
// {
//     res.send({
//         name:'Divisha',
//         age:19
//     })
// }
// )
app.get('/Weather', (req,res) =>
{
    if(!req.query.address)
    {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address,(error, {latitude,longitude,location}={})=>
    {
        if(error)
        {
            return res.send({error: error})
        }
        forecast(latitude,longitude,(error,forecastData)=>
        {
            if(error)
        {
            return res.send({error: error})
        }
        res.send(
            {
                forecast: forecastData,
                location,
                address: req.query.address
            }
        )
        })
    })
    // res.send({
    //    forecast: 'It is raining',
    //    address:req.query.address
    // })
}
)
app.get('/products',(req,res)=>
{
    if(!req.query.search)
    {
       return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
}
)
app.get('/help/*',(req,res)=>
{
    res.render('404',
    {
        title:'404',
        name:'Divisha Bapna',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req,res)=>
{
    res.render('404',{
        title:'404',
        name:'Divisha Bapna',
        errorMessage:'Page not found'
    })
})
app.listen(3000,() =>
{
    console.log('Server is up on port 3000')
})
