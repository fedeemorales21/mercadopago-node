const { Router } = require('express')
const route = Router()

const mercadopago = require ('mercadopago')

mercadopago.configure({
    access_token: process.env.PROD_ACCESS_TOKEN,
    // client_id: process.env.CLIENT_ID,
    // client_SECRET: process.env.CLIENT_SECRET,
    sandbox: true
})
 
route.get('/', (req, res) => {
    res.render('pay');
});


route.post('/', async (req,res) => {
    try {
        // items = [ { title: 'Mi producto', unit_price: 100, currency_id: 'ARS', quantity: 1}]
        const { items } = req.body
        let preference = { items }
        const response = await mercadopago.preferences.create(preference)
        
        app.locals.mpid = response.body.id
        res.json({success: true})
    } catch (error) {
        console.log(error)
    }
})

module.exports = route
