import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, User, Tag, Eye, ArrowUpDown } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import LoadingSpiner from '../Components/LoadingSpiner';
import { useLocation, useNavigate } from 'react-router';


const Jobs = () => {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('newest');
    const location = useLocation();
    const navigate = useNavigate();


  useEffect(() => {
    fetchJobs();
  }, [sortOrder]);


  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/jobs?sort=${sortOrder}`);
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = () => {
    setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest');
  };

  const handleViewDetails = (id) => {
     navigate(location.state || `/job-details/${id}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  if (loading) {
    return <LoadingSpiner></LoadingSpiner>
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <Toaster />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            All Available Jobs
          </h1>
          <p className="text-xl text-gray-600">
            Browse {jobs.length} freelance opportunities
          </p>
        </motion.div>
        

        {/* Sort Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-end mb-8"
        >
          <button
            onClick={handleSortChange}
            className="flex items-center gap-2 bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow font-semibold text-gray-700"
          >
            <ArrowUpDown className="w-5 h-5" />
            Sort by: {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
          </button>
        </motion.div>


        {/* Jobs Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {jobs.map((job) => (
            <motion.div
              key={job._id}
              variants={cardVariants}
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {/* Cover Image */}
              <div className="h-48 overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100">
                <img
                  src={job.coverImage}
                  alt={job.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
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
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-indigo-600 transition-colors">
                  {job.title}
                </h3>

                {/* Summary */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {job.summary}
                </p>

                {/* Posted By */}
                <div className="flex items-center gap-2 text-gray-700 mb-2">
                  <User className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm font-medium">{job.postedBy}</span>
                </div>

                {/* Posted Date */}
                <div className="flex items-center gap-2 text-gray-500 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{formatDate(job.postedDate)}</span>
                </div>

                {/* View Details Button */}
                <button
                  onClick={() => handleViewDetails(job._id)}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Eye className="w-5 h-5" />
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {jobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <Briefcase className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No Jobs Available</h3>
            <p className="text-gray-500">Be the first to post a job!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Jobs;