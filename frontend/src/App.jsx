import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { UserPlus, Users, Settings, HelpCircle, BookOpen, MessageSquare, Search, Bell, LayoutDashboard, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardHome from './pages/DashboardHome';
import RegistrationForm from './pages/RegistrationForm';
import PeopleList from './pages/PeopleList';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const topMenuItems = [
    { path: '/', name: 'Dashboard', icon: LayoutDashboard },
    { path: '/add', name: 'Add Person', icon: UserPlus },
    { path: '/people', name: 'Directory', icon: Users },
  ];

  const bottomMenuItems = [
    { path: '/guide', name: 'User Guide', icon: BookOpen },
    { path: '/settings', name: 'Settings', icon: Settings },
  ];

  return (
    <motion.div
      initial={false}
      animate={{ width: isOpen ? 280 : 88 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white/60 backdrop-blur-3xl min-h-screen flex flex-col fixed left-0 top-0 bottom-0 z-40 shadow-[4px_0_30px_rgba(0,100,200,0.03)] border-r border-white/80 overflow-hidden"
    >
      <div className="flex items-center gap-3 p-6 mb-6 mt-2 min-w-[280px]">
        {/* Logo: Saf Su Mavisi */}
        <div className="w-10 h-10 min-w-[40px] bg-gradient-to-br from-blue-400 to-sky-400 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-sky-500/20">
          M
        </div>
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.3 }}
              className="flex flex-col"
            >
              <span className="text-[10px] text-sky-500 font-bold uppercase tracking-wider">System</span>
              <span className="font-extrabold text-slate-700 text-base leading-tight">Person Manager</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar overflow-x-hidden px-4">
        {isOpen && <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4 px-2 whitespace-nowrap">Main Menu</div>}
        <nav className="flex flex-col gap-2 mb-10">
          {topMenuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} title={!isOpen ? item.name : ""} className="relative flex items-center h-12">
                {isActive && (
                  <motion.div layoutId="activeTab" className="absolute inset-0 bg-gradient-to-r from-blue-400 to-sky-400 rounded-2xl shadow-md shadow-sky-400/20" />
                )}
                <div className={`flex items-center gap-4 px-3 w-full font-bold transition-all duration-300 text-sm relative z-10 ${isActive ? 'text-white' : 'text-slate-500 hover:text-blue-500 hover:bg-sky-50/50 rounded-2xl'}`}>
                  <item.icon className={`w-5 h-5 min-w-[20px] ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <AnimatePresence>
                    {isOpen && (
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="whitespace-nowrap">
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </Link>
            );
          })}
        </nav>

        {isOpen && <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4 px-2 whitespace-nowrap">Support</div>}
        <nav className="flex flex-col gap-1.5">
          {bottomMenuItems.map((item) => (
            <Link key={item.path} to={item.path} title={!isOpen ? item.name : ""} className="flex items-center gap-4 px-3 h-12 rounded-2xl font-bold text-sm text-slate-500 hover:text-blue-500 hover:bg-sky-50/50 transition-all">
              <item.icon className="w-5 h-5 min-w-[20px] text-slate-400" />
              <AnimatePresence>
                {isOpen && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="whitespace-nowrap">{item.name}</motion.span>}
              </AnimatePresence>
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-100/80">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-center h-10 rounded-xl bg-white/50 hover:bg-white text-slate-400 hover:text-blue-500 border border-slate-100 shadow-sm transition-all"
        >
          {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <BrowserRouter>
      {/* Zemin Rengi: Çok uçuk, pürüzsüz bir su beyazı */}
      <div className="flex min-h-screen bg-[#f4f9fb] font-sans overflow-hidden relative">

        {/* SIVI ARKA PLAN: Birbiriyle tamamen uyumlu Sky ve Blue tonları */}
        <motion.div animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-40 -left-20 w-[45rem] h-[45rem] bg-blue-200/40 rounded-full blur-[120px] pointer-events-none" />
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 18, repeat: Infinity, delay: 2, ease: "easeInOut" }} className="absolute top-1/4 -right-20 w-[40rem] h-[40rem] bg-sky-200/40 rounded-full blur-[120px] pointer-events-none" />
        <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 16, repeat: Infinity, delay: 1, ease: "easeInOut" }} className="absolute -bottom-40 left-1/3 w-[35rem] h-[35rem] bg-blue-100/50 rounded-full blur-[100px] pointer-events-none" />

        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <motion.div
          animate={{ paddingLeft: isSidebarOpen ? 280 : 88 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 flex flex-col relative z-10 w-full"
        >
          <header className="h-24 flex items-center justify-between px-10 pt-6 pb-2">
            <div>
              <h1 className="text-2xl font-black text-slate-700 tracking-tight mb-1">Overview</h1>
              <p className="text-xs text-sky-500 font-bold uppercase tracking-wider">Workspace Active</p>
            </div>
            <div className="flex items-center gap-5">
              <div className="relative group">
                <input type="text" placeholder="Search records..." className="bg-white/70 backdrop-blur-md border border-white shadow-sm rounded-2xl py-2.5 pl-4 pr-12 text-sm w-[240px] focus:outline-none focus:ring-2 focus:ring-sky-400/30 placeholder:text-slate-400 text-slate-600 font-medium transition-all" />
                <Search className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
              <button className="p-3 bg-white/70 backdrop-blur-md border border-white shadow-sm rounded-2xl text-slate-500 hover:text-blue-500 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-400 rounded-full shadow-sm"></span>
              </button>
            </div>
          </header>

          <main className="p-10 pt-6 flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/add" element={<RegistrationForm />} />
              <Route path="/people" element={<PeopleList />} />
            </Routes>
          </main>
        </motion.div>
      </div>
    </BrowserRouter>
  );
}