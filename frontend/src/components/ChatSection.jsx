import React, { useState } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import axios from 'axios';

const ChatSection = ({ userEmail }) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! I am your AI assistant. Upload a PDF above and ask me anything about it.' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!query.trim() || !userEmail) return;

    const userMessage = { role: 'user', text: query };
    setMessages(prev => [...prev, userMessage]);
    setQuery('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/chat', {
        query: query,
        email: userEmail
      });
      
      const botMessage = { role: 'bot', text: response.data.answer };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat failed', error);
      setMessages(prev => [...prev, { role: 'bot', text: 'Sorry, I encountered an error. Please check if the backend is running.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="chat" className="py-24 bg-gray-50 border-y border-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Chat with Knowledge</h2>
          <p className="text-gray-500">Ask questions and get instant answers from your documents.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200 border border-gray-100 flex flex-col h-[600px] overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-gray-50 bg-white flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-700">AI Knowledge Base {userEmail && `(${userEmail})`}</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-indigo-600'}`}>
                  {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-gray-100 text-gray-700 rounded-tl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-gray-100 text-indigo-600 flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div className="bg-gray-100 p-4 rounded-2xl rounded-tl-none">
                  <Loader2 className="animate-spin text-indigo-600" size={20} />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-6 bg-white border-t border-gray-50">
            <div className="relative">
              <input 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={userEmail ? "Ask a question..." : "Please upload a file first"}
                disabled={!userEmail || loading}
                className="w-full pl-4 pr-14 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none disabled:bg-gray-50"
              />
              <button 
                type="submit"
                disabled={!userEmail || loading || !query.trim()}
                className="absolute right-2 top-2 bottom-2 px-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all disabled:bg-gray-300"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChatSection;
