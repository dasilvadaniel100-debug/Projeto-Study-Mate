@echo off
chcp 65001 >nul
cls

echo ====================================
echo 🎓 StudyMate AI - Setup Automático
echo ====================================
echo.

:: Verificar se Node.js está instalado
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js não está instalado!
    echo Por favor, instala o Node.js em: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js encontrado
node --version
echo.

:: Verificar se npm está instalado
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm não está instalado!
    pause
    exit /b 1
)

echo ✅ npm encontrado
npm --version
echo.

:: Instalar dependências se node_modules não existir
if not exist "node_modules\" (
    echo 📦 A instalar dependências...
    call npm install
    echo.
) else (
    echo ✅ Dependências já instaladas
    echo.
)

:: Criar diretório data se não existir
if not exist "data\" (
    echo 📁 A criar diretório para base de dados...
    mkdir data
    echo.
)

:: Verificar se .env.local existe
if not exist ".env.local" (
    echo ❌ Ficheiro .env.local não encontrado!
    echo A criar .env.local...
    (
        echo # NextAuth
        echo NEXTAUTH_URL=http://localhost:3000
        echo NEXTAUTH_SECRET=study-mate-secret-key-change-in-production
        echo.
        echo # Database
        echo DATABASE_PATH=./data/study-mate.db
        echo.
        echo # Upload
        echo MAX_FILE_SIZE=10485760
        echo ALLOWED_FILE_TYPES=pdf,docx,txt,png,jpg
    ) > .env.local
    echo ✅ Ficheiro .env.local criado
    echo.
)

echo 🚀 A iniciar servidor de desenvolvimento...
echo.
echo 📌 IMPORTANTE: Mantém esta janela aberta!
echo 📌 O servidor vai iniciar em http://localhost:3000
echo.
echo Aguarda alguns segundos...
echo.

:: Iniciar servidor
start /B npm run dev

:: Aguardar servidor iniciar
timeout /t 10 /nobreak >nul

echo.
echo ✅ Servidor iniciado!
echo.

:: Inicializar base de dados
echo 🗄️  A inicializar base de dados...
timeout /t 3 /nobreak >nul

powershell -Command "try { Invoke-WebRequest -Uri 'http://localhost:3000/api/init-db' -UseBasicParsing | Out-Null; exit 0 } catch { exit 1 }"

if %ERRORLEVEL% EQU 0 (
    echo ✅ Base de dados inicializada!
    echo.
    echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    echo 🎉 StudyMate está pronto para usar!
    echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    echo.
    echo 🌐 URL: http://localhost:3000
    echo.
    echo 🔐 Credenciais Demo:
    echo    Email:    iris.student@email.com
    echo    Password: demo123
    echo.
    echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    echo.
) else (
    echo ⚠️  Não foi possível inicializar a base de dados
    echo    Tenta aceder: http://localhost:3000/api/init-db
    echo.
    echo 🌐 URL: http://localhost:3000
    echo 🔐 Login: iris.student@email.com / demo123
    echo.
)

echo 📌 Para parar o servidor: pressiona Ctrl+C
echo.
echo A abrir no browser...
timeout /t 2 /nobreak >nul
start http://localhost:3000

pause
