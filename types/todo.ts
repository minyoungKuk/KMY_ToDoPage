export interface Todo {
  id: string;
  title: string;
  category: string;
  tag?: string;
  memo?: string;
  startDate?: string;
  dueDate?: string;
  isCompleted: boolean;
  priority?: 1 | 2 | 3;
  createdAt?: string;
  updatedAt?: string;
  isFavorite?: boolean;
  subTasks?: Todo[];
}
