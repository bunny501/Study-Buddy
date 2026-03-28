import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Auth() {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ username: '', password: '', college: '', branch: '', subjects: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, register } = useAuth()
  const navigate = useNavigate()

  const handle = async (e) => {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      if (mode === 'login') await login(form.username, form.password)
      else await register({ ...form, subjects: form.subjects.split(',').map(s => s.trim()).filter(Boolean) })
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="card w-full max-w-md">
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">📚</div>
          <h1 className="text-2xl font-bold text-blue-600">Study Buddy</h1>
          <p className="text-gray-500 text-sm mt-1">Peer-to-peer collaborative learning</p>
        </div>

        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1 mb-6">
          {['login', 'register'].map(m => (
            <button key={m} onClick={() => setMode(m)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === m ? 'bg-white dark:bg-gray-600 shadow text-blue-600' : 'text-gray-500'}`}>
              {m === 'login' ? 'Login' : 'Sign Up'}
            </button>
          ))}
        </div>

        <form onSubmit={handle} className="space-y-3">
          <input className="input" placeholder="Username" value={form.username}
            onChange={e => setForm(f => ({ ...f, username: e.target.value }))} required />
          <input className="input" type="password" placeholder="Password (optional)"
            value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />

          {mode === 'register' && <>
            <input className="input" placeholder="College" value={form.college}
              onChange={e => setForm(f => ({ ...f, college: e.target.value }))} />
            <input className="input" placeholder="Branch (e.g. CSE)" value={form.branch}
              onChange={e => setForm(f => ({ ...f, branch: e.target.value }))} />
            <input className="input" placeholder="Subjects (comma separated)" value={form.subjects}
              onChange={e => setForm(f => ({ ...f, subjects: e.target.value }))} />
          </>}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  )
}
