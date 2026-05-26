import React from 'react';
import { TaskCard } from './TaskCard';
import { List, Task } from '../types';

interface TaskListProps {
  list: List;
  tasks: Task[];
  onDeleteTask: (id: string) => void;
  onEditTask: (task: Task) => void;
  onAddTask: (listId: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  list,
  tasks,
  onDeleteTask,
  onEditTask,
  onAddTask,
}) => {
  return (
    <div className="task-list">
      <div className="list-header">
        <h2>{list.title}</h2>
        <span className="task-count">{tasks.length}</span>
      </div>
      <div className="tasks-container">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDeleteTask}
            onEdit={onEditTask}
          />
        ))}
      </div>
      <button className="add-task-btn" onClick={() => onAddTask(list.id)}>
        + Add a task
      </button>
    </div>
  );
};
