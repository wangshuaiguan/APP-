import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const TodoInput = ({ onAdd }) => {
  const [text, setText] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex items-center p-3 border-b border-gray-200">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="输入新任务并回车"
        className="flex-grow px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
        aria-label="添加任务"
      >
        <Plus size={18} />
      </button>
    </form>
  );
};

export default TodoInput;