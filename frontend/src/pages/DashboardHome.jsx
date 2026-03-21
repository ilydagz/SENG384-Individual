import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, Droplet, Activity, ArrowRight, ShieldCheck, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DashboardHome() {
    const [totalPeople, setTotalPeople] = useState(0);

    // Fetch real person count from database
    useEffect(() => {
        fetch('http://localhost:5001/api/people')
            .then(res => res.json())
            .then(data => setTotalPeople(data.length))
            .catch(err => console.error("Data fetch error", err));
    }, []);

    const waterContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    };

    const waterDrop = {
        hidden: { opacity: 0, y: -15, scale: 0.95 },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 250, damping: 20 }
        }
    };

    return (
        <motion.div variants={waterContainer} initial="hidden" animate="show" className="max-w-6xl mx-auto">

            {/* Fluid Water Banner */}
            <motion.div variants={waterDrop} className="mb-10 relative overflow-hidden rounded-[2rem] shadow-xl shadow-blue-900/5 border border-white/60">
                <motion.div
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-[length:200%_200%] bg-gradient-to-r from-blue-400 via-sky-300 to-blue-300 opacity-90"
                />
                <div className="relative z-10 p-10 flex flex-col md:flex-row items-center justify-between">
                    <div className="text-white mb-6 md:mb-0">
                        <h2 className="text-3xl font-black tracking-tight mb-2 flex items-center gap-3 drop-shadow-sm">
                            Control Center <Droplet className="w-8 h-8 text-white/80" fill="currentColor" />
                        </h2>
                        <p className="text-blue-50 font-medium text-lg max-w-md drop-shadow-sm">
                            A fluid workspace to manage your personnel and monitor system waves seamlessly.
                        </p>
                    </div>
                    <Link to="/add">
                        <motion.button
                            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                            className="bg-white/90 backdrop-blur-sm text-blue-600 font-bold py-3.5 px-8 rounded-2xl shadow-lg hover:shadow-xl hover:bg-white transition-all flex items-center gap-2"
                        >
                            Add Personnel <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </Link>
                </div>
            </motion.div>

            {/* Statistics Drops (Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {[
                    { title: "Total Personnel", value: totalPeople, icon: Users, color: "from-blue-500 to-blue-400" },
                    { title: "Active Flow", value: totalPeople > 0 ? totalPeople - 1 : 0, icon: Activity, color: "from-sky-500 to-sky-400" },
                    { title: "System Health", value: "100%", icon: TrendingUp, color: "from-blue-400 to-sky-300" }
                ].map((stat, index) => (
                    <motion.div
                        key={index} variants={waterDrop}
                        whileHover={{ y: -4, scale: 1.01 }}
                        transition={{ duration: 0.4, type: "spring" }}
                        className="bg-white/70 backdrop-blur-2xl border border-white rounded-[2rem] p-7 shadow-lg shadow-sky-100/50 relative overflow-hidden group cursor-default"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-sky-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">{stat.title}</p>
                                <h3 className="text-4xl font-black text-slate-700">{stat.value}</h3>
                            </div>
                            <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-md group-hover:shadow-lg transition-all duration-500`}>
                                <stat.icon className="w-7 h-7" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div variants={waterDrop} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/70 backdrop-blur-2xl border border-white rounded-[2rem] p-8 shadow-lg shadow-sky-100/50 flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-slate-700 mb-2">Quick Navigation</h3>
                    <p className="text-slate-500 text-sm mb-6">Dive directly into your personnel directory.</p>
                    <div className="flex gap-4">
                        <Link to="/people" className="flex-1">
                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full flex items-center justify-center gap-3 bg-white/80 text-blue-600 font-bold py-4 px-6 rounded-2xl shadow-sm hover:shadow-md hover:bg-white transition-all border border-blue-100">
                                <Users className="w-5 h-5" /> Open Directory
                            </motion.button>
                        </Link>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-[#f2f8fc] to-[#e6f2f9] border border-white rounded-[2rem] p-8 shadow-inner relative overflow-hidden flex items-center justify-center min-h-[160px]">
                    <motion.div
                        animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.9, 1.1, 0.9] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute w-72 h-72 bg-sky-200 rounded-full blur-3xl opacity-30 mix-blend-multiply"
                    />
                    <div className="relative z-10 text-center">
                        <Activity className="w-10 h-10 text-blue-300 mx-auto mb-2 opacity-80" />
                        <p className="text-blue-800/40 font-bold text-sm uppercase tracking-widest">Fluid & Healthy</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}