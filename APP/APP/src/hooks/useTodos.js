import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('todos_64341')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setTodos(data || []);
    } catch (err) {
      console.error('Error fetching todos:', err);
      setError('获取待办事项失败');
    } finally {
      setLoading(false);
    }
  }, []);

  const addTodo = async (text) => {
    try {
      if (!text?.trim()) {
        throw new Error('任务内容不能为空');
      }
      
      const { data, error } = await supabase
        .from('todos_64341')
        .insert([{ text: text.trim() }])
        .select()
        .single();

      if (error) throw error;
      
      setTodos(prev => [data, ...prev]);
      return data;
    } catch (err) {
      console.error('Error adding todo:', err);
      setError(err.message || '添加任务失败');
      throw err;
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      if (!id) {
        throw new Error('无效的任务ID');
      }
      
      const { data, error } = await supabase
        .from('todos_64341')
        .update({ completed })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setTodos(prev => 
        prev.map(todo => 
          todo.id === id ? { ...todo, completed } : todo
        )
      );
      
      return data;
    } catch (err) {
      console.error('Error toggling todo:', err);
      setError('更新任务状态失败');
      throw err;
    }
  };

  const deleteTodo = async (id) => {
    try {
      if (!id) {
        throw new Error('无效的任务ID');
      }
      
      const { error } = await supabase
        .from('todos_64341')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
      setError('删除任务失败');
      throw err;
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return {
    todos,
    loading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
    refreshTodos: fetchTodos
  };
};