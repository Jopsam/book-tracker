import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Auth() {
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)
    
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        
        if (data?.user && !data?.session) {
          setMessage('Account created! Please check your email for the confirmation link.')
        }
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div className="glass-panel animate-fade-in" style={{ padding: '2.5rem', width: '100%', maxWidth: '400px' }}>
        <h2 className="h2" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          {isLogin ? 'Sign In' : 'Create Account'}
        </h2>
        
        {error && (
          <div style={{ padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', color: 'var(--danger)', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        {message && (
          <div style={{ padding: '0.75rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--accent)', color: 'var(--accent)', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.875rem' }}>
            {message}
          </div>
        )}

        <form onSubmit={handleAuth}>
          <div className="input-group">
            <label className="input-label">Email address</label>
            <input 
              type="email" 
              className="input-field" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input 
              type="password" 
              className="input-field" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button 
            type="button" 
            onClick={() => { setIsLogin(!isLogin); setError(null); setMessage(null); }}
            style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', marginLeft: '0.5rem', fontWeight: '500' }}
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  )
}
