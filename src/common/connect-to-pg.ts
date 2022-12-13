import { Pool } from 'pg';
import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(process.cwd(), '.env') });
config({ path: join(process.cwd(), '.default.env') });

export async function connectToPg() {
    const pool = new Pool({
        user: process.env.PG_USER,
        password: process.env.PG_PASS,
        host: process.env.PG_HOST,
        database: process.env.PG_BASE,
        port: +process.env.PG_PORT,
    });

    const connection = pool.connect();

    console.info('Connect to Postgres');

    return connection;
}
