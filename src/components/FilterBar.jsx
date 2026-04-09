function FilterBar({ currentFilter, setFilter }) {
  return (
    <div className="filter-container">
      <button 
        className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`}
        onClick={() => setFilter('all')}
      >
        <span className="filter-icon">📋</span> TODAS
      </button>
      <button 
        className={`filter-btn ${currentFilter === 'pending' ? 'active' : ''}`}
        onClick={() => setFilter('pending')}
      >
        <span className="filter-icon">🕒</span> PENDENTES
      </button>
      <button 
        className={`filter-btn ${currentFilter === 'completed' ? 'active' : ''}`}
        onClick={() => setFilter('completed')}
      >
        <span className="filter-icon">✅</span> CONCLUÍDAS
      </button>
    </div>

  )
}

export default FilterBar

