import React from 'react';
import { Check, Trash2 } from 'lucide-react';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tooltip from '@radix-ui/react-tooltip';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-white hover:bg-gray-50 transition-colors duration-150">
      <div className="flex items-center space-x-3 flex-grow">
        <Checkbox.Root
          className="flex h-5 w-5 appearance-none items-center justify-center rounded border border-gray-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 transition-colors duration-150 outline-none"
          id={`todo-${todo.id}`}
          checked={todo.completed}
          onCheckedChange={(checked) => onToggle(todo.id, checked)}
        >
          <Checkbox.Indicator className="text-white">
            <Check size={16} />
          </Checkbox.Indicator>
        </Checkbox.Root>
        
        <label
          className={`text-sm flex-grow cursor-pointer ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
          htmlFor={`todo-${todo.id}`}
        >
          {todo.text}
        </label>
      </div>
      
      <Dialog.Root>
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Dialog.Trigger asChild>
                <button
                  className="ml-2 p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors duration-150 opacity-0 group-hover:opacity-100"
                  aria-label="删除任务"
                >
                  <Trash2 size={16} />
                </button>
              </Dialog.Trigger>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-xs rounded-md px-2 py-1 bg-gray-900 text-white select-none"
                sideOffset={5}
              >
                删除任务
                <Tooltip.Arrow className="fill-gray-900" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
        
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/50 fixed inset-0 animate-overlayShow" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-lg w-[90vw] max-w-md animate-contentShow">
            <Dialog.Title className="text-lg font-semibold text-gray-900 mb-2">
              确认删除
            </Dialog.Title>
            <Dialog.Description className="text-sm text-gray-500 mb-4">
              您确定要删除这个任务吗？此操作无法撤销。
            </Dialog.Description>
            <div className="flex justify-end space-x-3">
              <Dialog.Close asChild>
                <button
                  className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors duration-150"
                >
                  取消
                </button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <button
                  className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-150"
                  onClick={() => onDelete(todo.id)}
                >
                  删除
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default TodoItem;