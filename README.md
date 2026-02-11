# ✨ JobFinder — Plataforma de Empleo Tech con IA

<div align="center">

![JobFinder Banner](./docs/screenshots/home.png)

**Encuentra tu próximo trabajo en tecnología.**

Plataforma de búsqueda de empleo tech en España con análisis inteligente de CV, geolocalización y filtros avanzados.

[🚀 Ver Demo](https://jobfinder-app-ai.vercel.app/) · [📦 Backend API](https://jobfinder-backend-production.up.railway.app/) · [👩‍💻 Autora](https://github.com/BenitaPlata)

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?logo=openai&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000?logo=vercel&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-Deployed-0B0D0E?logo=railway&logoColor=white)

</div>

---

## 📸 Capturas de Pantalla

<div align="center">

| Home | Detalle de Oferta |
|:---:|:---:|
| ![Home](./docs/screenshots/home.png) | ![Detalle](./docs/screenshots/job-detail.png) |

| Análisis de CV con IA | Panel de Administración |
|:---:|:---:|
| ![CV Analysis](./docs/screenshots/analyze-cv.png) | ![Admin](./docs/screenshots/admin-panel.png) |

| Búsqueda con Filtros | Versión Móvil |
|:---:|:---:|
| ![Filtros](./docs/screenshots/filters.png) | ![Mobile](./docs/screenshots/mobile.png) |

</div>

> 📌 Las capturas deben estar en `docs/screenshots/` en la raíz del repositorio.

---

## 🎯 Sobre el Proyecto

**JobFinder** es una plataforma fullstack que conecta talento tech con oportunidades laborales reales en España. Se diferencia de portales tradicionales por integrar inteligencia artificial para el análisis de CVs y ofrecer una experiencia de búsqueda avanzada con geolocalización.

### Problema que resuelve

Los portales de empleo actuales no ofrecen feedback sobre tu CV ni te dicen cómo de compatible eres con una oferta antes de aplicar. JobFinder sí lo hace.

### Público objetivo

Desarrolladores junior, mid y senior que buscan oportunidades tech en España de forma eficiente.

---

## ✨ Funcionalidades

### 🔐 Autenticación y Roles
- Registro e inicio de sesión con **JWT**
- Contraseñas hasheadas con **bcryptjs**
- Dos roles: `USER` y `ADMIN`
- Rutas protegidas en frontend y backend
- Perfil personalizable con CV integrado

### 💼 Ofertas de Empleo
- **273+ ofertas tecnológicas reales** actualizadas diariamente
- Importación automática desde API externa (Adzuna) mediante **cron job**
- Vista detallada: stack técnico, salario, ubicación, modalidad y enlace a oferta original
- Contadores de vistas y aplicaciones

### 🔍 Búsqueda Avanzada
- **Autocompletado de ciudades** con Nominatim (OpenStreetMap) — cualquier población de España
- Filtros combinables: ciudad, modalidad (remoto/híbrido/presencial), tipo de contrato, salario mínimo, tecnologías, tipo de empresa, nivel de inglés
- Opción "Solo ofertas con salario visible"
- **Geolocalización**: búsqueda por radio (10-500km) desde tu ubicación GPS
- Las ofertas remotas **siempre aparecen** independientemente del filtro de ciudad
- Paginación con 10 ofertas por página

### 🤖 Análisis de CV con IA (Funcionalidad Estrella)

**Análisis individual:** sube tu CV en PDF y obtén al instante:
- Puntuación ATS (0-100)
- Compatibilidad ATS (Bajo/Medio/Alto)
- Skills detectadas
- Fortalezas y debilidades
- Keywords que faltan
- Recomendaciones específicas

**Comparación CV-Oferta:** guarda tu CV en tu perfil y compáralo con cualquier oferta para obtener porcentaje de compatibilidad, skills coincidentes vs. faltantes y riesgo ATS personalizado.

### 📊 Gestión de Candidaturas
- Guardar ofertas como favoritas
- Marcar como "Inscrita" para seguimiento
- Dashboard organizado en "Mis Candidaturas"
- Eliminar candidaturas

### 🛡️ Panel de Administración
- **Dashboard** con visión general
- **Gestión de usuarios**: listado completo con eliminación protegida (no se puede borrar un ADMIN ni a sí mismo)
- **Gestión de ofertas**: listado completo con opción de eliminar ofertas de la base de datos
- Sidebar con navegación propia
- Acceso restringido por rol `ADMIN`

### 🎨 Diseño y UX
- **Dark mode profesional** con efectos neón
- **100% responsive**: móvil, tablet y desktop con menú hamburguesa
- Animaciones fluidas con **Framer Motion**
- Badges flotantes animados en el hero
- Iconografía con **Lucide React**
- Paleta coherente con **variables CSS custom**
- Fondos temáticos distintos por sección
- Página "Sobre el proyecto" orientada a recruiters

---

## 🛠️ Stack Tecnológico

### Frontend
| Tecnología | Uso |
|---|---|
| React 18.3 | Core de la aplicación |
| Vite 5.4 | Build tool y dev server |
| Chakra UI | Componentes UI |
| Framer Motion | Animaciones |
| React Router DOM 6 | Enrutado SPA |
| Axios | Peticiones HTTP |
| Lucide React | Iconos SVG |

### Backend
| Tecnología | Uso |
|---|---|
| Node.js 20+ | Runtime |
| Express 4.21 | Framework HTTP |
| MongoDB + Mongoose | Base de datos |
| JWT + bcryptjs | Autenticación |
| OpenAI SDK | Análisis de CV con IA |
| pdf-parse v2 | Extracción de texto de PDFs |
| Multer | Subida de archivos |
| node-cron | Scraping automático diario |
| express-validator | Validación de datos |

### APIs Externas
| API | Uso |
|---|---|
| OpenAI (GPT-4o-mini) | Análisis inteligente de CV |
| Nominatim (OpenStreetMap) | Geocodificación gratuita |
| Adzuna | Importación de ofertas laborales |

### Despliegue
| Servicio | Componente |
|---|---|
| Vercel | Frontend |
| Railway | Backend |
| MongoDB Atlas | Base de datos |

---

## 📐 Arquitectura

### Backend — Controllers → Repositories → Models

```
jobfinder-backend/
├── src/
│   ├── config/            # Configuración de base de datos
│   ├── controllers/       # Lógica de negocio
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── jobController.js
│   │   ├── cvController.js
│   │   └── applicationController.js
│   ├── models/            # Schemas Mongoose
│   │   ├── User.js
│   │   ├── Job.js
│   │   └── Application.js
│   ├── repositories/      # Capa de acceso a datos
│   │   └── jobRepository.js
│   ├── services/          # Servicios externos
│   │   └── cvAnalyzerService.js
│   ├── routes/            # Endpoints REST
│   ├── middlewares/       # auth, checkRole, errorHandler
│   ├── cron/              # Importación automática de ofertas
│   └── utils/             # distanceCalculator, helpers
└── index.js
```

### Frontend — Arquitectura por capas

```
jobfinder-frontend/
├── src/
│   ├── api/               # Capa HTTP (apiClient, jobs.api, users.api)
│   ├── components/
│   │   ├── common/        # Navbar, Footer, ProtectedRoute, AdminRoute
│   │   └── jobs/          # JobCard, JobFilters, LocationAutocomplete
│   ├── context/           # AuthContext
│   ├── hooks/             # useAuth, useJobs
│   ├── pages/
│   │   ├── admin/         # AdminDashboard, AdminUsers, AdminJobs, AdminLayout
│   │   ├── Jobs.jsx
│   │   ├── JobDetail.jsx
│   │   ├── Profile.jsx
│   │   ├── AnalyzeCV.jsx
│   │   ├── MyApplications.jsx
│   │   └── About.jsx
│   ├── routes/            # AppRouter con rutas protegidas y anidadas
│   └── styles/            # CSS global, variables, fondos
└── App.jsx
```

---

## 🚀 Instalación Local

### Prerrequisitos

- Node.js >= 20.x
- npm >= 10.x
- Cuenta en MongoDB Atlas
- API Key de OpenAI

### 1. Clonar repositorios

```bash
git clone https://github.com/BenitaPlata/jobfinder-backend.git
git clone https://github.com/BenitaPlata/jobfinder-frontend.git
```

### 2. Configurar variables de entorno

**Backend** — crear `.env` en la raíz de `jobfinder-backend/`:

```env
MONGODB_URI=mongodb+srv://TU_USUARIO:TU_PASSWORD@cluster.mongodb.net/jobfinder
JWT_SECRET=tu_clave_secreta
PORT=3000
OPENAI_API_KEY=sk-proj-XXXXXXXXXXXXXXXXXXXXX
ADZUNA_APP_ID=tu-app-id          # Opcional
ADZUNA_API_KEY=tu-api-key        # Opcional
```

**Frontend** — crear `.env` en la raíz de `jobfinder-frontend/`:

```env
VITE_API_URL=http://localhost:3000/api
```

Cómo obtener las keys:
- **MongoDB Atlas:** crear un cluster gratuito en [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- **OpenAI API:** registrarse en [platform.openai.com](https://platform.openai.com/signup)
- **Adzuna API:** solicitar keys en [developer.adzuna.com](https://developer.adzuna.com/)

### 3. Instalar dependencias e iniciar

```bash
# Terminal 1 — Backend
cd jobfinder-backend
npm install
npm run dev

# Terminal 2 — Frontend
cd jobfinder-frontend
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) 🎉

---

## 🔐 Seguridad

- JWT con expiración configurable
- Bcryptjs para hash de contraseñas (salt rounds: 10)
- Validación de datos con express-validator
- CORS configurado para dominios específicos (localhost + Vercel)
- Variables de entorno fuera del repositorio (`.env` en `.gitignore`)
- Rutas protegidas por middleware de autenticación y verificación de rol
- Protecciones en admin: un ADMIN no puede ser borrado ni puede borrarse a sí mismo

---

## 🐛 Problemas Resueltos Durante el Desarrollo

| Problema | Solución |
|---|---|
| `bcrypt` fallaba en Railway | Migración a **bcryptjs** (puro JS, sin dependencias nativas) |
| `pdf-parse` v1 incompatible con Railway | Actualización a **pdf-parse v2** + Node 20 |
| Node 18 insuficiente para dependencias | Upgrade a **Node 20.x** |
| Prompt vacío en llamadas a OpenAI | Prompt completo estructurado con instrucciones detalladas |
| Frontend no recibía análisis de CV | Corrección: acceder a `data.analysis` en lugar de `data` |
| Ciudad hardcodeada en filtros | Autocompletado dinámico con **Nominatim API** |
| Ofertas remotas desaparecían al filtrar por ciudad | Lógica condicional con `$or` en MongoDB |
| Botón "Cerrar sesión" invisible en dark mode | Estilos hex directos en Chakra UI en lugar de variables CSS |
| Hero duplicado en landing | Limpieza de código: eliminado bloque duplicado |
| Ruta `/admin/jobs` no encontrada | Añadida ruta anidada en React Router y eliminada ruta duplicada |

---

## 🗺️ Roadmap

### ✅ V1.0 — Actual
- [x] Autenticación JWT con roles (USER/ADMIN)
- [x] 273+ ofertas actualizadas diariamente con cron job
- [x] Análisis de CV con IA (GPT-4o-mini)
- [x] Comparación CV-oferta con porcentaje de compatibilidad
- [x] Búsqueda avanzada con geolocalización y filtros combinables
- [x] Panel de administración (usuarios + ofertas)
- [x] Dark mode profesional con efectos neón
- [x] Diseño 100% responsive con menú hamburguesa
- [x] Despliegue en producción (Vercel + Railway)

### 🔮 V2.0 — Mejoras Futuras
- [ ] **Tests unitarios y de integración** con Jest y React Testing Library
- [ ] **Notificaciones por email** cuando aparezcan ofertas compatibles con tu CV
- [ ] **Panel para empresas** donde puedan publicar ofertas directamente
- [ ] **Modo claro/oscuro** con toggle para el usuario
- [ ] **Multiidioma** (ES/EN) con i18n
- [ ] **PWA** (Progressive Web App) para instalación en móvil
- [ ] **Sistema de recomendaciones** basado en historial de búsquedas y perfil del usuario
- [ ] **Integración con LinkedIn** para importar perfil profesional
- [ ] **Mejoras de rendimiento**: lazy loading de rutas, caché de búsquedas, optimización de imágenes
- [ ] **Chat en tiempo real** entre candidatos y recruiters con Socket.io

---

## 🧠 Decisiones Técnicas

**¿Por qué scraping automático en lugar de datos estáticos?** Las ofertas reales dan credibilidad al proyecto y demuestran capacidad de integración con APIs externas. El cron job automatiza el proceso sin intervención manual.

**¿Por qué OpenAI GPT-4o-mini?** Equilibrio entre calidad y coste (~$0.002 por análisis). Suficiente para análisis de texto estructurado sin necesitar un modelo más caro.

**¿Por qué dark mode?** El público objetivo son desarrolladores, que mayoritariamente prefieren interfaces oscuras. La paleta neón aporta identidad visual diferenciadora.

**¿Por qué Chakra UI?** Componentes accesibles por defecto, buen soporte para theming y responsive utilities integradas que aceleran el desarrollo.

**¿Por qué Nominatim en lugar de Google Maps?** Gratuito, sin límites restrictivos y suficiente para autocompletado de ciudades españolas.

---

## 👩‍💻 Autora

**Benita Plata** — Desarrolladora Web Fullstack Junior

| | |
|---|---|
| 🌐 Portfolio | [portfolio-benitaplata.vercel.app](https://portfolio-benitaplata.vercel.app/) |
| 💼 LinkedIn | [linkedin.com/in/benita-plata](https://www.linkedin.com/in/benita-plata/) |
| 🐙 GitHub | [@BenitaPlata](https://github.com/BenitaPlata) |
| 📧 Email | itaplata.n@gmail.com |

### Formación
- **CFGS Desarrollo de Aplicaciones Web (DAW)** — ThePower (2024-2026)
- **Máster en Desarrollo Web** — ThePower-UCAM (2024-2026)
- **Máster en IA e Innovación** — Founderz (2026-2027)

---

## 📄 Licencia

MIT License — Proyecto Académico

Desarrollado como Proyecto Final del CFGS DAW y Máster de Desarrollo Web (UCAM).

---

<div align="center">

**Hecho con 💜 en España**

*JobFinder · React + Node.js + MongoDB + OpenAI · 2026*

</div>