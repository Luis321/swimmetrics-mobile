# 🚀 INICIO RÁPIDO - SwimMetrics Mobile

## ⚡ Comenzar en 30 segundos

### Opción A: Usando el Script de Instalación (Recomendado)

```bash
# 1. Entrar al directorio
cd swimmetrics

# 2. Ejecutar instalador
./install.sh
```

El script hará todo automáticamente y te preguntará si quieres iniciar el servidor.

---

### Opción B: Instalación Manual

```bash
# 1. Entrar al directorio
cd swimmetrics

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

**¡Listo!** Abre tu navegador en: `http://localhost:5173`

---

## 📱 Probar en tu Móvil

```bash
# Iniciar servidor accesible en red local
npm run dev -- --host
```

Accede desde tu móvil usando la IP mostrada (ej: `http://192.168.1.X:5173`)

---

## 🌐 Desplegar Online (1 minuto)

### Opción 1: Vercel (Más Fácil)
```bash
npm i -g vercel
vercel
```

### Opción 2: Netlify
```bash
npm run build
# Arrastra carpeta dist/ a netlify.com
```

### Opción 3: GitHub Pages
```bash
npm install --save-dev gh-pages

# Agregar en package.json:
"scripts": {
  "deploy": "gh-pages -d dist"
}

npm run deploy
```

---

## 🎯 Primer Entrenamiento

1. **Abre** la app
2. **Selecciona** un estilo (ej: Libre 🏊‍♂️)
3. **Registra** datos:
   - Distancia: 50m
   - Tiempo: 35.5s
   - Brazadas: 28
4. **Toca** "Añadir registro"
5. **Ve** tus métricas calculadas automáticamente

---

## 📊 Ver Gráficos

1. Cambia a pestaña **"📊 Gráficos"**
2. Explora tus estadísticas
3. Toca **"📤 Exportar"** para guardar gráficos

---

## 💾 Exportar Datos

- **CSV**: Datos → Botón "📄 CSV"
- **Excel**: Datos → Botón "📊 Excel"
- **Compartir**: Datos → Botón "🔗 Compartir"

---

## 🔧 Comandos Útiles

```bash
# Desarrollo
npm run dev          # Servidor local

# Producción
npm run build        # Compilar
npm run preview      # Vista previa

# Limpieza
rm -rf node_modules
npm install
```

---

## ❓ ¿Problemas?

### No funciona npm
```bash
# Instala Node.js desde: https://nodejs.org/
```

### Puerto ocupado
```bash
npm run dev -- --port 3000
```

### Error al instalar
```bash
npm cache clean --force
npm install
```

---

## 📚 Más Información

- **README.md** - Documentación completa
- **QUICKSTART.md** - Guía de uso detallada
- **DEPLOY.md** - Guía de despliegue paso a paso
- **PROYECTO-COMPLETO.md** - Resumen del proyecto

---

## ✅ Checklist Rápido

- [ ] Node.js instalado
- [ ] `npm install` completado
- [ ] `npm run dev` ejecutándose
- [ ] App abierta en navegador
- [ ] Primer registro añadido
- [ ] Gráficos visibles

---

**¡Feliz natación! 🏊‍♂️💪**

Para cualquier duda, consulta la documentación incluida.
