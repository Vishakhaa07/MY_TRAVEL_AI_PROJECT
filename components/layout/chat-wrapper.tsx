'use client';

import { useState } from 'react';
import { AIChatAssistant } from '@/components/chat/ai-chat-assistant';

export function ChatWrapper() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen) {
      setIsChatMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsChatMinimized(!isChatMinimized);
  };

  return (
    <AIChatAssistant
      isOpen={isChatOpen}
      onToggle={toggleChat}
      isMinimized={isChatMinimized}
      onMinimize={toggleMinimize}
    />
  );
}