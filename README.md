# Sistema Integral de Gestión de Restaurante (SIGR)

Aplicación web de gestión para restaurantes desarrollada con HTML, CSS y JavaScript sin frameworks.
Este repositorio contiene la **línea base v1.0.0-baseline** definida para el taller AA2 de Gestión del Software (Unidad 2 – Gestión de la configuración). El código parte de `https://github.com/cacarrascal/TallerRestaurante-.git` (commit `8f2b0d9`) e incorpora dos correcciones controladas (CR-001 y CR-002).

## Módulos incluidos en la línea base

| Módulo | Funcionalidad |
|---|---|
| Pedidos | Carrito de compras, confirmación de pedidos y estadísticas del día |
| Reservas | Calendario de mesas, creación de reservas y cambio de estado |
| Menú | CRUD de platillos con categorías, precios, disponibilidad e imagen |
| Usuarios | Gestión de empleados con roles (admin, mesero, cocinero) |
| Clientes | Registro, búsqueda, filtros y paginación |
| Facturación | Facturas de contado o crédito con cálculo automático de IVA (16 %) |
| Reportes | Reportes de ventas, productos, clientes y reservas |

La persistencia se hace en `localStorage`; no hay base de datos ni servidor. Los datos de ejemplo se cargan automáticamente (16 platillos, 5 usuarios, 25 clientes, 15 pedidos, 15 reservas y 13 facturas).

## Cómo ejecutar

1. Clonar el repositorio: `git clone <URL-del-repositorio>`.
2. Abrir `index.html` en un navegador moderno, o servir la carpeta con `python -m http.server 8080` y abrir `http://localhost:8080`.
3. Usar el menú lateral para cambiar de módulo.

Para restaurar los datos originales, limpiar el `localStorage` del navegador.

## Estructura del proyecto

```
.
├── index.html            # Interfaz y modales
├── css/styles.css        # Estilos
├── js/script.js          # Lógica de todos los módulos
├── assets/               # Logos e imágenes
├── tests/integracion.js  # Pruebas básicas de integración (Playwright)
├── docs/                 # Estructura de datos, despliegue y problemas conocidos
├── CHANGELOG.md          # Historial de cambios de la línea base
└── LICENSE.txt           # Licencia MIT
```

## Documentación

- [CHANGELOG.md](CHANGELOG.md)
- [docs/ESTRUCTURA_DE_DATOS.md](docs/ESTRUCTURA_DE_DATOS.md)
- [docs/MANUAL_DE_DESPLIEGUE.md](docs/MANUAL_DE_DESPLIEGUE.md)
- [docs/PROBLEMAS_CONOCIDOS.md](docs/PROBLEMAS_CONOCIDOS.md)

## Pruebas

Con Node.js y Playwright instalados (`npm i playwright` y `npx playwright install chromium`):

```
node tests/integracion.js file:///ruta/al/proyecto/index.html salida.json
```

## Tecnologías

HTML5, CSS3 (variables, Flexbox y Grid), JavaScript ES6+, Font Awesome 6.4 y Google Fonts (Poppins).

## Licencia

MIT. Ver [LICENSE.txt](LICENSE.txt).

## Repositorio de entrega

El informe APA individual está en [docs/Taller_LineaBase_SIGR.pdf](docs/Taller_LineaBase_SIGR.pdf). Repositorio de entrega: https://github.com/luisjaviersalgado/restaurante-evidencia.git.

La línea base documentada es el tag v1.0.0-baseline sobre el commit cdf2e5a8726d41cad6b3cb4be002b29dcbae162a. El commit de este documento es posterior y no modifica ese tag.


### Evidencia de pruebas
La ejecución de Playwright reportada el 11/11/2026 mostró 11 de 11 casos en `OK`. El registro transcrito y sus limitaciones están en [docs/evidencias/resultado-integracion-2026-11-11.md](docs/evidencias/resultado-integracion-2026-11-11.md). No se confirmó un archivo `salida.json` en esa ejecución.
