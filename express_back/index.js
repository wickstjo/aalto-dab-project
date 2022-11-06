const express = require('express')
const cors = require('cors')
const { Client } = require('pg')

// EXPRESS INSTANCE
const app = express()

// BASIC MIDDLEWARES
app.use(express.json())
app.use(cors())

// RUN POSTGRES QUERY
const pg_query = async (query_string, callback) => {

    // DATABASE CLIENT
    const client = new Client({
        user: 'username',
        host: 'postgres_db',
        database: 'database',
        password: 'password',
        port: 5432,
    })

    // CONNECT TO DB
    await client.connect()

    // PERFORM QUERY
    return client.query(query_string, (error, result) => {
        
        // CATCH ERRORS
        if (error) {
            return response.status(404).send({
                error: error
            })
        }

        // OTHERWISE, RUN CALLBACK
        return callback(result)
    }) 
}

// FETCH ALL URL SHORTCUTS
app.get('/all', async (request, response) => {

    // QUERY STRING
    const query = 'SELECT * FROM temp_tbl'

    // RUN QUERY & RESPOND WITH VALUES
    await pg_query(query, (result) => {
        return response.status(200).send(result.rows)
    })   
})

// FETCH ALL URL SHORTCUTS
app.post('/fetch', async (request, response) => {

    // EXTRACT THE URL FROM THE REQUEST BODY
    const shortcut = request.body.shortcut

    // QUERY STRING
    const query = {
        text: 'SELECT * FROM temp_tbl WHERE shortcut = $1',
        values: [shortcut],
    }

    // RUN QUERY & RESPOND WITH VALUES
    pg_query(query, (result) => {

        // ROW FOUND
        if (result.rows.length == 1) {
            return response.status(200).send(result.rows[0])
        }

        // NOT FOUND
        return response.status(404).send({
            success: false
        })
    })   
})

// FETCH RANDOM URL
app.get('/random', async (request, response) => {

    // QUERY STRING
    const query = 'SELECT * FROM temp_tbl'

    // RUN QUERY & RESPOND WITH VALUES
    await pg_query(query, (result) => {

        // ENOUGH ROWS, PICK RANDOM
        if (result.rows.length > 0) {
            const random_index = Math.floor(Math.random() * result.rows.length);
            return response.status(200).send(result.rows[random_index])
        }

        // ERROR -- NOT ENOUGH VALUES
        return response.status(404).send({
            success: false
        })
    })   
})

// CREATE RANDOM STRING ID
const create_id = async (length) => {
    
    // UNIQUE CHECK
    let is_unique = false
    let container

    while (!is_unique) {

        container = ''
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        // CONSTRUCT RANDOM STRING
        for (let i = 0; i < length; i++) {
            container += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        // QUERY STRING
        const query = {
            text: 'SELECT COUNT(*) FROM temp_tbl WHERE shortcut = $1',
            values: [container],
        }

        // VERIFY STRING UNIQUENESS
        await pg_query(query, (result) => {
            if (result.rows[0].count == 0) {
                is_unique = true
            }
        })
    }

    return container
}

// CREATE NEW SHORTCUT
app.post('/create', async (request, response) => {

    // EXTRACT THE URL FROM THE REQUEST BODY
    const URL = request.body.url
    const random_id = await create_id(5)
    
    // QUERY STRING
    const query = {
        text: 'INSERT INTO temp_tbl (full_url, shortcut) VALUES ($1, $2)',
        values: [URL, random_id],
    }

    // RUN QUERY
    pg_query(query, (result) => {
        return response.status(201).send({
            full_url: URL,
            shortcut: random_id
        })
    })
})

// LAUNCH API SERVER
app.listen(process.env.API_PORT, () => {
    console.log(`Server running on port ${ process.env.API_PORT }`)
})