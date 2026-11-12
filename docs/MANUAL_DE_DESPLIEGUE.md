# Manual de despliegue

La aplicación es estática: no requiere compilación, servidor de aplicaciones ni base de datos.

## Requisitos

- Navegador moderno (Chrome, Firefox, Edge o Safari).
- Conexión a internet para las fuentes (Google Fonts), los íconos (Font Awesome) y las imágenes de los platillos; sin conexión la aplicación funciona, pero sin esos recursos.

## Opción 1: abrir el archivo

1. Clonar el repositorio: `git clone <URL-del-repositorio>`.
2. Abrir `index.html` con el navegador.

## Opción 2: servidor local

1. Entrar a la carpeta del proyecto.
2. Ejecutar `python -m http.server 8080`.
3. Abrir `http://localhost:8080`.

## Opción 3: GitHub Pages

1. En el repositorio, ir a *Settings → Pages*.
2. Elegir la rama `main` y la carpeta raíz.
3. Abrir la dirección que indica GitHub Pages.

## Verificación posterior al despliegue

1. La consola del navegador no muestra errores al cargar.
2. El módulo Pedidos muestra 16 platillos.
3. El módulo Clientes muestra 10 filas y 3 páginas.
4. El módulo Facturación muestra 13 facturas.
