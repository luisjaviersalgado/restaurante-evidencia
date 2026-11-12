# Historial de cambios

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/). Los cambios se identifican con solicitudes de cambio (CR-nnn).

## [1.0.0-baseline] – 2026-11-11

### Heredado del proyecto base (cacarrascal/TallerRestaurante-)
- `45833f0` (2026-04-29): versión inicial con `index.html`, `css/styles.css`, `js/script.js` y `README.md`; incluye los siete módulos (pedidos, reservas, menú, usuarios, clientes, facturación y reportes).
- `1f9d338` (2026-04-29): carga de archivos sin cambios de contenido (el árbol es idéntico al del commit anterior).
- `a2455de` (2026-04-29): se agregan `assets/logo.svg` y `assets/pizza.png`; el título pasa a "Restaurante" y se reemplaza el ícono del logo por la imagen.
- `8f2b0d9` (2026-05-04): se agregan `assets/1.png`, `assets/footer.html`, el pie de página fijo y sus estilos.

### Corregido
- **CR-001** (`1736391`, tipo correctivo, prioridad alta): `initApp()` llamaba a `renderPedidos()`, función inexistente, y la carga de la página terminaba con `ReferenceError`; ningún módulo mostraba datos. Ahora invoca `renderMenu()` y `renderCart()`.
- **CR-002** (`5c73e4b`, tipo correctivo, prioridad alta): `renderFacturaItems()` reiniciaba la lista de ítems en cada edición, por lo que no se podía generar una factura. El reinicio se movió al evento de "Nueva Factura".

### Documentación y pruebas
- Se agregan `LICENSE.txt` (MIT), `CHANGELOG.md`, `docs/` (estructura de datos, manual de despliegue y problemas conocidos) y se actualiza `README.md`.
- Se agrega `tests/integracion.js` con 11 pruebas básicas de integración.

### Problemas conocidos
Ver [docs/PROBLEMAS_CONOCIDOS.md](docs/PROBLEMAS_CONOCIDOS.md). No se corrigen en esta línea base y quedan como solicitudes de cambio futuras.
