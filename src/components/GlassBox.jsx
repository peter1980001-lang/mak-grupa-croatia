// src/components/GlassBox.jsx — reusable glassmorphism container
export default function GlassBox({ children, style, className = '' }) {
  return (
    <div className={`glass-card ${className}`} style={{
      background:     'rgba(23, 60, 51, 0.82)',
      border:         '1px solid rgba(200,169,106,0.28)',
      borderRadius:   '18px',
      padding:        '2.2rem 2.8rem',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      boxShadow:      '0 8px 48px rgba(0,0,0,0.22), inset 0 1px 0 rgba(200,169,106,0.12)',
      ...style,
    }}>
      {children}
    </div>
  )
}
