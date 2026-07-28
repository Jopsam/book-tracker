import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'


const BookCard = ({ book, handleEdit, handleDelete, getStatusBadge, onRead, t }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  
  // Try to parse progress and pageCount to render a progress bar
  const progressNum = parseInt(book.progress, 10)
  const pageCountNum = parseInt(book.page_count, 10)
  const showProgressBar = !isNaN(progressNum) && !isNaN(pageCountNum) && pageCountNum > 0

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25 }}
      className="glass-panel" 
      style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
    >
    
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
          
          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
              backgroundColor: 'rgba(255,255,255,0.05)',
              animation: 'pulse 1.5s infinite'
            }}>
              <BookOpen size={32} color="rgba(255,255,255,0.2)" />
            </div>
          )}
          
          <img 
            src={book.cover_url} 
            alt={`Cover of ${book.title}`}
            onLoad={() => setImageLoaded(true)}
            style={{ 
              height: '90%', 
              width: 'auto', 
              objectFit: 'contain', 
              zIndex: 2, 
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
              opacity: imageLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease'
            }}
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
        border: '1px solid var(--border-color)',
        zIndex: 10
      }}>
        {getStatusBadge(book.status)}
      </div>
    </div>

    {/* Book Details */}
    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
      <div style={{ flex: 1 }}>
        <h4 style={{ fontSize: '1.125rem', fontWeight: '600', margin: '0 0 0.25rem 0', padding: 0 }}>{book.title}</h4>
        <div className="text-muted" style={{ fontSize: '0.875rem', margin: '0 0 1rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{book.author ? book.author : t('bookCard.noAuthor')}</span>
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
              <div>
                <p className="text-muted" style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{t('bookCard.progress')}</span>
                  <strong style={{ color: 'var(--text-primary)' }}>
                    {book.progress} {book.page_count ? `${t('bookCard.of')} ${book.page_count}` : ''}
                  </strong>
                </p>
                {showProgressBar && (
                  <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ 
                      height: '100%', 
                      backgroundColor: 'var(--primary)', 
                      width: `${Math.min(100, Math.max(0, (progressNum / pageCountNum) * 100))}%`,
                      transition: 'width 0.5s ease-out'
                    }} />
                  </div>
                )}
              </div>
            ) : (
              <p className="text-muted" style={{ margin: 0, fontSize: '0.875rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>{book.status === 'read' || book.status === 'finished' ? t('bookCard.finishedAt') : t('bookCard.registeredAt')}</span>
                <strong style={{ color: 'var(--text-primary)' }}>{new Date(book.created_at).toLocaleDateString()}</strong>
              </p>
            )}
          </div>
        )}
        
        {book.notes && (
          <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: 'rgba(99, 102, 241, 0.05)', borderLeft: '2px solid var(--primary)', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0' }}>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)', fontStyle: 'italic', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              "{book.notes}"
            </p>
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
        {book.ia_id && (
          <button 
            onClick={() => onRead(book)} 
            style={{ 
              marginLeft: 'auto', 
              background: 'var(--primary)', 
              border: 'none', 
              color: 'white', 
              cursor: 'pointer', 
              padding: '0.4rem 0.75rem', 
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.875rem',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              transition: 'var(--transition)'
            }}
          >
            <BookOpen size={16} />
            {t('bookCard.readNow', 'Leer Ahora')}
          </button>
        )}
      </div>
    </div>
  </motion.div>
  )
}


import { createPortal } from 'react-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { LogOut, Plus, Trash2, Edit2, Book, Image as ImageIcon, BookOpen, Star, LibraryBig, BookX, Ghost, Search } from 'lucide-react'
import { sileo } from 'sileo'
import { motion, AnimatePresence } from 'framer-motion'
import LanguageSwitcher from '../components/LanguageSwitcher'

export default function Dashboard() {
  const { t } = useTranslation('dashboard')

  const { user } = useAuth()
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [readingBook, setReadingBook] = useState(null)
  
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
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [status, setStatus] = useState('to_read')
  const [progress, setProgress] = useState('')
  const [rating, setRating] = useState(0)
  const [notes, setNotes] = useState('')
  const [coverUrl, setCoverUrl] = useState('')
  const [pageCount, setPageCount] = useState('')
  const [iaId, setIaId] = useState('')
  
  // Google Books API Search state
  const [bookSearchQuery, setBookSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    fetchBooks()
  }, [])

  
  const searchBooks = async (query) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }
    setIsSearching(true)
    try {
      const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=5&fields=key,title,author_name,cover_i,number_of_pages_median,has_fulltext,ia`)
      const data = await res.json()
      if (data.docs) {
        setSearchResults(data.docs.map(item => ({
          id: item.key,
          title: item.title,
          author: item.author_name ? item.author_name.join(', ') : '',
          coverUrl: item.cover_i ? `https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg` : '',
          pageCount: item.number_of_pages_median || '',
          iaId: item.has_fulltext && item.ia ? item.ia[0] : ''
        })))
      } else {
        setSearchResults([])
      }
    } catch (err) {
      console.error('Error fetching from OpenLibrary', err)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleSelectBook = (book) => {
    setTitle(book.title)
    setAuthor(book.author)
    setCoverUrl(book.coverUrl)
    setPageCount(book.pageCount)
    setIaId(book.iaId || '')
    setSearchResults([])
    setBookSearchQuery('')
    sileo.success({ title: t('notifs.bookFound'), description: t('notifs.bookFoundDesc') })
  }

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

    const bookData = { 
      title, 
      author, 
      status, 
      progress, 
      user_id: user.id, 
      rating: rating > 0 ? rating : null,
      notes,
      page_count: pageCount ? parseInt(pageCount, 10) : null,
      ia_id: iaId || null
    }
    
    let cover_url = null
    cover_url = await fetchCoverUrl(title, author)
    
    if (cover_url) {
      bookData.cover_url = cover_url
    }

    if (editingId) {
      const { error } = await supabase.from('books').update(bookData).eq('id', editingId)
      if (error) {
        console.error('Error updating:', error)
        sileo.error({ title: t('notifs.errorUpdating'), description: error.message })
        setIsSaving(false)
        return
      }
      sileo.success({ title: t('notifs.bookUpdated'), description: t('notifs.bookUpdatedDesc', 'Your changes have been saved to your library.') })
    } else {
      const { error } = await supabase.from('books').insert([bookData])
      if (error) {
        console.error('Error inserting:', error)
        sileo.error({ title: t('notifs.errorAdding'), description: error.message })
        setIsSaving(false)
        return
      }
      sileo.success({ title: t('notifs.bookAdded'), description: t('notifs.bookAddedDesc', 'The new book is now available in your library.') })
    }

    resetForm()
    fetchBooks()
    setIsSaving(false)
  }

  const handleDelete = async (id) => {
    if (window.confirm(t('notifs.confirmDelete'))) {
      const { error } = await supabase.from('books').delete().eq('id', id)
      if (error) {
        sileo.error({ title: t('notifs.errorDeleting'), description: t('notifs.errorDeletingDesc', 'We could not delete this book. Please try again.') })
      } else {
        sileo.success({ title: t('notifs.bookDeleted'), description: t('notifs.bookDeletedDesc', 'The book was permanently removed from your library.') })
        fetchBooks()
      }
    }
  }

  const handleEdit = (book) => {
    setEditingId(book.id)
    setTitle(book.title)
    setAuthor(book.author || '')
    setStatus(book.status)
    setProgress(book.progress || '')
    setRating(book.rating || 0)
    setNotes(book.notes || '')
    setPageCount(book.page_count || '')
    setIaId(book.ia_id || '')
    setShowForm(true)
  }

  const resetForm = () => {
    setTitle('')
    setAuthor('')
    setStatus('to_read')
    setProgress('')
    setRating(0)
    setNotes('')
    setPageCount('')
    setIaId('')
    setCoverUrl('')
    setEditingId(null)
    setBookSearchQuery('')
    setSearchResults([])
    setShowForm(false)
  }

  const getStatusBadge = (s) => {
    switch(s) {
      case 'read': return <span style={{ color: 'var(--accent)', fontSize: '0.875rem', fontWeight: '500' }}>{t('modal.statusFinished')}</span>
      case 'to_read': return <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '500' }}>{t('actions.toRead')}</span>
      case 'reading': return <span style={{ color: 'var(--warning)', fontSize: '0.875rem', fontWeight: '500' }}>{t('actions.reading')}</span>
      default: return null
    }
  }

  const getEmptyStateContent = () => {
    if (searchQuery.trim() !== '') {
      return { 
        icon: <Search size={48} />, 
        title: t('emptyState.searchTitle'), 
        desc: t('emptyState.searchDesc', { query: searchQuery })
      }
    }

    switch (activeTab) {
      case 'to_read':
        return { icon: <LibraryBig size={48} />, title: t('emptyState.toReadTitle'), desc: t('emptyState.toReadDesc') }
      case 'reading':
        return { icon: <BookOpen size={48} />, title: t('emptyState.readingTitle'), desc: t('emptyState.readingDesc') }
      case 'read':
        return { icon: <Book size={48} />, title: t('emptyState.readTitle'), desc: t('emptyState.readDesc') }
      default:
        return { icon: <Ghost size={48} />, title: t('emptyState.allTitle'), desc: t('emptyState.allDesc') }
    }
  }
  const emptyState = getEmptyStateContent()

  const filteredBooks = books.filter(b => {
    const matchesTab = activeTab === 'all' || b.status === activeTab
    const searchLower = searchQuery.toLowerCase()
    const matchesSearch = b.title.toLowerCase().includes(searchLower) || 
                          (b.author && b.author.toLowerCase().includes(searchLower))
    return matchesTab && matchesSearch
  })

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', backgroundColor: 'rgba(99, 102, 241, 0.1)', borderRadius: 'var(--radius-md)', color: 'var(--primary)' }}>
            <BookOpen size={28} />
          </div>
          <div className="hide-on-mobile">
            <h1 className="h2" style={{ fontSize: '1.5rem', margin: 0, padding: 0 }}>Oasis Book Tracking</h1>
            <p className="text-muted" style={{ fontSize: '0.875rem', margin: 0 }}>{user.email}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <LanguageSwitcher />
          <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
            <Plus size={20} /> <span className="hide-on-mobile">{t('actions.newBook')}</span>
          </button>
          <button onClick={() => supabase.auth.signOut()} className="btn btn-outline">
            <LogOut size={20} /> <span className="hide-on-mobile">{t('actions.signOut')}</span>
          </button>
        </div>
      </header>

      {/* Tabs Navigation and Search */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto' }}>
          {[
            { id: 'all', label: t('filters.allBooks') },
            { id: 'to_read', label: t('filters.toRead') },
            { id: 'reading', label: t('filters.reading') },
            { id: 'read', label: t('filters.finished') }
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
        
        <div className="input-group" style={{ margin: 0, minWidth: '250px', flex: '1 1 250px', maxWidth: '400px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              className="input-field" 
              placeholder={t('filters.searchPlaceholder')} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '2.75rem', borderRadius: 'var(--radius-full)', backgroundColor: 'rgba(255,255,255,0.05)', width: '100%' }}
            />
          </div>
        </div>
      </div>

      {showForm && createPortal(
        <div 
          className="animate-fade-in"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
            zIndex: 40,
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
            <h3 className="h3" style={{ marginBottom: '2rem' }}>{editingId ? t('modal.editTitle') : t('modal.addTitle')}</h3>
          <form onSubmit={handleSubmit} className="modal-form-grid">
            <div className="input-group" style={{ gridColumn: '1 / -1', position: 'relative' }}>
              <label className="input-label" style={{ color: 'var(--primary)' }}>✨ {t('modal.googleBooksSearchLabel')}</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="text" 
                  className="input-field" 
                  style={{ flex: 1 }}
                  placeholder={t('modal.googleBooksPlaceholder')}
                  value={bookSearchQuery}
                  onChange={e => setBookSearchQuery(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      searchBooks(bookSearchQuery)
                    }
                  }}
                />
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={() => searchBooks(bookSearchQuery)}
                  disabled={isSearching}
                >
                  {isSearching ? '...' : <Search size={20} />}
                </button>
              </div>
              
              {searchResults.length > 0 && (
                <div style={{ 
                  position: 'absolute', 
                  top: '100%', 
                  left: 0, 
                  right: 0, 
                  backgroundColor: 'var(--surface-color)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: 'var(--radius-md)', 
                  marginTop: '0.5rem', 
                  zIndex: 50, 
                  boxShadow: 'var(--shadow-lg)',
                  maxHeight: '300px',
                  overflowY: 'auto'
                }}>
                  {searchResults.map(book => (
                    <div 
                      key={book.id} 
                      onClick={() => handleSelectBook(book)}
                      style={{ 
                        padding: '0.75rem', 
                        borderBottom: '1px solid rgba(255,255,255,0.05)', 
                        cursor: 'pointer',
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      {book.coverUrl ? (
                        <img src={book.coverUrl} alt="cover" style={{ width: '40px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                      ) : (
                        <div style={{ width: '40px', height: '60px', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <BookOpen size={20} color="var(--text-secondary)" />
                        </div>
                      )}
                      <div>
                        <div style={{ fontWeight: '600' }}>{book.title}</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{book.author}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div style={{ gridColumn: '1 / -1', height: '1px', backgroundColor: 'var(--border-color)', margin: '1rem 0' }} />

            <div className="input-group">
              <label className="input-label">{t('modal.titleLabel')}</label>
              <input required className="input-field" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="input-group">
              <label className="input-label">{t('modal.authorLabel')}</label>
              <input className="input-field" value={author} onChange={e => setAuthor(e.target.value)} />
            </div>
            <div className="input-group" style={{ gridColumn: status === 'to_read' ? '1 / -1' : 'auto' }}>
              <label className="input-label">{t('modal.statusLabel')}</label>
              <div style={{ display: 'flex', gap: '0.25rem', backgroundColor: 'rgba(0,0,0,0.2)', padding: '0.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                {[
                  { value: 'to_read', label: t('modal.statusToRead') },
                  { value: 'reading', label: t('modal.statusReading') },
                  { value: 'read', label: t('modal.statusFinished') }
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
                <label className="input-label">{t('modal.progressLabel')} / {t('modal.totalPagesLabel')}</label>
                <div className="input-field" style={{ display: 'flex', alignItems: 'center', padding: '0', overflow: 'hidden' }}>
                  <input
                    type="number"
                    min="0"
                    value={progress || ''}
                    onChange={(e) => setProgress(e.target.value)}
                    placeholder={t('modal.progressPlaceholder')}
                    style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'inherit', padding: '0.75rem 1rem', textAlign: 'right', minWidth: 0 }}
                  />
                  <span style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', fontWeight: '300', padding: '0 0.25rem', userSelect: 'none' }}>/</span>
                  <input
                    type="number"
                    min="1"
                    value={pageCount || ''}
                    onChange={(e) => setPageCount(e.target.value)}
                    placeholder={t('modal.totalPagesPlaceholder')}
                    style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'inherit', padding: '0.75rem 1rem', textAlign: 'left', minWidth: 0 }}
                  />
                </div>
              </div>
            )}
            
            {status === 'read' && (
              <div className="input-group">
                <label className="input-label">{t('modal.ratingLabel')}</label>
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
            
            <div className="input-group" style={{ gridColumn: '1 / -1' }}>
              <label className="input-label">{t('modal.notesLabel')}</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="input-field"
                placeholder={t('modal.notesPlaceholder')}
                rows={3}
                style={{ resize: 'vertical', fontFamily: 'inherit' }}
              />
            </div>
            
            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button type="submit" className="btn btn-primary" disabled={isSaving}>
                {isSaving ? t('modal.saving') : t('modal.saveBtn')}
              </button>
              <button type="button" onClick={resetForm} className="btn btn-outline" disabled={isSaving}>{t('modal.cancel')}</button>
            </div>
          </form>
          </div>
        </div>,
        document.body
      )}

      {readingBook && createPortal(
        <div style={{ position: 'fixed', inset: 0, zIndex: 40, display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setReadingBook(null)}
            style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="glass-panel"
            style={{ position: 'relative', width: '90%', maxWidth: '1200px', height: '85vh', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}
          >
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' }}>
              <h2 className="h3" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BookOpen size={20} /> {readingBook.title}
              </h2>
              <button 
                onClick={() => setReadingBook(null)}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'var(--text-primary)' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)' }}
              >
                <BookX size={20} />
              </button>
            </div>
            <div style={{ flex: 1, width: '100%', backgroundColor: '#f5f5f5' }}>
              <iframe 
                src={`https://archive.org/embed/${readingBook.ia_id}`}
                width="100%" 
                height="100%" 
                frameBorder="0" 
                allowFullScreen
                style={{ display: 'block' }}
              />
            </div>
          </motion.div>
        </div>,
        document.body
      )}

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="glass-panel pulse-anim" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ height: '240px', backgroundColor: 'rgba(255,255,255,0.05)' }} />
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                <div style={{ height: '1.5rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-sm)', width: '80%' }} />
                <div style={{ height: '1rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-sm)', width: '60%' }} />
                <div style={{ marginTop: '2rem', height: '2rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-sm)', width: '100%' }} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <AnimatePresence mode="popLayout">
            {filteredBooks.length === 0 && !showForm && (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.3 }}
                className="glass-panel" 
                style={{ 
                  gridColumn: '1 / -1', 
                  textAlign: 'center', 
                  padding: '5rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <div style={{ color: 'var(--text-secondary)', opacity: 0.5, marginBottom: '0.5rem' }}>
                  {emptyState.icon}
                </div>
                <h3 className="h3" style={{ margin: 0 }}>{emptyState.title}</h3>
                <p className="text-muted" style={{ margin: 0, maxWidth: '400px' }}>
                  {emptyState.desc}
                </p>
                {searchQuery.trim() === '' && (
                  <button onClick={() => setShowForm(true)} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    <Plus size={20} /> Add your first book
                  </button>
                )}
              </motion.div>
            )}
            
            {filteredBooks.map(book => (<BookCard key={book.id} book={book} handleEdit={handleEdit} handleDelete={handleDelete} getStatusBadge={getStatusBadge} onRead={setReadingBook} t={t} />))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}
