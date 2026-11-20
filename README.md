# myfeed

Aplicación web de red social y comunidad enfocada en publicaciones organizadas por **topics** (temáticas de interés), con un feed cronológico limpio y sin ruido algorítmico.

> [!NOTE]
> **Proyecto optimizado y modernizado con IA Antigravity:** El diseño visual, la arquitectura frontend y la experiencia de usuario de este proyecto fueron mejorados, refactorizados y actualizados con la asistencia de la IA agéntica **Antigravity** (Google DeepMind).

---

## 📌 Tabla de contenidos

- [Características principales](#-características-principales)
- [Stack tecnológico](#-stack-tecnológico)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Rutas disponibles](#️-rutas-disponibles)
- [Requisitos previos](#requisitos-previos)
- [Instalación y ejecución local](#-instalación-y-ejecución-local)
- [Scripts disponibles](#-scripts-disponibles)
- [Modernización con IA Antigravity](#-modernización-con-ia-antigravity)

---

## 🚀 Características principales

- **Feed principal y exploración por topics:** Visualización de publicaciones en cuadrícula responsiva, barra horizontal deslizable de temáticas (*TopicBar*) y panel lateral desplegable (*Topics Drawer*) con 28 comunidades.
- **Hero y descubrimiento de creadores:** Banner principal con acceso rápido a creación de publicaciones y explorador de creadores populares y visitados recientemente.
- **Vista de detalle de publicación (`/p/[id]`):** Visualización completa del post, imagen destacada y sección de discusión con comentarios y respuestas anidadas.
- **Perfiles de usuario (`/u/[id]`):** Encabezado de perfil con avatar (imagen o inicial con color personalizado), fecha de registro, métricas de publicaciones y likes, y listado de posts publicados.
- **Formularios con validación:**
  - Modal de inicio de sesión y registro (`FormLogin`, `FormRegister`).
  - Creación y edición de publicaciones con carga de imágenes mediante *drag & drop* (`UserForm`, `EditPostForm`, `Dropzone`).
  - Edición de perfil y publicación/edición de comentarios y respuestas (`FormComment`).
- **Modo oscuro y modo claro:** Cambio dinámico de tema mediante `next-themes` y variables SCSS.
- **Diseño responsivo:** Adaptado a dispositivos móviles, tablets y escritorio.

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
│   │   │   └── u/[id]/        # Perfil de usuario
│   │   ├── (user-pages)/
│   │   │   ├── create/        # Crear publicación
│   │   │   ├── edit-post/[id]/# Editar publicación
│   │   │   └── edit-profile/  # Editar perfil
│   │   ├── layout.tsx         # Layout raíz y metadatos
│   │   ├── not-found.tsx      # Página 404
│   │   ├── page.tsx           # Feed principal
│   │   └── providers.tsx      # ThemeProvider y estado global (GlobalContext)
│   ├── components/
│   │   ├── forms/             # Formularios (login, registro, comentarios, posts, perfil)
│   │   ├── layouts/           # Header, GridLayout, AsideLeft, AsideRight, ImgHero, TopicBar
│   │   ├── posts/             # Post, PostOptions, CommentsContainer, Comment, Reply
│   │   └── ui/                # AvatarImg, NotFound, Skeleton, Spinner, UserOptions
│   ├── fakeData/              # Usuarios y publicaciones de demostración
│   ├── pageComponents/        # Vistas cliente principales (Main, Post, User)
│   ├── styles/                # Arquitectura SCSS modular (globals, components, pages)
│   ├── types/                 # Definiciones de tipos TypeScript
│   └── utilities/             # Helpers (formato de fechas, likes, colores de tema, topics)
├── next.config.mjs
├── package.json
└── tsconfig.json
```

---

## 🗺️ Rutas disponibles

| Ruta | Descripción |
| --- | --- |
| `/` | Feed principal con hero, barra de topics y listado de publicaciones. |
| `/p/[id]` | Vista detallada de una publicación y su hilo de comentarios y respuestas. |
| `/u/[id]` | Perfil público de un usuario y sus publicaciones. |
| `/create` | Formulario para crear una nueva publicación. |
| `/edit-post/[id]` | Formulario para editar una publicación existente. |
| `/edit-profile` | Formulario para editar nombre de usuario y foto de perfil. |

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

---

## 🤖 Modernización con IA Antigravity

Este proyecto fue renovado, limpiado y modernizado con la asistencia de **Antigravity (IA)** para consolidar una base frontend moderna, ligera y lista para integrarse con un futuro backend. Los principales cambios aplicados fueron:

- **Renovación de interfaz y experiencia de usuario (UI/UX):**
  - Rediseño integral de la identidad visual (**myfeed**), paleta de colores, variables SCSS (`_color-vars.scss`, `themeColors.ts`) e íconos de aplicación, con soporte refinado para modo oscuro y modo claro.
  - Creación de la barra horizontal deslizable de temáticas (`TopicBar` y `_topic-bar.scss`) con soporte de arrastre y botones de desplazamiento.
  - Rediseño del **Header**, el **Hero** tipo *bento* (`ImgHero`) con pestañas de creadores populares/recientes, el panel lateral de temáticas (`AsideLeft`), las tarjetas de publicaciones (`Post`), la vista de detalle (`/p/[id]`), los perfiles (`/u/[id]`) y los formularios.
  - Ampliación de los datos locales de demostración en `src/fakeData/index.ts` con múltiples usuarios, publicaciones, comentarios y respuestas anidadas.
- **Eliminación completa de Firebase y código de backend:**
  - Se eliminaron `src/firebase/` (`config.ts`, `firebase.ts`, `utils.ts`) y `src/hooks/useAuthUser.ts`.
  - Se desinstaló el paquete `firebase` de `package.json` y `package-lock.json` (82 paquetes removidos) y se quitó `firebasestorage.googleapis.com` de `next.config.mjs`.
  - Se extrajo la utilidad pura `handleLikes` a `src/utilities/handleLikes.ts`.
- **Refactorización de tipos y arquitectura frontend:**
  - Se reemplazaron los tipos acoplados a Firebase (`User`, `DocumentData`) por tipos propios del proyecto (`UserDbType`, `PostTypes`, `CommentTypes`, `ReplyTypes`, `AllPostsType`) en `src/types/index.ts` y `src/types/components-props.ts`.
  - Se simplificó `src/app/providers.tsx` para operar directamente con los datos locales y se limpiaron todas las llamadas a base de datos en páginas, formularios, publicaciones, layouts y componentes UI, conservando la interactividad local.
  - Se actualizaron los parámetros de rutas dinámicas (`params` como `Promise`) para compatibilidad total con Next.js 16.
---