# 🎉 Meeti

Aplicación web inspirada en plataformas de eventos y comunidades, donde los usuarios pueden crear grupos, organizar meeti’s, administrar asistentes, comentar reuniones y visualizar ubicaciones mediante mapas interactivos.

La plataforma incluye autenticación de usuarios, panel administrativo, búsqueda avanzada, geolocalización con mapas y gestión completa de reuniones y grupos.

---

# 🚀 Tecnologías utilizadas

- **Node.js** + **Express**
- **PostgreSQL** + **Sequelize**
- **EJS** (motor de plantillas)
- **Tailwind CSS**
- **Webpack** + **Babel**
- **Leaflet.js** (mapas interactivos)
- **Leaflet Geocoder** (reverse geocoding)
- **Axios**
- **SweetAlert2**
- **Moment.js**
- **Slug**
- **Shortid**
- **Express Validator**
- **JWT / Sesiones**
- **dotenv**

---

# ⚙️ Funcionalidades principales

- Registro e inicio de sesión de usuarios
- Gestión completa de grupos:
  - Crear grupos
  - Editar grupos
  - Eliminar grupos
- Gestión completa de meeti’s:
  - Crear meeti’s
  - Editar meeti’s
  - Eliminar meeti’s
- Dashboard dinámico con meeti’s:
  - Próximos
  - Anteriores
- Geolocalización avanzada con:
  - Leaflet
  - Reverse Geocoding
  - Marcadores dinámicos
  - Captura automática de LAT/LNG
- Visualización de meeti’s cercanos mediante consultas espaciales con **PostGIS**
- Confirmación y cancelación de asistencia en tiempo real
- Listado dinámico de asistentes
- Sistema de comentarios:
  - Crear comentarios
  - Eliminar comentarios
  - Validación de permisos
- Perfil de usuario:
  - Editar perfil
  - Cambiar contraseña
  - Actualizar imagen de perfil
- Búsqueda avanzada por:
  - Ciudad
  - País
  - Categoría
  - Título del meeti
- Categorías dinámicas
- Navbar dinámico según autenticación
- Sistema de middlewares globales
- Validación UUID para rutas protegidas
- Optimización de carga de scripts con `enableBundle`
- Cards dinámicas reutilizables con partials
- Confirmaciones visuales con SweetAlert2
- Formularios persistentes con validaciones

---

# 🧪 Usuarios de prueba

Puedes iniciar sesión con los siguientes usuarios de prueba:

- 📧 **prueba@gmail.com**  
  🔑 **Prueba123**

- 📧 **admin@gmail.com**  
  🔑 **Prueba123**

> *Credenciales únicamente para pruebas locales.*

---

# 📦 Instalación local

## 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/meeti.git
cd meeti
```
## 2️⃣ Instalar dependencias
```bash
npm install
```
## 3️⃣ Crear archivo .env

DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=meeti
DB_PORT=5432

JWT_SECRET=tu_secreto

EMAIL_HOST=smtp.tucorreo.com
EMAIL_PORT=587
EMAIL_USER=correo@tucorreo.com
EMAIL_PASS=tu_password

## 4️⃣ Ejecutar migraciones y seeders
```bash
npm run seed
```

## 5️⃣ Ejecutar Webpack
```bash
npm run dev
```

## 6️⃣ Iniciar servidor
```bash
npm start
```

## 7️⃣ Abrir aplicación
http://localhost:3000

---

🗺️ Funcionalidad de mapas

La aplicación utiliza:

- Leaflet.js para renderizar mapas interactivos
- Leaflet Geocoder para búsqueda de direcciones
- Reverse Geocoding para obtener información desde coordenadas
- PostGIS para almacenar ubicaciones tipo GEOMETRY

Características:

- Selección dinámica de ubicación
- Marker draggable
- Actualización automática de LAT/LNG
- Obtención automática de:
- País
- Ciudad
- Barrio
- Dirección

---
🔐 Autenticación

La aplicación cuenta con:

- Registro de usuarios
- Inicio de sesión
- Recuperación de contraseña
- Cambio de contraseña
- Middleware global de usuario autenticado
- Protección de rutas privadas
- Validación de ownership:
- Comentarios
- Meeti’s
- Grupos

---

🔍 Sistema de búsqueda

Los usuarios pueden buscar meeti’s mediante:

- Ciudad
- País
- Categoría
- Título

La búsqueda retorna resultados dinámicos ordenados por fecha del evento.

---
📌 Funcionalidades destacadas
🧭 Meeti’s cercanos

Se implementan consultas espaciales con PostgreSQL + PostGIS para mostrar los meeti’s más cercanos según la ubicación actual del evento.

--- 
💬 Comentarios dinámicos
- Crear comentarios
- Eliminación en tiempo real
- Eliminación desde DOM
- Validación de permisos
- Confirmación visual con SweetAlert2

---

👥 Sistema de asistencia
- Confirmar asistencia
- Cancelar asistencia
- Validación de usuarios duplicados
- Actualización dinámica del botón
- Listado de asistentes

---
🔌 Endpoints principales
🔐 Autenticación (/auth)
---
| Método | Ruta                  | Descripción              |
| ------ | --------------------- | ------------------------ |
| GET    | /auth/login           | Vista login              |
| POST   | /auth/login           | Procesar login           |
| GET    | /auth/register        | Vista registro           |
| POST   | /auth/register        | Registrar usuario        |
| GET    | /auth/logout          | Cerrar sesión            |
| GET    | /auth/change-password | Vista cambiar contraseña |
| POST   | /auth/change-password | Actualizar contraseña    |


👤 Perfil (/profile)

| Método | Ruta                  | Descripción            |
| ------ | --------------------- | ---------------------- |
| GET    | /profile/edit-profile | Vista editar perfil    |
| POST   | /profile/edit-profile | Guardar cambios perfil |
| GET    | /profile/edit-image   | Vista editar imagen    |
| POST   | /profile/edit-image   | Actualizar imagen      |

👥 Grupos (/groups)

| Método | Ruta               | Descripción      |
| ------ | ------------------ | ---------------- |
| GET    | /groups/new-group  | Crear grupo      |
| POST   | /groups/new-group  | Guardar grupo    |
| GET    | /groups/edit/:id   | Editar grupo     |
| POST   | /groups/edit/:id   | Actualizar grupo |
| POST   | /groups/delete/:id | Eliminar grupo   |
| GET    | /groups/:slug      | Ver grupo        |


📅 Meeti’s (/meetis)

| Método | Ruta                | Descripción                   |
| ------ | ------------------- | ----------------------------- |
| GET    | /meetis/new-meeti   | Crear meeti                   |
| POST   | /meetis/new-meeti   | Guardar meeti                 |
| GET    | /meetis/edit/:id    | Editar meeti                  |
| POST   | /meetis/edit/:id    | Actualizar meeti              |
| POST   | /meetis/delete/:id  | Eliminar meeti                |
| GET    | /meeti/:slug        | Ver meeti                     |
| POST   | /meeti/:id/comment  | Crear comentario              |
| POST   | /comment/delete/:id | Eliminar comentario           |
| POST   | /attendance/:id     | Confirmar/cancelar asistencia |
| GET    | /attendees/:id      | Ver asistentes                |

🔎 Búsqueda (/search)

| Método | Ruta    | Descripción    |
| ------ | ------- | -------------- |
| GET    | /search | Vista búsqueda |
| POST   | /search | Buscar meeti’s |

🏷️ Categorías (/categories)

| Método | Ruta            | Descripción           |
| ------ | --------------- | --------------------- |
| GET    | /categories     | Listado categorías    |
| POST   | /categories     | Crear categoría       |
| GET    | /category/:slug | Meeti’s por categoría |

---
👤 Autor
Desarrollado por Miguel.

---
🖼️ Capturas de pantalla
Página principal

Dashboard

Vista individual del meeti

Sistema de mapas
