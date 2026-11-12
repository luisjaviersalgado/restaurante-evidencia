# Registro de ejecución de pruebas de integración

**Proyecto:** Sistema Integral de Gestión de Restaurante (SIGR)  
**Fecha reportada:** 11 de noviembre de 2026  
**Ejecutó:** Luis Javier Salgado Guzmán  
**Entorno reportado:** Windows PowerShell 5.1, Node.js v26.13.1, Playwright con Chromium 158.0.8127.18  
**Resultado global:** 11 de 11 pruebas reportadas como `OK` en la consola compartida.

## Resultados reportados

| ID | Verificación | Resultado de consola compartido |
|---|---|---|
| PB-01 | Carga inicial sin errores de JavaScript | OK; 0 errores |
| PB-02 | Listado del menú en Pedidos | OK; 16 platillos |
| PB-03 | Agregar al carrito y calcular total | OK; total $330.00 |
| PB-04 | Confirmar pedido y actualizar estadísticas | OK; pendientes 1 → 2; 16 pedidos guardados |
| PB-05 | Listar y crear reserva | OK; 2 filas del día; 16 reservas guardadas |
| PB-06 | Crear platillo desde Menú | OK; 17 tarjetas |
| PB-07 | Listar y crear usuario | OK; 5 → 6 usuarios |
| PB-08 | Paginación y búsqueda de clientes | OK; 10 filas; 1 resultado filtrado |
| PB-09 | Crear factura y calcular IVA | OK; 13 → 14 facturas; IVA $32.00; total $232.00 |
| PB-10 | Generar reporte de ventas | OK; reporte generado |
| PB-11 | Recargar y comprobar persistencia del pedido | OK; 16 pedidos guardados |

## Alcance de esta evidencia

Este registro transcribe el texto de consola compartido por el estudiante. Durante esa ejecución, el comando de instalación de Playwright se concatenó inicialmente con argumentos de Node y produjo un error de destinos no válidos; posteriormente Chromium se instaló y se compartió la salida con los 11 casos en `OK`. La invocación de Node aparece repetida/concatenada en el texto y no se confirmó la creación ni el contenido de `salida.json`. Por ello, este archivo no se presenta como un JSON generado por el script ni como una captura original. Si la plataforma exige el archivo automático, ejecutar la prueba en una línea separada y comprobar `Test-Path .\salida.json`.

Comando limpio para repetir desde la carpeta del proyecto:

```powershell
node .\tests\integracion.js "file:///C:/Users/luisj/OneDrive/Desktop/restaurante-evidencia-AA2/index.html" .\salida.json
```

Después, en una nueva línea:

```powershell
Test-Path .\salida.json
Get-Content .\salida.json
```
