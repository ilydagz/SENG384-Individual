import { useState } from 'react';
import { UserPlus, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RegistrationForm() {
    const [formData, setFormData] = useState({ fullName: '', email: '' });
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setStatus({ type: 'error', message: 'Please enter a valid email address format.' });
            return;
        }

        console.log("Payload to send:", formData);
        setStatus({ type: 'success', message: 'Personnel successfully added to the system!' });

        setFormData({ fullName: '', email: '' });
        setTimeout(() => setStatus({ type: '', message: '' }), 4000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-white/70 backdrop-blur-2xl rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white max-w-2xl relative overflow-hidden"
        >
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-sky-300 to-blue-300 rounded-full blur-3xl opacity-20 pointer-events-none"></div>

            <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className="bg-gradient-to-br from-sky-100 to-blue-50 p-3.5 rounded-2xl shadow-inner border border-white">
                    <UserPlus className="text-blue-500 w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-extrabold text-slate-700 tracking-tight">Add New Person</h2>
                    <p className="text-sm text-slate-500 font-medium mt-0.5">Register a new record into the fluid database.</p>
                </div>
            </div>

            <AnimatePresence>
                {status.message && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className={`p-4 mb-6 rounded-2xl flex items-center gap-3 border ${status.type === 'error' ? 'bg-red-50 border-red-100 text-red-600' : 'bg-teal-50 border-teal-100 text-teal-600'
                            }`}
                    >
                        {status.type === 'error' ? <AlertCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                        <span className="font-bold text-sm">{status.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div>
                    <label className="block text-sm font-bold text-slate-600 mb-2">Full Name</label>
                    <input
                        type="text"
                        required
                        value={formData.fullName}
                        onInvalid={(e) => e.target.setCustomValidity('Please fill out this field.')}
                        onInput={(e) => e.target.setCustomValidity('')}
                        className="w-full px-4 py-3.5 bg-white/60 border border-slate-200/60 rounded-2xl focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400 outline-none transition-all duration-300 hover:bg-white shadow-sm text-slate-700"
                        placeholder="e.g. John Doe"
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-600 mb-2">Email Address</label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onInvalid={(e) => {
                            if (e.target.value === '') {
                                e.target.setCustomValidity('Please fill out this field.');
                            } else {
                                e.target.setCustomValidity('Please enter a valid email address.');
                            }
                        }}
                        onInput={(e) => e.target.setCustomValidity('')}
                        className="w-full px-4 py-3.5 bg-white/60 border border-slate-200/60 rounded-2xl focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400 outline-none transition-all duration-300 hover:bg-white shadow-sm text-slate-700"
                        placeholder="john@example.com"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-sky-400 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg shadow-sky-500/30 w-full mt-2 hover:shadow-sky-500/50 border border-sky-400/50"
                >
                    Submit Record
                </motion.button>
            </form>
        </motion.div>
    );
}