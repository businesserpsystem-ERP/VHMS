
import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Settings, User, ChevronDown, Command, Coins, LogOut, Globe, Clock, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { UserRole } from '../types';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

interface TopBarProps {
  sidebarOpen: boolean;
  onOpenCommandPalette: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ sidebarOpen, onOpenCommandPalette }) => {
  const { currentUser, role, activeBranchId, setBranch, switchRole, logout } = useAuth();
  const { currency, toggleCurrency, branches } = useData();
  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isBranchOpen, setIsBranchOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const dropdownRef = useRef<HTMLDivElement>(null);
  const branchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (branchRef.current && !branchRef.current.contains(event.target as Node)) {
        setIsBranchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRoleSwitch = (newRole: UserRole) => {
    switchRole(newRole);
    setIsProfileOpen(false);
    navigate('/');
  };

  const currentBranchName = activeBranchId === 'consolidated'
    ? 'Consolidated View'
    : branches.find(b => b.id === activeBranchId)?.name || 'Main Branch';

  return (
    <div
      className={`fixed top-0 right-0 h-16 bg-white/80 backdrop-blur-2xl border-b border-slate-200/50 z-40 flex items-center justify-between px-10 transition-all duration-300 print:hidden ${sidebarOpen ? 'left-[280px]' : 'left-[88px]'
        }`}
    >
      <div className="flex items-center gap-8 w-full max-w-2xl">
        {/* Global Search / Command Trigger */}
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center gap-3 w-full max-w-md px-5 py-2 bg-slate-100/50 border border-slate-200/80 rounded-[1.2rem] text-slate-400 hover:bg-white hover:border-teal-400 hover:shadow-[0_12px_24px_-8px_rgba(20,184,166,0.15)] hover:text-teal-700 transition-all group"
        >
          <Search className="w-4 h-4" />
          <span className="text-sm font-bold tracking-tight">Search anything...</span>
          <div className="ml-auto flex items-center gap-1.5">
            <kbd className="hidden md:inline-flex items-center h-5 px-2 text-xs font-black bg-white border border-slate-200 rounded-lg text-slate-400 shadow-sm">⌘ K</kbd>
          </div>
        </button>

        <div className="hidden xl:flex items-center gap-6 text-slate-400">
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-teal-500" />
            <span className="text-xs font-black uppercase tracking-widest">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>

          {/* Branch Switcher */}
          <div className="relative" ref={branchRef}>
            <button
              onClick={() => (role === UserRole.SUPER_ADMIN || role === UserRole.ADMIN) && setIsBranchOpen(!isBranchOpen)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all ${(role === UserRole.SUPER_ADMIN || role === UserRole.ADMIN)
                  ? 'hover:bg-slate-100/50 cursor-pointer text-slate-600'
                  : 'cursor-default'
                }`}
            >
              <Globe size={14} className={activeBranchId === 'consolidated' ? 'text-indigo-500' : 'text-blue-500'} />
              <span className="text-xs font-black uppercase tracking-widest">{currentBranchName}</span>
              {(role === UserRole.SUPER_ADMIN || role === UserRole.ADMIN) && <ChevronDown size={10} className={`transition-transform duration-300 ${isBranchOpen ? 'rotate-180' : ''}`} />}
            </button>

            <AnimatePresence>
              {isBranchOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50"
                >
                  <p className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-1">Select Operations Center</p>

                  {role === UserRole.SUPER_ADMIN && (
                    <button
                      onClick={() => { setBranch('consolidated'); setIsBranchOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-black uppercase tracking-widest hover:bg-slate-50 flex items-center justify-between ${activeBranchId === 'consolidated' ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-600'}`}
                    >
                      <span>Consolidated Reports</span>
                      {activeBranchId === 'consolidated' && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>}
                    </button>
                  )}

                  {branches.map(b => (
                    <button
                      key={b.id}
                      onClick={() => { setBranch(b.id); setIsBranchOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-black uppercase tracking-widest hover:bg-slate-50 flex items-center justify-between ${activeBranchId === b.id ? 'text-teal-600 bg-teal-50/50' : 'text-slate-600'}`}
                    >
                      <span className="truncate max-w-[180px]">{b.name}</span>
                      {activeBranchId === b.id && <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {/* Currency Toggle */}
          <button
            onClick={toggleCurrency}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-xl text-xs font-black text-slate-700 hover:bg-slate-50 transition-all shadow-sm uppercase tracking-widest"
            title="Switch Currency"
          >
            <Coins size={14} className="text-amber-500" />
            {currency}
          </button>

          <button className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all relative group">
            <Bell className="w-5 h-5 group-hover:shake" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border border-white animate-pulse"></span>
          </button>
        </div>

        <div className="h-8 w-px bg-slate-100 mx-2"></div>

        {/* Profile & Role Switcher */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1 pr-3 rounded-xl transition-all border ${isProfileOpen ? 'bg-slate-50 border-slate-200 shadow-inner' : 'border-transparent'}`}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center text-teal-400 text-sm font-bold shadow-md border border-white/10">
              {currentUser.charAt(0)}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-black text-slate-900 leading-tight uppercase tracking-tighter">{currentUser}</p>
              <div className="flex items-center gap-1 text-xs font-black text-teal-600 uppercase tracking-[0.2em]">
                {role} <ChevronDown size={10} className={`transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full right-0 mt-3 w-72 bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 py-4 z-50 overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50 mb-2">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Active Identity</p>
                  <div className="flex items-center gap-2">
                    <Shield size={14} className="text-teal-500" />
                    <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">{role}</p>
                  </div>
                </div>
                <div className="max-h-[300px] overflow-y-auto custom-scrollbar px-2">
                  {Object.values(UserRole).map((r) => (
                    <button
                      key={r}
                      onClick={() => handleRoleSwitch(r)}
                      className={`w-full text-left px-4 py-3 rounded-2xl text-sm hover:bg-slate-50 transition-all flex items-center justify-between group ${role === r ? 'bg-teal-50/50' : ''}`}
                    >
                      <div className="flex flex-col">
                        <span className={`font-black text-xs uppercase tracking-tight ${role === r ? 'text-teal-700' : 'text-slate-600'}`}>{r}</span>
                        <span className="text-xs text-slate-400 group-hover:text-slate-500 font-bold uppercase tracking-widest">Switch Profile</span>
                      </div>
                      {role === r && <div className="w-2 h-2 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.5)]"></div>}
                    </button>
                  ))}
                </div>

                <div className="border-t border-slate-50 mt-4 pt-4 px-4">
                  <button
                    onClick={logout}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-2xl transition-all text-xs font-black uppercase tracking-widest"
                  >
                    <LogOut size={16} /> Terminate Session
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
