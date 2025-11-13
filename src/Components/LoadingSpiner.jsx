import React from 'react';

const LoadingSpiner = () => {
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
};

export default LoadingSpiner;