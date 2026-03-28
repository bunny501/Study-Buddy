import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import MyNotes from './pages/MyNotes'
import Groups from './pages/Groups'
import GroupDetail from './pages/GroupDetail'
import PartnerMatch from './pages/PartnerMatch'
import TakeTest from './pages/TakeTest'
import BattleOfGroups from './pages/BattleOfGroups'
import Profile from './pages/Profile'
import socket from './socket'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>
  if (!user) return <Navigate to="/auth" replace />
  return children
}

function AppRoutes() {
  const { user } = useAuth()
  const [dark, setDark] = useState(() => localStorage.getItem('dark') === 'true')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('dark', dark)
  }, [dark])

  useEffect(() => {
    if (user) {
      socket.connect()
      socket.emit('user:online', user._id)
    }
    return () => { if (user) socket.disconnect() }
  }, [user])

  return (
    <Routes>
      <Route path="/auth" element={user ? <Navigate to="/" replace /> : <Auth />} />
      <Route path="/" element={<ProtectedRoute><Layout dark={dark} setDark={setDark} /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="notes" element={<MyNotes />} />
        <Route path="groups" element={<Groups />} />
        <Route path="groups/:id" element={<GroupDetail />} />
        <Route path="match" element={<PartnerMatch />} />
        <Route path="test" element={<TakeTest />} />
        <Route path="battle" element={<BattleOfGroups />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile/:id" element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}
