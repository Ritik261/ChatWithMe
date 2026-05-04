import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import UploadSection from './components/UploadSection';
import ChatSection from './components/ChatSection';
import Footer from './components/Footer';

function App() {
  const [userEmail, setUserEmail] = useState('');

  const handleUploadSuccess = (email) => {
    setUserEmail(email);
    // Smooth scroll to chat section after successful upload
    document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />
      <main>
        <Hero />
        <UploadSection onUploadSuccess={handleUploadSuccess} />
        <ChatSection userEmail={userEmail} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
