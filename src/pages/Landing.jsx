import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, TrendingUp, CheckCircle, Star, Search, Shield, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Landing() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
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

      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '6rem', position: 'relative', zIndex: 1 }}>
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
          <Link to="/auth" className="btn btn-outline" style={{ borderRadius: 'var(--radius-full)', padding: '0.5rem 1.5rem' }}>
            Sign In
          </Link>
        </motion.nav>

        {/* Hero Section */}
        <main style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ display: 'inline-block', marginBottom: '1.5rem', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', backgroundColor: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)', color: 'var(--primary)', fontSize: '0.875rem', fontWeight: '500' }}
          >
            ✨ The new standard for book tracking
          </motion.div>
          
          <motion.h1 
            className="h1" 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', lineHeight: 1.1, marginBottom: '1.5rem', background: 'linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.03em' }}
          >
            Your personal reading <br /> sanctuary.
          </motion.h1>
          
          <motion.p 
            className="text-muted" 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ fontSize: '1.25rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: 1.6 }}
          >
            Keep track of what you've read, what you're reading, and what you want to read. No distractions, just you and your books in a beautifully crafted interface.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}
          >
            <Link to="/auth" className="btn btn-primary" style={{ fontSize: '1.125rem', padding: '1rem 2.5rem', borderRadius: 'var(--radius-full)' }}>
              Get Started for Free <ChevronRight size={20} />
            </Link>
          </motion.div>
        </main>

        {/* Abstract Mockup / Visual */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.5, type: 'spring' }}
          style={{
            marginTop: '6rem',
            perspective: '1000px',
            position: 'relative'
          }}
        >
          <div style={{
            background: 'rgba(26, 31, 46, 0.4)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            padding: '1rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(99, 102, 241, 0.1)',
            overflow: 'hidden'
          }}>
            {/* Fake Browser Top Bar */}
            <div style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '1.5rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
            </div>
            
            {/* Fake Dashboard Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', padding: '0 1rem 1rem 1rem' }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{ height: '300px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: '60%', backgroundColor: 'rgba(0,0,0,0.2)', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }} />
                  <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ height: '1rem', width: '80%', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px' }} />
                    <div style={{ height: '0.75rem', width: '60%', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '4px' }} />
                    <div style={{ marginTop: 'auto', display: 'flex', gap: '4px' }}>
                      {[1,2,3,4,5].map(star => <Star key={star} size={12} color={star < 5 ? '#fbbf24' : 'rgba(255,255,255,0.2)'} fill={star < 5 ? '#fbbf24' : 'none'} />)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bento Box Features */}
        <div style={{ marginTop: '10rem', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem' }}>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="glass-panel" 
            style={{ gridColumn: 'span 12', padding: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: 'linear-gradient(145deg, rgba(26, 31, 46, 0.8) 0%, rgba(99, 102, 241, 0.1) 100%)' }}
          >
            <Search size={48} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
            <h2 className="h2" style={{ marginBottom: '1rem' }}>Blazing Fast Search</h2>
            <p className="text-muted" style={{ maxWidth: '500px', fontSize: '1.125rem' }}>Find any book in milliseconds with our buttery smooth real-time filtering, powered by Framer Motion.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="glass-panel" 
            style={{ gridColumn: 'span 4', padding: '3rem', borderTop: '4px solid var(--accent)' }}
          >
            <CheckCircle size={32} color="var(--accent)" style={{ marginBottom: '1.5rem' }} />
            <h3 className="h3" style={{ marginBottom: '1rem' }}>Organized States</h3>
            <p className="text-muted">Keep your library perfectly sorted with To Read, Reading, and Finished states.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="glass-panel" 
            style={{ gridColumn: 'span 4', padding: '3rem', borderTop: '4px solid var(--primary)' }}
          >
            <TrendingUp size={32} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
            <h3 className="h3" style={{ marginBottom: '1rem' }}>Track Progress</h3>
            <p className="text-muted">Log the page or chapter where you left off. Never lose your place again.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="glass-panel" 
            style={{ gridColumn: 'span 4', padding: '3rem', borderTop: '4px solid var(--warning)' }}
          >
            <Shield size={32} color="var(--warning)" style={{ marginBottom: '1.5rem' }} />
            <h3 className="h3" style={{ marginBottom: '1rem' }}>Secure by Supabase</h3>
            <p className="text-muted">Your data is safe, private, and synced across all your devices instantly.</p>
          </motion.div>

        </div>
        
        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ marginTop: '10rem', textAlign: 'center', padding: '4rem 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <h2 className="h2" style={{ marginBottom: '1.5rem' }}>Ready to start your journey?</h2>
          <Link to="/auth" className="btn btn-primary" style={{ fontSize: '1.125rem', padding: '1rem 2.5rem', borderRadius: 'var(--radius-full)' }}>
            Create Your Library Now
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
