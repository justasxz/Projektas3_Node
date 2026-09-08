import * as THREE from '/vendor/three.module.js';

const $ = (selector) => document.querySelector(selector);
const feed = $('#feed');

const visualRoot = $('#node-visual');
if (visualRoot) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 2, 0.1, 100);
  camera.position.z = 5;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  visualRoot.appendChild(renderer.domElement);
  const core = new THREE.Group();
  scene.add(core);
  const coreMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(0.82, 2), new THREE.MeshBasicMaterial({ color: 0xd6f45c, wireframe: true, transparent: true, opacity: 0.9 }));
  core.add(coreMesh);
  const orbit = new THREE.Mesh(new THREE.TorusGeometry(1.25, 0.012, 8, 96), new THREE.MeshBasicMaterial({ color: 0xff6f52 }));
  orbit.rotation.x = Math.PI / 2.5;
  core.add(orbit);
  for (let index = 0; index < 18; index += 1) {
    const angle = (index / 18) * Math.PI * 2;
    const node = new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 10), new THREE.MeshBasicMaterial({ color: index % 3 ? 0xffad49 : 0xff6f52 }));
    node.position.set(Math.cos(angle) * 1.8, Math.sin(angle) * 0.7, Math.sin(angle) * 1.2);
    core.add(node);
  }
  function resizeVisual() { const box = visualRoot.getBoundingClientRect(); renderer.setSize(box.width, box.height, false); camera.aspect = box.width / box.height; camera.updateProjectionMatrix(); }
  function animate() { requestAnimationFrame(animate); core.rotation.y += 0.003; core.rotation.x += 0.001; orbit.rotation.z -= 0.007; renderer.render(scene, camera); }
  window.addEventListener('resize', resizeVisual);
  resizeVisual();
  animate();
}
function addEvent(type, detail) {
  const row = document.createElement('div'); row.className = 'event';
  row.innerHTML = `<time>${new Date().toLocaleTimeString('lt-LT')}</time><b>${type}</b><span>${detail}</span>`;
  feed.prepend(row); while (feed.children.length > 20) feed.lastChild.remove();
}
async function loadStatus() {
  const status = await fetch('/api/status').then((r) => r.json());
  $('#node').textContent = status.node; $('#pid').textContent = status.pid; $('#uptime').textContent = `${status.uptime}s`; $('#memory').textContent = `${status.memory} MB`; $('#host').textContent = status.hostname; $('#platform').textContent = `${status.platform} · ${status.cpu} CPU cores`;
  if ($('#visual-stat')) $('#visual-stat').textContent = `${status.memory} MB RAM · PID ${status.pid}`;
}
async function loadNotes() {
  const notes = await fetch('/api/notes').then((r) => r.json());
  $('#notes').innerHTML = notes.length ? notes.map((note) => `<div class="note"><span>${escapeHtml(note.text)}</span><span><time>${new Date(note.createdAt).toLocaleTimeString('lt-LT')}</time><button data-id="${note.id}" title="Ištrinti">×</button></span></div>`).join('') : '<div class="note"><span style="color:#718080">Kol kas tuščia. Sukurk pirmą įrašą.</span></div>';
}
function escapeHtml(text) { const div = document.createElement('div'); div.textContent = text; return div.innerHTML; }
$('#note-form').addEventListener('submit', async (event) => { event.preventDefault(); const input = $('#note-input'); const text = input.value.trim(); if (!text) return; await fetch('/api/notes', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ text }) }); input.value = ''; loadNotes(); addEvent('WRITE', 'Užrašas įrašytas į Supabase'); });
$('#notes').addEventListener('click', async (event) => { if (event.target.dataset.id) { await fetch(`/api/notes/${event.target.dataset.id}`, { method:'DELETE' }); loadNotes(); addEvent('DELETE', 'Užrašas ištrintas iš Supabase'); } });
$('#refresh').addEventListener('click', loadStatus);
document.querySelectorAll('.route button').forEach((button) => button.addEventListener('click', async (event) => { const route = event.target.closest('.route').dataset.route; const response = await fetch(route); $('#response').textContent = JSON.stringify(await response.json(), null, 2); addEvent('API PROBE', route); }));
$('#probe').addEventListener('click', async () => { const response = await fetch('/api/node-powers'); $('#power-result').textContent = JSON.stringify(await response.json(), null, 2); addEvent('CHILD PROCESS', 'Node paleido kitą Node procesą ir perskaitė failo metaduomenis'); });
async function loadComments() {
  const comments = await fetch('/api/comments').then((r) => r.json());
  $('#comments').innerHTML = comments.length ? comments.map((comment) => `<div class="note"><span>${escapeHtml(comment.text)}</span><span><time>${new Date(comment.createdAt).toLocaleTimeString('lt-LT')}</time><button data-id="${comment.id}" title="Ištrinti">×</button></span></div>`).join('') : '<div class="note"><span style="color:#718080">Kol kas komentarų nėra.</span></div>';
}
$('#comment-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const input = $('#comment-input');
  const text = input.value.trim();
  if (!text) return;
  await fetch('/api/comments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) });
  input.value = '';
  loadComments();
  addEvent('COMMENT', 'Komentaras įrašytas į Supabase');
});
$('#comments').addEventListener('click', async (event) => {
  if (event.target.dataset.id) {
    await fetch(`/api/comments/${event.target.dataset.id}`, { method: 'DELETE' });
    loadComments();
    addEvent('COMMENT', 'Komentaras ištrintas iš Supabase');
  }
});
$('#connection').textContent = 'PRISIJUNGĘS';
setInterval(() => { $('#clock').textContent = new Date().toLocaleTimeString('lt-LT'); }, 1000);
setInterval(() => { loadNotes(); loadComments(); loadStatus(); }, 5000);
loadStatus(); loadNotes(); loadComments();
