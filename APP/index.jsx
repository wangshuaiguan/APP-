import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider, App as AntdApp } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import App from './App';
import './index.css';

// 主题配置
const themeConfig = {
  token: {
    colorPrimary: '#1890ff',
    borderRadius: 8,
  },
  algorithm: theme => {
    return {
      ...theme,
      // 自定义算法
    };
  },
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigProvider 
      locale={zhCN}
      theme={themeConfig}
    >
      <AntdApp>
        <App />
      </AntdApp>
    </ConfigProvider>
  </React.StrictMode>
);
