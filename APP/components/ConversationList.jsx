import React, { useState, useEffect } from 'react';
import { List, Button, Modal, Input, message, Typography, Dropdown } from 'antd';
import { PlusOutlined, DeleteOutlined, MoreOutlined, EditOutlined } from '@ant-design/icons';
import { getConversations, deleteConversation } from '../utils/storage';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const ConversationList = ({ onSelectConversation, currentConversationId, onNewConversation, theme }) => {
  const [conversations, setConversations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = () => {
    const convs = getConversations();
    setConversations(convs);
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条对话记录吗？',
      onOk: () => {
        if (deleteConversation(id)) {
          message.success('删除成功');
          loadConversations();
          if (currentConversationId === id) {
            onNewConversation();
          }
        } else {
          message.error('删除失败');
        }
      }
    });
  };

  const handleEdit = (id, e) => {
    e.stopPropagation();
    const conv = conversations.find(c => c.id === id);
    if (conv) {
      setEditingId(id);
      setEditingTitle(conv.title);
    }
  };

  const saveEdit = (id) => {
    if (editingTitle.trim()) {
      const updatedConversations = conversations.map(conv => 
        conv.id === id ? { ...conv, title: editingTitle.trim() } : conv
      );
      setConversations(updatedConversations);
      localStorage.setItem('chat_conversations', JSON.stringify(updatedConversations));
      setEditingId(null);
      setEditingTitle('');
    }
  };

  const getItemActions = (item) => [
    {
      key: 'edit',
      label: '重命名',
      icon: <EditOutlined />,
      onClick: (e) => handleEdit(item.id, e)
    },
    {
      key: 'delete',
      label: '删除',
      icon: <DeleteOutlined />,
      danger: true,
      onClick: (e) => handleDelete(item.id, e)
    }
  ];

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: theme === 'light' ? '#fafafa' : '#252525' }}>
      <div className="p-4 border-b" style={{ borderColor: theme === 'light' ? '#f0f0f0' : '#404040' }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onNewConversation}
          className="w-full"
        >
          新建对话
        </Button>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <List
          className="custom-scrollbar"
          style={{ height: '100%', overflow: 'auto' }}
          dataSource={conversations}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              className={`cursor-pointer transition-colors px-4 ${
                currentConversationId === item.id
                  ? theme === 'light' ? 'bg-blue-50' : 'bg-blue-900/20'
                  : ''
              } hover:${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800/50'}`}
              onClick={() => onSelectConversation(item)}
              actions={[
                <Dropdown
                  key="dropdown"
                  menu={{ items: getItemActions(item) }}
                  trigger={['click']}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button 
                    type="text" 
                    icon={<MoreOutlined />} 
                    size="small"
                    className={`${theme === 'light' ? 'text-gray-400' : 'text-gray-500'} hover:text-current`}
                  />
                </Dropdown>
              ]}
            >
              <List.Item.Meta
                title={
                  editingId === item.id ? (
                    <Input
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      onPressEnter={() => saveEdit(item.id)}
                      onBlur={() => saveEdit(item.id)}
                      onClick={(e) => e.stopPropagation()}
                      size="small"
                      autoFocus
                    />
                  ) : (
                    <Title 
                      level={5} 
                      className="m-0 truncate"
                      style={{ color: theme === 'light' ? '#1a1a1a' : '#e0e0e0' }}
                    >
                      {item.title}
                    </Title>
                  )
                }
                description={
                  <Text 
                    className="text-xs"
                    style={{ color: theme === 'light' ? '#8c8c8c' : '#999' }}
                  >
                    {dayjs(item.createdAt).format('MM-DD HH:mm')}
                  </Text>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default ConversationList;
