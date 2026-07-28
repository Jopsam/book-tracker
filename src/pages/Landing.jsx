import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, TrendingUp, CheckCircle } from 'lucide-react'

export default function Landing() {
  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
          <BookOpen size={32} />
          <span className="h3">Oasis</span>
        </div>
        <Link to="/auth" className="btn btn-outline">Sign In</Link>
      </nav>

      <main className="animate-fade-in" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="h1" style={{ marginBottom: '1.5rem', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Your personal reading sanctuary.
        </h1>
        <p className="text-muted" style={{ fontSize: '1.25rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
          Keep track of what you've read, what you're reading, and what you want to read. No distractions, just you and your books.
        </p>
        
        <Link to="/auth" className="btn btn-primary" style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}>
          Get Started
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '6rem', textAlign: 'left' }}>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <TrendingUp size={32} color="var(--primary)" style={{ marginBottom: '1rem' }} />
            <h3 className="h3" style={{ marginBottom: '0.5rem' }}>Track Progress</h3>
            <p className="text-muted">Log the page or chapter where you left off. Never lose your place again.</p>
          </div>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <CheckCircle size={32} color="var(--accent)" style={{ marginBottom: '1rem' }} />
            <h3 className="h3" style={{ marginBottom: '0.5rem' }}>Organize</h3>
            <p className="text-muted">Read, reading, and to-read. Three simple states to keep your library organized.</p>
          </div>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <BookOpen size={32} color="var(--warning)" style={{ marginBottom: '1rem' }} />
            <h3 className="h3" style={{ marginBottom: '0.5rem' }}>Minimalist</h3>
            <p className="text-muted">A clean design focused entirely on your reading habits, without the noise.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
