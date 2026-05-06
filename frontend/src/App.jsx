import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));
const UploadPage = lazy(() => import('./pages/UploadPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-900 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={
                <>
                  <HomePage />
                  <Footer />
                </>
              } />
              <Route path="/about" element={
                <>
                  <AboutPage />
                  <Footer />
                </>
              } />
              
              {/* Protected Routes */}
              <Route 
                path="/chat" 
                element={
                  <>
                    <SignedIn>
                      <ChatPage />
                    </SignedIn>
                    <SignedOut>
                      <RedirectToSignIn />
                    </SignedOut>
                  </>
                } 
              />
              <Route 
                path="/upload" 
                element={
                  <>
                    <SignedIn>
                      <UploadPage />
                    </SignedIn>
                    <SignedOut>
                      <RedirectToSignIn />
                    </SignedOut>
                  </>
                } 
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;

