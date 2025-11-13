import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Megaphone, Video, PenTool, Database, Shield, Users, Zap, TrendingUp, Award, Clock } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';


const Static1 = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const handleBrowse = () => {
        navigate(location.state || '/jobs');
    };

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

    


    const features = [
        {
            icon: <Shield className="w-10 h-10" />,
            title: "Secure Payments",
            description: "Your transactions are protected with enterprise-grade security"
        },
        {
            icon: <Users className="w-10 h-10" />,
            title: "Trusted Community",
            description: "Join thousands of verified freelancers and clients"
        },
        {
            icon: <Zap className="w-10 h-10" />,
            title: "Fast Delivery",
            description: "Get your projects completed on time, every time"
        },
        {
            icon: <TrendingUp className="w-10 h-10" />,
            title: "Growth Opportunities",
            description: "Scale your business with unlimited project possibilities"
        },
        {
            icon: <Award className="w-10 h-10" />,
            title: "Quality Assured",
            description: "Work with top-rated professionals in every field"
        },
        {
            icon: <Clock className="w-10 h-10" />,
            title: "24/7 Support",
            description: "Round-the-clock assistance for all your queries"
        }
    ];

    return (
        <div className="w-full">
            <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <motion.h2
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
                        >
                            Why Choose FreelanceHub?
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-xl text-gray-600 max-w-3xl mx-auto"
                        >
                            We provide the most reliable and efficient freelance marketplace connecting talented professionals with amazing opportunities
                        </motion.p>

                    </motion.div>
                    

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.03 }}
                                className="bg-white rounded-xl p-8 shadow-md hover:shadow-2xl transition-shadow duration-300"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                                    className="text-indigo-600 mb-4"
                                >
                                    {feature.icon}
                                </motion.div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="text-center mt-16"
                    >
                        <motion.button
                            onClick={handleBrowse}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                        >
                            Start Your Journey Today
                        </motion.button>
                    </motion.div>

                </div>
            </section>
        </div>
    );
};

export default Static1;