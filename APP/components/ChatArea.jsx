import React, { useEffect, useRef } from 'react';
import { Spin, Empty } from 'antd';
import MessageBubble from './MessageBubble';

const ChatArea = ({ messages, isTyping, theme }) => {
  const chatContainerRef = useRef(null);

  // 自动滚动到底部
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-hidden">
      <div 
        ref={chatContainerRef}
        className="h-full px-4 py-6 overflow-y-auto custom-scrollbar"
        style={{
          backgroundColor: theme === 'light' ? '#ffffff' : '#1e1e1e'
        }}
      >
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <Empty 
              description="开始新的对话吧"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {messages.map((message, index) => (
              <MessageBubble 
                key={`${message.timestamp}-${index}`} 
                message={message} 
                theme={theme}
              />
            ))}
            {isTyping && (
              <MessageBubble 
                message={{
                  role: 'assistant',
                  content: '',
                  timestamp: Date.now()
                }}
                isTyping={true}
                theme={theme}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatArea;
