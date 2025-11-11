# 📱 Guía de Uso Rápido - SwimMetrics Mobile

## 🚀 Inicio Rápido (3 pasos)

1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

3. **Abrir en tu navegador**
   - Abre: `http://localhost:5173`
   - O usa tu móvil en la misma red WiFi

---

## 📝 Registro de Entrenamientos

### Ejemplo: Registrar 50m Libre

1. **Selecciona** el estilo "Libre 🏊‍♂️"
2. **Completa** el formulario:
   ```
   Fecha: [Hoy]
   Distancia: 50 (metros)
   Tiempo: 35.5 (segundos)
   Brazadas: 28
   FC: 145 (opcional)
   Notas: "Buen ritmo, técnica sólida"
   ```
3. **Toca** "Añadir registro"

### Métricas Calculadas Automáticamente:
- **SL**: 1.79m (50÷28)
- **SR**: 47.32 brazadas/min
- **IET**: 0.0503
- **SWOLF**: 63.5 (35.5+28)
- **Velocidad**: 1.41 m/s

---

## 📊 Visualizar Progreso

### Ver Gráficos
1. Toca la pestaña "📊 Gráficos"
2. Explora:
   - Evolución de tiempo vs brazadas
   - SL vs SR (eficiencia)
   - SWOLF por sesión
   - IET promedio

### Exportar Gráfico
- Toca "📤 Exportar" en cualquier gráfico
- Se descarga como PNG

---

## 🔄 Comparar Estilos

1. Toca "📊 Comparar" en la barra inferior
2. Ve promedios de todos tus estilos
3. Analiza el gráfico radar
4. Identifica tus mejores métricas

---

## 💾 Exportar Datos

### Exportar a Excel
```
Datos → Botón "📊 Excel"
```

### Exportar a CSV
```
Datos → Botón "📄 CSV"
```

### Compartir
```
Datos → Botón "🔗 Compartir"
(Usa la función nativa del móvil)
```

---

## 📱 Instalar como App

### iPhone (Safari)
1. Abre SwimMetrics en Safari
2. Toca el botón compartir (cuadrado con flecha)
3. "Añadir a pantalla de inicio"
4. Confirma

### Android (Chrome)
1. Abre SwimMetrics en Chrome
2. Menú (⋮) → "Añadir a pantalla de inicio"
3. Confirma

---

## 🎯 Consejos para Mejores Resultados

### 🏊‍♂️ Al Nadar
- Cuenta tus brazadas con precisión
- Usa cronómetro para tiempo exacto
- Registra inmediatamente después del entrenamiento

### 📈 Al Analizar
- Compara entrenamientos del mismo día/hora
- Observa tendencias semanales
- No te obsesiones con un solo número

### 💡 Optimizar Métricas

**Para mejorar SL (longitud de brazada):**
- Trabaja deslizamiento
- Mejora técnica de brazada
- Fortalece core y rotación

**Para optimizar SR (frecuencia):**
- No sacrifiques técnica por velocidad
- Busca tu ritmo óptimo
- Varía entrenamientos

**Para reducir SWOLF:**
- Combina menos brazadas + menos tiempo
- Entrena técnica + velocidad
- Mantén la distancia constante

---

## 🔧 Comandos Útiles

```bash
# Desarrollo
npm run dev          # Inicia servidor local

# Producción
npm run build        # Compila la app
npm run preview      # Vista previa

# Limpieza
rm -rf node_modules  # Eliminar dependencias
npm install          # Reinstalar
```

---

## ❓ FAQ Rápido

**P: ¿Necesito internet?**  
R: No, funciona completamente offline después de cargar por primera vez.

**P: ¿Dónde se guardan mis datos?**  
R: Localmente en tu dispositivo, nunca en la nube.

**P: ¿Puedo usar en varios dispositivos?**  
R: Los datos son por dispositivo. Usa exportar/importar para transferir.

**P: ¿Qué navegadores soporta?**  
R: Chrome, Safari, Edge, Firefox (todos modernos).

---

## 🐛 Soluciones Rápidas

**Los datos no se guardan:**
- Verifica que no estés en modo incógnito
- Limpia caché y recarga

**No veo gráficos:**
- Añade al menos 1 registro
- Recarga la página

**No puedo exportar:**
- Verifica permisos de descarga
- Intenta en otro navegador

---

## 📞 Soporte

**Problemas:**
- Revisa README.md
- Consulta GitHub Issues
- Verifica la consola del navegador (F12)

**Sugerencias:**
- Abre un Issue en GitHub
- Fork y crea Pull Request

---

**¡Feliz natación y entrenamiento! 🏊‍♂️💪**
