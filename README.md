# Maqueta PSP

Este proyecto es una maqueta de gestión para PSP (Proveedor de Servicios de Pago), desarrollado con React y Node.js + SQLite.

## Características principales
- **Dashboard**: Tablero con métricas en tiempo real para el rol banco.
- **Gestión de recaudadoras**: Alta, modificación y baja de recaudadoras.
- **Gestión de cuentas CBU**: Alta, modificación y baja, asociadas obligatoriamente a una recaudadora.
- **Persistencia**: Backend Express con base de datos SQLite.
- **Modo claro**: Colores principales rojo y blanco.
- **Login y selección de rol**: Acceso por rol (banco/recaudadora).
- **Sidebar**: Navegación lateral con opción de logout.

## Instalación
1. Clona el repositorio:
   ```sh
   git clone https://github.com/jcardenasValo/PSP-Mockup.git
   ```
2. Instala dependencias frontend:
   ```sh
   npm install
   ```
3. Instala dependencias backend:
   ```sh
   cd backend
   npm install
   ```

## Ejecución
- Inicia el backend:
  ```sh
  cd backend
  npm start
  ```
- Inicia el frontend:
  ```sh
  npm start
  ```

## Uso
- Ingresa como banco para ver el dashboard y gestionar recaudadoras/cuentas CBU.
- Ingresa como recaudadora para gestionar clientes, cajas, cuentas CVU, deudas, movimientos y roles.

## Detalles técnicos
- React + Material UI
- Node.js + Express
- SQLite para persistencia local
- API REST para todas las entidades principales

## Autor
José Luis Cárdenas

---
