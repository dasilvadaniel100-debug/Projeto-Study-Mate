import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BookOpen,
  Brain,
  Calendar,
  ChevronRight,
  GraduationCap,
  LayoutDashboard,
  Library,
  MessageSquare,
  MoreVertical,
  PieChart,
  Play,
  Settings,
  Target,
  Trophy,
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
  Flame,
  Search,
  Bell,
  Menu,
  X,
  LogOut,
  Lock,
  Mail,
  ArrowRight,
  FileText,
  Upload,
  BarChart3,
  Award,
  Edit2,
  Save,
  Moon,
  Volume2,
  Info,
  Plus,
  PlayCircle,
  Sparkles,
  Zap,
  Filter,
  Download,
  Share2
} from 'lucide-react';

// --- Constants & Mock Data ---

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Início', icon: LayoutDashboard },
  { id: 'subjects', label: 'Disciplinas', icon: BookOpen },
  { id: 'tutor', label: 'Tutor IA', icon: MessageSquare },
  { id: 'exams', label: 'Exames', icon: GraduationCap },
  { id: 'plan', label: 'Plano de Estudo', icon: Calendar },
  { id: 'library', label: 'Biblioteca', icon: Library },
  { id: 'stats', label: 'Progresso', icon: PieChart },
  { id: 'practice', label: 'Prática', icon: Brain },
];

const SECONDARY_ITEMS = [
  { id: 'gamification', label: 'Conquistas', icon: Trophy },
  { id: 'settings', label: 'Configurações', icon: Settings },
];

const MOCK_SUBJECTS = [
  { id: 1, name: 'Matemática A', average: 16.2, progress: 75, color: 'from-blue-600 to-indigo-900', icon: '📐', next: 'Complexos' },
  { id: 2, name: 'Física e Química', average: 15.4, progress: 60, color: 'from-purple-600 to-fuchsia-900', icon: '⚛️', next: 'Mecânica' },
  { id: 3, name: 'Biologia', average: 14.8, progress: 45, color: 'from-emerald-600 to-teal-900', icon: '🧬', next: 'Genética' },
  { id: 4, name: 'Português', average: 15.0, progress: 80, color: 'from-orange-600 to-red-900', icon: '📚', next: 'Os Maias' },
  { id: 5, name: 'Inglês', average: 18.5, progress: 90, color: 'from-sky-600 to-blue-900', icon: '🇬🇧', next: 'Grammar' },
];

// --- Shared Components ---

const SectionRow: React.FC<{
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onViewAll?: () => void;
}> = ({ title, subtitle, children, onViewAll }) => (
  <div className="mb-10 pl-6 md:pl-12 group animate-fade-in-up">
    <div className="flex justify-between items-end mb-4 pr-12">
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{title}</h3>
        {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
      </div>
      {onViewAll && (
        <button onClick={onViewAll} className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 uppercase tracking-wider transition-colors">
          Ver Tudo <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
    <div className="flex gap-5 overflow-x-auto overflow-y-hidden pb-8 pt-2 no-scrollbar scroll-smooth pr-12">
      {children}
    </div>
  </div>
);

const GlassCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: any;
}> = ({ children, className = "", onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-[#1e1e24] border border-white/5 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all duration-300 ${className}`}
  >
    {children}
  </div>
);

// --- Login View ---
const LoginView = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 800);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#0f0f13] overflow-hidden font-sans">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
           <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/30">
             <Brain className="w-7 h-7 text-white" />
           </div>
           <h1 className="text-2xl font-bold text-white tracking-tight">Bem-vinda de volta</h1>
           <p className="text-gray-400 text-sm mt-2">StudyMate AI</p>
        </div>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="email"
              required
              className="block w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
              placeholder="Email do aluno"
            />
            <input
              type="password"
              required
              className="block w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
              placeholder="Palavra-passe"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-900/20 flex items-center justify-center gap-2"
          >
            {loading ? <span className="animate-pulse">A entrar...</span> : <>Entrar <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-xs">Esqueceste-te da password? <span className="text-indigo-400 cursor-pointer hover:underline">Recuperar</span></p>
        </div>
      </div>
    </div>
  );
};

// --- Sidebar ---
const Sidebar = ({ activeView, setActiveView, isMobileOpen, setIsMobileOpen, onLogout }) => {
  return (
    <>
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      <aside className={`
        fixed top-0 left-0 z-50 h-screen w-72 bg-[#121216] text-gray-400 transition-transform duration-300 ease-out border-r border-white/5
        md:translate-x-0 md:static flex flex-col
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-20 flex items-center px-8 border-b border-white/5">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <Brain className="w-5 h-5" />
             </div>
             <span className="text-lg font-bold text-white tracking-tight">StudyMate</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
            <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Menu</p>
            {MENU_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveView(item.id); setIsMobileOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  activeView === item.id 
                    ? 'bg-indigo-600/10 text-indigo-400' 
                    : 'hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className={`w-5 h-5 ${activeView === item.id ? 'text-indigo-500' : 'text-gray-500'}`} />
                {item.label}
              </button>
            ))}
            
            <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-8 mb-2">Geral</p>
            {SECONDARY_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveView(item.id); setIsMobileOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  activeView === item.id 
                    ? 'bg-indigo-600/10 text-indigo-400' 
                    : 'hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className={`w-5 h-5 ${activeView === item.id ? 'text-indigo-500' : 'text-gray-500'}`} />
                {item.label}
              </button>
            ))}
        </div>

        <div className="p-4 border-t border-white/5">
          <div 
            onClick={() => setActiveView('profile')}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors border border-transparent hover:border-white/5"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-pink-900/20">IM</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">Iris M.</p>
              <p className="text-xs text-gray-500 truncate">Ciências • 12º Ano</p>
            </div>
            <LogOut 
                className="w-4 h-4 text-gray-500 hover:text-white transition-colors" 
                onClick={(e) => { e.stopPropagation(); onLogout(); }}
            />
          </div>
        </div>
      </aside>
    </>
  );
};

// --- Functional Views ---

const SubjectsView = () => (
  <div className="animate-fade-in pt-8 px-6 md:px-12 pb-12">
    <div className="flex justify-between items-end mb-8">
        <div>
            <h2 className="text-3xl font-bold text-white mb-2">Disciplinas</h2>
            <p className="text-gray-400">Gere o teu progresso curricular.</p>
        </div>
    </div>
    
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {MOCK_SUBJECTS.map((sub) => (
        <GlassCard key={sub.id} className="relative group cursor-pointer hover:bg-[#25252b] h-64 flex flex-col justify-between p-6">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${sub.color} blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity rounded-full -mr-10 -mt-10`}></div>
            
            <div className="relative z-10 flex justify-between items-start">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-2xl border border-white/5 group-hover:scale-110 transition-transform duration-300">
                    {sub.icon}
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-2xl font-bold text-white">{sub.average}</span>
                    <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Média Atual</span>
                </div>
            </div>

            <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{sub.name}</h3>
                <p className="text-sm text-gray-400 mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                    Próximo: {sub.next}
                </p>
                
                <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-400 font-medium">
                        <span>Progresso Anual</span>
                        <span>{sub.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${sub.color} rounded-full`} style={{ width: `${sub.progress}%` }}></div>
                    </div>
                </div>
            </div>
        </GlassCard>
    ))}
    </div>
  </div>
);

const ExamsView = () => (
  <div className="animate-fade-in pt-8 px-6 md:px-12 pb-12 space-y-10">
    <div className="flex justify-between items-center">
        <div>
            <h2 className="text-3xl font-bold text-white mb-2">Simulador de Exames</h2>
            <p className="text-gray-400">Prepara-te com testes reais de anos anteriores.</p>
        </div>
    </div>
    
    <div className="relative w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-purple-900/40 z-10"></div>
      <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1600" className="w-full h-80 object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" alt="Exams" />
      
      <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16">
         <div className="flex items-center gap-3 mb-4">
             <span className="bg-white/10 text-white border border-white/20 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3 h-3" /> Cronometrado
             </span>
             <span className="text-indigo-200 font-medium tracking-wide text-sm">NOVO MODELO 2024</span>
         </div>
         <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">Exame Matemática A</h3>
         <p className="text-gray-200 text-lg max-w-xl mb-8 leading-relaxed">
             Simulação completa com duração oficial. Inclui critérios de correção passo-a-passo.
         </p>
         <div className="flex items-center gap-4">
             <button className="px-8 py-3.5 bg-white text-indigo-900 font-bold rounded-xl flex items-center gap-2 hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                 <Play className="w-5 h-5 fill-indigo-900" /> Iniciar Simulação
             </button>
         </div>
      </div>
    </div>

    <div>
      <h3 className="text-xl font-bold text-white mb-6">Histórico de Provas</h3>
      <div className="space-y-3">
        {[
          { title: 'Matemática A - 2023 1ª Fase', date: 'Ontem', score: '15.4', status: 'Corrigido', color: 'text-green-400 bg-green-400/10' },
          { title: 'FQ A - Teste Intermédio', date: '3 dias atrás', score: '14.2', status: 'Corrigido', color: 'text-green-400 bg-green-400/10' },
          { title: 'Biologia - Exame Modelo', date: 'Semana passada', score: '--', status: 'Em Pausa', color: 'text-yellow-400 bg-yellow-400/10' },
        ].map((exam, i) => (
          <div key={i} className="flex items-center justify-between p-5 bg-[#1e1e24] hover:bg-[#25252b] border border-white/5 rounded-2xl transition-all cursor-pointer group">
            <div className="flex items-center gap-5">
               <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-indigo-600 transition-all">
                  <FileText className="w-6 h-6" />
               </div>
               <div>
                  <h4 className="font-bold text-white text-lg">{exam.title}</h4>
                  <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-gray-500">{exam.date}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${exam.color}`}>{exam.status}</span>
                  </div>
               </div>
            </div>
            <div className="text-right">
                <span className="text-2xl font-bold text-white block">{exam.score}</span>
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Valores</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const PlanView = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Resolver 10 ex. Complexos', done: false, subject: 'Matemática', time: '10:00' },
    { id: 2, text: 'Ler Cap. 4 Biologia', done: true, subject: 'Biologia', time: '11:30' },
    { id: 3, text: 'Resumo Física (Mecânica)', done: false, subject: 'Física', time: '14:00' },
    { id: 4, text: 'Verbo To Be', done: false, subject: 'Inglês', time: '16:00' },
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <div className="animate-fade-in pt-8 px-6 md:px-12 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
         <div>
            <h2 className="text-3xl font-bold text-white">Plano Semanal</h2>
            <p className="text-gray-400 mt-1">Tens 3 tarefas pendentes para hoje.</p>
         </div>
         <div className="flex items-center bg-[#1e1e24] rounded-xl p-1 border border-white/5">
           <button className="p-2 hover:bg-white/5 rounded-lg text-gray-400"><ChevronRight className="w-5 h-5 rotate-180" /></button>
           <span className="px-6 py-1 text-sm font-medium text-white">23 Out - 29 Out</span>
           <button className="p-2 hover:bg-white/5 rounded-lg text-gray-400"><ChevronRight className="w-5 h-5" /></button>
         </div>
      </div>

      <div className="grid grid-cols-7 gap-3 mb-10">
        {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((d, i) => {
            const isActive = i === 2;
            return (
                <div key={i} className={`h-28 rounded-2xl border flex flex-col items-center justify-center cursor-pointer transition-all ${
                    isActive 
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-900/30 scale-105' 
                    : 'bg-[#1e1e24] border-white/5 text-gray-500 hover:border-white/20 hover:bg-[#25252b]'
                }`}>
                    <span className="text-xs font-bold mb-2">{d}</span>
                    <span className={`text-2xl font-bold ${isActive ? 'text-white' : 'text-gray-300'}`}>{23+i}</span>
                    <div className="flex gap-1 mt-3">
                        <div className={`w-1 h-1 rounded-full ${isActive ? 'bg-white' : 'bg-gray-600'}`}></div>
                        {i % 2 === 0 && <div className={`w-1 h-1 rounded-full ${isActive ? 'bg-white/50' : 'bg-gray-600'}`}></div>}
                    </div>
                </div>
            )
        })}
      </div>

      <div>
        <h3 className="text-xl font-bold text-white mb-6">Agenda de Hoje</h3>
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <div key={task.id} onClick={() => toggleTask(task.id)} className={`flex items-center p-5 rounded-2xl border transition-all cursor-pointer group ${
                task.done 
                ? 'bg-[#1e1e24]/50 border-white/5 opacity-60' 
                : 'bg-[#1e1e24] border-white/5 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-900/10'
            }`}>
               <div className="flex flex-col items-center mr-6 min-w-[3rem]">
                   <span className="text-xs text-gray-500 font-medium">Início</span>
                   <span className="text-sm font-bold text-white">{task.time}</span>
               </div>
               
               <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-5 transition-colors ${
                   task.done ? 'bg-green-500/20 text-green-500' : 'bg-indigo-500/20 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white'
               }`}>
                   {task.done ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
               </div>

               <div className="flex-1">
                   <h4 className={`font-bold text-lg mb-1 ${task.done ? 'text-gray-500 line-through' : 'text-white'}`}>{task.text}</h4>
                   <div className="flex items-center gap-2">
                       <span className="text-xs font-bold px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5">{task.subject}</span>
                   </div>
               </div>
               
               <div className="w-6 h-6 rounded-full border-2 border-white/20 group-hover:border-indigo-500 flex items-center justify-center">
                   {task.done && <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>}
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TutorView = () => (
    <div className="h-[calc(100vh-80px)] flex flex-col pt-6 px-4 md:px-8 pb-4">
      <div className="flex-1 flex flex-col bg-[#1e1e24] rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-[#25252b]">
            <div className="flex items-center gap-4">
                <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <Brain className="w-7 h-7 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#25252b] rounded-full flex items-center justify-center">
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                </div>
                <div>
                    <h2 className="font-bold text-white text-lg">Tutor AI</h2>
                    <p className="text-xs text-gray-400">Sempre disponível para te ajudar.</p>
                </div>
            </div>
            <button className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors">
                <MoreVertical className="w-5 h-5" />
            </button>
        </div>
        
        <div className="flex-1 p-6 overflow-y-auto space-y-8">
            <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 flex-shrink-0 flex items-center justify-center mt-1"><Brain className="w-5 h-5 text-indigo-400" /></div>
                <div className="bg-[#2d2d36] p-5 rounded-2xl rounded-tl-none text-gray-200 text-sm leading-relaxed max-w-[85%] border border-white/5 shadow-sm">
                    <p className="mb-3">Olá Iris! 👋 Analisei o teu último teste de Probabilidades.</p>
                    <p>Reparei que tiveste algumas dificuldades no <strong>Teorema de Bayes</strong>. Queres que te explique o conceito com um exemplo prático ou preferes tentar resolver um exercício guiado?</p>
                </div>
            </div>
            <div className="flex gap-4 flex-row-reverse">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-500 flex-shrink-0 flex items-center justify-center mt-1 text-white font-bold text-sm shadow-lg shadow-pink-900/20">IM</div>
                <div className="bg-indigo-600 p-5 rounded-2xl rounded-tr-none text-white text-sm leading-relaxed max-w-[85%] shadow-md shadow-indigo-900/10">
                    <p>Prefiro um exercício guiado, por favor. Algo relacionado com bolas coloridas em sacos, costumam sair no exame.</p>
                </div>
            </div>
             <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 flex-shrink-0 flex items-center justify-center mt-1"><Brain className="w-5 h-5 text-indigo-400" /></div>
                <div className="bg-[#2d2d36] p-4 rounded-2xl rounded-tl-none border border-white/5 flex items-center gap-3">
                   <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></span>
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></span>
                   </div>
                   <span className="text-xs text-gray-500 font-medium">A gerar exercício...</span>
                </div>
            </div>
        </div>

        <div className="p-4 bg-[#25252b] border-t border-white/5">
            <div className="flex items-center gap-3 bg-[#1e1e24] p-2 pr-3 rounded-xl border border-white/5 focus-within:border-indigo-500/50 transition-colors">
                <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"><Plus className="w-5 h-5" /></button>
                <input type="text" placeholder="Escreve a tua dúvida..." className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-gray-500" />
                <button className="p-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-900/20"><ArrowRight className="w-4 h-4" /></button>
            </div>
        </div>
      </div>
    </div>
);

const LibraryView = () => (
  <div className="animate-fade-in pt-8 px-6 md:px-12 pb-12">
    <div className="flex justify-between items-center mb-8">
        <div>
           <h2 className="text-3xl font-bold text-white mb-2">Biblioteca</h2>
           <p className="text-gray-400">Os teus materiais de estudo e resumos.</p>
        </div>
        <button className="px-5 py-2.5 bg-indigo-600 text-white font-bold rounded-xl flex items-center gap-2 hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-900/20">
            <Upload className="w-4 h-4" /> Upload
        </button>
    </div>
    
    <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-64 space-y-2">
            <button className="w-full text-left px-4 py-3 bg-indigo-600/10 text-indigo-400 rounded-xl font-bold text-sm border border-indigo-500/20">Tudo</button>
            <button className="w-full text-left px-4 py-3 hover:bg-white/5 text-gray-400 rounded-xl font-medium text-sm transition-colors">Resumos</button>
            <button className="w-full text-left px-4 py-3 hover:bg-white/5 text-gray-400 rounded-xl font-medium text-sm transition-colors">Fichas de Trabalho</button>
            <button className="w-full text-left px-4 py-3 hover:bg-white/5 text-gray-400 rounded-xl font-medium text-sm transition-colors">Exames Passados</button>
        </div>
        
        <div className="flex-1 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
             {[
                { name: 'Resumo Derivadas.pdf', size: '2.4 MB', date: '20 Out', type: 'PDF' },
                { name: 'Mecânica - FQ.pdf', size: '1.1 MB', date: '18 Out', type: 'PDF' },
                { name: 'Verbos Irregulares.docx', size: '500 KB', date: '15 Out', type: 'DOC' },
                { name: 'Apontamentos Bio.pdf', size: '3.2 MB', date: '10 Out', type: 'PDF' },
                { name: 'Formulário Exame.pdf', size: '1.2 MB', date: '05 Out', type: 'PDF' },
             ].map((file, i) => (
                <GlassCard key={i} className="p-4 hover:bg-[#25252b] group cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                            <FileText className="w-5 h-5" />
                        </div>
                        <button className="text-gray-500 hover:text-white"><MoreVertical className="w-4 h-4" /></button>
                    </div>
                    <h4 className="font-bold text-white mb-1 truncate">{file.name}</h4>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>{file.size} • {file.date}</span>
                    </div>
                </GlassCard>
             ))}
        </div>
    </div>
  </div>
);

const StatsView = () => (
  <div className="animate-fade-in pt-8 px-6 md:px-12 pb-12">
    <div className="flex justify-between items-end mb-8">
        <div>
           <h2 className="text-3xl font-bold text-white mb-2">Progresso</h2>
           <p className="text-gray-400">Análise detalhada do teu desempenho.</p>
        </div>
        <div className="flex bg-[#1e1e24] p-1 rounded-lg border border-white/5">
            <button className="px-4 py-1.5 bg-white/10 rounded-md text-xs font-bold text-white">Semana</button>
            <button className="px-4 py-1.5 hover:bg-white/5 rounded-md text-xs font-medium text-gray-500 transition-colors">Mês</button>
            <button className="px-4 py-1.5 hover:bg-white/5 rounded-md text-xs font-medium text-gray-500 transition-colors">Ano</button>
        </div>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
        <GlassCard className="p-6">
            <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-500" /> Evolução da Média
            </h3>
            <div className="h-64 flex items-end justify-between px-2 gap-3">
                {[14, 14.5, 14.2, 15.0, 15.5, 15.8, 16.2].map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end gap-2 group">
                        <div className="w-full bg-[#2d2d36] rounded-t-sm relative h-full flex flex-col justify-end overflow-hidden">
                             <div 
                                className="w-full bg-indigo-600 group-hover:bg-indigo-500 transition-all duration-500" 
                                style={{ height: `${(val / 20) * 100}%` }}
                             ></div>
                        </div>
                        <span className="text-center text-xs text-gray-500">{['S', 'T', 'Q', 'Q', 'S', 'S', 'D'][i]}</span>
                    </div>
                ))}
            </div>
        </GlassCard>

        <GlassCard className="p-6">
            <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-500" /> Tempo de Estudo
            </h3>
            <div className="space-y-6">
                 {MOCK_SUBJECTS.slice(0, 4).map(sub => (
                     <div key={sub.id}>
                         <div className="flex justify-between text-sm mb-2">
                             <span className="text-white font-medium">{sub.name}</span>
                             <span className="text-gray-400">{sub.progress * 1.5}h</span>
                         </div>
                         <div className="w-full bg-[#2d2d36] h-2 rounded-full overflow-hidden">
                             <div className={`h-full bg-gradient-to-r ${sub.color}`} style={{ width: `${sub.progress}%` }}></div>
                         </div>
                     </div>
                 ))}
            </div>
        </GlassCard>
    </div>
  </div>
);

const PracticeView = () => (
  <div className="animate-fade-in pt-8 px-6 md:px-12 pb-12">
    <div className="flex justify-between items-center mb-8">
        <div>
           <h2 className="text-3xl font-bold text-white mb-2">Prática</h2>
           <p className="text-gray-400">Gera fichas de exercícios personalizadas.</p>
        </div>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
        <GlassCard className="md:col-span-2 p-8">
            <h3 className="text-xl font-bold text-white mb-6">Configurar Sessão</h3>
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400">Disciplina</label>
                        <select className="w-full bg-[#2d2d36] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option>Matemática A</option>
                            <option>Física e Química</option>
                            <option>Biologia</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                         <label className="text-sm text-gray-400">Tópico</label>
                         <select className="w-full bg-[#2d2d36] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                             <option>Recomendado (IA)</option>
                             <option>Probabilidades</option>
                             <option>Funções</option>
                         </select>
                    </div>
                </div>
                
                <div className="space-y-2">
                    <label className="text-sm text-gray-400">Dificuldade</label>
                    <div className="grid grid-cols-3 gap-4">
                        {['Fácil', 'Médio', 'Difícil'].map(d => (
                            <button key={d} className="py-3 bg-[#2d2d36] hover:bg-[#363640] border border-white/5 rounded-xl text-sm font-bold text-white focus:bg-indigo-600 focus:border-indigo-500 transition-all">{d}</button>
                        ))}
                    </div>
                </div>

                <div className="pt-4">
                    <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-900/20 flex items-center justify-center gap-2">
                        <Play className="w-5 h-5 fill-current" /> Começar Sessão (20 min)
                    </button>
                </div>
            </div>
        </GlassCard>

        <div className="space-y-4">
            <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-6 border border-white/10 relative overflow-hidden">
                <div className="relative z-10">
                    <Brain className="w-8 h-8 text-white mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">Desafio Diário</h3>
                    <p className="text-indigo-200 text-sm mb-4">5 perguntas de raciocínio rápido para aquecer o cérebro.</p>
                    <button className="w-full py-2 bg-white text-indigo-900 font-bold rounded-lg text-sm">Aceitar (+50 XP)</button>
                </div>
                <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            </div>
        </div>
    </div>
  </div>
);

const GamificationView = () => (
  <div className="animate-fade-in pt-8 px-6 md:px-12 pb-12">
     <div className="flex flex-col items-center justify-center py-12 mb-10 bg-gradient-to-b from-indigo-900/20 to-transparent rounded-3xl border border-white/5">
        <div className="relative mb-6">
            <div className="w-32 h-32 rounded-full border-4 border-yellow-500/50 flex items-center justify-center bg-[#1e1e24] shadow-[0_0_40px_rgba(234,179,8,0.2)]">
                <Trophy className="w-14 h-14 text-yellow-500" />
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-black font-bold px-4 py-1 rounded-full text-sm shadow-lg">
                NÍVEL 12
            </div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Cientista em Ascensão</h2>
        <p className="text-gray-400 mb-6">350 XP para o Nível 13</p>
        <div className="w-64 h-2 bg-[#2d2d36] rounded-full overflow-hidden">
            <div className="h-full bg-yellow-500 w-[70%] shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
        </div>
    </div>

    <h3 className="text-xl font-bold text-white mb-6">Medalhas Desbloqueadas</h3>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {[
            { name: 'Primeiros Passos', icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-400/10', unlocked: true },
            { name: '7 Dias Streak', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10', unlocked: true },
            { name: 'Matemático', icon: Brain, color: 'text-blue-400', bg: 'bg-blue-400/10', unlocked: true },
            { name: 'Coruja Noturna', icon: Moon, color: 'text-indigo-400', bg: 'bg-indigo-400/10', unlocked: false },
            { name: '100% Acerto', icon: Target, color: 'text-green-500', bg: 'bg-green-500/10', unlocked: false },
        ].map((badge, i) => (
            <GlassCard key={i} className={`flex flex-col items-center p-6 text-center ${badge.unlocked ? 'opacity-100' : 'opacity-40 grayscale'}`}>
                <div className={`w-14 h-14 rounded-full ${badge.bg} flex items-center justify-center mb-4`}>
                    <badge.icon className={`w-7 h-7 ${badge.color}`} />
                </div>
                <h4 className="font-bold text-white text-sm mb-1">{badge.name}</h4>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">{badge.unlocked ? 'Desbloqueado' : 'Bloqueado'}</span>
            </GlassCard>
        ))}
    </div>
  </div>
);

const SettingsView = () => (
  <div className="animate-fade-in pt-8 px-6 md:px-12 pb-12">
    <h2 className="text-3xl font-bold text-white mb-8">Configurações</h2>
    
    <div className="max-w-2xl space-y-8">
        <GlassCard className="p-6">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-400" /> Perfil e Conta
            </h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Nome de Exibição</label>
                    <input type="text" value="Iris M." className="w-full bg-[#2d2d36] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Email</label>
                    <input type="email" value="iris.student@email.com" disabled className="w-full bg-[#1e1e24] border border-white/5 rounded-xl px-4 py-3 text-gray-500 cursor-not-allowed" />
                </div>
            </div>
        </GlassCard>

        <GlassCard className="p-6">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Bell className="w-5 h-5 text-indigo-400" /> Preferências
            </h3>
            <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                    <span className="text-gray-300">Notificações de Estudo</span>
                    <button className="w-12 h-6 bg-indigo-600 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 shadow-sm"></div></button>
                </div>
                <div className="flex items-center justify-between py-2">
                    <span className="text-gray-300">Modo Foco Automático</span>
                    <button className="w-12 h-6 bg-[#2d2d36] rounded-full relative"><div className="w-4 h-4 bg-gray-400 rounded-full absolute top-1 left-1"></div></button>
                </div>
            </div>
        </GlassCard>
    </div>
  </div>
);

const ProfileView = () => {
    const [isEditing, setIsEditing] = useState(false);
    return (
      <div className="animate-fade-in pt-8 px-6 md:px-12 pb-12">
        <div className="relative mb-20">
            <div className="h-48 w-full bg-gradient-to-r from-indigo-900 to-purple-900 rounded-3xl opacity-50"></div>
            <div className="absolute -bottom-12 left-8 md:left-12 flex items-end gap-6">
                <div className="w-32 h-32 rounded-2xl bg-[#0f0f13] p-1.5">
                    <div className="w-full h-full rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-4xl font-bold text-white shadow-lg">IM</div>
                </div>
                <div className="mb-4">
                    <h1 className="text-3xl font-bold text-white">Iris M.</h1>
                    <p className="text-gray-400">Ciências e Tecnologias • 12º Ano</p>
                </div>
            </div>
            <button className="absolute bottom-4 right-8 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl text-sm font-bold text-white hover:bg-white/20 transition-all flex items-center gap-2">
                <Edit2 className="w-4 h-4" /> Editar Perfil
            </button>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
            {[
                { label: 'Horas Estudadas', val: '142h', icon: Clock, color: 'text-blue-400' },
                { label: 'Exercícios', val: '1,240', icon: Brain, color: 'text-purple-400' },
                { label: 'Média Atual', val: '16.2', icon: Target, color: 'text-green-400' },
                { label: 'Streak Atual', val: '12 Dias', icon: Flame, color: 'text-orange-400' },
            ].map((stat, i) => (
                <GlassCard key={i} className="p-5 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                        <stat.icon className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">{stat.val}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide">{stat.label}</div>
                    </div>
                </GlassCard>
            ))}
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-white">Sobre Mim</h3>
                <GlassCard className="p-6">
                    <p className="text-gray-300 leading-relaxed italic">
                        "Focada em entrar em Medicina! Adoro Biologia, mas preciso de reforçar a Matemática e a Física este ano."
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-gray-400 border border-white/5">#Medicina</span>
                        <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-gray-400 border border-white/5">#Biologia</span>
                        <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-gray-400 border border-white/5">#Focada</span>
                    </div>
                </GlassCard>
            </div>
            <div className="space-y-6">
                 <h3 className="text-xl font-bold text-white">Objetivos</h3>
                 <GlassCard className="p-6 space-y-4">
                     <div>
                         <div className="flex justify-between text-sm mb-2">
                             <span className="text-white font-medium">Média Final Desejada</span>
                             <span className="text-indigo-400 font-bold">18.0</span>
                         </div>
                         <div className="w-full bg-[#2d2d36] h-2 rounded-full overflow-hidden">
                             <div className="h-full bg-indigo-600 w-[90%]"></div>
                         </div>
                     </div>
                     <div>
                         <div className="flex justify-between text-sm mb-2">
                             <span className="text-white font-medium">Exames Praticados</span>
                             <span className="text-indigo-400 font-bold">12/50</span>
                         </div>
                         <div className="w-full bg-[#2d2d36] h-2 rounded-full overflow-hidden">
                             <div className="h-full bg-purple-600 w-[24%]"></div>
                         </div>
                     </div>
                 </GlassCard>
            </div>
        </div>
      </div>
    );
};

// --- Dashboard View (Clean & Modern) ---
const DashboardView = ({ onNavigate }) => {
  return (
    <div className="animate-fade-in pb-12">
      
      {/* "Daily Briefing" Style Hero */}
      <div className="relative w-full h-[50vh] min-h-[400px] mb-8 overflow-hidden flex items-end pb-12 px-6 md:px-12">
         {/* Simple Abstract Background */}
         <div className="absolute inset-0">
             <div className="absolute inset-0 bg-[#0f0f13]"></div>
             <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[80%] bg-indigo-900/20 rounded-full blur-[120px]"></div>
             <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[60%] bg-purple-900/10 rounded-full blur-[100px]"></div>
         </div>
         
         <div className="relative z-10 w-full max-w-4xl">
             <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center text-sm font-bold text-white shadow-lg">IM</div>
                <span className="text-gray-400 font-medium">Bom dia, Iris</span>
             </div>
             
             <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
                 Pronta para dominar <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Geometria no Espaço?</span>
             </h1>
             
             <div className="flex flex-wrap gap-4">
                 <button 
                    onClick={() => onNavigate('plan')}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-indigo-900/20"
                 >
                     <PlayCircle className="w-5 h-5" /> Continuar Lição
                 </button>
                 <div className="flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/5 rounded-xl backdrop-blur-md">
                    <div className="flex -space-x-2">
                         <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-[#0f0f13] flex items-center justify-center text-[10px] text-white font-bold">M</div>
                         <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-[#0f0f13] flex items-center justify-center text-[10px] text-white font-bold">F</div>
                    </div>
                    <span className="text-gray-300 text-sm font-medium">2 Tarefas restantes</span>
                 </div>
             </div>
         </div>
      </div>

      {/* Content Rows */}
      <div className="relative z-20 -mt-4 px-0">
          
          {/* Continue Learning */}
          <SectionRow title="Continuar a Estudar" subtitle="Baseado na tua última sessão">
              {[
                  { title: 'Derivadas', sub: 'Matemática A', progress: 85, color: 'from-blue-600 to-indigo-600', icon: '📉' },
                  { title: 'Leis de Newton', sub: 'Física', progress: 40, color: 'from-purple-600 to-fuchsia-600', icon: '🍎' },
                  { title: 'Metabolismo', sub: 'Biologia', progress: 10, color: 'from-emerald-600 to-teal-600', icon: '🌿' },
              ].map((item, i) => (
                  <GlassCard key={i} className="min-w-[280px] p-5 cursor-pointer group hover:bg-[#25252b]">
                      <div className="flex justify-between items-start mb-4">
                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl shadow-lg`}>
                              {item.icon}
                          </div>
                          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                              <Play className="w-3 h-3 fill-current" />
                          </div>
                      </div>
                      
                      <h4 className="font-bold text-white text-lg mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-500 mb-4">{item.sub}</p>
                      
                      <div className="space-y-1.5">
                          <div className="flex justify-between text-xs text-gray-400 font-medium">
                              <span>{item.progress}% Concluído</span>
                          </div>
                          <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                              <div className={`h-full bg-gradient-to-r ${item.color} rounded-full`} style={{ width: `${item.progress}%` }}></div>
                          </div>
                      </div>
                  </GlassCard>
              ))}
          </SectionRow>

          {/* Subjects Tiles */}
          <SectionRow title="Disciplinas" onViewAll={() => onNavigate('subjects')}>
               {MOCK_SUBJECTS.map((sub) => (
                 <div key={sub.id} onClick={() => onNavigate('subjects')} className="min-w-[200px] h-28 relative rounded-2xl overflow-hidden cursor-pointer group border border-white/5 bg-[#1e1e24] hover:bg-[#25252b] transition-colors">
                     <div className="absolute inset-0 p-5 flex flex-col justify-between">
                         <div className="flex justify-between items-start">
                             <span className="text-2xl">{sub.icon}</span>
                             <span className="text-xs font-bold text-gray-500 bg-black/20 px-2 py-1 rounded-lg">{sub.average} val</span>
                         </div>
                         <span className="font-bold text-white text-base">{sub.name}</span>
                     </div>
                 </div>
               ))}
          </SectionRow>
      </div>
    </div>
  );
};

// --- Main App Component ---

const App = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) return <LoginView onLogin={() => setIsAuthenticated(true)} />;

  return (
    <div className="flex h-screen bg-[#0f0f13] font-sans text-gray-100 overflow-hidden">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        isMobileOpen={isMobileOpen} 
        setIsMobileOpen={setIsMobileOpen} 
        onLogout={() => setIsAuthenticated(false)} 
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* Floating Header */}
        <header className="fixed top-0 right-0 left-0 md:left-72 h-20 z-40 flex items-center justify-between px-6 md:px-12 pointer-events-none">
          <div className="pointer-events-auto md:hidden">
             <button onClick={() => setIsMobileOpen(true)} className="p-2 bg-black/40 backdrop-blur-md rounded-xl text-white border border-white/10"><Menu className="w-6 h-6" /></button>
          </div>
          <div className="flex-1"></div> 
          <div className="flex items-center gap-3 pointer-events-auto bg-black/40 backdrop-blur-md p-1.5 rounded-2xl border border-white/5 shadow-lg">
             <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
                <Search className="w-5 h-5" />
             </button>
             <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#0f0f13]"></span>
             </button>
             <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center text-xs font-bold text-white cursor-pointer ml-1" onClick={() => setActiveView('profile')}>
                 IM
             </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth bg-[#0f0f13]">
          <div className="w-full">
            {activeView === 'dashboard' ? <DashboardView onNavigate={setActiveView} /> : (
                // Container for other views
                <div className="pt-20 min-h-screen">
                     {activeView === 'subjects' && <SubjectsView />}
                     {activeView === 'tutor' && <TutorView />}
                     {activeView === 'exams' && <ExamsView />}
                     {activeView === 'plan' && <PlanView />}
                     {activeView === 'library' && <LibraryView />}
                     {activeView === 'stats' && <StatsView />} 
                     {activeView === 'practice' && <PracticeView />}
                     {activeView === 'gamification' && <GamificationView />}
                     {activeView === 'settings' && <SettingsView />}
                     {activeView === 'profile' && <ProfileView />}
                </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);