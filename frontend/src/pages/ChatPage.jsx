import React from 'react';
import ChatSection from '../components/ChatSection';
import { useUser } from '@clerk/clerk-react';

const ChatPage = () => {
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress || '';

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] mt-16 bg-white overflow-hidden">
      <ChatSection userEmail={userEmail} />
    </div>
  );
};

export default ChatPage;
