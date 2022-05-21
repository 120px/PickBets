const express = require("express")
const fetch = require("node-fetch")
const PORT = process.env.PORT || 4000
const app = express()
const fs = require("fs")

app.get("/", async (req, res) => {
    console.log("dog")
    res.send("yes")
})

app.get("/getMLBOdds", async (req, res) => {

    await fs.readFile("../src/dataOdds.json", "utf-8", (err, data) => {
        if (err) throw err
        let file = JSON.parse(data)

        return (file)
    })
})

app.get("/MLB", async (req, res) => {
    
})


app.get("/getMLBmatches", async (req, res) => {

    await fs.readFile("../src/data.json", "utf-8", (err, data) => {

        if (err) throw err
        let file = JSON.parse(data)

        let newData = file.flatMap((data) =>

            (data.scores === null) ? [] : data

        )

        return (newData)
    })
})

app.listen(PORT, () => {
    console.log(`server is live on port: ${PORT}`)

})