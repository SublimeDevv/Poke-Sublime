#!/bin/bash

echo "🚀 Configurando Sublime Poke React PWA..."
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null
then
    echo "❌ Node.js no está instalado. Por favor instala Node.js primero."
    exit 1
fi

echo "✅ Node.js detectado: $(node --version)"
echo "✅ npm detectado: $(npm --version)"
echo ""

# Copiar archivos de React a src
echo "📁 Copiando archivos de React a la carpeta src..."
if [ -d "src-react" ]; then
    cp -r src-react/* src/ 2>/dev/null || true
    echo "✅ Archivos copiados"
else
    echo "⚠️  Carpeta src-react no encontrada, continuando..."
fi

# Copiar icono a public
echo "📁 Copiando icono a la carpeta public..."
if [ -f "src/Images/pikachu.png" ]; then
    cp src/Images/pikachu.png public/ 2>/dev/null || true
    echo "✅ Icono copiado"
else
    echo "⚠️  Icono no encontrado en src/Images/pikachu.png"
fi

# Instalar dependencias
echo ""
echo "📦 Instalando dependencias de npm..."
npm install

echo ""
echo "✅ ¡Configuración completada!"
echo ""
echo "Para iniciar la aplicación en modo desarrollo:"
echo "  npm start"
echo ""
echo "Para compilar para producción:"
echo "  npm run build"
echo ""
