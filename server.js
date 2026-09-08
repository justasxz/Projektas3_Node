require('dotenv').config();
const http = require('http');
const fs = require('fs');
const path = require('path');
const { ensureReady, listComments, createComment, deleteComment, listNotes, createNote, deleteNote } = require('./db');
const { serverStatus, nodePowers } = require('./lib/core');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');
const clients = new Set();

function broadcast(event, payload) {
  const message = `event: ${event}\ndata: ${JSON.stringify(payload)}\n\n`;
  clients.forEach((client) => client.write(message));
}

function json(response, status, payload) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  response.end(JSON.stringify(payload));
}

async function body(request) {
  let raw = '';
  for await (const chunk of request) raw += chunk;
  return JSON.parse(raw || '{}');
}

function serveStatic(request, response) {
  const requested = request.url === '/' ? '/index.html' : request.url.split('?')[0];
  const filePath = path.normalize(path.join(PUBLIC_DIR, requested));
  if (!filePath.startsWith(PUBLIC_DIR)) return json(response, 403, { error: 'Forbidden' });
  fs.readFile(filePath, (error, content) => {
    if (error) return json(response, 404, { error: 'Not found' });
    const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml' };
    response.writeHead(200, { 'Content-Type': `${types[path.extname(filePath)] || 'application/octet-stream'}; charset=utf-8` });
    response.end(content);
  });
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const route = url.pathname;
  const method = request.method;
  broadcast('request', { method, route, time: new Date().toLocaleTimeString('lt-LT') });

  if (route === '/api/events') {
    response.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
    response.write(`event: connected\ndata: ${JSON.stringify({ message: 'SSE kanalas prijungtas' })}\n\n`);
    clients.add(response);
    request.on('close', () => clients.delete(response));
    return;
  }
  if (route === '/api/status' && method === 'GET') return json(response, 200, serverStatus());
  if (route === '/api/node-powers' && method === 'GET') {
    try { return json(response, 200, await nodePowers()); }
    catch { return json(response, 500, { error: 'Node probe nepavyko' }); }
  }
  if (route === '/api/notes' && method === 'GET') {
    try { return json(response, 200, await listNotes()); }
    catch { return json(response, 500, { error: 'Nepavyko gauti užrašų' }); }
  }
  if (route === '/api/notes' && method === 'POST') {
    try {
      const input = await body(request);
      if (!input.text?.trim()) return json(response, 400, { error: 'Tekstas privalomas' });
      const note = await createNote(input.text.trim());
      broadcast('note-created', note);
      return json(response, 201, note);
    } catch { return json(response, 400, { error: 'Neteisingas JSON' }); }
  }
  if (route.startsWith('/api/notes/') && method === 'DELETE') {
    const id = route.split('/').pop();
    try {
      const found = await deleteNote(id);
      if (!found) return json(response, 404, { error: 'Užrašas nerastas' });
      broadcast('note-deleted', { id });
      return json(response, 204, null);
    } catch { return json(response, 500, { error: 'Nepavyko ištrinti užrašo' }); }
  }
  if (route === '/api/comments' && method === 'GET') {
    try { return json(response, 200, await listComments()); }
    catch { return json(response, 500, { error: 'Nepavyko gauti komentarų' }); }
  }
  if (route === '/api/comments' && method === 'POST') {
    try {
      const input = await body(request);
      if (!input.text?.trim()) return json(response, 400, { error: 'Tekstas privalomas' });
      const comment = await createComment(input.text.trim());
      broadcast('comment-created', comment);
      return json(response, 201, comment);
    } catch { return json(response, 400, { error: 'Neteisingas JSON' }); }
  }
  if (route.startsWith('/api/comments/') && method === 'DELETE') {
    const id = route.split('/').pop();
    try {
      const found = await deleteComment(id);
      if (!found) return json(response, 404, { error: 'Komentaras nerastas' });
      broadcast('comment-deleted', { id });
      return json(response, 204, null);
    } catch { return json(response, 500, { error: 'Nepavyko ištrinti komentaro' }); }
  }
  if (route === '/api/health' && method === 'GET') return json(response, 200, { ok: true, service: 'node-real-world-lab' });
  serveStatic(request, response);
});

ensureReady()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Node Real World Lab veikia: http://localhost:${PORT}`);
      console.log('Užrašai ir komentarai saugomi Supabase (Postgres) duomenų bazėje');
    });
  })
  .catch((error) => {
    console.error('Nepavyko pasiruošti duomenų bazės:', error);
    process.exit(1);
  });

module.exports = server;
