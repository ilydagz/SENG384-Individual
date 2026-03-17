import { useState } from 'react';
import { Edit2, Trash2, Users, AlertTriangle, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PeopleList() {
    const [people, setPeople] = useState([
        { id: 1, fullName: "John Doe", email: "john@example.com", role: "Developer" },
        { id: 2, fullName: "Jane Smith", email: "jane@example.com", role: "Designer" },
        { id: 3, fullName: "Mike Johnson", email: "mike@example.com", role: "Manager" },
    ]);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);

    const openDeleteModal = (person) => {
        setSelectedPerson(person);
        setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        setPeople(people.filter(p => p.id !== selectedPerson.id));
        setDeleteModalOpen(false);
        setSelectedPerson(null);
    };

    const openEditModal = (person) => {
        setSelectedPerson(person);
        setEditModalOpen(true);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        setPeople(people.map(p => p.id === selectedPerson.id ? selectedPerson : p));
        setEditModalOpen(false);
        setSelectedPerson(null);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="bg-white/60 backdrop-blur-2xl rounded-[2rem] p-8 shadow-lg shadow-sky-900/5 border border-white max-w-5xl relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-sky-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

                <div className="flex items-center justify-between mb-8 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-br from-blue-100 to-sky-50 p-3.5 rounded-2xl shadow-inner border border-white">
                            <Users className="text-blue-500 w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-extrabold text-slate-700 tracking-tight">Personnel Directory</h2>
                            <p className="text-sm text-slate-500 font-medium mt-0.5">Manage all registered members in the flow.</p>
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
                            {people.map((person) => (
                                <motion.tr
                                    key={person.id}
                                    variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}
                                    className="border-b border-slate-100/50 hover:bg-white/80 transition-all duration-200 group"
                                >
                                    <td className="py-5 pl-4 font-bold text-slate-700">{person.fullName}</td>
                                    <td className="py-5 text-slate-500 font-medium">{person.email}</td>
                                    <td className="py-5">
                                        <span className="px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 rounded-xl border border-blue-100/50">{person.role || 'User'}</span>
                                    </td>
                                    <td className="py-5 pr-4 text-right">
                                        <button onClick={() => openEditModal(person)} className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all mx-1">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => openDeleteModal(person)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                            {people.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="py-8 text-center text-slate-400 font-medium">No personnel found in the directory.</td>
                                </tr>
                            )}
                        </motion.tbody>
                    </table>
                </div>
            </motion.div>

            {/* --- SİLME ONAY MODALI --- */}
            <AnimatePresence>
                {deleteModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white/90 backdrop-blur-2xl rounded-[2rem] p-8 max-w-sm w-full shadow-2xl border border-white"
                        >
                            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6 border border-red-100">
                                <AlertTriangle className="w-7 h-7 text-red-500" />
                            </div>
                            <h3 className="text-xl font-extrabold text-slate-800 mb-2">Delete Record?</h3>
                            <p className="text-slate-500 text-sm mb-8">
                                Are you sure you want to delete <span className="font-bold text-slate-700">{selectedPerson?.fullName}</span>? This action cannot be undone.
                            </p>
                            <div className="flex gap-3">
                                <button onClick={() => setDeleteModalOpen(false)} className="flex-1 py-3 px-4 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all">
                                    Cancel
                                </button>
                                <button onClick={confirmDelete} className="flex-1 py-3 px-4 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 shadow-lg shadow-red-500/30 transition-all">
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* --- DÜZENLEME MODALI --- */}
            <AnimatePresence>
                {editModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white/90 backdrop-blur-2xl rounded-[2rem] p-8 max-w-md w-full shadow-2xl border border-white"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-extrabold text-slate-800">Edit Personnel</h3>
                                <button onClick={() => setEditModalOpen(false)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl transition-all">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleEditSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-slate-600 mb-1.5">Full Name</label>
                                    <input
                                        type="text" required value={selectedPerson?.fullName || ''}
                                        onInvalid={(e) => e.target.setCustomValidity('Please fill out this field.')}
                                        onInput={(e) => e.target.setCustomValidity('')}
                                        onChange={(e) => setSelectedPerson({ ...selectedPerson, fullName: e.target.value })}
                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-sky-400 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-600 mb-1.5">Email Address</label>
                                    <input
                                        type="email" required value={selectedPerson?.email || ''}
                                        onInvalid={(e) => {
                                            if (e.target.value === '') {
                                                e.target.setCustomValidity('Please fill out this field.');
                                            } else {
                                                e.target.setCustomValidity('Please enter a valid email address.');
                                            }
                                        }}
                                        onInput={(e) => e.target.setCustomValidity('')}
                                        onChange={(e) => setSelectedPerson({ ...selectedPerson, email: e.target.value })}
                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-sky-400 outline-none transition-all"
                                    />
                                </div>
                                <button type="submit" className="w-full mt-2 flex items-center justify-center gap-2 py-3.5 px-4 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 shadow-lg shadow-blue-500/30 transition-all">
                                    <Check className="w-5 h-5" /> Save Changes
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}