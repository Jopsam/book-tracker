import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { LogOut, Plus, Book, Trash2, Edit2 } from 'lucide-react'

export default function Dashboard() {
  const { user } = useAuth()
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Form state
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [status, setStatus] = useState('reading') // 'read', 'to_read', 'reading'
  const [progress, setProgress] = useState('') // page or chapter
  
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
      
    if (error) {
      console.error('Error fetching books:', error)
    } else {
      setBooks(data)
    }
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const bookData = {
      title,
      author,
      status,
      progress,
      user_id: user.id
    }

    if (editingId) {
      const { error } = await supabase.from('books').update(bookData).eq('id', editingId)
      if (error) console.error('Error updating:', error)
    } else {
      const { error } = await supabase.from('books').insert([bookData])
      if (error) console.error('Error inserting:', error)
    }

    resetForm()
    fetchBooks()
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
    setShowForm(true)
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingId(null)
    setTitle('')
    setAuthor('')
    setStatus('reading')
    setProgress('')
  }

  const getStatusBadge = (s) => {
    switch(s) {
      case 'read': return <span style={{ color: 'var(--accent)', fontSize: '0.875rem' }}>Read</span>
      case 'to_read': return <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>To Read</span>
      case 'reading': return <span style={{ color: 'var(--warning)', fontSize: '0.875rem' }}>Reading</span>
      default: return null
    }
  }

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 className="h2">My Library</h1>
          <p className="text-muted">{user.email}</p>
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

      {showForm && (
        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h3 className="h3" style={{ marginBottom: '1.5rem' }}>{editingId ? 'Edit Book' : 'Add Book'}</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
            <div className="input-group">
              <label className="input-label">Title</label>
              <input required className="input-field" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="input-group">
              <label className="input-label">Author (optional)</label>
              <input className="input-field" value={author} onChange={e => setAuthor(e.target.value)} />
            </div>
            <div className="input-group">
              <label className="input-label">Status</label>
              <select className="input-field" value={status} onChange={e => setStatus(e.target.value)}>
                <option value="reading">Reading</option>
                <option value="to_read">To Read</option>
                <option value="read">Read</option>
              </select>
            </div>
            {status === 'reading' && (
              <div className="input-group">
                <label className="input-label">Progress (Page / Chapter)</label>
                <input className="input-field" value={progress} onChange={e => setProgress(e.target.value)} placeholder="e.g., Page 120" />
              </div>
            )}
            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button type="submit" className="btn btn-primary">Save</button>
              <button type="button" onClick={resetForm} className="btn btn-outline">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <p>Loading books...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {books.length === 0 && !showForm && (
            <p className="text-muted" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 0' }}>
              No books yet. Start building your library!
            </p>
          )}
          {books.map(book => (
            <div key={book.id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h4 style={{ fontSize: '1.125rem', fontWeight: '600' }}>{book.title}</h4>
                  {book.author && <p className="text-muted" style={{ fontSize: '0.875rem' }}>{book.author}</p>}
                </div>
                {getStatusBadge(book.status)}
              </div>
              
              {book.status === 'reading' && book.progress && (
                <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                  <p className="text-muted" style={{ fontSize: '0.875rem' }}>Progress: {book.progress}</p>
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                <button onClick={() => handleEdit(book)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.25rem' }}>
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDelete(book.id)} style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: '0.25rem' }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
