'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import {
  LayoutDashboard,
  BookOpen,
  MessageSquare,
  GraduationCap,
  Calendar,
  Library,
  PieChart,
  Brain,
  Trophy,
  Settings,
  LogOut,
} from 'lucide-react';

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Início', icon: LayoutDashboard, href: '/' },
  { id: 'subjects', label: 'Disciplinas', icon: BookOpen, href: '/subjects' },
  { id: 'tutor', label: 'Tutor IA', icon: MessageSquare, href: '/tutor' },
  { id: 'exams', label: 'Exames', icon: GraduationCap, href: '/exams' },
  { id: 'plan', label: 'Plano de Estudo', icon: Calendar, href: '/plan' },
  { id: 'library', label: 'Biblioteca', icon: Library, href: '/library' },
  { id: 'stats', label: 'Progresso', icon: PieChart, href: '/stats' },
  { id: 'practice', label: 'Prática', icon: Brain, href: '/practice' },
];

const SECONDARY_ITEMS = [
  { id: 'achievements', label: 'Conquistas', icon: Trophy, href: '/achievements' },
  { id: 'settings', label: 'Configurações', icon: Settings, href: '/settings' },
];

interface SidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export default function Sidebar({ isMobileOpen, setIsMobileOpen }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const handleNavigation = (href: string) => {
    router.push(href);
    setIsMobileOpen(false);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      <aside
        className={`
        fixed top-0 left-0 z-50 h-screen w-72 bg-[#121216] text-gray-400 transition-transform duration-300 ease-out border-r border-white/5
        md:translate-x-0 md:static flex flex-col
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
      >
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
              onClick={() => handleNavigation(item.href)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                isActive(item.href)
                  ? 'bg-indigo-600/10 text-indigo-400'
                  : 'hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive(item.href) ? 'text-indigo-500' : 'text-gray-500'}`} />
              {item.label}
            </button>
          ))}

          <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-8 mb-2">Geral</p>
          {SECONDARY_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.href)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                isActive(item.href)
                  ? 'bg-indigo-600/10 text-indigo-400'
                  : 'hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive(item.href) ? 'text-indigo-500' : 'text-gray-500'}`} />
              {item.label}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-white/5">
          <div
            onClick={() => handleNavigation('/profile')}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors border border-transparent hover:border-white/5"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-pink-900/20">
              {session?.user?.name?.slice(0, 2).toUpperCase() || 'IM'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{session?.user?.name || 'Iris M.'}</p>
              <p className="text-xs text-gray-500 truncate">Ciências • 12º Ano</p>
            </div>
            <LogOut
              className="w-4 h-4 text-gray-500 hover:text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleLogout();
              }}
            />
          </div>
        </div>
      </aside>
    </>
  );
}
