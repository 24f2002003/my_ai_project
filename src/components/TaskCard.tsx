import React from 'react';
import { Trash2, Edit2, AlertCircle } from 'lucide-react';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const priorityColors = {
  low: 'text-blue-500',
  medium: 'text-yellow-500',
  high: 'text-red-500',
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onEdit }) => {
  return (
    <div className="task-card">
      <div className="task-header">
        <h3>{task.title}</h3>
        <div className="task-actions">
          <button onClick={() => onEdit(task)} title="Edit">
            <Edit2 size={16} />
          </button>
          <button onClick={() => onDelete(task.id)} title="Delete">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      {task.description && <p className="task-description">{task.description}</p>}
      <div className="task-footer">
        <span className={`priority ${priorityColors[task.priority]}`}>
          <AlertCircle size={12} /> {task.priority}
        </span>
        <span className="status">{task.status}</span>
      </div>
    </div>
  );
};
