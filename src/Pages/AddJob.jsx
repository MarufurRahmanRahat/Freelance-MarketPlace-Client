import React, { use, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, User, Tag, FileText, Image, Mail, Calendar } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../Contexts/AuthContext';
import { useLocation, useNavigation } from 'react-router';

const AddJob = () => {

    const { user } = use(AuthContext);

    const [formData, setFormData] = useState({
    title: '',
    postedBy: user?.displayName || '',
    category: '',
    summary: '',
    coverImage: '',
    userEmail: user?.email || ''
  });

  const [loading, setLoading] = useState(false);

    const navigate = useNavigation();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

   const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    
    if (!formData.title.trim()) {
      toast.error('Job title is required!', {
        duration: 3000,
        position: 'top-center'
      });
      return;
    }
    
    if (!formData.category) {
      toast.error('Please select a category!', {
        duration: 3000,
        position: 'top-center'
      });
      return;
    }
    
    if (!formData.summary.trim()) {
      toast.error('Job description is required!', {
        duration: 3000,
        position: 'top-center'
      });
      return;
    }
    
    if (!formData.coverImage.trim()) {
      toast.error('Cover image URL is required!', {
        duration: 3000,
        position: 'top-center'
      });
      return;
    }
    
    setLoading(true);

     try {
      const response = await fetch('http://localhost:3000/addJob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Job added successfully! 🎉', {
          duration: 4000,
          position: 'top-center',
          style: {
            background: '#10B981',
            color: '#fff',
            fontWeight: 'bold'
          }
        });
         // Reset form
        setFormData({
          title: '',
          postedBy: user?.displayName || '',
          category: '',
          summary: '',
          coverImage: '',
          userEmail: user?.email || ''
        });
      } else {
        toast.error('Failed to add job. Please try again.', {
          duration: 4000,
          position: 'top-center'
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong! Please try again.', {
        duration: 4000,
        position: 'top-center'
      });
    } finally {
      setLoading(false);
    }
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
    
   return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <Toaster />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Post a New Job
          </h1>
          <p className="text-xl text-gray-600">
            Share your project requirements with talented freelancers
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-2xl p-8 md:p-12"
        >
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
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

            
            <motion.div variants={itemVariants}>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <User className="w-5 h-5 text-indigo-600" />
                Posted By
              </label>
              <input
                type="text"
                name="postedBy"
                value={formData.postedBy}
                readOnly
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 cursor-not-allowed"
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
            </motion.div>

            {/* User Email (Read-only) */}
            <motion.div variants={itemVariants}>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <Mail className="w-5 h-5 text-indigo-600" />
                Your Email
              </label>
              <input
                type="email"
                name="userEmail"
                value={formData.userEmail}
                readOnly
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 cursor-not-allowed"
              />
            </motion.div>

            {/* Posted Date Info */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-2 text-gray-600 bg-blue-50 px-4 py-3 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="text-sm">
                  <strong>Posted Date:</strong> Will be automatically set when you submit
                </span>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              variants={itemVariants}
              className="pt-4"
            >
             
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className={`w-full py-4 rounded-lg font-bold text-lg text-white shadow-lg transition-all duration-300 ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-xl'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Posting Job...
                  </span>
                ) : (
                  'Post Job'
                )}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>

       
        
      </motion.div>
    </div>
  );
};

export default AddJob;