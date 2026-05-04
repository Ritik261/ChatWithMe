import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

const UploadSection = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !email) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await axios.post(`http://localhost:8000/upload?email=${email}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setStatus('success');
      onUploadSuccess(email);
    } catch (error) {
      console.error('Upload failed', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="upload" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Upload your PDF</h2>
          <p className="text-gray-500">Provide your email and the document you want to chat with.</p>
        </div>

        <form onSubmit={handleUpload} className="bg-gray-50 rounded-3xl p-8 lg:p-12 border-2 border-dashed border-gray-200 hover:border-indigo-400 transition-colors">
          <div className="grid gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Your Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ritik@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                required
              />
            </div>

            <div className="relative group">
              <input 
                type="file" 
                onChange={(e) => setFile(e.target.files[0])}
                accept=".pdf"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center group-hover:bg-gray-50 transition-all">
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
              disabled={loading || !file || !email}
              className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-100"
            >
              {loading ? <Loader2 className="animate-spin" /> : <CheckCircle size={20} />}
              {loading ? "Processing..." : "Start Chatting"}
            </button>

            {status === 'success' && (
              <p className="text-center text-green-600 text-sm font-medium">✨ Upload successful! Scroll down to chat.</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default UploadSection;
