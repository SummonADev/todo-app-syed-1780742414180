export type Category = 'Work' | 'Personal' | 'Shopping' | 'Health' | 'Other';

export type Priority = 'Low' | 'Medium' | 'High';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  category: Category;
  priority: Priority;
  createdAt: number;
  dueDate?: string;
}

export type FilterStatus = 'all' | 'active' | 'completed';