export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  listId: string;
}

export interface List {
  id: string;
  title: string;
  order: number;
}
