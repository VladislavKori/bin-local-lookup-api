import express from "express"
import csv from "csv-parser"
import fs from "fs"
import type { DataType } from "./type"
import cors from "cors"
import 'dotenv/config'

const app = express()
const port = Number(process.env.PORT) || 3000;
const hostname = process.env.HOSTNAME || '0.0.0.0';

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ['GET'],
}))

app.get('/v1/:bin', (req, res) => {
  const bin = req.params.bin
  let found = false
  const stream = fs.createReadStream('bin-list-data.csv')
    .pipe(csv())
  if (bin.length < 6 || bin.length > 8) {
    res.status(500).json({ error: "bin size incorrect" })
    return
  }

  const targetBin = bin.slice(0, 6);

  stream.on('data', (data: DataType) => {
    if (data.BIN === targetBin && !found) {
      found = true
      res.json(data)
      stream.destroy()
    }
  })

  stream.on('end', () => {
    if (!found) {
      res.status(404).json({ message: 'BIN not found' })
    }
  })

  stream.on('error', (err) => {
    if (!res.headersSent) {
      res.status(500).json({ error: err.message })
    }
  })
})

app.listen(port, hostname, () => {
  console.log(`Server started at http://${hostname}:${port}`);
});