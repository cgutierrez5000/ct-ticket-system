import pg from "pg";


const { Pool } = pg;

const databaseUrl = process.env.DATABASE_URL;

const pool = new Pool(
    databaseUrl
        ? { connectionString: databaseUrl }
        : { database: "ct_ticket_system" }
);


export default pool;