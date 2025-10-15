#!/bin/bash

echo "🎨 Generando iconos para PWA..."
echo ""

# Verificar si ImageMagick está instalado
if ! command -v convert &> /dev/null
then
    echo "⚠️  ImageMagick no está instalado."
    echo "Para generar iconos automáticamente, instala ImageMagick:"
    echo "  Ubuntu/Debian: sudo apt-get install imagemagick"
    echo "  macOS: brew install imagemagick"
    echo ""
    echo "Alternativamente, puedes:"
    echo "1. Usar una herramienta online como https://realfavicongenerator.net/"
    echo "2. Crear manualmente los iconos en los siguientes tamaños:"
    echo "   - 192x192 (icon-192.png)"
    echo "   - 512x512 (icon-512.png)"
    echo ""
    exit 1
fi

# Verificar si existe el icono fuente
if [ ! -f "public/pikachu.png" ]; then
    echo "❌ No se encontró public/pikachu.png"
    echo "Por favor, asegúrate de que el archivo existe."
    exit 1
fi

echo "✅ Generando icon-192.png..."
convert public/pikachu.png -resize 192x192 public/icon-192.png

echo "✅ Generando icon-512.png..."
convert public/pikachu.png -resize 512x512 public/icon-512.png

echo ""
echo "✅ ¡Iconos generados exitosamente!"
echo ""
