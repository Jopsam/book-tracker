import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(nextLang);
  };

  return (
    <button 
      onClick={toggleLanguage}
      className="btn"
      style={{
        background: 'transparent',
        border: '1px solid rgba(255,255,255,0.1)',
        padding: '0.5rem 1rem',
        borderRadius: 'var(--radius-full)',
        color: 'var(--text-secondary)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: '500'
      }}
    >
      {i18n.language === 'es' ? 'EN' : 'ES'}
    </button>
  );
}
