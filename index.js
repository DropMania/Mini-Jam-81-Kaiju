const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const createID = require('./createId')
const fs = require('fs')

app.use(cors())
app.use(bodyParser.json())
app.post('/createkaiju', (req, res) => {
    let data = req.body
    let id = createID(10)
    let allKaijuData = JSON.parse(fs.readFileSync(__dirname + '/kaijus.json'))
    let kaiju = {
        id,
        level: 1,
        alive: true,
        state: 'NONE',
        idleStart: 0,
        deathStart: 0,
        ...data
    }
    allKaijuData.push(kaiju)
    fs.writeFileSync(__dirname + '/kaijus.json', JSON.stringify(allKaijuData))
    res.send(kaiju)
})

app.listen(process.env.PORT || 5000)
console.log('app is listening!')
