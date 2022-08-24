const { Pool } = require('pg')
const { connection: { connectionString } } = require('../config')

const pool = new Pool({ connectionString })

const getData = async(SQL, ...params) => {
    const client = await pool.connect()
    try {
        const { rows } = await client.query(SQL, params || null)
        return rows
    } finally {
        client.release()
    }
}

const getRow = async(SQL, ...params) => {
    const client = await pool.connect()
    try {
        const { rows: [row] } = await client.query(SQL, params || null)
        return row
    } finally {
        client.release()
    }
}

module.exports = { getData, getRow }