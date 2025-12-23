# 🎓 StudyMate AI - Como Usar

## 🚀 Instalação Rápida (Automática)

### No Mac/Linux:

1. Abre o Terminal
2. Navega até a pasta do projeto:
   ```bash
   cd caminho/para/study-mate-app
   ```
3. Executa o script de setup:
   ```bash
   ./setup.sh
   ```

### No Windows:

1. Abre o PowerShell ou CMD
2. Navega até a pasta do projeto:
   ```cmd
   cd caminho\para\study-mate-app
   ```
3. Executa o script de setup:
   ```cmd
   setup.bat
   ```

---

## 📝 Instalação Manual (Passo a Passo)

Se o script automático não funcionar, segue estes passos:

### 1. Instalar Node.js

Se ainda não tens Node.js instalado:
- Vai para: https://nodejs.org/
- Baixa e instala a versão LTS (recomendada)
- Reinicia o terminal

### 2. Instalar Dependências

```bash
npm install
```

### 3. Criar diretório para base de dados

```bash
mkdir data
```

### 4. Iniciar o servidor

```bash
npm run dev
```

### 5. Inicializar a base de dados

Abre outro terminal e executa:

```bash
curl http://localhost:3000/api/init-db
```

Ou simplesmente abre no browser: http://localhost:3000/api/init-db

---

## 🌐 Aceder à Aplicação

Abre o browser e vai para:

**URL:** http://localhost:3000

### 🔐 Credenciais Demo

```
Email:    iris.student@email.com
Password: demo123
```

---

## 🛑 Como Parar o Servidor

Pressiona **Ctrl + C** no terminal onde o servidor está rodando.

---

## 🐛 Resolução de Problemas

### "Node.js não está instalado"
- Instala o Node.js: https://nodejs.org/

### "Porta 3000 já está em uso"
- Para o processo que está usando a porta 3000, ou
- Edita `package.json` e muda o script `dev` para usar outra porta:
  ```json
  "dev": "next dev -p 3001"
  ```

### "Base de dados não inicializa"
- Certifica-te que o servidor está rodando
- Aguarda 5-10 segundos após iniciar o servidor
- Tenta aceder: http://localhost:3000/api/init-db

### "Erro ao fazer login"
- Verifica se a base de dados foi inicializada
- Usa as credenciais exatas: `iris.student@email.com` / `demo123`

---

## 📂 Estrutura do Projeto

```
study-mate-app/
├── app/                    # Páginas Next.js
│   ├── (auth)/login/      # Página de login
│   ├── (dashboard)/       # Páginas protegidas
│   └── api/               # API routes
├── components/            # Componentes React
│   ├── ui/               # Componentes reutilizáveis
│   └── layout/           # Sidebar, Header
├── lib/                  # Configurações
│   ├── db.ts            # SQLite
│   ├── auth.ts          # NextAuth
│   └── seed.ts          # Dados demo
├── data/                # Base de dados
│   └── study-mate.db   # SQLite DB
└── public/              # Ficheiros estáticos
```

---

## 🔧 Comandos Úteis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Criar build de produção
npm run build

# Iniciar servidor de produção
npm start

# Limpar cache do Next.js
rm -rf .next

# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Tecnologias Usadas

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Styling
- **SQLite** - Base de dados local
- **NextAuth.js** - Autenticação
- **Lucide React** - Ícones

---

## 💡 Próximos Passos

Depois de fazer login, podes explorar:

- **Dashboard** - Visão geral do progresso
- **Disciplinas** - Gestão de matérias
- **Plano de Estudo** - Calendário e tarefas
- **Tutor IA** - Chat com assistente virtual
- **Exames** - Simulador de provas
- **Biblioteca** - Upload de materiais
- **Progresso** - Gráficos e estatísticas

---

## ❓ Suporte

Se tiveres problemas:

1. Verifica se o Node.js está instalado: `node --version`
2. Verifica se o npm está instalado: `npm --version`
3. Tenta reinstalar as dependências: `npm install`
4. Verifica se a porta 3000 está livre

---

**Desenvolvido com ❤️ usando Next.js**
