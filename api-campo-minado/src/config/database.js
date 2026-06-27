const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'campo_minado_db',
  // Se o .env falhar, ele usa a string direta que você colocar aqui:
  password: process.env.DB_PASSWORD || '1315', 
  port: process.env.DB_PORT || 5432,
});

module.exports = pool;