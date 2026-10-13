(function (root) {
  const MAESTROS = [11, 22, 33];
  const KARMICOS = [13, 14, 16, 19];
  const VOCALES = 'AEIOU';
  const TABLA = {
    A: 1, J: 1, S: 1,
    B: 2, K: 2, T: 2,
    C: 3, L: 3, U: 3,
    D: 4, M: 4, V: 4,
    E: 5, N: 5, W: 5,
    F: 6, O: 6, X: 6,
    G: 7, P: 7, Y: 7,
    H: 8, Q: 8, Z: 8,
    I: 9, R: 9,
  };

  const sumaDigitos = (n) => String(n).split('').reduce((a, d) => a + Number(d), 0);

  // Devuelve la cadena de reducción, p. ej. 29 → 11 (se detiene en maestro si keep).
  function cadena(n, keep = true) {
    const pasos = [n];
    while (n > 9 && !(keep && MAESTROS.includes(n))) {
      n = sumaDigitos(n);
      pasos.push(n);
    }
    return pasos;
  }

  const reducir = (n, keep = true) => cadena(n, keep).at(-1);
  const simple = (n) => reducir(n, false);

  function numero(total, keep = true) {
    const pasos = cadena(total, keep);
    return {
      valor: pasos.at(-1),
      pasos,
      karmico: pasos.find((p) => KARMICOS.includes(p)) || null,
      maestro: MAESTROS.includes(pasos.at(-1)),
    };
  }

  function normalizar(txt) {
    return (txt || '')
      .toUpperCase()
      .replace(/Ñ/g, 'N')
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^A-Z\s]/g, ' ')
      .split(/\s+/)
      .filter(Boolean);
  }

  function letras(palabras) {
    return palabras.flatMap((p, i) =>
      p.split('').map((l) => ({ l, v: TABLA[l], vocal: VOCALES.includes(l), palabra: i }))
    );
  }

  const suma = (arr) => arr.reduce((a, x) => a + x.v, 0);

  function analizarNombre(nombres, apellidos) {
    const pn = normalizar(nombres);
    const pa = normalizar(apellidos);
    const palabras = [...pn, ...pa];
    const ls = letras(palabras);
    const vocales = ls.filter((x) => x.vocal);
    const consonantes = ls.filter((x) => !x.vocal);

    const conteo = Array(10).fill(0);
    ls.forEach((x) => conteo[x.v]++);

    const presentes = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((n) => conteo[n] > 0);
    const omitidos = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((n) => conteo[n] === 0);

    const primerNombre = pn[0] || '';
    const primeraVocal = primerNombre.split('').find((l) => VOCALES.includes(l)) || null;

    return {
      palabras,
      nombres: pn,
      apellidos: pa,
      letras: ls,
      esencia: numero(suma(vocales)),
      personalidad: numero(suma(consonantes)),
      mision: numero(suma(ls)),
      conteo,
      presentes,
      omitidos,
      planos: {
        mental: conteo[1] + conteo[8],
        fisico: conteo[4] + conteo[5],
        emocional: conteo[2] + conteo[3] + conteo[6],
        intuitivo: conteo[7] + conteo[9],
      },
      subconsciente: presentes.length,
      equilibrio: numero(palabras.reduce((a, p) => a + TABLA[p[0]], 0)),
      vocal: primeraVocal && {
        letra: primeraVocal,
        repeticiones: ls.filter((x) => x.l === primeraVocal).length,
      },
      iniciales: {
        primerNombre: pn[0] ? pn[0][0] : null,
        segundoNombre: pn[1] ? pn[1][0] : null,
        apellido: pa[0] ? pa[0][0] : null,
      },
    };
  }

  function analizarFecha(dia, mes, anio, hoy) {
    const d1 = simple(dia);
    const m1 = simple(mes);
    const y1 = simple(anio);

    const dR = reducir(dia);
    const mR = reducir(mes);
    const yR = reducir(sumaDigitos(anio));
    const sendero = numero(dR + mR + yR);
    const s1 = simple(sendero.valor);

    const p1 = reducir(m1 + d1);
    const p2 = reducir(d1 + y1);
    const p3 = reducir(simple(p1) + simple(p2));
    const p4 = reducir(m1 + y1);

    const c1 = Math.abs(m1 - d1);
    const c2 = Math.abs(d1 - y1);
    const c3 = Math.abs(c1 - c2);
    const c4 = Math.abs(m1 - y1);

    const fin1 = 36 - s1;
    const etapas = [
      { n: 1, pinaculo: p1, desafio: c1, desde: 0, hasta: fin1 },
      { n: 2, pinaculo: p2, desafio: c2, desde: fin1 + 1, hasta: fin1 + 9 },
      { n: 3, pinaculo: p3, desafio: c3, desde: fin1 + 10, hasta: fin1 + 18 },
      { n: 4, pinaculo: p4, desafio: c4, desde: fin1 + 19, hasta: null },
    ];

    const h = hoy || new Date();
    const hy = h.getFullYear();
    const hm = h.getMonth() + 1;
    const hd = h.getDate();
    let edad = hy - anio;
    if (hm < mes || (hm === mes && hd < dia)) edad--;
    const etapaActual = etapas.find((e) => edad >= e.desde && (e.hasta === null || edad <= e.hasta));

    const anioPersonal = (y) => simple(d1 + m1 + simple(y));
    const ap = anioPersonal(hy);
    const mp = simple(ap + hm);
    const dp = simple(mp + hd);

    const digitos = `${dia}${mes}${anio}`.split('').map(Number).filter((x) => x > 0);
    const cuadro = Array(10).fill(0);
    digitos.forEach((x) => cuadro[x]++);

    return {
      dia,
      mes,
      anio,
      componentes: { dia: dR, mes: mR, anio: yR },
      simples: { dia: d1, mes: m1, anio: y1 },
      sendero,
      natalicio: dia,
      esenciaDia: numero(dia),
      ultimoDigito: anio % 10,
      etapas,
      edad,
      etapaActual: etapaActual ? etapaActual.n : null,
      anioPersonal: ap,
      mesPersonal: mp,
      diaPersonal: dp,
      meses: Array.from({ length: 12 }, (_, i) => simple(ap + i + 1)),
      proximosAnios: Array.from({ length: 9 }, (_, i) => ({ anio: hy + i, valor: anioPersonal(hy + i) })),
      cuadro,
      saetas: saetas(cuadro),
    };
  }

  const SAETAS = [
    { id: 'organizacion', linea: [1, 2, 3] },
    { id: 'voluntad', vacia: 'frustracion', linea: [4, 5, 6] },
    { id: 'actividad', vacia: 'pasividad', linea: [7, 8, 9] },
    { id: 'practicidad', vacia: 'trastorno', linea: [1, 4, 7] },
    { id: 'balance', vacia: 'hipersensibilidad', linea: [2, 5, 8] },
    { id: 'intelecto', vacia: 'pocaMemoria', linea: [3, 6, 9] },
    { id: 'determinacion', vacia: 'demora', linea: [1, 5, 9] },
    { id: 'espiritualidad', vacia: 'esceptico', linea: [3, 5, 7] },
  ];

  function saetas(cuadro) {
    const res = [];
    SAETAS.forEach((s) => {
      if (s.linea.every((n) => cuadro[n] > 0)) res.push({ id: s.id, linea: s.linea, llena: true });
      else if (s.vacia && s.linea.every((n) => cuadro[n] === 0)) res.push({ id: s.vacia, linea: s.linea, llena: false });
    });
    return res;
  }

  function carta({ nombres, apellidos, dia, mes, anio, hora, hoy }) {
    const nombre = analizarNombre(nombres, apellidos);
    const fecha = analizarFecha(dia, mes, anio, hoy);
    return {
      hora: hora || '12:00',
      nombre,
      fecha,
      productividad: numero(fecha.sendero.valor + nombre.mision.valor),
    };
  }

  const api = { TABLA, MAESTROS, KARMICOS, cadena, reducir, simple, numero, normalizar, analizarNombre, analizarFecha, carta };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Numerologia = api;
})(typeof window !== 'undefined' ? window : globalThis);
