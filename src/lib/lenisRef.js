// src/lib/lenisRef.js
// Module-level singleton so AutoPlay (and anything else) can drive Lenis
// without prop-drilling or context.
const lenisRef = { current: null }
export default lenisRef
