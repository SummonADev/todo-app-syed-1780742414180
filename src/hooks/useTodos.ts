import { useState, useEffect } from 'react';
import { Todo, Category, Priority, FilterStatus } from '@/types';
import { generateId } from '@/lib/utils';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState<FilterStatus>('all');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string, description: string, category: Category, priority: Priority, dueDate?: string) => {
    const newTodo: Todo = {
      id: generateId(),
      title,
      description,
      category,
      priority,
      completed: false,
      createdAt: Date.now(),
      dueDate,
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(t => !t.completed));
  };

  const filteredTodos = todos.filter(todo => {
    const matchesStatus = filter === 'all' ? true : filter === 'completed' ? todo.completed : !todo.completed;
    const matchesCategory = categoryFilter === 'All' ? true : todo.category === categoryFilter;
    const matchesSearch = todo.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         todo.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length,
  };

  return {
    todos: filteredTodos,
    stats,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    filter,
    setFilter,
    categoryFilter,
    setCategoryFilter,
    searchQuery,
    setSearchQuery,
  };
}