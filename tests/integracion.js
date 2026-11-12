// Pruebas básicas de integración de la línea base (Chromium + Playwright). Uso: node pruebas.js <url> <salida.json>
const { chromium } = require('playwright'); const fs = require('fs');
const url = process.argv[2], salida = process.argv[3];
(async () => {
  const br = await chromium.launch(); const resultados = [];
  async function nuevaPagina() {
    const ctx = await br.newContext({ viewport: { width: 1366, height: 800 } }); const p = await ctx.newPage(); p.errores = [];
    p.on('pageerror', e => p.errores.push(e.message));
    await p.route(/^https?:\/\/(?!localhost)/, r => r.abort());
    await p.goto(url, { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(500); return p;
  }
  const mod = async (p, m) => { await p.click(`.nav-item[data-module="${m}"]`); await p.waitForTimeout(200); };
  const ls = (p, k) => p.evaluate(k => (JSON.parse(localStorage.getItem(k)) || []).length, k);
  async function prueba(id, desc, esperado, fn) {
    let p; try { p = await nuevaPagina(); const obtenido = await fn(p); resultados.push({ id, desc, esperado, ok: true, obtenido: String(obtenido ?? 'Cumple') }); }
    catch (e) { resultados.push({ id, desc, esperado, ok: false, obtenido: e.message.split('\n')[0].slice(0, 110) }); }
    if (p) await p.context().close();
  }
  const aserta = (c, m) => { if (!c) throw new Error(m); };

  await prueba('PB-01', 'Carga inicial sin errores de JavaScript', 'Sin errores en consola', async p => { aserta(p.errores.length === 0, p.errores.join('; ')); return '0 errores'; });
  await prueba('PB-02', 'Módulo Pedidos lista el menú', '16 platillos', async p => { const n = await p.locator('#menuGrid .menu-card').count(); aserta(n === 16, n + ' platillos'); return n + ' platillos'; });
  await prueba('PB-03', 'Agregar platillos al carrito y calcular total', 'Total $330.00', async p => {
    await p.click('.menu-card:has-text("Ribeye Steak") .add-btn'); await p.click('.menu-card:has-text("Limonada Natural") .add-btn');
    const t = (await p.textContent('#cartTotal')).trim(); aserta(t.includes('330.00'), 'Total ' + t); return 'Total ' + t; });
  await prueba('PB-04', 'Confirmar pedido y actualizar estadísticas', 'Pendientes +1 y pedido guardado', async p => {
    const antes = parseInt((await p.textContent('#pedidosPendientes')).trim()); await p.click('.menu-card:has-text("Pasta Carbonara") .add-btn'); await p.fill('#clientePedido', 'Cliente de prueba'); await p.selectOption('#tipoPedido', 'domicilio');
    await p.click('#confirmarPedido'); await p.waitForTimeout(200);
    const pend = (await p.textContent('#pedidosPendientes')).trim(); const n = await ls(p, 'pedidos'); aserta(parseInt(pend) === antes + 1 && n === 16, `pendientes ${antes} -> ${pend}, guardados=${n}`); return `pendientes ${antes} -> ${pend}, guardados=${n}`; });
  await prueba('PB-05', 'Reservas: listar y crear una reserva', '2 del día; total 16 tras crear', async p => {
    await mod(p, 'reservas'); const filas = await p.locator('#reservasTableBody tr').count();
    await p.click('#nuevaReserva'); await p.fill('#reservaCliente', 'Cliente Reserva'); await p.fill('#reservaTelefono', '3000000000');
    await p.fill('#reservaFechaInput', new Date().toISOString().slice(0, 10)); await p.selectOption('#reservaHora', { index: 1 }); await p.fill('#reservaPersonas', '2');
    await p.click('#reservaForm button[type="submit"]'); await p.waitForTimeout(200); const n = await ls(p, 'reservas');
    aserta(filas === 2 && n === 16, `filas del día=${filas}, guardadas=${n}`); return `filas del día=${filas}, guardadas=${n}`; });
  await prueba('PB-06', 'Menú: crear un platillo', '17 tarjetas', async p => {
    await mod(p, 'menu'); await p.click('#nuevoPlatillo'); await p.fill('#platilloNombre', 'Plato de prueba'); await p.selectOption('#platilloCategoria', 'postres');
    await p.fill('#platilloDescripcion', 'Descripción'); await p.fill('#platilloPrecio', '50'); await p.click('#platilloForm button[type="submit"]'); await p.waitForTimeout(200);
    const n = await p.locator('#menuManagementGrid .menu-management-card').count(); aserta(n === 17, n + ' tarjetas'); return n + ' tarjetas'; });
  await prueba('PB-07', 'Usuarios: listar y crear un usuario', '5 y luego 6', async p => {
    await mod(p, 'usuarios'); const a = await p.locator('#usuariosGrid .usuario-card').count();
    await p.click('#nuevoUsuario'); await p.fill('#usuarioNombre', 'Prueba'); await p.fill('#usuarioApellido', 'Línea'); await p.fill('#usuarioEmail', 'prueba@gourmet.com');
    await p.fill('#usuarioTelefono', '555-0000'); await p.selectOption('#usuarioRol', 'mesero'); await p.click('#usuarioForm button[type="submit"]'); await p.waitForTimeout(200);
    const b = await p.locator('#usuariosGrid .usuario-card').count(); aserta(a === 5 && b === 6, `${a} -> ${b}`); return `${a} -> ${b}`; });
  await prueba('PB-08', 'Clientes: paginación y búsqueda', '10 por página; la búsqueda filtra', async p => {
    await mod(p, 'clientes'); const a = await p.locator('#clientesTableBody tr').count(); await p.fill('#clienteSearch', 'Juan'); await p.waitForTimeout(300);
    const b = await p.locator('#clientesTableBody tr').count(); aserta(a === 10 && b >= 1 && b < 10, `${a} filas; filtradas ${b}`); return `${a} filas; filtradas ${b}`; });
  await prueba('PB-09', 'Facturación: listar y calcular IVA de una factura nueva', 'IVA 16 % y factura guardada (13 -> 14)', async p => {
    await mod(p, 'facturas'); const a = await p.locator('#facturasTableBody tr').count();
    await p.click('#nuevaFactura'); await p.fill('#facturaCliente', 'Cliente Factura'); await p.fill('#facturaFechaEmision', new Date().toISOString().slice(0, 10));
    const f = p.locator('#facturaItemsBody tr').first(); await f.locator('input').nth(0).fill('Plato'); await f.locator('input').nth(0).press('Tab');
    await f.locator('input').nth(1).fill('2'); await f.locator('input').nth(1).press('Tab'); await f.locator('input').nth(2).fill('100'); await f.locator('input').nth(2).press('Tab'); await p.waitForTimeout(200);
    const iva = (await p.locator('#facturaIVA').evaluate(e => e.value ?? e.textContent)).toString(); const tot = (await p.locator('#facturaTotal').evaluate(e => e.value ?? e.textContent)).toString();
    await p.click('#facturaForm button[type="submit"]'); await p.waitForTimeout(300); const b = await p.locator('#facturasTableBody tr').count();
    aserta(a === 13 && /32/.test(iva) && /232/.test(tot) && b === 14, `${a} -> ${b} facturas; IVA=${iva}; total=${tot}`); return `${a} -> ${b} facturas; IVA=${iva}; total=${tot}`; });
  await prueba('PB-10', 'Reportes: generar un reporte de ventas', 'Gráfico y resumen visibles', async p => {
    await mod(p, 'reportes'); await p.click('#generarReporte'); await p.waitForTimeout(300);
    const t = (await p.textContent('#chartContainer')).trim().length + (await p.textContent('#reportSummary')).trim().length; aserta(t > 20, 'sin contenido'); return 'Reporte generado'; });
  await prueba('PB-11', 'Persistencia: el pedido sobrevive a la recarga', 'Pedidos guardados = 16', async p => {
    await p.click('.menu-card:has-text("Ribeye Steak") .add-btn'); await p.fill('#clientePedido', 'Persistente'); await p.click('#confirmarPedido'); await p.waitForTimeout(200);
    await p.reload({ waitUntil: 'domcontentloaded' }); await p.waitForTimeout(400); const n = await ls(p, 'pedidos'); aserta(n === 16, 'guardados=' + n); return 'guardados=' + n; });

  fs.writeFileSync(salida, JSON.stringify(resultados, null, 1));
  for (const r of resultados) console.log((r.ok ? 'OK    ' : 'FALLA ') + r.id + ' ' + r.desc + ' -> ' + r.obtenido);
  await br.close();
})();
