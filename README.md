# 🏊 Team Pejerrey

**Aplicación Web Progresiva (PWA)** para registrar, analizar y visualizar métricas de natación en todos los estilos.

![SwimMetrics](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/react-18.2-61DAFB?logo=react)
![PWA](https://img.shields.io/badge/PWA-ready-purple)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Características

### 🏊‍♂️ **Cuatro Estilos de Natación**
- **Libre** 🏊‍♂️ - Estilo crol/freestyle
- **Mariposa** 🦋 - Butterfly stroke
- **Espalda** 🔄 - Backstroke
- **Pecho** 💪 - Breaststroke/braza

### 📊 **Métricas Avanzadas**
Cada registro calcula automáticamente:

| Métrica | Fórmula | Descripción |
|---------|---------|-------------|
| **SL** (Stroke Length) | `Distancia / Nº de brazadas` | Longitud promedio de brazada en metros |
| **SR** (Stroke Rate) | `(Nº de brazadas / Tiempo) × 60` | Frecuencia de brazadas por minuto |
| **IET** (Índice de Eficiencia Técnica) | `Distancia / (Tiempo × Nº de brazadas)` | Eficiencia del nado (mayor es mejor) |
| **SWOLF** | `Tiempo + Nº de brazadas` | Indicador de eficiencia (menor es mejor) |
| **Velocidad** | `Distancia / Tiempo` | Velocidad promedio en m/s |
| **IEC** (Índice de Economía Cardíaca) | `FC / Velocidad` | Relación entre frecuencia cardíaca y velocidad (opcional) |

### 📈 **Visualizaciones Interactivas**
- Evolución de tiempo vs brazadas
- Gráfico SL vs SR (análisis de eficiencia técnica)
- Progreso de SWOLF por sesión
- Índice de Eficiencia Técnica (IET)
- Comparación radar entre estilos

### 💾 **Funcionalidad Offline**
- Almacenamiento local con IndexedDB
- Service Worker para caché completo
- No requiere conexión a internet
- Datos persistentes en el dispositivo

### 📤 **Exportación de Datos**
- Exportar a CSV
- Exportar a Excel (.xlsx)
- Descargar gráficos como PNG
- Compartir usando Web Share API

### 📱 **Diseño Mobile-First**
- PWA instalable en iOS y Android
- Optimizado para pantallas táctiles
- Navegación intuitiva con bottom-nav bar
- Diseño responsive y accesible

---

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js 16+ y npm
- Navegador moderno (Chrome, Safari, Edge, Firefox)

### Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/swimmetrics-mobile.git
cd swimmetrics-mobile

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de producción
npm run preview
```

### Instalación como PWA

#### En iOS (Safari):
1. Abre la app en Safari
2. Toca el botón de compartir
3. Selecciona "Añadir a pantalla de inicio"
4. Confirma el nombre y toca "Añadir"

#### En Android (Chrome):
1. Abre la app en Chrome
2. Toca el menú (tres puntos)
3. Selecciona "Añadir a pantalla de inicio"
4. Confirma la instalación

---

## 🎯 Cómo Usar la App

### 1. Registrar un Entrenamiento
1. Selecciona un estilo de natación (Libre, Mariposa, Espalda o Pecho)
2. Toca "Nuevo Registro"
3. Completa los campos:
   - **Fecha**: Fecha del entrenamiento
   - **Distancia**: Metros nadados (ej: 25, 50, 100)
   - **Tiempo**: Segundos totales
   - **Brazadas**: Número de brazadas completas
   - **FC** (opcional): Frecuencia cardíaca promedio en bpm
   - **Notas** (opcional): Observaciones o sensaciones
4. Toca "Añadir registro"

### 2. Ver Métricas y Gráficos
- Cambia entre pestañas **📝 Datos** y **📊 Gráficos**
- Los gráficos se actualizan automáticamente
- Toca "📤 Exportar" en cualquier gráfico para guardarlo

### 3. Comparar Estilos
- Toca "📊 Comparar" en la navegación inferior
- Ve promedios de todos tus estilos
- Analiza el gráfico radar comparativo
- Identifica tus mejores métricas por estilo

### 4. Exportar Datos
- CSV: Archivo de texto compatible con Excel/Google Sheets
- Excel: Archivo .xlsx con formato completo
- Compartir: Usa la función nativa del móvil

---

## 🧮 Entendiendo las Métricas

### **SL (Stroke Length) - Longitud de Brazada**
- **Mayor es mejor**: Indica que recorres más distancia con cada brazada
- **Rango típico**: 1.5 - 3.0 metros
- **Mejora**: Trabaja técnica, deslizamiento y posición corporal

### **SR (Stroke Rate) - Frecuencia de Brazada**
- **Balance óptimo**: No siempre más rápido es mejor
- **Rango típico**: 30 - 60 brazadas/min
- **Mejora**: Busca el ritmo que maximice velocidad sin sacrificar técnica

### **IET (Índice de Eficiencia Técnica)**
- **Mayor es mejor**: Indica mayor eficiencia
- **Interpretación**: Cuánta distancia logras por unidad de esfuerzo
- **Mejora**: Optimiza técnica y reduce resistencia al agua

### **SWOLF**
- **Menor es mejor**: Suma de tiempo y brazadas
- **Rango típico**: 30 - 60 (para 25m)
- **Mejora**: Reduce tiempo o brazadas manteniendo distancia constante

### **IEC (Índice de Economía Cardíaca)**
- **Menor es mejor**: Menos esfuerzo cardiovascular por velocidad
- **Requiere**: Monitor de frecuencia cardíaca
- **Mejora**: Entrena resistencia y técnica aeróbica

---

## 🏗️ Arquitectura Técnica

### Stack Tecnológico
```
Frontend:
- React 18.2
- Vite (build tool)
- TailwindCSS (estilos)

Gráficos:
- Chart.js 4.4
- react-chartjs-2

Almacenamiento:
- IndexedDB (idb)
- Service Worker

PWA:
- vite-plugin-pwa
- Workbox

Exportación:
- xlsx (Excel)
- FileSaver.js
- Web Share API
```

### Estructura de Archivos
```
swimmetrics/
├── public/
│   ├── pwa-192x192.png
│   ├── pwa-512x512.png
│   └── apple-touch-icon.png
├── src/
│   ├── components/
│   │   ├── BottomNav.jsx
│   │   ├── Charts.jsx
│   │   ├── StyleCard.jsx
│   │   ├── SwimForm.jsx
│   │   └── SwimTable.jsx
│   ├── views/
│   │   ├── HomeView.jsx
│   │   ├── StyleView.jsx
│   │   └── CompareView.jsx
│   ├── utils/
│   │   ├── db.js (IndexedDB)
│   │   ├── calculations.js (fórmulas)
│   │   └── export.js (exportación)
│   ├── constants/
│   │   └── swimStyles.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 🚢 Deploy

### GitHub Pages

```bash
# Agregar en vite.config.js:
# base: '/nombre-repositorio/'

npm run build
# Sube la carpeta dist/ a GitHub Pages
```

### Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production
vercel --prod
```

### Netlify

```bash
# Build command: npm run build
# Publish directory: dist
```

---

## 🎨 Personalización

### Cambiar Colores
Edita `tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#TU_COLOR', // Color principal
  }
}
```

### Añadir Nuevo Estilo
Edita `src/constants/swimStyles.js`:

```javascript
export const SWIM_STYLES = {
  // ...estilos existentes
  MEDLEY: {
    id: 'medley',
    name: 'Medley',
    emoji: '🌊',
    color: '#EC4899',
    description: 'Estilo combinado'
  }
};
```

---

## 🐛 Solución de Problemas

### La PWA no se instala
- Verifica que uses HTTPS (localhost funciona)
- Revisa que `manifest.json` esté correctamente servido
- Limpia caché del navegador

### Los datos no se guardan
- Verifica que IndexedDB esté habilitado
- Revisa la consola del navegador
- Intenta en modo incógnito

### Los gráficos no se muestran
- Asegúrate de tener al menos 1 registro
- Verifica que Chart.js se cargó correctamente
- Revisa errores en consola

---

## 📚 Recursos Adicionales

- [Documentación de Vite](https://vitejs.dev/)
- [React Docs](https://react.dev/)
- [Chart.js Docs](https://www.chartjs.org/docs/latest/)
- [PWA Docs](https://web.dev/progressive-web-apps/)
- [TailwindCSS](https://tailwindcss.com/)

---

## 📄 Licencia

MIT License - Libre para uso personal y comercial.

---

## 👤 Autor

**SwimMetrics Mobile**  
Desarrollado con ❤️ para nadadores que buscan mejorar su rendimiento.

Para soporte o sugerencias, abre un issue en el repositorio.

---

## 🙏 Agradecimientos

- Comunidad de natación competitiva
- Entrenadores y atletas que proporcionaron feedback
- Librerías open-source utilizadas

---

**¡Feliz natación! 🏊‍♂️🏊‍♀️**
