import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Calendar, UserPlus, FileText, CreditCard, 
  Activity, Bed, TestTube, Pill, Scissors, Users, 
  Briefcase, Ambulance, Settings, X 
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands = [
    // Navigation
    { title: 'Dashboard', icon: Activity, path: '/', type: 'Navigation' },
    { title: 'Patient List', icon: Users, path: '/patients', type: 'Navigation' },
    { title: 'OPD Queue', icon: Activity, path: '/opd', type: 'Navigation' },
    { title: 'IPD & Beds', icon: Bed, path: '/ipd', type: 'Navigation' },
    { title: 'Pharmacy', icon: Pill, path: '/pharmacy', type: 'Navigation' },
    { title: 'Laboratory', icon: TestTube, path: '/lab', type: 'Navigation' },
    { title: 'Billing & Invoices', icon: CreditCard, path: '/billing', type: 'Navigation' },
    { title: 'Finance Dashboard', icon: FileText, path: '/finance', type: 'Navigation' },
    { title: 'HR Management', icon: Briefcase, path: '/hr', type: 'Navigation' },
    { title: 'OT Schedule', icon: Scissors, path: '/ot', type: 'Navigation' },
    { title: 'Reports Center', icon: FileText, path: '/reports', type: 'Navigation' },
    
    // Actions
    { title: 'Register New Patient', icon: UserPlus, path: '/registration', type: 'Action' },
    { title: 'Create New Bill', icon: CreditCard, path: '/billing', state: { view: 'create_bill' }, type: 'Action' },
    { title: 'Book Appointment', icon: Calendar, path: '/appointments', type: 'Action' },
    { title: 'Add Inventory Item', icon: Pill, path: '/pharmacy', state: { tab: 'inventory' }, type: 'Action' },
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.title.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsOpen]);

  const handleSelect = (index: number) => {
    const cmd = filteredCommands[index];
    if (cmd) {
      navigate(cmd.path, { state: cmd.state });
      setIsOpen(false);
      setQuery('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex items-start justify-center pt-[15vh] animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        <div className="flex items-center p-4 border-b border-slate-100">
          <Search className="text-slate-400 w-5 h-5 ml-2" />
          <input 
            autoFocus
            type="text"
            className="flex-1 px-4 py-2 text-lg outline-none text-slate-700 placeholder:text-slate-400"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(i => (i + 1) % filteredCommands.length);
              }
              if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(i => (i - 1 + filteredCommands.length) % filteredCommands.length);
              }
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSelect(selectedIndex);
              }
            }}
          />
          <div className="flex items-center gap-2">
             <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-semibold text-slate-500 bg-slate-100 border border-slate-200 rounded-md">ESC</kbd>
             <button onClick={() => setIsOpen(false)}><X className="text-slate-400 hover:text-slate-600" /></button>
          </div>
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto py-2">
          {filteredCommands.length > 0 ? (
            <>
                <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Results</div>
                {filteredCommands.map((cmd, idx) => (
                    <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`w-full flex items-center gap-4 px-4 py-3 text-left transition-colors ${
                        idx === selectedIndex ? 'bg-teal-50 text-teal-700' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                    >
                    <div className={`p-2 rounded-lg ${idx === selectedIndex ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-500'}`}>
                        <cmd.icon size={18} />
                    </div>
                    <div className="flex-1">
                        <span className="font-medium">{cmd.title}</span>
                        <span className="ml-2 text-xs opacity-50 border px-1 rounded">{cmd.type}</span>
                    </div>
                    {idx === selectedIndex && <span className="text-xs font-medium text-teal-600">Enter to select</span>}
                    </button>
                ))}
            </>
          ) : (
            <div className="p-8 text-center text-slate-500">
                No matching commands found.
            </div>
          )}
        </div>
        
        <div className="bg-slate-50 p-2 border-t border-slate-100 text-xs text-center text-slate-400">
            ProTip: You can open this menu anywhere with <kbd className="font-bold">Ctrl + K</kbd>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;