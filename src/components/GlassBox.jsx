// src/components/GlassBox.jsx — reusable glassmorphism container
export default function GlassBox({ children, style }) {
  return (
    <div style={{
      background: 'rgba(6, 9, 6, 0.52)',
      backdropFilter: 'blur(22px)',
      WebkitBackdropFilter: 'blur(22px)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '18px',
      padding: '2.2rem 2.8rem',
      ...style,
    }}>
      {children}
    </div>
  )
}
