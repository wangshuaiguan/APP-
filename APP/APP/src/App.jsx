import React from 'react';
import { useTodos } from './hooks/useTodos';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';

const App = () => {
  const { todos, loading, error, addTodo, toggleTodo, deleteTodo } = useTodos();
  
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50 border-l border-gray-200">
      <div className="p-4 border-b border-gray-200 bg-white">
        <h1 className="text-lg font-semibold text-gray-900">待办事项</h1>
      </div>
      
      <TodoInput onAdd={addTodo} />
      
      {error && (
        <div className="p-3 bg-red-50 text-red-700 text-sm border-b border-red-100">
          {error}
        </div>
      )}
      
      <div className="flex-grow overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500">加载中...</div>
          </div>
        ) : todos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="text-gray-400 mb-2">暂无待办事项</div>
            <p className="text-gray-500 text-sm">添加您的第一个任务开始使用</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {todos.map((todo) => (
              <div key={todo.id} className="group">
                <TodoItem
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-3 text-center border-t border-gray-200 bg-white text-xs text-gray-500">
        {todos.length} 个任务
      </div>
    </div>
  );
};

export default App;