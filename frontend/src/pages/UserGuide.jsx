import { motion } from 'framer-motion';
import { BookOpen, UserPlus, Edit2, Trash2, Activity, TrendingUp } from 'lucide-react';

export default function UserGuide() {
    const waterDrop = {
        hidden: { opacity: 0, y: -15, scale: 0.95 },
        show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 250, damping: 20 } }
    };

    const guides = [
        { icon: UserPlus, title: "Adding a Person", desc: "Navigate to the 'Add Person' page from the sidebar. Fill in the required Full Name and valid Email address, then click 'Submit Record'." },
        { icon: Edit2, title: "Editing Records", desc: "Go to the 'Directory' page. Click the blue pencil icon next to any person. A modal will appear where you can update their details." },
        { icon: Trash2, title: "Deleting Records", desc: "In the 'Directory', click the red trash bin icon. Confirm your action in the warning dialog to permanently remove the record from the database." },
        { icon: Activity, title: "Active Flow", desc: "This metric on the Dashboard represents the current number of active personnel engaged in the system workflow." },
        { icon: TrendingUp, title: "System Health", desc: "Displays the operational status of the platform. A 100% health score indicates all database and backend services are functioning seamlessly." }
    ];

    return (
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.15 } } }} className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-100 to-sky-50 p-3.5 rounded-2xl shadow-inner border border-white">
                    <BookOpen className="text-blue-500 w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-extrabold text-slate-700 tracking-tight">User Guide</h2>
                    <p className="text-sm text-slate-500 font-medium mt-0.5">Learn how to navigate the Person Management System.</p>
                </div>
            </div>

            <div className="space-y-6">
                {guides.map((guide, i) => (
                    <motion.div key={i} variants={waterDrop} className="bg-white/60 backdrop-blur-2xl rounded-[2rem] p-6 shadow-lg shadow-sky-900/5 border border-white flex gap-5 items-start">
                        <div className="p-4 bg-sky-50 rounded-2xl text-sky-500 shrink-0">
                            <guide.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-700 mb-2">{guide.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{guide.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}