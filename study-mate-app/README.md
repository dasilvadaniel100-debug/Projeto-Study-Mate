# 🎓 StudyMate AI

Plataforma educacional inteligente para preparação de exames nacionais portugueses.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=flat-square&logo=sqlite)

---

## ✨ Funcionalidades

### ✅ Implementado

- 🔐 **Autenticação** - Login seguro com NextAuth.js
- 📊 **Dashboard** - Visão geral do progresso e próximas tarefas
- 📚 **Disciplinas** - Gestão de matérias com médias e progresso
- 🎨 **Design System** - Interface moderna com dark theme
- 💾 **Base de Dados Local** - SQLite sem necessidade de servidor

### 🚧 Em Desenvolvimento

- 📅 **Plano de Estudo** - Calendário semanal com tarefas
- 🤖 **Tutor IA** - Assistente virtual para dúvidas
- 📝 **Simulador de Exames** - Prática com exames reais
- 📖 **Biblioteca** - Upload e gestão de materiais
- 📈 **Progresso** - Gráficos de evolução
- 🧠 **Prática** - Gerador de fichas de exercícios
- 🏆 **Gamificação** - Sistema de níveis e conquistas
- 👤 **Perfil** - Gestão de dados pessoais

---

## 🚀 Instalação Rápida

### Pré-requisitos

- Node.js 18+ instalado ([Download](https://nodejs.org/))
- Git instalado

### Setup Automático

**Mac/Linux:**
```bash
./setup.sh
```

**Windows:**
```cmd
setup.bat
```

### Setup Manual

```bash
# 1. Instalar dependências
npm install

# 2. Criar diretório para base de dados
mkdir data

# 3. Iniciar servidor
npm run dev

# 4. Inicializar base de dados (noutra janela)
curl http://localhost:3000/api/init-db
```

---

## 🌐 Acesso

Após o setup, acede à aplicação em:

**URL:** http://localhost:3000

### Credenciais Demo

```
Email:    iris.student@email.com
Password: demo123
```

---

## 🛠️ Tecnologias

- **Framework:** Next.js 14 (App Router)
- **Linguagem:** TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** SQLite (better-sqlite3)
- **Auth:** NextAuth.js
- **Icons:** Lucide React
- **State:** Zustand

---

## 📁 Estrutura do Projeto

```
study-mate-app/
├── app/
│   ├── (auth)/           # Rotas de autenticação
│   ├── (dashboard)/      # Rotas protegidas
│   └── api/              # API routes
├── components/
│   ├── ui/               # Componentes reutilizáveis
│   └── layout/           # Layout components
├── lib/
│   ├── db.ts            # Configuração SQLite
│   ├── auth.ts          # Configuração NextAuth
│   └── seed.ts          # Seed da base de dados
├── types/               # TypeScript types
├── data/                # Base de dados SQLite
└── public/              # Ficheiros estáticos
```

---

## 📚 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Iniciar servidor dev (localhost:3000)

# Produção
npm run build        # Criar build otimizada
npm start            # Iniciar servidor de produção

# Utilidades
npm run lint         # Executar ESLint
```

---

## 🗄️ Base de Dados

A aplicação usa **SQLite** como base de dados local. O ficheiro `study-mate.db` é criado automaticamente na pasta `data/`.

### Estrutura Principal

- `users` - Utilizadores da plataforma
- `subjects` - Disciplinas por utilizador
- `study_plan_tasks` - Tarefas do plano de estudo
- `exams` - Histórico de exames
- `chat_messages` - Mensagens do tutor IA
- `library_documents` - Ficheiros da biblioteca
- `gamification_badges` - Sistema de conquistas
- `user_stats` - Estatísticas do utilizador

---

## 🎨 Design System

### Cores

```css
--bg-primary:    #0f0f13  /* Fundo principal */
--bg-secondary:  #1e1e24  /* Cards */
--bg-tertiary:   #25252b  /* Hover states */
--accent-primary: #4f46e5 /* Indigo 600 */
```

### Componentes

- **GlassCard** - Cards com efeito glass morphism
- **Button** - Primary, Secondary, Ghost
- **Input** - Com labels e estados de erro
- **SectionRow** - Layout horizontal scrollável

---

## 📖 Documentação Completa

Para instruções detalhadas, consulta: [COMO_USAR.md](./COMO_USAR.md)

---

## 🐛 Troubleshooting

### Porta 3000 já em uso

```bash
# Matar processo na porta 3000
# Mac/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Base de dados não inicializa

1. Certifica-te que o servidor está rodando
2. Aguarda 5-10 segundos
3. Acede: http://localhost:3000/api/init-db

### Erro de módulos

```bash
# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

---

## 📝 Licença

Este projeto foi desenvolvido como protótipo educacional.

---

## 👤 Autor

Desenvolvido com ❤️ usando Next.js, TypeScript e Tailwind CSS

---

## 🔗 Links Úteis

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [NextAuth.js](https://next-auth.js.org)
- [SQLite](https://www.sqlite.org)

---

**Versão:** 1.0.0
**Última atualização:** Dezembro 2024
