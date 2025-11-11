#!/bin/bash

echo "🏊 SwimMetrics Mobile - Instalación"
echo "===================================="
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null
then
    echo "❌ Node.js no está instalado"
    echo "Por favor instala Node.js desde https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node -v) detectado"
echo "✅ npm $(npm -v) detectado"
echo ""

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Instalación completada exitosamente!"
    echo ""
    echo "🚀 Comandos disponibles:"
    echo "  npm run dev      - Ejecutar en modo desarrollo"
    echo "  npm run build    - Compilar para producción"
    echo "  npm run preview  - Vista previa de producción"
    echo ""
    echo "📝 Para más información, lee README.md"
    echo ""
    
    # Preguntar si quiere iniciar
    read -p "¿Deseas iniciar el servidor de desarrollo ahora? (s/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Ss]$ ]]
    then
        npm run dev
    fi
else
    echo ""
    echo "❌ Error durante la instalación"
    echo "Intenta ejecutar: npm install --force"
    exit 1
fi
