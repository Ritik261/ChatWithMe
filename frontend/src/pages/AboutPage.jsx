import React from 'react';
import { motion } from 'framer-motion';
import { Info, Users, ShieldCheck, Mail } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mb-6">
            <Info size={16} /> Our Story
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
            We're on a mission to make <br />
            <span className="text-indigo-600">information accessible</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-500 leading-relaxed">
            ChatWithMe was built with one goal in mind: to help people learn faster. 
            We believe that documents shouldn't be static, they should be interactive 
            knowledge partners.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-indigo-200">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4">User Focused</h3>
            <p className="text-gray-500">Every feature we build is designed to solve a real problem for our community.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-indigo-200">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4">Privacy First</h3>
            <p className="text-gray-500">We take your data security seriously. Your documents are your own.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-indigo-200">
              <Mail size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4">Support</h3>
            <p className="text-gray-500">Have questions? Our team is always here to help you get the most out of our tools.</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-3xl p-8 lg:p-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Join our community</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Stay up to date with the latest features and improvements. 
            Follow us on social media or reach out directly.
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
