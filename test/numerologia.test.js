const assert = require('node:assert');
const N = require('../js/numerologia.js');
const T = require('../js/textos.js');

// Ejemplos del Manual del alumno 2026
assert.strictEqual(N.analizarNombre('María', '').mision.valor, 6);
const carlos = N.analizarNombre('Carlos', 'Mendoza');
assert.strictEqual(carlos.subconsciente, 7);
assert.deepStrictEqual(carlos.omitidos, [2, 7]);
assert.strictEqual(N.analizarNombre('Carlos Alberto', 'Mendoza').equilibrio.valor, 8);

const f = N.analizarFecha(15, 3, 1989, new Date(2026, 9, 13));
assert.deepStrictEqual(f.sendero.pasos, [18, 9]);
assert.deepStrictEqual(f.etapas.map((e) => e.pinaculo), [9, 6, 6, 3]);
assert.deepStrictEqual(f.etapas.map((e) => e.desafio), [3, 3, 0, 6]);
assert.strictEqual(f.etapas[0].hasta, 27);

// Maestros y kármicos
assert.strictEqual(N.reducir(29), 11);
assert.strictEqual(N.simple(29), 2);
assert.strictEqual(N.numero(49).karmico, 13);

// Cada resultado posible tiene texto
for (let d = 1; d <= 31; d++) assert.ok(T.natalicio[d]);
for (const l of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') assert.ok(T.letra[l]);
for (let y = 1900; y <= 2030; y++) for (let m = 1; m <= 12; m++) for (const d of [1, 9, 11, 22, 29, 31]) {
  const c = N.carta({ nombres: 'Ana', apellidos: 'Ñúñez', dia: d, mes: m, anio: y, hoy: new Date(2026, 9, 13) });
  assert.ok(T.misionKarmica[c.fecha.sendero.valor], `sendero ${c.fecha.sendero.valor}`);
  c.fecha.etapas.forEach((e) => { assert.ok(T.numero[e.pinaculo]); assert.ok(T.desafio[e.desafio]); });
  assert.ok(T.numero[c.productividad.valor]);
  c.fecha.saetas.forEach((s) => assert.ok(T.saeta[s.id]));
}
console.log('ok');
