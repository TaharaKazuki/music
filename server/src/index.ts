import express from "express"
import "dotenv/config"
import "./db"

const app = express()

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.info(`Port is listening on port ${PORT}`)
})
