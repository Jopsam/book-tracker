import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { BookOpen, TrendingUp, CheckCircle, Star, Search, Shield, ChevronRight, Zap, Layout, Heart, Smartphone, Database } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Landing() {
  const { t } = useTranslation('landing')

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
            <span className="h3 hide-on-mobile" style={{ fontWeight: '700', letterSpacing: '-0.02em', margin: 0, display: 'block' }}>Oasis Book Tracking</span>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <LanguageSwitcher />
            <Link to="/auth" className="btn btn-outline" style={{ borderRadius: 'var(--radius-full)', padding: '0.5rem 1.5rem' }}>
              {t('nav.signIn')}
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
            {t('hero.tag')}
          </motion.div>
          
          <motion.h1 
            className="h1" 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', lineHeight: 1.1, marginBottom: '1.5rem', background: 'linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.03em' }}
          >
            {t('hero.title1')}<br /> {t('hero.title2')}
          </motion.h1>
          
          <motion.p 
            className="text-muted" 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ fontSize: '1.25rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: 1.6 }}
          >
            {t('hero.subtitle')}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link to="/auth" className="btn btn-primary" style={{ fontSize: '1.125rem', padding: '1rem 2.5rem', borderRadius: 'var(--radius-full)' }}>
              {t('hero.cta2')} <ChevronRight size={20} />
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
            <span>{t('hero.socialProof')}</span>
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
                      {book.status === 'read' && <span style={{ color: 'var(--accent)', fontSize: '0.75rem', fontWeight: '500' }}>{t('mockup.finishedBadge')}</span>}
                      {book.status === 'to_read' && <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: '500' }}>{t('mockup.toReadBadge')}</span>}
                      {book.status === 'reading' && <span style={{ color: 'var(--warning)', fontSize: '0.75rem', fontWeight: '500' }}>{t('mockup.readingBadge')}</span>}
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
                          <span>{t('mockup.progressLabel')}</span>
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
          <p style={{ color: 'var(--primary)', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.875rem', marginBottom: '1rem' }}>{t('problem.label')}</p>
          <h2 className="h2" style={{ maxWidth: '800px', margin: '0 auto 2rem auto', lineHeight: 1.3 }}>
            {t('problem.title1')}<br />{t('problem.title2')}
          </h2>
          <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.125rem' }}>
            {t('problem.desc')}
          </p>
        </div>

        {/* 4. Core Features Bento Grid */}
        <div className="bento-grid" style={{ marginTop: '6rem' }}>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="glass-panel col-span-12" style={{ padding: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: 'linear-gradient(145deg, rgba(26, 31, 46, 0.8) 0%, rgba(99, 102, 241, 0.1) 100%)' }}
          >
            <Zap size={48} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
            <h2 className="h2" style={{ marginBottom: '1rem' }}>{t('bento.f1.title')}</h2>
            <p className="text-muted" style={{ maxWidth: '500px', fontSize: '1.125rem' }}>
              {t('bento.f1.desc')}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="glass-panel col-span-6" style={{ padding: '3rem', borderTop: '4px solid var(--accent)' }}
          >
            <CheckCircle size={32} color="var(--accent)" style={{ marginBottom: '1.5rem' }} />
            <h3 className="h3" style={{ marginBottom: '1rem' }}>{t('bento.f2.title')}</h3>
            <p className="text-muted">{t('bento.f2.desc')}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="glass-panel col-span-6" style={{ padding: '3rem', borderTop: '4px solid var(--warning)' }}
          >
            <TrendingUp size={32} color="var(--warning)" style={{ marginBottom: '1.5rem' }} />
            <h3 className="h3" style={{ marginBottom: '1rem' }}>{t('bento.f3.title')}</h3>
            <p className="text-muted">{t('bento.f3.desc')}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="glass-panel col-span-4" style={{ padding: '2.5rem' }}
          >
            <Database size={28} color="var(--text-primary)" style={{ marginBottom: '1rem' }} />
            <h4 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', fontWeight: '600' }}>{t('bento.f4.title')}</h4>
            <p className="text-muted" style={{ fontSize: '0.875rem' }}>{t('bento.f4.desc')}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.3 }}
            className="glass-panel col-span-4" style={{ padding: '2.5rem' }}
          >
            <Heart size={28} color="var(--text-primary)" style={{ marginBottom: '1rem' }} />
            <h4 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', fontWeight: '600' }}>{t('bento.f5.title')}</h4>
            <p className="text-muted" style={{ fontSize: '0.875rem' }}>{t('bento.f5.desc')}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.4 }}
            className="glass-panel col-span-4" style={{ padding: '2.5rem' }}
          >
            <Smartphone size={28} color="var(--text-primary)" style={{ marginBottom: '1rem' }} />
            <h4 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', fontWeight: '600' }}>{t('bento.f6.title')}</h4>
            <p className="text-muted" style={{ fontSize: '0.875rem' }}>{t('bento.f6.desc')}</p>
          </motion.div>
        </div>

        {/* 5. How it Works / Steps */}
        <div style={{ marginTop: '10rem', marginBottom: '4rem' }}>
          <h2 className="h2" style={{ textAlign: 'center', marginBottom: '4rem' }}>{t('howItWorks.title')}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', position: 'relative' }}>
            <div className="timeline-line" style={{ position: 'absolute', top: '24px', left: '10%', right: '10%', height: '2px', background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)', zIndex: 0 }}></div>
            
            <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--surface-color)', border: '1px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary)', boxShadow: '0 0 20px rgba(99, 102, 241, 0.2)' }}>1</div>
              <h3 className="h3" style={{ marginBottom: '1rem' }}>{t('howItWorks.step1.title')}</h3>
              <p className="text-muted">{t('howItWorks.step1.desc')}</p>
            </div>
            
            <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--surface-color)', border: '1px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', fontSize: '1.25rem', fontWeight: '700', color: 'var(--accent)', boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)' }}>2</div>
              <h3 className="h3" style={{ marginBottom: '1rem' }}>{t('howItWorks.step2.title')}</h3>
              <p className="text-muted">{t('howItWorks.step2.desc')}</p>
            </div>
            
            <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--surface-color)', border: '1px solid var(--warning)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', fontSize: '1.25rem', fontWeight: '700', color: 'var(--warning)', boxShadow: '0 0 20px rgba(245, 158, 11, 0.2)' }}>3</div>
              <h3 className="h3" style={{ marginBottom: '1rem' }}>{t('howItWorks.step3.title')}</h3>
              <p className="text-muted">{t('howItWorks.step3.desc')}</p>
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
          <h2 className="h2" style={{ marginBottom: '1.5rem', fontSize: '2.5rem' }}>{t('cta.title')}</h2>
          <p className="text-muted" style={{ maxWidth: '500px', margin: '0 auto 2.5rem auto', fontSize: '1.125rem' }}>
            {t('cta.subtitle')}
          </p>
          <Link to="/auth" className="btn btn-primary" style={{ fontSize: '1.125rem', padding: '1rem 3rem', borderRadius: 'var(--radius-full)' }}>
            {t('cta.button')}
          </Link>
          <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{t('cta.desc')}</p>
        </motion.div>

        {/* 7. Footer */}
        <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '3rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <BookOpen size={20} />
            <span style={{ fontWeight: '600' }}>Oasis Book Tracking</span>
          </div>
          <div style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='white'} onMouseOut={e => e.target.style.color='var(--text-secondary)'}>{t('footer.twitter')}</span>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='white'} onMouseOut={e => e.target.style.color='var(--text-secondary)'}>{t('footer.github')}</span>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='white'} onMouseOut={e => e.target.style.color='var(--text-secondary)'}>{t('footer.privacy')}</span>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='white'} onMouseOut={e => e.target.style.color='var(--text-secondary)'}>{t('footer.terms')}</span>
          </div>
        </footer>

      </div>
    </div>
  )
}
