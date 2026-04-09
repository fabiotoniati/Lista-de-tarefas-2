import TaskItem from './TaskItem'

function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="task-empty">
        <p>Nenhuma tarefa encontrada.</p>
      </div>
    )
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onToggle={() => onToggle(task.id)} 
          onDelete={() => onDelete(task.id)} 
        />
      ))}
    </div>
  )
}

export default TaskList
