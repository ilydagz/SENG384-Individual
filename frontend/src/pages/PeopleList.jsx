import { Edit2, Trash2, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PeopleList() {
    const mockData = [
        { id: 1, fullName: "John Doe", email: "john@example.com", role: "Developer" },
        { id: 2, fullName: "Jane Smith", email: "jane@example.com", role: "Designer" },
        { id: 3, fullName: "Mike Johnson", email: "mike@example.com", role: "Manager" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-lg shadow-blue-900/5 border border-white max-w-5xl relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

            <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-blue-100 to-indigo-50 p-3.5 rounded-2xl shadow-inner border border-white">
                        <Users className="text-blue-600 w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Personnel Directory</h2>
                        <p className="text-sm text-slate-500 font-medium mt-0.5">Manage all registered members.</p>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto relative z-10">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-200/60 text-slate-400 text-sm">
                            <th className="pb-4 font-bold pl-4 uppercase tracking-wider">Full Name</th>
                            <th className="pb-4 font-bold uppercase tracking-wider">Email Address</th>
                            <th className="pb-4 font-bold uppercase tracking-wider">Role</th>
                            <th className="pb-4 font-bold text-right pr-4 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <motion.tbody initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.05 } } }}>
                        {mockData.map((person) => (
                            <motion.tr
                                key={person.id}
                                variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}
                                className="border-b border-slate-100 hover:bg-white/80 transition-all duration-200 group"
                            >
                                <td className="py-5 pl-4 font-bold text-slate-800">{person.fullName}</td>
                                <td className="py-5 text-slate-500 font-medium">{person.email}</td>
                                <td className="py-5">
                                    <span className="px-3 py-1 text-xs font-bold text-blue-700 bg-blue-100/50 rounded-full border border-blue-200">{person.role}</span>
                                </td>
                                <td className="py-5 pr-4 text-right">
                                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all mx-1">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </motion.tbody>
                </table>
            </div>
        </motion.div>
    );
}