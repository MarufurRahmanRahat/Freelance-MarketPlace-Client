import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Tag, FileText, Image, ArrowLeft, Save } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate, useParams } from 'react-router';
import LoadingSpiner from '../Components/LoadingSpiner';


const Update = () => {

    const { id } = useParams();

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        summary: '',
        coverImage: ''
    });

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [originalJob, setOriginalJob] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();


    const categories = [
        'Web Development',
        'Mobile App Development',
        'Graphics Design',
        'Digital Marketing',
        'Content Writing',
        'Video Editing',
        'Data Analysis',
        'SEO Services',
        'UI/UX Design',
        'Virtual Assistant'
    ];

    useEffect(() => {
        fetchJobDetails();
    }, [id]);


    const fetchJobDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/jobs/${id}`);
            const data = await response.json();

            if (response.ok) {
                setOriginalJob(data);
                setFormData({
                    title: data.title,
                    category: data.category,
                    summary: data.summary,
                    coverImage: data.coverImage
                });
            } else {
                toast.error('Failed to load job details');
            }
        } catch (error) {
            console.error('Error fetching job details:', error);
            toast.error('Failed to load job details');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);

        try {
            const response = await fetch(`http://localhost:3000/updateJob/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Job updated successfully! 🎉', {
                    duration: 4000,
                    style: {
                        background: '#10B981',
                        color: '#fff',
                        fontWeight: 'bold'
                    }
                });

                setTimeout(() => {
                    navigate('/my-posted-job');
                    
                }, 2000);
            } else {
                toast.error('Failed to update job. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Something went wrong! Please try again.');
        } finally {
            setUpdating(false);
        }
    };


    const handleGoBack = () => {
        navigate(location.state || '/my-posted-job')
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.4 }
        }
    };

    if (loading) {
        return <LoadingSpiner></LoadingSpiner>
    }

    if (!originalJob) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Not Found</h2>
                    <button
                        onClick={handleGoBack}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
            <Toaster />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-3xl mx-auto"
            >
                {/* Back Button */}
                <motion.button
                    onClick={handleGoBack}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 font-semibold mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                </motion.button>

                {/* Header */}
                <motion.div variants={itemVariants} className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Update Job
                    </h1>
                    <p className="text-xl text-gray-600">
                        Edit your job details and save changes
                    </p>
                </motion.div>

                {/* Form Card */}
                <motion.div
                    variants={itemVariants}
                    className="bg-white rounded-2xl shadow-2xl p-8 md:p-12"
                >
                    <div className="space-y-6">

                        {/* Job Title */}
                        <motion.div variants={itemVariants}>
                            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                <Briefcase className="w-5 h-5 text-indigo-600" />
                                Job Title *
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                placeholder="e.g., Build a responsive e-commerce website"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                            />
                        </motion.div>

                        {/* Category Dropdown */}
                        <motion.div variants={itemVariants}>
                            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                <Tag className="w-5 h-5 text-indigo-600" />
                                Category *
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                            >
                                <option value="">Select a category</option>
                                {categories.map((cat, index) => (
                                    <option key={index} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </motion.div>

                        {/* Summary (Text Area) */}
                        <motion.div variants={itemVariants}>
                            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                <FileText className="w-5 h-5 text-indigo-600" />
                                Job Description *
                            </label>
                            <textarea
                                name="summary"
                                value={formData.summary}
                                onChange={handleChange}
                                required
                                rows="5"
                                placeholder="Describe your project requirements, skills needed, timeline, budget, etc."
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors resize-none"
                            />
                        </motion.div>

                        {/* Cover Image URL */}
                        <motion.div variants={itemVariants}>
                            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                <Image className="w-5 h-5 text-indigo-600" />
                                Cover Image URL *
                            </label>
                            <input
                                type="url"
                                name="coverImage"
                                value={formData.coverImage}
                                onChange={handleChange}
                                required
                                placeholder="https://i.ibb.co/xyz123/image.jpg"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                Upload your image to ImgBB and paste the URL here
                            </p>

                            {/* Image Preview */}
                            {formData.coverImage && (
                                <div className="mt-4">
                                    <p className="text-sm text-gray-600 mb-2">Preview:</p>
                                    <img
                                        src={formData.coverImage}
                                        alt="Preview"
                                        className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL';
                                        }}
                                    />
                                </div>
                            )}
                        </motion.div>

                        

                        {/* Action Buttons */}
                        <motion.div
                            variants={itemVariants}
                            className="pt-4 flex gap-4"
                        >
                            <motion.button
                                onClick={handleSubmit}
                                disabled={updating}
                                whileHover={{ scale: updating ? 1 : 1.02 }}
                                whileTap={{ scale: updating ? 1 : 0.98 }}
                                className={`flex-1 py-4 rounded-lg font-bold text-lg text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${updating
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-xl'
                                    }`}
                            >
                                {updating ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-6 h-6" />
                                        Update Job
                                    </>
                                )}
                            </motion.button>

                            <motion.button
                                onClick={handleGoBack}
                                disabled={updating}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-8 py-4 rounded-lg font-bold text-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.div>

                
            </motion.div>
        </div>
    );
};

export default Update;