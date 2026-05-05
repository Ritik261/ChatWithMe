import React from 'react';
import UploadSection from '../components/UploadSection';
import { motion } from 'framer-motion';

const UploadPage = () => {
  const handleUploadSuccess = (email) => {
    console.log("Upload success for:", email);
    // You might want to store email in state/context or redirect
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Upload Documents
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your PDF files to start chatting with them. We support documents up to 2MB.
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          <UploadSection onUploadSuccess={handleUploadSuccess} />
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
