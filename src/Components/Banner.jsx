import React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Users, CheckCircle, ArrowRight, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';


const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();

    const slides = [
    {
      id: 1,
      title: "Find The Perfect Freelance",
      subtitle: "Services For Your Business",
      description: "Connect with talented professionals worldwide. Your trusted marketplace for quality work and reliable service.",
      bgGradient: "from-blue-600 via-indigo-600 to-purple-700",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
    },
    {
      id: 2,
      title: "Your Success Story",
      subtitle: "Starts Here Today",
      description: "Join thousands of satisfied clients who trust our platform. Quality, reliability, and excellence in every project.",
      bgGradient: "from-purple-600 via-pink-600 to-rose-700",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80"
    },
    {
      id: 3,
      title: "Post Your Project",
      subtitle: "Get It Done Fast",
      description: "Over 10,000+ skilled freelancers ready to bring your vision to life. Fast, efficient, and professional.",
      bgGradient: "from-cyan-600 via-teal-600 to-emerald-700",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=80"
    }
  ];

   const stats = [
    { icon: <Briefcase className="w-6 h-6" />, value: "50K+", label: "Jobs Posted" },
    { icon: <Users className="w-6 h-6" />, value: "15K+", label: "Freelancers" },
    { icon: <CheckCircle className="w-6 h-6" />, value: "98%", label: "Success Rate" },
    { icon: <TrendingUp className="w-6 h-6" />, value: "$2M+", label: "Paid Out" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

   const handleBrowse = () => {
        navigate(location.state || '/jobs');
    };

     const handleCreate = () => {
        navigate(location.state || '/add-job');
    };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 }
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
        damping: 15
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };

  const slideVariants = {
    enter: {
      opacity: 0,
      scale: 0.9
    },
    center: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 1.1,
      transition: {
        duration: 0.5
      }
    }
  };
    return (
         <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].bgGradient}`}
        >
          {/* Background Image Overlay */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url(${slides[currentSlide].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-white"
                >
                  <motion.div
                    variants={itemVariants}
                    className="inline-block mb-6"
                  >
                    <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                      🌟 Most Reliable Platform
                    </span>
                  </motion.div>

                  <motion.h1
                    variants={itemVariants}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                  >
                    {slides[currentSlide].title}
                    <br />
                    <span className="text-yellow-300">{slides[currentSlide].subtitle}</span>
                  </motion.h1>

                  <motion.p
                    variants={itemVariants}
                    className="text-lg md:text-xl mb-8 text-gray-100 max-w-xl"
                  >
                    {slides[currentSlide].description}
                  </motion.p>

                  {/* Buttons */}
                  <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-4 mb-12"
                  >
                    <motion.button
                      onClick={handleCreate}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-2xl flex items-center justify-center gap-2 group"
                    >
                      Create a Job
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>

                    <motion.button
                      onClick={handleBrowse}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg backdrop-blur-sm hover:bg-white/10"
                    >
                      Browse Jobs
                    </motion.button>
                  </motion.div>

                  {/* Trust Badge */}
                  <motion.div
                    variants={itemVariants}
                    className="flex items-center gap-3"
                  >
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-purple-400 to-pink-400" />
                      ))}
                    </div>
                    <div className="text-sm">
                      <div className="font-bold">Trusted by 10,000+ Users</div>
                      <div className="text-gray-200">⭐ 4.9/5 Average Rating</div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Right Content - Stats */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="hidden lg:block"
                >
                  <div className="relative">
                    {/* Floating Card */}
                    <motion.div
                      animate={{ y: [0, -20, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl"
                    >
                      <div className="grid grid-cols-2 gap-6">
                        {stats.map((stat, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 + idx * 0.1 }}
                            className="text-center"
                          >
                            <div className="bg-white/20 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 text-white">
                              {stat.icon}
                            </div>
                            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-200">{stat.label}</div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Decorative Elements */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute -top-10 -right-10 w-32 h-32 border-4 border-white/30 rounded-full"
                    />
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="absolute -bottom-10 -left-10 w-24 h-24 border-4 border-yellow-300/40 rounded-full"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'bg-white w-10 h-3'
                : 'bg-white/50 w-3 h-3 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
    );
};

export default Banner;