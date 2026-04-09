import React from 'react'

function AnalyticsView({ tasks }) {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.completed).length
  const pendingTasks = totalTasks - completedTasks
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  // Data for Category Chart
  const categories = ['trabalho', 'pessoal', 'estudo']
  const categoryStats = categories.map(cat => ({
    name: cat.charAt(0).toUpperCase() + cat.slice(1),
    count: tasks.filter(t => t.category === cat).length
  }))

  // Data for Priority Chart
  const priorities = ['alta', 'media', 'baixa']
  const priorityStats = priorities.map(pri => ({
    name: pri.charAt(0).toUpperCase() + pri.slice(1),
    count: tasks.filter(t => t.priority === pri).length,
    color: pri === 'alta' ? '#ef4444' : pri === 'media' ? '#f59e0b' : '#10b981'
  }))

  return (
    <div className="analytics-container">
      {/* Overview Cards */}
      <div className="stats-grid">
        <div className="stat-card card">
          <span className="stat-label">Total de Tarefas</span>
          <div className="stat-value">{totalTasks}</div>
          <div className="stat-icon">📊</div>
        </div>
        <div className="stat-card card">
          <span className="stat-label">Concluídas</span>
          <div className="stat-value text-success">{completedTasks}</div>
          <div className="stat-icon">✅</div>
        </div>
        <div className="stat-card card">
          <span className="stat-label">Pendentes</span>
          <div className="stat-value text-warning">{pendingTasks}</div>
          <div className="stat-icon">⏳</div>
        </div>
        <div className="stat-card card highlight">
          <span className="stat-label">Taxa de Sucesso</span>
          <div className="stat-value">{completionRate}%</div>
          <div className="progress-mini">
            <div className="progress-bar" style={{ width: `${completionRate}%` }}></div>
          </div>
        </div>
      </div>

      <div className="charts-row">
        {/* Category Chart - Simple Bar logic */}
        <div className="chart-card card">
          <h3>Distribuição por Categoria</h3>
          <div className="simple-bar-chart">
            {categoryStats.map(stat => {
              const percentage = totalTasks > 0 ? (stat.count / totalTasks) * 100 : 0
              return (
                <div key={stat.name} className="bar-item">
                  <div className="bar-label">
                    <span>{stat.name}</span>
                    <span>{stat.count}</span>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Priority Chart - Simple Bar logic */}
        <div className="chart-card card">
          <h3>Níveis de Prioridade</h3>
          <div className="simple-bar-chart">
            {priorityStats.map(stat => {
              const percentage = totalTasks > 0 ? (stat.count / totalTasks) * 100 : 0
              return (
                <div key={stat.name} className="bar-item">
                  <div className="bar-label">
                    <span>{stat.name}</span>
                    <span>{stat.count}</span>
                  </div>
                  <div className="bar-track">
                    <div 
                      className="bar-fill" 
                      style={{ width: `${percentage}%`, backgroundColor: stat.color }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Productivity Insight */}
      <div className="insight-card card">
        <div className="insight-header">
          <span className="insight-emoji">💡</span>
          <h3>Insight de Produtividade</h3>
        </div>
        <p>
          {completionRate >= 80 
            ? "Excelente desempenho! Você está mantendo um ritmo incrível de conclusão." 
            : completionRate >= 50 
            ? "Bom trabalho! Você está no caminho certo, continue focando nas prioridades." 
            : "Que tal focar em uma tarefa por vez? Pequenos passos levam a grandes conquistas."}
        </p>
      </div>
    </div>
  )
}

export default AnalyticsView
