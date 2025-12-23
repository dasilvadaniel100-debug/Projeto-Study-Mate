# 🎯 GUIA VISUAL COMPLETO - Deploy StudyMate no Vercel

## ✅ O QUE VAIS CONSEGUIR:
- 🌐 Aplicação ONLINE 24/7
- 💾 Base de dados PostgreSQL GRÁTIS
- 🔐 Login funcional
- 📊 Todas as funcionalidades a funcionar

**Tempo total: ~15 minutos**

---

## 🚀 PARTE 1: CRIAR CONTA NO VERCEL (5 min)

### PASSO 1.1 - Ir para o Vercel

1. **Abre o browser** (Chrome, Edge, Firefox, Safari...)
2. **Na barra de endereço**, escreve: `vercel.com`
3. **Pressiona Enter**

---

### PASSO 1.2 - Criar Conta

Vais ver a página principal do Vercel.

**NO CENTRO da página**, procura um botão grande que diz:
- **"Sign Up"** OU
- **"Get Started"** OU
- **"Start Deploying"**

**CLICA nesse botão**

---

### PASSO 1.3 - Login com GitHub

Vai aparecer uma página com várias opções de login.

**Procura pelo botão** com o logo do GitHub (gato preto) que diz:
- **"Continue with GitHub"** OU
- **"Sign up with GitHub"**

**CLICA nesse botão do GitHub**

---

### PASSO 1.4 - Autorizar Vercel

O GitHub vai abrir e pedir autorização.

**NO FUNDO da página**, procura um botão verde:
- **"Authorize Vercel"**

**CLICA nesse botão verde**

⏳ Aguarda 5 segundos...

✅ **Conta criada!** Vais ser redirecionado para o Dashboard do Vercel.

---

## 📦 PARTE 2: IMPORTAR O PROJETO (3 min)

### PASSO 2.1 - Dashboard do Vercel

Agora estás no **Dashboard** do Vercel (página inicial depois de login).

**NO CANTO SUPERIOR DIREITO**, procura um botão que diz:
- **"Add New..."** OU
- **"New Project"** OU
- **"Import Project"**

**CLICA nesse botão**

---

### PASSO 2.2 - Escolher "Project"

Vai abrir um **menu dropdown** (pequeno menu que desce).

**Nesse menu**, clica em:
- **"Project"**

---

### PASSO 2.3 - Procurar o Repositório

Vais ver uma página com o título "Import Git Repository" ou "Let's build something new".

**NO CENTRO**, existe uma **lista de repositórios** do teu GitHub.

**PROCURA na lista** (ou usa a caixa de pesquisa no topo):
- **"Projeto-Study-Mate"**

Vais ver um card/linha com:
```
📁 Projeto-Study-Mate
   dasilvadaniel100-debug/Projeto-Study-Mate
```

**DO LADO DIREITO** desse card, existe um botão:
- **"Import"**

**CLICA em "Import"**

---

### PASSO 2.4 - Configurar Projeto

Vai abrir uma página de configuração com MUITOS campos.

**⚠️ IMPORTANTE: NÃO MEXAS EM NADA AINDA!**

Vais ver:
```
Configure Project
─────────────────
Project Name: projeto-study-mate
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

**DEIXA TUDO COMO ESTÁ!** ✅

---

### PASSO 2.5 - Adicionar Variáveis de Ambiente

**DESCE A PÁGINA** (scroll para baixo) até encontrar uma secção:

```
Environment Variables  (Optional)
```

**CLICA no botão "Add"** ou no campo de input dessa secção.

---

#### ➊ Primeira Variável: NEXTAUTH_URL

**a) No campo "Key" (ou "Name")**, escreve exatamente:
```
NEXTAUTH_URL
```

**b) No campo "Value"**, escreve:
```
https://temp.vercel.app
```
(Vamos mudar isto depois)

**c) Clica em "Add"** (botão pequeno ao lado)

---

#### ➋ Segunda Variável: NEXTAUTH_SECRET

**a) ABRE UM NOVO TAB** no browser (Ctrl+T ou Cmd+T)

**b) Na barra de endereço**, cola:
```
https://generate-secret.vercel.app/32
```

**c) Pressiona Enter**

Vai aparecer um código grande tipo:
```
xK9mP2vN8qR5tL7wY3zB6cF4hJ0gD1sA
```

**d) COPIA TODO esse código** (Ctrl+C ou Cmd+C)

**e) VOLTA para o tab do Vercel**

**f) Clica novamente em "Add"** para adicionar outra variável

**g) No campo "Key"**, escreve:
```
NEXTAUTH_SECRET
```

**h) No campo "Value"**, COLA o código que copiaste (Ctrl+V ou Cmd+V)

**i) Clica em "Add"**

---

✅ **Agora tens 2 variáveis configuradas:**
```
✓ NEXTAUTH_URL = https://temp.vercel.app
✓ NEXTAUTH_SECRET = xK9mP2vN8qR5tL7wY3zB6cF4hJ0gD1sA (o teu código)
```

---

### PASSO 2.6 - FAZER O DEPLOY!

**DESCE ATÉ AO FUNDO** da página.

Vais ver um **botão GRANDE e AZUL**:
- **"Deploy"**

**CLICA nesse botão!**

⏳ **AGUARDA 2-3 MINUTOS!**

Vais ver:
- Uma animação a rodar
- Logs/texto a aparecer
- Progresso: "Building..." → "Deploying..."

**QUANDO TERMINAR**, vais ver:
```
🎉 Congratulations!
Your project has been deployed.

🌐 https://projeto-study-mate-abc123.vercel.app
```

✅ **COPIA ESSA URL!** (é importante!)

---

## 🗄️ PARTE 3: CRIAR BASE DE DADOS (5 min)

### PASSO 3.1 - Ir para Storage

Agora estás na página do projeto deployed.

**NO TOPO**, vês várias **TABS (abas) horizontais**:
```
Overview  |  Deployments  |  Analytics  |  Logs  |  Storage  |  Settings
```

**CLICA na tab "Storage"**

---

### PASSO 3.2 - Criar Database

Na página Storage, vais ver cards/botões para diferentes tipos de storage.

**PROCURA pelo card do POSTGRES** (tem um logo de elefante azul 🐘).

Pode estar escrito:
- **"Postgres"** OU
- **"PostgreSQL"** OU
- **"Vercel Postgres"**

**CLICA nesse card**

---

### PASSO 3.3 - Configurar Postgres

Vai abrir uma janela ou nova página com formulário.

Preenche assim:

**a) Database Name:**
```
studymate
```

**b) Region:** (escolhe no dropdown)
```
Frankfurt, Germany (ams1)
```
OU qualquer região da Europa mais próxima

**c) Plan:** ⚠️ **MUITO IMPORTANTE!**

**No dropdown de Plan**, escolhe:
```
Hobby - $0/month
```

**NÃO escolhas Pro ou Enterprise!**

**d) Clica no botão grande:**
```
Create Database
```

⏳ Aguarda 30 segundos...

Vai aparecer:
```
✅ Database created successfully!
```

---

## ⚙️ PARTE 4: ATUALIZAR VARIÁVEIS (2 min)

### PASSO 4.1 - Ir para Settings

**NO TOPO**, clica na tab:
```
Settings
```

---

### PASSO 4.2 - Environment Variables

**NO MENU LATERAL ESQUERDO**, clica em:
```
Environment Variables
```

---

### PASSO 4.3 - Editar NEXTAUTH_URL

Vais ver a lista das tuas variáveis:

```
NEXTAUTH_URL = https://temp.vercel.app  [...]
NEXTAUTH_SECRET = xK9mP2vN... [...]
```

**a) Ao lado de NEXTAUTH_URL**, clica nos **3 pontinhos** (⋯)

**b) No menu que abre**, clica em:
```
Edit
```

**c) No campo Value**, APAGA `https://temp.vercel.app`

**d) COLA a URL verdadeira** que copiaste antes (ex: `https://projeto-study-mate-abc123.vercel.app`)

**e) Clica em "Save"**

✅ NEXTAUTH_URL atualizado!

---

## 🔄 PARTE 5: REDEPLOY (2 min)

### PASSO 5.1 - Ir para Deployments

**NO TOPO**, clica na tab:
```
Deployments
```

---

### PASSO 5.2 - Redeploy

Vais ver uma **lista de deploys**. O mais recente está no topo.

**AO LADO do deploy mais recente**, clica nos **3 pontinhos** (⋯)

**No menu**, clica em:
```
Redeploy
```

Vai abrir uma janela de confirmação.

**Clica em "Redeploy"** de novo para confirmar.

⏳ Aguarda 1-2 minutos...

Quando aparecer:
```
✅ Deployment Ready
```

Está pronto!

---

## 🎊 PARTE 6: USAR A APLICAÇÃO! (30 seg)

### PASSO 6.1 - Inicializar Dados

**NO BROWSER**, abre um NOVO TAB.

**Na barra de endereço**, cola a tua URL + `/api/init-db`:

```
https://projeto-study-mate-abc123.vercel.app/api/init-db
```
(Substitui pela TUA URL verdadeira!)

**Pressiona Enter**

Vais ver:
```json
{"message":"Database initialized successfully","success":true}
```

✅ Dados criados!

---

### PASSO 6.2 - Aceder à Aplicação

**Na barra de endereço**, APAGA o `/api/init-db` e deixa só:
```
https://projeto-study-mate-abc123.vercel.app
```

**Pressiona Enter**

Vais ver a **PÁGINA DE LOGIN!** 🎉

---

### PASSO 6.3 - FAZER LOGIN

```
Email:    iris.student@email.com
Password: demo123
```

**Clica em "Entrar"**

✅ **PRONTO! ESTÁS DENTRO! 🎊**

---

## 🎯 O QUE PODES FAZER:

- ✅ Ver o Dashboard com progresso
- ✅ Navegar pelas disciplinas
- ✅ Ver o Tutor IA (chat)
- ✅ Explorar exames
- ✅ Ver plano de estudo
- ✅ Tudo funcional!

---

## 📱 ACESSO DE QUALQUER LUGAR:

A aplicação está **ONLINE 24/7**!

Podes aceder de:
- 💻 PC/Laptop
- 📱 Telemóvel
- 📊 Tablet

Basta abrir o link: `https://projeto-study-mate-abc123.vercel.app`

---

## ❓ PROBLEMAS?

### Erro: "No Next.js version detected"

**Solução:**
1. Vai a Settings → General
2. Desce até "Root Directory"
3. Verifica se está `./` (raiz)
4. Se não estiver, muda para `./`
5. Redeploy

### Erro 500 ao fazer login

**Solução:**
1. Certifica-te que acedeste `/api/init-db` primeiro
2. Vai a Settings → Storage
3. Verifica se a base de dados Postgres está lá
4. Se não estiver, cria conforme PARTE 3

### Base de dados vazia

**Solução:**
- Acede de novo: `https://tua-url.vercel.app/api/init-db`
- Deve mostrar success

---

## 🎉 PARABÉNS!

Aplicação **ONLINE e FUNCIONAL!**

URL: `https://tua-url.vercel.app`
Login: `iris.student@email.com` / `demo123`

---

**Desenvolvido com ❤️**
Versão: 1.0
Data: Dezembro 2024
