import React from 'react';
import { Search, Filter, Trash2, SlidersHorizontal, ListTodo } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { TodoForm } from '@/components/todos/TodoForm';
import { TodoItem } from '@/components/todos/TodoItem';
import { Stats } from '@/components/todos/Stats';
import { useTodos } from '@/hooks/useTodos';
import { cn } from '@/lib/utils';

export function Dashboard() {
  const {
    todos,
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
    setSearchQuery
  } = useTodos();

  const categories = ['All', 'Work', 'Personal', 'Shopping', 'Health', 'Other'];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Welcome back!</h2>
            <p className="text-slate-500">You have {stats.active} tasks remaining for today.</p>
          </div>
          
          <div className="flex gap-2">
            {stats.completed > 0 && (
              <button
                onClick={clearCompleted}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear Completed
              </button>
            )}
          </div>
        </div>

        <Stats stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-slate-800">
                <SlidersHorizontal className="w-4 h-4" />
                <span className="font-bold text-sm uppercase tracking-wider">Status</span>
              </div>
              <div className="space-y-1">
                {['all', 'active', 'completed'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f as any)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all capitalize",
                      filter === f 
                        ? "bg-indigo-50 text-indigo-700" 
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 mt-8 mb-4 text-slate-800">
                <Filter className="w-4 h-4" />
                <span className="font-bold text-sm uppercase tracking-wider">Categories</span>
              </div>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat as any)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all",
                      categoryFilter === cat 
                        ? "bg-indigo-50 text-indigo-700" 
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main List Area */}
          <div className="lg:col-span-9 space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search your tasks..."
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all text-slate-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <TodoForm onAdd={addTodo} />

            <div className="space-y-3">
              {todos.length > 0 ? (
                todos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                  />
                ))
              ) : (
                <div className="bg-white rounded-xl border-2 border-dashed border-slate-200 py-16 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-4 text-slate-300">
                    <ListTodo className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">No tasks found</h3>
                  <p className="text-slate-500">Try adjusting your filters or search terms.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}