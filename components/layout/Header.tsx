'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Search, Bell, Menu } from 'lucide-react';

interface HeaderProps {
  setIsMobileOpen: (open: boolean) => void;
}

export default function Header({ setIsMobileOpen }: HeaderProps) {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 right-0 left-0 md:left-72 h-20 z-40 flex items-center justify-between px-6 md:px-12 pointer-events-none">
      <div className="pointer-events-auto md:hidden">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 bg-black/40 backdrop-blur-md rounded-xl text-white border border-white/10"
        >
          <Menu className="w-6 h-6" />
        </button>
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
        <div
          className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center text-xs font-bold text-white cursor-pointer ml-1"
          onClick={() => router.push('/profile')}
        >
          {session?.user?.name?.slice(0, 2).toUpperCase() || 'IM'}
        </div>
      </div>
    </header>
  );
}
