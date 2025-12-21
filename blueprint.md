# StudyMate AI - Blueprint Técnico

## 📋 Visão Geral

Aplicação web educacional para estudantes do ensino secundário português, focada em preparação para exames nacionais com suporte de IA.

**Stack Tecnológica:**
- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context API + Zustand
- **Database Local**: SQLite (via better-sqlite3)
- **Autenticação**: NextAuth.js (local credentials)
- **IA/LLM**: API integrada (OpenAI/Anthropic/local)

---

## 🎨 Design System

### Paleta de Cores

```css
/* Backgrounds */
--bg-primary: #0f0f13;
--bg-secondary: #1e1e24;
--bg-tertiary: #25252b;
--bg-quaternary: #2d2d36;

/* Accent Colors */
--accent-primary: #4f46e5;      /* Indigo 600 */
--accent-secondary: #7c3aed;     /* Purple 600 */
--accent-success: #10b981;       /* Green 500 */
--accent-warning: #f59e0b;       /* Yellow 500 */
--accent-danger: #ef4444;        /* Red 500 */

/* Text */
--text-primary: #ffffff;
--text-secondary: #9ca3af;       /* Gray 400 */
--text-tertiary: #6b7280;        /* Gray 500 */

/* Borders */
--border-subtle: rgba(255, 255, 255, 0.05);
--border-medium: rgba(255, 255, 255, 0.1);
```

### Componentes Base

#### GlassCard
- Background: `bg-[#1e1e24]`
- Border: `border border-white/5`
- Hover: `hover:border-indigo-500/30`
- Radius: `rounded-2xl`

#### Button Primary
- Background: `bg-indigo-600 hover:bg-indigo-500`
- Text: `text-white font-bold`
- Padding: `px-6 py-3`
- Radius: `rounded-xl`
- Shadow: `shadow-lg shadow-indigo-900/20`

#### Input
- Background: `bg-black/20`
- Border: `border border-white/10`
- Focus: `focus:ring-2 focus:ring-indigo-500`
- Radius: `rounded-xl`

### Tipografia

```
Headings:
- H1: text-4xl md:text-6xl font-bold
- H2: text-3xl font-bold
- H3: text-xl md:text-2xl font-bold

Body:
- Base: text-sm
- Large: text-base
- Small: text-xs
```

### Spacing System
- Base unit: 4px (Tailwind default)
- Containers: px-6 md:px-12
- Sections: mb-10
- Cards gap: gap-5 md:gap-6

---

## 🗄️ Estrutura do Banco de Dados (SQLite)

### Tabela: users
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    display_name TEXT,
    avatar_initials TEXT,
    avatar_gradient TEXT,
    school_year INTEGER,
    course_track TEXT, -- 'ciencias', 'humanidades', 'artes', etc.
    target_average REAL DEFAULT 14.0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Tabela: subjects
```sql
CREATE TABLE subjects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    emoji_icon TEXT,
    color_gradient TEXT, -- 'from-blue-600 to-indigo-900'
    current_average REAL DEFAULT 0,
    progress_percentage INTEGER DEFAULT 0,
    next_topic TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### Tabela: study_sessions
```sql
CREATE TABLE study_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    subject_id INTEGER NOT NULL,
    topic TEXT,
    duration_minutes INTEGER,
    completed BOOLEAN DEFAULT 0,
    date DATE NOT NULL,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
);
```

### Tabela: exams
```sql
CREATE TABLE exams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    subject_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    exam_type TEXT, -- 'nacional', 'intermedio', 'modelo'
    year INTEGER,
    phase TEXT, -- '1fase', '2fase'
    duration_minutes INTEGER,
    total_score REAL,
    user_score REAL,
    status TEXT DEFAULT 'pending', -- 'pending', 'in_progress', 'completed', 'paused'
    completed_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
);
```

### Tabela: study_plan_tasks
```sql
CREATE TABLE study_plan_tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    subject_id INTEGER NOT NULL,
    task_text TEXT NOT NULL,
    scheduled_date DATE NOT NULL,
    scheduled_time TEXT, -- '10:00', '14:30'
    completed BOOLEAN DEFAULT 0,
    completed_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
);
```

### Tabela: library_documents
```sql
CREATE TABLE library_documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    subject_id INTEGER,
    filename TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_type TEXT, -- 'pdf', 'docx', 'txt'
    file_size INTEGER, -- bytes
    category TEXT, -- 'resumo', 'ficha', 'exame', 'outro'
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE SET NULL
);
```

### Tabela: chat_messages
```sql
CREATE TABLE chat_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    role TEXT NOT NULL, -- 'user', 'assistant'
    content TEXT NOT NULL,
    subject_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE SET NULL
);
```

### Tabela: gamification_badges
```sql
CREATE TABLE gamification_badges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT, -- lucide icon name
    color TEXT,
    requirement_type TEXT, -- 'streak', 'score', 'exercises', 'time'
    requirement_value INTEGER
);
```

### Tabela: user_badges
```sql
CREATE TABLE user_badges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    badge_id INTEGER NOT NULL,
    unlocked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (badge_id) REFERENCES gamification_badges(id) ON DELETE CASCADE,
    UNIQUE(user_id, badge_id)
);
```

### Tabela: user_stats
```sql
CREATE TABLE user_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    current_level INTEGER DEFAULT 1,
    current_xp INTEGER DEFAULT 0,
    total_study_hours INTEGER DEFAULT 0,
    total_exercises INTEGER DEFAULT 0,
    current_streak_days INTEGER DEFAULT 0,
    longest_streak_days INTEGER DEFAULT 0,
    last_activity_date DATE,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(user_id)
);
```

### Tabela: practice_sessions
```sql
CREATE TABLE practice_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    subject_id INTEGER NOT NULL,
    topic TEXT,
    difficulty TEXT, -- 'facil', 'medio', 'dificil'
    duration_minutes INTEGER,
    exercises_completed INTEGER DEFAULT 0,
    exercises_correct INTEGER DEFAULT 0,
    xp_earned INTEGER DEFAULT 0,
    completed_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
);
```

---

## 📁 Estrutura de Pastas Next.js

```
study-mate/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # Dashboard
│   │   ├── subjects/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── tutor/
│   │   │   └── page.tsx
│   │   ├── exams/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── plan/
│   │   │   └── page.tsx
│   │   ├── library/
│   │   │   └── page.tsx
│   │   ├── stats/
│   │   │   └── page.tsx
│   │   ├── practice/
│   │   │   └── page.tsx
│   │   ├── achievements/
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   └── profile/
│   │       └── page.tsx
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/route.ts
│   │   ├── subjects/
│   │   │   └── route.ts
│   │   ├── exams/
│   │   │   └── route.ts
│   │   ├── chat/
│   │   │   └── route.ts
│   │   ├── library/
│   │   │   ├── upload/route.ts
│   │   │   └── route.ts
│   │   ├── stats/
│   │   │   └── route.ts
│   │   └── gamification/
│   │       └── route.ts
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── GlassCard.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── Select.tsx
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── SectionRow.tsx
│   ├── dashboard/
│   │   ├── HeroSection.tsx
│   │   ├── ContinueLearning.tsx
│   │   └── SubjectsTiles.tsx
│   ├── subjects/
│   │   └── SubjectCard.tsx
│   ├── tutor/
│   │   ├── ChatMessage.tsx
│   │   └── ChatInput.tsx
│   ├── exams/
│   │   ├── ExamCard.tsx
│   │   └── ExamHero.tsx
│   ├── plan/
│   │   ├── WeekCalendar.tsx
│   │   └── TaskItem.tsx
│   ├── library/
│   │   ├── FileCard.tsx
│   │   └── FileUpload.tsx
│   ├── stats/
│   │   ├── EvolutionChart.tsx
│   │   └── TimeChart.tsx
│   ├── practice/
│   │   └── SessionConfig.tsx
│   ├── gamification/
│   │   ├── BadgeCard.tsx
│   │   └── LevelDisplay.tsx
│   └── profile/
│       ├── ProfileHeader.tsx
│       └── StatsGrid.tsx
├── lib/
│   ├── db.ts                           # SQLite connection
│   ├── auth.ts                         # NextAuth config
│   ├── utils.ts
│   └── validations.ts
├── stores/
│   ├── useUserStore.ts
│   ├── useSubjectsStore.ts
│   └── useChatStore.ts
├── types/
│   ├── index.ts
│   ├── database.ts
│   └── api.ts
├── data/
│   └── study-mate.db                   # SQLite database
├── public/
│   └── uploads/                        # User uploaded files
├── .env.local
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🔐 Autenticação

### NextAuth.js Configuration

```typescript
// lib/auth.ts
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "./db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = db.prepare("SELECT * FROM users WHERE email = ?")
          .get(credentials.email);

        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password_hash
        );

        if (!isValid) return null;

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
        };
      }
    })
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  }
};
```

---

## 🛠️ Funcionalidades Core

### 1. Dashboard (Início)
- **Hero Section**: Saudação personalizada + próxima lição
- **Continue Learning**: Cards de tópicos em progresso
- **Subjects Tiles**: Preview de disciplinas

### 2. Disciplinas
- **Grid de Cards**: Todas as disciplinas do utilizador
- **Informações**: Média atual, progresso anual, próximo tópico
- **Interação**: Click abre detalhes da disciplina

### 3. Tutor IA
- **Chat Interface**: Conversa com IA sobre dúvidas
- **Contexto**: IA conhece histórico de testes e dificuldades
- **Exercícios Guiados**: IA gera exercícios personalizados
- **Persistência**: Mensagens guardadas em BD

### 4. Simulador de Exames
- **Exames Reais**: Base de dados de exames de anos anteriores
- **Timer**: Cronómetro com duração oficial
- **Correção**: Critérios de correção passo-a-passo
- **Histórico**: Lista de exames realizados com scores

### 5. Plano de Estudo
- **Calendário Semanal**: Visualização de 7 dias
- **Tarefas Diárias**: Lista de tarefas agendadas
- **Toggle Completion**: Marcar tarefas como concluídas
- **Hora Agendada**: Cada tarefa tem horário

### 6. Biblioteca
- **Upload de Ficheiros**: PDF, DOCX, TXT
- **Categorização**: Resumos, Fichas, Exames
- **Filtros**: Por tipo de documento
- **Storage Local**: Ficheiros em `/public/uploads/`

### 7. Progresso (Stats)
- **Gráfico de Evolução**: Média ao longo do tempo
- **Tempo de Estudo**: Por disciplina
- **Filtros Temporais**: Semana, Mês, Ano

### 8. Prática
- **Gerador de Fichas**: IA cria exercícios personalizados
- **Configuração**: Disciplina, Tópico, Dificuldade
- **Sessões Cronometradas**: 20min default
- **Desafio Diário**: 5 perguntas rápidas (+XP)

### 9. Gamificação
- **Sistema de Níveis**: XP baseado em atividades
- **Badges**: Conquistas desbloqueáveis
- **Streak Counter**: Dias consecutivos de estudo
- **Leaderboard** (futuro): Comparação com colegas

### 10. Configurações
- **Perfil**: Nome, Email
- **Preferências**: Notificações, Modo Foco
- **Tema**: Dark mode (default)

### 11. Perfil
- **Header**: Foto de perfil + banner
- **Estatísticas**: Horas, Exercícios, Média, Streak
- **Bio**: Descrição pessoal
- **Objetivos**: Progresso para metas

---

## 🚀 Fluxos de Dados

### Autenticação
```
1. User acede /login
2. Submete credenciais
3. NextAuth valida contra SQLite
4. Cria JWT session
5. Redirect para /dashboard
```

### Chat com Tutor IA
```
1. User envia mensagem
2. POST /api/chat
3. Guarda mensagem (role: user) em chat_messages
4. Envia contexto + mensagem para LLM API
5. Recebe resposta da IA
6. Guarda resposta (role: assistant) em chat_messages
7. Retorna resposta ao frontend
8. UI atualiza chat
```

### Upload de Documento
```
1. User seleciona ficheiro
2. POST /api/library/upload (multipart/form-data)
3. Valida tipo e tamanho
4. Salva em /public/uploads/[userId]/[filename]
5. Cria registo em library_documents
6. Retorna metadata ao frontend
```

### Completar Tarefa do Plano
```
1. User clica checkbox de tarefa
2. PATCH /api/plan/tasks/[id]
3. Atualiza completed = 1, completed_at = NOW()
4. Adiciona XP ao user_stats
5. Verifica se desbloqueia badge
6. Retorna estado atualizado
```

---

## 📦 Dependências

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "next-auth": "^4.24.0",
    "bcryptjs": "^2.4.3",
    "better-sqlite3": "^11.0.0",
    "lucide-react": "^0.400.0",
    "zustand": "^4.5.0",
    "tailwindcss": "^3.4.0",
    "zod": "^3.23.0",
    "date-fns": "^3.6.0",
    "recharts": "^2.12.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.3.0",
    "@types/bcryptjs": "^2.4.6",
    "@types/better-sqlite3": "^7.6.0",
    "typescript": "^5.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

---

## 🎯 Roadmap de Implementação

### Fase 1: Setup & Estrutura (Dia 1-2)
- [ ] Inicializar Next.js 14 com TypeScript
- [ ] Configurar Tailwind CSS
- [ ] Criar estrutura de pastas
- [ ] Setup SQLite + schemas
- [ ] Configurar NextAuth.js

### Fase 2: Autenticação & Layout (Dia 3-4)
- [ ] Criar página de login
- [ ] Implementar Sidebar
- [ ] Implementar Header
- [ ] Sistema de rotas protegidas

### Fase 3: Dashboard & Disciplinas (Dia 5-7)
- [ ] Componente Dashboard
- [ ] CRUD de Disciplinas
- [ ] Página de detalhes de disciplina
- [ ] Seeds iniciais de dados

### Fase 4: Plano de Estudo (Dia 8-9)
- [ ] Calendário semanal
- [ ] CRUD de tarefas
- [ ] Toggle de conclusão
- [ ] Notificações de tarefas

### Fase 5: Tutor IA (Dia 10-12)
- [ ] Interface de chat
- [ ] Integração com LLM API
- [ ] Persistência de mensagens
- [ ] Contexto de disciplina

### Fase 6: Exames & Biblioteca (Dia 13-15)
- [ ] Lista de exames
- [ ] Visualizador de exames
- [ ] Upload de ficheiros
- [ ] Sistema de categorias

### Fase 7: Progresso & Gamificação (Dia 16-18)
- [ ] Gráficos de evolução
- [ ] Sistema de XP e níveis
- [ ] Badges e conquistas
- [ ] Streak counter

### Fase 8: Prática & Perfil (Dia 19-20)
- [ ] Gerador de fichas
- [ ] Página de perfil
- [ ] Configurações
- [ ] Polimento geral

### Fase 9: Testes & Deploy (Dia 21)
- [ ] Testes de integração
- [ ] Otimização de performance
- [ ] Build de produção
- [ ] Deploy local

---

## 🔧 Configurações de Ambiente

```env
# .env.local

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Database
DATABASE_PATH=./data/study-mate.db

# AI/LLM (escolher uma)
OPENAI_API_KEY=sk-...
# ou
ANTHROPIC_API_KEY=sk-ant-...

# Upload
MAX_FILE_SIZE=10485760  # 10MB em bytes
ALLOWED_FILE_TYPES=pdf,docx,txt,png,jpg
```

---

## 📊 Mock Data para Development

### User Demo
```typescript
{
  email: "iris.student@email.com",
  password: "demo123",
  name: "Iris M.",
  display_name: "Iris",
  avatar_initials: "IM",
  avatar_gradient: "from-pink-500 to-rose-500",
  school_year: 12,
  course_track: "ciencias",
  target_average: 18.0
}
```

### Subjects Demo
```typescript
[
  { name: "Matemática A", emoji: "📐", gradient: "from-blue-600 to-indigo-900", average: 16.2, progress: 75, next: "Complexos" },
  { name: "Física e Química", emoji: "⚛️", gradient: "from-purple-600 to-fuchsia-900", average: 15.4, progress: 60, next: "Mecânica" },
  { name: "Biologia", emoji: "🧬", gradient: "from-emerald-600 to-teal-900", average: 14.8, progress: 45, next: "Genética" },
  { name: "Português", emoji: "📚", gradient: "from-orange-600 to-red-900", average: 15.0, progress: 80, next: "Os Maias" },
  { name: "Inglês", emoji: "🇬🇧", gradient: "from-sky-600 to-blue-900", average: 18.5, progress: 90, next: "Grammar" }
]
```

### Badges Demo
```typescript
[
  { name: "Primeiros Passos", icon: "Zap", color: "yellow", requirement: "complete_first_session" },
  { name: "7 Dias Streak", icon: "Flame", color: "orange", requirement: "streak_7_days" },
  { name: "Matemático", icon: "Brain", color: "blue", requirement: "complete_50_math_exercises" },
  { name: "Coruja Noturna", icon: "Moon", color: "indigo", requirement: "study_after_10pm_10_times" },
  { name: "100% Acerto", icon: "Target", color: "green", requirement: "perfect_score_practice" }
]
```

---

## ✅ Critérios de Sucesso

1. **Performance**: Carregamento < 2s em localhost
2. **Responsividade**: Funcional em mobile, tablet, desktop
3. **Acessibilidade**: Navegação por teclado, semântica HTML
4. **Persistência**: Dados mantidos após refresh
5. **UX**: Transições suaves, feedback visual
6. **Segurança**: Passwords hasheadas, SQL injection prevention

---

## 📝 Notas Adicionais

- **i18n**: Preparar para suporte multi-idioma (PT-PT, PT-BR, EN)
- **Dark Mode Only**: Versão inicial apenas dark theme
- **Offline**: Considerar PWA em versão futura
- **Mobile App**: Wrapper com Capacitor/Electron possível

---

**Versão**: 1.0
**Data**: 2025-12-21
**Autor**: Claude + Utilizador
