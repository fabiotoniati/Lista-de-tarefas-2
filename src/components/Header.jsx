import React from 'react'
import { supabase } from '../supabaseClient'

function Header({ activeTab, setActiveTab, session }) {
  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  const userEmail = session?.user?.email || ''
  const initials = userEmail.substring(0, 2).toUpperCase()

  return (
    <header className="app-header">
      <div className="header-left">
      </div>
      
      <nav className="header-nav">
        <button 
          className={`nav-link ${activeTab === 'tarefas' ? 'active' : ''}`}
          onClick={() => setActiveTab('tarefas')}
        >
          Tarefas
        </button>
        <button 
          className={`nav-link ${activeTab === 'analises' ? 'active' : ''}`}
          onClick={() => setActiveTab('analises')}
        >
          Análises
        </button>
        <button 
          className={`nav-link ${activeTab === 'calendario' ? 'active' : ''}`}
          onClick={() => setActiveTab('calendario')}
        >
          Calendário
        </button>
      </nav>


      <div className="header-actions">
        <span className="user-email-display">{userEmail}</span>
        <div className="avatar-wrapper">
          <div className="avatar-initials">
            {initials}
          </div>
        </div>
        <button onClick={handleLogout} className="btn-logout" title="Sair">Sair 🚪</button>
      </div>
    </header>
  )
}


export default Header

