import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const UploadSection = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const { user } = useUser();
  const navigate = useNavigate();
  const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
  })
  const email = user?.primaryEmailAddress?.emailAddress || '';

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !email) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      // Note: In a real app, you should use environment variables for the API URL
      const response = await api.post(`/upload?email=${email}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setStatus('success');
      if (onUploadSuccess) onUploadSuccess(email);
      
      // Redirect to chat after a short delay to show success
      setTimeout(() => {
        navigate('/chat');
      }, 1500);
    } catch (error) {
      console.error('Upload failed', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 bg-white rounded-3xl shadow-sm border border-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        <form onSubmit={handleUpload} className="bg-gray-50 rounded-2xl p-6 lg:p-10 border-2 border-dashed border-gray-200 hover:border-indigo-400 transition-colors">
          <div className="grid gap-6">
            <div className="relative group">
              <input 
                type="file" 
                onChange={(e) => setFile(e.target.files[0])}
                accept=".pdf"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="bg-white rounded-xl p-8 border border-gray-200 text-center group-hover:bg-gray-50 transition-all">
                <div className="mx-auto w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-4">
                  {file ? <FileText /> : <Upload />}
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {file ? file.name : "Click to select or drag and drop"}
                </p>
                <p className="text-xs text-gray-400 mt-1">PDF files only (max. 10MB)</p>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading || !file}
              className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 transition-all active:scale-95"
            >
              {loading ? <Loader2 className="animate-spin" /> : <CheckCircle size={20} />}
              {loading ? "Processing..." : "Upload and Start Chatting"}
            </button>

            {status === 'success' && (
              <div className="flex items-center justify-center gap-2 text-green-600 bg-green-50 py-3 rounded-xl animate-bounce">
                <CheckCircle size={18} />
                <span className="text-sm font-bold">Upload successful! Redirecting to chat...</span>
              </div>
            )}
            
            {status === 'error' && (
              <p className="text-center text-red-600 text-sm font-medium">❌ Upload failed. Please try again.</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default UploadSection;
