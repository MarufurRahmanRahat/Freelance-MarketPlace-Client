import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, Calendar, User, Tag, Eye, ArrowRight, 
  TrendingUp, Clock 
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router';

const LatestJobs = () => {
    const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
   useEffect(() => {
    fetchLatestJobs();
  }, []);

  const fetchLatestJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/latestJobs');
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching latest jobs:', error);
      toast.error('Failed to load latest jobs');
    } finally {
      setLoading(false);
    }
  };

   const handleViewDetails = (jobId) => {
    // Navigate to job details page
    console.log('View job:', jobId);
    // window.location.href = `/allJobs/${jobId}`;
  };


   const handleViewAllJobs = () => {
    navigate(location.state || '/jobs');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  if (loading) {
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-white via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600"></div>
            <p className="text-xl text-gray-600 font-semibold">Loading latest jobs...</p>
          </div>
        </div>
      </section>
    );
  }


    return (
    <section className="py-20 px-4 bg-gradient-to-br from-white via-blue-50 to-indigo-50">
      <Toaster />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-semibold mb-4"
          >
            <TrendingUp className="w-5 h-5" />
            Latest Opportunities
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Recently Posted Jobs
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the newest freelance opportunities from trusted clients worldwide
          </p>
        </motion.div>

        {/* Jobs Grid */}
        {jobs.length > 0 ? (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            >
              {jobs.map((job, index) => (
                <motion.div
                  key={job._id}
                  variants={cardVariants}
                  whileHover={{ 
                    y: -10, 
                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                    transition: { duration: 0.3 }
                  }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer"
                >
                  {/* Cover Image */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100">
                    {/* "New" Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <motion.span
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1"
                      >
                        <Clock className="w-3 h-3" />
                        NEW
                      </motion.span>
                    </div>

                    <img
                      src={job.coverImage}
                      alt={job.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=Job+Image';
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category Badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {job.category}
                      </span>
                    </div>

                    {/* Job Title */}
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors min-h-[3.5rem]">
                      {job.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                      {job.summary}
                    </p>

                    {/* Meta Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <User className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm font-medium">{job.postedBy}</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{formatDate(job.postedDate)}</span>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <motion.button
                      onClick={() => handleViewDetails(job._id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Eye className="w-5 h-5" />
                      View Details
                    </motion.button>
                  </div>

                  {/* Bottom Accent Line */}
                  <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                </motion.div>
              ))}
            </motion.div>

            {/* View All Jobs Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <motion.button
                onClick={handleViewAllJobs}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                View All Jobs
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </motion.button>
            </motion.div>
          </>
        ) : (
          // Empty State
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-white rounded-2xl shadow-lg"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Briefcase className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            </motion.div>
            <h3 className="text-3xl font-bold text-gray-700 mb-4">
              No Jobs Available Yet
            </h3>
            <p className="text-xl text-gray-500 mb-8">
              Be the first to post a job opportunity!
            </p>
            <button
              onClick={() => console.log('Navigate to /addJob')}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300"
            >
              Post Your First Job
            </button>
          </motion.div>
        )}

        {/* Stats Section */}
        {jobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-4xl font-bold text-indigo-600 mb-2"
              >
                {jobs.length}
              </motion.div>
              <p className="text-gray-600 font-semibold">Latest Jobs Posted</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                className="text-4xl font-bold text-purple-600 mb-2"
              >
                24/7
              </motion.div>
              <p className="text-gray-600 font-semibold">Active Platform</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="text-4xl font-bold text-pink-600 mb-2"
              >
                100%
              </motion.div>
              <p className="text-gray-600 font-semibold">Verified Jobs</p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
export default LatestJobs;