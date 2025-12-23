'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Play, PlayCircle } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import SectionRow from '@/components/layout/SectionRow';

const MOCK_SUBJECTS = [
  { id: 1, name: 'Matemática A', average: 16.2, progress: 75, color: 'from-blue-600 to-indigo-900', icon: '📐', next: 'Complexos' },
  { id: 2, name: 'Física e Química', average: 15.4, progress: 60, color: 'from-purple-600 to-fuchsia-900', icon: '⚛️', next: 'Mecânica' },
  { id: 3, name: 'Biologia', average: 14.8, progress: 45, color: 'from-emerald-600 to-teal-900', icon: '🧬', next: 'Genética' },
  { id: 4, name: 'Português', average: 15.0, progress: 80, color: 'from-orange-600 to-red-900', icon: '📚', next: 'Os Maias' },
  { id: 5, name: 'Inglês', average: 18.5, progress: 90, color: 'from-sky-600 to-blue-900', icon: '🇬🇧', next: 'Grammar' },
];

export default function DashboardPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const firstName = session?.user?.name?.split(' ')[0] || 'Iris';

  return (
    <div className="animate-fade-in pb-12">
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] min-h-[400px] mb-8 overflow-hidden flex items-end pb-12 px-6 md:px-12">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#0f0f13]"></div>
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[80%] bg-indigo-900/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[60%] bg-purple-900/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 w-full max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center text-sm font-bold text-white shadow-lg">
              {session?.user?.name?.slice(0, 2).toUpperCase() || 'IM'}
            </div>
            <span className="text-gray-400 font-medium">Bom dia, {firstName}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
            Pronta para dominar <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Geometria no Espaço?
            </span>
          </h1>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => router.push('/plan')}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-indigo-900/20"
            >
              <PlayCircle className="w-5 h-5" /> Continuar Lição
            </button>
            <div className="flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/5 rounded-xl backdrop-blur-md">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-[#0f0f13] flex items-center justify-center text-[10px] text-white font-bold">
                  M
                </div>
                <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-[#0f0f13] flex items-center justify-center text-[10px] text-white font-bold">
                  F
                </div>
              </div>
              <span className="text-gray-300 text-sm font-medium">2 Tarefas restantes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
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

        {/* Subjects */}
        <SectionRow title="Disciplinas" onViewAll={() => router.push('/subjects')}>
          {MOCK_SUBJECTS.map((sub) => (
            <div
              key={sub.id}
              onClick={() => router.push('/subjects')}
              className="min-w-[200px] h-28 relative rounded-2xl overflow-hidden cursor-pointer group border border-white/5 bg-[#1e1e24] hover:bg-[#25252b] transition-colors"
            >
              <div className="absolute inset-0 p-5 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-2xl">{sub.icon}</span>
                  <span className="text-xs font-bold text-gray-500 bg-black/20 px-2 py-1 rounded-lg">
                    {sub.average} val
                  </span>
                </div>
                <span className="font-bold text-white text-base">{sub.name}</span>
              </div>
            </div>
          ))}
        </SectionRow>
      </div>
    </div>
  );
}
