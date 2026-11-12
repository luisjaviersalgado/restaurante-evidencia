# Problemas conocidos de la línea base v1.0.0-baseline

Hallazgos que no impiden usar los módulos y que se tratarán como solicitudes de cambio posteriores.

| ID | Descripción | Tipo de cambio | Prioridad |
|---|---|---|---|
| PC-01 | No existe módulo de autenticación: la gestión de usuarios y roles no incluye inicio de sesión ni control de acceso. | Evolutivo | Alta |
| PC-02 | No existe cierre de caja. La facturación y los reportes cubren la parte contable disponible. | Evolutivo | Media |
| PC-03 | Los reportes muestran datos fijos de ejemplo y no se calculan con los pedidos y facturas guardados. | Correctivo | Alta |
| PC-04 | En `categoryLabels` hay una clave con error de digitación (`entrdas`). No afecta el funcionamiento. | Correctivo | Baja |
| PC-05 | La asignación automática de mesa en reservas es aleatoria y no verifica disponibilidad. | Perfectivo | Media |
| PC-06 | Los datos se guardan solo en el navegador (`localStorage`), sin respaldo ni usuarios concurrentes. | Estratégico | Media |
| PC-07 | Las imágenes de los platillos y las fuentes dependen de servicios externos. | Adaptativo | Baja |
| PC-08 | Los campos de texto se insertan en el HTML sin sanitizar (riesgo de inyección de código). | Correctivo | Alta |
