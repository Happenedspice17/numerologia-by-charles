(function () {
  const N = window.Numerologia;
  const T = window.Textos;
  const $ = (s) => document.querySelector(s);
  const CLAVE = 'numerologia-ultima-carta';

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pasos = (n) => n.pasos.join(' → ');
  const arquetipo = (v) => (T.numero[v] ? T.numero[v].nombre : '');

  function etiquetas(n) {
    const out = [];
    if (n.maestro) out.push('<span class="chip chip-maestro">Maestro</span>');
    if (n.karmico) out.push(`<span class="chip chip-karma">Kármico ${n.karmico}</span>`);
    return out.join('');
  }

  function medallon(titulo, sub, n, texto) {
    return `
      <article class="medallon">
        <header>
          <h3>${titulo}</h3>
          <p class="sub">${sub}</p>
        </header>
        <div class="cifra">${n.valor}</div>
        <p class="arq">${arquetipo(n.valor)}</p>
        <p class="pasos">${pasos(n)} ${etiquetas(n)}</p>
        <p class="texto">${texto || ''}</p>
        ${n.karmico ? `<p class="texto karma">${T.karmico[n.karmico]}</p>` : ''}
      </article>`;
  }

  function seccion(id, titulo, intro, cuerpo) {
    return `
      <section class="bloque" id="${id}">
        <h2>${titulo}</h2>
        ${intro ? `<p class="intro">${intro}</p>` : ''}
        ${cuerpo}
      </section>`;
  }

  function tiraNombre(nombre) {
    let palabra = -1;
    const celdas = nombre.letras.map((x) => {
      const sep = x.palabra !== palabra && palabra !== -1 ? ' sep' : '';
      palabra = x.palabra;
      return `<div class="letra${x.vocal ? ' vocal' : ''}${sep}"><span>${x.l}</span><b>${x.v}</b></div>`;
    });
    return `<div class="tira" role="list" aria-label="Valor de cada letra">${celdas.join('')}</div>
      <p class="leyenda"><span class="punto vocal"></span> vocal · <span class="punto"></span> consonante</p>`;
  }

  function tablaTalentos(nombre) {
    const filas = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => {
      const c = nombre.conteo[n];
      const estado = c === 0 ? 'omitido' : c < 3 ? 'deuda' : c === 3 ? 'saldado' : 'talento';
      const texto = c === 0 ? T.omitido[n] : T.talentos[n][estado];
      const nombreEstado = { omitido: 'Omitido', deuda: 'Deuda', saldado: 'Saldado', talento: 'Talento' }[estado];
      return `<tr>
        <th scope="row">${n}</th>
        <td class="num">${c}</td>
        <td><span class="estado ${estado}">${nombreEstado}</span></td>
        <td>${texto}</td>
      </tr>`;
    });
    return `<div class="tabla-scroll"><table class="tabla">
      <thead><tr><th>Energía</th><th>Veces</th><th>Estado</th><th>Lectura</th></tr></thead>
      <tbody>${filas.join('')}</tbody></table></div>`;
  }

  function planos(nombre) {
    const filas = ['mental', 'fisico', 'emocional', 'intuitivo'].map((k) => {
      const p = T.planos[k];
      const v = nombre.planos[k];
      return `<div class="plano">
        <div class="plano-cab"><h3>${p.titulo}</h3><span class="sub">${p.formula}</span></div>
        <div class="plano-val">${v}</div>
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
      return `<div class="celda${c ? '' : ' vacia'}"><span class="idx">${n}</span><b>${c ? String(n).repeat(c) : '—'}</b></div>`;
    });
    const lineas = fecha.saetas.map((s) => {
      const a = POS[s.linea[0]];
      const b = POS[s.linea[2]];
      const x = (p) => p[0] * 100 + 50;
      const y = (p) => p[1] * 100 + 50;
      return `<line x1="${x(a)}" y1="${y(a)}" x2="${x(b)}" y2="${y(b)}" class="${s.llena ? 'llena' : 'vacia'}" />`;
    });
    const lista = fecha.saetas.length
      ? fecha.saetas.map((s) => `<li class="${s.llena ? 'llena' : 'vacia'}"><b>${T.saeta[s.id].nombre}</b> <span class="sub">(${s.linea.join('-')}${s.llena ? '' : ' ausentes'})</span><br>${T.saeta[s.id].linea}</li>`).join('')
      : `<li><b>${T.saeta.ninguna.nombre}</b><br>${T.saeta.ninguna.linea}</li>`;
    const detalle = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      .filter((n) => fecha.cuadro[n])
      .map((n) => `<li><b>${String(n).repeat(fecha.cuadro[n])}</b> ${T.cuadro[n][Math.min(fecha.cuadro[n], 5) - 1]}</li>`)
      .join('');
    return `
      <div class="cuadro-wrap">
        <div class="cuadro-col">
          <div class="cuadro">
            <div class="planos-lado" aria-hidden="true"><span>Mental</span><span>Emocional</span><span>Físico</span></div>
            <div class="rejilla">
              ${celdas.join('')}
              <svg viewBox="0 0 300 300" aria-hidden="true">${lineas.join('')}</svg>
            </div>
          </div>
          <p class="leyenda">Dígitos de ${fecha.dia}/${fecha.mes}/${fecha.anio} sin ceros. <span class="trazo llena"></span> saeta presente <span class="trazo vacia"></span> saeta ausente</p>
        </div>
        <div class="cuadro-txt">
          <h3>Saetas</h3>
          <ul class="saetas">${lista}</ul>
          <h3>Números en el cuadro</h3>
          <ul class="det">${detalle}</ul>
          <details><summary>Los tres planos del cuadro</summary>
            <p>${T.cuadroPlanos.mental}</p><p>${T.cuadroPlanos.emocional}</p><p>${T.cuadroPlanos.fisico}</p>
          </details>
        </div>
      </div>`;
  }

  function etapas(fecha) {
    const s = fecha.simples;
    const cols = fecha.etapas.map((e) => {
      const actual = e.n === fecha.etapaActual;
      const rango = e.hasta === null ? `${e.desde}+ años` : `${e.desde}–${e.hasta} años`;
      return `<article class="etapa${actual ? ' actual' : ''}">
        <p class="eyebrow">Etapa ${e.n}${actual ? ' · actual' : ''}</p>
        <p class="rango">${rango}</p>
        <div class="par">
          <div><span class="sub">Pináculo</span><b>${e.pinaculo}</b><em>${arquetipo(e.pinaculo)}</em></div>
          <div><span class="sub">Desafío</span><b>${e.desafio}</b></div>
        </div>
        <p>${T.numero[e.pinaculo].luz}</p>
        <p class="desafio-txt">${T.desafio[e.desafio]}</p>
      </article>`;
    });
    return `
      <p class="formula">Mes ${s.mes} · Día ${s.dia} · Año ${s.anio} &nbsp;|&nbsp; P1 = M+D · P2 = D+A · P3 = P1+P2 · P4 = M+A &nbsp;|&nbsp; Desafíos: |M−D| · |D−A| · |D1−D2| · |M−A| &nbsp;|&nbsp; Fin de la etapa 1: 36 − ${N.simple(fecha.sendero.valor)}</p>
      <div class="etapas">${cols.join('')}</div>
      <p class="nota">El desafío de la etapa 3 es el Desafío Principal. Edad actual: ${fecha.edad} años.</p>`;
  }

  const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  function ciclos(fecha, hoy) {
    const mesActual = hoy.getMonth();
    const meses = fecha.meses.map((v, i) => `<div class="mes${i === mesActual ? ' actual' : ''}"><span>${MESES[i]}</span><b>${v}</b></div>`).join('');
    const anios = fecha.proximosAnios.map((a, i) => `<div class="mes${i === 0 ? ' actual' : ''}"><span>${a.anio}</span><b>${a.valor}</b></div>`).join('');
    return `
      <div class="trio">
        <div><span class="sub">Año personal ${hoy.getFullYear()}</span><b>${fecha.anioPersonal}</b><p>${T.anioPersonal[fecha.anioPersonal]}</p></div>
        <div><span class="sub">Mes personal</span><b>${fecha.mesPersonal}</b><p>${T.anioPersonal[fecha.mesPersonal]}</p></div>
        <div><span class="sub">Día personal (hoy)</span><b>${fecha.diaPersonal}</b><p>${T.anioPersonal[fecha.diaPersonal]}</p></div>
      </div>
      <h3>Meses personales de ${hoy.getFullYear()}</h3>
      <div class="fila-meses">${meses}</div>
      <h3>Ciclo de 9 años</h3>
      <div class="fila-meses">${anios}</div>
      <p class="formula">Año personal = día + mes + año en curso · Mes = año personal + mes · Día = mes personal + día</p>`;
  }

  function nacimiento(c) {
    const f = c.fecha;
    const n = c.nombre;
    const vocal = n.vocal
      ? `<p><b>${n.vocal.letra}</b> aparece ${n.vocal.repeticiones} ${n.vocal.repeticiones === 1 ? 'vez' : 'veces'} en el nombre completo. ${T.vocal[n.vocal.letra].base}${n.vocal.repeticiones >= 3 ? ' ' + T.vocal[n.vocal.letra].exceso : ''}</p>`
      : '<p>El primer nombre no tiene vocales.</p>';
    const ini = n.iniciales;
    const letra = (l, plano) => (l ? `<li><b>${l}</b> <span class="sub">${plano}</span><br>${T.letra[l]}</li>` : '');
    return `
      <div class="dos">
        <div>
          <h3>Natalicio · día ${f.dia}</h3>
          <p>${T.natalicio[f.dia]}</p>
          <h3>Último dígito del año · ${f.ultimoDigito}</h3>
          <p>${T.ultimoDigito[f.ultimoDigito]}</p>
        </div>
        <div>
          <h3>Primera vocal del nombre</h3>
          ${vocal}
          <h3>Letra numérica</h3>
          <ul class="letras">
            ${letra(ini.primerNombre, 'primer nombre · plano físico y cotidiano')}
            ${letra(ini.segundoNombre, 'segundo nombre · plano emocional')}
            ${letra(ini.apellido, 'apellido · herencia del clan')}
          </ul>
        </div>
      </div>`;
  }

  function avanzados(c) {
    const n = c.nombre;
    return `
      <div class="trio">
        <div><span class="sub">Subconsciente</span><b>${n.subconsciente}</b><p>${T.subconsciente(n.subconsciente)} Valores distintos en el nombre: ${n.presentes.join(', ')}.</p></div>
        <div><span class="sub">Equilibrio (iniciales)</span><b>${n.equilibrio.valor}</b><p>${T.equilibrio[n.equilibrio.valor] || ''}</p></div>
        <div><span class="sub">Productividad</span><b>${c.productividad.valor}</b><p>Sendero ${c.fecha.sendero.valor} + Misión del alma ${n.mision.valor}: terreno donde misión y talentos convergen. ${T.numero[c.productividad.valor].luz}</p></div>
      </div>`;
  }

  function render(datos) {
    const hoy = new Date();
    const c = N.carta({ ...datos, hoy });
    const f = c.fecha;
    const n = c.nombre;
    const nombreCompleto = esc([...n.nombres, ...n.apellidos].join(' '));

    $('#resultado').innerHTML = `
      <header class="cabecera">
        <p class="eyebrow">Carta numerológica</p>
        <h1>${nombreCompleto || 'Sin nombre'}</h1>
        <p class="meta">${String(f.dia).padStart(2, '0')}/${String(f.mes).padStart(2, '0')}/${f.anio} · ${esc(c.hora)} h${datos.horaPorDefecto ? ' (por defecto)' : ''} · ${f.edad} años</p>
      </header>

      <div class="medallones">
        ${medallon('Misión Kármica', 'Sendero de vida · fecha completa', f.sendero, T.misionKarmica[f.sendero.valor])}
        ${medallon('Esencia del Alma', 'Vocales · lo que desea', n.esencia, T.esencia[n.esencia.valor])}
        ${medallon('Personalidad', 'Consonantes · lo que proyecta', n.personalidad, T.personalidad[n.personalidad.valor])}
        ${medallon('Misión del Alma', 'Nombre completo · expresión', n.mision, T.mision[n.mision.valor])}
        ${medallon('Día de nacimiento', 'Talento del cumpleaños', f.esenciaDia, T.numero[f.esenciaDia.valor].luz + ' Sombra: ' + T.numero[f.esenciaDia.valor].sombra)}
        ${medallon('Año personal', 'Ciclo en curso', N.numero(f.anioPersonal), T.anioPersonal[f.anioPersonal])}
      </div>

      ${seccion('nombre', 'El nombre en números', 'Tabla pitagórica: A J S = 1 · B K T = 2 · C L U = 3 · D M V = 4 · E N Ñ W = 5 · F O X = 6 · G P Y = 7 · H Q Z = 8 · I R = 9.', tiraNombre(n))}
      ${seccion('talentos', 'Tabla de talentos y deudas kármicas', 'Cuántas veces aparece cada energía en el nombre: 3 = saldado, más de 3 = talento, menos de 3 = deuda, 0 = omitido.', tablaTalentos(n))}
      ${seccion('planos', 'Planos de existencia', 'Se suman las veces que aparecen las energías de cada plano en el nombre completo.', planos(n))}
      ${seccion('cuadro', 'Cuadro de vida pitagórico', 'Cada dígito de la fecha de nacimiento se coloca en su casilla. Las líneas completas o vacías forman las saetas.', cuadroPitagorico(f))}
      ${seccion('pinaculos', 'Pináculos y desafíos', 'Cuatro etapas de vida con la energía disponible (pináculo) y la lección por integrar (desafío).', etapas(f))}
      ${seccion('ciclos', 'Ciclos personales', '', ciclos(f, hoy))}
      ${seccion('nacimiento', 'Natalicio, vocal y letras', '', nacimiento(c))}
      ${seccion('avanzados', 'Cálculos avanzados', '', avanzados(c))}
    `;
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
    $('#ejemplo').hidden = !!e;
    render(datos);
    try {
      localStorage.setItem(CLAVE, JSON.stringify({ nombres: datos.nombres, apellidos: datos.apellidos, fecha: $('#fecha').value, hora: $('#hora').value }));
    } catch (_) {}
    if (e) $('#resultado').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function iniciar() {
    let guardado = null;
    try { guardado = JSON.parse(localStorage.getItem(CLAVE)); } catch (_) {}
    if (guardado && guardado.fecha) {
      $('#nombres').value = guardado.nombres || '';
      $('#apellidos').value = guardado.apellidos || '';
      $('#fecha').value = guardado.fecha;
      $('#hora').value = guardado.hora || '';
    }
    $('#form').addEventListener('submit', calcular);
    calcular();
    if (guardado && guardado.fecha) $('#ejemplo').hidden = true;
  }

  iniciar();
})();
