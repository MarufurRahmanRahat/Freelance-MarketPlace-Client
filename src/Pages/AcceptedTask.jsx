import React, { useState, useEffect, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircle, X, Briefcase, Calendar, User, Tag,
    Trash2, ListChecks
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../Contexts/AuthContext';
import LoadingSpiner from '../Components/LoadingSpiner';
import { useLocation, useNavigate } from 'react-router';

const AcceptedTask = () => {

    const { user } = use(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
     const location = useLocation();
    const navigate = useNavigate(); 

     useEffect(() => {
    fetchAcceptedTasks();
  }, []);

const fetchAcceptedTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/my-accepted-tasks/${user.email}`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching accepted tasks:', error);
      toast.error('Failed to load your tasks');
    } finally {
      setLoading(false);
    }
  };


   const handleDone = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3000/acceptedTask/${taskId}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        // Remove from UI immediately
        setTasks(prev => prev.filter(task => task._id !== taskId));
        toast.success('Task marked as Done! ✅', {
          duration: 3000,
          style: {
            background: '#10B981',
            color: '#fff',
            fontWeight: 'bold'
          }
        });
      } else {
        toast.error('Failed to mark task as done');
      }
    } catch (error) {
      console.error('Error marking task as done:', error);
      toast.error('Something went wrong!');
    }
  };

  const handleCancel = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3000/acceptedTask/${taskId}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        // Remove from UI immediately
        setTasks(prev => prev.filter(task => task._id !== taskId));
        toast.success('Task cancelled successfully', {
          duration: 3000,
          icon: '❌'
        });
      } else {
        toast.error('Failed to cancel task');
      }
    } catch (error) {
      console.error('Error cancelling task:', error);
      toast.error('Something went wrong!');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };


  const handleGoBack = () => {
        navigate(location.state || '/jobs');
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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: {
      opacity: 0,
      x: 100,
      transition: { duration: 0.3 }
    }
  };


  if (loading) {
    return <LoadingSpiner></LoadingSpiner>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 py-12 px-4">
      <Toaster />
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <ListChecks className="w-12 h-12 text-indigo-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              My Accepted Tasks
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            You have {tasks.length} active {tasks.length === 1 ? 'task' : 'tasks'}
          </p>
        </motion.div>

        {/* Tasks List */}
        <AnimatePresence mode="popLayout">
          {tasks.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {tasks.map((task) => (
                <motion.div
                  key={task._id}
                  variants={cardVariants}
                  exit="exit"
                  layout
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                      {/* Left Content */}
                      <div className="flex-1 space-y-4">
                        {/* Category Badge */}
                        <div className="flex items-center gap-2">
                          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            {task.jobCategory}
                          </span>
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                            Active
                          </span>
                        </div>

                        {/* Job Title */}
                        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                          <Briefcase className="w-6 h-6 text-indigo-600" />
                          {task.jobTitle}
                        </h3>

                        {/* Meta Info */}
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <User className="w-4 h-4" />
                            <span>Posted by: <strong>{task.postedBy}</strong></span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>Accepted: <strong>{formatDate(task.acceptedDate)}</strong></span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex lg:flex-col gap-3">
                        <motion.button
                          onClick={() => handleDone(task._id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 lg:flex-none bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <CheckCircle className="w-5 h-5" />
                          Done
                        </motion.button>

                        <motion.button
                          onClick={() => handleCancel(task._id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 lg:flex-none bg-gradient-to-r from-red-500 to-rose-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <X className="w-5 h-5" />
                          Cancel
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
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
                No Accepted Tasks Yet
              </h3>
              <p className="text-xl text-gray-500 mb-8">
                Browse available jobs and start accepting tasks to see them here!
              </p>
              <button
                onClick={handleGoBack}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all duration-300"
              >
                Browse All Jobs
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        
      </div>
    </div>
  );
};

export default AcceptedTask;