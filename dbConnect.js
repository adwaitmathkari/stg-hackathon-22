
const { Client } = require("pg")

module.exports = async function connectDB() {
    let client;
    try {
        client = new Client({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: 'hackathon123####',
            port: process.env.PGPORT
        })

        await client.connect();

        console.log('Database Connected');
        return client;

    } catch(e){
        console.log('Error connecting to database: ' + e);
    }
}