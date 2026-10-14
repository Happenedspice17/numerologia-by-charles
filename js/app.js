(function () {
  const N = window.Numerologia;
  const T = window.Textos;
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const CLAVE = 'numerologia-ultima-carta';
  const CLAVE_TEMA = 'numerologia-tema';

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pasos = (n) => n.pasos.join(' → ');
  const arquetipo = (v) => (T.numero[v] ? T.numero[v].nombre : '');
  const leer = (k) => { try { return localStorage.getItem(k); } catch (_) { return null; } };
  const guardar = (k, v) => { try { localStorage.setItem(k, v); } catch (_) {} };

  const PANELES = [
    { id: 'resumen', nombre: 'Resumen', icono: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2.5"/>' },
    { id: 'nombre', nombre: 'Nombre', icono: '<path d="M5 19 10 5h4l5 14M7.5 13h9"/>' },
    { id: 'cuadro', nombre: 'Cuadro', icono: '<rect x="4" y="4" width="16" height="16" rx="1"/><path d="M9.3 4v16M14.7 4v16M4 9.3h16M4 14.7h16"/>' },
    { id: 'etapas', nombre: 'Etapas', icono: '<path d="M3 19h4v-5h4V9h4V5h6"/>' },
    { id: 'ciclos', nombre: 'Ciclos', icono: '<path d="M20 12a8 8 0 1 1-2.3-5.7"/><path d="M20 4v5h-5"/>' },
    { id: 'origen', nombre: 'Natalicio', icono: '<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/><circle cx="12" cy="12" r="3"/>' },
  ];

  function etiquetas(n) {
    const out = [];
    if (n.maestro) out.push('<span class="chip chip-maestro">Maestro</span>');
    if (n.karmico) out.push(`<span class="chip chip-karma">Kármico ${n.karmico}</span>`);
    return out.join('');
  }

  function medallon(titulo, sub, n, texto) {
    return `
      <article class="medallon">
        <button class="med-cab" type="button" aria-expanded="false">
          <span class="cifra">${n.valor}</span>
          <span class="med-tit">
            <span class="med-nombre">${titulo}</span>
            <span class="arq">${arquetipo(n.valor)}</span>
          </span>
          <svg class="flecha" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
        </button>
        <div class="med-cuerpo">
          <p class="sub">${sub}</p>
          <p class="pasos">${pasos(n)} ${etiquetas(n)}</p>
          <p>${texto || ''}</p>
          ${n.karmico ? `<p class="karma">${T.karmico[n.karmico]}</p>` : ''}
        </div>
      </article>`;
  }

  function bloque(titulo, intro, cuerpo) {
    return `
      <section class="bloque">
        <h2>${titulo}</h2>
        ${intro ? `<p class="intro">${intro}</p>` : ''}
        ${cuerpo}
      </section>`;
  }

  function ahora(c, hoy) {
    const f = c.fecha;
    const e = f.etapas.find((x) => x.n === f.etapaActual) || f.etapas[0];
    const maestros = [];
    const karmicos = [];
    const revisar = (nombre, n) => {
      if (n.maestro) maestros.push(`${nombre} ${n.valor}`);
      if (n.karmico) karmicos.push(`${nombre} (${n.karmico})`);
    };
    revisar('Misión kármica', f.sendero);
    revisar('Esencia', c.nombre.esencia);
    revisar('Personalidad', c.nombre.personalidad);
    revisar('Misión del alma', c.nombre.mision);
    revisar('Día', f.esenciaDia);
    const principal = f.etapas[2].desafio;
    return `
      <div class="ahora">
        <div class="ahora-item"><span class="sub">Pináculo actual</span><b>${e.pinaculo}</b><span>${arquetipo(e.pinaculo)} · etapa ${e.n}</span></div>
        <div class="ahora-item"><span class="sub">Desafío actual</span><b class="dnum">${e.desafio}</b><span>${e.hasta === null ? `desde los ${e.desde}` : `${e.desde} a ${e.hasta} años`}</span></div>
        <div class="ahora-item"><span class="sub">Año ${hoy.getFullYear()}</span><b>${f.anioPersonal}</b><span>${T.anioPersonal[f.anioPersonal]}</span></div>
        <div class="ahora-item"><span class="sub">Mes · Día</span><b>${f.mesPersonal}<small> · ${f.diaPersonal}</small></b><span>${T.anioPersonal[f.mesPersonal]}</span></div>
      </div>
      <ul class="claves">
        <li><b>Desafío principal</b> ${principal}: ${T.desafio[principal]}</li>
        <li><b>Saetas</b> ${f.saetas.length ? f.saetas.map((s) => T.saeta[s.id].nombre.replace('Saeta ', '')).join(' · ') : 'sin saetas'}</li>
        <li><b>Números maestros</b> ${maestros.length ? maestros.join(' · ') : 'ninguno en los números principales'}</li>
        <li><b>Kármicos</b> ${karmicos.length ? karmicos.join(' · ') : 'ninguno en los números principales'}</li>
        <li><b>Omitidos en el nombre</b> ${c.nombre.omitidos.length ? c.nombre.omitidos.join(', ') : 'ninguno'}</li>
      </ul>`;
  }

  function tiraNombre(nombre) {
    let palabra = -1;
    const celdas = nombre.letras.map((x) => {
      const sep = x.palabra !== palabra && palabra !== -1 ? ' sep' : '';
      palabra = x.palabra;
      return `<div class="letra${x.vocal ? ' vocal' : ''}${sep}"><span>${x.l}</span><b>${x.v}</b></div>`;
    });
    return `<div class="tira" aria-label="Valor de cada letra">${celdas.join('')}</div>
      <p class="leyenda"><span class="punto vocal"></span> vocal <span class="punto"></span> consonante</p>
      <details class="tabla-letras"><summary>Ver tabla pitagórica</summary>
        <p>1 A J S · 2 B K T · 3 C L U · 4 D M V · 5 E N Ñ W · 6 F O X · 7 G P Y · 8 H Q Z · 9 I R</p>
      </details>`;
  }

  function tablaTalentos(nombre) {
    const filas = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => {
      const c = nombre.conteo[n];
      const estado = c === 0 ? 'omitido' : c < 3 ? 'deuda' : c === 3 ? 'saldado' : 'talento';
      const texto = c === 0 ? T.omitido[n] : T.talentos[n][estado];
      const nombreEstado = { omitido: 'Omitido', deuda: 'Deuda', saldado: 'Saldado', talento: 'Talento' }[estado];
      const puntos = Array.from({ length: Math.max(c, 3) }, (_, i) => `<i class="${i < c ? 'on' : ''}"></i>`).join('');
      return `<li class="talento ${estado}">
        <span class="t-num">${n}</span>
        <span class="t-puntos" aria-label="${c} veces">${puntos}</span>
        <span class="estado ${estado}">${nombreEstado} · ${c}</span>
        <p>${texto}</p>
      </li>`;
    });
    return `<ul class="talentos">${filas.join('')}</ul>`;
  }

  function planos(nombre) {
    const max = Math.max(9, ...Object.values(nombre.planos));
    const filas = ['mental', 'fisico', 'emocional', 'intuitivo'].map((k) => {
      const p = T.planos[k];
      const v = nombre.planos[k];
      return `<div class="plano">
        <div class="plano-cab"><h3>${p.titulo}</h3><span class="plano-val">${v}</span></div>
        <div class="barra"><i style="width:${(v / max) * 100}%"></i></div>
        <span class="sub">${p.formula}</span>
        <p>${p[Math.min(v, 9)]}</p>
      </div>`;
    });
    return `<div class="planos">${filas.join('')}</div>`;
  }

  // Coordenadas de cada número en el cuadro (3 6 9 / 2 5 8 / 1 4 7)
  const POS = { 3: [0, 0], 6: [1, 0], 9: [2, 0], 2: [0, 1], 5: [1, 1], 8: [2, 1], 1: [0, 2], 4: [1, 2], 7: [2, 2] };

  function cuadroPitagorico(fecha) {
    const orden = [3, 6, 9, 2, 5, 8, 1, 4, 7];
    const celdas = orden.map((n) => {
      const c = fecha.cuadro[n];
      return `<div class="celda${c ? '' : ' vacia'}"><span class="idx">${n}</span><b>${c ? String(n).repeat(c) : '·'}</b></div>`;
    });
    const lineas = fecha.saetas.map((s) => {
      const a = POS[s.linea[0]];
      const b = POS[s.linea[2]];
      const x = (p) => p[0] * 100 + 50;
      const y = (p) => p[1] * 100 + 50;
      return `<line x1="${x(a)}" y1="${y(a)}" x2="${x(b)}" y2="${y(b)}" class="${s.llena ? 'llena' : 'vacia'}" />`;
    });
    const lista = fecha.saetas.length
      ? fecha.saetas.map((s) => `<li class="${s.llena ? 'llena' : 'vacia'}"><b>${T.saeta[s.id].nombre}</b> <span class="sub">${s.linea.join('-')}${s.llena ? '' : ' ausentes'}</span><p>${T.saeta[s.id].linea}</p></li>`).join('')
      : `<li><b>${T.saeta.ninguna.nombre}</b><p>${T.saeta.ninguna.linea}</p></li>`;
    const detalle = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      .filter((n) => fecha.cuadro[n])
      .map((n) => `<li><b>${String(n).repeat(fecha.cuadro[n])}</b><span>${T.cuadro[n][Math.min(fecha.cuadro[n], 5) - 1]}</span></li>`)
      .join('');
    const faltan = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((n) => !fecha.cuadro[n]);
    return `
      <div class="cuadro-wrap">
        <div class="cuadro-col">
          <div class="cuadro">
            <div class="planos-lado" aria-hidden="true"><span>Mental</span><span>Emoc.</span><span>Físico</span></div>
            <div class="rejilla">
              ${celdas.join('')}
              <svg viewBox="0 0 300 300" aria-hidden="true">${lineas.join('')}</svg>
            </div>
          </div>
          <p class="leyenda">Dígitos de ${fecha.dia}/${fecha.mes}/${fecha.anio} sin ceros<br><span class="trazo llena"></span> saeta presente <span class="trazo vacia"></span> saeta ausente</p>
        </div>
        <div class="cuadro-txt">
          <h3>Saetas</h3>
          <ul class="saetas">${lista}</ul>
        </div>
      </div>
      <h3>Números en el cuadro</h3>
      <ul class="det">${detalle}</ul>
      ${faltan.length ? `<p class="nota">Sin presencia en la fecha: ${faltan.join(', ')}.</p>` : ''}
      <details><summary>Los tres planos del cuadro</summary>
        <p>${T.cuadroPlanos.mental}</p><p>${T.cuadroPlanos.emocional}</p><p>${T.cuadroPlanos.fisico}</p>
      </details>`;
  }

  function etapas(fecha) {
    const s = fecha.simples;
    const items = fecha.etapas.map((e) => {
      const actual = e.n === fecha.etapaActual;
      const rango = e.hasta === null ? `${e.desde} años en adelante` : `${e.desde} a ${e.hasta} años`;
      return `<li class="etapa${actual ? ' actual' : ''}">
        <span class="nodo" aria-hidden="true">${e.n}</span>
        <div class="etapa-cuerpo">
          <p class="rango">${rango}${actual ? ' <span class="chip chip-maestro">Ahora</span>' : ''}${e.n === 3 ? ' <span class="chip chip-karma">Desafío principal</span>' : ''}</p>
          <div class="par">
            <div><span class="sub">Pináculo</span><b>${e.pinaculo}</b><em>${arquetipo(e.pinaculo)}</em></div>
            <div><span class="sub">Desafío</span><b class="dnum">${e.desafio}</b></div>
          </div>
          <p>${T.numero[e.pinaculo].luz}</p>
          <p class="desafio-txt">${T.desafio[e.desafio]}</p>
        </div>
      </li>`;
    });
    return `
      <ol class="linea-vida">${items.join('')}</ol>
      <details><summary>Cómo se calcula</summary>
        <p class="formula">Mes ${s.mes} · Día ${s.dia} · Año ${s.anio}<br>Pináculos: M+D · D+A · P1+P2 · M+A<br>Desafíos: |M−D| · |D−A| · |D1−D2| · |M−A|<br>Fin de la etapa 1: 36 − ${N.simple(fecha.sendero.valor)} = ${fecha.etapas[0].hasta}</p>
      </details>`;
  }

  const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  function ciclos(fecha, hoy) {
    const mesActual = hoy.getMonth();
    const meses = fecha.meses.map((v, i) => `<div class="mes${i === mesActual ? ' actual' : ''}"><span>${MESES[i]}</span><b>${v}</b></div>`).join('');
    const anios = fecha.proximosAnios.map((a, i) => `<div class="mes${i === 0 ? ' actual' : ''}"><span>${a.anio}</span><b>${a.valor}</b></div>`).join('');
    const significados = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `<li><b>${n}</b> ${T.anioPersonal[n]}</li>`).join('');
    return `
      <div class="trio">
        <div><span class="sub">Año personal ${hoy.getFullYear()}</span><b>${fecha.anioPersonal}</b><p>${T.anioPersonal[fecha.anioPersonal]}</p></div>
        <div><span class="sub">Mes personal</span><b>${fecha.mesPersonal}</b><p>${T.anioPersonal[fecha.mesPersonal]}</p></div>
        <div><span class="sub">Día personal hoy</span><b>${fecha.diaPersonal}</b><p>${T.anioPersonal[fecha.diaPersonal]}</p></div>
      </div>
      <h3>Meses personales de ${hoy.getFullYear()}</h3>
      <div class="fila-meses">${meses}</div>
      <h3>Ciclo de 9 años</h3>
      <div class="fila-meses">${anios}</div>
      <details><summary>Significado de cada número del ciclo</summary><ul class="det">${significados}</ul></details>
      <p class="formula">Año personal = día + mes + año en curso · Mes = año personal + mes · Día = mes personal + día</p>`;
  }

  function origen(c) {
    const f = c.fecha;
    const n = c.nombre;
    const vocal = n.vocal
      ? `<p><b class="letra-grande">${n.vocal.letra}</b> aparece ${n.vocal.repeticiones} ${n.vocal.repeticiones === 1 ? 'vez' : 'veces'} en el nombre completo. ${T.vocal[n.vocal.letra].base}${n.vocal.repeticiones >= 3 ? ' ' + T.vocal[n.vocal.letra].exceso : ''}</p>`
      : '<p>El primer nombre no tiene vocales.</p>';
    const ini = n.iniciales;
    const letra = (l, plano) => (l ? `<li><b class="letra-grande">${l}</b><div><span class="sub">${plano}</span><p>${T.letra[l]}</p></div></li>` : '');
    return `
      ${bloque(`Natalicio · día ${f.dia}`, '', `<p>${T.natalicio[f.dia]}</p>`)}
      ${bloque(`Último dígito del año · ${f.ultimoDigito}`, '', `<p>${T.ultimoDigito[f.ultimoDigito]}</p>`)}
      ${bloque('Primera vocal del nombre', '', vocal)}
      ${bloque('Letra numérica', '', `<ul class="letras">
        ${letra(ini.primerNombre, 'Primer nombre · plano físico y cotidiano')}
        ${letra(ini.segundoNombre, 'Segundo nombre · plano emocional')}
        ${letra(ini.apellido, 'Apellido · herencia del clan')}
      </ul>`)}
      ${bloque('Cálculos avanzados', '', `<div class="trio">
        <div><span class="sub">Subconsciente</span><b>${n.subconsciente}</b><p>${T.subconsciente(n.subconsciente)} Valores en el nombre: ${n.presentes.join(', ')}.</p></div>
        <div><span class="sub">Equilibrio · iniciales</span><b>${n.equilibrio.valor}</b><p>${T.equilibrio[n.equilibrio.valor] || ''}</p></div>
        <div><span class="sub">Productividad</span><b>${c.productividad.valor}</b><p>Sendero ${f.sendero.valor} + Misión del alma ${n.mision.valor}. ${T.numero[c.productividad.valor].luz}</p></div>
      </div>`)}`;
  }

  function render(datos) {
    const hoy = new Date();
    const c = N.carta({ ...datos, hoy });
    const f = c.fecha;
    const n = c.nombre;
    const nombreCompleto = esc([...n.nombres, ...n.apellidos].join(' ')) || 'Sin nombre';

    $('#perfil-nombre').innerHTML = nombreCompleto;
    $('#perfil-meta').textContent = `${String(f.dia).padStart(2, '0')}/${String(f.mes).padStart(2, '0')}/${f.anio} · ${c.hora} h${datos.horaPorDefecto ? ' (por defecto)' : ''} · ${f.edad} años`;
    $('#perfil-numeros').innerHTML = [
      ['Sendero', f.sendero.valor],
      ['Esencia', n.esencia.valor],
      ['Misión', n.mision.valor],
    ].map(([k, v]) => `<span><b>${v}</b>${k}</span>`).join('');

    const paneles = {
      resumen: `
        ${bloque('Ahora mismo', '', ahora(c, hoy))}
        ${bloque('Números principales', 'Toca una tarjeta para leer su interpretación.', `<div class="medallones">
          ${medallon('Misión Kármica', 'Sendero de vida · fecha completa', f.sendero, T.misionKarmica[f.sendero.valor])}
          ${medallon('Esencia del Alma', 'Vocales · lo que desea', n.esencia, T.esencia[n.esencia.valor])}
          ${medallon('Personalidad', 'Consonantes · lo que proyecta', n.personalidad, T.personalidad[n.personalidad.valor])}
          ${medallon('Misión del Alma', 'Nombre completo · expresión', n.mision, T.mision[n.mision.valor])}
          ${medallon('Día de nacimiento', 'Talento del cumpleaños', f.esenciaDia, `${T.numero[f.esenciaDia.valor].luz} Sombra: ${T.numero[f.esenciaDia.valor].sombra}`)}
          ${medallon('Año personal', `Ciclo ${hoy.getFullYear()}`, N.numero(f.anioPersonal), T.anioPersonal[f.anioPersonal])}
        </div>`)}`,
      nombre: `
        ${bloque('El nombre en números', '', tiraNombre(n))}
        ${bloque('Talentos y deudas kármicas', '3 = saldado · más de 3 = talento · menos de 3 = deuda · 0 = omitido.', tablaTalentos(n))}
        ${bloque('Planos de existencia', 'Cuántas veces aparecen en el nombre las energías de cada plano.', planos(n))}`,
      cuadro: bloque('Cuadro de vida pitagórico', 'Cada dígito de la fecha va a su casilla. Las líneas completas o vacías forman las saetas.', cuadroPitagorico(f)),
      etapas: bloque('Pináculos y desafíos', `Cuatro etapas de vida. Edad actual: ${f.edad} años.`, etapas(f)),
      ciclos: bloque('Ciclos personales', '', ciclos(f, hoy)),
      origen: origen(c),
    };
    PANELES.forEach((p) => { $(`#panel-${p.id}`).innerHTML = paneles[p.id]; });
  }

  function mostrarPanel(id, desplazar) {
    if (!PANELES.some((p) => p.id === id)) id = 'resumen';
    PANELES.forEach((p) => {
      $(`#panel-${p.id}`).hidden = p.id !== id;
      $$(`[data-tab="${p.id}"]`).forEach((b) => b.setAttribute('aria-current', p.id === id ? 'page' : 'false'));
    });
    if (desplazar) $('#tabs-ancla').scrollIntoView({ block: 'start' });
  }

  function construirTabs() {
    const html = PANELES.map((p) => `<a href="#${p.id}" data-tab="${p.id}" aria-current="false"><svg viewBox="0 0 24 24" aria-hidden="true">${p.icono}</svg><span>${p.nombre}</span></a>`).join('');
    $('#tabs').innerHTML = html;
    $('#main').innerHTML = PANELES.map((p) => `<div class="panel-carta" id="panel-${p.id}" hidden></div>`).join('');
    $('#tabs').addEventListener('click', (e) => {
      const a = e.target.closest('[data-tab]');
      if (!a) return;
      e.preventDefault();
      mostrarPanel(a.dataset.tab, true);
      try { history.replaceState(null, '', `#${a.dataset.tab}`); } catch (_) {}
    });
    $('#main').addEventListener('click', (e) => {
      const b = e.target.closest('.med-cab');
      if (!b) return;
      const abierto = b.getAttribute('aria-expanded') === 'true';
      b.setAttribute('aria-expanded', String(!abierto));
      b.parentElement.classList.toggle('abierto', !abierto);
    });
  }

  function aplicarTema(tema) {
    const root = document.documentElement;
    if (tema === 'claro') root.setAttribute('data-theme', 'light');
    else if (tema === 'oscuro') root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
    const btn = $('#tema');
    btn.dataset.tema = tema;
    const nombre = { sistema: 'Automático', claro: 'Claro', oscuro: 'Oscuro' }[tema];
    btn.querySelector('.tema-txt').textContent = nombre;
    btn.setAttribute('aria-label', `Tema: ${nombre}. Cambiar`);
  }

  function iniciarTema() {
    const orden = ['sistema', 'claro', 'oscuro'];
    let tema = leer(CLAVE_TEMA);
    if (!orden.includes(tema)) tema = 'sistema';
    aplicarTema(tema);
    $('#tema').addEventListener('click', () => {
      tema = orden[(orden.indexOf(tema) + 1) % orden.length];
      aplicarTema(tema);
      guardar(CLAVE_TEMA, tema);
    });
  }

  function leerForm() {
    const fecha = $('#fecha').value;
    if (!fecha) return null;
    const [anio, mes, dia] = fecha.split('-').map(Number);
    const hora = $('#hora').value;
    return {
      nombres: $('#nombres').value,
      apellidos: $('#apellidos').value,
      dia, mes, anio,
      hora: hora || '12:00',
      horaPorDefecto: !hora,
    };
  }

  function editar(abrir) {
    $('#datos').hidden = !abrir;
    $('#editar').setAttribute('aria-expanded', String(abrir));
    $('#editar').textContent = abrir ? 'Cerrar' : 'Editar datos';
    if (abrir) $('#nombres').focus();
  }

  function calcular(e) {
    if (e) e.preventDefault();
    const datos = leerForm();
    const err = $('#error');
    if (!datos || !(datos.nombres + datos.apellidos).trim()) {
      err.textContent = 'Escribe el nombre y la fecha de nacimiento para calcular la carta.';
      err.hidden = false;
      return;
    }
    if (datos.anio < 1000) {
      err.textContent = 'Revisa el año de nacimiento: debe tener cuatro dígitos.';
      err.hidden = false;
      return;
    }
    err.hidden = true;
    render(datos);
    if (e) {
      $('#ejemplo').hidden = true;
      editar(false);
      mostrarPanel('resumen', true);
      guardar(CLAVE, JSON.stringify({ nombres: datos.nombres, apellidos: datos.apellidos, fecha: $('#fecha').value, hora: $('#hora').value }));
    }
  }

  function iniciar() {
    iniciarTema();
    construirTabs();
    let guardado = null;
    try { guardado = JSON.parse(leer(CLAVE)); } catch (_) {}
    if (guardado && guardado.fecha) {
      $('#nombres').value = guardado.nombres || '';
      $('#apellidos').value = guardado.apellidos || '';
      $('#fecha').value = guardado.fecha;
      $('#hora').value = guardado.hora || '';
      $('#ejemplo').hidden = true;
    }
    $('#form').addEventListener('submit', calcular);
    $('#editar').addEventListener('click', () => editar($('#datos').hidden));
    calcular();
    mostrarPanel(location.hash.slice(1), false);
  }

  iniciar();
})();
