import React, { useState, useEffect, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, Calendar, Tag, Edit, Trash2, Eye, 
  AlertCircle, Plus
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../Contexts/AuthContext';
import LoadingSpiner from '../Components/LoadingSpiner';
import { useLocation, useNavigate } from 'react-router';


const MyPostedJobs = () => {
    const { user } = use(AuthContext);

    const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
   const location = useLocation();
    const navigate = useNavigate(); 

   useEffect(() => {
    fetchMyJobs();
  }, []);

   const fetchMyJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/myPostedJobs/${user.email}`);
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching my jobs:', error);
      toast.error('Failed to load your jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (jobId) => {
   navigate(location.state || `/update/${jobId}`);
  };


   const handleDelete = async (jobId, jobTitle) => {
    // Show confirmation
    const confirmed = window.confirm(`Are you sure you want to delete "${jobTitle}"?\n\nThis action cannot be undone.`);
    
    if (!confirmed) return;

    setDeletingId(jobId);
    
    try {
      const response = await fetch(`http://localhost:3000/deleteJob/${jobId}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        // Remove from UI immediately
        setJobs(prev => prev.filter(job => job._id !== jobId));
        toast.success('Job deleted successfully! 🗑️', {
          duration: 3000,
          style: {
            background: '#EF4444',
            color: '#fff',
            fontWeight: 'bold'
          }
        });
      } else {
        toast.error('Failed to delete job');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('Something went wrong!');
    } finally {
      setDeletingId(null);
    }
  };

  const handleViewDetails = (jobId) => {
    console.log('View job:', jobId);
    // window.location.href = `/allJobs/${jobId}`;
  };

  const handleAddNewJob = () => {
    console.log('Navigate to /addJob');
    // window.location.href = '/addJob';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  };

  if (loading) {
    return <LoadingSpiner></LoadingSpiner>
  }
    
    return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-12 px-4">
      <Toaster />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Briefcase className="w-12 h-12 text-indigo-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              My Posted Jobs
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-6">
            You have posted {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'}
          </p>
          
          {/* Add New Job Button */}
          <motion.button
            onClick={handleAddNewJob}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            <Plus className="w-5 h-5" />
            Post a New Job
          </motion.button>
        </motion.div>

        {/* Jobs Grid */}
        <AnimatePresence mode="popLayout">
          {jobs.length > 0 ? (
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
                  exit="exit"
                  layout
                  whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden relative"
                >
                  {/* Deleting Overlay */}
                  {deletingId === job._id && (
                    <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-red-600 mx-auto mb-2"></div>
                        <p className="text-gray-700 font-semibold">Deleting...</p>
                      </div>
                    </div>
                  )}

                  {/* Cover Image */}
                  <div className="h-48 overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 relative">
                    <img
                      src={job.coverImage}
                      alt={job.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=Job+Image';
                      }}
                    />
                    
                    {/* Owner Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        Your Job
                      </span>
                    </div>
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
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 min-h-[3.5rem]">
                      {job.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 min-h-[4rem]">
                      {job.summary}
                    </p>

                    {/* Posted Date */}
                    <div className="flex items-center gap-2 text-gray-500 mb-4 pb-4 border-b border-gray-200">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Posted: {formatDate(job.postedDate)}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-3 gap-2">
                      <motion.button
                        onClick={() => handleViewDetails(job._id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-1 text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </motion.button>

                      <motion.button
                        onClick={() => handleEdit(job._id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-indigo-500 text-white py-2 rounded-lg font-semibold hover:bg-indigo-600 transition-colors flex items-center justify-center gap-1 text-sm"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </motion.button>

                      <motion.button
                        onClick={() => handleDelete(job._id, job.title)}
                        disabled={deletingId === job._id}
                        whileHover={{ scale: deletingId === job._id ? 1 : 1.05 }}
                        whileTap={{ scale: deletingId === job._id ? 1 : 0.95 }}
                        className={`py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-1 text-sm ${
                          deletingId === job._id
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-red-500 text-white hover:bg-red-600'
                        }`}
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </motion.button>
                    </div>
                  </div>

                  {/* Bottom Accent Line */}
                  <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                </motion.div>
              ))}
            </motion.div>
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
                No Jobs Posted Yet
              </h3>
              <p className="text-xl text-gray-500 mb-8">
                Start by posting your first job opportunity!
              </p>
              <button
                onClick={handleAddNewJob}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
              >
                <Plus className="w-6 h-6" />
                Post Your First Job
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info Card */}
        {jobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 shadow-lg"
          >
            <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-blue-600" />
              Managing Your Jobs
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="bg-blue-100 p-1 rounded-full mt-1">
                  <Eye className="w-4 h-4 text-blue-600" />
                </div>
                <span><strong>View:</strong> See full details of your job posting</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-indigo-100 p-1 rounded-full mt-1">
                  <Edit className="w-4 h-4 text-indigo-600" />
                </div>
                <span><strong>Edit:</strong> Update job title, category, description, or cover image</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-red-100 p-1 rounded-full mt-1">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </div>
                <span><strong>Delete:</strong> Permanently remove job posting (cannot be undone)</span>
              </li>
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
};
export default MyPostedJobs;