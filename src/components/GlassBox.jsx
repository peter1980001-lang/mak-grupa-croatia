// src/components/GlassBox.jsx — reusable glassmorphism container
export default function GlassBox({ children, style, className = '' }) {
  return (
    <div className={`glass-card ${className}`} style={{
      background: 'rgba(8, 12, 8, 0.72)',
      border: '1px solid rgba(255,255,255,0.10)',
      borderRadius: '18px',
      padding: '2.2rem 2.8rem',
      ...style,
    }}>
      {children}
    </div>
  )
}
