import { useState } from 'react'

function TaskInput({ onAddTask }) {
  const [text, setText] = useState('')
  const [category, setCategory] = useState('')
  const [priority, setPriority] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!text.trim() || !category || !priority) return

    const newTask = {
      text: text.trim(),
      category,
      priority,
      date,
      completed: false
    }


    onAddTask(newTask)
    setText('')
    setCategory('')
    setPriority('')
  }

  return (
    <div className="task-input-container">
      <h3 className="input-header">Qual sua meta de hoje?</h3>
      <form className="task-input-form" onSubmit={handleSubmit}>
        <div className="main-input-wrapper">
          <input 
            type="text" 
            placeholder="Adicionar tarefa" 
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />

        </div>
        
        <div className="input-options-row">
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)}
            className="date-pill"
          />

          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="select-pill"
            required
          >
            <option value="" disabled>Categoria</option>
            <option value="trabalho">Trabalho</option>
            <option value="pessoal">Pessoal</option>
            <option value="estudo">Estudo</option>
          </select>


          <select 
            value={priority} 
            onChange={(e) => setPriority(e.target.value)}
            className="select-pill"
            required
          >
            <option value="" disabled>Prioridade</option>
            <option value="alta">Alta</option>
            <option value="media">Média</option>
            <option value="baixa">Baixa</option>
          </select>


          <button type="submit" className="btn-add-pill">
            + Adicionar
          </button>

        </div>
      </form>
    </div>

  )
}

export default TaskInput

