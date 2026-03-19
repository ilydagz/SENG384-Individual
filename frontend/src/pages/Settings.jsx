import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings as SettingsIcon, Type, Monitor, Moon, Sun, Accessibility, Eye, ZapOff, CheckCircle2 } from 'lucide-react';

export default function Settings({ addNotification }) {
    const [activeTab, setActiveTab] = useState('Typography');

    // AYARLARI LOCAL STORAGE'DAN OKUYARAK BAŞLAT
    const [fontSize, setFontSize] = useState(() => localStorage.getItem('appFontSize') || 'Medium (Default)');
    const [theme, setTheme] = useState(() => localStorage.getItem('appTheme') || 'System Sync');
    const [reduceMotion, setReduceMotion] = useState(() => JSON.parse(localStorage.getItem('appReduceMotion') || 'false'));
    const [highContrast, setHighContrast] = useState(() => JSON.parse(localStorage.getItem('appHighContrast') || 'false'));

    const waterDrop = {
        hidden: { opacity: 0, y: -15, scale: 0.95 },
        show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 250, damping: 20 } }
    };

    const handleApply = () => {
        // 1. Yazı Boyutu Uygulaması
        if (fontSize === 'Small') document.documentElement.style.fontSize = '14px';
        if (fontSize === 'Medium (Default)') document.documentElement.style.fontSize = '16px';
        if (fontSize === 'Large') document.documentElement.style.fontSize = '18px';

        // 2. Tema Uygulaması
        let styleTag = document.getElementById('dynamic-theme-styles');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'dynamic-theme-styles';
            document.head.appendChild(styleTag);
        }

        let cssRules = '';
        if (theme === 'Dark Mode') {
            cssRules += `
        html { filter: invert(0.92) hue-rotate(180deg); background: #000; }
        img, video, .lucide { filter: invert(1) hue-rotate(180deg) !important; }
      `;
        } else {
            cssRules += `html { filter: none; background: #f4f9fb; }`;
        }

        if (reduceMotion) cssRules += `* { transition: none !important; animation: none !important; scroll-behavior: auto !important; }`;
        if (highContrast) cssRules += `* { contrast: 1.5 !important; font-weight: 700 !important; }`;

        styleTag.innerHTML = cssRules;

        // 3. YENİ: YAPILAN DEĞİŞİKLİKLERİ LOCAL STORAGE'A KAYDET
        localStorage.setItem('appFontSize', fontSize);
        localStorage.setItem('appTheme', theme);
        localStorage.setItem('appReduceMotion', JSON.stringify(reduceMotion));
        localStorage.setItem('appHighContrast', JSON.stringify(highContrast));

        // 4. Başarı Bildirimi
        if (addNotification) {
            addNotification(`System configuration successfully applied.`);
        }
    };

    // Sağ tarafın içeriğini dinamik olarak render eden fonksiyon
    const renderTabContent = () => {
        switch (activeTab) {
            case 'Typography':
                return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                        <h3 className="text-lg font-bold text-slate-700 mb-6 flex items-center gap-2">
                            <Type className="w-5 h-5 text-sky-500" /> Typography Settings
                        </h3>
                        <div>
                            <label className="block text-sm font-bold text-slate-600 mb-3">Global Font Size</label>
                            <div className="flex gap-3">
                                {['Small', 'Medium (Default)', 'Large'].map((size, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setFontSize(size)}
                                        className={`px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${fontSize === size ? 'bg-blue-50 border-blue-200 text-blue-600 shadow-sm' : 'bg-white border-slate-200 text-slate-500 hover:border-blue-300 hover:bg-slate-50'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs text-slate-400 mt-3 font-medium">Adjusting the font size will scale all elements proportionally.</p>
                        </div>
                    </motion.div>
                );

            case 'Appearance':
                return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                        <h3 className="text-lg font-bold text-slate-700 mb-6 flex items-center gap-2">
                            <Monitor className="w-5 h-5 text-sky-500" /> Theme Preferences
                        </h3>
                        <div>
                            <label className="block text-sm font-bold text-slate-600 mb-3">Application Theme</label>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button onClick={() => setTheme('System Sync')} className={`flex flex-1 items-center justify-center gap-2 px-4 py-3.5 font-bold rounded-xl shadow-sm transition-all border ${theme === 'System Sync' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-slate-200 text-slate-500 hover:border-blue-300'}`}>
                                    <Monitor className="w-4 h-4" /> System
                                </button>
                                <button onClick={() => setTheme('Light Mode')} className={`flex flex-1 items-center justify-center gap-2 px-4 py-3.5 font-bold rounded-xl shadow-sm transition-all border ${theme === 'Light Mode' ? 'bg-amber-50 border-amber-200 text-amber-600' : 'bg-white border-slate-200 text-slate-500 hover:border-amber-300'}`}>
                                    <Sun className="w-4 h-4" /> Light
                                </button>
                                <button onClick={() => setTheme('Dark Mode')} className={`flex flex-1 items-center justify-center gap-2 px-4 py-3.5 font-bold rounded-xl shadow-sm transition-all border ${theme === 'Dark Mode' ? 'bg-slate-800 text-sky-400 border-slate-700' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-800 hover:text-slate-800'}`}>
                                    <Moon className="w-4 h-4" /> Dark
                                </button>
                            </div>
                        </div>
                    </motion.div>
                );

            case 'Accessibility':
                return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                        <h3 className="text-lg font-bold text-slate-700 mb-6 flex items-center gap-2">
                            <Accessibility className="w-5 h-5 text-sky-500" /> Accessibility Settings
                        </h3>
                        <div className="space-y-4">
                            <div
                                onClick={() => setReduceMotion(!reduceMotion)}
                                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${reduceMotion ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-200 hover:border-blue-300'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${reduceMotion ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}><ZapOff className="w-4 h-4" /></div>
                                    <div>
                                        <h4 className={`font-bold text-sm ${reduceMotion ? 'text-blue-700' : 'text-slate-700'}`}>Reduce Motion</h4>
                                        <p className="text-xs text-slate-500 mt-0.5">Disable all fluid UI animations and transitions.</p>
                                    </div>
                                </div>
                                {reduceMotion && <CheckCircle2 className="w-5 h-5 text-blue-500" />}
                            </div>

                            <div
                                onClick={() => setHighContrast(!highContrast)}
                                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${highContrast ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-200 hover:border-blue-300'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${highContrast ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}><Eye className="w-4 h-4" /></div>
                                    <div>
                                        <h4 className={`font-bold text-sm ${highContrast ? 'text-blue-700' : 'text-slate-700'}`}>High Contrast</h4>
                                        <p className="text-xs text-slate-500 mt-0.5">Increase text weight and visibility for better readability.</p>
                                    </div>
                                </div>
                                {highContrast && <CheckCircle2 className="w-5 h-5 text-blue-500" />}
                            </div>
                        </div>
                    </motion.div>
                );

            default:
                return null;
        }
    };

    return (
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }} className="max-w-4xl mx-auto">

            {/* Üst Başlık */}
            <div className="flex items-center gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-100 to-sky-50 p-3.5 rounded-2xl shadow-inner border border-white">
                    <SettingsIcon className="text-blue-500 w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-extrabold text-slate-700 tracking-tight">System Configuration</h2>
                    <p className="text-sm text-slate-500 font-medium mt-0.5">Customize your interface and accessibility preferences.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Sol Menü (Tabs) */}
                <motion.div variants={waterDrop} className="md:col-span-1 space-y-2">
                    {['Typography', 'Appearance', 'Accessibility'].map((item, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveTab(item)}
                            className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-sm transition-all ${activeTab === item ? 'bg-white/80 text-blue-600 shadow-md border border-white' : 'text-slate-500 hover:bg-white/50 hover:text-slate-700'}`}
                        >
                            {item}
                        </button>
                    ))}
                </motion.div>

                {/* Sağ İçerik Alanı */}
                <motion.div variants={waterDrop} className="md:col-span-2 flex flex-col justify-between bg-white/60 backdrop-blur-2xl rounded-[2rem] p-8 shadow-lg shadow-sky-900/5 border border-white min-h-[350px]">

                    {/* Dinamik İçerik (Seçilen sekmeye göre değişir) */}
                    <AnimatePresence mode="wait">
                        {renderTabContent()}
                    </AnimatePresence>

                    {/* Ortak Apply Butonu */}
                    <div className="pt-8 mt-auto border-t border-slate-100/60 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Unsaved Changes</span>
                        <button
                            onClick={handleApply}
                            className="px-8 py-3.5 bg-gradient-to-r from-blue-500 to-sky-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            Apply Configuration
                        </button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}