import React from 'react';

import { motion } from 'framer-motion';
import { Code, Palette, Megaphone, Video, PenTool, Database } from 'lucide-react';


const Static2 = () => {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    const cardHoverVariants = {
        hover: {
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            transition: {
                type: "spring",
                stiffness: 300
            }
        }
    };

    const categories = [
        {
            icon: <Code className="w-12 h-12" />,
            title: "Web Development",
            jobs: "1,234 jobs",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: <Palette className="w-12 h-12" />,
            title: "Graphics Design",
            jobs: "856 jobs",
            color: "from-pink-500 to-rose-500"
        },
        {
            icon: <Megaphone className="w-12 h-12" />,
            title: "Digital Marketing",
            jobs: "672 jobs",
            color: "from-orange-500 to-amber-500"
        },
        {
            icon: <Video className="w-12 h-12" />,
            title: "Video Editing",
            jobs: "543 jobs",
            color: "from-purple-500 to-indigo-500"
        },
        {
            icon: <PenTool className="w-12 h-12" />,
            title: "Content Writing",
            jobs: "421 jobs",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: <Database className="w-12 h-12" />,
            title: "Data Analysis",
            jobs: "389 jobs",
            color: "from-teal-500 to-cyan-500"
        }
    ];



    return (
        <div className="w-full">
           
            <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            Explore Top Categories
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Find the perfect freelance services for your business needs
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {categories.map((category, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover="hover"
                            >
                                <motion.div
                                    variants={cardHoverVariants}
                                    className="bg-white rounded-2xl p-8 cursor-pointer shadow-lg"
                                >
                                    <motion.div
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                        className={`w-20 h-20 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white mb-6 mx-auto`}
                                    >
                                        {category.icon}
                                    </motion.div>
                                    <h3 className="text-2xl font-bold text-gray-800 text-center mb-2">
                                        {category.title}
                                    </h3>
                                    <p className="text-gray-500 text-center font-medium">
                                        {category.jobs}
                                    </p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
         </div>
            );
};

export default Static2;