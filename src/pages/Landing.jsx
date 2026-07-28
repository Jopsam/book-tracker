import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, TrendingUp, CheckCircle, Star, Search, Shield, ChevronRight, Zap, Layout, Heart, Smartphone, Database } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Landing() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', paddingBottom: '0' }}>
      {/* Animated Background Orbs */}
      <div style={{
        position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(60px)', zIndex: -1, animation: 'pulse 8s infinite alternate'
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '-10%', width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(60px)', zIndex: -1, animation: 'pulse 12s infinite alternate-reverse'
      }} />

      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '0', position: 'relative', zIndex: 1 }}>
        {/* Navbar */}
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--primary)' }}>
            <div style={{ padding: '0.5rem', backgroundColor: 'rgba(99, 102, 241, 0.1)', borderRadius: 'var(--radius-md)' }}>
              <BookOpen size={24} />
            </div>
            <span className="h3" style={{ fontWeight: '700', letterSpacing: '-0.02em', margin: 0 }}>Oasis</span>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link to="/auth" className="btn btn-outline" style={{ borderRadius: 'var(--radius-full)', padding: '0.5rem 1.5rem' }}>
              Sign In
            </Link>
          </div>
        </motion.nav>

        {/* 1. Hero Section */}
        <main style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ display: 'inline-block', marginBottom: '1.5rem', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', backgroundColor: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)', color: 'var(--primary)', fontSize: '0.875rem', fontWeight: '500' }}
          >
            🚀 Oasis Book Tracking 2.0 is here
          </motion.div>
          
          <motion.h1 
            className="h1" 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', lineHeight: 1.1, marginBottom: '1.5rem', background: 'linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.03em' }}
          >
            Escape the noise.<br /> Immerse in reading.
          </motion.h1>
          
          <motion.p 
            className="text-muted" 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ fontSize: '1.25rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: 1.6 }}
          >
            Ditch the cluttered spreadsheets and clunky social networks. Oasis is the minimalist, beautifully crafted haven designed exclusively for your reading habits.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link to="/auth" className="btn btn-primary" style={{ fontSize: '1.125rem', padding: '1rem 2.5rem', borderRadius: 'var(--radius-full)' }}>
              Start your library for free <ChevronRight size={20} />
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}
          >
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              {[1,2,3,4,5].map(i => <Star key={i} size={16} color="#fbbf24" fill="#fbbf24" />)}
            </div>
            <span>Loved by 10,000+ avid readers worldwide.</span>
          </motion.div>
        </main>

        {/* 2. App Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.5, type: 'spring' }}
          style={{
            marginTop: '6rem',
            perspective: '1000px',
            position: 'relative',
            zIndex: 10
          }}
        >
          <div style={{
            background: 'rgba(26, 31, 46, 0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            padding: '1rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(99, 102, 241, 0.1)',
            overflow: 'hidden'
          }}>
            <div style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '1.5rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', padding: '0 1rem 1rem 1rem', pointerEvents: 'none' }}>
              {[
                {
                  id: 1,
                  title: 'Dune',
                  author: 'Frank Herbert',
                  status: 'reading',
                  progress: 'Chapter 12, Page 245',
                  rating: null,
                  cover: 'https://covers.openlibrary.org/b/id/8259439-M.jpg'
                },
                {
                  id: 2,
                  title: 'Atomic Habits',
                  author: 'James Clear',
                  status: 'read',
                  progress: null,
                  rating: 5,
                  cover: 'https://covers.openlibrary.org/b/id/12869503-M.jpg'
                },
                {
                  id: 3,
                  title: 'Project Hail Mary',
                  author: 'Andy Weir',
                  status: 'to_read',
                  progress: null,
                  rating: null,
                  cover: 'https://covers.openlibrary.org/b/id/11181676-M.jpg'
                }
              ].map(book => (
                <div key={book.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'rgba(26, 31, 46, 0.8)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }}>
                  
                  {/* Cover */}
                  <div style={{ 
                    height: '200px', 
                    backgroundColor: 'rgba(0,0,0,0.4)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      position: 'absolute', inset: 0, backgroundImage: `url(${book.cover})`,
                      backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(10px)',
                      opacity: 0.4, zIndex: 0
                    }} />
                    <img 
                      src={book.cover} 
                      alt={book.title}
                      style={{ height: '90%', width: 'auto', objectFit: 'contain', zIndex: 1, boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
                    />
                    
                    {/* Status Badge */}
                    <div style={{ 
                      position: 'absolute', top: '1rem', right: '1rem', 
                      backgroundColor: 'rgba(26, 31, 46, 0.8)', backdropFilter: 'blur(4px)',
                      padding: '0.25rem 0.75rem', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.1)', zIndex: 2
                    }}>
                      {book.status === 'read' && <span style={{ color: 'var(--accent)', fontSize: '0.75rem', fontWeight: '500' }}>Finished</span>}
                      {book.status === 'to_read' && <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: '500' }}>To Read</span>}
                      {book.status === 'reading' && <span style={{ color: 'var(--warning)', fontSize: '0.75rem', fontWeight: '500' }}>Reading</span>}
                    </div>
                  </div>

                  {/* Details */}
                  <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, textAlign: 'left' }}>
                    <h4 style={{ fontSize: '1.125rem', fontWeight: '600', margin: '0 0 0.25rem 0', color: 'white' }}>{book.title}</h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{book.author}</span>
                      {book.rating && (
                        <span style={{ display: 'flex', gap: '2px' }}>
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star key={star} size={12} color={star <= book.rating ? '#fbbf24' : 'rgba(255,255,255,0.2)'} fill={star <= book.rating ? '#fbbf24' : 'none'} />
                          ))}
                        </span>
                      )}
                    </div>
                    
                    {book.status === 'reading' && (
                      <div style={{ marginTop: 'auto', backgroundColor: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '8px' }}>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
                          <span>Progress</span>
                          <strong style={{ color: 'white' }}>{book.progress}</strong>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 3. Social Proof & Problem Statement */}
        <div style={{ marginTop: '8rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--primary)', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.875rem', marginBottom: '1rem' }}>The Problem</p>
          <h2 className="h2" style={{ maxWidth: '800px', margin: '0 auto 2rem auto', lineHeight: 1.3 }}>
            Goodreads is outdated. Excel is boring.<br />Your reading life deserves better.
          </h2>
          <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.125rem' }}>
            We noticed that readers were forced to choose between social networks filled with ads and toxic reviews, or boring, lifeless spreadsheets. Oasis gives you the perfect middle ground: a private, beautiful space for your books.
          </p>
        </div>

        {/* 4. Core Features Bento Grid */}
        <div style={{ marginTop: '6rem', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem' }}>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="glass-panel" 
            style={{ gridColumn: 'span 12', padding: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: 'linear-gradient(145deg, rgba(26, 31, 46, 0.8) 0%, rgba(99, 102, 241, 0.1) 100%)' }}
          >
            <Zap size={48} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
            <h2 className="h2" style={{ marginBottom: '1rem' }}>Blazing Fast, Buttery Smooth</h2>
            <p className="text-muted" style={{ maxWidth: '500px', fontSize: '1.125rem' }}>
              Built with React and Framer Motion. Find any book in milliseconds with our real-time filtering. Watch your library rearrange itself magically as you type.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="glass-panel" 
            style={{ gridColumn: 'span 6', padding: '3rem', borderTop: '4px solid var(--accent)' }}
          >
            <CheckCircle size={32} color="var(--accent)" style={{ marginBottom: '1.5rem' }} />
            <h3 className="h3" style={{ marginBottom: '1rem' }}>Intuitive Organization</h3>
            <p className="text-muted">No complicated tags. Just 'To Read', 'Reading', and 'Finished'. Everything you need, nothing you don't.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="glass-panel" 
            style={{ gridColumn: 'span 6', padding: '3rem', borderTop: '4px solid var(--warning)' }}
          >
            <TrendingUp size={32} color="var(--warning)" style={{ marginBottom: '1.5rem' }} />
            <h3 className="h3" style={{ marginBottom: '1rem' }}>Granular Progress</h3>
            <p className="text-muted">Log the exact page, chapter, or percentage where you left off. Perfect for readers juggling multiple books.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="glass-panel" 
            style={{ gridColumn: 'span 4', padding: '2.5rem' }}
          >
            <Database size={28} color="var(--text-primary)" style={{ marginBottom: '1rem' }} />
            <h4 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', fontWeight: '600' }}>Cloud Synced</h4>
            <p className="text-muted" style={{ fontSize: '0.875rem' }}>Powered by Supabase. Your data is safely stored in the cloud and instantly available everywhere.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.3 }}
            className="glass-panel" 
            style={{ gridColumn: 'span 4', padding: '2.5rem' }}
          >
            <Heart size={28} color="var(--text-primary)" style={{ marginBottom: '1rem' }} />
            <h4 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', fontWeight: '600' }}>Personal Reviews</h4>
            <p className="text-muted" style={{ fontSize: '0.875rem' }}>Write private notes and rate your books. Your thoughts remain entirely yours, away from public eyes.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.4 }}
            className="glass-panel" 
            style={{ gridColumn: 'span 4', padding: '2.5rem' }}
          >
            <Smartphone size={28} color="var(--text-primary)" style={{ marginBottom: '1rem' }} />
            <h4 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', fontWeight: '600' }}>Responsive</h4>
            <p className="text-muted" style={{ fontSize: '0.875rem' }}>Looks stunning on your 4K monitor, your laptop, and your smartphone. Read anywhere.</p>
          </motion.div>
        </div>

        {/* 5. How it Works / Steps */}
        <div style={{ marginTop: '10rem', marginBottom: '4rem' }}>
          <h2 className="h2" style={{ textAlign: 'center', marginBottom: '4rem' }}>How Oasis works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '24px', left: '10%', right: '10%', height: '2px', background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)', zIndex: 0, display: 'none', '@media (min-width: 768px)': { display: 'block' } }}></div>
            
            <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--surface-color)', border: '1px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary)', boxShadow: '0 0 20px rgba(99, 102, 241, 0.2)' }}>1</div>
              <h3 className="h3" style={{ marginBottom: '1rem' }}>Create Account</h3>
              <p className="text-muted">Sign up in seconds. No credit card required. A purely private workspace.</p>
            </div>
            
            <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--surface-color)', border: '1px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', fontSize: '1.25rem', fontWeight: '700', color: 'var(--accent)', boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)' }}>2</div>
              <h3 className="h3" style={{ marginBottom: '1rem' }}>Build Library</h3>
              <p className="text-muted">Add books manually or let us automatically fetch covers from OpenLibrary.</p>
            </div>
            
            <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--surface-color)', border: '1px solid var(--warning)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', fontSize: '1.25rem', fontWeight: '700', color: 'var(--warning)', boxShadow: '0 0 20px rgba(245, 158, 11, 0.2)' }}>3</div>
              <h3 className="h3" style={{ marginBottom: '1rem' }}>Track & Review</h3>
              <p className="text-muted">Update your progress and write down your private thoughts when you finish.</p>
            </div>
          </div>
        </div>

        {/* 6. Final CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{ marginTop: '8rem', marginBottom: '4rem', textAlign: 'center', padding: '5rem 2rem', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(26, 31, 46, 0.8) 100%)', borderRadius: '32px', border: '1px solid rgba(99, 102, 241, 0.3)', boxShadow: '0 25px 50px -12px rgba(99, 102, 241, 0.2)' }}
        >
          <h2 className="h2" style={{ marginBottom: '1.5rem', fontSize: '2.5rem' }}>Ready to organize your reading life?</h2>
          <p className="text-muted" style={{ maxWidth: '500px', margin: '0 auto 2.5rem auto', fontSize: '1.125rem' }}>
            Join thousands of readers who have already migrated to the most elegant book tracking experience on the web.
          </p>
          <Link to="/auth" className="btn btn-primary" style={{ fontSize: '1.125rem', padding: '1rem 3rem', borderRadius: 'var(--radius-full)' }}>
            Start Using Oasis
          </Link>
          <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Free forever. No ads. No tracking.</p>
        </motion.div>

        {/* 7. Footer */}
        <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '3rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <BookOpen size={20} />
            <span style={{ fontWeight: '600' }}>Oasis Book Tracking</span>
          </div>
          <div style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='white'} onMouseOut={e => e.target.style.color='var(--text-secondary)'}>Twitter</span>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='white'} onMouseOut={e => e.target.style.color='var(--text-secondary)'}>GitHub</span>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='white'} onMouseOut={e => e.target.style.color='var(--text-secondary)'}>Privacy</span>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='white'} onMouseOut={e => e.target.style.color='var(--text-secondary)'}>Terms</span>
          </div>
        </footer>

      </div>
    </div>
  )
}
