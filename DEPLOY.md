# 🚀 Guía de Despliegue - SwimMetrics Mobile

Esta guía te ayudará a desplegar tu aplicación en diferentes plataformas.

## 📋 Pre-requisitos

Antes de desplegar, asegúrate de:

1. ✅ Tener Node.js instalado (versión 16 o superior)
2. ✅ Haber probado la app localmente con `npm run dev`
3. ✅ Tener una cuenta en la plataforma de deploy elegida

---

## 🌐 Opción 1: GitHub Pages (GRATIS)

### Paso 1: Preparar el repositorio

```bash
# Inicializar git (si no lo has hecho)
git init
git add .
git commit -m "Initial commit"

# Crear repositorio en GitHub y conectar
git remote add origin https://github.com/TU_USUARIO/swimmetrics-mobile.git
git branch -M main
git push -u origin main
```

### Paso 2: Configurar para GitHub Pages

Edita `vite.config.js` y cambia:

```javascript
export default defineConfig({
  base: '/swimmetrics-mobile/', // ⚠️ Cambia por el nombre de tu repo
  // ... resto de la configuración
})
```

### Paso 3: Instalar gh-pages

```bash
npm install --save-dev gh-pages
```

### Paso 4: Agregar scripts en package.json

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### Paso 5: Deploy

```bash
npm run deploy
```

### Paso 6: Configurar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Settings → Pages
3. Source: `gh-pages` branch
4. Guarda y espera 1-2 minutos

Tu app estará en: `https://TU_USUARIO.github.io/swimmetrics-mobile/`

---

## ⚡ Opción 2: Vercel (GRATIS - RECOMENDADO)

### Método 1: Desde la Web (Más Fácil)

1. Ve a [vercel.com](https://vercel.com)
2. Crea una cuenta (puedes usar GitHub)
3. Click en "New Project"
4. Importa tu repositorio de GitHub
5. Vercel detectará Vite automáticamente
6. Click en "Deploy"
7. ¡Listo! Tu app estará en: `https://tu-proyecto.vercel.app`

### Método 2: Desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Para producción
vercel --prod
```

**Ventajas de Vercel:**
- ✅ HTTPS automático
- ✅ Deploy en segundos
- ✅ Preview de cada commit
- ✅ Dominio personalizado gratis

---

## 🎯 Opción 3: Netlify (GRATIS)

### Método 1: Drag & Drop (Más Rápido)

1. Compila el proyecto:
```bash
npm run build
```

2. Ve a [netlify.com](https://netlify.com)
3. Arrastra la carpeta `dist/` a Netlify Drop

### Método 2: Desde GitHub

1. Ve a [netlify.com](https://netlify.com)
2. "New site from Git"
3. Conecta con GitHub
4. Selecciona el repositorio
5. Configuración:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Deploy

**URL final:** `https://tu-proyecto.netlify.app`

---

## 🔧 Configuración Post-Deploy

### 1. Probar la PWA

Abre tu app desplegada en un móvil y verifica:

- ✅ Se puede instalar como app
- ✅ Funciona offline
- ✅ Los datos se guardan correctamente
- ✅ Los gráficos se renderizan bien

### 2. Configurar Dominio Personalizado (Opcional)

#### En Vercel:
1. Project Settings → Domains
2. Añade tu dominio
3. Configura DNS según instrucciones

#### En Netlify:
1. Domain Settings → Custom domains
2. Añade tu dominio
3. Configura DNS según instrucciones

### 3. Optimizaciones

#### Habilitar Compresión (ya incluido en Vite)
- ✅ Gzip automático
- ✅ Minificación de JS/CSS
- ✅ Tree-shaking

#### Service Worker
El plugin PWA de Vite ya configura:
- ✅ Caché de assets
- ✅ Modo offline
- ✅ Actualizaciones automáticas

---

## 🔍 Verificación de Deploy

Después de desplegar, verifica:

### 1. Lighthouse Audit
1. Abre Chrome DevTools (F12)
2. Ve a "Lighthouse"
3. Genera reporte
4. Deberías obtener:
   - Performance: 90+
   - Accessibility: 90+
   - Best Practices: 90+
   - SEO: 90+
   - PWA: ✅ Todos los checks

### 2. PWA Checklist
- ✅ Manifest.json cargado
- ✅ Service Worker registrado
- ✅ Iconos correctos
- ✅ Instalable en móviles
- ✅ Funciona offline

### 3. Responsive Design
Prueba en:
- 📱 iPhone (Safari)
- 📱 Android (Chrome)
- 💻 Desktop (todos los navegadores)
- 📱 Tablet

---

## 🐛 Problemas Comunes

### Error: "Failed to fetch manifest"
**Solución:** Asegúrate de que `base` en `vite.config.js` coincida con tu URL

### PWA no se instala en iOS
**Solución:** 
- Verifica que tengas `apple-touch-icon.png`
- Asegúrate de usar HTTPS

### Service Worker no actualiza
**Solución:**
```bash
# Limpia caché
# En Chrome DevTools:
# Application → Clear Storage → Clear site data
```

### Los assets no cargan (404)
**Solución:** Verifica la ruta `base` en `vite.config.js`

---

## 📊 Monitoreo (Opcional)

### Google Analytics

Añade en `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

---

## 🔄 Actualización Continua

### Workflow Recomendado

1. Desarrolla localmente
2. Commit y push a GitHub
3. El deploy se hace automáticamente (Vercel/Netlify)
4. Preview de cada pull request
5. Merge a main → deploy a producción

---

## 📝 Checklist Final

Antes de compartir tu app:

- [ ] README.md actualizado
- [ ] LICENSE agregada
- [ ] Screenshots/GIFs en el README
- [ ] Instrucciones de instalación claras
- [ ] Link demo funcionando
- [ ] PWA instalable en móviles
- [ ] Offline funcional
- [ ] Exportación de datos probada
- [ ] Gráficos renderizando correctamente
- [ ] Responsive en todos los dispositivos

---

## 🎉 ¡Listo!

Tu app SwimMetrics Mobile está desplegada y lista para usarse.

**Comparte tu app:**
- Twitter/X
- Reddit (r/swimming)
- Instagram
- Tu club de natación

---

## 💬 Soporte

¿Problemas con el deploy?

1. Revisa los logs de la plataforma
2. Verifica la consola del navegador
3. Abre un issue en GitHub
4. Consulta la documentación de la plataforma

---

**¡Feliz natación! 🏊‍♂️**
