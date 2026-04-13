const express = require("express")
const app = express()
const stageRoutes = require('./routes/stageRoutes')
const artistsRoutes = require('./routes/artistsRoutes')
const concertRoutes = require('./routes/concertRoutes')

app.use(express.json())

app.use("/api", stageRoutes)
app.use("/api", artistsRoutes)
app.use("/api", concertRoutes)

app.use((req, res) => {
    res.status(404).json({ message: "Endpoint not found. Please check the API documentation." })
})

app.listen(3000,()=>{
    console.log(`Server running at http://localhost:3000`)
})
