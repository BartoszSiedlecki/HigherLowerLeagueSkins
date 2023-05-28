const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const { Pool } = require('pg')
require('dotenv').config()
const { Client } = require('pg')

const cors = require('cors')
app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
}))

const client = new Client({
  connectionString: 'postgres://kycfxbjg:lq9hyC_FwdBJ2yuR_h43DSyTXs2Jlcwu@horton.db.elephantsql.com/kycfxbjg'
})

client.connect();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
})

const PORT = process.env.PORT || 10000

app.listen(PORT, () =>{
  console.log(`Server listening on port ${PORT}`)
})

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/scores', async (req, res) =>{
  try{
    const result = await client.query('SELECT * FROM public."Scoreboard" ORDER BY score DESC')
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.send("Error " + err)
  }
})

app.use(bodyParser.json());

app.post('/submit', async (req, res) =>{
  try {
    const { id, playerName, score, attempts, localId } = req.body

    const updateQuery = `DELETE FROM "Scoreboard" WHERE player_name = $1`
    const updateResult = await client.query(updateQuery, [localId])

    const insertQuery = `INSERT INTO "Scoreboard" (id, player_name, score, attempts, localId) VALUES ($1, $2, $3, $4, $5)RETURNING *`
    const insertResult = await client.query(insertQuery, [id, playerName, score, attempts, localId])
    res.json(insertResult.rows[0])

  } catch (err) {
    console.error(err);
    res.status(500).send("Error " + err)
  }
})




