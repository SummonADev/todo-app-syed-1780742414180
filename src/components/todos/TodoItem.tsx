import React from 'react';
import {
  Trash2,
  CheckCircle2,
  Circle,
  Clock,
  Tag,
  AlertCircle,
  Calendar
} from 'lucide-react';
import { Todo } from '@/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const priorityColors = {
    Low: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    Medium: 'bg-amber-50 text-amber-600 border-amber-100',
    High: 'bg-rose-50 text-rose-600 border-rose-100',
  };

  return (
    <div className={cn(
      "group flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-xl transition-all hover:shadow-md",
      todo.completed && "opacity-75"
    )}>
      <button
        onClick={() => onToggle(todo.id)}
        className="mt-1 focus:outline-none"
      >
        {todo.completed ? (
          <CheckCircle2 className="w-6 h-6 text-indigo-500 fill-indigo-50" />
        ) : (
          <Circle className="w-6 h-6 text-slate-300 group-hover:text-indigo-400" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <h3 className={cn(
            "text-base font-semibold truncate transition-all",
            todo.completed ? "text-slate-400 line-through" : "text-slate-800"
          )}>
            {todo.title}
          </h3>
          
          <div className="flex items-center gap-1.5">
            <span className={cn(
              "text-[10px] font-bold uppercase px-2 py-0.5 rounded border",
              priorityColors[todo.priority]
            )}>
              {todo.priority}
            </span>
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded border border-slate-100 bg-slate-50 text-slate-500">
              <Tag className="w-2.5 h-2.5" />
              {todo.category}
            </span>
          </div>
        </div>

        {todo.description && (
          <p className={cn(
            "text-sm mb-3 line-clamp-2",
            todo.completed ? "text-slate-400" : "text-slate-600"
          )}>
            {todo.description}
          </p>
        )}

        <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{format(todo.createdAt, 'MMM d, h:mm a')}</span>
          </div>
          {todo.dueDate && (
            <div className="flex items-center gap-1 text-indigo-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>Due: {format(new Date(todo.dueDate), 'MMM d, yyyy')}</span>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all focus:outline-none"
        aria-label="Delete task"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}