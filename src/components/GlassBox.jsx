// src/components/GlassBox.jsx — reusable glassmorphism container
export default function GlassBox({ children, style, className = '' }) {
  return (
    <div className={`glass-card ${className}`} style={{
      background:     'rgba(8, 22, 18, 0.78)',
      border:         '1px solid rgba(201,168,76,0.22)',
      borderRadius:   '18px',
      padding:        '2.2rem 2.8rem',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      boxShadow:      '0 8px 48px rgba(0,0,0,0.28), inset 0 1px 0 rgba(201,168,76,0.10)',
      ...style,
    }}>
      {children}
    </div>
  )
}
