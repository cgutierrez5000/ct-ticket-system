import pg from "pg";


const { Pool } = pg;

const pool = new Pool({
    database: "ct_ticket_system"
});








export default pool;