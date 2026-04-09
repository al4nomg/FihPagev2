const fishImgs = ["meditando.gif","pez-que-mira.jpg","contento.jpg","pez-examen.jpg","fumador.jpg","salmon.gif"];

const audio = document.getElementById('salmonAudio');
let playing = false;

function toggleAudio() {
  if (playing) {
    audio.pause();
    document.getElementById('playBtn').textContent = '▶ reproducir';
    playing = false;
  } else {
    audio.play().catch(() => {
      document.getElementById('playBtn').textContent = '(xdd)';
    });
    document.getElementById('playBtn').textContent = '⏸ pausar';
    playing = true;
  }
}

function setVol(v) {
  audio.volume = parseFloat(v);
}

const frases = [
  ["el pez no pidió nacer. pero acá está. nadando.", "el pez"],
  ["si un pez cae en el bosque y no hay nadie para verlo, ¿hace sonido? sí. es un pez.", "nadie"],
  ["el pez no tiene instagram. el pez es libre.", "el pez, feliz"],
  ["alguna vez miraste un pez a los ojos y sentiste que él también te está juzgando.", "experiencia personal"],
  ["los peces no tienen rodillas y aun así sobreviven wacho", "el universo"],
  ["el pez no sabe qué día es. el pez tampoco necesita saberlo.", "pez del río"],
  ["hay peces que viajan miles de kilómetros sin google maps. vos no podés ir al súper sin el teléfono.", "la naturaleza, decepcionada"],
  ["el pez no tiene deudas. el pez no paga alquiler. el pez ganó.", "análisis económico acuático"],
  ["en algún lugar hay un pez que está teniendo el mejor día de su vida. eso me parece bien.", "observación neutral"],
  ["el pez no le responde a nadie. el pez dejó en visto y siguió nadando.", "el pez que ya maduró"],
];

let lastFrase = -1;

function nuevaFrase() {
  const el = document.getElementById('fraseTexto');
  el.style.opacity = 0;
  setTimeout(() => {
    let i;
    do { i = Math.floor(Math.random() * frases.length); } while (i === lastFrase);
    lastFrase = i;
    el.textContent = '"' + frases[i][0] + '"';
    el.style.opacity = 1;
    document.querySelector('.frase-autor').textContent = '— ' + frases[i][1];
  }, 300);
}

const preguntas = [
  {
    q: "son las 11pm. tenés un tp para mañana que no empezaste. ¿qué hacés?",
    opts: ["lo empiezo ahora, quizás llego","lo entrego como está (vacío)","busco si hay algún tp del año pasado","me duermo y lo entrego tarde con alguna excusa creativa"]
  },
  {
    q: "el profe pide que expliques tu código en clase. vos lo copiaste de internet. ¿qué hacés?",
    opts: ["lo explico igual, de alguna forma lo entiendo mientras hablo","digo que no me funciona el micro","pregunto si puede pasar al siguiente","explico con tanta confianza que el profe duda de sí mismo"]
  },
  {
    q: "¿cuál es tu relación con la documentación?",
    opts: ["la leo toda antes de empezar","la abro cuando algo no funciona","la ignoro y aprendo de los errores","¿documentación de qué?"]
  },
  {
    q: "¿qué pez de la galería te representa más?",
    opts: ["el pez meditando en el agua","el pez furioso con los deditos","el pez fumando post-parcial","el gato-pez, ser de dos mundos"]
  }
];

const resultados = [
  { titulo: "el pez fumador 🚬", desc: "sobreviviste cosas que no deberían sobrevivirse. cada entrega fue una guerra. pero acá estás. el pez fuma porque ya lo vio todo.", img: "fumador.jpg" },
  { titulo: "el pez del dedo 👉👈", desc: "querés entregar algo pero el sistema no colabora. o el IDE. o el wifi. o los astros. igual lo hacés.", img: "pez-examen.jpg" },
  { titulo: "el gato-pez 🐱🐟", desc: "existís en dos dimensiones a la vez: el estudiante que entiende todo y el que no entendió nada. a veces el mismo día.", img: "pez-despues-del-parcial.jpg" },
  { titulo: "el pez con zapatillas 👟", desc: "siempre en movimiento, siempre corriendo, pero nunca claro adónde. el pez también tiene converse y también llega tarde.", img: "deportista.jpg" }
];

let qActual = 0;
let puntajes = [0,0,0,0];

function renderPregunta() {
  const q = preguntas[qActual];
  document.getElementById('quizProg').textContent = 'pregunta ' + (qActual + 1) + ' de ' + preguntas.length;
  document.getElementById('quizQ').textContent = q.q;
  const opts = document.getElementById('quizOpts');
  opts.innerHTML = '';
  q.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt-btn';
    btn.textContent = opt;
    btn.onclick = () => elegir(i, btn);
    opts.appendChild(btn);
  });
}

function elegir(i, btn) {
  document.querySelectorAll('.quiz-opt-btn').forEach(b => b.classList.remove('elegida'));
  btn.classList.add('elegida');
  puntajes[i]++;
  setTimeout(() => {
    qActual++;
    if (qActual < preguntas.length) renderPregunta();
    else mostrarResultado();
  }, 380);
}

function mostrarResultado() {
  document.getElementById('quizArea').style.display = 'none';
  const idx = puntajes.indexOf(Math.max(...puntajes));
  const r = resultados[idx];
  document.getElementById('resultTitulo').textContent = r.titulo;
  document.getElementById('resultDesc').textContent = r.desc;
  document.getElementById('resultImg').src = r.img;
  document.getElementById('resultCard').classList.add('visible');
}

function resetQuiz() {
  qActual = 0;
  puntajes = [0,0,0,0];
  document.getElementById('quizArea').style.display = 'block';
  document.getElementById('resultCard').classList.remove('visible');
  renderPregunta();
}

renderPregunta();

const mensajesPanico = [
  "el pez también tiene parciales. y también los reprueba.",
  "respirá. el pez no respira y sobrevive.",
  "el profe no va a saber que copiaste. el pez tampoco lo sabe.",
  "todo pasa. incluso esta carrera.",
  "el pez fumador lo entendió: a veces hay que soltar.",
];

let panicActivo = false;
let panicInterval = null;

function togglePanic() {
  if (panicActivo) { stopPanic(); return; }
  panicActivo = true;
  const btn = document.getElementById('panicBtn');
  btn.classList.add('activo');
  btn.textContent = 'DETENER';
  const swarm = document.getElementById('swarm');
  swarm.classList.add('activo');
  swarm.innerHTML = '';

  function spawnFish() {
    const img = document.createElement('img');
    img.className = 'fish-volador';
    img.src = fishImgs[Math.floor(Math.random() * fishImgs.length)];
    img.style.top = Math.random() * 85 + 'vh';
    img.style.left = '-150px';
    const dur = 2.5 + Math.random() * 2.5;
    if (Math.random() > 0.5) img.style.transform = 'scaleX(-1)';
    img.style.transition = `left ${dur}s linear`;
    swarm.appendChild(img);
    requestAnimationFrame(() => requestAnimationFrame(() => { img.style.left = '110vw'; }));
    setTimeout(() => img.remove(), dur * 1000 + 200);
  }

  for (let i = 0; i < 8; i++) setTimeout(spawnFish, i * 150);
  panicInterval = setInterval(spawnFish, 350);
  document.getElementById('panicTexto').textContent = mensajesPanico[Math.floor(Math.random() * mensajesPanico.length)];
}

function stopPanic() {
  panicActivo = false;
  clearInterval(panicInterval);
  document.getElementById('panicBtn').classList.remove('activo');
  document.getElementById('panicBtn').textContent = 'ACTIVAR PÁNICO';
  document.getElementById('swarm').classList.remove('activo');
  document.getElementById('swarm').innerHTML = '';
  document.getElementById('panicTexto').textContent = '';
}

document.getElementById('visitas').textContent = (1337 + Math.floor(Math.random() * 40)).toLocaleString();
const SUPA_URL = 'https://dywmsutrtzaajguecksu.supabase.co';
const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5d21zdXRydHphYWpndWVja3N1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2MTI3OTksImV4cCI6MjA5MTE4ODc5OX0.ZiztX5k1301AmaK7WwGGYx2RWfm8rXO0IukUIzo5Z8w';

const supaHeaders = {
  'apikey': SUPA_KEY,
  'Authorization': 'Bearer ' + SUPA_KEY,
  'Content-Type': 'application/json'
};

// char counter
document.getElementById('rMensaje').addEventListener('input', function() {
  document.getElementById('charCount').textContent = this.value.length;
});

async function cargarResenas() {
  try {
    const res = await fetch(SUPA_URL + '/rest/v1/comentarios?select=*&order=created_at.desc&limit=50', {
      headers: supaHeaders
    });
    const data = await res.json();
    const lista = document.getElementById('resenaLista');

    if (!data.length) {
      lista.innerHTML = '<div class="resena-vacia">nadie comentó todavía. sé el primero/a. o la primera. o lo primero.</div>';
      return;
    }

    lista.innerHTML = data.map(r => `
      <div class="resena-card">
        <div class="resena-nombre">🐟 ${escapeHtml(r.nombre)}</div>
        <div class="resena-fecha">${formatFecha(r.created_at)}</div>
        <div class="resena-mensaje">${escapeHtml(r.mensaje)}</div>
      </div>
    `).join('');
  } catch(e) {
    document.getElementById('resenaLista').innerHTML = '<div class="resena-vacia">error cargando comentarios. el pez no pudo.</div>';
  }
}

async function enviarResena(e) {
  e.preventDefault();
  const nombre = document.getElementById('rNombre').value.trim();
  const mensaje = document.getElementById('rMensaje').value.trim();
  const btn = document.getElementById('btnEnviar');
  const status = document.getElementById('formStatus');

  if (!nombre || !mensaje) return;

  btn.disabled = true;
  btn.textContent = 'enviando...';
  status.textContent = '';

  try {
    const res = await fetch(SUPA_URL + '/rest/v1/comentarios', {
      method: 'POST',
      headers: { ...supaHeaders, 'Prefer': 'return=minimal' },
      body: JSON.stringify({ nombre, mensaje })
    });

    if (res.ok) {
      status.textContent = '✅ comentario enviado. el pez te agradece.';
      document.getElementById('rNombre').value = '';
      document.getElementById('rMensaje').value = '';
      document.getElementById('charCount').textContent = '0';
      await cargarResenas();
    } else {
      status.style.color = 'var(--rosa)';
      status.textContent = '❌ algo salió mal. intentá de nuevo.';
    }
  } catch(e) {
    status.style.color = 'var(--rosa)';
    status.textContent = '❌ error de red. el pez tampoco tiene wifi.';
  }

  btn.disabled = false;
  btn.textContent = '📨 mandar';
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function formatFecha(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('es-AR', { day:'2-digit', month:'2-digit', year:'numeric' })
    + ' · ' + d.toLocaleTimeString('es-AR', { hour:'2-digit', minute:'2-digit' });
}

cargarResenas();