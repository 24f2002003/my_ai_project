import React, { useState } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { TaskList } from './TaskList';
import { TaskForm } from './TaskForm';
import { Task } from '../types';

export const KanbanBoard: React.FC = () => {
  const { tasks, lists, addTask, updateTask, deleteTask, addList } = useTaskStore();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [addingToTaskListId, setAddingToTaskListId] = useState<string | null>(null);
  const [newListTitle, setNewListTitle] = useState('');
  const [isAddingList, setIsAddingList] = useState(false);

  const handleAddList = (e: React.FormEvent) => {
    e.preventDefault();
    if (newListTitle.trim()) {
      addList({ title: newListTitle });
      setNewListTitle('');
      setIsAddingList(false);
    }
  };

  const handleAddTask = (listId: string) => {
    setAddingToTaskListId(listId);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleDeleteTask = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
    }
  };

  const handleFormSubmit = (data: Omit<Task, 'id'>) => {
    if (editingTask) {
      updateTask(editingTask.id, data);
      setEditingTask(null);
    } else if (addingToTaskListId) {
      addTask(data);
      setAddingToTaskListId(null);
    }
  };

  return (
    <div className="kanban-board">
      <div className="board-header">
        <h1>Kanban Board</h1>
      </div>
      <div className="lists-wrapper">
        {lists
          .sort((a, b) => a.order - b.order)
          .map((list) => (
            <TaskList
              key={list.id}
              list={list}
              tasks={tasks.filter((t) => t.listId === list.id)}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
              onAddTask={handleAddTask}
            />
          ))}
        
        <div className="add-list-container">
          {isAddingList ? (
            <form onSubmit={handleAddList}>
              <input
                type="text"
                autoFocus
                placeholder="List title"
                value={newListTitle}
                onChange={(e) => setNewListTitle(e.target.value)}
              />
              <div className="form-actions">
                <button type="submit">Add List</button>
                <button type="button" onClick={() => setIsAddingList(false)}>X</button>
              </div>
            </form>
          ) : (
            <button className="add-list-btn" onClick={() => setIsAddingList(true)}>
              + Add another list
            </button>
          )}
        </div>
      </div>

      {(editingTask || addingToTaskListId) && (
        <TaskForm
          initialData={editingTask || undefined}
          listId={addingToTaskListId || ''}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setEditingTask(null);
            setAddingToTaskListId(null);
          }}
        />
      )}
    </div>
  );
};
