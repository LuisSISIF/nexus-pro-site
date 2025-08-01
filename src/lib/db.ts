import mysql from 'mysql2/promise';

export async function db() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        ssl: {
            // DO NOT DO THIS IN PRODUCTION
            rejectUnauthorized: false,
        },
    });
    return connection;
}