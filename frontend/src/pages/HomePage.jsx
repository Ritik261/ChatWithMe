import React from 'react';
import Hero from '../components/Hero';
import { motion } from 'framer-motion';
import { Shield, Zap, Globe, MessageSquare } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: <MessageSquare className="w-6 h-6 text-indigo-600" />,
      title: "Instant Chat",
      description: "Ask anything and get answers from your documents in seconds."
    },
    {
      icon: <Zap className="w-6 h-6 text-indigo-600" />,
      title: "Smart Extraction",
      description: "Our AI extracts key insights and summaries automatically."
    },
    {
      icon: <Shield className="w-6 h-6 text-indigo-600" />,
      title: "Secure Storage",
      description: "Your documents are encrypted and stored securely."
    },
    {
      icon: <Globe className="w-6 h-6 text-indigo-600" />,
      title: "Multi-language",
      description: "Chat with documents in over 50 different languages."
    }
  ];

  return (
    <div className="bg-white">
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Why choose ChatWithMe?
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              The ultimate tool for researchers, students, and professionals to unlock knowledge from PDFs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Ready to supercharge your reading?
          </h2>
          <p className="text-indigo-100 text-lg mb-10">
            Join thousands of users who are already saving time and learning faster.
          </p>
          <button className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-all shadow-xl">
            Start Uploading Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
