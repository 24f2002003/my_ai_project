import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { Task, List, Status, Priority } from '../types';

interface TaskState {
  tasks: Task[];
  lists: List[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  addList: (list: Omit<List, 'id' | 'order'>) => void;
  updateList: (id: string, updates: Partial<List>) => void;
  deleteList: (id: string) => void;
  moveTask: (taskId: string, listId: string) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      lists: [
        { id: '1', title: 'To Do', order: 0 },
        { id: '2', title: 'In Progress', order: 1 },
        { id: '3', title: 'Done', order: 2 },
      ],
      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, { ...task, id: uuidv4() }],
        })),
      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),
      addList: (list) =>
        set((state) => ({
          lists: [
            ...state.lists,
            { ...list, id: uuidv4(), order: state.lists.length },
          ],
        })),
      updateList: (id, updates) =>
        set((state) => ({
          lists: state.lists.map((l) => (l.id === id ? { ...l, ...updates } : l)),
        })),
      deleteList: (id) =>
        set((state) => ({
          lists: state.lists.filter((l) => l.id !== id),
          tasks: state.tasks.filter((t) => t.listId !== id),
        })),
      moveTask: (taskId, listId) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId ? { ...t, listId } : t
          ),
        })),
    }),
    {
      name: 'kanban-storage',
    }
  )
);
