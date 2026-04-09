function TaskItem({ task, onToggle, onDelete }) {
  const containerClass = `task-item ${task.completed ? 'completed' : ''}`

  return (
    <div className={containerClass}>
      <input 
        type="checkbox" 
        className="task-checkbox" 
        checked={task.completed} 
        onChange={onToggle}
      />
      
      <div className="task-content">
        <div className="task-badges">
          <span className={`mini-badge ${task.category}`}>
            {task.category.toUpperCase()}
          </span>
          <span className={`mini-badge priority-${task.priority}`}>
            {task.priority.toUpperCase()}
          </span>
          {task.date && (
            <span className="task-date-small">
              📅 {new Date(task.date).toLocaleDateString('pt-BR')}
            </span>
          )}
        </div>
        <div className="task-text">{task.text}</div>
      </div>

      <button 
        className="btn-delete" 
        onClick={onDelete} 
        style={{ fontSize: '1rem', opacity: 0.3 }}
        title="Excluir"
      >
        🗑️
      </button>

    </div>
  )
}

export default TaskItem

