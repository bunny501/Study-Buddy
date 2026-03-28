import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState, useEffect } from 'react'
import socket from '../socket'

const navItems = [
  { to: '/', label: 'Dashboard', icon: '🏠', exact: true },
  { to: '/notes', label: 'My Notes', icon: '📒' },
  { to: '/groups', label: 'Groups', icon: '👥' },
  { to: '/match', label: 'Partner Match', icon: '🤝' },
  { to: '/test', label: 'Take Test', icon: '🧪' },
  { to: '/battle', label: 'Battle of Groups', icon: '⚔️' },
  { to: '/profile', label: 'Profile', icon: '👤' },
]

export default function Layout({ dark, setDark }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState(0)
  const [dmNotifications, setDmNotifications] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    socket.on('doubt:new', () => setNotifications(n => n + 1))
    socket.on('dm:receive', (m) => {
      // Only notify if the message is incoming (not sent by us)
      if (m.from !== user?._id && m.fromUsername !== user?.username) {
        setDmNotifications(n => n + 1)
      }
    })
    return () => {
      socket.off('doubt:new')
      socket.off('dm:receive')
    }
  }, [user])

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-60' : 'w-16'} flex-shrink-0 bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 flex flex-col transition-all duration-200`}>
        <div className="p-4 flex items-center gap-2 border-b border-gray-100 dark:border-gray-700">
          <span className="text-2xl">📚</span>
          {sidebarOpen && <span className="font-bold text-blue-600 text-lg">Study Buddy</span>}
          <button onClick={() => setSidebarOpen(o => !o)} className="ml-auto text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              onClick={() => { if (item.to === '/match') setDmNotifications(0) }}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <span className="text-lg">{item.icon}</span>
              {sidebarOpen && (
                <span className="text-sm flex-1">{item.label}</span>
              )}
              {sidebarOpen && item.label === 'Dashboard' && notifications > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{notifications}</span>
              )}
              {sidebarOpen && item.label === 'Partner Match' && dmNotifications > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{dmNotifications}</span>
              )}
              {!sidebarOpen && item.label === 'Partner Match' && dmNotifications > 0 && (
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-100 dark:border-gray-700 space-y-2">
          <button
            onClick={() => setDark(d => !d)}
            className="sidebar-link w-full"
          >
            <span>{dark ? '☀️' : '🌙'}</span>
            {sidebarOpen && <span className="text-sm">{dark ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>
          <button onClick={() => { logout(); navigate('/auth') }} className="sidebar-link w-full text-red-500 hover:text-red-600">
            <span>🚪</span>
            {sidebarOpen && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
