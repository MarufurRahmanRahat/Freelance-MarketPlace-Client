import React, { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import {
    Briefcase, Calendar, User, Tag, Mail, ArrowLeft,
    CheckCircle, AlertCircle
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate, useParams } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import LoadingSpiner from '../Components/LoadingSpiner';

const JobDetails = () => {

    const { id } = useParams();

    const { user } = use(AuthContext);

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [accepting, setAccepting] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        fetchJobDetails();
    }, [id]);

    const fetchJobDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/jobs/${id}`);
            const data = await response.json();
            setJob(data);
        } catch (error) {
            console.error('Error fetching job details:', error);
            toast.error('Failed to load job details');
        } finally {
            setLoading(false);
        }
    };

    const handleAcceptJob = async () => {
       
        
        if (job.userEmail === User.email) {
            toast.error('You cannot accept your own job!', {
                icon: '🚫',
                duration: 4000
            });
            return;
        }

        setAccepting(true);
        try {
            const acceptedJobData = {
                jobId: job._id,
                jobTitle: job.title,
                jobCategory: job.category,
                postedBy: job.postedBy,
                acceptedBy: User.email,
                acceptedByName: User.displayName
            };

            const response = await fetch('http://localhost:3000/acceptJob', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(acceptedJobData)
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Job accepted successfully! 🎉', {
                    duration: 4000,
                    style: {
                        background: '#10B981',
                        color: '#fff',
                        fontWeight: 'bold'
                    }
                });
                // Redirect to my-accepted-tasks page
                // navigate('/my-accepted-tasks');
            } else {
                toast.error('Failed to accept job');
            }
        } catch (error) {
            console.error('Error accepting job:', error);
            toast.error('Something went wrong!');
        } finally {
            setAccepting(false);
        }
    };

    const handleGoBack = () => {
        navigate(location.state || '/jobs');
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return <LoadingSpiner></LoadingSpiner>
    }

    if (!job) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Job Not Found</h2>
                    <p className="text-gray-600 mb-6">The job you're looking for doesn't exist.</p>
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

    const isOwnJob = job.userEmail === user?.email;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
            <Toaster />

            <div className="max-w-5xl mx-auto">
                {/* Back Button */}
                <motion.button
                    onClick={handleGoBack}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 font-semibold mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to All Jobs
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-2xl shadow-2xl overflow-hidden"
                >
                    {/* Cover Image */}
                    <div className="relative h-96 overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100">
                        <img
                            src={job.coverImage}
                            alt={job.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/1200x600?text=Job+Image';
                            }}
                        />
                        <div className="absolute top-6 left-6">
                            <span className="bg-white/90 backdrop-blur-sm text-indigo-700 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                                <Tag className="w-4 h-4" />
                                {job.category}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-12">
                        {/* Job Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
                        >
                            {job.title}
                        </motion.h1>

                        {/* Meta Information */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap gap-6 mb-8 pb-8 border-b-2 border-gray-100"
                        >
                            <div className="flex items-center gap-3">
                                <div className="bg-indigo-100 p-2 rounded-lg">
                                    <User className="w-5 h-5 text-indigo-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Posted By</p>
                                    <p className="font-semibold text-gray-800">{job.postedBy}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="bg-purple-100 p-2 rounded-lg">
                                    <Mail className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Contact</p>
                                    <p className="font-semibold text-gray-800">{job.userEmail}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="bg-blue-100 p-2 rounded-lg">
                                    <Calendar className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Posted On</p>
                                    <p className="font-semibold text-gray-800">{formatDate(job.postedDate)}</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Job Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mb-8"
                        >
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Briefcase className="w-6 h-6 text-indigo-600" />
                                Job Description
                            </h2>
                            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                                {job.summary}
                            </p>
                        </motion.div>

                        {/* Accept Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            {isOwnJob ? (
                                <div className="flex items-center gap-3 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 text-yellow-800">
                                    <AlertCircle className="w-6 h-6" />
                                    <p className="font-semibold">This is your own job posting. You cannot accept it.</p>
                                </div>
                            ) : (
                                <motion.button
                                    onClick={handleAcceptJob}
                                    disabled={accepting}
                                    whileHover={{ scale: accepting ? 1 : 1.02 }}
                                    whileTap={{ scale: accepting ? 1 : 0.98 }}
                                    className={`flex-1 py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${accepting
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-xl'
                                        }`}
                                >
                                    <CheckCircle className="w-6 h-6" />
                                    {accepting ? 'Accepting...' : 'Accept This Job'}
                                </motion.button>
                            )}
                        </motion.div>

                        {/* Additional Info */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="mt-8 bg-blue-50 rounded-xl p-6"
                        >
                            <h3 className="font-bold text-lg text-gray-800 mb-3">💡 What happens next?</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span>Once accepted, this job will appear in your "My Accepted Tasks" section</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span>Contact the job poster via email to discuss project details</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span>Mark the task as "Done" when completed or "Cancel" if needed</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};


export default JobDetails;