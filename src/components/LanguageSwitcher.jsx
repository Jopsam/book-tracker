import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation('dashboard');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="btn"
        style={{
          background: 'rgba(26, 31, 46, 0.6)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--radius-full)',
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          cursor: 'pointer',
          fontSize: '0.875rem',
          fontWeight: '500',
          transition: 'all 0.2s'
        }}
      >
        <Globe size={16} />
        {i18n.language.startsWith('es') ? t('lang.es', 'Español') : t('lang.en', 'English')}
        <ChevronDown size={14} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: '0.5rem',
          background: 'rgba(26, 31, 46, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 'var(--radius-md)',
          padding: '0.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
          minWidth: '150px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
          zIndex: 50
        }}>
          <button
            onClick={() => changeLanguage('en')}
            style={{
              background: i18n.language.startsWith('en') ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
              color: i18n.language.startsWith('en') ? 'var(--primary)' : 'var(--text-secondary)',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-sm)',
              textAlign: 'left',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: i18n.language.startsWith('en') ? '600' : '400',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            {i18n.language.startsWith('es') ? 'Inglés' : 'English'}
            {i18n.language.startsWith('en') && <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--primary)' }} />}
          </button>
          <button
            onClick={() => changeLanguage('es')}
            style={{
              background: i18n.language.startsWith('es') ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
              color: i18n.language.startsWith('es') ? 'var(--primary)' : 'var(--text-secondary)',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-sm)',
              textAlign: 'left',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: i18n.language.startsWith('es') ? '600' : '400',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            {i18n.language.startsWith('es') ? 'Español' : 'Spanish'}
            {i18n.language.startsWith('es') && <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--primary)' }} />}
          </button>
        </div>
      )}
    </div>
  );
}
