const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const createID = require('./createId')
const fs = require('fs')

app.use(cors())
app.use(bodyParser.json())

let levelUpTime = 10000
let healTime = 30000

setInterval(() => {
    let allKaijuData = JSON.parse(fs.readFileSync(__dirname + '/kaijus.json'))

    //check if level up
    let cityKajus = allKaijuData.filter((k) => k.state == 'CITY')
    cityKajus.forEach((kaiju) => {
        if (Number(new Date()) - kaiju.idleStart > levelUpTime) {
            kaiju.level += 1
            kaiju.idleStart = Number(new Date())
        }
    })

    //check if healed
    let deadKaijus = allKaijuData.filter((k) => !k.alive)
    deadKaijus.forEach((kaiju) => {
        if (Number(new Date()) - kaiju.deathStart > healTime) {
            kaiju.deathStart = 0
            kaiju.alive = true
        }
    })
    fs.writeFileSync(__dirname + '/kaijus.json', JSON.stringify(allKaijuData))
}, 10000)

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

app.post('/getkaiju', (req, res) => {
    let id = req.body.id
    let allKaijuData = JSON.parse(fs.readFileSync(__dirname + '/kaijus.json'))
    res.send(allKaijuData.find((k) => k.id == id))
})
app.post('/removekaiju', (req, res) => {
    let id = req.body.id
    let allKaijuData = JSON.parse(fs.readFileSync(__dirname + '/kaijus.json'))
    allKaijuData.splice(
        allKaijuData.findIndex((k) => k.id == id),
        1
    )
    fs.writeFileSync(__dirname + '/kaijus.json', JSON.stringify(allKaijuData))
    res.send({ msg: 'deleted' })
})

app.post('/startcity', (req, res) => {
    let id = req.body.id
    let allKaijuData = JSON.parse(fs.readFileSync(__dirname + '/kaijus.json'))
    let kaiju = allKaijuData.find((k) => k.id == id)
    kaiju.state = 'CITY'
    kaiju.idleStart = Number(new Date())
    fs.writeFileSync(__dirname + '/kaijus.json', JSON.stringify(allKaijuData))
    res.send(kaiju)
})
app.post('/endcity', (req, res) => {
    let id = req.body.id
    let allKaijuData = JSON.parse(fs.readFileSync(__dirname + '/kaijus.json'))
    let kaiju = allKaijuData.find((k) => k.id == id)
    kaiju.state = 'NONE'
    kaiju.idleStart = 0
    fs.writeFileSync(__dirname + '/kaijus.json', JSON.stringify(allKaijuData))
    res.send(kaiju)
})
app.post('/getall', (req, res) => {
    let allKaijuData = JSON.parse(fs.readFileSync(__dirname + '/kaijus.json'))
    res.send(
        allKaijuData.map((k) => ({
            id: k.id,
            img: k.img,
            name: k.name,
            level: k.level
        }))
    )
})
app.post('/fight', (req, res) => {
    let { id, win, score } = req.body
    let allKaijuData = JSON.parse(fs.readFileSync(__dirname + '/kaijus.json'))
    let kaiju = allKaijuData.find((k) => k.id == id)
    if (win) {
        kaiju.level += score
    }
    if (!win) {
        kaiju.alive = false
        kaiju.deathStart = Number(new Date())
    }
    fs.writeFileSync(__dirname + '/kaijus.json', JSON.stringify(allKaijuData))
    res.send(kaiju)
})
app.listen(process.env.PORT || 5000)
console.log('app is listening!')
