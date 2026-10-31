
import React from 'react';
import { NavLink } from 'react-router-dom';
import { MENU_GROUPS, APP_NAME } from '../constants';
import { Eye, ChevronLeft, ChevronRight, LogOut, User, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { motion } from 'motion/react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { role, currentUser, logout } = useAuth();
  const { hasPermission } = useData();

  const isAllowed = (name: string) => {
    return hasPermission(name, 'list') || hasPermission(name, 'view');
  };

  return (
    <motion.div
      initial={false}
      animate={{ width: isOpen ? 280 : 88 }}
      className="bg-white/90 backdrop-blur-2xl text-slate-900 h-screen transition-all duration-300 ease-in-out flex flex-col fixed left-0 top-0 z-50 shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-r border-slate-200/50 print:hidden"
    >
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-4 bg-slate-50/50 border-b border-slate-100 flex-shrink-0 relative">
        <div className={`flex items-center gap-3 ${!isOpen && 'justify-center w-full'}`}>
          <div
            className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg shadow-teal-500/20 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => !isOpen && setIsOpen(true)}
          >
            <Eye className="w-5 h-5 text-white" />
          </div>
          {isOpen && (
            <div className="flex flex-col">
              <span className="font-black text-sm tracking-tighter uppercase leading-none text-slate-900">{APP_NAME}</span>
              <span className="text-[10px] font-black tracking-[0.2em] text-teal-600 uppercase mt-0.5">Enterprise ERP</span>
            </div>
          )}
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`text-slate-400 hover:text-slate-900 transition-all duration-300 ${!isOpen
            ? 'absolute -right-3 top-8 bg-teal-500 text-white rounded-full p-1 shadow-xl hover:scale-110 z-[60] border-2 border-white'
            : ''
            }`}
        >
          {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={12} />}
        </button>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-6 custom-scrollbar">
        {MENU_GROUPS.map((group) => {
          const allowedGroupItems = group.items.filter(i => isAllowed(i.name));
          if (allowedGroupItems.length === 0) return null;

          return (
            <div key={group.group} className="space-y-2">
              {isOpen && (
                <h4 className="px-3 text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
                  {group.group}
                </h4>
              )}
              <div className="space-y-1">
                {allowedGroupItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-4 py-2.5 rounded-[1.2rem] transition-all duration-300 group relative
                      ${isActive
                        ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-[0_8px_16px_-4px_rgba(13,148,136,0.3)]'
                        : 'text-slate-500 hover:bg-slate-100/80 hover:text-slate-900'
                      }
                      ${!isOpen && 'justify-center mx-1'}
                    `}
                    title={!isOpen ? item.name : ''}
                  >
                    {({ isActive }) => (
                      <>
                        <item.icon className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                        {isOpen && <span className="text-sm font-bold tracking-tight">{item.name}</span>}
                        {isActive && !isOpen && (
                          <div className="absolute left-0 w-1 h-6 bg-teal-500 rounded-r-full"></div>
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer: User Profile & Logout */}
      <div className="p-3 bg-slate-50/50 border-t border-slate-100 flex-shrink-0">
        {isOpen ? (
          <>
            <div className="bg-white rounded-xl p-3 mb-3 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 font-bold border border-teal-100 text-sm">
                  {currentUser.charAt(0)}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-xs font-bold text-slate-900 truncate">{currentUser}</span>
                  <div className="flex items-center gap-1">
                    <Shield size={10} className="text-teal-500" />
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest truncate">{role}</span>
                  </div>
                </div>
              </div>
              <NavLink
                to="/portal"
                className="w-full flex items-center justify-center gap-2 py-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all text-xs font-black uppercase tracking-widest mb-2"
              >
                Patient Portal
              </NavLink>
              <button
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 py-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all text-xs font-black uppercase tracking-widest"
              >
                <LogOut size={12} />
                Terminate
              </button>
            </div>

            {/* Developer Info */}
            <div className="px-2 py-1 text-center">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-0.5">Developed by</p>
              <p className="text-xs font-black text-teal-600/50 uppercase tracking-tighter mb-0.5">BUSINESS ERP SYSTEM</p>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={logout}
              className="w-10 h-10 flex items-center justify-center text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
            <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 font-black text-xs" title="BUSINESS ERP SYSTEM">
              BE
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Sidebar;
