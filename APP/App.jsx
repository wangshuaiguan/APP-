import React, { useState, useEffect } from 'react';
import { Layout, message } from 'antd';
import { useTheme } from './hooks/useTheme';
import { getConversations, saveConversation, getCurrentConversation, setCurrentConversation } from './utils/storage';
import { getMockResponse } from './utils/mockResponses';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import InputArea from './components/InputArea';
import ConversationList from './components/ConversationList';

const { Sider, Content } = Layout;

// 创建新对话
const createNewConversation = () => ({
  id: Date.now().toString(),
  title: '新对话',
  messages: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

const App = () => {
  const { theme } = useTheme();
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentConversation, setCurrentConversationState] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // 初始化加载对话
  useEffect(() => {
    const saved = getCurrentConversation();
    if (saved) {
      setCurrentConversationState(saved);
    } else {
      handleNewConversation();
    }
  }, []);

  // 创建新对话
  const handleNewConversation = () => {
    const newConv = createNewConversation();
    setCurrentConversationState(newConv);
    setCurrentConversation(newConv);
    setShowSidebar(false);
  };

  // 选择历史对话
  const handleSelectConversation = (conversation) => {
    setCurrentConversationState(conversation);
    setCurrentConversation(conversation);
    setShowSidebar(false);
  };

  // 发送消息
  const handleSendMessage = async (content) => {
    if (!currentConversation || isTyping) return;

    const userMessage = {
      role: 'user',
      content,
      timestamp: Date.now()
    };

    const updatedConversation = {
      ...currentConversation,
      messages: [...currentConversation.messages, userMessage],
      updatedAt: new Date().toISOString(),
      title: currentConversation.messages.length === 0 ? 
        content.slice(0, 20) + (content.length > 20 ? '...' : '') : 
        currentConversation.title
    };

    setCurrentConversationState(updatedConversation);
    setIsTyping(true);

    // 模拟AI响应延迟
    setTimeout(() => {
      const assistantMessage = {
        role: 'assistant',
        content: getMockResponse(content),
        timestamp: Date.now()
      };

      const finalConversation = {
        ...updatedConversation,
        messages: [...updatedConversation.messages, assistantMessage],
        updatedAt: new Date().toISOString()
      };

      setCurrentConversationState(finalConversation);
      saveConversation(finalConversation);
      setCurrentConversation(finalConversation);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  // 导出聊天记录
  const handleExportChat = () => {
    if (!currentConversation || currentConversation.messages.length === 0) {
      message.info('没有可导出的内容');
      return;
    }

    const content = currentConversation.messages
      .map(msg => `[${new Date(msg.timestamp).toLocaleString()}] ${msg.role === 'user' ? '用户' : '助手'}: ${msg.content}`)
      .join('\n\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `聊天记录_${currentConversation.title}_${new Date().toLocaleDateString()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // 切换侧边栏
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <Layout className="h-screen">
      {/* 移动端侧边栏 */}
      {showSidebar && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}
      
      <Sider
        width={240}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        className={`fixed left-0 top-0 h-full z-50 transition-transform duration-300 ${
          showSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{
          backgroundColor: theme === 'light' ? '#fafafa' : '#252525'
        }}
      >
        <ConversationList
          onSelectConversation={handleSelectConversation}
          currentConversationId={currentConversation?.id}
          onNewConversation={handleNewConversation}
          theme={theme}
        />
      </Sider>

      <Layout className={`transition-all duration-300 ${collapsed ? 'ml-0 lg:ml-20' : 'ml-0 lg:ml-60'}`}>
        <Header
          onToggleSidebar={toggleSidebar}
          showSidebar={showSidebar}
          currentConversation={currentConversation}
          onExportChat={handleExportChat}
          theme={theme}
        />
        
        <Content className="flex flex-col" style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#1e1e1e' }}>
          <ChatArea
            messages={currentConversation?.messages || []}
            isTyping={isTyping}
            theme={theme}
          />
          
          <InputArea
            onSendMessage={handleSendMessage}
            disabled={isTyping}
            theme={theme}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
