import React, { useState } from 'react'

function CalendarView({ tasks }) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ]

  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  
  const prevMonthDays = new Date(year, month, 0).getDate()
  
  const calendarDays = []
  
  // Padding for start of month
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    calendarDays.push({
      day: prevMonthDays - i,
      month: month - 1,
      year: year,
      isCurrentMonth: false
    })
  }
  
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      day: i,
      month: month,
      year: year,
      isCurrentMonth: true
    })
  }
  
  // Padding for end of month
  const totalSlots = 42 // 6 weeks
  const remainingSlots = totalSlots - calendarDays.length
  for (let i = 1; i <= remainingSlots; i++) {
    calendarDays.push({
      day: i,
      month: month + 1,
      year: year,
      isCurrentMonth: false
    })
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const hasTasksOnDay = (dayObj) => {
    const formattedDate = `${dayObj.year}-${String(dayObj.month + 1).padStart(2, '0')}-${String(dayObj.day).padStart(2, '0')}`
    return tasks.some(task => task.date === formattedDate)
  }

  const isToday = (dayObj) => {
    const today = new Date()
    return dayObj.day === today.getDate() && 
           dayObj.month === today.getMonth() && 
           dayObj.year === today.getFullYear()
  }

  return (
    <div className="calendar-card card">
      <div className="calendar-header">
        <h2 className="calendar-title">{monthNames[month]} {year}</h2>
        <div className="calendar-controls">
          <button onClick={prevMonth} className="btn-icon">‹</button>
          <button onClick={nextMonth} className="btn-icon">›</button>
        </div>
      </div>

      <div className="calendar-grid">
        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(day => (
          <div key={day} className="calendar-day-label">{day}</div>
        ))}
        
        {calendarDays.map((dayObj, idx) => {
          const hasTasks = hasTasksOnDay(dayObj)
          const today = isToday(dayObj)
          
          return (
            <div 
              key={idx} 
              className={`calendar-day-cell ${!dayObj.isCurrentMonth ? 'other-month' : ''} ${today ? 'is-today' : ''}`}
            >
              <span className="day-number">{dayObj.day}</span>
              {hasTasks && (
                <div className="day-indicators">
                  <span className="task-dot"></span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CalendarView
