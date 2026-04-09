import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Header from './components/Header'
import TaskInput from './components/TaskInput'
import FilterBar from './components/FilterBar'
import TaskList from './components/TaskList'
import CalendarView from './components/CalendarView'
import AnalyticsView from './components/AnalyticsView'
import Login from './components/Login'

function App() {
  const [session, setSession] = useState(null)
  const [activeTab, setActiveTab] = useState('tarefas')
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  // Auth Listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Fetch Tasks from Supabase
  useEffect(() => {
    if (session) {
      fetchTasks()
    } else {
      setTasks([])
    }
  }, [session])

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) console.error('Error fetching tasks:', error)
    else setTasks(data || [])
  }

  const addTask = async (taskData) => {
    const { data, error } = await supabase
      .from('tasks')
      .insert([{
        ...taskData,
        user_id: session.user.id
      }])
      .select()

    
    if (error) console.error('Error adding task:', error)
    else setTasks([data[0], ...tasks])
  }

  const toggleTaskStatus = async (id) => {
    const task = tasks.find(t => t.id === id)
    const { error } = await supabase
      .from('tasks')
      .update({ completed: !task.completed })
      .eq('id', id)
    
    if (error) console.error('Error updating task:', error)
    else {
      setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
    }
  }

  const deleteTask = async (id) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)
    
    if (error) console.error('Error deleting task:', error)
    else setTasks(tasks.filter(task => task.id !== id))
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  const pendingCount = tasks.filter(t => !t.completed).length

  if (loading) return <div className="loading-screen">Carregando...</div>

  if (!session) {
    return <Login />
  }

  const renderContent = () => {
    if (activeTab === 'analises') {
      return <AnalyticsView tasks={tasks} />
    }
    if (activeTab === 'calendario') {
      return (
        <>
          <CalendarView tasks={tasks} />
          <FilterBar currentFilter={filter} setFilter={setFilter} />
          <div className="list-section">
            <div className="list-header-row">
              <div className="list-title-group">
                <h2>Lista de tarefas</h2>
                <p>Visualizando todas as metas</p>
              </div>
              {pendingCount > 0 && (
                <span className="badge-count">{pendingCount} {pendingCount === 1 ? 'TAREFA RESTANTE' : 'TAREFAS RESTANTES'}</span>
              )}
            </div>
            <TaskList tasks={filteredTasks} onToggle={toggleTaskStatus} onDelete={deleteTask} />
          </div>
        </>
      )
    }

    return (
      <>
        <div className="card">
          <TaskInput onAddTask={addTask} />
        </div>
        <FilterBar currentFilter={filter} setFilter={setFilter} />
        <div className="list-section">
          <div className="list-header-row">
            <div className="list-title-group">
              <h2>Lista de tarefas</h2>
              <p>Foco no que é essencial</p>
            </div>
            {pendingCount > 0 && (
              <span className="badge-count">{pendingCount} {pendingCount === 1 ? 'TAREFA RESTANTE' : 'TAREFAS RESTANTES'}</span>
            )}
          </div>
          <TaskList tasks={filteredTasks} onToggle={toggleTaskStatus} onDelete={deleteTask} />
        </div>
      </>
    )
  }

  return (
    <>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} session={session} />
      <main className="app-container">
        {renderContent()}
      </main>
    </>
  )
}

export default App
