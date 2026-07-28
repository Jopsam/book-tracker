import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { LogOut, Plus, Trash2, Edit2, Book, Image as ImageIcon, BookOpen, Star } from 'lucide-react'

export default function Dashboard() {
  const { user } = useAuth()
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  
  // Form state
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => { document.body.style.overflow = 'auto' }
  }, [showForm])
  const [isSaving, setIsSaving] = useState(false)
  const [formError, setFormError] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [status, setStatus] = useState('to_read')
  const [progress, setProgress] = useState('')
  const [rating, setRating] = useState(0)
  
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      
    if (error) console.error('Error fetching books:', error)
    else setBooks(data)
    
    setLoading(false)
  }

  const fetchCoverUrl = async (bookTitle, bookAuthor) => {
    try {
      const query = new URLSearchParams()
      if (bookTitle) query.append('title', bookTitle)
      if (bookAuthor) query.append('author', bookAuthor)
      
      const res = await fetch(`https://openlibrary.org/search.json?${query.toString()}`)
      const data = await res.json()
      
      if (data.docs && data.docs.length > 0 && data.docs[0].cover_i) {
        return `https://covers.openlibrary.org/b/id/${data.docs[0].cover_i}-M.jpg`
      }
    } catch (err) {
      console.error("Failed to fetch cover", err)
    }
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    setFormError(null)

    const bookData = { title, author, status, progress, user_id: user.id, rating: rating > 0 ? rating : null }
    
    let cover_url = null
    cover_url = await fetchCoverUrl(title, author)
    
    if (cover_url) {
      bookData.cover_url = cover_url
    }

    if (editingId) {
      const { error } = await supabase.from('books').update(bookData).eq('id', editingId)
      if (error) {
        console.error('Error updating:', error)
        setFormError(error.message)
        setIsSaving(false)
        return
      }
    } else {
      const { error } = await supabase.from('books').insert([bookData])
      if (error) {
        console.error('Error inserting:', error)
        setFormError(error.message)
        setIsSaving(false)
        return
      }
    }

    resetForm()
    fetchBooks()
    setIsSaving(false)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      await supabase.from('books').delete().eq('id', id)
      fetchBooks()
    }
  }

  const handleEdit = (book) => {
    setEditingId(book.id)
    setTitle(book.title)
    setAuthor(book.author || '')
    setStatus(book.status)
    setProgress(book.progress || '')
    setRating(book.rating || 0)
    setShowForm(true)
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingId(null)
    setTitle('')
    setAuthor('')
    setStatus('to_read')
    setProgress('')
    setRating(0)
    setFormError(null)
  }

  const getStatusBadge = (s) => {
    switch(s) {
      case 'read': return <span style={{ color: 'var(--accent)', fontSize: '0.875rem', fontWeight: '500' }}>Finished</span>
      case 'to_read': return <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '500' }}>To Read</span>
      case 'reading': return <span style={{ color: 'var(--warning)', fontSize: '0.875rem', fontWeight: '500' }}>Reading</span>
      default: return null
    }
  }

  const filteredBooks = books.filter(b => activeTab === 'all' || b.status === activeTab)

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', backgroundColor: 'rgba(99, 102, 241, 0.1)', borderRadius: 'var(--radius-md)', color: 'var(--primary)' }}>
            <BookOpen size={28} />
          </div>
          <div>
            <h1 className="h2" style={{ fontSize: '1.5rem', margin: 0, padding: 0 }}>Oasis Book Tracking</h1>
            <p className="text-muted" style={{ fontSize: '0.875rem', margin: 0 }}>{user.email}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
            <Plus size={20} /> New Book
          </button>
          <button onClick={() => supabase.auth.signOut()} className="btn btn-outline">
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '2rem', overflowX: 'auto' }}>
        {[
          { id: 'all', label: 'All Books' },
          { id: 'to_read', label: 'To Read' },
          { id: 'reading', label: 'Currently Reading' },
          { id: 'read', label: 'Finished' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: 'none',
              border: 'none',
              color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === tab.id ? '600' : '400',
              cursor: 'pointer',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: activeTab === tab.id ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
              transition: 'var(--transition)',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {showForm && createPortal(
        <div 
          className="animate-fade-in"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) resetForm()
          }}
        >
          <div style={{ 
            backgroundColor: 'var(--surface-color)', 
            border: '1px solid var(--border-color)', 
            borderRadius: 'var(--radius-lg)', 
            padding: '2.5rem', 
            width: '100%', 
            maxWidth: '800px', 
            maxHeight: '90vh', 
            overflowY: 'auto',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <h3 className="h3" style={{ marginBottom: '2rem' }}>{editingId ? 'Edit Book' : 'Add Book'}</h3>
            {formError && (
            <div style={{ padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', color: 'var(--danger)', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.875rem' }}>
              Error: {formError}
            </div>
          )}
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
            <div className="input-group">
              <label className="input-label">Title</label>
              <input required className="input-field" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="input-group">
              <label className="input-label">Author (optional)</label>
              <input className="input-field" value={author} onChange={e => setAuthor(e.target.value)} />
            </div>
            <div className="input-group" style={{ gridColumn: status === 'to_read' ? '1 / -1' : 'auto' }}>
              <label className="input-label">Status</label>
              <div style={{ display: 'flex', gap: '0.25rem', backgroundColor: 'rgba(0,0,0,0.2)', padding: '0.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                {[
                  { value: 'to_read', label: 'To Read' },
                  { value: 'reading', label: 'Reading' },
                  { value: 'read', label: 'Finished' }
                ].map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setStatus(opt.value)}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      background: status === opt.value ? 'var(--primary)' : 'transparent',
                      color: status === opt.value ? 'white' : 'var(--text-secondary)',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      transition: 'var(--transition)',
                      boxShadow: status === opt.value ? '0 2px 4px rgba(0,0,0,0.2)' : 'none'
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            {status === 'reading' && (
              <div className="input-group">
                <label className="input-label">Current Progress (Chapter/Page)</label>
                <input
                  type="text"
                  value={progress}
                  onChange={(e) => setProgress(e.target.value)}
                  className="input-field"
                  placeholder="e.g. Chapter 4, Page 120"
                />
              </div>
            )}
            
            {status === 'read' && (
              <div className="input-group">
                <label className="input-label">Rating</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer', 
                        padding: '0.25rem',
                        color: star <= rating ? '#fbbf24' : 'var(--text-secondary)',
                        transition: 'var(--transition)'
                      }}
                    >
                      <Star size={28} fill={star <= rating ? '#fbbf24' : 'none'} />
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button type="submit" className="btn btn-primary" disabled={isSaving}>
                {isSaving ? 'Searching cover & saving...' : 'Save Book'}
              </button>
              <button type="button" onClick={resetForm} className="btn btn-outline" disabled={isSaving}>Cancel</button>
            </div>
          </form>
          </div>
        </div>,
        document.body
      )}

      {loading ? (
        <p className="text-muted">Loading your library...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {filteredBooks.length === 0 && !showForm && (
            <div className="glass-panel" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 2rem' }}>
              <Book size={48} color="var(--text-secondary)" style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
              <h3 className="h3" style={{ marginBottom: '0.5rem' }}>No books found</h3>
              <p className="text-muted">
                {activeTab === 'all' 
                  ? "You haven't added any books yet." 
                  : `You don't have any books in the "${activeTab}" category.`}
              </p>
            </div>
          )}
          
          {filteredBooks.map(book => (
            <div key={book.id} className="glass-panel animate-fade-in" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              
              {/* Cover Image Area */}
              <div style={{ 
                height: '240px', 
                backgroundColor: 'rgba(0,0,0,0.4)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                borderBottom: '1px solid var(--border-color)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {book.cover_url ? (
                  <>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url(${book.cover_url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: 'blur(10px)',
                      opacity: 0.4,
                      zIndex: 0
                    }} />
                    <img 
                      src={book.cover_url} 
                      alt={`Cover of ${book.title}`}
                      style={{ height: '90%', width: 'auto', objectFit: 'contain', zIndex: 1, boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
                    />
                  </>
                ) : (
                  <div style={{ color: 'var(--primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', opacity: 0.6 }}>
                    <BookOpen size={48} />
                    <span style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Oasis</span>
                  </div>
                )}
                
                {/* Status Badge floating on cover */}
                <div style={{ 
                  position: 'absolute', 
                  top: '1rem', 
                  right: '1rem', 
                  backgroundColor: 'rgba(26, 31, 46, 0.8)',
                  backdropFilter: 'blur(4px)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-color)'
                }}>
                  {getStatusBadge(book.status)}
                </div>
              </div>

              {/* Book Details */}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '1.125rem', fontWeight: '600', margin: '0 0 0.25rem 0', padding: 0 }}>{book.title}</h4>
                  <div className="text-muted" style={{ fontSize: '0.875rem', margin: '0 0 1rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{book.author ? book.author : 'No author registered'}</span>
                    {book.rating && (
                      <span style={{ display: 'flex', gap: '2px' }}>
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star key={star} size={14} color={star <= book.rating ? '#fbbf24' : 'var(--text-secondary)'} fill={star <= book.rating ? '#fbbf24' : 'none'} opacity={star <= book.rating ? 1 : 0.3} />
                        ))}
                      </span>
                    )}
                  </div>
                  
                  {((book.status === 'reading' && book.progress) || book.status !== 'reading') && (
                    <div style={{ marginTop: '1rem', backgroundColor: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                      {book.status === 'reading' ? (
                        <p className="text-muted" style={{ margin: 0, fontSize: '0.875rem', display: 'flex', justifyContent: 'space-between' }}>
                          <span>Progress</span>
                          <strong style={{ color: 'var(--text-primary)' }}>{book.progress}</strong>
                        </p>
                      ) : (
                        <p className="text-muted" style={{ margin: 0, fontSize: '0.875rem', display: 'flex', justifyContent: 'space-between' }}>
                          <span>{book.status === 'read' ? 'Finished at' : 'Registered at'}</span>
                          <strong style={{ color: 'var(--text-primary)' }}>{new Date(book.created_at).toLocaleDateString()}</strong>
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions Footer */}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                  <button onClick={() => handleEdit(book)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.25rem', transition: 'var(--transition)' }}>
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(book.id)} style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: '0.25rem', transition: 'var(--transition)' }}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  )
}
