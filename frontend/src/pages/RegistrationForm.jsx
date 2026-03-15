import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RegistrationForm() {
    const [formData, setFormData] = useState({ fullName: '', email: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white max-w-2xl relative overflow-hidden"
        >
            {/* Kartın içindeki hafif mavi yansıma (Glow efekti) */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-blue-400 to-indigo-300 rounded-full blur-3xl opacity-10 pointer-events-none"></div>

            <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-50 p-3.5 rounded-2xl shadow-inner border border-white">
                    <UserPlus className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">Add New Person</h2>
                    <p className="text-sm text-gray-500 font-medium mt-0.5">Create a new record in the system.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all duration-300 hover:bg-white shadow-sm"
                        placeholder="e.g. John Doe"
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input
                        type="email"
                        required
                        className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all duration-300 hover:bg-white shadow-sm"
                        placeholder="john@example.com"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <motion.button
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/30 w-full mt-4 hover:shadow-blue-500/50 border border-blue-400/20"
                >
                    Submit Record
                </motion.button>
            </form>
        </motion.div>
    );
}