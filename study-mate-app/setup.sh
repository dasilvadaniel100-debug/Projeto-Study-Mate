#!/bin/bash

echo "🎓 StudyMate AI - Setup Automático"
echo "===================================="
echo ""

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado!"
    echo "Por favor, instala o Node.js em: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"
echo ""

# Verificar se npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não está instalado!"
    exit 1
fi

echo "✅ npm encontrado: $(npm --version)"
echo ""

# Instalar dependências se node_modules não existir
if [ ! -d "node_modules" ]; then
    echo "📦 A instalar dependências..."
    npm install
    echo ""
else
    echo "✅ Dependências já instaladas"
    echo ""
fi

# Criar diretório data se não existir
if [ ! -d "data" ]; then
    echo "📁 A criar diretório para base de dados..."
    mkdir -p data
    echo ""
fi

# Verificar se .env.local existe
if [ ! -f ".env.local" ]; then
    echo "❌ Ficheiro .env.local não encontrado!"
    echo "A criar .env.local..."
    cat > .env.local << 'EOL'
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=study-mate-secret-key-change-in-production

# Database
DATABASE_PATH=./data/study-mate.db

# Upload
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=pdf,docx,txt,png,jpg
EOL
    echo "✅ Ficheiro .env.local criado"
    echo ""
fi

echo "🚀 A iniciar servidor de desenvolvimento..."
echo ""
echo "📌 IMPORTANTE: Mantém esta janela aberta!"
echo "📌 O servidor vai iniciar em http://localhost:3000"
echo ""
echo "Aguarda alguns segundos..."
echo ""

# Iniciar servidor em background
npm run dev &
SERVER_PID=$!

# Aguardar servidor iniciar
sleep 8

# Verificar se o servidor está rodando
if ps -p $SERVER_PID > /dev/null; then
    echo ""
    echo "✅ Servidor iniciado com sucesso!"
    echo ""

    # Inicializar base de dados
    echo "🗄️  A inicializar base de dados..."
    sleep 2

    curl -s http://localhost:3000/api/init-db > /dev/null 2>&1

    if [ $? -eq 0 ]; then
        echo "✅ Base de dados inicializada!"
        echo ""
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "🎉 StudyMate está pronto para usar!"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        echo "🌐 URL: http://localhost:3000"
        echo ""
        echo "🔐 Credenciais Demo:"
        echo "   Email:    iris.student@email.com"
        echo "   Password: demo123"
        echo ""
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        echo "📌 Para parar o servidor: pressiona Ctrl+C"
        echo ""

        # Manter o script rodando
        wait $SERVER_PID
    else
        echo "⚠️  Não foi possível inicializar a base de dados"
        echo "   Tenta aceder: http://localhost:3000/api/init-db"
        echo ""
        echo "🌐 URL: http://localhost:3000"
        echo "🔐 Login: iris.student@email.com / demo123"
        echo ""
        wait $SERVER_PID
    fi
else
    echo "❌ Erro ao iniciar o servidor"
    exit 1
fi
