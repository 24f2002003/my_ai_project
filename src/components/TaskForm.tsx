import React, { useState } from 'react';
import { Priority, Status, Task } from '../types';
import { useTaskStore } from '../store/useTaskStore';

interface TaskFormProps {
  initialData?: Partial<Task>;
  onSubmit: (data: Omit<Task, 'id'>) => void;
  onCancel: () => void;
  listId: string;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  listId,
}) => {
  const { lists } = useTaskStore();
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [priority, setPriority] = useState<Priority>(initialData?.priority || 'medium');
  const [status, setStatus] = useState<Status>(initialData?.status || 'todo');
  const [selectedListId, setSelectedListId] = useState(initialData?.listId || listId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({
      title,
      description,
      priority,
      status,
      listId: selectedListId,
    });
  };

  return (
    <div className="modal-overlay">
      <form className="task-form" onSubmit={handleSubmit}>
        <h2>{initialData ? 'Edit Task' : 'Create Task'}</h2>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="form-group">
          <label>Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="form-group">
          <label>List</label>
          <select
            value={selectedListId}
            onChange={(e) => setSelectedListId(e.target.value)}
          >
            {lists.map((l) => (
              <option key={l.id} value={l.id}>
                {l.title}
              </option>
            ))}
          </select>
        </div>
        <div className="form-actions">
          <button type="button" onClick={onCancel}>Cancel</button>
          <button type="submit">{initialData ? 'Save' : 'Create'}</button>
        </div>
      </form>
    </div>
  );
};
