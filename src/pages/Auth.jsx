import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { sileo } from 'sileo'

export default function Auth() {
  const { t } = useTranslation('dashboard')

  const { user } = useAuth()
  const navigate = useNavigate()
  
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        sileo.success({ title: t('auth.welcomeBackTitle'), description: t('auth.welcomeBackDesc') })
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        
        if (data?.user && !data?.session) {
          sileo.info({ title: t('auth.accountCreated'), description: t('auth.checkEmailDesc') })
        } else {
          sileo.success({ title: t('auth.accountCreated'), description: t('auth.welcomeAdd')})
        }
      }
    } catch (err) {
      sileo.error({ title: t('auth.authErrorTitle'), description: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div className="glass-panel animate-fade-in" style={{ padding: '2.5rem', width: '100%', maxWidth: '400px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
          <LanguageSwitcher />
        </div>

        <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem', transition: 'var(--transition)' }}>
          <ArrowLeft size={16} /> {t('auth.backToHome')}
        </Link>
        <h2 className="h2" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          {isLogin ? t('auth.signIn') : t('auth.createAccount')}
        </h2>

        <form onSubmit={handleAuth}>
          <div className="input-group">
            <label className="input-label">{t('auth.email')}</label>
            <input 
              type="email" 
              className="input-field" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="input-group">
            <label className="input-label">{t('auth.password')}</label>
            <input 
              type="password" 
              className="input-field" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            {loading ? t('auth.processing') : (isLogin ? t('auth.signIn') : t('auth.signUpBtn'))}
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          {isLogin ? t('auth.noAccount') : t('auth.hasAccount')}
          <button 
            type="button" 
            onClick={() => { setIsLogin(!isLogin); }}
            style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', marginLeft: '0.5rem', fontWeight: '500' }}
          >
            {isLogin ? t('auth.signUpLink') : t('auth.signInLink')}
          </button>
        </p>
      </div>
    </div>
  )
}
