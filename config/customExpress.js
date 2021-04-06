const express = require('express')
const congign = require('consign')
const consign = require('consign/lib/consign')
const bodyParser = require('body-parser')

module.exports = () => {
    const app = express()

        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())

        consign()
            .include('controllers')
            .into(app)
    return app
}