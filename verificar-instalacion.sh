#!/bin/bash

echo "🔍 Verificando instalación de Sublime Poke React PWA..."
echo ""

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Contador de errores
ERRORS=0

# Verificar Node.js
if command -v node &> /dev/null; then
    echo -e "${GREEN}✅ Node.js instalado:${NC} $(node --version)"
else
    echo -e "${RED}❌ Node.js NO está instalado${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Verificar npm
if command -v npm &> /dev/null; then
    echo -e "${GREEN}✅ npm instalado:${NC} $(npm --version)"
else
    echo -e "${RED}❌ npm NO está instalado${NC}"
    ERRORS=$((ERRORS + 1))
fi

echo ""
echo "📁 Verificando estructura de archivos..."

# Archivos requeridos
FILES=(
    "package.json"
    "public/index.html"
    "public/manifest.json"
    "public/service-worker.js"
    "src/index.js"
    "src/App.js"
    "src/App.css"
    "src/serviceWorkerRegistration.js"
    "src/components/Header.js"
    "src/components/PokemonCard.js"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅${NC} $file"
    else
        echo -e "${RED}❌${NC} $file ${RED}(faltante)${NC}"
        ERRORS=$((ERRORS + 1))
    fi
done

echo ""

# Verificar node_modules
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✅ Dependencias instaladas (node_modules existe)${NC}"
else
    echo -e "${YELLOW}⚠️  Dependencias NO instaladas${NC}"
    echo -e "   Ejecuta: ${YELLOW}npm install${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ ¡Verificación completada exitosamente!${NC}"
    echo ""
    echo "Para iniciar la aplicación:"
    echo -e "  ${GREEN}npm start${NC}"
else
    echo -e "${RED}❌ Se encontraron $ERRORS errores${NC}"
    echo ""
    echo "Por favor, revisa los archivos faltantes."
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
