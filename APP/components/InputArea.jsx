import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const InputArea = ({ onSendMessage, disabled = false, theme }) => {
  const [message, setMessage] = useState('');
  const [inputHeight, setInputHeight] = useState(40);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      setInputHeight(40);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    // 自动调整输入框高度
    const lines = e.target.value.split('\n').length;
    const newHeight = Math.min(40 + (lines - 1) * 24, 120);
    setInputHeight(newHeight);
  };

  return (
    <div 
      className="border-t px-4 py-4"
      style={{
        borderColor: theme === 'light' ? '#f0f0f0' : '#404040',
        backgroundColor: theme === 'light' ? '#ffffff' : '#1e1e1e'
      }}
    >
      <div className="max-w-4xl mx-auto flex gap-3">
        <Input.TextArea
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="请输入您的问题..."
          autoSize={{ minRows: 1, maxRows: 4 }}
          disabled={disabled}
          className="flex-1"
          style={{
            resize: 'none',
            backgroundColor: theme === 'light' ? '#ffffff' : '#2d2d2d',
            borderColor: theme === 'light' ? '#d9d9d9' : '#404040',
            color: theme === 'light' ? '#1a1a1a' : '#e0e0e0'
          }}
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          className="px-6"
        >
          发送
        </Button>
      </div>
      <div className="text-xs text-support-gray text-center mt-2">
        按 Enter 发送，Shift + Enter 换行
      </div>
    </div>
  );
};

export default InputArea;
