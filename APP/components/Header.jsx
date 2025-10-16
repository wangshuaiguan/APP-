import React from 'react';
import { Typography, Dropdown, Space, Switch, Button, Modal, message } from 'antd';
import { MenuOutlined, SettingOutlined, DeleteOutlined, DownloadOutlined, BulbOutlined } from '@ant-design/icons';
import { useTheme } from '../hooks/useTheme';
import { clearAllData, getConversations } from '../utils/storage';

const { Title } = Typography;

const Header = ({ onToggleSidebar, showSidebar, currentConversation, onExportChat, theme }) => {
  const { theme: currentTheme, toggleTheme } = useTheme();

  const handleClearAll = () => {
    Modal.confirm({
      title: '确认清除',
      content: '确定要清除所有对话记录吗？此操作不可恢复。',
      onOk: () => {
        if (clearAllData()) {
          message.success('清除成功');
          window.location.reload();
        } else {
          message.error('清除失败');
        }
      }
    });
  };

  const menuItems = [
    {
      key: 'theme',
      label: (
        <div className="flex items-center justify-between w-full">
          <span>深色模式</span>
          <Switch
            checked={currentTheme === 'dark'}
            onChange={toggleTheme}
            size="small"
          />
        </div>
      ),
      icon: <BulbOutlined />
    },
    {
      key: 'export',
      label: '导出记录',
      icon: <DownloadOutlined />,
      onClick: onExportChat
    },
    {
      type: 'divider'
    },
    {
      key: 'clear',
      label: '清除所有记录',
      icon: <DeleteOutlined />,
      danger: true,
      onClick: handleClearAll
    }
  ];

  return (
    <div 
      className="flex items-center justify-between px-4 py-3 border-b"
      style={{ 
        borderColor: theme === 'light' ? '#f0f0f0' : '#404040',
        backgroundColor: theme === 'light' ? '#ffffff' : '#1e1e1e'
      }}
    >
      <div className="flex items-center gap-3">
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={onToggleSidebar}
          className="lg:hidden"
          style={{ color: theme === 'light' ? '#1a1a1a' : '#e0e0e0' }}
        />
        <Title 
          level={4} 
          className="m-0"
          style={{ color: theme === 'light' ? '#1a1a1a' : '#e0e0e0' }}
        >
          智能助手
        </Title>
        {currentConversation && (
          <span 
            className="text-sm"
            style={{ color: theme === 'light' ? '#8c8c8c' : '#999' }}
          >
            · {currentConversation.title}
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <Dropdown
          menu={{ items: menuItems }}
          trigger={['click']}
          placement="bottomRight"
        >
          <Button
            type="text"
            icon={<SettingOutlined />}
            style={{ color: theme === 'light' ? '#1a1a1a' : '#e0e0e0' }}
          />
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
