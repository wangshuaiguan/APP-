import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

const MessageBubble = ({ message, isTyping = false, theme }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 message-enter`}>
      <div className={`max-w-[70%] ${isUser ? 'order-2' : 'order-1'}`}>
        <div
          className={`px-4 py-3 rounded-2xl ${
            isUser
              ? 'bg-primary text-white'
              : theme === 'light' ? 'bg-surface-light text-text-primary-light' : 'bg-surface-dark text-text-primary-dark'
          }`}
        >
          {isTyping ? (
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          ) : (
            <Text className={`${isUser ? 'text-white' : ''} leading-relaxed whitespace-pre-wrap`}>
              {message.content}
            </Text>
          )}
        </div>
        <div className="text-xs text-support-gray mt-1 px-2">
          {new Date(message.timestamp).toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
