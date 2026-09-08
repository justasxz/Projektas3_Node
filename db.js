const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

let readyPromise = null;

function ensureReady() {
  if (!readyPromise) readyPromise = initDb();
  return readyPromise;
}

async function initDb() {
  await pool.query(`
    create table if not exists comments (
      id uuid primary key default gen_random_uuid(),
      text text not null,
      created_at timestamptz not null default now()
    );
  `);
  await pool.query(`
    create table if not exists notes (
      id uuid primary key default gen_random_uuid(),
      text text not null,
      created_at timestamptz not null default now()
    );
  `);
}

async function listComments() {
  await ensureReady();
  const { rows } = await pool.query('select id, text, created_at as "createdAt" from comments order by created_at desc');
  return rows;
}

async function createComment(text) {
  await ensureReady();
  const { rows } = await pool.query(
    'insert into comments (text) values ($1) returning id, text, created_at as "createdAt"',
    [text]
  );
  return rows[0];
}

async function deleteComment(id) {
  await ensureReady();
  const { rowCount } = await pool.query('delete from comments where id = $1', [id]);
  return rowCount > 0;
}

async function listNotes() {
  await ensureReady();
  const { rows } = await pool.query('select id, text, created_at as "createdAt" from notes order by created_at desc');
  return rows;
}

async function createNote(text) {
  await ensureReady();
  const { rows } = await pool.query(
    'insert into notes (text) values ($1) returning id, text, created_at as "createdAt"',
    [text]
  );
  return rows[0];
}

async function deleteNote(id) {
  await ensureReady();
  const { rowCount } = await pool.query('delete from notes where id = $1', [id]);
  return rowCount > 0;
}

module.exports = {
  initDb, ensureReady,
  listComments, createComment, deleteComment,
  listNotes, createNote, deleteNote
};
