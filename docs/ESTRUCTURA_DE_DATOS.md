# Estructura de datos

El sistema no usa una base de datos relacional: guarda los datos en el `localStorage` del navegador como arreglos JSON. Si una clave no existe, se cargan los datos de ejemplo definidos en `js/script.js`.

| Clave | Entidad | Campos | Registros de ejemplo |
|---|---|---|---|
| `menuData` | Platillo | `id`, `name`, `description`, `price`, `category` (entradas, platos-fuertes, bebidas, postres), `image`, `available` | 16 |
| `usuarios` | Usuario | `id`, `nombre`, `apellido`, `email`, `telefono`, `rol` (admin, mesero, cocinero) | 5 |
| `clientes` | Cliente | `id`, `nombre`, `apellido`, `email`, `telefono`, `direccion`, `estado` (activo, inactivo), `totalPedidos`, `gastoTotal` | 25 |
| `pedidos` | Pedido | `id`, `cliente`, `tipo` (mesa, domicilio), `mesa`, `items[]` (`id`, `name`, `price`, `quantity`), `total`, `estado` (pendiente, completado), `fecha` | 15 |
| `reservas` | Reserva | `id`, `cliente`, `telefono`, `fecha`, `hora`, `personas`, `mesa`, `notas`, `estado` (pendiente, confirmada, completada, cancelada) | 15 |
| `facturas` | Factura | `id`, `cliente`, `tipo` (contado, crédito), `fecha`, `vencimiento`, `items[]` (`descripcion`, `cantidad`, `precio`), `subtotal`, `iva`, `total`, `estado` (pendiente, pagada) | 13 |
| `cart` | Carrito | Arreglo de `items` de pedido (`id`, `name`, `price`, `quantity`) | 0 |

## Reglas de negocio presentes en el código

- El IVA de las facturas es el 16 % del subtotal.
- Un pedido solo se confirma con al menos un platillo y con el nombre del cliente; los pedidos para mesa guardan el número de mesa.
- Los pedidos nuevos se guardan con estado `pendiente`; las reservas nuevas, con estado `pendiente`.
- Las mesas disponibles son cinco, con capacidad de 2, 4, 4, 6 y 8 personas.

## Observación

Los identificadores de pedidos, reservas y facturas nuevos se generan con `Date.now()`.
