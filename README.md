# myfeed

Aplicación web de red social y comunidad enfocada en publicaciones organizadas por **topics** (temáticas de interés), con un feed cronológico limpio y sin ruido algorítmico.

> [!NOTE]
> **Proyecto optimizado y modernizado con IA Antigravity:** El diseño visual, la arquitectura frontend, la calidad de código y la experiencia de usuario de este proyecto fueron mejorados, refactorizados y actualizados con la asistencia de la IA agéntica **Antigravity** (Google DeepMind).

---

## 📌 Tabla de contenidos

- [Enlaces Rápidos](#-enlaces-rápidos)
- [Notas Previas](#-notas-previas)
- [Características principales](#-características-principales)
- [Stack tecnológico](#-stack-tecnológico)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Rutas disponibles](#️-rutas-disponibles)
- [Requisitos previos](#requisitos-previos)
- [Instalación y ejecución local](#-instalación-y-ejecución-local)
- [Scripts disponibles](#-scripts-disponibles)
- [Pruebas (Testing)](#-pruebas-testing)
- [Modernización y refactorización](#-modernización-y-refactorización)

---

## 🔗 Enlaces Rápidos

- **Demo en producción:** [myfeed | Your interests, zero noise](https://group-4-rho.vercel.app/)

---

## 🧭 Notas Previas

- **Frontend desacoplado listo para futuro backend:** Este proyecto se integraba originalmente con Firebase. Actualmente opera con datos locales de demostración (`src/fakeData`) para poder ejecutarse y evaluarse sin dependencias externas, manteniendo intactos todos los formularios y vistas privadas (`/create`, `/edit-post/[id]`, `/edit-profile`) preparados para conectarse a una futura API propia.
- **Autenticación y rutas privadas:** Por diseño, esta versión no simula una sesión falsa en el cliente. Las rutas privadas redirigen automáticamente a `/` cuando no existe un usuario autenticado, mientras que las interacciones locales (likes, comentarios y respuestas) permanecen cubiertas y verificadas mediante la suite de pruebas.
- **Páginas de comunidad por topic (`/topic/[slug]`):** Las 28 temáticas de la barra horizontal (*TopicBar*) y del panel lateral (*Topics Drawer*) cuentan con su propia ruta dinámica preparada para filtrar publicaciones por `topic`, mostrando un estado vacío dedicado cuando aún no existen posts asociados y una vista `NotFound` para slugs inexistentes.

---

## 🚀 Características principales

- **Feed principal y exploración por topics:** Visualización de publicaciones en cuadrícula responsiva, barra horizontal deslizable de temáticas (*TopicBar*), panel lateral desplegable (*Topics Drawer*) y páginas dedicadas para las 28 comunidades (`/topic/[slug]`) con estado vacío y manejo de rutas inválidas.
- **Hero y descubrimiento de creadores:** Banner principal con acceso rápido a creación de publicaciones y explorador de creadores populares y visitados recientemente.
- **Vista de detalle de publicación (`/p/[id]`):** Visualización completa del post, imagen destacada, acción de compartir enlace al portapapeles y sección de discusión con comentarios y respuestas anidadas.
- **Perfiles de usuario (`/u/[id]`):** Encabezado de perfil con avatar (imagen o inicial con color personalizado), fecha de registro, métricas de publicaciones y likes, y listado de posts publicados.
- **Formularios con validación:**
  - Modal de inicio de sesión y registro (`FormSession`, `FormLogin`, `FormRegister`).
  - Creación y edición de publicaciones con campos reutilizables (`PostFields`) y carga de imágenes mediante *drag & drop* con límite de 10 MB (`UserForm`, `EditPostForm`, `Dropzone`).
  - Edición de perfil y publicación/edición controlada de comentarios y respuestas (`FormComment`).
- **Modo oscuro y modo claro:** Cambio dinámico de tema mediante `next-themes` y variables SCSS.
- **Accesibilidad y diseño responsivo:** Controles semánticos con atributos ARIA, IDs únicos por menú (`useId`) y adaptación completa a móvil, tablet y escritorio.

---

## 🛠 Stack tecnológico

| Categoría | Tecnología |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Librería UI | [React 19](https://react.dev/) |
| Lenguaje | [TypeScript 5](https://www.typescriptlang.org/) |
| Estilos | [Sass (SCSS)](https://sass-lang.com/) |
| Componentes e íconos | [Material UI (MUI) 7](https://mui.com/) & `@mui/icons-material` |
| Temas | [next-themes](https://github.com/pacocoursey/next-themes) |
| Formularios | [React Hook Form](https://react-hook-form.com/) |
| Carga de archivos | [React Dropzone](https://react-dropzone.js.org/) |
| Utilidades | `date-fns`, `uuid` |
| Linting | [ESLint 9](https://eslint.org/) + `eslint-config-next` (flat config) |
| Testing | [Vitest 5](https://vitest.dev/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/), `@testing-library/jest-dom`, `@testing-library/user-event`, `jsdom`, `@vitejs/plugin-react` |

---

## 📂 Estructura del proyecto

```text
.
├── public/
│   ├── icons/                 # Favicons e íconos de aplicación
│   └── images/                # Imágenes estáticas (hero, posts y avatares)
├── src/
│   ├── app/                   # Rutas de Next.js (App Router) y GlobalContext
│   │   ├── (global-pages)/
│   │   │   ├── p/[id]/        # Detalle de publicación
│   │   │   ├── topic/[slug]/  # Vista de comunidad por topic
│   │   │   └── u/[id]/        # Perfil de usuario
│   │   ├── (user-pages)/
│   │   │   ├── create/        # Crear publicación
│   │   │   ├── edit-post/[id]/# Editar publicación
│   │   │   └── edit-profile/  # Editar perfil
│   │   ├── layout.tsx         # Layout raíz y metadatos (title template)
│   │   ├── not-found.tsx      # Página 404
│   │   ├── page.tsx           # Feed principal
│   │   └── providers.tsx      # ThemeProvider y estado global (GlobalContext)
│   ├── components/
│   │   ├── forms/             # Dropzone, FormSession, FormLogin, FormRegister, FormComment, UserForm, EditPostForm, PostFields
│   │   ├── layouts/           # Header, GridLayout, AsideLeft, ImgHero, TopicBar
│   │   ├── posts/             # Post, PostOptions, CommentsContainer, Comment, CommentOptions, Reply
│   │   └── ui/                # AvatarImg, NotFound, Skeleton, SkeletonUser, Spinner, StyledMenu, UserOptions
│   ├── fakeData/              # Usuarios y publicaciones de demostración
│   ├── pageComponents/        # Vistas cliente principales (Main, Post, Topic, User)
│   ├── styles/                # Arquitectura SCSS modular (globals, components, pages)
│   ├── types/                 # Definiciones de tipos TypeScript
│   └── utilities/             # Helpers (asideLeftItems, formatDate, handleLikes, postMutations, themeColors, useIsMounted)
├── test/                      # Pruebas unitarias y de integración (espejo de src/)
│   ├── setup.ts               # Configuración global de jsdom y mocks de Next.js
│   ├── utils/                 # Helpers de renderizado con GlobalContext
│   ├── unit/                  # Pruebas unitarias (components/* y utilities/)
│   └── integration/           # Pruebas de integración (app/providers y pageComponents/)
├── eslint.config.mjs
├── next.config.mjs
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

---

## 🗺️ Rutas disponibles

| Ruta | Descripción |
| --- | --- |
| `/` | Feed principal con hero, barra de topics y listado de publicaciones. |
| `/topic/[slug]` | Vista de una comunidad temática con posts filtrados, estado vacío elegante o 404 si el topic no existe. |
| `/p/[id]` | Vista detallada de una publicación y su hilo de comentarios y respuestas. |
| `/u/[id]` | Perfil público de un usuario y sus publicaciones. |
| `/create` | Formulario para crear una nueva publicación (requiere sesión). |
| `/edit-post/[id]` | Formulario para editar una publicación propia (requiere sesión y autoría). |
| `/edit-profile` | Formulario para editar nombre de usuario y foto de perfil (requiere sesión). |

---

## Requisitos previos

- **Node.js** `26.x`
- **npm** `>= 9`

---

## 💻 Instalación y ejecución local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/RubDev476/Group-4.git
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

---

## 📜 Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo de Next.js. |
| `npm run build` | Genera la compilación optimizada para producción. |
| `npm run start` | Ejecuta la aplicación compilada en modo producción. |
| `npm run lint` | Ejecuta ESLint 9 con las reglas de Next.js 16 y TypeScript. |
| `npm run typecheck` | Verifica los tipos de todo el proyecto con `tsc --noEmit`. |
| `npm test` | Ejecuta toda la suite de pruebas unitarias y de integración con Vitest. |
| `npm run test:watch` | Ejecuta Vitest en modo interactivo (*watch*) al guardar cambios. |

---

## 🧪 Pruebas (Testing)

El proyecto cuenta con una suite de **62 pruebas automatizadas** repartidas en **7 archivos**, implementadas con **Vitest** y **React Testing Library** bajo entorno `jsdom`, siguiendo la misma jerarquía de carpetas que `src/`:

### Dependencias de testing

- `vitest` y `@vitejs/plugin-react` — corredor de pruebas y soporte JSX/TSX.
- `@testing-library/react` — renderizado y consultas accesibles de componentes React.
- `@testing-library/jest-dom` — *matchers* semánticos para el DOM (`toBeInTheDocument`, `toHaveAttribute`, etc.).
- `@testing-library/user-event` — simulación realista de interacciones de usuario (clics, escritura, envío de formularios).
- `jsdom` — entorno DOM simulado en Node.js.

### Cobertura de la suite

- **Pruebas unitarias (`test/unit/`):**
  - `utilities/utilities.test.ts`: `handleLikes`, `formatDate`, `themeColors`, `topicIcons` / `findTopicBySlug` y mutaciones inmutables en `postMutations`.
  - `components/ui/ui.test.tsx`: `AvatarImg`, `NotFound`, `Skeleton`, `SkeletonUser`, `Spinner` y `UserOptions`.
  - `components/layouts/layouts.test.tsx`: `Header`, `TopicBar`, `ImgHero`, `AsideLeft` y `GridLayout`.
  - `components/forms/forms.test.tsx`: `FormLogin`, `FormRegister`, `FormSession`, `FormComment`, `UserForm` (`createPost` y `editProfile`), `EditPostForm` y `Dropzone`.
  - `components/posts/posts.test.tsx`: `Post`, `PostOptions`, `Comment`, `Reply` y `CommentsContainer`.
- **Pruebas de integración (`test/integration/`):**
  - `app/providers.test.tsx`: inicialización de `GlobalContext` con los datos locales y estados de carga.
  - `pageComponents/pages.test.tsx`: feed principal (`Main`), flujo completo de detalle de publicación (`Post` con likes y comentarios en tiempo real + 404), vista de perfil (`User` con métricas, publicaciones, estado vacío y 404) y páginas de topics (`Topic` con estado vacío y 404).

### Ejecutar verificaciones

```bash
# Linter, tipos y pruebas
npm run lint
npm run typecheck
npm test
```

---

## 🤖 Modernización y refactorización

Este proyecto fue renovado, auditado y refactorizado con la asistencia de **Antigravity (IA)** siguiendo principios **SOLID, DRY y KISS** y las mejores prácticas de **Next.js 16 + React 19**:

- **Renovación UI/UX y rutas completas:**
  - Rediseño visual (**myfeed**), barra horizontal deslizable (`TopicBar`), hero tipo *bento* (`ImgHero`), panel lateral de comunidades (`AsideLeft`) y rutas dedicadas `/topic/[slug]` con estado vacío elegante.
  - Eliminación completa de Firebase y migración a tipos propios (`UserDbType`, `PostTypes`, `CommentTypes`, `ReplyTypes`, `AllPostsType`).
- **Calidad de código, TypeScript estricto y ESLint 9:**
  - Eliminado `typescript.ignoreBuildErrors` en `next.config.mjs`, eliminados componentes muertos (`AsideRight`, `AccordionPopulars`), `console.log`, código comentado y tipos `any`.
  - Configurado `eslint.config.mjs` (flat config nativo de Next.js 16) pasando con **0 errores y 0 warnings**, adoptando patrones idiomáticos de React 19 (`useSyncExternalStore` en `useIsMounted`, `useWatch` en `FormRegister`, estado derivado sin efectos en cascada).
- **Arquitectura modular y accesibilidad:**
  - Extraídos `StyledMenu` (menú MUI compartido), `PostFields` (campos de post reutilizables) y `postMutations.ts` (mutaciones puras e inmutables sin `JSON.parse(JSON.stringify(...))`).
  - Optimización de `next/image` (`sizes`, lazy loading en feed, eliminación de doble descarga en detalle), `title.template` en metadatos, botones semánticos con atributos ARIA e IDs únicos (`useId`).
- **Testing automatizado:**
  - Suite de **62 pruebas unitarias y de integración** en 7 archivos verificando componentes, utilidades y flujos completos.
