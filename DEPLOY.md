# 🚀 Deploy StudyMate no Vercel

## Passo a Passo (100% Grátis)

### 1️⃣ Preparar Repositório no GitHub

✅ **Já está pronto!** O código já está no GitHub.

### 2️⃣ Criar Conta no Vercel

1. Vai a: https://vercel.com/signup
2. Clica em **"Continue with GitHub"**
3. Autoriza o Vercel a aceder ao GitHub
4. ✅ Conta criada! **Sem cartão de crédito necessário**

### 3️⃣ Fazer Deploy

1. **No Vercel Dashboard**, clica em **"Add New..."** → **"Project"**

2. **Importa o repositório:**
   - Procura: `Projeto-Study-Mate`
   - Clica em **"Import"**

3. **Configurar projeto:**
   - **Framework Preset:** Next.js (detecta automaticamente)
   - **Root Directory:** `study-mate-app`
   - **Build Command:** `npm run build` (deixa o padrão)
   - **Output Directory:** `.next` (deixa o padrão)

4. **Adicionar Base de Dados Postgres:**
   - No projeto, vai a **"Storage"** (menu lateral)
   - Clica em **"Create Database"**
   - Escolhe **"Postgres"**
   - Escolhe o plano **"Hobby" (GRÁTIS)**
   - Nome: `studymate-db`
   - Região: escolhe a mais próxima (ex: Frankfurt)
   - Clica em **"Create"**
   - ✅ Base de dados criada!

5. **Variáveis de Ambiente:**

   Vai a **Settings** → **Environment Variables** e adiciona:

   ```
   NEXTAUTH_URL=https://seu-projeto.vercel.app
   NEXTAUTH_SECRET=cole-o-valor-abaixo
   ```

   **Para gerar o NEXTAUTH_SECRET:**
   - Abre o terminal
   - Executa: `openssl rand -base64 32`
   - Copia o resultado
   - Cola no valor de `NEXTAUTH_SECRET`

   **OU se não tens openssl:**
   - Usa este site: https://generate-secret.vercel.app/32
   - Copia o resultado
   - Cola no valor de `NEXTAUTH_SECRET`

6. **Fazer Deploy:**
   - Clica em **"Deploy"**
   - Aguarda 1-2 minutos
   - ✅ Deploy completo!

### 4️⃣ Inicializar Base de Dados

Depois do deploy:

1. **Acede à URL do projeto** (ex: `https://studymate-xyz.vercel.app`)

2. **Inicializa os dados:**
   - Acede a: `https://studymate-xyz.vercel.app/api/init-db`
   - Deves ver: `{"message":"Database initialized successfully"}`

3. **Pronto!** Agora vai a página inicial e faz login:
   ```
   Email:    iris.student@email.com
   Password: demo123
   ```

---

## ✅ Tudo Pronto!

A tua aplicação está **online 24/7** e acessível de qualquer lugar!

### 🌐 URLs Importantes

- **App:** `https://seu-projeto.vercel.app`
- **Dashboard Vercel:** https://vercel.com/dashboard
- **Configurações:** Settings → Environment Variables

---

## 🔄 Atualizações Automáticas

Sempre que fizeres `git push` para o GitHub:
- ✅ Vercel faz **deploy automático**
- ✅ Sem necessidade de fazer nada manual
- ✅ Nova versão fica online em ~1 minuto

---

## 📊 Monitorização

No Dashboard do Vercel podes ver:
- 📈 Número de visitantes
- ⚡ Performance da aplicação
- 🐛 Erros e logs
- 💾 Uso de base de dados

---

## 💰 Custos

**100% GRÁTIS para sempre!**

Plano Hobby do Vercel inclui:
- ✅ Hosting ilimitado
- ✅ 100GB de bandwidth/mês
- ✅ PostgreSQL com 256MB (suficiente para centenas de utilizadores)
- ✅ SSL/HTTPS automático
- ✅ Deploy automático

---

## 🆘 Problemas Comuns

### Deploy falha com erro de build

**Solução:**
- Verifica se escolheste `study-mate-app` como Root Directory
- Verifica os logs de erro no Vercel

### Base de dados não conecta

**Solução:**
- Verifica se criaste a base de dados Postgres no Vercel
- Verifica se as variáveis de ambiente estão configuradas
- Tenta fazer redeploy: Deployments → ... → Redeploy

### Página mostra erro 500

**Solução:**
- Acede primeiro a `/api/init-db` para inicializar
- Verifica os logs em: Deployments → [último deploy] → Logs

---

## 🎓 Próximos Passos

Depois de tudo funcionar:

1. **Personaliza o domínio** (opcional):
   - Settings → Domains
   - Adiciona um domínio personalizado

2. **Convida utilizadores teste**

3. **Monitoriza o uso** no Dashboard Vercel

---

**Qualquer dúvida, verifica os logs no Vercel ou a documentação:** https://vercel.com/docs
